import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { menuImageUpsertSchema } from "@/lib/validation";

export const DEFAULT_MENU = {
  1: "/menu1.jpg",
  2: "/menu2.jpg",
} as const;

export async function GET() {
  try {
    const rows = await db.menuImage.findMany({ orderBy: { slot: "asc" } });
    const map: Record<number, string> = { ...DEFAULT_MENU };
    for (const r of rows) map[r.slot] = r.url;
    return NextResponse.json(
      [
        { slot: 1, url: map[1] },
        { slot: 2, url: map[2] },
      ],
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (err) {
    console.error("[GET /api/menu]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const parsed = menuImageUpsertSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    const { slot, url } = parsed.data;
    const upserted = await db.menuImage.upsert({
      where: { slot },
      create: { slot, url },
      update: { url },
    });
    return NextResponse.json(upserted);
  } catch (err) {
    console.error("[PATCH /api/menu]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
