import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KYN — Know Your Niche",
  description: "KYN delivers a daily brief built around exactly what you follow — specific teams, individual stocks, real names. Not categories. Your niche.",
  openGraph: {
    title: "KYN — Know Your Niche",
    description: "Your obsession, delivered daily. KYN builds a personalized briefing around the exact things you follow.",
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
