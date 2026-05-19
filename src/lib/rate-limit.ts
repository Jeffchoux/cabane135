import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

/**
 * Rate-limit serverless persisté via Vercel KV (Upstash Redis).
 *
 * Trois limiteurs distincts :
 *   - reservation : 5 / heure / IP (formulaire public)
 *   - auth        : 10 / 15 min / IP (login admin, anti-brute-force)
 *   - upload      : 30 / heure / IP (admin uniquement, défense en profondeur)
 *
 * Fallback : si KV_REST_API_URL n'est pas configuré (dev local sans KV
 * provisionné), on dégrade gracieusement vers un Map in-memory minimal.
 */

const kvConfigured =
  !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

const reservationLimiter = kvConfigured
  ? new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      analytics: true,
      prefix: "rl:reservation",
    })
  : null;

const authLimiter = kvConfigured
  ? new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(10, "15 m"),
      analytics: true,
      prefix: "rl:auth",
    })
  : null;

const uploadLimiter = kvConfigured
  ? new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(30, "1 h"),
      analytics: true,
      prefix: "rl:upload",
    })
  : null;

// Fallback in-memory pour dev local (Map réinitialisé à chaque cold start).
const memStore = new Map<string, { count: number; resetAt: number }>();
function memLimit(ip: string, max: number, windowMs: number) {
  const now = Date.now();
  const entry = memStore.get(ip);
  if (!entry || entry.resetAt < now) {
    memStore.set(ip, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1 };
  }
  if (entry.count >= max) return { ok: false, remaining: 0 };
  entry.count += 1;
  return { ok: true, remaining: max - entry.count };
}

/**
 * Valide qu'une string ressemble à une IP (v4 ou v6) avant de la passer
 * comme clé KV. Max 45 chars (longueur max IPv6 textuel) + charset restreint
 * pour éviter pollution KV / injection de clés arbitraires.
 */
export function isValidIp(ip: string): boolean {
  if (!ip || ip.length > 45) return false;
  return /^[0-9a-f:.]+$/i.test(ip);
}

type Result = { ok: boolean; remaining: number };

async function applyLimiter(
  limiter: Ratelimit | null,
  ip: string,
  fallback: { max: number; windowMs: number }
): Promise<Result> {
  const safeIp = isValidIp(ip) ? ip : "unknown";
  if (limiter) {
    const r = await limiter.limit(safeIp);
    return { ok: r.success, remaining: r.remaining };
  }
  return memLimit(safeIp, fallback.max, fallback.windowMs);
}

/** Réservation publique : 5 / heure / IP. */
export async function checkReservationLimit(ip: string): Promise<Result> {
  return applyLimiter(reservationLimiter, ip, {
    max: 5,
    windowMs: 60 * 60 * 1000,
  });
}

/** Login admin : 10 / 15 min / IP (anti-brute-force). */
export async function checkAuthLimit(ip: string): Promise<Result> {
  return applyLimiter(authLimiter, ip, {
    max: 10,
    windowMs: 15 * 60 * 1000,
  });
}

/** Upload média admin : 30 / heure / IP (défense en profondeur). */
export async function checkUploadLimit(ip: string): Promise<Result> {
  return applyLimiter(uploadLimiter, ip, {
    max: 30,
    windowMs: 60 * 60 * 1000,
  });
}

// Compat: ancienne API utilisée par /api/reservations
export async function checkRateLimit(ip: string): Promise<Result> {
  return checkReservationLimit(ip);
}
