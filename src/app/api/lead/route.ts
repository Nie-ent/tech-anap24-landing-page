import { NextResponse } from "next/server";
import { z } from "zod";
import { serviceTypeValues } from "@/lib/site-config";

const leadSchema = z.object({
  service: z.enum(serviceTypeValues),
  budget: z.string().min(1).max(200),
  timeline: z.string().min(1).max(200),
});

/**
 * Fired best-effort when a visitor finishes the wizard and heads to LINE.
 * There's no name/contact to capture here by design — LINE identifies the
 * visitor once they message the OA, so this is just an early heads-up for
 * the sales team, not a lead record on its own.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const lead = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;

  if (apiKey && to) {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.LEAD_FROM_EMAIL ?? "TechPana <onboarding@resend.dev>",
      to,
      subject: `Someone is heading to LINE (${lead.service})`,
      text: [
        "A visitor completed the brief wizard and is on their way to LINE.",
        "",
        `Service: ${lead.service}`,
        `Budget: ${lead.budget}`,
        `Timeline: ${lead.timeline}`,
      ].join("\n"),
    });

    if (error) {
      console.error("Failed to send lead notification email", error);
      return NextResponse.json({ error: "email_failed" }, { status: 502 });
    }
  } else {
    console.warn(
      "RESEND_API_KEY / LEAD_NOTIFICATION_EMAIL not configured — logging lead instead of emailing.",
      lead,
    );
  }

  return NextResponse.json({ ok: true });
}
