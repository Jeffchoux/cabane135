"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function StaggerText({
  text,
  baseDelay = 0,
  step = 0.05,
}: {
  text: string;
  baseDelay?: number;
  step?: number;
}) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className="letter-in inline-block"
          style={{ animationDelay: `${baseDelay + i * step}s` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

export function Hero({ onReserve }: { onReserve: () => void }) {
  const [revealTail, setRevealTail] = useState(false);
  const tailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setRevealTail(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      <Image
        src="/concert-crepuscule.jpg"
        alt="Cabane 135 au crépuscule — l'estuaire à l'heure bleue"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 35%" }}
      />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.62) 42%, rgba(10,22,40,0.18) 78%, rgba(10,22,40,0.08) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-3/4"
        style={{
          background:
            "linear-gradient(to top, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.55) 35%, rgba(10,22,40,0.15) 70%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,22,40,0.7) 0%, transparent 100%)",
        }}
      />

      <header className="absolute top-20 md:top-24 right-6 md:right-12 z-10 text-right">
        <p className="section-label flex items-center justify-end gap-2.5">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--turquoise)]"
            style={{ animation: "scrollHint 2.4s ease-in-out infinite" }}
          />
          <span>Ouvre&nbsp;le&nbsp;1ᵉʳ&nbsp;mai&nbsp;2026</span>
        </p>
      </header>

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 sm:px-10 md:px-14 md:pb-20 lg:px-20 lg:pb-24">
        <div className="max-w-[36rem]">
          <p
            className="section-label animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Nieul-sur-Mer · Charente-Maritime
          </p>

          <h1
            className="serif mt-6 md:mt-8 font-light leading-[0.92] tracking-[0.02em]"
            style={{ perspective: 1200 }}
          >
            <span
              className="block text-[var(--pearl)]"
              style={{ fontSize: "clamp(3.75rem, 13vw, 9rem)" }}
            >
              <StaggerText text="CABANE" />
            </span>
            <span
              className="block text-[var(--turquoise)]"
              style={{
                fontSize: "clamp(4.5rem, 16vw, 11rem)",
                marginTop: "-0.08em",
              }}
            >
              <StaggerText text="135" baseDelay={0.36} step={0.08} />
            </span>
          </h1>

          <div
            ref={tailRef}
            className="mt-7 md:mt-9 transition-opacity duration-1000"
            style={{ opacity: revealTail ? 1 : 0 }}
          >
            <p
              className="serif italic text-[var(--gold)] leading-snug max-w-md"
              style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.45rem)" }}
            >
              Entre deux marées, sur le seuil d'un estuaire.
            </p>
            <p className="mt-3 text-white/55 text-[0.78rem] tracking-[0.12em] italic serif">
              by&nbsp;Huîtres&nbsp;Lebon — l'Atlantique &amp; l'océan&nbsp;Indien
            </p>

            <div className="mt-10 md:mt-12 flex items-center gap-7 md:gap-9 flex-wrap">
              <button
                onClick={onReserve}
                className="group inline-flex items-center gap-4 text-[var(--gold)] tracking-[0.32em] text-[0.72rem] uppercase font-medium"
                aria-label="Réserver une table à la Cabane 135"
              >
                <span
                  aria-hidden
                  className="h-px w-10 bg-[var(--gold)] transition-all duration-500 group-hover:w-20"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                />
                <span>Réserver</span>
                <span
                  aria-hidden
                  className="opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>

              <a
                href="#histoire"
                className="text-white/45 hover:text-white/85 transition-colors tracking-[0.32em] text-[0.72rem] uppercase"
              >
                Découvrir ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
