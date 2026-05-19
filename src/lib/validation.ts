import { z } from "zod";

export const reservationCreateSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().regex(/^[\d\s+\-.]{8,}$/),
  email: z
    .email()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  date: z.string().refine((s) => !Number.isNaN(Date.parse(s)), "Date invalide"),
  time: z.string().regex(/^\d{1,2}:\d{2}$/),
  covers: z.number().int().min(1).max(20),
  message: z.string().max(2000).optional(),
});

export const reservationPatchSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED"]),
});

const ALLOWED_MENU_HOSTS = [
  /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//,
  /^https:\/\/media\.cabane135\.fr\//,
];

export const menuImageUpsertSchema = z.object({
  slot: z.number().int().min(1).max(2),
  url: z
    .url()
    .refine(
      (u) => ALLOWED_MENU_HOSTS.some((re) => re.test(u)),
      "Domaine media non autorisé"
    ),
});

export type ReservationCreate = z.infer<typeof reservationCreateSchema>;
export type ReservationPatch = z.infer<typeof reservationPatchSchema>;
export type MenuImageUpsert = z.infer<typeof menuImageUpsertSchema>;
