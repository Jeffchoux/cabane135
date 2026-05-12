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
        <h1 className="serif text-4xl text-[var(--pearl)]">Politique de confidentialité</h1>

        <h2>Responsable du traitement</h2>
        <p>
          <strong>HUITRES LEBON CABANE 135</strong> — SIREN 991 494 634<br />
          135 rue du Port, 17137 Nieul-sur-Mer<br />
          Contact : <a href="mailto:contact@cabane135.fr">contact@cabane135.fr</a>
        </p>

        <h2>Données collectées</h2>
        <p>Dans le cadre d'une demande de réservation, nous collectons :</p>
        <ul>
          <li>Nom</li>
          <li>Numéro de téléphone</li>
          <li>Adresse email (optionnelle)</li>
          <li>Date, heure et nombre de couverts</li>
          <li>Message libre (optionnel)</li>
        </ul>

        <h2>Base légale</h2>
        <p>
          Exécution d'un contrat (article 6.1.b du RGPD) — gestion de la demande de
          réservation et confirmation auprès de la cabane.
        </p>

        <h2>Durée de conservation</h2>
        <p>3 ans à compter de la dernière interaction.</p>

        <h2>Destinataires des données</h2>
        <ul>
          <li>L'équipe de Huîtres Lebon Cabane 135</li>
          <li>Resend Inc. — service d'envoi d'emails transactionnels</li>
          <li>Vercel Inc. — hébergement du site et de la base de données</li>
        </ul>

        <h2>Transferts hors UE</h2>
        <p>
          Les sous-traitants Resend Inc. et Vercel Inc. sont situés aux États-Unis.
          Les transferts s'appuient sur les Clauses Contractuelles Types adoptées par
          la Commission Européenne.
        </p>

        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
          d'effacement, d'opposition et de portabilité. Pour exercer ces droits :{" "}
          <a href="mailto:contact@cabane135.fr">contact@cabane135.fr</a>.
        </p>
        <p>
          Recours auprès de la CNIL :{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            www.cnil.fr
          </a>
        </p>

        <h2>Cookies</h2>
        <p>
          Le site utilise uniquement des cookies techniques nécessaires à son
          fonctionnement (session JWT côté administration). Aucun cookie tiers n'est
          déposé. Aucun bandeau de consentement n'est requis.
        </p>
      </div>
    </div>
  );
}
