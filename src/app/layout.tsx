import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import Script from "next/script";
import { LenisProvider } from "@/components/3d/LenisProvider";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

const serif = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://cabane135.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cabane 135 — Huîtres au détail & dégustation · Nieul-sur-Mer",
    template: "%s · Cabane 135",
  },
  description:
    "Cabane 135 par Huîtres Lebon — dégustation d'huîtres à Nieul-sur-Mer (Charente-Maritime). Huîtres fraîches, plateaux, vente à emporter. Ouverte depuis le 1ᵉʳ mai 2026.",
  applicationName: "Cabane 135",
  authors: [{ name: "Nicolas Lebon" }],
  creator: "Huîtres Lebon Cabane 135",
  publisher: "Huîtres Lebon Cabane 135",
  keywords: [
    "huîtres Nieul-sur-Mer",
    "dégustation huîtres La Rochelle",
    "Cabane à huîtres Charente-Maritime",
    "ostréiculteur Lauzières",
    "Huîtres Lebon",
    "plateaux fruits de mer",
    "vente à emporter huîtres",
    "restaurant Nieul-sur-Mer",
    "réservation cabane huîtres",
  ],
  alternates: { canonical: "/" },
  category: "Restaurant",
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    title: "Cabane 135 — Huîtres au détail & dégustation",
    description:
      "Dégustation d'huîtres par Huîtres Lebon, à Nieul-sur-Mer (Charente-Maritime). 135 rue du Port — ouverte depuis le 1ᵉʳ mai 2026.",
    url: SITE_URL,
    siteName: "Cabane 135",
    locale: "fr_FR",
    type: "website",
    // L'image OG est générée dynamiquement par src/app/opengraph-image.tsx (1200x630)
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabane 135 — by Huîtres Lebon",
    description:
      "Dégustation d'huîtres à Nieul-sur-Mer. 135 rue du Port.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/facade-cabane135.jpg", sizes: "any" },
    ],
    apple: "/facade-cabane135.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1628",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body>
        <LenisProvider>{children}</LenisProvider>
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
