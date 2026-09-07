export const siteConfig = {
  name: "Tech A-Nap",
  lineUrl: process.env.NEXT_PUBLIC_LINE_URL ?? "https://lin.ee/TTg1ine",
  // LINE Official Account ID (starts with "@"), used to deep-link into a chat
  // with a pre-filled message via LINE's oaMessage URL scheme.
  lineId: process.env.NEXT_PUBLIC_LINE_ID ?? "@techanap",
};

export function buildLineMessageUrl(message: string) {
  return `https://line.me/R/oaMessage/${siteConfig.lineId}/?${encodeURIComponent(message)}`;
}

export const navSections = [
  { id: "services", labelKey: "services" },
  { id: "work", labelKey: "work" },
  { id: "process", labelKey: "process" },
  { id: "faq", labelKey: "faq" },
  { id: "contact", labelKey: "contact" },
] as const;

export const serviceTypeValues = ["web", "mobile", "custom", "mvp"] as const;
export type ServiceTypeValue = (typeof serviceTypeValues)[number];
