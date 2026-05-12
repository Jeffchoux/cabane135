"use client";
import Image from "next/image";

type Post = {
  id: string;
  type: "PHOTO" | "VIDEO" | "TEXT";
  caption: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  pinned: boolean;
  createdAt: string | Date;
};

export function MomentsFeed({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return (
      <section id="moments" className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">Nos moments</p>
          <h2 className="serif mt-4 text-4xl md:text-5xl font-light text-[var(--pearl)]">
            Arrivages, dégustation, <span className="italic text-[var(--gold)]">coulisses</span>
          </h2>
          <p className="mt-6 text-white/50">
            Les prochains posts apparaîtront ici. Suivez-nous sur Instagram pour ne rien
            manquer.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="moments" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="section-label">Nos moments</p>
          <h2 className="serif mt-4 text-4xl md:text-6xl font-light text-[var(--pearl)]">
            Nos <span className="italic text-[var(--gold)]">moments</span>
          </h2>
          <p className="mt-4 text-white/55">
            Arrivages, dégustation, coulisses du marais.
          </p>
        </div>

        <div className="masonry-3">
          {posts.map((p, i) => (
            <article
              key={p.id}
              className="relative overflow-hidden bg-[var(--ocean)] border border-white/5 group animate-fade-up"
              style={{ animationDelay: `${Math.min(i * 0.06, 0.6)}s` }}
            >
              {p.pinned && (
                <span className="absolute top-2 left-2 z-10 bg-[var(--gold)] text-[var(--navy)] px-2 py-0.5 text-[0.6rem] tracking-[0.2em] uppercase">
                  Épinglé
                </span>
              )}

              {p.mediaUrl && p.type === "PHOTO" && (
                <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src={p.mediaUrl}
                    alt={p.caption ?? "Moment Cabane 135"}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              {p.mediaUrl && p.type === "VIDEO" && (
                <video
                  src={p.mediaUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto"
                />
              )}
              {p.type === "TEXT" && p.caption && (
                <div className="p-8">
                  <p className="serif italic text-2xl text-[var(--pearl)] leading-relaxed">
                    "{p.caption}"
                  </p>
                </div>
              )}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md bg-[var(--navy)]/75 flex flex-col justify-end p-4">
                {p.caption && p.type !== "TEXT" && (
                  <p className="text-sm text-white/90 leading-relaxed">{p.caption}</p>
                )}
                <p className="mt-3 text-[0.6rem] tracking-[0.25em] uppercase text-white/50">
                  {new Date(p.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
