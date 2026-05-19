import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { DEFAULT_MENU } from "@/app/api/menu/route";
import { Footer } from "@/components/public/Footer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "La carte — Huîtres, plateaux, tapas",
  description:
    "La carte de la Cabane 135 : huîtres au détail, plateaux à partager, tapas de la mer, vins et desserts. Mise à jour selon l'arrivage du jour.",
  alternates: { canonical: "/carte" },
  openGraph: {
    title: "La carte — Cabane 135",
    description:
      "Huîtres au détail, plateaux à partager, tapas de la mer. Mise à jour selon l'arrivage.",
    url: "/carte",
  },
};

async function getMenuImages() {
  try {
    const rows = await db.menuImage.findMany({ orderBy: { slot: "asc" } });
    const map: Record<number, string> = { ...DEFAULT_MENU };
    for (const r of rows) map[r.slot] = r.url;
    return [
      { slot: 1, url: map[1] },
      { slot: 2, url: map[2] },
    ];
  } catch (err) {
    console.error("[carte] db.menuImage.findMany failed:", err);
    return [
      { slot: 1, url: DEFAULT_MENU[1] },
      { slot: 2, url: DEFAULT_MENU[2] },
    ];
  }
}

export default async function CartePage() {
  const images = await getMenuImages();

  return (
    <div className="min-h-screen bg-[var(--navy)] text-[var(--pearl)]">
      <header className="border-b border-[var(--gold)]/15">
        <div className="mx-auto max-w-6xl px-6 py-6 md:px-10 md:py-8 flex items-center justify-between">
          <Link
            href="/"
            className="serif tracking-[0.12em] text-base md:text-lg inline-flex items-baseline gap-3"
            aria-label="Retour à l'accueil Cabane 135"
          >
            <span className="text-[0.62rem] tracking-[0.32em] uppercase text-[var(--gold)]/70 font-sans">
              ←
            </span>
            <span>
              Cabane <span className="text-[var(--turquoise)]">135</span>
            </span>
          </Link>
          <span className="serif italic text-[var(--gold)]/75 text-[0.78rem] hidden md:inline">
            La carte
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <p className="text-[0.66rem] tracking-[0.32em] uppercase text-[var(--gold)]/75 mb-5">
          Carte du jour
        </p>
        <h1 className="serif text-4xl md:text-6xl leading-[1.05] mb-6 md:mb-8 max-w-3xl">
          Ce qui sort de l&apos;eau,
          <br />
          <em className="text-[var(--gold)]">au plus juste</em>.
        </h1>
        <p className="max-w-2xl text-white/70 text-base md:text-lg leading-relaxed mb-16 md:mb-24">
          Les huîtres viennent de nos parcs à Lauzières, les accompagnements
          changent au fil de l&apos;arrivage. La carte est mise à jour
          régulièrement par l&apos;équipe de la Cabane.
        </p>

        <div className="grid gap-12 md:gap-16">
          {images.map((img, i) => (
            <figure
              key={img.slot}
              className="relative overflow-hidden border border-[var(--gold)]/15 bg-[var(--ocean)]/30"
            >
              <Image
                src={img.url}
                alt={`Carte Cabane 135 — page ${img.slot}`}
                width={1600}
                height={2200}
                className="w-full h-auto block"
                sizes="(min-width: 1024px) 1024px, 100vw"
                priority={i === 0}
                unoptimized={img.url.startsWith("/")}
              />
            </figure>
          ))}
        </div>

        <div className="mt-20 md:mt-28 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t border-[var(--gold)]/15 pt-10">
          <p className="serif italic text-[var(--pearl)]/80 text-lg max-w-md leading-relaxed">
            Une question sur la carte&nbsp;? Appelez-nous, on prend le temps de
            vous répondre.
          </p>
          <a
            href="tel:+33546413682"
            className="inline-flex items-center gap-3 text-[var(--gold)] tracking-[0.32em] text-[0.72rem] uppercase border-b border-[var(--gold)]/40 pb-1.5 hover:border-[var(--gold)] transition-colors"
          >
            <span aria-hidden className="h-px w-7 bg-[var(--gold)]" />
            <span>05 46 41 36 82</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
