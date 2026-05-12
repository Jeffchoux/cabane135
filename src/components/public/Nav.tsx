"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { href: "#histoire", label: "Histoire" },
  { href: "#degustation", label: "Dégustation" },
  { href: "#moments", label: "Moments" },
  { href: "#trouver", label: "Nous trouver" },
];

export function Nav({ onReserve }: { onReserve: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Navigation principale"
      role="navigation"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-2xl bg-[rgba(10,22,40,0.92)] border-b border-white/5"
          : "backdrop-blur-xl bg-[rgba(10,22,40,0.55)]"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Accueil Cabane 135">
          <Image
            src="/facade-cabane135.jpg"
            alt="Cabane 135"
            width={120}
            height={36}
            className="h-9 w-auto rounded-sm object-cover"
          />
          <span className="flex flex-col leading-none">
            <span className="serif text-base md:text-lg text-[var(--pearl)] tracking-[0.18em] uppercase">
              Cabane <span className="text-[var(--turquoise)]">135</span>
            </span>
            <span className="serif italic text-[0.65rem] md:text-xs text-[var(--gold)]/80 mt-0.5 tracking-wide">
              by Huîtres Lebon
            </span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-[0.78rem] tracking-[0.2em] uppercase">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-white/70 hover:text-[var(--gold)] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={onReserve}
            className="btn-liquid hidden md:inline-flex h-10 items-center justify-center border border-[var(--gold)] px-5 text-[0.7rem] tracking-[0.3em] uppercase text-[var(--gold)]"
          >
            Réserver
          </button>
          <button
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-[var(--pearl)]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <>
                  <path d="M3 7h18M3 12h18M3 17h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[rgba(10,22,40,0.98)] backdrop-blur-2xl">
          <ul className="flex flex-col px-6 py-6 gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="serif text-3xl text-[var(--pearl)]"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  onReserve();
                }}
                className="serif text-3xl italic text-[var(--gold)]"
              >
                Réserver
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
