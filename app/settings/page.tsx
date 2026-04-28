"use client";

import Link from "next/link";
import { useState } from "react";

const TOPICS = [
  { id: "world-news", label: "World News" },
  { id: "politics", label: "US Politics" },
  { id: "stocks", label: "Stocks & Markets" },
  { id: "business-tech", label: "Business & Tech" },
  { id: "science", label: "Science" },
  { id: "health", label: "Health & Wellness" },
  { id: "sports", label: "Sports" },
  { id: "entertainment", label: "Entertainment" },
  { id: "climate", label: "Climate & Energy" },
  { id: "ai", label: "Artificial Intelligence" },
  { id: "crypto", label: "Crypto & Web3" },
  { id: "space", label: "Space" },
  { id: "personal-finance", label: "Personal Finance" },
  { id: "real-estate", label: "Real Estate" },
  { id: "food", label: "Food & Dining" },
  { id: "travel", label: "Travel" },
  { id: "global-economy", label: "Global Economy" },
  { id: "education", label: "Education" },
  { id: "law", label: "Law & Justice" },
  { id: "military", label: "Military & Defense" },
  { id: "international", label: "International Affairs" },
  { id: "arts", label: "Arts & Culture" },
  { id: "music", label: "Music" },
  { id: "gaming", label: "Gaming" },
  { id: "religion", label: "Religion & Society" },
];

const FREQUENCIES = [
  { id: "daily", label: "Every day", desc: "Monday through Saturday" },
  { id: "every-other-day", label: "Every other day", desc: "3–4 times per week" },
  { id: "3x-week", label: "3× per week", desc: "Monday, Wednesday, Friday" },
  { id: "weekly", label: "Once a week", desc: "Monday mornings" },
];

const FORMATS = [
  { id: "read", label: "Read", desc: "Email newsletter" },
  { id: "listen", label: "Listen", desc: "Audio briefing" },
  { id: "both", label: "Both", desc: "Email + audio link" },
];

type Section = "ai" | "topics" | "schedule" | "account";

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: "ai", label: "AI Personalization" },
  { id: "topics", label: "Topics" },
  { id: "schedule", label: "Schedule & Format" },
  { id: "account", label: "Account" },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState<Section>("ai");
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [customTopics, setCustomTopics] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [format, setFormat] = useState("read");
  const [aiPersonalization, setAiPersonalization] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setSaveError("");

    if (!email.trim().includes("@")) {
      setSaveError("Please enter a valid email address so we can find your account.");
      setSaving(false);
      return;
    }
    if (selectedTopics.length === 0) {
      setSaveError("Please select at least one topic.");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          topics: selectedTopics,
          customTopics: customTopics.trim(),
          frequency,
          format,
          aiPersonalization,
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 4000);
      } else {
        const data = await res.json().catch(() => ({})) as { error?: string };
        setSaveError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setSaveError("Could not connect. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white text-brand-text min-h-screen">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-brand-text">
            papertrail
          </Link>
          <div className="hidden sm:flex items-center gap-8">
            <Link href="/explore" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Explore</Link>
            <Link href="/catchup" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Catch Me Up</Link>
            <Link href="/settings" className="text-sm font-semibold text-brand-text link-underline">Preferences</Link>
          </div>
          <Link href="/subscribe" className="btn-primary text-xs py-3 px-5">Subscribe Free</Link>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">

          {/* Page header */}
          <div className="mb-10">
            <p className="label mb-4">Account</p>
            <h1 className="text-display-md font-bold text-brand-text mb-2">Preferences</h1>
            <p className="text-brand-muted">Manage your Papertrail briefing settings.</p>
          </div>

          {/* Email field */}
          <div className="mb-8 p-6 border border-brand-border rounded-xl bg-brand-section">
            <label className="block text-sm font-semibold text-brand-text mb-2">
              Your email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input-clean max-w-sm"
            />
            <p className="mt-2 text-xs text-brand-subtle">
              We use this to look up your subscription and apply your changes.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar */}
            <div className="lg:w-52 flex-shrink-0">
              <div className="border border-brand-border rounded-xl overflow-hidden">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 text-sm text-left transition-colors border-b border-brand-border last:border-b-0 ${
                      activeSection === item.id
                        ? "bg-brand-dark text-white font-semibold"
                        : "bg-white text-brand-muted hover:text-brand-text hover:bg-brand-section"
                    }`}
                  >
                    {item.label}
                    {item.id === "ai" && aiPersonalization && (
                      <span className={`text-xs font-mono ${activeSection === item.id ? "text-white/60" : "text-brand-subtle"}`}>ON</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Main panel */}
            <div className="flex-1 min-w-0">

              {/* AI Personalization */}
              {activeSection === "ai" && (
                <div className="border border-brand-border rounded-xl p-7">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-2xl font-bold text-brand-text">AI Personalization</h2>
                    {aiPersonalization && (
                      <span className="text-xs font-semibold text-brand-text border border-brand-border px-2 py-0.5 rounded-full bg-brand-section">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-brand-muted mb-8 leading-relaxed">
                    When enabled, Papertrail uses AI to add curated sections to your briefing — finding connections across your topics, surfacing what&apos;s trending in your world, and recommending stories you might have missed.
                  </p>

                  <button
                    onClick={() => setAiPersonalization((v) => !v)}
                    className={`w-full flex items-start gap-4 p-5 border-2 rounded-xl cursor-pointer transition-colors mb-6 text-left ${
                      aiPersonalization
                        ? "border-brand-dark bg-brand-dark text-white"
                        : "border-brand-border bg-white hover:border-brand-dark/40"
                    }`}
                    role="checkbox"
                    aria-checked={aiPersonalization}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className={`w-10 h-6 rounded-full relative transition-colors ${aiPersonalization ? "bg-white" : "bg-brand-border"}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all shadow-sm ${aiPersonalization ? "bg-brand-dark left-5" : "bg-white left-1"}`} />
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${aiPersonalization ? "text-white" : "text-brand-text"}`}>
                        Personalize my newsletter with AI-curated sections
                      </p>
                      <p className={`text-xs mt-1 leading-relaxed ${aiPersonalization ? "text-white/60" : "text-brand-muted"}`}>
                        I consent to Papertrail using AI to analyze my topic selections and enrich my briefing with curated story recommendations. I can withdraw this consent at any time.
                      </p>
                    </div>
                  </button>

                  <div className="space-y-3 mb-6">
                    <p className="text-xs font-semibold text-brand-text uppercase tracking-widest">What AI sections look like</p>
                    {[
                      { tag: "AI Curated · Because you follow Markets & AI", headline: "How AI trading algorithms shifted S&P 500 volatility this week" },
                      { tag: "AI Curated · Trending in your topics", headline: "The quiet semiconductor shortage that could reshape the next decade" },
                      { tag: "AI Curated · Connected story you might have missed", headline: "Fed rate signals and their effect on the housing markets you track" },
                    ].map((ex, i) => (
                      <div key={i} className={`p-4 border rounded-xl transition-opacity ${aiPersonalization ? "border-brand-border opacity-100" : "border-brand-border opacity-50"}`}>
                        <p className="text-xs font-mono text-brand-subtle mb-1">{ex.tag}</p>
                        <p className="text-sm font-semibold text-brand-text leading-snug">{ex.headline}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border border-brand-border rounded-xl bg-brand-section text-xs text-brand-muted leading-relaxed">
                    <strong className="text-brand-text">Privacy note:</strong> AI personalization uses only your selected topics and briefing preferences. We do not track opens, clicks, or browsing behavior. Your data is never sold. You can disable this at any time.
                  </div>
                </div>
              )}

              {/* Topics */}
              {activeSection === "topics" && (
                <div className="border border-brand-border rounded-xl p-7">
                  <h2 className="text-2xl font-bold text-brand-text mb-2">Topics</h2>
                  <p className="text-sm text-brand-muted mb-6">
                    {selectedTopics.length > 0
                      ? `${selectedTopics.length} topic${selectedTopics.length !== 1 ? "s" : ""} selected`
                      : "Select at least one topic."}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {TOPICS.map((topic) => {
                      const selected = selectedTopics.includes(topic.id);
                      return (
                        <button
                          key={topic.id}
                          onClick={() => toggleTopic(topic.id)}
                          className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                            selected
                              ? "bg-brand-dark border-brand-dark text-white"
                              : "border-brand-border bg-white text-brand-muted hover:border-brand-dark hover:text-brand-text"
                          }`}
                        >
                          {topic.label}
                        </button>
                      );
                    })}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-text mb-2">
                      Additional interests <span className="text-brand-muted font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={customTopics}
                      onChange={(e) => setCustomTopics(e.target.value)}
                      placeholder="e.g., AI startups, Middle East, NBA"
                      className="input-clean"
                    />
                  </div>
                </div>
              )}

              {/* Schedule & Format */}
              {activeSection === "schedule" && (
                <div className="border border-brand-border rounded-xl p-7 space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-brand-text mb-2">Frequency</h2>
                    <p className="text-sm text-brand-muted mb-5">How often you receive your briefing.</p>
                    <div className="space-y-2">
                      {FREQUENCIES.map((freq) => (
                        <button
                          key={freq.id}
                          onClick={() => setFrequency(freq.id)}
                          className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-colors ${
                            frequency === freq.id
                              ? "bg-brand-dark border-brand-dark text-white"
                              : "border-brand-border bg-white hover:border-brand-dark"
                          }`}
                        >
                          <div>
                            <div className={`font-semibold text-sm ${frequency === freq.id ? "text-white" : "text-brand-text"}`}>{freq.label}</div>
                            <div className={`text-xs ${frequency === freq.id ? "text-white/60" : "text-brand-muted"}`}>{freq.desc}</div>
                          </div>
                          {frequency === freq.id && (
                            <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-brand-border">
                    <h2 className="text-2xl font-bold text-brand-text mb-2 mt-6">Format</h2>
                    <p className="text-sm text-brand-muted mb-5">How you receive your briefing.</p>
                    <div className="space-y-2">
                      {FORMATS.map((fmt) => (
                        <button
                          key={fmt.id}
                          onClick={() => setFormat(fmt.id)}
                          className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-colors ${
                            format === fmt.id
                              ? "bg-brand-dark border-brand-dark text-white"
                              : "border-brand-border bg-white hover:border-brand-dark"
                          }`}
                        >
                          <div>
                            <div className={`font-semibold text-sm ${format === fmt.id ? "text-white" : "text-brand-text"}`}>{fmt.label}</div>
                            <div className={`text-xs ${format === fmt.id ? "text-white/60" : "text-brand-muted"}`}>{fmt.desc}</div>
                          </div>
                          {format === fmt.id && (
                            <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Account */}
              {activeSection === "account" && (
                <div className="border border-brand-border rounded-xl p-7">
                  <h2 className="text-2xl font-bold text-brand-text mb-2">Account</h2>
                  <p className="text-sm text-brand-muted mb-8">Manage your subscription.</p>

                  <div className="space-y-4">
                    <div className="p-5 border border-brand-border rounded-xl">
                      <p className="text-sm font-semibold text-brand-text mb-1">Unsubscribe</p>
                      <p className="text-xs text-brand-muted mb-3 leading-relaxed">
                        Stop receiving Papertrail briefings. Your preferences will be saved for 90 days if you change your mind.
                      </p>
                      <a
                        href="mailto:hello@papertrail.news?subject=Unsubscribe request"
                        className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
                      >
                        Request unsubscribe →
                      </a>
                    </div>

                    <div className="p-5 border border-brand-border rounded-xl">
                      <p className="text-sm font-semibold text-brand-text mb-1">Privacy &amp; data</p>
                      <p className="text-xs text-brand-muted mb-3 leading-relaxed">
                        Request a copy of your data or ask us to delete your account and all associated preferences.
                      </p>
                      <a
                        href="mailto:hello@papertrail.news?subject=Data request"
                        className="text-xs font-semibold text-brand-text hover:text-brand-muted transition-colors"
                      >
                        Contact us about your data →
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Save bar */}
              {activeSection !== "account" && (
                <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex-1">
                    {saveError && <p className="text-sm text-red-600">{saveError}</p>}
                    {saved && (
                      <p className="text-sm text-brand-success flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Preferences saved. Changes apply to your next edition.
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`btn-primary ${saving ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    {saving ? "Saving..." : "Save preferences"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-brand-dark border-t border-white/10 py-10 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-sm font-bold text-white/70">papertrail</span>
          <div className="flex items-center gap-8">
            {[["Explore","/explore"],["Catch Me Up","/catchup"],["Preferences","/settings"],["Subscribe","/subscribe"]].map(([label,href])=>(
              <Link key={href} href={href} className="text-xs text-white/40 hover:text-white/80 transition-colors link-underline">{label}</Link>
            ))}
          </div>
          <span className="text-xs text-white/30 font-mono">&copy; 2026 Papertrail</span>
        </div>
      </footer>
    </div>
  );
}
