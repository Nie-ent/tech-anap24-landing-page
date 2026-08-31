import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/sections/hero";
import { AudienceSelector } from "@/components/sections/audience-selector";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Work } from "@/components/sections/work";
import { Differentiators } from "@/components/sections/differentiators";
import { StackStrip } from "@/components/sections/stack-strip";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Hero />
      <AudienceSelector />
      <Services />
      <Process />
      <Work />
      <Differentiators />
      <StackStrip />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
