"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function CountUp({ to, duration = 1500 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const tick = (t: number) => {
          const elapsed = t - start;
          const p = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}</span>;
}

function StaggerText({ text, className = "", baseDelay = 0 }: { text: string; className?: string; baseDelay?: number }) {
  return (
    <span className={className}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className="letter-in"
          style={{ animationDelay: `${baseDelay + i * 0.04}s` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export function Hero({ onReserve }: { onReserve: () => void }) {
  return (
    <section
      id="hero"
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      <Image
        src="/facade-cabane135.jpg"
        alt="Façade Cabane 135 — Huîtres au détail & dégustation"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(10,22,40,0.88) 0%, rgba(15,32,53,0.75) 60%, rgba(22,58,85,0.6) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full animate-float-orb"
        style={{ background: "rgba(0,184,217,0.15)", filter: "blur(140px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full animate-float-orb"
        style={{ background: "rgba(200,161,90,0.08)", filter: "blur(100px)", animationDirection: "reverse", animationDuration: "25s" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p
          className="section-label animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Nieul-sur-Mer · Charente-Maritime · Depuis mai 2025
        </p>

        <h1 className="serif mt-8 leading-[0.95] font-light">
          <span className="block text-[var(--pearl)]" style={{ fontSize: "clamp(3.5rem,9vw,8rem)" }}>
            <StaggerText text="Huîtres" />
          </span>
          <span
            className="block italic text-[var(--gold)] mt-2"
            style={{ fontSize: "clamp(4.5rem,11vw,10rem)" }}
          >
            <StaggerText text="Lebon" baseDelay={0.4} />
          </span>
        </h1>

        <p
          className="serif italic text-white/70 mt-6 mx-auto inline-block typewriter"
          style={{ fontSize: "clamp(1.1rem,2.2vw,1.6rem)" }}
        >
          Cabane de dégustation · N° 135
        </p>

        <div className="mt-10 animate-fade-up" style={{ animationDelay: "1.6s" }}>
          <div className="serif text-[var(--turquoise)]" style={{ fontSize: "clamp(4rem,9vw,8rem)", lineHeight: 1 }}>
            <CountUp to={135} />
          </div>
          <p className="mt-2 text-[0.7rem] tracking-[0.3em] uppercase text-white/35">
            rue du Port · Nieul-sur-Mer
          </p>
        </div>

        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "1.8s" }}
        >
          <button
            onClick={onReserve}
            className="btn-liquid h-12 border border-[var(--gold)] px-8 text-[0.72rem] tracking-[0.32em] uppercase text-[var(--gold)]"
          >
            Réserver une table
          </button>
          <a
            href="#moments"
            className="h-12 inline-flex items-center justify-center glass px-8 text-[0.72rem] tracking-[0.32em] uppercase text-white/80 hover:text-white"
          >
            Nos moments ↓
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div
          aria-hidden
          className="scroll-hint h-12 w-px bg-[var(--turquoise)]/50"
        />
        <span className="text-[0.55rem] tracking-[0.3em] uppercase text-white/30">
          Découvrir
        </span>
      </div>
    </section>
  );
}
