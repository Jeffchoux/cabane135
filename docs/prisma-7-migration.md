# Migration Prisma 6 → 7

**Statut :** non-bloquant, refonte runtime requise.
**Vérifié :** Prisma 7.8.0 (`npx prisma@7.8.0 validate`) — le breaking est toujours actif.

## Breaking confirmé

```
P1012 : The datasource property `url` is no longer supported in schema files.
Move connection URLs for Migrate to `prisma.config.ts` and pass either
`adapter` for a direct database connection or `accelerateUrl` for Accelerate
to the `PrismaClient` constructor.
```

Docs officielles :
- https://pris.ly/d/config-datasource
- https://pris.ly/d/prisma7-client-config

## Plan de migration

1. **`prisma/schema.prisma`** — retirer le bloc `url`.
   ```prisma
   datasource db {
     provider = "postgresql"
   }
   ```

2. **`prisma.config.ts`** (nouveau, racine) — pour `prisma db push` / `prisma migrate`.
   ```ts
   import "dotenv/config";
   import { defineConfig } from "prisma/config";

   export default defineConfig({
     schema: "prisma/schema.prisma",
     migrations: {
       url: process.env.DATABASE_URL,
     },
   });
   ```

3. **`src/lib/db.ts`** — passer l'URL au constructeur.
   ```ts
   import { PrismaClient } from "@prisma/client";
   import { PrismaPg } from "@prisma/adapter-pg";

   const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
   export const db = new PrismaClient({ adapter });
   ```
   → installer `@prisma/adapter-pg`.

4. **`package.json`** — vérifier que `build` (`prisma db push --accept-data-loss --skip-generate`) supporte la nouvelle config (il devrait lire `prisma.config.ts` automatiquement).

## Risques

- Connexion runtime change de driver natif → adapter JS (PrismaPg). Perf à mesurer.
- Tester `prisma db push` en preview Vercel avant de promouvoir.
- Vercel Postgres / Neon : utiliser plutôt `@prisma/adapter-neon` si la DB est sur Neon.

## Quand le faire

- Pas d'urgence : Prisma 6.19 reçoit encore des patches de sécurité.
- À planifier avant Prisma 8 ou si une feature de Prisma 7 devient nécessaire (ex : nouveaux types, performances).
- À retester avec chaque sortie mineure de Prisma 7 (peut-être un adaptateur officiel arrive qui rend la migration plus simple).
