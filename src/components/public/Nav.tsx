"use client";
import { useEffect, useState } from "react";
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
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-2xl bg-[rgba(10,22,40,0.88)] border-b border-[var(--gold)]/12"
          : "backdrop-blur-md bg-[rgba(10,22,40,0.35)]"
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10 md:py-5">
        <Link
          href="/"
          className="group flex items-baseline gap-3"
          aria-label="Accueil Cabane 135"
        >
          <span className="serif text-[var(--pearl)] tracking-[0.12em] text-base md:text-lg leading-none">
            Cabane
            <span className="ml-1.5 text-[var(--turquoise)]">135</span>
          </span>
          <span
            aria-hidden
            className="hidden md:block h-3 w-px bg-[var(--gold)]/30"
          />
          <span className="hidden md:inline serif italic text-[var(--gold)]/75 text-[0.78rem] leading-none">
            by Huîtres Lebon
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-9 text-[0.66rem] tracking-[0.32em] uppercase">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative inline-block py-1 text-white/65 hover:text-[var(--pearl)] transition-colors duration-300"
              >
                <span>{l.label}</span>
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-px w-full bg-[var(--gold)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={onReserve}
            className="group hidden md:inline-flex items-center gap-3 text-[var(--gold)] tracking-[0.32em] text-[0.66rem] uppercase"
            aria-label="Réserver une table"
          >
            <span
              aria-hidden
              className="h-px w-7 bg-[var(--gold)] transition-all duration-500 group-hover:w-14"
              style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
            />
            <span>Réserver</span>
          </button>
          <button
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-[var(--pearl)]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <>
                  <path d="M3 8h18M3 16h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--gold)]/12 bg-[rgba(10,22,40,0.98)] backdrop-blur-2xl">
          <ul className="flex flex-col px-8 py-10 gap-7">
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="serif text-3xl text-[var(--pearl)] inline-flex items-baseline gap-4"
                >
                  <span className="text-[0.62rem] tracking-[0.32em] uppercase text-[var(--gold)]/70 font-sans">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{l.label}</span>
                </a>
              </li>
            ))}
            <li className="pt-3 border-t border-[var(--gold)]/15">
              <button
                onClick={() => {
                  setOpen(false);
                  onReserve();
                }}
                className="serif italic text-3xl text-[var(--gold)] inline-flex items-baseline gap-4"
              >
                <span className="text-[0.62rem] tracking-[0.32em] uppercase text-[var(--gold)]/70 not-italic font-sans">
                  →
                </span>
                <span>Réserver une table</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
