import { describe, it, expect } from "vitest";
import {
  reservationCreateSchema,
  reservationPatchSchema,
} from "@/lib/validation";

const valid = {
  name: "Nicolas Lebon",
  phone: "0546413682",
  email: "client@example.com",
  date: "2026-06-15",
  time: "19:30",
  covers: 4,
  message: "Allergie aux fruits à coque",
};

describe("reservationCreateSchema", () => {
  it("valide un payload complet", () => {
    expect(reservationCreateSchema.safeParse(valid).success).toBe(true);
  });

  it("valide sans email ni message", () => {
    const { email: _e, message: _m, ...rest } = valid;
    expect(reservationCreateSchema.safeParse(rest).success).toBe(true);
  });

  it("transforme email vide en undefined", () => {
    const r = reservationCreateSchema.safeParse({ ...valid, email: "" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.email).toBeUndefined();
  });

  it("rejette un nom trop court", () => {
    expect(reservationCreateSchema.safeParse({ ...valid, name: "X" }).success).toBe(false);
  });

  it("rejette un téléphone invalide (lettres)", () => {
    expect(
      reservationCreateSchema.safeParse({ ...valid, phone: "abcdefgh" }).success
    ).toBe(false);
  });

  it("rejette un téléphone trop court", () => {
    expect(reservationCreateSchema.safeParse({ ...valid, phone: "0123" }).success).toBe(false);
  });

  it("rejette une heure mal formatée", () => {
    expect(reservationCreateSchema.safeParse({ ...valid, time: "19h30" }).success).toBe(false);
  });

  it("rejette covers < 1", () => {
    expect(reservationCreateSchema.safeParse({ ...valid, covers: 0 }).success).toBe(false);
  });

  it("rejette covers > 20", () => {
    expect(reservationCreateSchema.safeParse({ ...valid, covers: 21 }).success).toBe(false);
  });

  it("rejette une date invalide", () => {
    expect(
      reservationCreateSchema.safeParse({ ...valid, date: "pas une date" }).success
    ).toBe(false);
  });

  it("rejette un email mal formé", () => {
    expect(
      reservationCreateSchema.safeParse({ ...valid, email: "pas-un-email" }).success
    ).toBe(false);
  });

  it("rejette un message > 2000 caractères", () => {
    expect(
      reservationCreateSchema.safeParse({ ...valid, message: "x".repeat(2001) }).success
    ).toBe(false);
  });
});

describe("reservationPatchSchema", () => {
  it("accepte PENDING / CONFIRMED / CANCELLED", () => {
    for (const status of ["PENDING", "CONFIRMED", "CANCELLED"] as const) {
      expect(reservationPatchSchema.safeParse({ status }).success).toBe(true);
    }
  });

  it("rejette un statut hors enum", () => {
    expect(reservationPatchSchema.safeParse({ status: "DRAFT" }).success).toBe(false);
  });

  it("rejette un objet vide", () => {
    expect(reservationPatchSchema.safeParse({}).success).toBe(false);
  });
});
