import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const ALLOWED = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "video/mp4",
  "video/quicktime",
  "video/webm",
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
        addRandomSuffix: false,
      }),
      onUploadCompleted: async ({ blob }) => {
        console.log("[blob uploaded]", blob.pathname, blob.url);
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (err) {
    console.error("[POST /api/upload]", err);
    return NextResponse.json(
      { error: "Upload échoué — Blob non configuré ou erreur serveur" },
      { status: 500 }
    );
  }
}
