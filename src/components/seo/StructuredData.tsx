/**
 * Données structurées Schema.org pour les rich snippets Google.
 * Type Restaurant (sous-type de LocalBusiness).
 *
 * Validation : https://search.google.com/test/rich-results
 */

const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://cabane135.fr";

export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    name: "Cabane 135",
    alternateName: "Huîtres Lebon Cabane 135",
    description:
      "Cabane de dégustation d'huîtres par Huîtres Lebon, à Nieul-sur-Mer en Charente-Maritime. Huîtres au détail, plateaux, vente à emporter. Entre Atlantique et océan Indien.",
    url: SITE_URL,
    telephone: "+33-5-46-41-36-82",
    email: "contact@cabane135.fr",
    image: [
      `${SITE_URL}/facade-cabane135.jpg`,
      `${SITE_URL}/terrasse-vue-marais.jpg`,
      `${SITE_URL}/huitres-citron-vinaigre.jpg`,
      `${SITE_URL}/concert-crepuscule.jpg`,
    ],
    logo: `${SITE_URL}/facade-cabane135.jpg`,
    priceRange: "€€",
    servesCuisine: ["Seafood", "Fruits de mer", "Huîtres"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "135 rue du Port",
      postalCode: "17137",
      addressLocality: "Nieul-sur-Mer",
      addressRegion: "Charente-Maritime",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.20415,
      longitude: -1.202009,
    },
    hasMap: "https://www.google.com/maps/dir/?api=1&destination=46.20415,-1.202009",
    sameAs: [
      "https://www.instagram.com/huitresleboncabane135/",
      "https://www.facebook.com/people/Hu%C3%AEtres-Lebon-Cabane-135/61576413212556/",
      "https://www.tiktok.com/@huitresleboncabane135",
    ],
    founder: {
      "@type": "Person",
      name: "Nicolas Lebon",
    },
    foundingDate: "2026-05-01",
    openingDate: "2026-05-01",
    // Note : openingHoursSpecification à compléter quand les horaires définitifs sont connus.
    // Exemple à activer plus tard :
    // openingHoursSpecification: [
    //   { "@type": "OpeningHoursSpecification", dayOfWeek: ["Wednesday","Thursday","Friday","Saturday","Sunday"],
    //     opens: "12:00", closes: "22:00" }
    // ],
    acceptsReservations: true,
    paymentAccepted: ["Cash", "Credit Card"],
    currenciesAccepted: "EUR",
    areaServed: {
      "@type": "Place",
      name: "Charente-Maritime",
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
