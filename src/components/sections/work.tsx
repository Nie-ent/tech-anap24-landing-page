import { useTranslations } from "next-intl";
import { ImageIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function Work() {
  const t = useTranslations("work");

  return (
    <section id="work" className="scroll-mt-14 border-b border-border">
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

        <Reveal delay={0.1} className="mt-10 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 text-muted-foreground"
            >
              <ImageIcon className="size-6" />
              <span className="font-mono text-[11px] uppercase tracking-wider">
                {t("placeholderNote")}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
