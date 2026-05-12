import Image from "next/image";
import Link from "next/link";

const socials = [
  { href: "https://www.instagram.com/huitresleboncabane135/", label: "Instagram" },
  { href: "https://www.facebook.com/people/Hu%C3%AEtres-Lebon-Cabane-135/61576413212556/", label: "Facebook" },
  { href: "https://www.tiktok.com/@huitresleboncabane135", label: "TikTok" },
];

export function Footer() {
  return (
    <footer className="relative mt-20">
      <div className="wave-divider h-12 w-full" />
      <div className="px-6 py-16">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center gap-6">
          <Image
            src="/facade-cabane135.jpg"
            alt="Cabane 135"
            width={160}
            height={48}
            className="h-12 w-auto rounded-sm object-cover"
          />
          <div className="flex flex-col items-center gap-1">
            <p className="serif uppercase tracking-[0.2em] text-2xl text-[var(--pearl)]">
              Cabane <span className="text-[var(--turquoise)]">135</span>
            </p>
            <p className="serif italic text-sm text-[var(--gold)]/80 tracking-wide">
              by Huîtres Lebon
            </p>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.65rem] tracking-[0.3em] uppercase text-white/25">
            <li>
              <Link href="/mentions-legales" className="hover:text-[var(--gold)] transition-colors">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="hover:text-[var(--gold)] transition-colors">
                Confidentialité
              </Link>
            </li>
            <li>
              <Link href="/cgu" className="hover:text-[var(--gold)] transition-colors">
                CGU
              </Link>
            </li>
          </ul>

          <ul className="flex items-center gap-4 text-white/30">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.7rem] tracking-[0.2em] uppercase hover:text-[var(--gold)] transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-white/20 mt-4">
            © 2026 Huîtres Lebon Cabane 135 — SIREN 991 494 634
          </p>
        </div>
      </div>
    </footer>
  );
}
