# Cabane 135

Site officiel de la **Cabane 135** par Huîtres Lebon — cabane de dégustation à Nieul-sur-Mer (Charente-Maritime).

Production : [cabane135.fr](https://cabane135.fr)

## Stack

- **Next.js 15** (App Router, Server Components)
- **TypeScript** strict
- **Tailwind CSS** + shadcn/ui
- **Prisma** + PostgreSQL (Vercel Postgres)
- **NextAuth v5** (credentials, admin uniquement)
- **Resend** (notifications email réservation)
- **Vercel Blob** (upload média admin)
- **Vercel KV/Upstash** (rate-limiting)
- **Vercel Analytics + Speed Insights** (sans cookies, RGPD)

## Documents projet

- [`PRODUCT.md`](./PRODUCT.md) — vision produit, parcours utilisateur, fonctionnalités
- [`DESIGN.md`](./DESIGN.md) — système de design, typographie, couleurs, motifs
- [`DESIGN.json`](./DESIGN.json) — tokens design

## Setup

```bash
# Cloner
git clone https://github.com/Jeffchoux/cabane135.git
cd cabane135

# Installer
npm install

# Configurer l'environnement
cp .env.example .env.local
# → renseigner DATABASE_URL, AUTH_SECRET, ADMIN_*, RESEND_API_KEY

# Migrer la base
npx prisma db push
```

## Variables d'environnement

Voir [`.env.example`](./.env.example). Variables clés :

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | URL Postgres (Vercel Postgres en prod) |
| `AUTH_SECRET` | Secret NextAuth (générer via `openssl rand -base64 32`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH` | Identifiants admin (bcrypt cost 12) |
| `RESEND_API_KEY` | API Resend pour emails de réservation |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob (upload média admin) |
| `KV_*` | Vercel KV pour rate-limiting |

## Scripts

```bash
npm run dev      # Dev server localhost:3000
npm run build    # Build prod (prisma generate + db push + next build)
npm run start    # Serveur prod
npm run lint     # ESLint
```

## Architecture

```
src/
├── app/                   # App Router
│   ├── (public)/          # Page d'accueil, mentions, CGU
│   ├── admin/             # Dashboard réservations + posts (auth)
│   ├── api/               # Routes API (reservations, posts, upload)
│   └── opengraph-image.tsx
├── components/
│   ├── public/            # Hero, Bento, History, Map, Footer…
│   ├── admin/             # ReservationManager, PostPublisher
│   └── ui/                # shadcn/ui primitives
├── lib/                   # auth, db, resend, rate-limit
└── middleware.ts          # Headers de sécurité
```

## Déploiement

Le projet est lié à Vercel. Tout push sur `main` déclenche un déploiement Production automatique.

```bash
git push origin main  # → déploie sur cabane135.fr
```

## Contact

Huîtres Lebon — Nicolas & Nadège Lebon
135 rue du Port, 17137 Nieul-sur-Mer
