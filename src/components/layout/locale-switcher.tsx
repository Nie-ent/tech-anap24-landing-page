"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex overflow-hidden rounded-full border border-border font-mono text-xs">
      {(["th", "en"] as const).map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          aria-current={locale === l ? "true" : undefined}
          className={cn(
            "px-2.5 py-1 uppercase transition-colors",
            locale === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
