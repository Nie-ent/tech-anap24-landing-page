import { useTranslations } from "next-intl";
import { QuoteIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="border-b border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            {t("heading")}
          </h2>
          <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 rounded-lg border border-dashed border-border p-8 text-muted-foreground">
            <QuoteIcon className="size-5" />
            <p className="text-sm">{t("placeholderNote")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
