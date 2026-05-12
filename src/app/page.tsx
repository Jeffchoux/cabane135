import { db } from "@/lib/db";
import { SiteShell } from "@/components/public/SiteShell";
import { HistorySection } from "@/components/public/HistorySection";
import { BentoSection } from "@/components/public/BentoSection";
import { MomentsFeed } from "@/components/public/MomentsFeed";
import { SocialSection } from "@/components/public/SocialSection";
import { MapSection } from "@/components/public/MapSection";
import { Footer } from "@/components/public/Footer";

export const revalidate = 60;

async function getPosts() {
  try {
    const posts = await db.post.findMany({
      where: { published: true },
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
      take: 24,
    });
    return posts.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error("[home] db.post.findMany failed:", err);
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();
  return (
    <SiteShell>
      <main>
        <HistorySection />
        <BentoSection />
        <MomentsFeed posts={posts} />
        <SocialSection />
        <MapSection />
      </main>
      <Footer />
    </SiteShell>
  );
}
