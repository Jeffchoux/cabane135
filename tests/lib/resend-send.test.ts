import { describe, it, expect, beforeEach, vi } from "vitest";

const { sendMock } = vi.hoisted(() => ({
  sendMock: vi.fn().mockResolvedValue({ id: "stub-id" }),
}));

vi.mock("resend", () => {
  class Resend {
    emails = { send: sendMock };
    constructor(_apiKey?: string) {}
  }
  return { Resend };
});

beforeEach(() => {
  sendMock.mockClear();
  vi.resetModules();
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.ADMIN_EMAIL = "admin@cabane135.fr";
  process.env.RESEND_FROM = "Cabane 135 <hello@cabane135.fr>";
});

const payload = {
  name: "Nicolas Lebon",
  phone: "0546413682",
  email: "client@example.com",
  date: new Date("2026-06-15T19:30:00Z"),
  time: "19:30",
  covers: 4,
  message: "Aucune allergie",
};

describe("sendNotification()", () => {
  it("appelle Resend avec sujet, html et text", async () => {
    const { sendNotification } = await import("@/lib/resend");
    await sendNotification(payload);
    expect(sendMock).toHaveBeenCalledTimes(1);
    const arg = sendMock.mock.calls[0][0];
    expect(arg.to).toBe("admin@cabane135.fr");
    expect(arg.subject).toContain("Nicolas Lebon");
    expect(arg.html).toContain("Nicolas Lebon");
    expect(arg.text).toContain("Nicolas Lebon");
  });

  it("échappe le HTML user-controlled (anti-XSS)", async () => {
    const { sendNotification } = await import("@/lib/resend");
    await sendNotification({ ...payload, name: '<script>alert(1)</script>' });
    const arg = sendMock.mock.calls[0][0];
    expect(arg.html).not.toContain("<script>alert(1)</script>");
    expect(arg.html).toContain("&lt;script&gt;");
  });

  it("ne plante pas si message ou email manquent", async () => {
    const { sendNotification } = await import("@/lib/resend");
    await sendNotification({ ...payload, message: null, email: null });
    expect(sendMock).toHaveBeenCalled();
  });

  it("skip silencieusement si RESEND_API_KEY est absent", async () => {
    delete process.env.RESEND_API_KEY;
    const { sendNotification } = await import("@/lib/resend");
    await sendNotification(payload);
    expect(sendMock).not.toHaveBeenCalled();
  });
});

describe("sendConfirmation()", () => {
  it("envoie à l'email du client", async () => {
    const { sendConfirmation } = await import("@/lib/resend");
    await sendConfirmation(payload);
    expect(sendMock).toHaveBeenCalledTimes(1);
    const arg = sendMock.mock.calls[0][0];
    expect(arg.to).toBe("client@example.com");
    expect(arg.subject).toContain("Cabane 135");
  });

  it("ajoute les headers List-Unsubscribe", async () => {
    const { sendConfirmation } = await import("@/lib/resend");
    await sendConfirmation(payload);
    const arg = sendMock.mock.calls[0][0];
    expect(arg.headers).toBeDefined();
    expect(arg.headers["List-Unsubscribe"]).toContain("mailto:");
  });

  it("skip si email client manquant", async () => {
    const { sendConfirmation } = await import("@/lib/resend");
    await sendConfirmation({ ...payload, email: null });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("skip si RESEND_API_KEY absent", async () => {
    delete process.env.RESEND_API_KEY;
    const { sendConfirmation } = await import("@/lib/resend");
    await sendConfirmation(payload);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("accorde le pluriel sur 'couvert(s)'", async () => {
    const { sendConfirmation } = await import("@/lib/resend");
    await sendConfirmation({ ...payload, covers: 1 });
    const single = sendMock.mock.calls[0][0].html;
    sendMock.mockClear();
    await sendConfirmation({ ...payload, covers: 3 });
    const multi = sendMock.mock.calls[0][0].html;
    expect(single).toContain("1 couvert");
    expect(single).not.toContain("1 couverts");
    expect(multi).toContain("3 couverts");
  });
});
