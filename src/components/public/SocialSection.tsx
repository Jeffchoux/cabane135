const items = [
  {
    name: "Instagram",
    handle: "@huitresleboncabane135",
    url: "https://www.instagram.com/huitresleboncabane135/",
  },
  {
    name: "Facebook",
    handle: "Huîtres Lebon Cabane 135",
    url: "https://www.facebook.com/people/Hu%C3%AEtres-Lebon-Cabane-135/61576413212556/",
  },
  {
    name: "TikTok",
    handle: "@huitresleboncabane135",
    url: "https://www.tiktok.com/@huitresleboncabane135",
  },
];

export function SocialSection() {
  return (
    <section className="px-6 py-24 md:py-32 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12 mb-12 md:mb-16">
          <header className="md:col-span-5">
            <p className="section-label">Réseaux</p>
            <h2
              className="serif mt-5 font-light text-[var(--pearl)] leading-[1.05]"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}
            >
              Restez à l'écoute.
            </h2>
          </header>
          <p className="md:col-span-6 md:col-start-7 text-white/55 text-[0.95rem] leading-relaxed self-end max-w-md">
            Arrivages du jour, plateaux du soir, événements à la cabane. On
            poste là plutôt qu'on envoie des newsletters.
          </p>
        </div>

        <ol className="divide-y divide-[var(--gold)]/15 border-y border-[var(--gold)]/15">
          {items.map((it) => (
            <li key={it.name}>
              <a
                href={it.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-12 items-center gap-4 md:gap-8 py-6 md:py-8 transition-colors duration-300 hover:bg-[var(--ocean)]/30"
              >
                <span
                  className="col-span-4 md:col-span-3 serif text-[var(--pearl)] font-light leading-none"
                  style={{ fontSize: "clamp(1.25rem, 2.2vw, 2rem)" }}
                >
                  {it.name}
                </span>
                <span className="hidden md:block md:col-span-5">
                  <span
                    aria-hidden
                    className="block h-px w-full bg-[var(--gold)]/30 transition-all duration-500"
                    style={{
                      transformOrigin: "left",
                      transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </span>
                <span className="col-span-6 md:col-span-3 text-white/55 text-[0.85rem] tracking-wide truncate">
                  {it.handle}
                </span>
                <span
                  className="col-span-2 md:col-span-1 text-[var(--gold)] tracking-[0.28em] text-[0.65rem] uppercase text-right inline-flex items-center justify-end gap-2 transition-transform duration-500"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                >
                  <span className="hidden md:inline">Suivre</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-500 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
