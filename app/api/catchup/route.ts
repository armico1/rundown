import { NextResponse } from "next/server";
import {
  sanitizeString,
  sanitizeNiche,
  isValidEmail,
  isValidNichesArray,
  ALLOWED_DAYS,
  fetchWithTimeout,
  MAX_BODY_BYTES,
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

    const email   = sanitizeString(body.email, 320).toLowerCase();
    const niches  = body.niches;
    const daysRaw = body.days;

    const errors: string[] = [];
    if (!email || !isValidEmail(email))  errors.push("Valid email is required");
    if (!isValidNichesArray(niches))     errors.push("At least one niche is required");

    const days = typeof daysRaw === "number" ? daysRaw : parseInt(String(daysRaw), 10);
    if (!Number.isFinite(days) || !ALLOWED_DAYS.has(days)) {
      errors.push("Days must be 1, 3, or 7");
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0] }, { status: 400 });
    }

    const validNiches = (niches as string[]).map(sanitizeNiche);

    const MAKE_CATCHUP_WEBHOOK_URL = process.env.MAKE_CATCHUP_WEBHOOK_URL;
    if (MAKE_CATCHUP_WEBHOOK_URL) {
      try {
        const makeRes = await fetchWithTimeout(
          MAKE_CATCHUP_WEBHOOK_URL,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email, niches: validNiches, days,
              requestedAt: new Date().toISOString(),
            }),
          },
          10_000
        );
        if (makeRes.ok) {
          const data = await makeRes.json() as Record<string, unknown>;
          const stories = Array.isArray(data.stories) ? data.stories : [];
          return NextResponse.json({ stories });
        }
      } catch (err) {
        console.error("Make.com catchup error:", err instanceof Error ? err.message : "unknown");
      }
    }

    // Fallback placeholder stories
    const placeholderStories = validNiches.slice(0, 5).map((niche, i) => ({
      headline: `Top story on "${niche}" from the past ${days} day${days > 1 ? "s" : ""}`,
      summary:
        "This is a placeholder. Once your Make.com automation is connected, real AI-generated catch-up stories will appear here based on the latest news for your niches.",
      niche,
      date: new Date(Date.now() - i * 86_400_000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    }));

    return NextResponse.json({ stories: placeholderStories });
  } catch (err) {
    console.error("Catchup route error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
