"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useCanRender3D } from "@/hooks/useCanRender3D";

const PearlScene = dynamic(
  () => import("@/components/3d/PearlScene").then((m) => m.PearlScene),
  { ssr: false, loading: () => null }
);

const timeline = [
  {
    year: "Avant",
    place: "Lauzières",
    text: "Charente-Maritime, terre d'origine.",
  },
  {
    year: "2012",
    place: "La Réunion",
    text: "Nicolas & Nadège créent Huîtres Lebon, bar à huîtres à Saint-Denis.",
  },
  {
    year: "1ᵉʳ mai 2026",
    place: "Nieul-sur-Mer",
    text: "Ouverture de la Cabane 135 — retour aux sources, près de Lauzières.",
  },
];

export function HistorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const mouse = useMouseParallax();
  const { enabled: render3D } = useCanRender3D({ minWidth: 768 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setVisible(true), obs.disconnect()),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="histoire" ref={ref} className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:gap-16 md:grid-cols-2 items-start">
          <div className={visible ? "animate-slide-left" : "opacity-0"}>
            <p className="section-label">L'histoire</p>
            <h2 className="serif mt-4 text-4xl md:text-6xl font-light leading-tight text-[var(--pearl)]">
              Nicolas & Nadège <br />
              <span className="italic text-[var(--gold)]">Lebon</span>
            </h2>
            <div className="mt-8 space-y-5 text-white/70 leading-relaxed">
              <p>
                Nicolas et Nadège Lebon sont originaires de{" "}
                <span className="text-[var(--pearl)]">Lauzières</span>, sur la côte
                charentaise. En 2012, ils traversent les océans pour s'installer à
                <span className="text-[var(--pearl)]"> La Réunion</span> et y créer
                <em className="not-italic text-[var(--pearl)]"> Huîtres Lebon</em> —
                un bar à huîtres ouvert à Saint-Denis.
              </p>
              <p>
                Le <span className="text-[var(--pearl)]">1ᵉʳ mai 2026</span>, ils
                inaugurent <em className="not-italic text-[var(--pearl)]">Cabane 135</em> à
                Nieul-sur-Mer, à quelques minutes de Lauzières. Une cabane de
                dégustation où ils partagent leurs huîtres, leurs plateaux et la
                vue sur les marais.
              </p>
              <p>
                Aujourd'hui, ils naviguent entre les deux rivages — la
                Charente-Maritime et La Réunion — au rythme des saisons.
              </p>
            </div>

            <ol className="mt-10 space-y-4 border-l border-[var(--gold)]/25 pl-6">
              {timeline.map((t) => (
                <li key={t.year} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[31px] top-1.5 h-2 w-2 rounded-full bg-[var(--gold)]"
                  />
                  <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--gold)]">
                    {t.year} · {t.place}
                  </p>
                  <p className="text-sm text-white/65 mt-1">{t.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div
            className={visible ? "animate-slide-right" : "opacity-0"}
            style={{ animationDelay: "0.15s" }}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden border border-[var(--gold)]/20">
                <Image
                  src="/reunion-plage.jpg"
                  alt="La Réunion — plage et lagon"
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 right-2 text-[0.55rem] tracking-[0.25em] uppercase text-white/90 bg-black/45 backdrop-blur-sm px-2 py-1">
                  La Réunion
                </span>
              </div>
              <div className="relative aspect-[3/4] overflow-hidden border border-[var(--gold)]/20 mt-8">
                <Image
                  src="/ostreiculteur-parcs-huitres.jpg"
                  alt="Parcs à huîtres en Charente-Maritime"
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 right-2 text-[0.55rem] tracking-[0.25em] uppercase text-white/90 bg-black/45 backdrop-blur-sm px-2 py-1">
                  Lauzières
                </span>
              </div>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden border border-[var(--gold)]/20 mt-3">
              <Image
                src="/terrasse-vue-marais.jpg"
                alt="Terrasse de la Cabane 135 — vue sur les marais"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 backdrop-blur bg-black/40">
                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-white/85">
                  Cabane 135 · 135 rue du Port · Nieul-sur-Mer
                </p>
              </div>
              {render3D && (
                <div
                  aria-hidden
                  className="absolute -top-10 -right-10 h-32 w-32 md:h-40 md:w-40 pointer-events-none"
                >
                  <PearlScene mouseX={mouse.x} mouseY={mouse.y} />
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center gap-4 text-[0.6rem] tracking-[0.35em] uppercase text-white/40">
              <span>Atlantique</span>
              <span className="flex-1 h-px bg-white/15" />
              <span>Océan Indien</span>
              <span className="flex-1 h-px bg-white/15" />
              <span>Atlantique</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
