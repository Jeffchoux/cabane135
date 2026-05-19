import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";
import { checkAuthLimit } from "@/lib/rate-limit";

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(1).max(200),
});

// Boot-time check: garantir que AUTH_SECRET est défini en prod
if (process.env.NODE_ENV === "production" && !process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET is required in production");
}

function safeStringEquals(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    // timingSafeEqual exige la même longueur — on compare un buffer de taille max
    // pour ne pas leaker la longueur du secret par le temps
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

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 }, // 8h
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (raw, request) => {
        // Rate-limit par IP sur les tentatives de login (anti-brute-force)
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
        const { email, password } = parsed.data;

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;
        const adminPasswordPlain = process.env.ADMIN_PASSWORD;

        if (!adminEmail) {
          console.error("[auth] ADMIN_EMAIL not set");
          return null;
        }
        if (!safeStringEquals(email, adminEmail)) {
          console.warn(
            `[auth] failed login attempt for unknown email at ${new Date().toISOString()}`
          );
          return null;
        }

        let passwordOk = false;
        if (adminHash) {
          try {
            passwordOk = await bcrypt.compare(password, adminHash);
          } catch (err) {
            console.error("[auth] bcrypt.compare error", err);
            passwordOk = false;
          }
        } else if (adminPasswordPlain) {
          // Compat: fallback timing-safe sur ADMIN_PASSWORD si pas encore migré au hash
          passwordOk = safeStringEquals(password, adminPasswordPlain);
        } else {
          console.error("[auth] No ADMIN_PASSWORD_HASH or ADMIN_PASSWORD set");
          return null;
        }

        if (!passwordOk) {
          console.warn(
            `[auth] failed login attempt for ${adminEmail} at ${new Date().toISOString()}`
          );
          return null;
        }

        return { id: "admin", email, name: "Admin Cabane 135" };
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => !!auth,
  },
});
