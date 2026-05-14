import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendConfirmation, sendNotification } from "@/lib/resend";
import {
  reservationCreateSchema as createSchema,
  reservationPatchSchema as patchSchema,
} from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";
    const rl = await checkRateLimit(ip);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Trop de demandes. Réessayez plus tard." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }
    const { name, phone, email, date, time, covers, message } = parsed.data;

    const created = await db.reservation.create({
      data: {
        name,
        phone,
        email: email ?? null,
        date: new Date(date),
        time,
        covers,
        message: message ?? null,
      },
    });

    await Promise.allSettled([
      sendNotification({
        name,
        phone,
        email: email ?? null,
        date: new Date(date),
        time,
        covers,
        message: message ?? null,
      }),
      sendConfirmation({
        name,
        phone,
        email: email ?? null,
        date: new Date(date),
        time,
        covers,
        message: message ?? null,
      }),
    ]).then((results) => {
      results.forEach((r) => {
        if (r.status === "rejected") console.error("[resend]", r.reason);
      });
    });

    return NextResponse.json({ id: created.id, status: "ok" }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/reservations]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const rows = await db.reservation.findMany({ orderBy: { date: "asc" } });
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[GET /api/reservations]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id requis" }, { status: 400 });
  try {
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    const updated = await db.reservation.update({
      where: { id },
      data: { status: parsed.data.status },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PATCH /api/reservations]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id requis" }, { status: 400 });
  try {
    await db.reservation.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[DELETE /api/reservations]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
