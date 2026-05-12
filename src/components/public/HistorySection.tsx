"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function HistorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setVisible(true), obs.disconnect()),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="histoire" ref={ref} className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl grid gap-12 md:gap-16 md:grid-cols-2 items-center">
        <div className={visible ? "animate-slide-left" : "opacity-0"}>
          <p className="section-label">Notre histoire</p>
          <h2 className="serif mt-4 text-4xl md:text-6xl font-light leading-tight text-[var(--pearl)]">
            De La Réunion <br />
            <span className="italic text-[var(--gold)]">à l'Atlantique</span>
          </h2>
          <div className="mt-8 space-y-5 text-white/70 leading-relaxed">
            <p>
              Une histoire de famille, née dans l'océan Indien et arrivée sur les rives de
              la Charente-Maritime. La passion des produits de la mer s'est transmise de
              génération en génération, d'une île à l'autre.
            </p>
            <p>
              Depuis 2013, les huîtres Lebon sont élevées avec soin dans les marais de
              Lauzières. Travail patient, respect du rythme des marées, savoir-faire
              d'ostréiculteur.
            </p>
            <p>
              En mai 2025, nous avons ouvert la <em className="text-[var(--pearl)] not-italic">Cabane 135</em> —
              un lieu pour partager nos huîtres, nos plateaux et la vue sur les marais.
            </p>
          </div>
          <div className="mt-8 inline-flex items-center gap-3 glass px-4 py-2 rounded-full text-sm">
            <span className="text-lg">🦪</span>
            <span className="text-white/80 tracking-wide">Depuis 2013</span>
          </div>
        </div>

        <div className={visible ? "animate-slide-right" : "opacity-0"} style={{ animationDelay: "0.15s" }}>
          <div className="relative aspect-[4/5] overflow-hidden border border-[var(--gold)]/20">
            <Image
              src="/ostreiculteur-parcs-huitres.jpg"
              alt="Ostréiculteur sur les parcs à huîtres"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 glass-strong">
              <p className="text-xs tracking-[0.25em] uppercase text-white/60">
                135 rue du Port · Nieul-sur-Mer
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4 text-[0.65rem] tracking-[0.35em] uppercase text-white/40">
            <span>La Réunion</span>
            <span className="flex-1 h-px bg-white/15" />
            <span>Atlantique</span>
          </div>
        </div>
      </div>
    </section>
  );
}
