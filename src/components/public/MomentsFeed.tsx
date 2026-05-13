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

function Heading() {
  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-12 mb-14 md:mb-16">
      <header className="md:col-span-5">
        <p className="section-label">Nos moments</p>
        <h2
          className="serif mt-5 font-light text-[var(--pearl)] leading-[1.05]"
          style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}
        >
          Arrivages, dégustation,
          <span className="block serif italic text-[var(--gold)]">
            coulisses du marais.
          </span>
        </h2>
      </header>
      <p className="md:col-span-6 md:col-start-7 text-white/55 text-[0.95rem] leading-relaxed self-end max-w-md">
        Une chronique courte de ce qui passe à la cabane — l'ardoise du jour,
        un détail, un coucher de soleil sur le ponton.
      </p>
    </div>
  );
}

export function MomentsFeed({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return (
      <section id="moments" className="px-6 py-28 md:py-32 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Heading />
          <div className="border-y border-[var(--gold)]/15 py-16 text-center">
            <p className="serif italic text-[var(--pearl)]/70 text-lg max-w-lg mx-auto leading-snug">
              Les premiers moments de la cabane{" "}
              <span className="text-[var(--gold)]">arrivent bientôt</span>.
            </p>
            <p className="mt-4 text-white/45 text-sm">
              En attendant, suivez les arrivages du jour sur{" "}
              <a
                href="https://www.instagram.com/huitresleboncabane135/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--gold)] hover:underline underline-offset-4"
              >
                Instagram
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="moments" className="relative px-6 py-28 md:py-32 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Heading />

        <div className="masonry-3">
          {posts.map((p, i) => (
            <article
              key={p.id}
              className="relative overflow-hidden bg-[var(--ocean)] border border-white/5 group animate-fade-up"
              style={{ animationDelay: `${Math.min(i * 0.06, 0.6)}s` }}
            >
              {p.pinned && (
                <span className="absolute top-2 left-2 z-10 bg-[var(--gold)] text-[var(--navy)] px-2 py-0.5 text-[0.6rem] tracking-[0.25em] uppercase">
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
                    « {p.caption} »
                  </p>
                </div>
              )}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md bg-[var(--navy)]/75 flex flex-col justify-end p-5">
                {p.caption && p.type !== "TEXT" && (
                  <p className="text-sm text-white/90 leading-relaxed">
                    {p.caption}
                  </p>
                )}
                <p className="mt-3 text-[0.6rem] tracking-[0.3em] uppercase text-[var(--gold)]/85">
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
