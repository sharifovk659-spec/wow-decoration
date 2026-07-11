import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Process } from "@/components/sections/Process";
import { WoodMaterials } from "@/components/sections/WoodMaterials";
import { ProductionProcess } from "@/components/sections/ProductionProcess";
import { About } from "@/components/sections/About";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { VideoTestimonials } from "@/components/sections/VideoTestimonials";
import { Testimonials } from "@/components/sections/Testimonials";
import { WorldMap } from "@/components/sections/WorldMap";
import { CallToAction } from "@/components/sections/CallToAction";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Philosophy />
      <MarqueeBand />
      <ServiceCards />
      <FeaturedProjects />
      <Process />
      <WoodMaterials />
      <ProductionProcess />
      <About />
      <VideoTestimonials />
      <Testimonials />
      <WhyChooseUs />
      <WorldMap />
      <CallToAction />
    </>
  );
}
