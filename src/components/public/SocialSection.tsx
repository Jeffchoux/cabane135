const items = [
  {
    name: "Instagram",
    handle: "@huitresleboncabane135",
    url: "https://www.instagram.com/huitresleboncabane135/",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "Huîtres Lebon Cabane 135",
    url: "https://www.facebook.com/people/Hu%C3%AEtres-Lebon-Cabane-135/61576413212556/",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5 3.66 9.14 8.44 9.93v-7.02H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.91h-2.33V22c4.78-.79 8.44-4.93 8.44-9.93z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@huitresleboncabane135",
    url: "https://www.tiktok.com/@huitresleboncabane135",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 5.7c-.9-.9-1.4-2.1-1.5-3.5h-3v13.4c0 1.6-1.3 2.9-2.9 2.9-1.6 0-2.9-1.3-2.9-2.9 0-1.6 1.3-2.9 2.9-2.9.3 0 .6 0 .8.1V9.7c-.3 0-.5-.1-.8-.1C5.9 9.6 3 12.5 3 16s2.9 6.3 6.4 6.3 6.4-2.9 6.4-6.3V9.2c1.2.9 2.7 1.4 4.2 1.4V7.6c-1.4 0-2.7-.7-3.5-1.9z" />
      </svg>
    ),
  },
];

export function SocialSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="section-label">Réseaux</p>
        <h2 className="serif mt-4 text-4xl md:text-5xl font-light text-[var(--pearl)]">
          Restez <span className="italic text-[var(--gold)]">connectés</span>
        </h2>
        <p className="mt-4 text-white/55 max-w-xl mx-auto">
          Suivez nos arrivages, plateaux du jour et événements à la cabane.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {items.map((it) => (
            <a
              key={it.name}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--turquoise)]/40"
              style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            >
              <span className="text-[var(--gold)]">{it.icon}</span>
              <p className="serif text-xl text-[var(--pearl)]">{it.name}</p>
              <p className="text-xs text-white/50 tracking-wide">{it.handle}</p>
              <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--gold)]">
                Suivre →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
