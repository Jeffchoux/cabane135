import { db } from "@/lib/db";
import { PostPublisher } from "@/components/admin/PostPublisher";
import { PostList } from "@/components/admin/PostList";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const [total, pinned, hidden] = await Promise.all([
      db.post.count(),
      db.post.count({ where: { pinned: true } }),
      db.post.count({ where: { published: false } }),
    ]);
    return { total, pinned, hidden };
  } catch {
    return { total: 0, pinned: 0, hidden: 0 };
  }
}

async function getPosts() {
  try {
    const posts = await db.post.findMany({
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
      take: 60,
    });
    return posts.map((p) => ({ ...p, createdAt: p.createdAt.toISOString() }));
  } catch {
    return [];
  }
}

export default async function AdminPostsPage() {
  const [stats, posts] = await Promise.all([getStats(), getPosts()]);
  async function refresh() {
    "use server";
    revalidatePath("/admin");
    revalidatePath("/");
  }
  return (
    <div className="px-5 md:px-10 py-8 md:py-12 space-y-8 max-w-5xl">
      <header className="flex items-center justify-between">
        <div>
          <p className="section-label">Admin</p>
          <h1 className="serif text-3xl md:text-4xl text-[var(--pearl)] mt-1">Posts</h1>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="glass p-4">
          <p className="serif text-2xl text-[var(--gold)]">{stats.total}</p>
          <p className="text-[0.6rem] tracking-[0.3em] uppercase text-white/40 mt-1">Total</p>
        </div>
        <div className="glass p-4">
          <p className="serif text-2xl text-[var(--gold)]">{stats.pinned}</p>
          <p className="text-[0.6rem] tracking-[0.3em] uppercase text-white/40 mt-1">Épinglés</p>
        </div>
        <div className="glass p-4">
          <p className="serif text-2xl text-[var(--gold)]">{stats.hidden}</p>
          <p className="text-[0.6rem] tracking-[0.3em] uppercase text-white/40 mt-1">Dépubliés</p>
        </div>
      </div>

      <PostPublisher onPublished={refresh} />
      <PostList initial={posts} />
    </div>
  );
}
