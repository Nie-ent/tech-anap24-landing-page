import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";

const stack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "PostgreSQL",
  "Vercel",
];

export function StackStrip() {
  const t = useTranslations("stack");

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Reveal className="flex flex-col items-center gap-6">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {t("eyebrow")}
          </p>
        </Reveal>

        <Marquee className="mt-2">
          {stack.map((name) => (
            <span
              key={name}
              className="font-mono text-lg text-foreground/60 transition-colors hover:text-foreground"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
