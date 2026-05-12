import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const from =
  process.env.RESEND_FROM ?? "Huîtres Lebon Cabane 135 <contact@cabane135.fr>";
const adminEmail = process.env.ADMIN_EMAIL ?? "contact@cabane135.fr";

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

type ReservationPayload = {
  name: string;
  phone: string;
  email?: string | null;
  date: Date;
  time: string;
  covers: number;
  message?: string | null;
};

const formatDate = (d: Date) =>
  d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export async function sendNotification(r: ReservationPayload) {
  if (!apiKey) {
    console.error("[resend] RESEND_API_KEY missing — skipping notification");
    return;
  }
  const subject = `🦪 Nouvelle réservation — ${r.name} · ${formatDate(r.date)} ${r.time}`;
  const html = `
    <div style="font-family:system-ui,sans-serif;color:#0a1628;">
      <h2 style="color:#c8a15a;">Nouvelle réservation</h2>
      <table cellpadding="6" style="border-collapse:collapse;">
        <tr><td><strong>Nom</strong></td><td>${r.name}</td></tr>
        <tr><td><strong>Téléphone</strong></td><td>${r.phone}</td></tr>
        <tr><td><strong>Email</strong></td><td>${r.email ?? "—"}</td></tr>
        <tr><td><strong>Date</strong></td><td>${formatDate(r.date)}</td></tr>
        <tr><td><strong>Heure</strong></td><td>${r.time}</td></tr>
        <tr><td><strong>Couverts</strong></td><td>${r.covers}</td></tr>
        <tr><td><strong>Message</strong></td><td>${r.message ?? "—"}</td></tr>
      </table>
      <p><a href="${process.env.NEXT_PUBLIC_URL ?? ""}/admin/reservations">Gérer la réservation →</a></p>
    </div>`;
  await client().emails.send({ from: fromFormatted, to: adminEmail, subject, html });
}

export async function sendConfirmation(r: ReservationPayload) {
  if (!apiKey || !r.email) return;
  const subject = `Votre demande de réservation — Cabane 135`;
  const html = `
    <div style="font-family:system-ui,sans-serif;color:#0a1628;line-height:1.6;">
      <h2 style="color:#c8a15a;">Bonjour ${r.name},</h2>
      <p>Nous avons bien reçu votre demande de réservation pour <strong>${r.covers}</strong> couvert(s)
      le <strong>${formatDate(r.date)} à ${r.time}</strong>.</p>
      <p>Nous vous confirmons par retour dans les meilleurs délais.</p>
      <p style="margin-top:24px;">À très vite,<br/><em>L'équipe Huîtres Lebon Cabane 135</em></p>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
      <p style="font-size:12px;color:#666;">
        135 rue du Port, 17137 Nieul-sur-Mer<br/>
        05 46 41 36 82 — contact@cabane135.fr
      </p>
    </div>`;
  await client().emails.send({ from: fromFormatted, to: r.email, subject, html });
}
