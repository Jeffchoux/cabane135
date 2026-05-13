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
          <strong>HUITRES LEBON CABANE 135</strong> — exploité par{" "}
          <strong>Nicolas Lebon</strong>, entrepreneur individuel.<br />
          Siège : 135 rue du Port, 17137 Nieul-sur-Mer<br />
          SIREN : 991 494 634<br />
          N° TVA intracommunautaire : FR60 991 494 634
          <span className="text-white/40 text-sm"> (à confirmer sur extrait RNE)</span><br />
          Activité : Aquaculture en mer / dégustation d'huîtres — code NAF 0321Z<br />
          Inscrit au Registre National des Entreprises (RNE)<br />
          Téléphone : <a href="tel:+33546413682">05 46 41 36 82</a><br />
          Email : <a href="mailto:contact@cabane135.fr">contact@cabane135.fr</a><br />
          Directeur de la publication : Nicolas Lebon
        </p>

        <h2>Hébergeur</h2>
        <p>
          Vercel Inc.<br />
          340 Pine Street Suite 701, San Francisco CA 94104, États-Unis<br />
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur ce site (textes, photographies, vidéos,
          marques, logos) est protégé par le droit d'auteur et reste la propriété
          exclusive de HUITRES LEBON CABANE 135. Toute reproduction, représentation,
          modification ou exploitation, totale ou partielle, sans autorisation
          préalable écrite est interdite et constitue une contrefaçon sanctionnée par
          les articles L.335-2 et suivants du Code de la propriété intellectuelle.
        </p>

        <h2>Liens hypertextes</h2>
        <p>
          Ce site peut contenir des liens vers des sites tiers. HUITRES LEBON CABANE
          135 n'exerce aucun contrôle sur ces sites et décline toute responsabilité
          quant à leur contenu, leur politique de confidentialité ou leur disponibilité.
        </p>

        <h2>Droit applicable et juridiction</h2>
        <p>
          Le présent site est soumis au droit français. En cas de litige et à défaut
          de résolution amiable, les tribunaux de La Rochelle seront seuls compétents.
        </p>

        <h2>Médiation de la consommation</h2>
        <p>
          Conformément à l'article L.612-1 du Code de la consommation, en cas de
          litige, vous pouvez recourir gratuitement à la plateforme européenne de
          règlement en ligne des litiges :{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
          >
            ec.europa.eu/consumers/odr
          </a>
          .
        </p>

        <p className="text-sm text-white/40 mt-12">
          Dernière mise à jour : 13 mai 2026
        </p>
      </div>
    </div>
  );
}
