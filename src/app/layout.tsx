import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_URL ?? "https://cabane135.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Huîtres Lebon — Cabane 135 · Nieul-sur-Mer",
    template: "%s · Cabane 135",
  },
  description:
    "Cabane de dégustation d'huîtres à Nieul-sur-Mer (Charente-Maritime). Huîtres fraîches, plateaux, vente à emporter. 135 rue du Port.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Huîtres Lebon — Cabane 135",
    description:
      "Cabane de dégustation d'huîtres à Nieul-sur-Mer. De La Réunion à l'Atlantique.",
    url: SITE_URL,
    siteName: "Cabane 135",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/facade-cabane135.jpg", width: 1200, height: 630, alt: "Cabane 135" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Huîtres Lebon — Cabane 135",
    description: "Cabane de dégustation à Nieul-sur-Mer.",
    images: ["/facade-cabane135.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/facade-cabane135.jpg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        {ga && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
              strategy="afterInteractive"
            />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
