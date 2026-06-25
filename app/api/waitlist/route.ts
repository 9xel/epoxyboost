import { NextResponse } from "next/server";

const WAITLIST_FORM_URL = process.env.WAITLIST_FORM_URL;

type WaitlistPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  city?: string;
  services?: string[];
  services_other?: string;
  contact_consent?: boolean;
  consent_at?: string;
  consent_text_version?: string;
  consent_text?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  if (!WAITLIST_FORM_URL) {
    return NextResponse.json(
      { ok: false, message: "Waitlist form is not configured." },
      { status: 500 },
    );
  }

  let body: WaitlistPayload;
  try {
    body = (await request.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  if (body.contact_consent !== true) {
    return NextResponse.json(
      { ok: false, message: "Contact consent is required." },
      { status: 400 },
    );
  }

  if (
    !isNonEmptyString(body.name) ||
    !isNonEmptyString(body.email) ||
    !isNonEmptyString(body.phone) ||
    !isNonEmptyString(body.company) ||
    !isNonEmptyString(body.city) ||
    !isNonEmptyString(body.consent_at) ||
    !isNonEmptyString(body.consent_text_version) ||
    !isNonEmptyString(body.consent_text)
  ) {
    return NextResponse.json({ ok: false, message: "Missing required fields." }, { status: 400 });
  }

  const userAgent = request.headers.get("user-agent") ?? "";

  try {
    const response = await fetch(WAITLIST_FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        user_agent: userAgent,
      }),
    });

    const result = (await response.json()) as { ok?: boolean; message?: string };

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, message: result.message || "Failed to save waitlist signup." },
        { status: 400 },
      );
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { ok: false, message: "Failed to submit. Please try again." },
      { status: 502 },
    );
  }
}
