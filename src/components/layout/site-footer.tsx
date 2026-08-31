import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { navSections, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-baseline gap-1 text-[15px] font-semibold tracking-tight">
            {siteConfig.name}
            <span className="text-accent">.</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            {t("tagline")}
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {t("navHeading")}
          </p>
          <nav className="mt-3 flex flex-col gap-2">
            {navSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {tNav(s.labelKey)}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {t("contactHeading")}
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              LINE
            </a>
            <a href="#contact" className="hover:text-foreground">
              {tNav("ctaBrief")}
            </a>
          </div>
          <div className="mt-5">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {t("language")}
            </p>
            <LocaleSwitcher />
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 text-center font-mono text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} {siteConfig.name}. {t("copyright")}
      </div>
    </footer>
  );
}
