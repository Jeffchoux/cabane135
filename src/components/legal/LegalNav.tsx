import Link from "next/link";

const tabs = [
  { href: "/mentions-legales", label: "Mentions" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/cgu", label: "CGU" },
];

export function LegalNav({ current }: { current: string }) {
  return (
    <header className="mb-12">
      <Link
        href="/"
        className="text-[0.65rem] tracking-[0.3em] uppercase text-white/40 hover:text-[var(--gold)] transition-colors"
      >
        ← Site
      </Link>
      <ul className="mt-6 flex flex-wrap gap-2 border-b border-white/10">
        {tabs.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className={`inline-block px-4 py-2 text-[0.7rem] tracking-[0.25em] uppercase border-b-2 -mb-px transition-colors ${
                current === t.href
                  ? "border-[var(--gold)] text-[var(--gold)]"
                  : "border-transparent text-white/45 hover:text-[var(--pearl)]"
              }`}
            >
              {t.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
