"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV: { href: string; label: string; exact?: boolean }[] = [
  { href: "/admin", label: "Обзор", exact: true },
  { href: "/admin/production", label: "Производство" },
  { href: "/admin/gallery", label: "Галерея" },
  { href: "/admin/covers", label: "Обложки" },
  { href: "/admin/videos", label: "Видео" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="relative min-h-screen bg-ink text-bone">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 10% -10%, rgba(192,160,104,0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(192,160,104,0.08), transparent 50%)",
        }}
      />
      <header className="relative z-10 border-b border-line/80 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
              CMS
            </p>
            <h1 className="font-display text-xl text-bone md:text-2xl">
              World of Wood Decoration
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/ru"
              className="hidden text-xs uppercase tracking-[0.18em] text-bone-dim transition hover:text-gold sm:inline"
            >
              На сайт
            </Link>
            <button
              type="button"
              onClick={() => void logout()}
              className="rounded-luxe border border-line px-3 py-2 text-xs uppercase tracking-[0.18em] text-bone-soft transition hover:border-gold/50 hover:text-gold"
            >
              Выйти
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5 pb-3 md:px-8">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-luxe px-3 py-2 text-xs uppercase tracking-[0.16em] transition",
                  active
                    ? "bg-gold/15 text-gold"
                    : "text-bone-dim hover:bg-ink-700 hover:text-bone",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="relative z-10 mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
        {children}
      </main>
    </div>
  );
}
