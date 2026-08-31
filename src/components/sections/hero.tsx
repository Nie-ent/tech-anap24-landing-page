import { useTranslations } from "next-intl";
import { MessageCircleIcon, ArrowRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { Magnetic } from "@/components/motion/magnetic";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[110px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 right-[8%] h-[280px] w-[280px] rounded-full opacity-[0.14] blur-[90px]"
        style={{
          background: "radial-gradient(closest-side, var(--accent), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            {t("eyebrow")}
          </span>
        </Reveal>

        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
          <TextReveal text={t("headline")} />
        </h1>

        <Reveal delay={0.25}>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            {t("subhead")}
          </p>
        </Reveal>

        <Reveal delay={0.35} className="mt-8 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a href="#contact" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
              {t("ctaPrimary")}
              <ArrowRightIcon className="size-4" />
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
            >
              <MessageCircleIcon className="size-4" />
              {t("ctaSecondary")}
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.45} className="mt-10 border-t border-border pt-6">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {t("proofLabel")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
