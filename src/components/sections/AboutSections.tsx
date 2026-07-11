"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { photoUrl } from "@/lib/media";

const STORY_IMG = photoUrl("1600566752355-35792bedcfea");

const TEAM_IMAGES = [
  photoUrl("1507003211169-0a1dd7228f2d"),
  photoUrl("1494790108377-be9c29b29330"),
  photoUrl("1500648767791-00dcc994a43e"),
  photoUrl("1573496359142-b8d87734a5a2"),
];

const valueKeys = ["0", "1", "2", "3"] as const;
const memberKeys = ["0", "1", "2", "3"] as const;

export function AboutSections() {
  const t = useTranslations("about");

  return (
    <>
      {/* Story */}
      <section className="relative py-20 md:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-7 lg:pe-10">
            <Reveal className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-gold/60" />
              <span className="eyebrow">{t("story.eyebrow")}</span>
            </Reveal>
            <AnimatedText
              text={t("story.title")}
              as="h2"
              className="text-h2 mb-8 max-w-xl text-bone"
            />
            <div className="flex flex-col gap-6 text-lead text-bone-dim">
              <Reveal delay={0.05}>
                <p>{t("story.paragraph1")}</p>
              </Reveal>
              <Reveal delay={0.12}>
                <p>{t("story.paragraph2")}</p>
              </Reveal>
              <Reveal delay={0.18}>
                <p>{t("story.paragraph3")}</p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ParallaxImage
              src={STORY_IMG}
              alt="The atelier workshop"
              className="aspect-[4/5] w-full rounded-luxe-lg shadow-image"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative border-t border-line bg-ink-800 py-20 md:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow={t("values.eyebrow")}
            title={t("values.title")}
            className="mb-16"
          />
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            {valueKeys.map((key, i) => (
              <motion.div
                key={key}
                variants={fadeUp}
                className="card-luxe group p-8 md:p-9"
              >
                <span className="font-display text-4xl text-gold/40 transition-colors duration-500 group-hover:text-gold">
                  0{i + 1}
                </span>
                <h3 className="mt-8 text-h3 text-bone">
                  {t(`values.items.${key}.title`)}
                </h3>
                <p className="mt-4 text-sm text-bone-dim">
                  {t(`values.items.${key}.text`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-20 md:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow={t("team.eyebrow")}
            title={t("team.title")}
            className="mb-16"
          />
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {memberKeys.map((key, i) => (
              <motion.div key={key} variants={fadeUp} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-luxe-lg shadow-image">
                  <Image
                    src={TEAM_IMAGES[i]!}
                    alt={t(`team.members.${key}.name`)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                </div>
                <h3 className="mt-5 font-display text-2xl text-bone">
                  {t(`team.members.${key}.name`)}
                </h3>
                <p className="mt-1 text-sm text-gold-soft">
                  {t(`team.members.${key}.role`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
