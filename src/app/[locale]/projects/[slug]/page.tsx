import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import {
  projects,
  getProjectBySlug,
  getAdjacentProject,
} from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";
import { ProjectDetail } from "@/components/sections/ProjectDetail";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    locale,
    title: `${project.title[locale]} — World of Wood Decoration`,
    description: project.summary[locale],
    path: `/projects/${slug}`,
    image: project.cover,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  const next = getAdjacentProject(slug);
  if (!project || !next) notFound();

  // Ensure translations are loaded for this locale.
  await getTranslations({ locale, namespace: "projects" });

  return <ProjectDetail project={project} next={next} />;
}
