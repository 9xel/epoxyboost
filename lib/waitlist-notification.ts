import { Resend } from "resend";

const WAITLIST_SERVICE_LABELS: Record<string, string> = {
  "website-seo": "Website + SEO",
  branding: "Branding / Company Image",
  "growth-strategy": "Growth Strategy",
  "courses-training": "Future Courses / Training",
  "start-company": "I want to start my own epoxy company.",
  other: "Other",
};

export type WaitlistNotificationPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  services?: string[];
  services_other?: string;
  consent_at: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatServiceSummary(services: string[] | undefined, servicesOther: string | undefined): string {
  const list = Array.isArray(services) ? services : [];
  const labels = list
    .filter((value) => value !== "other")
    .map((value) => WAITLIST_SERVICE_LABELS[value] || value);

  if (list.includes("other") && servicesOther) {
    labels.push(`Other: ${servicesOther}`);
  }

  return labels.join(", ");
}

function parseNotifyEmails(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

export function isWaitlistEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.WAITLIST_FROM_EMAIL &&
      parseNotifyEmails(process.env.WAITLIST_NOTIFY_EMAIL).length > 0,
  );
}

function buildWaitlistNotificationContent(payload: WaitlistNotificationPayload) {
  const serviceSummary = formatServiceSummary(payload.services, payload.services_other);
  const subject = `New EpoxyBoost Waitlist Signup: ${payload.name || "Unknown"}`;

  const lines = [
    ["Name", payload.name],
    ["Phone", payload.phone],
    ["Email", payload.email],
    ["Company", payload.company],
    ["Main Service Area", payload.city],
    ["Services", serviceSummary],
    ...(payload.services_other ? [["Services Other", payload.services_other] as const] : []),
    ["Consent At", payload.consent_at],
  ];

  const text = [
    "New waitlist submission",
    "",
    ...lines.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const html =
    "<h2>New waitlist submission</h2>" +
    lines
      .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`)
      .join("");

  return { subject, text, html };
}

export async function sendWaitlistNotificationEmail(
  payload: WaitlistNotificationPayload,
): Promise<void> {
  if (!isWaitlistEmailConfigured()) {
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = parseNotifyEmails(process.env.WAITLIST_NOTIFY_EMAIL);
  const { subject, text, html } = buildWaitlistNotificationContent(payload);

  const { error } = await resend.emails.send({
    from: process.env.WAITLIST_FROM_EMAIL!,
    to,
    replyTo: payload.email,
    subject,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }
}
