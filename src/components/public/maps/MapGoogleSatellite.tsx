"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function MapGoogleSatellite() {
  const [loaded, setLoaded] = useState(false);
  const embed =
    "https://maps.google.com/maps?q=HUITRES+LEBON+CABANE+135,135+Rue+du+Port,17137+Nieul-sur-Mer&z=14&t=h&output=embed";

  if (loaded) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[var(--navy)]">
        <iframe
          src={embed}
          title="Google Maps satellite — Cabane 135"
          width="100%"
          height="100%"
          style={{ border: 0, position: "absolute", inset: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,22,40,0.55) 0%, transparent 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[var(--ocean)]">
      <Image
        src="/terrasse-vue-marais.jpg"
        alt="Aperçu de l'emplacement de la Cabane 135"
        fill
        sizes="(min-width: 768px) 66vw, 100vw"
        className="object-cover"
        style={{ filter: "brightness(0.55) saturate(0.85) blur(2px)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.80) 100%)",
        }}
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <p className="text-[0.62rem] tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
          Carte interactive · Google Maps
        </p>
        <h3
          className="serif font-medium text-[var(--pearl)] leading-tight max-w-lg"
          style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.2rem)" }}
        >
          Afficher la carte
        </h3>
        <p className="mt-4 text-white/65 text-[0.9rem] max-w-md leading-relaxed">
          Le chargement de la carte dépose des cookies tiers de Google et
          partage votre adresse IP avec Google&nbsp;LLC.
        </p>
        <p className="mt-2 text-white/45 text-[0.78rem] max-w-md leading-relaxed">
          <Link
            href="/confidentialite"
            className="text-[var(--gold)]/80 hover:text-[var(--gold)] underline underline-offset-4"
          >
            En savoir plus dans notre politique de confidentialité
          </Link>
        </p>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group mt-7 inline-flex items-center gap-3 text-[var(--gold)] tracking-[0.32em] text-[0.7rem] uppercase border border-[var(--gold)] px-6 py-3 hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-colors duration-300"
          style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
        >
          <span>Charger la carte</span>
          <span
            aria-hidden
            className="transition-transform duration-500 group-hover:translate-x-1.5"
          >
            →
          </span>
        </button>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=46.20415,-1.202009"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-[0.65rem] tracking-[0.32em] uppercase text-white/50 hover:text-[var(--gold)] transition-colors"
        >
          Ouvrir l'itinéraire dans Maps ↗
        </a>
      </div>
    </div>
  );
}
