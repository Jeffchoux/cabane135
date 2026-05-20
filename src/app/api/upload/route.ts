import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Types acceptés : tout image/* sauf SVG (risque XSS via script embarqué)
 * + vidéos courantes. HEIC/HEIF iPhone explicitement listés car certains
 * navigateurs envoient un mime type vide ou non-standard.
 */
const ALLOWED = [
  "image/jpeg",
  "image/jpg",
  "image/pjpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
  "image/tiff",
  "image/bmp",
  "image/x-icon",
  "image/vnd.microsoft.icon",
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "video/x-m4v",
];

const MAX_BYTES = 50 * 1024 * 1024;

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED,
        maximumSizeInBytes: MAX_BYTES,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {
        // no-op : la callback est obligatoire mais on n'a rien à faire
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (err) {
    console.error("[POST /api/upload]", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Upload échoué — Blob non configuré ou erreur serveur",
      },
      { status: 500 }
    );
  }
}
