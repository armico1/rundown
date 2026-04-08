import { NextResponse } from "next/server";
import {
  sanitizeString,
  isValidEmail,
  isValidTopicsArray,
  ALLOWED_FREQUENCIES,
  ALLOWED_FORMATS,
  fetchWithTimeout,
  MAX_BODY_BYTES,
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

    // ── Sanitize strings ───────────────────────────────────────
    const name = sanitizeString(body.name, 100);
    const email = sanitizeString(body.email, 320).toLowerCase();
    const customTopics = sanitizeString(body.customTopics, 500);
    const frequency = sanitizeString(body.frequency, 50);
    const format = sanitizeString(body.format, 20);
    const topics = body.topics;

    // ── Validate ───────────────────────────────────────────────
    const errors: string[] = [];

    if (!name) errors.push("Name is required");
    if (!email || !isValidEmail(email)) errors.push("Valid email is required");
    if (!isValidTopicsArray(topics)) errors.push("At least one valid topic is required");
    if (!ALLOWED_FREQUENCIES.has(frequency)) errors.push("Invalid frequency");
    if (!ALLOWED_FORMATS.has(format)) errors.push("Invalid format");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0] }, { status: 400 });
    }

    // Type-narrowed after validation
    const validTopics = topics as string[];

    // ── Forward to Make.com ────────────────────────────────────
    const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;
    if (MAKE_WEBHOOK_URL) {
      try {
        await fetchWithTimeout(
          MAKE_WEBHOOK_URL,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              topics: validTopics,
              customTopics,
              frequency,
              format,
              subscribedAt: new Date().toISOString(),
            }),
          },
          8_000
        );
      } catch (err) {
        // Log but don't block the user — webhook is non-critical path
        console.error("Make.com webhook error:", err instanceof Error ? err.message : "unknown");
      }
    }

    // ── Forward to ConvertKit ──────────────────────────────────
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
                topics: validTopics.join(","),
                frequency,
                format,
                ...(customTopics ? { custom_topics: customTopics } : {}),
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
