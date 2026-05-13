import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

// Whitelist domaines autorisés pour mediaUrl (storage Blob + legacy media.cabane135.fr)
const ALLOWED_MEDIA_HOSTS = [
  /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//,
  /^https:\/\/media\.cabane135\.fr\//,
];

const ALLOWED_MEDIA_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);

const createSchema = z.object({
  type: z.enum(["PHOTO", "VIDEO", "TEXT"]),
  caption: z.string().max(500).nullable().optional(),
  mediaUrl: z
    .string()
    .url()
    .refine(
      (u) => ALLOWED_MEDIA_HOSTS.some((re) => re.test(u)),
      "Domaine media non autorisé"
    )
    .nullable()
    .optional(),
  mediaType: z
    .string()
    .max(120)
    .refine((t) => ALLOWED_MEDIA_TYPES.has(t), "Type media non autorisé")
    .nullable()
    .optional(),
  pinned: z.boolean().optional(),
});

const patchSchema = z.object({
  caption: z.string().max(500).nullable().optional(),
  pinned: z.boolean().optional(),
  published: z.boolean().optional(),
});

export async function GET() {
  try {
    const posts = await db.post.findMany({
      where: { published: true },
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
      take: 60,
    });
    return NextResponse.json(posts);
  } catch (err) {
    console.error("[GET /api/posts]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    const post = await db.post.create({
      data: {
        type: parsed.data.type,
        caption: parsed.data.caption ?? null,
        mediaUrl: parsed.data.mediaUrl ?? null,
        mediaType: parsed.data.mediaType ?? null,
        pinned: parsed.data.pinned ?? false,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("[POST /api/posts]", err);
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
    const updated = await db.post.update({ where: { id }, data: parsed.data });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PATCH /api/posts]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id requis" }, { status: 400 });
  try {
    await db.post.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[DELETE /api/posts]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
