import Image from "next/image";

export function MapPhoto() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[var(--navy)]">
      <Image
        src="/terrasse-vue-marais.jpg"
        alt="Cabane 135 — vue sur les marais"
        fill
        sizes="(min-width: 768px) 66vw, 100vw"
        className="object-cover"
        style={{
          filter: "brightness(0.85) contrast(1.05) saturate(1.05)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,22,40,0.25) 0%, rgba(10,22,40,0.40) 60%, rgba(10,22,40,0.78) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-12">
        <p className="text-[0.6rem] tracking-[0.32em] uppercase text-[var(--gold)] mb-3">
          Rendez-vous
        </p>
        <p
          className="serif font-medium text-[var(--pearl)] leading-tight"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
        >
          135 rue du Port
        </p>
        <p
          className="serif italic text-[var(--gold)]/90 mt-2"
          style={{ fontSize: "clamp(1rem, 1.6vw, 1.3rem)" }}
        >
          17137 Nieul-sur-Mer
        </p>
        <div className="mt-5 inline-flex items-center gap-4 text-[0.65rem] tracking-[0.32em] uppercase text-white/70">
          <span aria-hidden className="h-px w-8 bg-[var(--gold)]" />
          <span>Charente-Maritime</span>
        </div>
      </div>
    </div>
  );
}
