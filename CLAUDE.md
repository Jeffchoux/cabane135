# Cabane 135 — Contexte projet

Site de la cabane à huîtres **Cabane 135** par Huîtres Lebon, ouverte le 1ᵉʳ mai 2026.

- **Localisation : Nieul-sur-Mer (Charente-Maritime, métropole).** Huîtres des parcs familiaux de **Lauzières**. Tribunal compétent : La Rochelle.
- Les mentions de "La Réunion" dans `src/components/public/HistorySection.tsx` sont du **storytelling familial** (la famille Lebon est passée par La Réunion avant de revenir en Charente-Maritime) — ce n'est PAS l'emplacement du restaurant.

Repo GitHub : https://github.com/Jeffchoux/cabane135 · Prod : https://cabane135.fr

## Stack

| Couche | Tech |
|---|---|
| Framework | Next.js 16.2.6 (App Router, Turbopack), React 19.2 |
| Langage | TypeScript strict (jamais `any` → `unknown`) |
| DB / ORM | PostgreSQL (Vercel Postgres) + Prisma 6.19.3 |
| Auth | NextAuth v5 beta.31 (Credentials, JWT 8h, multi-user) |
| Styles | Tailwind CSS 3.4 + `tailwindcss-animate` + shadcn/Radix |
| Tests | Vitest 4.1 (unit, 55 tests) + Playwright (E2E sur prod) |
| Storage | Vercel Blob (`@vercel/blob/client`) |
| Email | Resend |
| Rate-limit | Upstash Redis |
| Lint | ESLint 9.39 |
| Hébergement | Vercel (push `main` = deploy prod) |

## Admins du back-office

- **Jeff** — env : `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH` (bcrypt cost 12)
- **Nadège** — env : `ADMIN_USERNAME_2=Nadege` + `ADMIN_PASSWORD_HASH_2` + `ADMIN_NAME_2`. C'est elle qui gère la carte des menus.

Champ login = `name="username"` (pas `email`), parce qu'on accepte un identifiant texte arbitraire.

## Architecture clé

```
src/
  app/
    page.tsx                       — homepage publique
    carte/page.tsx                 — menu public (2 images plein écran, ISR 60s)
    admin/
      carte/page.tsx               — Nadège upload les menus
      reservations/page.tsx        — gestion résas
      login/page.tsx               — formulaire multi-user
    api/
      menu/route.ts                — GET public (cache 60+SWR 300), PATCH admin
      upload/route.ts              — Vercel Blob handleUpload (HEIC inclus)
      reservations/route.ts        — POST public (rate-limit 5/h/IP) + admin GET
  components/
    public/                        — Hero, BentoSection, HistorySection, MapSection, Footer
    admin/MenuImageEditor.tsx      — client component, conversion HEIC→JPEG
  lib/
    auth.ts                        — multi-user constant-time anti-timing
    validation.ts                  — schémas Zod (réservations, menu image whitelist)
    rate-limit.ts                  — Upstash, 5/h résas + 5/15min login
    db.ts                          — PrismaClient singleton
prisma/schema.prisma               — Post, Reservation, Settings, MenuImage
next.config.ts                     — CSP stricte (connect-src whitelist Vercel Blob)
```

## Pièges connus (NE PAS toucher sans plan)

1. **Prisma 7** — skipped, breaking `datasource.url` confirmé sur 7.8.0. Voir `docs/prisma-7-migration.md`. Refonte runtime (`prisma.config.ts` + adapter `PrismaPg`) non-triviale.
2. **ESLint 10** — skipped, crash `eslint-plugin-react-hooks` (`contextOrFilename.getFilename is not a function`).
3. **Tailwind 4** — skipped, refonte CSS-first + `tailwindcss-animate` incompatible.
4. **next-auth v5 beta** — c'est la version cible (pas un v5 → v4 downgrade).
5. **CSP `connect-src`** — DOIT whitelister `*.public.blob.vercel-storage.com` sinon les uploads PUT navigateur échouent silencieusement.
6. **HEIC iPhone** — converti côté client via import dynamique de `heic2any` (next/image ne sait pas afficher HEIC).
7. **Playwright** — tape directement sur prod (`PLAYWRIGHT_BASE_URL` défaut `https://cabane135.fr`). Pas de dev server. Les tests qui touchent l'API peuvent recevoir `429` (rate-limit) en parallèle — tolérer `[400, 422, 429]`.
8. **Build Vercel** — `prisma db push --accept-data-loss --skip-generate` dans `package.json` build script. Safe pour les schémas mineurs, à surveiller pour les changements structurels.

## Workflow

```bash
# Avant tout commit :
npm run lint && npx tsc --noEmit && npm test

# Coverage local :
npm run test:coverage  # rapport HTML dans coverage/

# E2E (prod) :
npm run test:e2e  # ou : npx playwright test smoke.spec.ts

# Vercel :
vercel ls --prod                              # état des deploys
vercel env ls production                      # vars d'env prod
mcp__claude_ai_Vercel__get_deployment_build_logs  # logs builds
```

**Commits** : Conventional Commits + footer `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`. Mettre à jour `CHANGELOG.md` (Keep a Changelog) pour les features visibles.

**CI** : `.github/workflows/ci.yml` (lint --max-warnings 0 + tsc + tests + coverage) sur push/PR vers `main`. Pas de Playwright en CI (suite prod-target).

## Conventions

- **Server Components par défaut** ; `"use client"` uniquement quand nécessaire (interactions, state, refs).
- **Imports absolus** avec `@/` (alias vers `src/`).
- **Single quotes** TS/TSX, **2 espaces**, **trailing commas**.
- **Naming** : camelCase var/fn, PascalCase composants/types, UPPER_SNAKE_CASE constantes, kebab-case fichiers.
- **Validation Zod** sur TOUS les inputs API utilisateur.
- **Pas de console.log** en prod ; `console.error` autorisé pour logs serveur (préfixe `[contexte]`).
- **Mobile-first** : design 375px en premier, puis breakpoints `md` (768) et `lg` (1024).

## Standard de design

Standard exigeant : suivre un brief à la lettre ne suffit pas, viser **raffinement et harmonie**. Penser typographie, espacement, contrastes. Pas d'objet 3D massif par-dessus le titre. Le 3D (Three.js / `@react-three/fiber`) est utilisé en accent subtil.

Palette CSS vars dans `src/app/globals.css` (`--ocean`, `--navy`, `--gold`, etc.).
