# Changelog

Toutes les évolutions notables de Cabane 135 sont documentées ici.

Le format est inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
et le projet adhère aux [Conventional Commits](https://www.conventionalcommits.org/fr/).

## [2026-05-20]

### Changed
- **deps**: bumps mineurs postcss + @types/react + @vercel/blob
- **deps**: TypeScript 5.9 → 6.0
- **deps**: eslint 9.14 → 9.39 (latest 9.x)
- **deps**: lucide-react 0.460 → 1.16
- **deps**: tailwind-merge 2.6 → 3.6
- **deps**: bcryptjs 2.4 → 3.0 + @types/bcryptjs
- **deps**: resend 4.8 → 6.12
- **deps**: @types/node 22 → 25
- **deps**: zod 3.25 → 4.4 + migration z.email()
- **deps**: prisma 5.22 → 6.19 + override @hono/node-server

### Tests
- **e2e**: setup Playwright + smoke + API validation tests

## [2026-05-14]

### Added
- **ui**: badge hero lisible + nouvelle photo huîtres + bibliothèque N&B

### Changed
- corrige les "problèmes importants" de l'audit /health
- untrack tsconfig.tsbuildinfo (déjà dans .gitignore)
- **deps**: upgrade Next 15.5.18 → 16.2.6 (+ next-auth, eslint-config-next)

### Performance
- **images**: optimise les 4 dernières images > 600KB

### Security
- purge postcss 8.4.31 imbriqué via override (résout 5 moderate)

### Tests
- setup Vitest + 47 tests unitaires (93% coverage libs)

## [2026-05-13]

### Added
- **hero**: direction éditoriale Récit Immergé
- **hero**: photo terrasse panoramique au lieu du concert crepuscule
- **hero**: retour à concert-crepuscule, vrai moment de la cabane
- cabane ouverte depuis le 1er mai + photo Hero éclaircie
- **map**: remplace Google Maps iframe par Mapbox custom éditorial
- **map**: simplifie le pin en "135" turquoise serif (plus identitaire, moins gimmick)
- **storage**: migrate R2 → Vercel Blob (1-click activation)
- **preview**: page /preview/cartes avec 4 variantes de carte
- **preview**: variante E — Google Maps satellite hybride dézoomée (zoom 14)
- **map**: variante E (Google Maps satellite hybride) en production
- **legal**: pages légales complètes + click-to-load Google Maps RGPD
- **admin**: bouton supprimer réservation (DELETE /api/reservations)
- **seo**: Schema.org Restaurant + OG image dynamique + metadata enrichies
- **analytics**: Vercel Analytics + Speed Insights (sans cookies, RGPD-friendly)

### Changed
- **3d**: coquille plus petite, décalée sous le titre
- ignore tsconfig.tsbuildinfo
- retire la 3D du hero et de la section histoire
- **sections**: éditorial cohérent sur Dégustation, Réseaux, Histoire, Moments, Adresse
- **brand**: Nav + Footer asymétriques, photo crépuscule, Bodoni Moda
- nettoyage variantes carte non retenues

### Fixed
- **hero**: coquille moins ovni + indicateur sous la nav
- **sections**: contenu visible par défaut, animation = bonus
- **hero**: empêche CABANE de wrap, libère le titre du conteneur max-w
- **hero**: 135 reste plus gros que CABANE sur mobile (clamp min 4.75rem)
- **resend**: améliorer délivrabilité (text+html, reply-to, subject sans emoji)
- **map**: wrapper client pour ssr:false (Next 15 server component constraint)
- **map**: hauteur explicite container Mapbox + safe layer paints
- **map**: h-full w-full au lieu de absolute inset-0 (mapbox force position relative)
- **images**: whitelist *.public.blob.vercel-storage.com pour next/image
- **a11y**: contraste WCAG AA + retire aria-label nav + underline lien gold
- **a11y**: <aside> → <div> pour ReservationPanel (rôle dialog inapproprié sur aside)

### Performance
- **hero**: réduit délai reveal du tagline (1500ms→350ms, 1000ms→500ms) pour LCP

### Security
- phase 1 — fixes critiques (auth, XSS, headers, upload, posts)
- phase 2 — rate-limit Vercel KV/Upstash + rate-limit auth

### Docs
- **design**: PRODUCT.md + DESIGN.md (impeccable scaffold)

## [2026-05-12]

### Added
- init cabane135 — Next.js 15 + design 2026
- photo réelle La Réunion + fallbacks env URL
- **3d**: expérience scroll-driven Three.js — coquille + perle

### Changed
- **hero**: mettre CABANE 135 en signature principale
- **security**: retire .env.local.backup accidentel + gitignore
- prisma db push automatique au déploiement Vercel

### Fixed
- **histoire**: corriger la chronologie Lebon + Mai 2026

