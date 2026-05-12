"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function StaggerText({
  text,
  className = "",
  baseDelay = 0,
  step = 0.05,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  step?: number;
}) {
  return (
    <span className={className}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className="letter-in inline-block"
          style={{ animationDelay: `${baseDelay + i * step}s` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export function Hero({ onReserve }: { onReserve: () => void }) {
  const [revealTagline, setRevealTagline] = useState(false);
  const tRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setRevealTagline(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      <Image
        src="/facade-cabane135.jpg"
        alt="Cabane 135 — Huîtres au détail & dégustation"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, rgba(10,22,40,0.92) 0%, rgba(15,32,53,0.82) 55%, rgba(22,58,85,0.65) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full animate-float-orb"
        style={{ background: "rgba(0,184,217,0.12)", filter: "blur(160px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full animate-float-orb"
        style={{
          background: "rgba(200,161,90,0.07)",
          filter: "blur(120px)",
          animationDirection: "reverse",
          animationDuration: "26s",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p
          className="section-label animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Nieul-sur-Mer · Charente-Maritime
        </p>

        <h1
          className="serif mt-8 font-light leading-none flex flex-wrap items-baseline justify-center gap-x-4 md:gap-x-6"
          style={{ perspective: 1200 }}
        >
          <span
            className="text-[var(--pearl)] tracking-[0.04em]"
            style={{ fontSize: "clamp(3.5rem, 13vw, 11rem)" }}
          >
            <StaggerText text="CABANE" />
          </span>
          <span
            className="text-[var(--turquoise)] tracking-[0.02em]"
            style={{ fontSize: "clamp(4rem, 14vw, 12rem)" }}
          >
            <StaggerText text="135" baseDelay={0.36} />
          </span>
        </h1>

        <div
          ref={tRef}
          className="mt-6 flex items-center justify-center gap-4 transition-opacity duration-700"
          style={{ opacity: revealTagline ? 1 : 0 }}
        >
          <span className="h-px w-10 bg-[var(--gold)]/45" aria-hidden />
          <p
            className="serif italic text-[var(--gold)] tracking-[0.18em]"
            style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.25rem)" }}
          >
            by Huîtres Lebon
          </p>
          <span className="h-px w-10 bg-[var(--gold)]/45" aria-hidden />
        </div>

        <p
          className="mt-8 text-white/70 tracking-[0.08em] animate-fade-up"
          style={{
            animationDelay: "1.6s",
            fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
          }}
        >
          Huîtres au détail · Dégustation · Plateaux à emporter
        </p>

        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "1.85s" }}
        >
          <button
            onClick={onReserve}
            className="btn-liquid h-12 border border-[var(--gold)] px-8 text-[0.72rem] tracking-[0.32em] uppercase text-[var(--gold)]"
          >
            Réserver une table
          </button>
          <a
            href="#histoire"
            className="h-12 inline-flex items-center justify-center glass px-8 text-[0.72rem] tracking-[0.32em] uppercase text-white/80 hover:text-white"
          >
            Découvrir ↓
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div
          aria-hidden
          className="scroll-hint h-12 w-px bg-[var(--turquoise)]/50"
        />
        <span className="text-[0.55rem] tracking-[0.3em] uppercase text-white/30">
          Scroll
        </span>
      </div>
    </section>
  );
}
