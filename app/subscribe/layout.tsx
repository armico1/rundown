import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Build your personalized daily brief. Tell us what you follow and get a five-minute brief every morning — free.",
  openGraph: {
    title: "Subscribe — KYN",
    description: "Get your personalized daily brief free. No card required.",
  },
  alternates: { canonical: "https://kyn.news/subscribe" },
};

export default function SubscribeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
