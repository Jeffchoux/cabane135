import type { Metadata } from "next";
import { LegalNav } from "@/components/legal/LegalNav";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données — Cabane 135.",
};

export default function Page() {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-3xl legal-prose">
        <LegalNav current="/confidentialite" />
        <h1 className="serif text-4xl text-[var(--pearl)]">
          Politique de confidentialité
        </h1>

        <h2>Responsable du traitement</h2>
        <p>
          <strong>HUITRES LEBON CABANE 135</strong> — Nicolas Lebon, entrepreneur
          individuel.<br />
          135 rue du Port, 17137 Nieul-sur-Mer<br />
          SIREN : 991 494 634<br />
          Contact :{" "}
          <a href="mailto:contact@cabane135.fr">contact@cabane135.fr</a>
        </p>

        <h2>Délégué à la protection des données (DPO)</h2>
        <p>
          Compte tenu de la taille de la structure et de la nature des traitements
          réalisés, HUITRES LEBON CABANE 135 n'a pas désigné de Délégué à la
          Protection des Données. Toute question relative à vos données peut être
          adressée directement à{" "}
          <a href="mailto:contact@cabane135.fr">contact@cabane135.fr</a>.
        </p>

        <h2>Données collectées</h2>
        <p>Dans le cadre d'une demande de réservation, nous collectons :</p>
        <ul>
          <li>Nom</li>
          <li>Numéro de téléphone</li>
          <li>Adresse email (optionnelle)</li>
          <li>Date, heure et nombre de couverts souhaités</li>
          <li>Message libre (optionnel)</li>
        </ul>
        <p>
          De plus, lors de la consultation de la carte de localisation
          (section « Nous trouver »), votre adresse IP et certaines informations
          techniques peuvent être transmises à Google LLC après votre clic
          explicite sur le bouton « Afficher la carte ».
        </p>

        <h2>Base légale</h2>
        <p>
          Le traitement des données de réservation repose sur l'exécution d'un
          contrat (article 6.1.b du RGPD) — gestion de la demande de réservation
          et confirmation auprès de la cabane.
        </p>
        <p>
          Le chargement de la carte Google Maps repose sur votre consentement
          explicite (article 6.1.a du RGPD) — vous n'êtes pas tenu de l'activer
          pour consulter le site.
        </p>

        <h2>Durée de conservation</h2>
        <p>
          Données de réservation : 3 ans à compter de la dernière interaction avec
          la cabane.
        </p>

        <h2>Destinataires des données</h2>
        <ul>
          <li>L'équipe de Huîtres Lebon Cabane 135</li>
          <li>
            <strong>Resend Inc.</strong> (États-Unis) — envoi des emails
            transactionnels (notification de réservation et confirmation au client)
          </li>
          <li>
            <strong>Vercel Inc.</strong> (États-Unis) — hébergement du site, de la
            base de données, stockage des photographies publiées, et mesure
            d'audience anonyme (Vercel Analytics + Speed Insights, sans cookies
            ni identifiant persistant)
          </li>
          <li>
            <strong>Google LLC</strong> (États-Unis) — affichage de la carte de
            localisation, uniquement après votre clic d'activation
          </li>
        </ul>

        <h2>Transferts hors UE</h2>
        <p>
          Resend Inc., Vercel Inc. et Google LLC sont situés aux États-Unis. Les
          transferts s'appuient sur les Clauses Contractuelles Types adoptées par
          la Commission Européenne, et sur les certifications applicables (Data
          Privacy Framework).
        </p>

        <h2>Vos droits</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD)
          et à la loi française « Informatique et Libertés », vous disposez d'un
          droit d'accès, de rectification, d'effacement, de limitation, de
          portabilité et d'opposition concernant vos données.
        </p>
        <p>
          Pour exercer ces droits, contactez-nous à{" "}
          <a href="mailto:contact@cabane135.fr">contact@cabane135.fr</a>.
        </p>
        <p>
          En cas de désaccord persistant, vous pouvez introduire une réclamation
          auprès de la CNIL :{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            www.cnil.fr
          </a>
          .
        </p>

        <h2>Cookies et traceurs</h2>
        <p>
          Le site utilise uniquement des cookies techniques strictement
          nécessaires à son fonctionnement (session JWT côté administration).
        </p>
        <p>
          La mesure d'audience est réalisée via <strong>Vercel Analytics</strong>
          et <strong>Vercel Speed Insights</strong> : ces outils ne déposent
          aucun cookie tiers et ne créent aucun identifiant persistant, en
          conformité avec les recommandations de la CNIL sur la mesure
          d'audience exemptée de consentement.
        </p>
        <p>
          La carte Google Maps déposera ses propres cookies tiers uniquement
          après votre clic d'activation sur le bouton « Afficher la carte ».
        </p>

        <p className="text-sm text-white/40 mt-12">
          Dernière mise à jour : 13 mai 2026
        </p>
      </div>
    </div>
  );
}
