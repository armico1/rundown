import { NextResponse } from "next/server";
import {
  sanitizeString,
  sanitizeNiche,
  isValidEmail,
  isValidNichesArray,
  ALLOWED_FREQUENCIES,
  ALLOWED_FORMATS,
  fetchWithTimeout,
  MAX_BODY_BYTES,
  toBoolean,
} from "../../lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    if (typeof raw !== "object" || raw === null) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const body = raw as Record<string, unknown>;

    const name      = sanitizeString(body.name, 100);
    const email     = sanitizeString(body.email, 320).toLowerCase();
    const frequency = sanitizeString(body.frequency, 50);
    const format    = sanitizeString(body.format, 20);
    const niches    = body.niches;
    const aiPersonalization = toBoolean(body.aiPersonalization);

    const errors: string[] = [];
    if (!name)                           errors.push("Name is required");
    if (!email || !isValidEmail(email))  errors.push("Valid email is required");
    if (!isValidNichesArray(niches))     errors.push("At least one niche is required");
    if (!ALLOWED_FREQUENCIES.has(frequency)) errors.push("Invalid frequency");
    if (!ALLOWED_FORMATS.has(format))    errors.push("Invalid format");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0] }, { status: 400 });
    }

    const validNiches = (niches as string[]).map(sanitizeNiche);

    const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;
    if (MAKE_WEBHOOK_URL) {
      try {
        await fetchWithTimeout(
          MAKE_WEBHOOK_URL,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name, email, niches: validNiches,
              frequency, format, aiPersonalization,
              subscribedAt: new Date().toISOString(),
            }),
          },
          8_000
        );
      } catch (err) {
        console.error("Make.com webhook error:", err instanceof Error ? err.message : "unknown");
      }
    }

    const KIT_API_KEY = process.env.KIT_API_KEY;
    const KIT_FORM_ID = process.env.KIT_FORM_ID;
    if (KIT_API_KEY && KIT_FORM_ID) {
      try {
        await fetchWithTimeout(
          `https://api.convertkit.com/v3/forms/${encodeURIComponent(KIT_FORM_ID)}/subscribe`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              api_key: KIT_API_KEY,
              email,
              first_name: name.split(" ")[0],
              fields: {
                niches: validNiches.join(", "),
                frequency,
                format,
                ai_personalization: String(aiPersonalization),
              },
            }),
          },
          8_000
        );
      } catch (err) {
        console.error("ConvertKit error:", err instanceof Error ? err.message : "unknown");
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe route error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
