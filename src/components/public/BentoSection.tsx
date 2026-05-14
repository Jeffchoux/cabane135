"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const items = [
  {
    roman: "I",
    title: "Huîtres fraîches",
    body: "Calibrées, ouvertes à la minute. Citron ou vinaigre échalote, rien d'autre.",
  },
  {
    roman: "II",
    title: "Plateaux",
    body: "Huîtres, gambas, bulots, crevettes. La mer servie comme on l'aime, sans détour.",
  },
  {
    roman: "III",
    title: "Vente à emporter",
    body: "Pour vos tables, vos fêtes, vos pique-niques au bord de l'eau. On vous prépare, vous emportez.",
  },
];

export function BentoSection() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setVis(true), obs.disconnect()),
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="degustation"
      ref={ref}
      className="relative px-6 py-28 md:py-40 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 md:grid-cols-12 md:gap-12 lg:gap-16">
          <header
            className={`md:col-span-5 ${vis ? "animate-fade-up" : ""}`}
          >
            <p className="section-label">À la cabane</p>
            <h2
              className="serif mt-5 font-light text-[var(--pearl)] leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
            >
              La dégustation
            </h2>
            <p
              className="serif italic text-[var(--gold)] mt-6 max-w-md leading-snug"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
            >
              Trois manières de partager la mer, ouvertes à la minute sur la
              terrasse de Nieul.
            </p>
            <p className="mt-5 text-white/55 text-sm leading-relaxed max-w-md">
              On reçoit. On prépare. On laisse le produit parler. Pas de carte
              à rallonge, pas de chichi — l'iode et le sel, comme à la Réunion
              comme en Charente.
            </p>
          </header>

          <div
            className={`md:col-span-7 ${vis ? "animate-slide-right" : ""}`}
            style={{ animationDelay: "0.15s" }}
          >
            <div className="relative aspect-[5/4] md:aspect-[4/5] lg:aspect-[5/4] w-full overflow-hidden border border-[var(--gold)]/15">
              <Image
                src="/huitres-mignonette.jpg"
                alt="Plateau d'huîtres ouvertes à la minute, beurre et mignonette à l'échalote"
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, rgba(10,22,40,0.55) 100%)",
                }}
              />
              <p className="absolute bottom-5 left-5 right-5 serif italic text-[var(--pearl)]/90 text-sm md:text-base leading-snug">
                « L'huître ouverte minute, la mer dans l'assiette. »
                <span className="block not-italic mt-2 text-[0.6rem] tracking-[0.32em] uppercase text-[var(--gold)]/80">
                  Nicolas Lebon
                </span>
              </p>
            </div>
          </div>
        </div>

        <ol
          className={`mt-20 md:mt-28 divide-y divide-[var(--gold)]/15 border-y border-[var(--gold)]/15`}
        >
          {items.map((it, i) => (
            <li
              key={it.roman}
              className={`grid grid-cols-12 gap-4 md:gap-10 py-8 md:py-12 ${
                vis ? "animate-fade-up" : ""
              }`}
              style={{ animationDelay: `${0.25 + i * 0.12}s` }}
            >
              <span
                className="col-span-2 md:col-span-1 serif italic text-[var(--gold)] text-2xl md:text-4xl leading-none pt-1"
                aria-hidden
              >
                {it.roman}
              </span>
              <h3
                className="col-span-10 md:col-span-4 serif text-[var(--pearl)] font-light leading-tight"
                style={{ fontSize: "clamp(1.35rem, 2.4vw, 2rem)" }}
              >
                {it.title}
              </h3>
              <p className="col-start-3 md:col-start-auto col-span-10 md:col-span-7 text-white/65 leading-relaxed max-w-xl text-[0.95rem]">
                {it.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
