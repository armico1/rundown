/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob:;
  connect-src 'self';
  frame-ancestors 'none';
  frame-src 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`.replace(/\n/g, " ").trim();

// Note on 'unsafe-inline' for script-src:
// Next.js App Router injects hydration scripts inline. To remove 'unsafe-inline'
// you would need nonce-based CSP (generate a nonce in middleware, pass it to the
// layout via headers(), and add it to every <Script> tag). That is the recommended
// upgrade path for maximum CSP hardness. For now, all other directives are strict.

const securityHeaders = [
  // Prevent browsers from guessing MIME type
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Clickjacking protection
  { key: "X-Frame-Options", value: "DENY" },

  // Stop leaking referrer to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // Force HTTPS for 2 years, include subdomains, allow preload
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },

  // Disable browser features we don't use
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "interest-cohort=()",
    ].join(", "),
  },

  // Content Security Policy
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },

  // Don't pre-fetch DNS for cross-origin URLs
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig = {
  // Remove the X-Powered-By: Next.js header (fingerprinting)
  poweredByHeader: false,

  // Apply security headers to all routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Compiler options for production hardening
  compiler: {
    // Remove console.* calls in production (prevents info leakage)
    // Keep console.error for server-side API error logging (server only, not client)
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error"] }
      : false,
  },
};

module.exports = nextConfig;
