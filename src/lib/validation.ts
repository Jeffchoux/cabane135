import { z } from "zod";

export const reservationCreateSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().regex(/^[\d\s+\-.]{8,}$/),
  email: z
    .string()
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

export type ReservationCreate = z.infer<typeof reservationCreateSchema>;
export type ReservationPatch = z.infer<typeof reservationPatchSchema>;
