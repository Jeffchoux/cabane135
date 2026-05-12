export function MapSection() {
  const directions =
    "https://www.google.com/maps/dir/?api=1&destination=46.20415,-1.202009";
  const embed =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101!2d-1.2020846!3d46.20422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4806abbb0675ed91%3A0xdb815905e96cb6a0!2sHUITRES%20LEBON%20CABANE%20135!5e0!3m2!1sfr!2sfr!4v1";
  return (
    <section id="trouver" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="section-label">Adresse</p>
          <h2 className="serif mt-4 text-4xl md:text-5xl font-light text-[var(--pearl)]">
            Nous <span className="italic text-[var(--gold)]">trouver</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 relative overflow-hidden border border-white/10" style={{ minHeight: 360 }}>
            <iframe
              src={embed}
              title="Carte Cabane 135"
              width="100%"
              height="100%"
              style={{
                border: 0,
                position: "absolute",
                inset: 0,
                filter: "grayscale(0.85) hue-rotate(180deg) saturate(0.6) brightness(0.85)",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 glass-strong px-4 py-2 text-[0.7rem] tracking-[0.3em] uppercase text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-colors"
            >
              Obtenir l'itinéraire →
            </a>
          </div>

          <div className="glass p-8 flex flex-col gap-5">
            <div>
              <p className="serif text-2xl text-[var(--pearl)] leading-tight">
                135 rue du Port
              </p>
              <p className="text-white/70 mt-1">17137 Nieul-sur-Mer</p>
              <p className="text-white/50 text-sm">Charente-Maritime</p>
            </div>
            <div className="h-px bg-[var(--gold)]/20" />
            <div className="space-y-2 text-sm">
              <a
                href="tel:+33546413682"
                className="block text-[var(--pearl)] hover:text-[var(--gold)] transition-colors"
              >
                05 46 41 36 82
              </a>
              <a
                href="mailto:contact@cabane135.fr"
                className="block text-[var(--pearl)] hover:text-[var(--gold)] transition-colors"
              >
                contact@cabane135.fr
              </a>
            </div>
            <div className="h-px bg-[var(--gold)]/20" />
            <div>
              <p className="text-[0.65rem] tracking-[0.3em] uppercase text-white/40 mb-2">
                Horaires
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                Consultez nos réseaux pour les horaires du moment.
              </p>
              <a
                href="https://www.instagram.com/huitresleboncabane135/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[0.7rem] tracking-[0.3em] uppercase text-[var(--gold)] hover:underline underline-offset-4"
              >
                Voir Instagram →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
