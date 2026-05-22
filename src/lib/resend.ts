import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const from =
  process.env.RESEND_FROM ?? "Huîtres Lebon Cabane 135 <contact@cabane135.fr>";
const adminEmails = Array.from(
  new Set(
    [
      process.env.ADMIN_EMAIL ?? "contact@cabane135.fr",
      "huitres.lebon@orange.fr",
      "comptahuitreslebon@orange.fr",
    ].map((s) => s.trim().toLowerCase()),
  ),
);
const replyTo = "contact@cabane135.fr";

const fromFormatted = from.includes("<")
  ? from
  : `Huîtres Lebon Cabane 135 <${from}>`;

let resend: Resend | null = null;
function client() {
  if (resend) return resend;
  if (!apiKey) throw new Error("RESEND_API_KEY missing");
  resend = new Resend(apiKey);
  return resend;
}

/**
 * Échappe les caractères HTML dangereux dans les valeurs user-controlled
 * avant injection dans les emails HTML. DOMPurify serait overkill ici :
 * on n'autorise AUCUN HTML utilisateur, on échappe tout.
 */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(s: string): string {
  return escapeHtml(s);
}

type ReservationPayload = {
  name: string;
  phone: string;
  email?: string | null;
  date: Date;
  time: string;
  covers: number;
  message?: string | null;
};

export const formatDate = (d: Date) =>
  d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/** Notifie l'admin d'une nouvelle réservation (email HTML + texte). */
export async function sendNotification(r: ReservationPayload) {
  if (!apiKey) {
    console.error("[resend] RESEND_API_KEY missing — skipping notification");
    return;
  }
  const subject = `Nouvelle réservation — ${r.name} · ${formatDate(r.date)} ${r.time}`;
  const adminUrl = `${process.env.NEXT_PUBLIC_URL ?? "https://cabane135.fr"}/admin/reservations`;

  // Échappement strict de TOUTES les valeurs user-controlled
  const e = {
    name: escapeHtml(r.name),
    phone: escapeHtml(r.phone),
    email: r.email ? escapeHtml(r.email) : null,
    emailAttr: r.email ? escapeAttr(r.email) : null,
    phoneAttr: escapeAttr(r.phone),
    date: escapeHtml(formatDate(r.date)),
    time: escapeHtml(r.time),
    covers: r.covers,
    message: r.message ? escapeHtml(r.message) : null,
  };

  const text = [
    `Nouvelle réservation à la Cabane 135`,
    ``,
    `Nom : ${r.name}`,
    `Téléphone : ${r.phone}`,
    `Email : ${r.email ?? "—"}`,
    `Date : ${formatDate(r.date)}`,
    `Heure : ${r.time}`,
    `Couverts : ${r.covers}`,
    `Message : ${r.message ?? "—"}`,
    ``,
    `Gérer la réservation : ${adminUrl}`,
    ``,
    `--`,
    `Cabane 135 — 135 rue du Port, 17137 Nieul-sur-Mer`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:24px;background:#f7f5f0;font-family:Helvetica,Arial,sans-serif;color:#0a1628;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e6e1d4;">
    <tr><td style="padding:32px;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#c8a15a;">Cabane 135</p>
      <h1 style="margin:8px 0 24px;font-size:22px;font-weight:500;color:#0a1628;">Nouvelle réservation</h1>
      <table role="presentation" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px;line-height:1.5;">
        <tr><td style="color:#666;width:120px;">Nom</td><td style="color:#0a1628;font-weight:500;">${e.name}</td></tr>
        <tr><td style="color:#666;">Téléphone</td><td><a href="tel:${e.phoneAttr}" style="color:#0a1628;text-decoration:none;">${e.phone}</a></td></tr>
        <tr><td style="color:#666;">Email</td><td>${e.email ? `<a href="mailto:${e.emailAttr}" style="color:#0a1628;text-decoration:none;">${e.email}</a>` : "—"}</td></tr>
        <tr><td style="color:#666;">Date</td><td style="color:#0a1628;font-weight:500;">${e.date}</td></tr>
        <tr><td style="color:#666;">Heure</td><td style="color:#0a1628;font-weight:500;">${e.time}</td></tr>
        <tr><td style="color:#666;">Couverts</td><td style="color:#0a1628;font-weight:500;">${e.covers}</td></tr>
        <tr><td style="color:#666;vertical-align:top;">Message</td><td style="color:#0a1628;">${e.message ?? "—"}</td></tr>
      </table>
      <p style="margin:28px 0 0;"><a href="${adminUrl}" style="display:inline-block;padding:12px 24px;background:#0a1628;color:#ffffff;text-decoration:none;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">Gérer la réservation</a></p>
    </td></tr>
    <tr><td style="padding:16px 32px;border-top:1px solid #e6e1d4;font-size:11px;color:#999;">
      Cabane 135 · 135 rue du Port · 17137 Nieul-sur-Mer · 05 46 41 36 82
    </td></tr>
  </table>
</body></html>`;

  await client().emails.send({
    from: fromFormatted,
    to: adminEmails,
    replyTo,
    subject,
    text,
    html,
  });
}

/** Confirme la réception de la demande au client (no-op si pas d'email). */
export async function sendConfirmation(r: ReservationPayload) {
  if (!apiKey || !r.email) return;
  const subject = `Votre demande de réservation — Cabane 135`;

  const e = {
    name: escapeHtml(r.name),
    date: escapeHtml(formatDate(r.date)),
    time: escapeHtml(r.time),
    covers: r.covers,
  };

  const text = [
    `Bonjour ${r.name},`,
    ``,
    `Nous avons bien reçu votre demande de réservation pour ${r.covers} couvert(s) le ${formatDate(r.date)} à ${r.time}.`,
    ``,
    `Nous vous confirmons par retour dans les meilleurs délais.`,
    ``,
    `À très vite,`,
    `L'équipe Huîtres Lebon Cabane 135`,
    ``,
    `--`,
    `Cabane 135`,
    `135 rue du Port — 17137 Nieul-sur-Mer`,
    `Tél : 05 46 41 36 82`,
    `Email : contact@cabane135.fr`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:24px;background:#f7f5f0;font-family:Helvetica,Arial,sans-serif;color:#0a1628;line-height:1.6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e6e1d4;">
    <tr><td style="padding:32px;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#c8a15a;">Cabane 135</p>
      <h1 style="margin:8px 0 20px;font-size:24px;font-weight:500;color:#0a1628;">Bonjour ${e.name},</h1>
      <p style="margin:0 0 14px;">Nous avons bien reçu votre demande de réservation pour
        <strong>${e.covers} couvert${e.covers > 1 ? "s" : ""}</strong>
        le <strong>${e.date}</strong> à <strong>${e.time}</strong>.</p>
      <p style="margin:0 0 14px;">Nous vous confirmons par retour dans les meilleurs délais.</p>
      <p style="margin:24px 0 0;">À très vite,<br/><em style="color:#666;">L'équipe Huîtres Lebon Cabane 135</em></p>
    </td></tr>
    <tr><td style="padding:16px 32px;border-top:1px solid #e6e1d4;font-size:12px;color:#666;">
      <strong style="color:#0a1628;">Cabane 135</strong><br/>
      135 rue du Port — 17137 Nieul-sur-Mer<br/>
      <a href="tel:+33546413682" style="color:#666;text-decoration:none;">05 46 41 36 82</a> ·
      <a href="mailto:contact@cabane135.fr" style="color:#666;text-decoration:none;">contact@cabane135.fr</a>
    </td></tr>
  </table>
</body></html>`;

  await client().emails.send({
    from: fromFormatted,
    to: r.email,
    replyTo,
    subject,
    text,
    html,
    headers: {
      "List-Unsubscribe": `<mailto:${replyTo}?subject=unsubscribe>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });
}
