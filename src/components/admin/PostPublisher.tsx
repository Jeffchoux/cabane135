"use client";
import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Textarea } from "@/components/ui/textarea";

export function PostPublisher({ onPublished }: { onPublished: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [pinned, setPinned] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "publishing" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function publish() {
    if (!file && !caption.trim()) {
      setError("Ajoutez une photo, une vidéo ou un texte.");
      return;
    }
    setError(null);
    setProgress(0);

    let mediaUrl: string | null = null;
    let mediaType: string | null = null;
    let type: "PHOTO" | "VIDEO" | "TEXT" = "TEXT";

    try {
      if (file) {
        setStatus("uploading");
        type = file.type.startsWith("video/") ? "VIDEO" : "PHOTO";
        mediaType = file.type;
        const ext = file.name.split(".").pop() ?? "bin";
        const key = `posts/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

        const newBlob = await upload(key, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
          contentType: file.type,
          onUploadProgress: ({ percentage }) =>
            setProgress(Math.round(percentage)),
        });
        mediaUrl = newBlob.url;
      }

      setStatus("publishing");
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          caption: caption.trim() || null,
          mediaUrl,
          mediaType,
          pinned,
        }),
      });
      if (!res.ok) throw new Error("Échec publication");

      setStatus("success");
      setTimeout(() => {
        setFile(null);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        setCaption("");
        setPinned(false);
        setProgress(0);
        setStatus("idle");
        onPublished();
      }, 1100);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
      setStatus("idle");
    }
  }

  return (
    <section className="glass p-5 md:p-6 rounded-sm">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
        className="border border-dashed border-white/15 rounded-sm cursor-pointer overflow-hidden"
      >
        {preview ? (
          file?.type.startsWith("video/") ? (
            <video src={preview} controls className="w-full max-h-96 object-contain bg-black" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Aperçu" className="w-full max-h-96 object-contain bg-black" />
          )
        ) : (
          <div className="py-12 text-center text-white/50">
            <p className="text-3xl mb-2">📷</p>
            <p className="text-sm tracking-wide">Photo ou vidéo · cliquez ou déposez</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </div>

      <Textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value.slice(0, 500))}
        placeholder="Légende (facultatif)"
        rows={3}
        className="mt-4"
      />
      <div className="flex items-center justify-between mt-2 text-xs text-white/40">
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
            className="accent-[var(--gold)]"
          />
          Épingler
        </label>
        <span>{caption.length}/500</span>
      </div>

      {status === "uploading" && (
        <div className="mt-3 h-1 bg-white/10 rounded overflow-hidden">
          <div
            className="h-full bg-[var(--gold)] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <button
        onClick={publish}
        disabled={status !== "idle" && status !== "success"}
        className="mt-4 btn-liquid w-full h-11 border border-[var(--gold)] text-[var(--gold)] text-[0.7rem] tracking-[0.3em] uppercase disabled:opacity-60"
      >
        {status === "uploading"
          ? `Upload ${progress}%`
          : status === "publishing"
          ? "Publication…"
          : status === "success"
          ? "✓ Publié !"
          : "Publier"}
      </button>
    </section>
  );
}
