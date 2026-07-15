"use client";

import Link from "next/link";
import { useAdminManifest } from "@/components/admin/useAdminManifest";
import { galleryItems } from "@/lib/gallery";
import { projects } from "@/lib/projects";
import { videoTestimonials } from "@/lib/videoTestimonials";
import { productionStepImage } from "@/lib/media";

export default function AdminDashboardPage() {
  const { manifest, loading } = useAdminManifest();

  const galleryCount = (manifest.gallery ?? galleryItems).length;
  const stepOverrides = Object.keys(manifest.productionSteps).length;
  const coverOverrides = Object.keys(manifest.projectCovers).length;
  const filmCount = (manifest.videoTestimonials ?? videoTestimonials).length;

  const cards = [
    {
      href: "/admin/production",
      title: "Производство",
      text: `${stepOverrides} / 8 шагов с заменой`,
      preview: productionStepImage(3),
    },
    {
      href: "/admin/gallery",
      title: "Галерея",
      text: `${galleryCount} фото на сайте`,
      preview: (manifest.gallery ?? galleryItems)[0]?.src,
    },
    {
      href: "/admin/covers",
      title: "Обложки",
      text: `${coverOverrides} заменённых · ${projects.length} проектов`,
      preview: projects[0]?.cover,
    },
    {
      href: "/admin/videos",
      title: "Видео",
      text: `${filmCount} client films · hero / process`,
      preview: "/images/hero/banner-01023.jpg",
    },
  ];

  return (
    <div>
      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
        Dashboard
      </p>
      <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">
        Медиа-студия сайта
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bone-dim">
        Загружайте новые фото и видео — они сразу появляются на живом сайте.
        Последнее сохранение:{" "}
        {loading
          ? "…"
          : manifest.updatedAt
            ? new Date(manifest.updatedAt).toLocaleString("ru-RU")
            : "ещё не было"}
      </p>
      <p className="mt-4 max-w-2xl rounded-luxe border border-line/80 bg-ink-800/50 px-4 py-3 text-xs leading-relaxed text-bone-dim">
        На Vercel для загрузки нужен{" "}
        <span className="text-gold">BLOB_READ_WRITE_TOKEN</span> (Storage →
        Blob) + <span className="text-gold">ADMIN_PASSWORD=admin123</span> в
        Environment Variables.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group relative overflow-hidden rounded-luxe-lg border border-line/80 bg-ink-800/60 transition hover:border-gold/40"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.preview || "/images/hero/banner-01023.jpg"}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-2xl text-bone">{card.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-bone-dim">
                  {card.text}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
