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
        <h1 className="serif text-4xl text-[var(--pearl)]">
          Conditions générales d'utilisation
        </h1>

        <h2>Objet</h2>
        <p>
          Les présentes conditions générales d'utilisation (« CGU ») encadrent
          l'utilisation du site cabane135.fr, édité par HUITRES LEBON CABANE 135
          (SIREN 991 494 634), entrepreneur individuel exploité par Nicolas Lebon,
          situé 135 rue du Port, 17137 Nieul-sur-Mer.
        </p>

        <h2>Acceptation</h2>
        <p>
          L'utilisation du site cabane135.fr implique l'acceptation pleine et
          entière des présentes CGU. Si vous n'acceptez pas tout ou partie de ces
          conditions, nous vous invitons à ne pas utiliser le site.
        </p>

        <h2>Accès au site</h2>
        <p>
          L'accès au site est gratuit et ouvert à tous. Les coûts d'accès à
          Internet et le matériel nécessaire à la consultation sont à la charge
          exclusive de l'utilisateur.
        </p>

        <h2>Réservation</h2>
        <p>
          Toute soumission du formulaire de réservation présent sur le site
          constitue une <strong>demande de réservation</strong> et non une
          confirmation. La réservation n'est définitivement confirmée qu'après
          retour explicite de la cabane par téléphone, email ou message.
        </p>
        <p>
          HUITRES LEBON CABANE 135 se réserve le droit de refuser une demande de
          réservation, notamment en cas de capacité dépassée, d'incohérence des
          informations transmises ou de tentative manifestement abusive.
        </p>

        <h2>Annulation</h2>
        <p>
          En cas d'annulation, merci de nous prévenir dans un délai raisonnable
          par téléphone au{" "}
          <a href="tel:+33546413682">05 46 41 36 82</a>, par email à{" "}
          <a href="mailto:contact@cabane135.fr">contact@cabane135.fr</a> ou via
          nos réseaux sociaux.
        </p>

        <h2>Comportements interdits</h2>
        <p>
          Sont notamment interdits : la soumission répétée de demandes de
          réservation fictives, l'envoi de contenus injurieux ou diffamatoires
          dans le champ « message », et toute tentative de compromission ou
          d'utilisation détournée du site.
        </p>

        <h2>Responsabilité</h2>
        <p>
          La responsabilité de HUITRES LEBON CABANE 135 est limitée à ses
          obligations légales. Le site est fourni « en l'état » et nous ne
          garantissons pas l'absence d'interruption ou d'erreur. Nous ne saurions
          être tenus responsables des dommages indirects résultant de
          l'utilisation du site.
        </p>

        <h2>Modification des CGU</h2>
        <p>
          HUITRES LEBON CABANE 135 se réserve le droit de modifier les présentes
          CGU à tout moment. Les modifications entrent en vigueur dès leur
          publication sur cette page. Il est recommandé de consulter régulièrement
          la dernière version disponible.
        </p>

        <h2>Droit applicable et juridiction</h2>
        <p>
          Les présentes CGU sont soumises au droit français. À défaut de résolution
          amiable, les tribunaux de La Rochelle seront seuls compétents.
        </p>

        <p className="text-sm text-white/40 mt-12">
          Dernière mise à jour : 13 mai 2026
        </p>
      </div>
    </div>
  );
}
