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
  const tServices = useTranslations("services");
  const services = tServices.raw("items") as { title: string }[];

  return (
    <section className="relative overflow-hidden px-3 pb-3 pt-3 sm:px-5">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-[-8%] h-[620px] w-[620px] rounded-full opacity-45 blur-[1px]"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #a7c7e7, #5e8b7e 62%, transparent 63%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-100px] left-[7%] h-[280px] w-[280px] rounded-full opacity-50 blur-[70px]"
        style={{
          background: "radial-gradient(closest-side, var(--accent), transparent)",
        }}
      />

      <div className="relative mx-auto grid min-h-[650px] max-w-6xl items-center gap-14 rounded-[2rem] border border-white/70 bg-white/45 px-5 py-20 shadow-[0_24px_80px_rgba(47,62,70,0.10)] backdrop-blur-sm sm:px-10 md:grid-cols-[1.08fr_.92fr] md:px-14">
        <div>
          <Reveal>
            <span className="inline-flex rounded-full bg-white/70 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-primary shadow-sm">
              {t("eyebrow")}
            </span>
          </Reveal>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.06] tracking-[-0.04em] sm:text-5xl md:text-6xl">
            <TextReveal text={t("headline")} />
          </h1>

          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
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

          <Reveal delay={0.45} className="mt-10 border-t border-primary/15 pt-6">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {t("proofLabel")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative mx-auto hidden h-[460px] w-full max-w-[410px] md:block">
          <div className="absolute left-0 top-10 w-[72%] rounded-[2rem] border border-white/60 bg-primary/90 p-6 text-white shadow-[0_28px_60px_rgba(47,62,70,0.22)] backdrop-blur-xl">
            <div className="mb-16 h-2 w-20 rounded-full bg-white/30" />
            {services.slice(0, 3).map((service, i) => (
              <div key={service.title} className="mb-3 flex items-center gap-3 rounded-2xl bg-white/12 p-3.5">
                <span className="flex size-8 items-center justify-center rounded-full bg-white/15 text-xs">0{i + 1}</span>
                <span className="text-sm font-medium">{service.title}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-5 right-0 w-[58%] rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-[0_28px_60px_rgba(47,62,70,0.16)] backdrop-blur-xl">
            <div className="mx-auto flex aspect-square w-28 items-center justify-center rounded-full border-[12px] border-secondary bg-[radial-gradient(circle,#fff_35%,#a7c7e7_100%)] text-center text-xs font-semibold text-primary">
              Tech<br />A-Nap
            </div>
            <div className="mt-5 space-y-2">
              <div className="h-2 rounded-full bg-secondary" />
              <div className="h-2 w-3/4 rounded-full bg-accent/70" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
