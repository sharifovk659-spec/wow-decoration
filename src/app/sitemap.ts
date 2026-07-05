import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { locales, defaultLocale, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { projects } from "@/lib/projects";

const staticPaths = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/gallery",
  "/contact",
] as const;

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
): MetadataRoute.Sitemap[number] {
  const url = `${siteConfig.url}${getPathname({ href: path, locale: defaultLocale })}`;
  const languages = Object.fromEntries(
    locales.map((l) => [
      l,
      `${siteConfig.url}${getPathname({ href: path, locale: l })}`,
    ]),
  ) as Record<Locale, string>;

  return {
    url,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPaths.map((path) =>
    entry(path, path === "/" ? 1 : 0.8, path === "/" ? "monthly" : "yearly"),
  );

  const projectEntries = projects.map((project) =>
    entry(`/projects/${project.slug}`, 0.6, "yearly"),
  );

  return [...staticEntries, ...projectEntries, entry("/privacy", 0.3, "yearly")];
}
