import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DEFAULT_MENU } from "@/app/api/menu/route";
import { MenuImageEditor } from "@/components/admin/MenuImageEditor";

export const dynamic = "force-dynamic";

async function getImages() {
  try {
    const rows = await db.menuImage.findMany({ orderBy: { slot: "asc" } });
    const map: Record<number, { url: string; updatedAt: string | null }> = {
      1: { url: DEFAULT_MENU[1], updatedAt: null },
      2: { url: DEFAULT_MENU[2], updatedAt: null },
    };
    for (const r of rows) {
      map[r.slot] = { url: r.url, updatedAt: r.updatedAt.toISOString() };
    }
    return [
      { slot: 1, ...map[1] },
      { slot: 2, ...map[2] },
    ];
  } catch (err) {
    console.error("[admin/carte] db.menuImage.findMany failed:", err);
    return [
      { slot: 1, url: DEFAULT_MENU[1], updatedAt: null },
      { slot: 2, url: DEFAULT_MENU[2], updatedAt: null },
    ];
  }
}

export default async function AdminCartePage() {
  const images = await getImages();

  async function refresh() {
    "use server";
    revalidatePath("/admin/carte");
    revalidatePath("/carte");
    revalidatePath("/api/menu");
  }

  return (
    <div className="px-5 md:px-10 py-8 md:py-12 space-y-10 max-w-5xl">
      <header>
        <p className="section-label">Admin</p>
        <h1 className="serif text-3xl md:text-4xl text-[var(--pearl)] mt-1">
          La carte
        </h1>
        <p className="text-sm text-white/60 mt-3 max-w-2xl leading-relaxed">
          Remplacez chaque page de la carte par une nouvelle photo. Formats
          acceptés : JPG, PNG, WebP. Taille max 50 Mo. Les modifications sont
          visibles immédiatement sur <span className="text-[var(--gold)]">cabane135.fr/carte</span>.
        </p>
      </header>

      <MenuImageEditor initial={images} onSaved={refresh} />
    </div>
  );
}
