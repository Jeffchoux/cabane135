"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      username: fd.get("username"),
      password: fd.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Identifiants invalides");
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--navy)]">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm glass-strong p-8 rounded-sm space-y-5"
      >
        <div className="flex flex-col items-center gap-3 mb-4">
          <Image
            src="/facade-cabane135.jpg"
            alt="Cabane 135"
            width={64}
            height={64}
            className="rounded-sm object-cover"
          />
          <h1 className="serif text-2xl text-[var(--pearl)]">Administration</h1>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="username">Identifiant</Label>
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            autoFocus
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-liquid w-full h-11 border border-[var(--gold)] text-[var(--gold)] text-[0.72rem] tracking-[0.3em] uppercase disabled:opacity-50"
        >
          {loading ? "Connexion…" : "Connexion"}
        </button>
      </form>
    </div>
  );
}
