"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const timeline = [
  {
    year: "Avant",
    place: "Lauzières",
    text: "Charente-Maritime, terre d'origine. La marée, les parcs, les premiers métiers.",
  },
  {
    year: "2012",
    place: "La Réunion",
    text: "Nicolas & Nadège créent Huîtres Lebon, bar à huîtres à Saint-Denis.",
  },
  {
    year: "1ᵉʳ mai 2026",
    place: "Nieul-sur-Mer",
    text: "Ouverture de la Cabane 135 — retour aux sources, près de Lauzières.",
  },
];

const stops = [
  {
    src: "/reunion-plage.jpg",
    alt: "La Réunion — plage et lagon",
    caption: "La Réunion",
    aside: "Océan Indien",
    aspect: "aspect-[4/5]",
    offset: "md:translate-x-0",
  },
  {
    src: "/ostreiculteur-parcs-huitres.jpg",
    alt: "Parcs à huîtres en Charente-Maritime",
    caption: "Lauzières",
    aside: "Charente-Maritime",
    aspect: "aspect-[5/4]",
    offset: "md:-translate-x-6 lg:-translate-x-12",
  },
  {
    src: "/terrasse-vue-marais.jpg",
    alt: "Vue sur les marais depuis la Cabane 135",
    caption: "Cabane 135",
    aside: "Nieul-sur-Mer",
    aspect: "aspect-[16/10]",
    offset: "md:translate-x-4 lg:translate-x-10",
  },
];

export function HistorySection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setVisible(true), obs.disconnect()),
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="histoire"
      ref={ref}
      className="relative px-6 py-28 md:py-40 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <div
            className={`md:col-span-5 ${visible ? "animate-slide-left" : ""}`}
          >
            <p className="section-label">L'histoire</p>
            <h2
              className="serif mt-5 font-light text-[var(--pearl)] leading-[1.02]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
            >
              Nicolas &amp; Nadège
              <span className="block text-[var(--pearl)]">Lebon</span>
            </h2>
            <p
              className="serif italic text-[var(--gold)] mt-5 leading-snug max-w-md"
              style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)" }}
            >
              Ostréiculteurs entre deux rivages.
            </p>

            <div className="mt-10 space-y-5 text-white/70 leading-relaxed max-w-[60ch]">
              <p>
                Originaires de Lauzières, sur la côte charentaise. En 2012, ils
                traversent les océans pour s'installer à La&nbsp;Réunion et y
                créer <em className="not-italic text-[var(--pearl)]">Huîtres&nbsp;Lebon</em>,
                un bar à huîtres ouvert à Saint-Denis.
              </p>
              <p>
                Le 1ᵉʳ mai 2026, ils inaugurent{" "}
                <em className="not-italic text-[var(--pearl)]">Cabane&nbsp;135</em> à
                Nieul-sur-Mer, à quelques minutes de Lauzières. Une cabane de
                dégustation au bord des marais — là où tout avait commencé.
              </p>
              <p>
                Aujourd'hui, ils naviguent entre les deux rivages, au rythme
                des saisons.
              </p>
            </div>

            <ol className="mt-12 space-y-7 border-l border-[var(--gold)]/25 pl-6">
              {timeline.map((t) => (
                <li key={t.year} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[31px] top-[7px] h-2 w-2 rounded-full bg-[var(--gold)]"
                  />
                  <p className="text-[0.62rem] tracking-[0.32em] uppercase text-[var(--gold)]">
                    {t.year} <span className="text-[var(--gold)]/40">·</span>{" "}
                    {t.place}
                  </p>
                  <p className="text-sm text-white/60 mt-1.5 leading-relaxed max-w-md">
                    {t.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="md:col-span-7">
            <div className="flex flex-col gap-8 md:gap-12">
              {stops.map((s, i) => (
                <figure
                  key={s.src}
                  className={`${s.offset} ${
                    visible ? "animate-slide-right" : ""
                  } transition-transform`}
                  style={{ animationDelay: `${0.12 + i * 0.12}s` }}
                >
                  <div
                    className={`relative ${s.aspect} w-full overflow-hidden border border-[var(--gold)]/15`}
                  >
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(min-width: 768px) 56vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-baseline gap-4 text-[0.62rem] tracking-[0.32em] uppercase">
                    <span className="text-[var(--gold)]">{s.caption}</span>
                    <span className="flex-1 h-px bg-[var(--gold)]/15" />
                    <span className="text-white/40">{s.aside}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-28 flex items-center gap-6 text-[0.62rem] tracking-[0.4em] uppercase text-white/35">
          <span>Atlantique</span>
          <span className="flex-1 h-px bg-white/12" />
          <span>Océan Indien</span>
          <span className="flex-1 h-px bg-white/12" />
          <span>Atlantique</span>
        </div>
      </div>
    </section>
  );
}
