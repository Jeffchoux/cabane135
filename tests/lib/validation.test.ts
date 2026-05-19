import { describe, it, expect } from "vitest";
import {
  reservationCreateSchema,
  reservationPatchSchema,
  menuImageUpsertSchema,
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

describe("menuImageUpsertSchema", () => {
  const validBlobUrl =
    "https://abc123.public.blob.vercel-storage.com/menu/menu1-12345.jpg";

  it("accepte slot=1 avec URL Blob Vercel", () => {
    const r = menuImageUpsertSchema.safeParse({ slot: 1, url: validBlobUrl });
    expect(r.success).toBe(true);
  });

  it("accepte slot=2 avec URL Blob Vercel", () => {
    const r = menuImageUpsertSchema.safeParse({ slot: 2, url: validBlobUrl });
    expect(r.success).toBe(true);
  });

  it("accepte URL media.cabane135.fr (legacy)", () => {
    const r = menuImageUpsertSchema.safeParse({
      slot: 1,
      url: "https://media.cabane135.fr/menu.jpg",
    });
    expect(r.success).toBe(true);
  });

  it("rejette slot=0", () => {
    expect(
      menuImageUpsertSchema.safeParse({ slot: 0, url: validBlobUrl }).success
    ).toBe(false);
  });

  it("rejette slot=3", () => {
    expect(
      menuImageUpsertSchema.safeParse({ slot: 3, url: validBlobUrl }).success
    ).toBe(false);
  });

  it("rejette une URL hors whitelist (host arbitraire)", () => {
    expect(
      menuImageUpsertSchema.safeParse({
        slot: 1,
        url: "https://evil.com/menu.jpg",
      }).success
    ).toBe(false);
  });

  it("rejette une URL http:// (non https)", () => {
    expect(
      menuImageUpsertSchema.safeParse({
        slot: 1,
        url: "http://abc.public.blob.vercel-storage.com/menu.jpg",
      }).success
    ).toBe(false);
  });

  it("rejette une string vide", () => {
    expect(
      menuImageUpsertSchema.safeParse({ slot: 1, url: "" }).success
    ).toBe(false);
  });
});
