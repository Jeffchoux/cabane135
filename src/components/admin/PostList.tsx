"use client";
import { useState } from "react";

type Post = {
  id: string;
  type: "PHOTO" | "VIDEO" | "TEXT";
  caption: string | null;
  mediaUrl: string | null;
  pinned: boolean;
  published: boolean;
  createdAt: string;
};

export function PostList({ initial }: { initial: Post[] }) {
  const [posts, setPosts] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);

  async function patch(id: string, body: Partial<Post>) {
    setBusy(id);
    setPosts((arr) => arr.map((p) => (p.id === id ? { ...p, ...body } : p)));
    try {
      await fetch(`/api/posts?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } finally {
      setBusy(null);
    }
  }

  async function remove(id: string) {
    if (!confirm("Supprimer ce post ?")) return;
    setBusy(id);
    setPosts((arr) => arr.filter((p) => p.id !== id));
    await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
    setBusy(null);
  }

  if (!posts.length) {
    return (
      <p className="text-white/40 text-center py-10 text-sm">Aucun post pour le moment.</p>
    );
  }

  return (
    <div className="masonry-3">
      {posts.map((p) => (
        <article
          key={p.id}
          className={`relative group overflow-hidden bg-[var(--ocean)] border border-white/5 ${
            !p.published ? "opacity-50" : ""
          }`}
        >
          <div className="absolute top-2 left-2 z-10 flex gap-1.5">
            {p.pinned && (
              <span className="bg-[var(--gold)] text-[var(--navy)] px-2 py-0.5 text-[0.55rem] tracking-[0.2em] uppercase">
                Épinglé
              </span>
            )}
            {!p.published && (
              <span className="bg-red-500/40 text-white px-2 py-0.5 text-[0.55rem] tracking-[0.2em] uppercase">
                Dépublié
              </span>
            )}
          </div>

          {p.mediaUrl && p.type === "PHOTO" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.mediaUrl} alt={p.caption ?? ""} className="w-full block" />
          )}
          {p.mediaUrl && p.type === "VIDEO" && (
            <video src={p.mediaUrl} muted playsInline className="w-full" controls />
          )}
          {p.type === "TEXT" && (
            <p className="serif italic p-6 text-[var(--pearl)] text-lg">
              {p.caption}
            </p>
          )}

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--navy)]/85 backdrop-blur-sm flex flex-col items-center justify-center gap-2 p-4 text-[0.65rem] tracking-[0.25em] uppercase">
            <button
              onClick={() => patch(p.id, { pinned: !p.pinned })}
              disabled={busy === p.id}
              className="w-full py-2 border border-white/20 text-white/85 hover:bg-white/10"
            >
              {p.pinned ? "Désépingler" : "Épingler"}
            </button>
            <button
              onClick={() => patch(p.id, { published: !p.published })}
              disabled={busy === p.id}
              className="w-full py-2 border border-white/20 text-white/85 hover:bg-white/10"
            >
              {p.published ? "Dépublier" : "Publier"}
            </button>
            <button
              onClick={() => remove(p.id)}
              disabled={busy === p.id}
              className="w-full py-2 border border-red-500/40 text-red-300 hover:bg-red-500/20"
            >
              Supprimer
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
