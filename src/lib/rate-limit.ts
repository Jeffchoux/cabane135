/**
 * Rate-limit in-memory (Map JS).
 *
 * ⚠️ LIMITATION : sur Vercel serverless, chaque cold start réinitialise le Map.
 *   En pratique cela protège contre des burst d'une même instance Lambda mais
 *   un attaquant déterminé peut contourner en provoquant des cold starts ou
 *   en visant plusieurs régions Edge.
 *
 * Pour un rate-limit serverless réel, migrer vers Upstash Redis :
 *   - Activer Vercel KV (Storage tab → Create → KV)
 *   - npm install @upstash/ratelimit @vercel/kv
 *   - Remplacer cette fonction par une lecture/écriture KV
 *
 * En attendant, on garde cette protection minimale qui aide quand même contre
 * les bots non sophistiqués.
 */

const store = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX = 5;

function isValidIp(ip: string): boolean {
  if (!ip || ip.length > 45) return false;
  // IPv4 ou IPv6 simple validation (pour ne pas accepter du texte arbitraire comme clé)
  return /^[0-9a-f:.]+$/i.test(ip);
}

export function checkRateLimit(ipRaw: string) {
  const ip = isValidIp(ipRaw) ? ipRaw : "unknown";
  const now = Date.now();
  const entry = store.get(ip);
  if (!entry || entry.resetAt < now) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX - 1 };
  }
  if (entry.count >= MAX) return { ok: false, remaining: 0 };
  entry.count += 1;
  return { ok: true, remaining: MAX - entry.count };
}

if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of store) if (v.resetAt < now) store.delete(k);
  }, WINDOW_MS).unref?.();
}
