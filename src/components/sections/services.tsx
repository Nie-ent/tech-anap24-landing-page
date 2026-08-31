"use client";

import { useTranslations } from "next-intl";
import { Globe2Icon, SmartphoneIcon, DatabaseIcon, RocketIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { useSpotlight, spotlightClassName } from "@/components/motion/spotlight-card";
import { cn } from "@/lib/utils";

type Item = { title: string; description: string };

const icons = [Globe2Icon, SmartphoneIcon, DatabaseIcon, RocketIcon];

function ServiceCard({ item, Icon }: { item: Item; Icon: (typeof icons)[number] }) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        "flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40",
        spotlightClassName,
      )}
    >
      <Icon className="size-5 text-accent" />
      <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
    </div>
  );
}

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as Item[];

  return (
    <section id="services" className="scroll-mt-14 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">
            {t("heading")}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t("subheading")}</p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <ServiceCard item={item} Icon={icons[i] ?? Globe2Icon} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
