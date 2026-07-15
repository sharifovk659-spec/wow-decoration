"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Ошибка входа");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Сеть недоступна");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-ink px-5 text-bone">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(192,160,104,0.22), transparent 60%), linear-gradient(180deg, #17181c 0%, #121316 100%)",
        }}
      />
      <form
        onSubmit={(e) => void onSubmit(e)}
        className="relative z-10 w-full max-w-md rounded-luxe-lg border border-line/80 bg-ink-800/80 p-8 shadow-luxe backdrop-blur-md md:p-10"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
          Private access
        </p>
        <h1 className="mt-3 font-display text-3xl text-bone md:text-4xl">
          Админ-панель
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-bone-dim">
          Управление фото, видео, обложками и галереей сайта.
        </p>
        <p className="mt-4 rounded-luxe border border-gold/25 bg-gold/10 px-3 py-2 text-xs leading-relaxed text-gold-soft">
          Пароль по умолчанию: <span className="font-medium text-gold">admin</span>
          <br />
          (или значение ADMIN_PASSWORD из .env)
        </p>
        <label className="mt-6 block text-xs uppercase tracking-[0.18em] text-bone-soft">
          Пароль
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="mt-2 w-full rounded-luxe border border-line bg-ink/60 px-4 py-3 text-sm tracking-normal text-bone outline-none transition focus:border-gold/60"
          />
        </label>
        {error ? (
          <p className="mt-3 text-sm text-red-300">{error}</p>
        ) : null}
        <button
          type="submit"
          disabled={busy || !password}
          className="mt-6 w-full rounded-luxe bg-gold px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] text-ink transition hover:bg-gold-soft disabled:opacity-50"
        >
          {busy ? "Вход…" : "Войти"}
        </button>
      </form>
    </div>
  );
}
