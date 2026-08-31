"use client";

import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { useSpotlight, spotlightClassName } from "@/components/motion/spotlight-card";
import { cn } from "@/lib/utils";

type Card = { tag: string; title: string; description: string; href: string };

function AudienceCard({ card }: { card: Card }) {
  const { ref, onMouseMove } = useSpotlight<HTMLAnchorElement>();

  return (
    <a
      ref={ref}
      onMouseMove={onMouseMove}
      href={card.href}
      className={cn(
        "group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40",
        spotlightClassName,
      )}
    >
      <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
        {card.tag}
      </span>
      <h3 className="mt-2.5 text-base font-semibold">{card.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{card.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

export function AudienceSelector() {
  const t = useTranslations("audience");
  const cards = t.raw("cards") as Card[];

  return (
    <section className="border-b border-border bg-muted/40">
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

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <AudienceCard card={card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
