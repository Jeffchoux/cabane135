import { describe, it, expect, beforeAll } from "vitest";
import { isValidIp, checkAuthLimit, checkReservationLimit } from "@/lib/rate-limit";

beforeAll(() => {
  // S'assurer qu'on est en mode fallback in-memory (pas de KV configuré)
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
});

describe("isValidIp()", () => {
  it("accepte une IPv4 standard", () => {
    expect(isValidIp("192.168.1.1")).toBe(true);
  });

  it("accepte une IPv6 standard", () => {
    expect(isValidIp("2001:db8::1")).toBe(true);
  });

  it("accepte localhost ::1", () => {
    expect(isValidIp("::1")).toBe(true);
  });

  it("rejette une chaîne vide", () => {
    expect(isValidIp("")).toBe(false);
  });

  it("rejette une chaîne trop longue (>45 chars)", () => {
    expect(isValidIp("1".repeat(46))).toBe(false);
  });

  it("rejette les caractères non hexa/.:", () => {
    expect(isValidIp("192.168.1.1; DROP TABLE users")).toBe(false);
  });

  it("rejette du texte arbitraire", () => {
    expect(isValidIp("not-an-ip")).toBe(false);
  });
});

describe("checkAuthLimit() — fallback in-memory", () => {
  it("permet 10 hits puis bloque le 11ᵉ pour la même IP", async () => {
    const ip = "10.0.0.42";
    for (let i = 0; i < 10; i++) {
      const r = await checkAuthLimit(ip);
      expect(r.ok).toBe(true);
    }
    const r11 = await checkAuthLimit(ip);
    expect(r11.ok).toBe(false);
    expect(r11.remaining).toBe(0);
  });

  it("isole les IPs entre elles", async () => {
    const r1 = await checkAuthLimit("10.0.0.100");
    const r2 = await checkAuthLimit("10.0.0.101");
    expect(r1.ok).toBe(true);
    expect(r2.ok).toBe(true);
  });

  it("retourne un remaining décroissant pour une IP fraîche", async () => {
    const ip = "10.0.0.200";
    const first = await checkAuthLimit(ip);
    const second = await checkAuthLimit(ip);
    expect(first.remaining).toBeGreaterThan(second.remaining);
  });
});

describe("checkReservationLimit() — fallback in-memory", () => {
  it("permet 5 réservations puis bloque la 6ᵉ pour la même IP", async () => {
    const ip = "10.0.0.50";
    for (let i = 0; i < 5; i++) {
      expect((await checkReservationLimit(ip)).ok).toBe(true);
    }
    expect((await checkReservationLimit(ip)).ok).toBe(false);
  });
});
