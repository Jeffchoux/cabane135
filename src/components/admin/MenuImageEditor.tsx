"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";

type SlotImage = {
  slot: number;
  url: string;
  updatedAt: string | null;
};

type Props = {
  initial: SlotImage[];
  onSaved: () => Promise<void>;
};

export function MenuImageEditor({ initial, onSaved }: Props) {
  const [images, setImages] = useState<SlotImage[]>(initial);
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputs = useRef<Record<number, HTMLInputElement | null>>({});

  function extensionFromFile(file: File): string {
    const fromName = file.name.split(".").pop()?.toLowerCase();
    if (fromName && fromName.length <= 5) return fromName;
    const mime = file.type.split("/").pop()?.toLowerCase();
    return mime ?? "bin";
  }

  async function handleFile(slot: number, file: File) {
    if (!file) return;
    setError(null);
    setBusy(slot);
    try {
      let uploadFile: File = file;
      const ext = extensionFromFile(file);

      // HEIC/HEIF (photos iPhone par défaut) : conversion en JPEG côté client
      // car next/image ne sait pas afficher HEIC.
      if (
        /^image\/heic|^image\/heif/i.test(file.type) ||
        /\.(heic|heif)$/i.test(file.name)
      ) {
        try {
          const { default: heic2any } = await import("heic2any");
          const blobOut = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.9,
          });
          const out = Array.isArray(blobOut) ? blobOut[0] : blobOut;
          uploadFile = new File(
            [out],
            file.name.replace(/\.hei[cf]$/i, ".jpg"),
            { type: "image/jpeg" }
          );
        } catch (convErr) {
          console.error("[menu-upload] HEIC conversion failed", convErr);
          throw new Error(
            "Conversion HEIC échouée. Réessayez avec un JPEG ou PNG."
          );
        }
      }

      const finalExt =
        uploadFile.type === "image/jpeg" ? "jpg" : extensionFromFile(uploadFile);

      const blob = await upload(
        `menu/menu${slot}-${Date.now()}.${finalExt}`,
        uploadFile,
        {
          access: "public",
          handleUploadUrl: "/api/upload",
        }
      );

      const res = await fetch("/api/menu", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot, url: blob.url }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Erreur" }));
        throw new Error(body.error ?? `Erreur ${res.status}`);
      }

      const saved = await res.json();
      setImages((prev) =>
        prev.map((img) =>
          img.slot === slot
            ? { slot, url: saved.url, updatedAt: saved.updatedAt }
            : img
        )
      );
      await onSaved();
    } catch (e) {
      console.error("[menu-upload]", e);
      setError(
        e instanceof Error
          ? `${e.message}`
          : "Upload échoué — vérifiez le format et la taille."
      );
    } finally {
      setBusy(null);
      if (inputs.current[slot]) inputs.current[slot]!.value = "";
    }
  }

  return (
    <div className="space-y-8">
      {error && (
        <p className="text-sm text-red-300 bg-red-950/40 border border-red-800/40 px-4 py-3 rounded-sm">
          {error}
        </p>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        {images.map((img) => (
          <div
            key={img.slot}
            className="border border-[var(--gold)]/15 bg-[var(--ocean)]/40 p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-[0.62rem] tracking-[0.32em] uppercase text-[var(--gold)]/80">
                Page {img.slot}
              </p>
              {img.updatedAt && (
                <p className="text-[0.62rem] text-white/40">
                  MAJ {new Date(img.updatedAt).toLocaleDateString("fr-FR")}
                </p>
              )}
            </div>

            <div className="relative w-full aspect-[3/4] bg-[var(--navy)] border border-[var(--gold)]/10 overflow-hidden">
              <Image
                src={img.url}
                alt={`Carte page ${img.slot}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
                unoptimized={img.url.startsWith("/")}
              />
            </div>

            <input
              ref={(el) => {
                inputs.current[img.slot] = el;
              }}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(img.slot, file);
              }}
            />

            <button
              type="button"
              onClick={() => inputs.current[img.slot]?.click()}
              disabled={busy !== null}
              className="btn-liquid w-full h-11 border border-[var(--gold)] text-[var(--gold)] text-[0.72rem] tracking-[0.3em] uppercase disabled:opacity-40"
            >
              {busy === img.slot ? "Envoi en cours…" : "Remplacer la photo"}
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs text-white/40 leading-relaxed max-w-2xl">
        Conseil : prenez la photo bien droite, avec une bonne lumière, sans
        ombre forte. L&apos;image est affichée telle quelle sur le site.
      </p>
    </div>
  );
}
