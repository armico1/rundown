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
// Next.js App Router injects hydration scripts inline. The recommended hardening
// path is nonce-based CSP (middleware generates a nonce, passes it via headers,
// added to every <Script> tag). All other directives here are already strict.

const securityHeaders = [
  { key: "X-Content-Type-Options",  value: "nosniff" },
  { key: "X-Frame-Options",         value: "DENY" },
  { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()", "microphone=()", "geolocation=()",
      "payment=()", "usb=()", "interest-cohort=()",
    ].join(", "),
  },
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "X-DNS-Prefetch-Control",  value: "off" },
];

const nextConfig = {
  poweredByHeader: false,

  async headers() {
    return [
      // API routes: security headers + prevent indexing
      {
        source: "/api/:path*",
        headers: [
          ...securityHeaders,
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
        ],
      },
      // All other routes
      {
        source: "/((?!api/).*)",
        headers: securityHeaders,
      },
    ];
  },

  // Redirect old Papertrail-branded blog slug to new KYN slug
  async redirects() {
    return [
      {
        source: "/blog/why-we-built-papertrail",
        destination: "/blog/why-we-built-kyn",
        permanent: true,
      },
    ];
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error"] }
      : false,
  },
};

module.exports = nextConfig;
