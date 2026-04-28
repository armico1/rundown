import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Papertrail — Your Daily News, Your Way",
  description: "Hyper-personalized daily news briefings. Choose your topics, pick your frequency, read or listen. The essential news every US adult should know, delivered how you want it.",
  openGraph: {
    title: "Papertrail — Your Daily News, Your Way",
    description: "Hyper-personalized daily news briefings you can read or listen to.",
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
