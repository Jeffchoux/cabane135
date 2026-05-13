"use client";
import { useMemo, useState } from "react";

type Status = "PENDING" | "CONFIRMED" | "CANCELLED";
type R = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  date: string;
  time: string;
  covers: number;
  message: string | null;
  status: Status;
  createdAt: string;
};

const tabs: { id: "ALL" | Status; label: string }[] = [
  { id: "ALL", label: "Toutes" },
  { id: "PENDING", label: "En attente" },
  { id: "CONFIRMED", label: "Confirmées" },
  { id: "CANCELLED", label: "Annulées" },
];

const statusStyle: Record<Status, string> = {
  PENDING: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  CONFIRMED: "bg-green-500/15 text-green-300 border-green-500/30",
  CANCELLED: "bg-red-500/15 text-red-300 border-red-500/30",
};

export function ReservationManager({ initial }: { initial: R[] }) {
  const [rows, setRows] = useState(initial);
  const [filter, setFilter] = useState<"ALL" | Status>("ALL");
  const [busy, setBusy] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return rows
      .filter((r) => filter === "ALL" || r.status === filter)
      .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  }, [rows, filter]);

  async function setStatus(id: string, status: Status) {
    setBusy(id);
    setRows((arr) => arr.map((r) => (r.id === id ? { ...r, status } : r)));
    await fetch(`/api/reservations?id=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusy(null);
  }

  async function remove(id: string, name: string) {
    if (
      !confirm(
        `Supprimer définitivement la réservation de "${name}" ?\n\nCette action est irréversible.`
      )
    ) {
      return;
    }
    setBusy(id);
    const prev = rows;
    setRows((arr) => arr.filter((r) => r.id !== id));
    const res = await fetch(`/api/reservations?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      // Rollback si échec
      setRows(prev);
      alert("Échec de la suppression. La réservation a été restaurée.");
    }
    setBusy(null);
  }

  return (
    <div className="space-y-5">
      <ul className="flex flex-wrap gap-2 border-b border-white/10">
        {tabs.map((t) => (
          <li key={t.id}>
            <button
              onClick={() => setFilter(t.id)}
              className={`px-4 py-2 text-[0.7rem] tracking-[0.25em] uppercase border-b-2 -mb-px transition-colors ${
                filter === t.id
                  ? "border-[var(--gold)] text-[var(--gold)]"
                  : "border-transparent text-white/45 hover:text-[var(--pearl)]"
              }`}
            >
              {t.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[0.6rem] tracking-[0.25em] uppercase text-white/40">
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-2">Nom</th>
              <th className="text-left py-3 px-2">Téléphone</th>
              <th className="text-left py-3 px-2">Date</th>
              <th className="text-left py-3 px-2">Heure</th>
              <th className="text-left py-3 px-2">Couverts</th>
              <th className="text-left py-3 px-2">Message</th>
              <th className="text-left py-3 px-2">Statut</th>
              <th className="text-right py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-white/5 align-top">
                <td className="py-3 px-2 text-[var(--pearl)]">
                  <p>{r.name}</p>
                  {r.email && <p className="text-xs text-white/40">{r.email}</p>}
                </td>
                <td className="py-3 px-2 text-white/70">
                  <a href={`tel:${r.phone}`} className="hover:text-[var(--gold)]">{r.phone}</a>
                </td>
                <td className="py-3 px-2 text-white/70 whitespace-nowrap">
                  {new Date(r.date).toLocaleDateString("fr-FR", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </td>
                <td className="py-3 px-2 text-white/70">{r.time}</td>
                <td className="py-3 px-2 text-white/70">{r.covers}</td>
                <td className="py-3 px-2 text-white/55 max-w-[220px]">
                  {r.message ?? "—"}
                </td>
                <td className="py-3 px-2">
                  <span className={`inline-block px-2 py-0.5 border text-[0.55rem] tracking-[0.2em] uppercase ${statusStyle[r.status]}`}>
                    {r.status === "PENDING" ? "Attente" : r.status === "CONFIRMED" ? "Confirmée" : "Annulée"}
                  </span>
                </td>
                <td className="py-3 px-2 text-right space-x-2 whitespace-nowrap">
                  {r.status !== "CONFIRMED" && (
                    <button
                      onClick={() => setStatus(r.id, "CONFIRMED")}
                      disabled={busy === r.id}
                      className="text-xs px-2 py-1 border border-green-500/40 text-green-300 hover:bg-green-500/10"
                    >
                      Confirmer
                    </button>
                  )}
                  {r.status !== "CANCELLED" && (
                    <button
                      onClick={() => setStatus(r.id, "CANCELLED")}
                      disabled={busy === r.id}
                      className="text-xs px-2 py-1 border border-red-500/40 text-red-300 hover:bg-red-500/10"
                    >
                      Annuler
                    </button>
                  )}
                  <button
                    onClick={() => remove(r.id, r.name)}
                    disabled={busy === r.id}
                    aria-label={`Supprimer la réservation de ${r.name}`}
                    className="text-xs px-2 py-1 border border-white/15 text-white/50 hover:border-red-500/60 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={8} className="text-center text-white/40 py-10 text-sm">
                  Aucune réservation.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
