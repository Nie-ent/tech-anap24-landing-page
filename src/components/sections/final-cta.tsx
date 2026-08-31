import { useTranslations } from "next-intl";
import { MessageCircleIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BriefWizard } from "@/components/sections/brief-wizard";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

export function FinalCta() {
  const t = useTranslations("finalCta");
  const tWizard = useTranslations("wizard");

  return (
    <section id="contact" className="scroll-mt-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h2 className="max-w-md text-2xl font-bold tracking-tight sm:text-3xl">
            {t("heading")}
          </h2>
          <p className="mt-3 max-w-sm text-muted-foreground">{t("subheading")}</p>

          <Magnetic strength={0.25}>
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "mt-6 gap-2")}
            >
              <MessageCircleIcon className="size-4" />
              {t("ctaSecondary")}
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.1} className="rounded-lg border border-border bg-card p-6 sm:p-8">
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
            {tWizard("eyebrow")}
          </span>
          <h3 className="mt-1.5 text-base font-semibold">{tWizard("heading")}</h3>
          <div className="mt-5">
            <BriefWizard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
