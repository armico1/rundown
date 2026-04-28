import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KYN",
  description: "A five-minute daily brief built around the specific things you follow — not categories, real names.",
  openGraph: {
    title: "KYN",
    description: "Everything you follow. Nothing you don't. A personalized daily brief built around the teams, stocks, and people you actually track.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
