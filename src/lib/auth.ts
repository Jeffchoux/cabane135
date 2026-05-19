import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";
import { checkAuthLimit } from "@/lib/rate-limit";

const credentialsSchema = z.object({
  username: z.string().min(2).max(120),
  password: z.string().min(1).max(200),
});

if (process.env.NODE_ENV === "production" && !process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET is required in production");
}

/**
 * Comparaison de chaînes constant-time pour éviter le timing attack sur
 * username/password admin. Pad à la taille max si longueurs différentes pour
 * ne pas leaker la longueur du secret via le timing.
 */
function safeStringEquals(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    const max = Math.max(aBuf.length, bBuf.length);
    const padA = Buffer.alloc(max);
    const padB = Buffer.alloc(max);
    aBuf.copy(padA);
    bBuf.copy(padB);
    timingSafeEqual(padA, padB);
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

type Admin = {
  id: string;
  name: string;
  login: string;
  passwordHash?: string;
  passwordPlain?: string;
};

/**
 * Liste des admins lue depuis l'env au boot. Chaque admin peut s'authentifier
 * via ADMIN_EMAIL/ADMIN_USERNAME_N (login) + ADMIN_PASSWORD_HASH_N (bcrypt).
 * Le fallback ADMIN_PASSWORD plain-text reste supporté pour Jeff.
 */
function loadAdmins(): Admin[] {
  const admins: Admin[] = [];

  if (process.env.ADMIN_EMAIL) {
    admins.push({
      id: "admin",
      name: "Admin Cabane 135",
      login: process.env.ADMIN_EMAIL,
      passwordHash: process.env.ADMIN_PASSWORD_HASH,
      passwordPlain: process.env.ADMIN_PASSWORD,
    });
  }

  if (process.env.ADMIN_USERNAME_2 && process.env.ADMIN_PASSWORD_HASH_2) {
    admins.push({
      id: "admin-2",
      name: process.env.ADMIN_NAME_2 ?? process.env.ADMIN_USERNAME_2,
      login: process.env.ADMIN_USERNAME_2,
      passwordHash: process.env.ADMIN_PASSWORD_HASH_2,
    });
  }

  return admins;
}

async function verifyPassword(admin: Admin, password: string): Promise<boolean> {
  if (admin.passwordHash) {
    try {
      return await bcrypt.compare(password, admin.passwordHash);
    } catch (err) {
      console.error("[auth] bcrypt.compare error", err);
      return false;
    }
  }
  if (admin.passwordPlain) {
    return safeStringEquals(password, admin.passwordPlain);
  }
  return false;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Identifiant", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (raw, request) => {
        const ip =
          request?.headers?.get?.("x-forwarded-for")?.split(",")[0]?.trim() ??
          request?.headers?.get?.("x-real-ip") ??
          "unknown";
        const rl = await checkAuthLimit(ip);
        if (!rl.ok) {
          console.warn(
            `[auth] rate-limit exceeded for ${ip} at ${new Date().toISOString()}`
          );
          return null;
        }

        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;
        const { username, password } = parsed.data;

        const admins = loadAdmins();
        if (admins.length === 0) {
          console.error("[auth] No admin configured");
          return null;
        }

        // Recherche constant-time : on parcourt TOUS les admins même après un
        // match pour ne pas leaker l'existence d'un login via le timing.
        let matched: Admin | null = null;
        for (const a of admins) {
          if (safeStringEquals(username, a.login)) matched = a;
        }

        if (!matched) {
          console.warn(
            `[auth] failed login attempt for unknown login at ${new Date().toISOString()}`
          );
          // Effectue quand même un bcrypt.compare sur un hash factice pour
          // égaliser le timing entre login inconnu et login connu.
          await bcrypt
            .compare(password, "$2b$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinv")
            .catch(() => false);
          return null;
        }

        const passwordOk = await verifyPassword(matched, password);
        if (!passwordOk) {
          console.warn(
            `[auth] failed login attempt for ${matched.login} at ${new Date().toISOString()}`
          );
          return null;
        }

        return { id: matched.id, email: matched.login, name: matched.name };
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => !!auth,
  },
});
