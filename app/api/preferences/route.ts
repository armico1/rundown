import { NextResponse } from "next/server";
import {
  sanitizeString,
  isValidEmail,
  isValidTopicsArray,
  ALLOWED_FREQUENCIES,
  ALLOWED_FORMATS,
  fetchWithTimeout,
  MAX_BODY_BYTES,
  toBoolean,
} from "../../lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    // ── Body size guard ────────────────────────────────────────
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    // ── Parse ──────────────────────────────────────────────────
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

    // ── Sanitize & validate ────────────────────────────────────
    const email = sanitizeString(body.email, 320).toLowerCase();
    const topics = body.topics;
    const frequency = sanitizeString(body.frequency, 50);
    const format = sanitizeString(body.format, 20);
    const customTopics = sanitizeString(body.customTopics, 500);
    const aiPersonalization = toBoolean(body.aiPersonalization);

    const errors: string[] = [];
    if (!email || !isValidEmail(email)) errors.push("Valid email is required");
    if (!isValidTopicsArray(topics)) errors.push("At least one valid topic is required");
    if (!ALLOWED_FREQUENCIES.has(frequency)) errors.push("Invalid frequency");
    if (!ALLOWED_FORMATS.has(format)) errors.push("Invalid format");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0] }, { status: 400 });
    }

    const validTopics = topics as string[];

    // ── Forward preferences update to Make.com ─────────────────
    const MAKE_PREFERENCES_WEBHOOK_URL = process.env.MAKE_PREFERENCES_WEBHOOK_URL;
    if (MAKE_PREFERENCES_WEBHOOK_URL) {
      try {
        await fetchWithTimeout(
          MAKE_PREFERENCES_WEBHOOK_URL,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              topics: validTopics,
              customTopics,
              frequency,
              format,
              aiPersonalization,
              updatedAt: new Date().toISOString(),
            }),
          },
          8_000
        );
      } catch (err) {
        console.error("Preferences webhook error:", err instanceof Error ? err.message : "unknown");
      }
    }

    // ── Update ConvertKit subscriber fields ────────────────────
    const KIT_API_KEY = process.env.KIT_API_KEY;
    if (KIT_API_KEY) {
      try {
        // ConvertKit v3: update subscriber by email via tag/field update
        await fetchWithTimeout(
          `https://api.convertkit.com/v3/subscribers`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
          5_000
        );
        // Full subscriber update (PATCH) would go here once you have subscriber ID lookup.
        // For now the Make.com webhook handles the CRM sync.
      } catch (err) {
        console.error("ConvertKit preferences error:", err instanceof Error ? err.message : "unknown");
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Preferences route error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
