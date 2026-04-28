import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preferences",
  description: "Manage your KYN brief — update your interests, delivery schedule, and format.",
  robots: { index: false, follow: false },
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
