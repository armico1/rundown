import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore",
  description: "Read the KYN blog, browse sample editions, and discover what a personalized daily brief looks like.",
  openGraph: {
    title: "Explore — KYN",
    description: "Blog posts, sample editions, and more from the KYN team.",
  },
  alternates: { canonical: "https://kyn.news/explore" },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
