import Link from "next/link";

const socials = [
  {
    href: "https://www.instagram.com/huitresleboncabane135/",
    label: "Instagram",
  },
  {
    href: "https://www.facebook.com/people/Hu%C3%AEtres-Lebon-Cabane-135/61576413212556/",
    label: "Facebook",
  },
  {
    href: "https://www.tiktok.com/@huitresleboncabane135",
    label: "TikTok",
  },
];

const legal = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/cgu", label: "CGU" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-[var(--gold)]/12">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-baseline gap-3">
              <span className="serif text-[var(--pearl)] tracking-[0.1em] text-2xl md:text-3xl leading-none">
                Cabane
                <span className="ml-2 text-[var(--turquoise)]">135</span>
              </span>
            </Link>
            <p className="serif italic text-[var(--gold)]/80 mt-3 text-sm md:text-base">
              by Huîtres Lebon
            </p>
            <p className="mt-6 text-white/50 text-[0.9rem] leading-relaxed max-w-sm">
              Cabane de dégustation au 135 rue du Port, Nieul-sur-Mer.
              Ouverte depuis le 1ᵉʳ mai 2026.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="text-[0.6rem] tracking-[0.32em] uppercase text-[var(--gold)] mb-5">
              Réseaux
            </p>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-baseline gap-2.5 text-white/65 hover:text-[var(--pearl)] transition-colors duration-300 text-[0.9rem]"
                  >
                    <span>{s.label}</span>
                    <span
                      aria-hidden
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[var(--gold)]"
                      style={{
                        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                      }}
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <p className="text-[0.6rem] tracking-[0.32em] uppercase text-[var(--gold)] mb-5">
              Légal
            </p>
            <ul className="space-y-2">
              {legal.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-white/65 hover:text-[var(--pearl)] transition-colors duration-300 text-[0.9rem]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col-reverse md:flex-row md:items-end md:justify-between gap-4">
          <p className="text-[0.6rem] tracking-[0.32em] uppercase text-white/55">
            © 2026 Huîtres Lebon Cabane 135{" "}
            <span className="text-white/15 mx-1">·</span> SIREN 991 494 634
          </p>
          <p className="text-[0.6rem] tracking-[0.32em] uppercase text-white/55">
            Nieul-sur-Mer{" "}
            <span className="text-white/15 mx-1">·</span> Charente-Maritime
          </p>
        </div>
      </div>
    </footer>
  );
}
