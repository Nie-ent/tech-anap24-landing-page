"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MenuIcon, MessageCircleIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { navSections, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border border-white/70 bg-white/75 px-4 shadow-[0_12px_40px_rgba(47,62,70,0.08)] backdrop-blur-xl sm:px-5">
        <Link href="/" className="flex items-center">
          <Image
            src="/light_logo.png"
            alt={siteConfig.name}
            width={1535}
            height={903}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full px-3 py-1.5 text-[13.5px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {t(s.labelKey)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher />
          <a
            href={siteConfig.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
          >
            <MessageCircleIcon className="size-3.5" />
            {t("ctaLine")}
          </a>
          <a href="#contact" className={buttonVariants({ size: "sm" })}>
            {t("ctaBrief")}
          </a>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Menu"
          >
            <MenuIcon />
          </Button>
          <SheetContent side="right" className="w-[85vw] p-0">
            <SheetHeader className="border-b border-border">
              <SheetTitle>{siteConfig.name}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 p-4">
              {navSections.map((s) => (
                <SheetClose key={s.id} nativeButton={false} render={<a href={`#${s.id}`} />}>
                  <span className="block rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-muted">
                    {t(s.labelKey)}
                  </span>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 border-t border-border p-4">
              <div className="flex items-center">
                <LocaleSwitcher />
              </div>
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline" })}
              >
                {t("ctaLine")}
              </a>
              <SheetClose nativeButton={false} render={<a href="#contact" />}>
                <span className={cn(buttonVariants(), "w-full")}>{t("ctaBrief")}</span>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
