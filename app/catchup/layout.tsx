import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catch Up",
  description: "Missed a few days? Tell us what you follow and get a personalized recap in seconds.",
  openGraph: {
    title: "Catch Up — KYN",
    description: "Get a quick personalized recap on the things you follow.",
  },
  alternates: { canonical: "https://kyn.news/catchup" },
};

export default function CatchupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
