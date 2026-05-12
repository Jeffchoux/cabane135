import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getPublicUrl, getUploadUrl } from "@/lib/r2";

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);
const MAX_BYTES = 50 * 1024 * 1024;

const schema = z.object({
  key: z.string().min(3).max(200),
  contentType: z.string(),
  size: z.number().int().positive(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    const { key, contentType, size } = parsed.data;
    if (!ALLOWED.has(contentType))
      return NextResponse.json({ error: "Type de fichier non autorisé" }, { status: 400 });
    if (size > MAX_BYTES)
      return NextResponse.json({ error: "Fichier trop volumineux (max 50 Mo)" }, { status: 413 });

    const uploadUrl = await getUploadUrl(key, contentType);
    const publicUrl = getPublicUrl(key);
    return NextResponse.json({ uploadUrl, publicUrl, key });
  } catch (err) {
    console.error("[POST /api/upload]", err);
    return NextResponse.json({ error: "R2 non configuré ou erreur serveur" }, { status: 500 });
  }
}
