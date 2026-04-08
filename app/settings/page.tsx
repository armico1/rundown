"use client";

import Link from "next/link";
import { useState } from "react";

const TOPICS = [
  { id: "world-news", label: "World News", icon: "🌍" },
  { id: "politics", label: "US Politics", icon: "🏛️" },
  { id: "stocks", label: "Stocks & Markets", icon: "📈" },
  { id: "business-tech", label: "Business & Tech", icon: "💼" },
  { id: "science", label: "Science", icon: "🔬" },
  { id: "health", label: "Health & Wellness", icon: "💪" },
  { id: "sports", label: "Sports", icon: "⚽" },
  { id: "entertainment", label: "Entertainment", icon: "🎬" },
  { id: "climate", label: "Climate & Energy", icon: "🌱" },
  { id: "ai", label: "Artificial Intelligence", icon: "🤖" },
  { id: "crypto", label: "Crypto & Web3", icon: "₿" },
  { id: "space", label: "Space", icon: "🚀" },
  { id: "personal-finance", label: "Personal Finance", icon: "💰" },
  { id: "real-estate", label: "Real Estate", icon: "🏠" },
  { id: "food", label: "Food & Dining", icon: "🍽️" },
  { id: "travel", label: "Travel", icon: "✈️" },
  { id: "global-economy", label: "Global Economy", icon: "🌐" },
  { id: "education", label: "Education", icon: "📚" },
  { id: "law", label: "Law & Justice", icon: "⚖️" },
  { id: "military", label: "Military & Defense", icon: "🛡️" },
  { id: "international", label: "International Affairs", icon: "🗺️" },
  { id: "arts", label: "Arts & Culture", icon: "🎨" },
  { id: "music", label: "Music", icon: "🎵" },
  { id: "gaming", label: "Gaming", icon: "🎮" },
  { id: "religion", label: "Religion & Society", icon: "🕌" },
];

const FREQUENCIES = [
  { id: "daily", label: "Every day", desc: "Monday through Saturday" },
  { id: "every-other-day", label: "Every other day", desc: "3–4 times per week" },
  { id: "3x-week", label: "3× per week", desc: "Monday, Wednesday, Friday" },
  { id: "weekly", label: "Once a week", desc: "Monday mornings" },
];

const FORMATS = [
  { id: "read", label: "Read", desc: "Email newsletter", icon: "📧" },
  { id: "listen", label: "Listen", desc: "Audio briefing", icon: "🎧" },
  { id: "both", label: "Both", desc: "Email + audio link", icon: "✨" },
];

type Section = "ai" | "topics" | "schedule" | "account";

export default function Settings() {
  const [activeSection, setActiveSection] = useState<Section>("ai");

  // Preferences state
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [customTopics, setCustomTopics] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [format, setFormat] = useState("read");
  const [aiPersonalization, setAiPersonalization] = useState(false);

  // Form state
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

  const NAV: { id: Section; label: string; icon: React.ReactNode }[] = [
    {
      id: "ai",
      label: "AI Personalization",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      ),
    },
    {
      id: "topics",
      label: "Topics",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        </svg>
      ),
    },
    {
      id: "schedule",
      label: "Schedule & Format",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
    },
    {
      id: "account",
      label: "Account",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-brand-border bg-brand-dark/92 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-bold text-brand-text tracking-tight">
            paper<span className="text-brand-accent">trail</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/explore" className="text-sm text-brand-muted hover:text-brand-text transition-smooth font-sans">
              Explore
            </Link>
            <Link href="/catchup" className="text-sm text-brand-muted hover:text-brand-text transition-smooth font-sans">
              Catch Me Up
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-24 px-6 ruled-bg min-h-screen">
        <div className="max-w-5xl mx-auto">

          {/* Page header */}
          <div className="mb-10">
            <h1 className="font-display text-4xl font-bold text-brand-text mb-2">Preferences</h1>
            <p className="text-brand-muted font-sans">Manage your Papertrail briefing settings.</p>
          </div>

          {/* Email field — always visible, required for lookup */}
          <div className="mb-8 p-5 index-card">
            <label className="block text-sm font-semibold text-brand-text mb-2 font-sans">
              Your email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full sm:max-w-sm px-4 py-2.5 border border-brand-border bg-brand-dark text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-smooth font-sans text-sm"
              style={{ borderRadius: "2px" }}
            />
            <p className="mt-1.5 text-xs text-brand-muted font-sans">
              We use this to look up your subscription and apply your changes.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar nav */}
            <div className="lg:w-52 flex-shrink-0">
              <div className="index-card overflow-hidden">
                {NAV.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-sans text-left transition-smooth border-b border-brand-border last:border-b-0 ${
                      activeSection === item.id
                        ? "bg-brand-accent/8 text-brand-accent font-semibold"
                        : "text-brand-muted hover:text-brand-text hover:bg-brand-deeper"
                    } ${i === 0 ? "pt-12" : ""}`}
                  >
                    <span className={activeSection === item.id ? "text-brand-accent" : "text-brand-muted"}>
                      {item.icon}
                    </span>
                    {item.label}
                    {item.id === "ai" && aiPersonalization && (
                      <span className="ml-auto text-xs text-brand-accent font-mono">ON</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Main panel */}
            <div className="flex-1 min-w-0">

              {/* ── AI Personalization ─────────────────────────── */}
              {activeSection === "ai" && (
                <div className="index-card p-7 pt-12">
                  <div className="flex items-start justify-between mb-1">
                    <h2 className="font-display text-2xl font-bold text-brand-text">AI Personalization</h2>
                    {aiPersonalization && (
                      <span className="text-xs font-mono font-bold text-brand-accent border border-brand-accent/30 px-2 py-0.5 bg-brand-accent/8" style={{ borderRadius: "2px" }}>
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-brand-muted mb-8 font-sans leading-relaxed">
                    When enabled, Papertrail uses AI to add curated sections to your briefing — finding connections across your topics, surfacing what&apos;s trending in your world, and recommending stories you might have missed.
                  </p>

                  {/* Big toggle */}
                  <div
                    onClick={() => setAiPersonalization((v) => !v)}
                    className={`flex items-start gap-4 p-5 border-2 cursor-pointer transition-smooth mb-6 ${
                      aiPersonalization
                        ? "border-brand-accent bg-brand-accent/5"
                        : "border-brand-border bg-brand-darker hover:border-brand-accent/40"
                    }`}
                    style={{ borderRadius: "2px" }}
                    role="checkbox"
                    aria-checked={aiPersonalization}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        setAiPersonalization((v) => !v);
                      }
                    }}
                  >
                    {/* Toggle switch */}
                    <div className="flex-shrink-0 mt-0.5">
                      <div className={`w-10 h-6 relative transition-smooth ${aiPersonalization ? "bg-brand-accent" : "bg-brand-border"}`} style={{ borderRadius: "12px" }}>
                        <div className={`absolute top-1 w-4 h-4 bg-white transition-smooth shadow-sm`} style={{ borderRadius: "2px", left: aiPersonalization ? "22px" : "4px" }} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-text font-sans">
                        Personalize my newsletter with AI-curated sections
                      </p>
                      <p className="text-xs text-brand-muted mt-1 font-sans leading-relaxed">
                        I consent to Papertrail using AI to analyze my topic selections and enrich my briefing with curated story recommendations. I can withdraw this consent at any time.
                      </p>
                    </div>
                  </div>

                  {/* What it adds */}
                  <div className="space-y-3 mb-6">
                    <p className="text-xs font-mono font-bold text-brand-text uppercase tracking-widest">What AI sections look like</p>
                    {[
                      { tag: "AI Curated · Because you follow Markets & AI", headline: "How AI trading algorithms shifted S&P 500 volatility this week" },
                      { tag: "AI Curated · Trending in your topics", headline: "The quiet semiconductor shortage that could reshape the next decade" },
                      { tag: "AI Curated · Connected story you might have missed", headline: "Fed rate signals and their effect on the housing markets you track" },
                    ].map((ex, i) => (
                      <div key={i} className={`p-4 border transition-smooth ${aiPersonalization ? "border-brand-border bg-brand-card" : "border-brand-border bg-brand-deeper opacity-50"}`} style={{ borderRadius: "2px" }}>
                        <p className="text-xs font-mono text-brand-accent mb-1">{ex.tag}</p>
                        <p className="text-sm font-semibold text-brand-text font-sans leading-snug">{ex.headline}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border border-brand-border bg-brand-deeper text-xs text-brand-muted font-sans leading-relaxed" style={{ borderRadius: "2px" }}>
                    <strong className="text-brand-text">Privacy note:</strong> AI personalization uses only your selected topics and briefing preferences. We do not track opens, clicks, or browsing behavior. Your data is never sold. You can disable this at any time and all personalization will stop with your next edition.
                  </div>
                </div>
              )}

              {/* ── Topics ────────────────────────────────────── */}
              {activeSection === "topics" && (
                <div className="index-card p-7 pt-12">
                  <h2 className="font-display text-2xl font-bold text-brand-text mb-2">Topics</h2>
                  <p className="text-sm text-brand-muted mb-6 font-sans">
                    {selectedTopics.length > 0
                      ? `${selectedTopics.length} topic${selectedTopics.length !== 1 ? "s" : ""} selected`
                      : "Select at least one topic."}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                    {TOPICS.map((topic) => {
                      const selected = selectedTopics.includes(topic.id);
                      return (
                        <button
                          key={topic.id}
                          onClick={() => toggleTopic(topic.id)}
                          className={`flex items-center gap-2 px-3 py-2.5 border text-left transition-smooth text-sm ${
                            selected
                              ? "chip-selected text-brand-text"
                              : "border-brand-border bg-brand-card text-brand-muted hover:border-brand-accent/40 hover:text-brand-text"
                          }`}
                        >
                          <span>{topic.icon}</span>
                          <span className="font-sans font-medium leading-tight">{topic.label}</span>
                          {selected && (
                            <svg className="w-3 h-3 ml-auto text-brand-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-text mb-2 font-sans">
                      Additional interests <span className="text-brand-muted font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={customTopics}
                      onChange={(e) => setCustomTopics(e.target.value)}
                      placeholder="e.g., AI startups, Middle East, NBA"
                      className="w-full px-4 py-2.5 border border-brand-border bg-brand-dark text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-smooth font-sans text-sm"
                      style={{ borderRadius: "2px" }}
                    />
                  </div>
                </div>
              )}

              {/* ── Schedule & Format ─────────────────────────── */}
              {activeSection === "schedule" && (
                <div className="index-card p-7 pt-12 space-y-8">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-brand-text mb-2">Frequency</h2>
                    <p className="text-sm text-brand-muted mb-5 font-sans">How often you receive your briefing.</p>
                    <div className="space-y-2.5">
                      {FREQUENCIES.map((freq) => (
                        <button
                          key={freq.id}
                          onClick={() => setFrequency(freq.id)}
                          className={`w-full flex items-center justify-between px-5 py-3.5 border text-left transition-smooth ${
                            frequency === freq.id
                              ? "chip-selected"
                              : "border-brand-border bg-brand-card hover:border-brand-accent/40"
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-brand-text font-sans text-sm">{freq.label}</div>
                            <div className="text-xs text-brand-muted font-sans">{freq.desc}</div>
                          </div>
                          {frequency === freq.id && (
                            <div className="w-5 h-5 bg-brand-accent flex items-center justify-center flex-shrink-0" style={{ borderRadius: "2px" }}>
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-brand-border">
                    <h2 className="font-display text-2xl font-bold text-brand-text mb-2 mt-6">Format</h2>
                    <p className="text-sm text-brand-muted mb-5 font-sans">How you receive your briefing.</p>
                    <div className="space-y-2.5">
                      {FORMATS.map((fmt) => (
                        <button
                          key={fmt.id}
                          onClick={() => setFormat(fmt.id)}
                          className={`w-full flex items-center gap-4 px-5 py-3.5 border text-left transition-smooth ${
                            format === fmt.id
                              ? "chip-selected"
                              : "border-brand-border bg-brand-card hover:border-brand-accent/40"
                          }`}
                        >
                          <span className="text-xl">{fmt.icon}</span>
                          <div className="flex-1">
                            <div className="font-semibold text-brand-text font-sans text-sm">{fmt.label}</div>
                            <div className="text-xs text-brand-muted font-sans">{fmt.desc}</div>
                          </div>
                          {format === fmt.id && (
                            <div className="w-5 h-5 bg-brand-accent flex items-center justify-center flex-shrink-0" style={{ borderRadius: "2px" }}>
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Account ───────────────────────────────────── */}
              {activeSection === "account" && (
                <div className="index-card p-7 pt-12">
                  <h2 className="font-display text-2xl font-bold text-brand-text mb-2">Account</h2>
                  <p className="text-sm text-brand-muted mb-8 font-sans">Manage your subscription.</p>

                  <div className="space-y-4">
                    <div className="p-5 border border-brand-border bg-brand-card" style={{ borderRadius: "2px" }}>
                      <p className="text-sm font-semibold text-brand-text font-sans mb-1">Unsubscribe</p>
                      <p className="text-xs text-brand-muted font-sans mb-3 leading-relaxed">
                        Stop receiving Papertrail briefings. Your preferences will be saved for 90 days if you change your mind.
                      </p>
                      <a
                        href="mailto:hello@papertrail.news?subject=Unsubscribe request"
                        className="text-xs font-semibold text-red-600 hover:text-red-700 transition-smooth font-sans"
                      >
                        Request unsubscribe →
                      </a>
                    </div>

                    <div className="p-5 border border-brand-border bg-brand-card" style={{ borderRadius: "2px" }}>
                      <p className="text-sm font-semibold text-brand-text font-sans mb-1">Privacy & data</p>
                      <p className="text-xs text-brand-muted font-sans mb-3 leading-relaxed">
                        Request a copy of your data or ask us to delete your account and all associated preferences.
                      </p>
                      <a
                        href="mailto:hello@papertrail.news?subject=Data request"
                        className="text-xs font-semibold text-brand-accent hover:text-brand-accentHover transition-smooth font-sans"
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
                    {saveError && (
                      <p className="text-sm text-red-600 font-sans">{saveError}</p>
                    )}
                    {saved && (
                      <p className="text-sm text-brand-success font-sans flex items-center gap-1.5">
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
                    className={`flex items-center gap-2 px-7 py-3 font-semibold text-sm transition-smooth font-sans ${
                      !saving
                        ? "bg-brand-accent hover:bg-brand-accentHover text-white glow"
                        : "bg-brand-border text-brand-muted cursor-not-allowed"
                    }`}
                    style={{ borderRadius: "2px" }}
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
      <footer className="border-t border-brand-border py-12 px-6 bg-brand-dark">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-brand-text">
              paper<span className="text-brand-accent">trail</span>
            </span>
            <span className="text-brand-border">·</span>
            <span className="text-sm text-brand-muted font-sans">&copy; 2026. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/explore" className="text-sm text-brand-muted hover:text-brand-text transition-smooth font-sans">Explore</Link>
            <Link href="/subscribe" className="text-sm text-brand-muted hover:text-brand-text transition-smooth font-sans">Subscribe</Link>
            <Link href="/catchup" className="text-sm text-brand-muted hover:text-brand-text transition-smooth font-sans">Catch Me Up</Link>
            <Link href="/settings" className="text-sm text-brand-muted hover:text-brand-text transition-smooth font-sans">Preferences</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
