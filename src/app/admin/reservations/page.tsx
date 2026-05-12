import { db } from "@/lib/db";
import { ReservationManager } from "@/components/admin/ReservationManager";

export const dynamic = "force-dynamic";

async function load() {
  try {
    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const [pending, confirmed, totalMonth, rows] = await Promise.all([
      db.reservation.count({ where: { status: "PENDING" } }),
      db.reservation.count({ where: { status: "CONFIRMED" } }),
      db.reservation.count({ where: { createdAt: { gte: startMonth } } }),
      db.reservation.findMany({ orderBy: { date: "asc" }, take: 200 }),
    ]);
    return {
      stats: { pending, confirmed, totalMonth },
      rows: rows.map((r) => ({
        ...r,
        date: r.date.toISOString(),
        createdAt: r.createdAt.toISOString(),
      })),
    };
  } catch (err) {
    console.error("[reservations] load failed:", err);
    return { stats: { pending: 0, confirmed: 0, totalMonth: 0 }, rows: [] };
  }
}

export default async function Page() {
  const { stats, rows } = await load();
  return (
    <div className="px-5 md:px-10 py-8 md:py-12 space-y-8 max-w-6xl">
      <header>
        <p className="section-label">Admin</p>
        <h1 className="serif text-3xl md:text-4xl text-[var(--pearl)] mt-1">Réservations</h1>
      </header>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="glass p-5">
          <p className="serif text-3xl text-[var(--gold)]">{stats.pending}</p>
          <p className="text-[0.6rem] tracking-[0.3em] uppercase text-white/40 mt-1">En attente</p>
        </div>
        <div className="glass p-5">
          <p className="serif text-3xl text-[var(--gold)]">{stats.confirmed}</p>
          <p className="text-[0.6rem] tracking-[0.3em] uppercase text-white/40 mt-1">Confirmées</p>
        </div>
        <div className="glass p-5">
          <p className="serif text-3xl text-[var(--gold)]">{stats.totalMonth}</p>
          <p className="text-[0.6rem] tracking-[0.3em] uppercase text-white/40 mt-1">Total mois</p>
        </div>
      </div>

      <ReservationManager initial={rows} />
    </div>
  );
}
