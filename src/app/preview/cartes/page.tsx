import Link from "next/link";
import { CabaneMapClient } from "@/components/public/CabaneMapClient";
import { MapIllustrated } from "@/components/public/maps/MapIllustrated";
import { MapGoogleStyled } from "@/components/public/maps/MapGoogleStyled";
import { MapGoogleSatellite } from "@/components/public/maps/MapGoogleSatellite";
import { MapPhoto } from "@/components/public/maps/MapPhoto";

export const metadata = {
  title: "Preview Cartes — Cabane 135",
  robots: { index: false, follow: false },
};

const variants = [
  {
    key: "A",
    title: "Mapbox éditorial",
    body: "Carte navette interactive, pin « 135 » turquoise. Style sombre custom, routes et labels filaires.",
  },
  {
    key: "B",
    title: "SVG illustré",
    body: "Carte abstraite dessinée, repères Lauzières / La Rochelle / mer. Aucun appel API, ultra léger, atmosphère éditoriale-magazine.",
  },
  {
    key: "C",
    title: "Google Maps stylisée",
    body: "Iframe Google avec filtre CSS navy. Familier, données à jour automatiquement. Moins singulier mais robuste.",
  },
  {
    key: "D",
    title: "Photo immersive",
    body: "Pas de carte au sens strict : grande photo de la cabane + adresse en signature typographique. Brand-first, ultra simple.",
  },
  {
    key: "E",
    title: "Google Maps satellite hybride",
    body: "Vraie photo satellite Google avec labels de rues, dézoomée (zoom 14) pour montrer le port, l'estuaire, La Rochelle au loin. Couleurs naturelles, repérage évident pour les visiteurs.",
    selected: true,
  },
];

export default function PreviewCartesPage() {
  return (
    <main className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-14">
          <p className="section-label">Preview · Cartes</p>
          <h1
            className="serif mt-5 font-medium text-[var(--pearl)] leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Quatre directions
            <span className="block serif italic text-[var(--gold)]">
              à comparer.
            </span>
          </h1>
          <p className="mt-6 text-white/55 max-w-2xl leading-relaxed">
            Voici les cinq options de cartographie pour la section{" "}
            <em className="not-italic text-[var(--pearl)]">Nous trouver</em>.
            L'option <strong className="text-[var(--gold)]">A · Mapbox</strong>{" "}
            est actuellement en production. Dis-moi laquelle tu préfères et je
            l'applique.
          </p>
          <p className="mt-3 text-white/40 text-sm">
            <Link
              href="/"
              className="text-[var(--gold)]/80 hover:text-[var(--gold)] underline underline-offset-4"
            >
              ← Retour à l'accueil
            </Link>
          </p>
        </header>

        <div className="space-y-20 md:space-y-28">
          {variants.map((v, i) => (
            <section key={v.key} className="grid gap-8 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-4 md:order-2">
                <p className="text-[0.62rem] tracking-[0.32em] uppercase text-[var(--gold)]">
                  Variante {v.key}
                </p>
                <h2
                  className="serif mt-3 font-medium text-[var(--pearl)] leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
                >
                  {v.title}
                </h2>
                {v.selected && (
                  <p className="mt-3 inline-flex items-center gap-2 text-[0.62rem] tracking-[0.32em] uppercase text-[var(--turquoise)]">
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--turquoise)]"
                    />
                    En production
                  </p>
                )}
                <p className="mt-5 text-white/60 text-[0.95rem] leading-relaxed">
                  {v.body}
                </p>
              </div>

              <div className="md:col-span-8 md:order-1 relative h-[380px] md:h-[460px] overflow-hidden border border-[var(--gold)]/15">
                {i === 0 && <CabaneMapClient />}
                {i === 1 && <MapIllustrated />}
                {i === 2 && <MapGoogleStyled />}
                {i === 3 && <MapPhoto />}
                {i === 4 && <MapGoogleSatellite />}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-24 pt-10 border-t border-[var(--gold)]/15 text-center">
          <p className="text-white/55 max-w-xl mx-auto leading-relaxed">
            Tu peux comparer ces 4 directions sur ton iPhone, Mac, PC.
            Donne-moi la lettre (A, B, C, D) et je remplace la carte en
            production en une minute.
          </p>
        </footer>
      </div>
    </main>
  );
}
