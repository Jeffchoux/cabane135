import { CabaneMapClient } from "./CabaneMapClient";

export function MapSection() {
  const directions =
    "https://www.google.com/maps/dir/?api=1&destination=46.20415,-1.202009";

  return (
    <section
      id="trouver"
      className="relative px-6 py-28 md:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12 mb-14 md:mb-16">
          <header className="md:col-span-5">
            <p className="section-label">Adresse</p>
            <h2
              className="serif mt-5 font-light text-[var(--pearl)] leading-[1.05]"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}
            >
              Nous trouver.
            </h2>
          </header>
          <p className="md:col-span-6 md:col-start-7 text-white/55 text-[0.95rem] leading-relaxed self-end max-w-md">
            À quelques minutes de Lauzières, au bout de la rue du Port, là où
            les marais touchent l'estuaire.
          </p>
        </div>

        <div className="grid gap-px md:gap-0 md:grid-cols-12 bg-[var(--gold)]/15">
          <div
            className="relative md:col-span-8 overflow-hidden"
            style={{ minHeight: 460 }}
          >
            <CabaneMapClient />
            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute bottom-5 left-5 inline-flex items-center gap-3 text-[var(--gold)] text-[0.68rem] tracking-[0.32em] uppercase backdrop-blur-md bg-[var(--navy)]/75 border border-[var(--gold)]/40 px-5 py-3 transition-colors duration-300 hover:bg-[var(--gold)] hover:text-[var(--navy)] z-10"
              style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
            >
              <span>Obtenir l'itinéraire</span>
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
          </div>

          <aside className="md:col-span-4 bg-[var(--ocean)] p-8 md:p-10 flex flex-col gap-6 justify-between">
            <div>
              <p className="text-[0.62rem] tracking-[0.32em] uppercase text-[var(--gold)] mb-3">
                Rendez-vous
              </p>
              <p
                className="serif text-[var(--pearl)] font-light leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}
              >
                135 rue du Port
              </p>
              <p className="text-white/65 mt-2">17137 Nieul-sur-Mer</p>
              <p className="text-white/40 text-sm">Charente-Maritime</p>
            </div>

            <div className="space-y-3">
              <a
                href="tel:+33546413682"
                className="group inline-flex items-baseline gap-3 text-[var(--pearl)] hover:text-[var(--gold)] transition-colors"
              >
                <span className="text-[0.55rem] tracking-[0.32em] uppercase text-[var(--gold)]/70 group-hover:text-[var(--gold)]">
                  Tél
                </span>
                <span className="text-base">05 46 41 36 82</span>
              </a>
              <a
                href="mailto:contact@cabane135.fr"
                className="group inline-flex items-baseline gap-3 text-[var(--pearl)] hover:text-[var(--gold)] transition-colors"
              >
                <span className="text-[0.55rem] tracking-[0.32em] uppercase text-[var(--gold)]/70 group-hover:text-[var(--gold)]">
                  Mail
                </span>
                <span className="text-sm">contact@cabane135.fr</span>
              </a>
            </div>

            <div>
              <p className="text-[0.62rem] tracking-[0.32em] uppercase text-[var(--gold)] mb-3">
                Horaires
              </p>
              <p className="text-sm text-white/65 leading-relaxed">
                Le calendrier d'ouverture se précise au fil des semaines.
                Suivez{" "}
                <a
                  href="https://www.instagram.com/huitresleboncabane135/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--gold)] hover:underline underline-offset-4"
                >
                  Instagram
                </a>{" "}
                pour les derniers arrivages.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
