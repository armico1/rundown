import { NextRequest, NextResponse } from "next/server";

/**
 * In-memory sliding-window rate limiter.
 *
 * NOTE FOR PRODUCTION SCALE: This is per-serverless-instance and resets on
 * cold starts. For true global rate limiting across all instances (1M+ users),
 * integrate Upstash Redis with @upstash/ratelimit, or enable Vercel Firewall
 * rate limiting rules in your Vercel dashboard (Pro/Enterprise plans).
 * This implementation still meaningfully protects against burst attacks on
 * individual warm instances.
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000; // 1 minute window

// Requests per minute per IP per route
const LIMITS: Record<string, number> = {
  "/api/subscribe": 5,
  "/api/catchup": 10,
};

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(
  ip: string,
  path: string,
  limit: number
): { limited: boolean; remaining: number } {
  const key = `${ip}:${path}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false, remaining: limit - 1 };
  }
  if (entry.count >= limit) {
    return { limited: true, remaining: 0 };
  }
  entry.count++;
  return { limited: false, remaining: limit - entry.count };
}

// Prune stale entries to prevent unbounded memory growth
function pruneStore() {
  const now = Date.now();
  rateLimitStore.forEach((val, key) => {
    if (now > val.resetAt) rateLimitStore.delete(key);
  });
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Only intercept API routes ──────────────────────────────
  if (!pathname.startsWith("/api/")) return NextResponse.next();

  // ── Method enforcement ─────────────────────────────────────
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405, headers: { Allow: "POST" } }
    );
  }

  // ── CORS: reject cross-origin requests ─────────────────────
  // Browser fetch() always sends Origin. If it's present and doesn't match
  // our own host, refuse. Server-to-server calls (no Origin header) pass.
  const origin = req.headers.get("origin");
  if (origin) {
    const host = req.headers.get("host") ?? "";
    // Allow exact match and localhost for dev
    const ownOrigins = [
      `https://${host}`,
      `http://${host}`,
      "http://localhost:3000",
      "http://localhost:3001",
    ];
    if (!ownOrigins.includes(origin)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // ── Rate limiting ──────────────────────────────────────────
  const limit = LIMITS[pathname];
  if (limit !== undefined) {
    pruneStore();
    const ip = getIP(req);
    const { limited, remaining } = checkRateLimit(ip, pathname, limit);

    if (limited) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Limit": String(limit),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const res = NextResponse.next();
    res.headers.set("X-RateLimit-Limit", String(limit));
    res.headers.set("X-RateLimit-Remaining", String(remaining));
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
