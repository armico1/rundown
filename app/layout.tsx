import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kyn.news"),
  title: {
    default: "KYN",
    template: "%s — KYN",
  },
  description:
    "A five-minute daily brief built around the specific things you follow — the Lakers, TSLA, Bitcoin. Your brief, every morning.",
  keywords: ["personalized news", "daily brief", "newsletter", "morning brief", "custom news digest"],
  authors: [{ name: "KYN", url: "https://kyn.news" }],
  creator: "KYN",
  publisher: "KYN",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kyn.news",
    siteName: "KYN",
    title: "KYN — Everything you follow. Nothing you don't.",
    description:
      "A five-minute daily brief built around the specific things you follow — the Lakers, TSLA, Bitcoin.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KYN — Your personalized daily brief",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KYN — Everything you follow. Nothing you don't.",
    description: "A five-minute daily brief built around the specific things you follow.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://kyn.news" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
