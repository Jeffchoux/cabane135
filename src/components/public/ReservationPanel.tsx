"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const HOURS = [
  "12:00", "12:30", "13:00", "13:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
];

type Errors = Partial<Record<"name" | "phone" | "email" | "date" | "time" | "covers", string>>;

export function ReservationPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setServerError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim() || undefined,
      date: String(fd.get("date") ?? ""),
      time: String(fd.get("time") ?? ""),
      covers: Number(fd.get("covers") ?? 0),
      message: String(fd.get("message") ?? "").trim() || undefined,
    };

    const errs: Errors = {};
    if (payload.name.length < 2) errs.name = "Votre nom est requis.";
    if (!/^[\d\s+\-.]{8,}$/.test(payload.phone)) errs.phone = "Numéro invalide.";
    if (!payload.date) errs.date = "Date requise.";
    if (!payload.time) errs.time = "Heure requise.";
    if (!payload.covers || payload.covers < 1) errs.covers = "Couverts requis.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Erreur lors de l'envoi");
      }
      setSuccess(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setSubmitting(false);
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Réserver une table"
        className={`fixed right-0 top-0 z-50 h-full w-[min(480px,100vw)] border-l border-[var(--gold)]/20 transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "rgba(15,32,53,0.96)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div>
            <p className="section-label">Réservation</p>
            <h3 className="serif text-2xl text-[var(--pearl)] mt-1">
              Une table à la <span className="italic text-[var(--gold)]">Cabane</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="h-9 w-9 inline-flex items-center justify-center text-white/60 hover:text-[var(--gold)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-77px)] px-6 py-6">
          {success ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🦪</div>
              <h4 className="serif text-2xl text-[var(--pearl)]">
                Demande envoyée
              </h4>
              <p className="mt-3 text-white/65 leading-relaxed">
                Merci ! Nous revenons vers vous très vite pour confirmer votre table.
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  onClose();
                }}
                className="mt-8 btn-liquid border border-[var(--gold)] px-6 py-3 text-[0.7rem] tracking-[0.3em] uppercase text-[var(--gold)]"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="name">Nom *</Label>
                <Input id="name" name="name" required autoComplete="name" />
                {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Téléphone *</Label>
                <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
                {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email <span className="text-white/30 normal-case tracking-normal">(facultatif — pour confirmation)</span></Label>
                <Input id="email" name="email" type="email" autoComplete="email" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="date">Date *</Label>
                  <Input id="date" name="date" type="date" min={today} required />
                  {errors.date && <p className="text-xs text-red-400">{errors.date}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="time">Heure *</Label>
                  <select
                    id="time"
                    name="time"
                    required
                    className="flex h-11 w-full rounded-sm border border-white/10 bg-white/5 px-3 text-sm text-[var(--pearl)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]/40"
                    defaultValue=""
                  >
                    <option value="" disabled>—</option>
                    {HOURS.map((h) => (
                      <option key={h} value={h} className="bg-[var(--ocean)]">
                        {h}
                      </option>
                    ))}
                  </select>
                  {errors.time && <p className="text-xs text-red-400">{errors.time}</p>}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="covers">Couverts *</Label>
                <select
                  id="covers"
                  name="covers"
                  required
                  defaultValue="2"
                  className="flex h-11 w-full rounded-sm border border-white/10 bg-white/5 px-3 text-sm text-[var(--pearl)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]/40"
                >
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n} className="bg-[var(--ocean)]">
                      {n} {n > 1 ? "personnes" : "personne"}
                    </option>
                  ))}
                </select>
                {errors.covers && <p className="text-xs text-red-400">{errors.covers}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Allergie, occasion spéciale…"
                />
              </div>

              {serverError && (
                <p className="text-sm text-red-400 border border-red-500/30 bg-red-500/5 p-3">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-liquid w-full h-12 border border-[var(--gold)] text-[0.72rem] tracking-[0.32em] uppercase text-[var(--gold)] disabled:opacity-50"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full border-2 border-current border-r-transparent animate-spin" />
                    Envoi…
                  </span>
                ) : (
                  "Envoyer la demande"
                )}
              </button>
              <p className="text-[0.65rem] text-white/35 text-center">
                Nous confirmons votre table par retour. Pas de paiement en ligne.
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
