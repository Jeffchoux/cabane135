import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  // Scripts: self + Vercel Analytics. 'unsafe-inline' nécessaire pour Next.js inline scripts (boot).
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  // Styles: self + inline (Tailwind + style attrs) + Google Fonts CSS
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Fonts: Google Fonts CDN
  "font-src 'self' https://fonts.gstatic.com data:",
  // Images: self + Vercel Blob + legacy media + Google Maps tiles + data URIs
  "img-src 'self' data: blob: https://media.cabane135.fr https://*.public.blob.vercel-storage.com https://maps.gstatic.com https://maps.googleapis.com https://www.google.com",
  // Connect: self + Vercel analytics + Vercel Blob storage (upload PUT direct)
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://*.public.blob.vercel-storage.com https://blob.vercel-storage.com",
  // Frames: Google Maps embed
  "frame-src 'self' https://www.google.com https://maps.google.com",
  // Workers
  "worker-src 'self' blob:",
  // Empêche le site d'être embedé en iframe (clickjacking)
  "frame-ancestors 'none'",
  // Empêche les <base> qui pourraient rediriger les liens relatifs
  "base-uri 'self'",
  // Restreint les soumissions de formulaire au même origine
  "form-action 'self'",
  // Upgrade HTTP → HTTPS automatiquement
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.cabane135.fr" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
