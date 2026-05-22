import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { sendNotification } from "@/lib/resend";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = (await req.json()) as { id?: string };
    if (!id) return NextResponse.json({ error: "id requis" }, { status: 400 });
    const r = await db.reservation.findUnique({ where: { id } });
    if (!r) return NextResponse.json({ error: "Réservation introuvable" }, { status: 404 });
    await sendNotification({
      name: r.name,
      phone: r.phone,
      email: r.email,
      date: r.date,
      time: r.time,
      covers: r.covers,
      message: r.message,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[POST /api/reservations/resend-notification]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
