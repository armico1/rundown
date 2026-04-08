// Shared input validation — single source of truth for all API routes

export const ALLOWED_TOPICS = new Set([
  "world-news", "politics", "stocks", "business-tech", "science",
  "health", "sports", "entertainment", "climate", "ai", "crypto",
  "space", "personal-finance", "real-estate", "food", "travel",
  "global-economy", "education", "law", "military", "international",
  "arts", "music", "gaming", "religion",
]);

export const ALLOWED_FREQUENCIES = new Set([
  "daily", "every-other-day", "3x-week", "weekly",
]);

export const ALLOWED_FORMATS = new Set(["read", "listen", "both"]);

export const ALLOWED_DAYS = new Set([1, 3, 7]);

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,253}\.[^\s@]{2,}$/;

/** Sanitize a string: trim, strip null bytes, cap length */
export function sanitizeString(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\0/g, "").trim().slice(0, maxLen);
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= 320;
}

export function isValidTopicsArray(topics: unknown): topics is string[] {
  if (!Array.isArray(topics)) return false;
  if (topics.length === 0 || topics.length > 25) return false;
  return topics.every((t) => typeof t === "string" && ALLOWED_TOPICS.has(t));
}

/** Wrap a fetch with an AbortController timeout */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = 8_000
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** Max request body size in bytes (64 KB) */
export const MAX_BODY_BYTES = 65_536;

/** Validates a boolean (accepts JS boolean or string "true"/"false") */
export function isValidBoolean(value: unknown): boolean {
  return value === true || value === false || value === "true" || value === "false";
}

export function toBoolean(value: unknown): boolean {
  return value === true || value === "true";
}
