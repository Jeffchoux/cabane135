import { describe, it, expect } from "vitest";
import { escapeHtml, formatDate } from "@/lib/resend";

describe("escapeHtml()", () => {
  it("échappe les 5 caractères HTML dangereux", () => {
    expect(escapeHtml("<script>alert(\"x\")</script>")).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;"
    );
  });

  it("échappe & en premier (sinon double-échappement)", () => {
    expect(escapeHtml("Tom & Jerry")).toBe("Tom &amp; Jerry");
  });

  it("échappe les apostrophes simples", () => {
    expect(escapeHtml("l'huître")).toBe("l&#39;huître");
  });

  it("laisse intact un texte sans entité dangereuse", () => {
    expect(escapeHtml("Nicolas Lebon, 4 couverts")).toBe("Nicolas Lebon, 4 couverts");
  });

  it("résiste aux injections XSS classiques", () => {
    const out = escapeHtml('"><img src=x onerror=alert(1)>');
    expect(out).not.toContain("<img");
    expect(out).not.toContain('"');
    expect(out).toContain("&lt;");
    expect(out).toContain("&quot;");
  });
});

describe("formatDate()", () => {
  it("formate une Date en français long", () => {
    const out = formatDate(new Date("2026-05-01T12:00:00Z"));
    expect(out).toMatch(/mai/);
    expect(out).toMatch(/2026/);
  });

  it("inclut le jour de la semaine", () => {
    const out = formatDate(new Date("2026-05-01T12:00:00Z"));
    expect(out.toLowerCase()).toMatch(/lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche/);
  });
});
