import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";

type Step = { title: string; description: string };

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];

  return (
    <section id="process" className="scroll-mt-14 border-b border-border bg-muted/40">
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

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-lg border border-border bg-card p-5">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-sm font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-[13px] text-muted-foreground">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
