import { useTranslations } from "next-intl";
import { CheckIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

type Item = { title: string; description: string };

export function Differentiators() {
  const t = useTranslations("differentiators");
  const items = t.raw("items") as Item[];

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
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="flex gap-3">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
