import type { Metadata } from "next";
import { LegalNav } from "@/components/legal/LegalNav";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: "CGU du site cabane135.fr.",
};

export default function Page() {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-3xl legal-prose">
        <LegalNav current="/cgu" />
        <h1 className="serif text-4xl text-[var(--pearl)]">Conditions générales d'utilisation</h1>

        <h2>Objet</h2>
        <p>
          Les présentes conditions encadrent l'utilisation du site cabane135.fr, édité
          par HUITRES LEBON CABANE 135 (SIREN 991 494 634).
        </p>

        <h2>Réservation</h2>
        <p>
          Toute soumission du formulaire de réservation constitue une <strong>demande</strong>
          et non une confirmation. La réservation n'est confirmée qu'après retour
          explicite de la cabane (par téléphone, email ou message).
        </p>

        <h2>Annulation</h2>
        <p>
          En cas d'annulation, merci de nous prévenir dans un délai raisonnable par
          email à <a href="mailto:contact@cabane135.fr">contact@cabane135.fr</a> ou via
          nos réseaux sociaux.
        </p>

        <h2>Responsabilité</h2>
        <p>
          La responsabilité de HUITRES LEBON CABANE 135 est limitée à ses obligations
          légales. Le site est fourni "en l'état" et nous ne garantissons pas
          l'absence d'interruption ou d'erreur.
        </p>

        <h2>Droit applicable et juridiction</h2>
        <p>
          Les présentes CGU sont soumises au droit français. Les tribunaux de La
          Rochelle sont seuls compétents en cas de litige.
        </p>
      </div>
    </div>
  );
}
