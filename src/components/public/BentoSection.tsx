"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useCount(to: number, when: boolean, duration = 1500) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!when) return;
    const start = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, when, duration]);
  return v;
}

export function BentoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setVis(true), obs.disconnect()),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const c1 = useCount(2012, vis);
  const c2 = useCount(135, vis);
  const c3 = useCount(2026, vis);

  return (
    <section id="degustation" ref={ref} className="relative px-6 py-28 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="section-label">À la cabane</p>
          <h2 className="serif mt-4 text-4xl md:text-6xl font-light text-[var(--pearl)]">
            La <span className="italic text-[var(--gold)]">dégustation</span>
          </h2>
        </div>

        <div
          className="grid gap-[2px] bg-[var(--gold)]/10"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "280px 200px 120px",
          }}
        >
          {/* Carte 1 — Grande */}
          <div
            className="relative overflow-hidden bg-[var(--ocean)]"
            style={{ gridColumn: "1", gridRow: "1 / span 2" }}
          >
            <Image
              src="/terrasse-parasol-bambous.jpg"
              alt="Terrasse de la Cabane 135"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <span className="absolute top-4 left-4 glass px-3 py-1 text-[0.65rem] tracking-[0.3em] uppercase text-[var(--turquoise)]">
              Ouvert · 1ᵉʳ mai 2026
            </span>
            <h3 className="absolute bottom-5 left-5 right-5 serif text-2xl md:text-3xl text-[var(--pearl)] leading-tight">
              Entre <span className="italic text-[var(--gold)]">deux océans</span><br />
              Atlantique · Indien
            </h3>
          </div>

          {/* Carte 2 */}
          <div
            className="bento-card relative bg-[var(--ocean)] hover:bg-[var(--teal)]/40 p-6"
            style={{ gridColumn: "2", gridRow: "1" }}
          >
            <span className="serif text-6xl text-[var(--gold)]/15 absolute top-3 right-4">01</span>
            <div className="relative">
              <h3 className="serif text-2xl text-[var(--pearl)]">Huîtres fraîches</h3>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">
                Calibrées, ouvertes minute. Citron, vinaigre échalote.
              </p>
            </div>
          </div>

          {/* Carte 3 */}
          <div
            className="bento-card relative bg-[var(--ocean)] hover:bg-[var(--teal)]/40 p-6"
            style={{ gridColumn: "3", gridRow: "1" }}
          >
            <span className="serif text-6xl text-[var(--gold)]/15 absolute top-3 right-4">02</span>
            <div className="relative">
              <h3 className="serif text-2xl text-[var(--pearl)]">Plateaux</h3>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">
                Huîtres, gambas, bulots, crevettes — la mer dans l'assiette.
              </p>
            </div>
          </div>

          {/* Carte 4 */}
          <div
            className="bento-card relative bg-gradient-to-r from-[var(--ocean)] to-[var(--teal)] p-6 flex items-center gap-6"
            style={{ gridColumn: "2 / span 2", gridRow: "2" }}
          >
            <span className="serif text-6xl text-[var(--gold)]/20">03</span>
            <div>
              <h3 className="serif text-2xl text-[var(--pearl)]">Vente à emporter</h3>
              <p className="mt-2 text-sm text-white/60">
                Pour vos tables, vos fêtes, vos pique-niques au bord de l'eau.
              </p>
            </div>
          </div>

          {/* Carte 5 — Stats */}
          <div
            className="bg-[var(--ocean)]/80 backdrop-blur-md flex items-center justify-around px-6 text-center"
            style={{ gridColumn: "1 / span 3", gridRow: "3" }}
          >
            <div>
              <p className="serif text-3xl md:text-4xl text-[var(--gold)]">{c1}</p>
              <p className="text-[0.55rem] tracking-[0.3em] uppercase text-white/40 mt-1">Huîtres Lebon · La Réunion</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="serif text-3xl md:text-4xl text-[var(--gold)]">{c2}</p>
              <p className="text-[0.55rem] tracking-[0.3em] uppercase text-white/40 mt-1">rue du Port</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="serif text-3xl md:text-4xl text-[var(--gold)]">{c3}</p>
              <p className="text-[0.55rem] tracking-[0.3em] uppercase text-white/40 mt-1">Cabane 135 · Nieul-sur-Mer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
