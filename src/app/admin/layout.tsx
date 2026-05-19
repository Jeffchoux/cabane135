import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/lib/auth";

// L'authentification est gérée par src/middleware.ts qui bloque l'accès à /admin/*
// si la session est absente (sauf /admin/login). Pas besoin de re-vérifier ici.

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen md:flex bg-[var(--navy)]">
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-[var(--gold)]/10 bg-[var(--ocean)] p-6">
        <Link href="/admin" className="flex items-center gap-3 mb-10">
          <Image
            src="/facade-cabane135.jpg"
            alt="Cabane 135"
            width={40}
            height={40}
            className="rounded-sm object-cover"
          />
          <span className="serif text-[var(--pearl)]">Admin</span>
        </Link>
        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/admin" className="px-3 py-2 rounded-sm hover:bg-white/5 text-white/80">
            📷 Posts
          </Link>
          <Link href="/admin/reservations" className="px-3 py-2 rounded-sm hover:bg-white/5 text-white/80">
            📅 Réservations
          </Link>
          <Link href="/admin/carte" className="px-3 py-2 rounded-sm hover:bg-white/5 text-white/80">
            🦪 La carte
          </Link>
          <Link href="/" target="_blank" className="px-3 py-2 rounded-sm hover:bg-white/5 text-white/60">
            🌐 Voir le site
          </Link>
        </nav>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
          className="mt-auto"
        >
          <button
            type="submit"
            className="w-full px-3 py-2 text-left text-sm text-white/55 hover:text-[var(--gold)]"
          >
            ↩ Déconnexion
          </button>
        </form>
      </aside>

      <main className="flex-1 min-w-0 pb-24 md:pb-12">{children}</main>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-[var(--ocean)] grid grid-cols-5 text-xs">
        <Link href="/admin" className="flex flex-col items-center py-3 text-white/80">📷</Link>
        <Link href="/admin/reservations" className="flex flex-col items-center py-3 text-white/80">📅</Link>
        <Link href="/admin/carte" className="flex flex-col items-center py-3 text-white/80">🦪</Link>
        <Link href="/" target="_blank" className="flex flex-col items-center py-3 text-white/60">🌐</Link>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
          className="contents"
        >
          <button className="flex flex-col items-center py-3 text-white/60">↩</button>
        </form>
      </nav>
    </div>
  );
}
