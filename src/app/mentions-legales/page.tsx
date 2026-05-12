import type { Metadata } from "next";
import { LegalNav } from "@/components/legal/LegalNav";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Huîtres Lebon Cabane 135.",
};

export default function Page() {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-3xl legal-prose">
        <LegalNav current="/mentions-legales" />
        <h1 className="serif text-4xl text-[var(--pearl)]">Mentions légales</h1>

        <h2>Éditeur du site</h2>
        <p>
          <strong>HUITRES LEBON CABANE 135</strong> — SIREN 991 494 634<br />
          135 rue du Port, 17137 Nieul-sur-Mer<br />
          Téléphone : <a href="tel:+33546413682">05 46 41 36 82</a><br />
          Email : <a href="mailto:contact@cabane135.fr">contact@cabane135.fr</a><br />
          Activité : Aquaculture en mer / dégustation huîtres (NAF 0321Z)<br />
          Directeur de la publication : gérant HUITRES LEBON CABANE 135
        </p>

        <h2>Hébergeur</h2>
        <p>
          Vercel Inc.<br />
          340 Pine Street Suite 701, San Francisco CA 94104, USA
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur ce site (textes, images, vidéos, logos)
          est protégé par le droit d'auteur. Toute reproduction ou utilisation sans
          autorisation préalable écrite est interdite.
        </p>

        <h2>Liens hypertextes</h2>
        <p>
          Ce site peut contenir des liens vers des sites tiers. HUITRES LEBON CABANE 135
          n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à
          leur contenu.
        </p>

        <h2>Droit applicable</h2>
        <p>
          Le présent site est soumis au droit français. En cas de litige, les tribunaux
          de La Rochelle seront seuls compétents.
        </p>

        <h2>Médiation de la consommation</h2>
        <p>
          Plateforme européenne de règlement des litiges :{" "}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
            ec.europa.eu/consumers/odr
          </a>
        </p>
      </div>
    </div>
  );
}
