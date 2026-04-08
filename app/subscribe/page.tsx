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

const AI_EXAMPLES = [
  {
    label: "Because you follow Markets & AI",
    headline: "How AI trading algorithms shifted S&P 500 volatility this week",
    tag: "AI Curated",
  },
  {
    label: "Trending in your topics",
    headline: "The quiet semiconductor shortage that could reshape the next decade",
    tag: "AI Curated",
  },
  {
    label: "Connected story you might have missed",
    headline: "Fed rate signals and their effect on the housing markets you track",
    tag: "AI Curated",
  },
];

const TOTAL_STEPS = 5;

export default function Subscribe() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [customTopics, setCustomTopics] = useState("");
  const [frequency, setFrequency] = useState("");
  const [format, setFormat] = useState("");
  const [aiPersonalization, setAiPersonalization] = useState(false);
  const [aiConsented, setAiConsented] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const canProceed = () => {
    if (step === 1) return name.trim() !== "" && email.trim().includes("@");
    if (step === 2) return selectedTopics.length >= 1;
    if (step === 3) return frequency !== "";
    if (step === 4) return format !== "";
    if (step === 5) return true; // opt-in step is always skippable
    return false;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          topics: selectedTopics,
          customTopics: customTopics.trim(),
          frequency,
          format,
          aiPersonalization,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({})) as { error?: string };
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Could not connect. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-dark ruled-bg flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-brand-success/10 border border-brand-success/20 flex items-center justify-center mx-auto mb-6" style={{ borderRadius: "4px" }}>
            <svg className="w-10 h-10 text-brand-success" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="font-display text-4xl font-bold text-brand-text mb-3">You&apos;re in.</h1>
          <p className="text-brand-muted mb-2 leading-relaxed">
            Welcome to Papertrail, {name.split(" ")[0]}. Your first personalized briefing arrives tomorrow morning.
          </p>
          <p className="text-sm text-brand-muted mb-2">
            {selectedTopics.length} topics · {FREQUENCIES.find(f => f.id === frequency)?.label} · {FORMATS.find(f => f.id === format)?.label}
          </p>
          {aiPersonalization && (
            <p className="text-xs text-brand-accent mb-6 font-sans">
              ✦ AI-curated sections enabled
            </p>
          )}
          <div className="flex flex-col items-center gap-3 mt-6">
            <Link
              href="/settings"
              className="text-sm font-semibold text-brand-accent hover:text-brand-accentHover transition-smooth"
            >
              Manage preferences →
            </Link>
            <Link href="/" className="text-sm text-brand-muted hover:text-brand-text transition-smooth">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-brand-border bg-brand-dark/92 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-bold text-brand-text tracking-tight">
            paper<span className="text-brand-accent">trail</span>
          </Link>
          {/* Step progress dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
              <div
                key={s}
                className={`h-1.5 transition-smooth ${
                  s === step
                    ? "w-8 bg-brand-accent"
                    : s < step
                    ? "w-4 bg-brand-accent/50"
                    : "w-4 bg-brand-border"
                }`}
                style={{ borderRadius: "2px" }}
              />
            ))}
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6 ruled-bg min-h-screen">
        <div className="max-w-xl mx-auto">

          {/* Step 1: Name & Email */}
          {step === 1 && (
            <div>
              <p className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">Step 1 of {TOTAL_STEPS}</p>
              <h1 className="font-display text-3xl font-bold text-brand-text mb-2">Let&apos;s get started</h1>
              <p className="text-brand-muted mb-10 font-sans">Tell us who you are. Takes 30 seconds.</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-2">First name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ari"
                    className="w-full px-4 py-3 border border-brand-border bg-brand-card text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-smooth font-sans"
                    style={{ borderRadius: "2px" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-2">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-brand-border bg-brand-card text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-smooth font-sans"
                    style={{ borderRadius: "2px" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Topics */}
          {step === 2 && (
            <div>
              <p className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">Step 2 of {TOTAL_STEPS}</p>
              <h1 className="font-display text-3xl font-bold text-brand-text mb-2">What do you care about?</h1>
              <p className="text-brand-muted mb-8 font-sans">
                Pick at least one. Choose as many as you like — we&apos;ll build your briefing around these.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8">
                {TOPICS.map((topic) => {
                  const selected = selectedTopics.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      onClick={() => toggleTopic(topic.id)}
                      className={`flex items-center gap-2.5 px-3.5 py-3 border text-left transition-smooth ${
                        selected
                          ? "chip-selected text-brand-text"
                          : "border-brand-border bg-brand-card text-brand-muted hover:border-brand-accent/40 hover:text-brand-text hover:bg-brand-deeper"
                      }`}
                    >
                      <span className="text-lg">{topic.icon}</span>
                      <span className="text-sm font-sans font-medium leading-tight">{topic.label}</span>
                      {selected && (
                        <svg className="w-3.5 h-3.5 ml-auto text-brand-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedTopics.length > 0 && (
                <p className="text-xs text-brand-muted mb-6 font-sans">
                  {selectedTopics.length} topic{selectedTopics.length !== 1 ? "s" : ""} selected
                </p>
              )}

              <div>
                <label className="block text-sm font-semibold text-brand-text mb-2">
                  Any specific interests? <span className="text-brand-muted font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={customTopics}
                  onChange={(e) => setCustomTopics(e.target.value)}
                  placeholder="e.g., AI startups, Middle East, NBA"
                  className="w-full px-4 py-3 border border-brand-border bg-brand-card text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-smooth font-sans"
                  style={{ borderRadius: "2px" }}
                />
              </div>
            </div>
          )}

          {/* Step 3: Frequency */}
          {step === 3 && (
            <div>
              <p className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">Step 3 of {TOTAL_STEPS}</p>
              <h1 className="font-display text-3xl font-bold text-brand-text mb-2">How often?</h1>
              <p className="text-brand-muted mb-10 font-sans">Pick a cadence that fits your routine. You can change this anytime.</p>

              <div className="space-y-3">
                {FREQUENCIES.map((freq) => (
                  <button
                    key={freq.id}
                    onClick={() => setFrequency(freq.id)}
                    className={`w-full flex items-center justify-between px-5 py-4 border text-left transition-smooth ${
                      frequency === freq.id
                        ? "chip-selected"
                        : "border-brand-border bg-brand-card hover:border-brand-accent/40 hover:bg-brand-deeper"
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-brand-text font-sans">{freq.label}</div>
                      <div className="text-sm text-brand-muted font-sans">{freq.desc}</div>
                    </div>
                    {frequency === freq.id && (
                      <div className="w-6 h-6 bg-brand-accent flex items-center justify-center flex-shrink-0" style={{ borderRadius: "2px" }}>
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Format */}
          {step === 4 && (
            <div>
              <p className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">Step 4 of {TOTAL_STEPS}</p>
              <h1 className="font-display text-3xl font-bold text-brand-text mb-2">How do you want it?</h1>
              <p className="text-brand-muted mb-10 font-sans">Choose your preferred format. You can always switch later.</p>

              <div className="space-y-3">
                {FORMATS.map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setFormat(fmt.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 border text-left transition-smooth ${
                      format === fmt.id
                        ? "chip-selected"
                        : "border-brand-border bg-brand-card hover:border-brand-accent/40 hover:bg-brand-deeper"
                    }`}
                  >
                    <span className="text-2xl">{fmt.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-brand-text font-sans">{fmt.label}</div>
                      <div className="text-sm text-brand-muted font-sans">{fmt.desc}</div>
                    </div>
                    {format === fmt.id && (
                      <div className="w-6 h-6 bg-brand-accent flex items-center justify-center flex-shrink-0" style={{ borderRadius: "2px" }}>
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: AI Personalization opt-in */}
          {step === 5 && (
            <div>
              <p className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">Step 5 of {TOTAL_STEPS}</p>
              <h1 className="font-display text-3xl font-bold text-brand-text mb-2">Make it smarter</h1>
              <p className="text-brand-muted mb-8 font-sans leading-relaxed">
                Opt in to let Papertrail use AI to add curated sections to your briefing — stories
                that connect your topics, surface what you might have missed, and dig deeper on what&apos;s trending in your world.
              </p>

              {/* Preview examples */}
              <div className="mb-8 space-y-3">
                {AI_EXAMPLES.map((ex, i) => (
                  <div key={i} className="index-card p-4 pt-9 opacity-80">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest">
                        {ex.tag}
                      </span>
                      <span className="text-brand-border text-xs">·</span>
                      <span className="text-xs text-brand-muted font-sans">{ex.label}</span>
                    </div>
                    <p className="text-sm font-semibold text-brand-text font-sans leading-snug">{ex.headline}</p>
                  </div>
                ))}
                <p className="text-xs text-brand-muted text-center font-sans pt-1">
                  These are examples of AI-curated sections that would appear in your briefing.
                </p>
              </div>

              {/* What it does / doesn't do */}
              <div className="mb-8 p-5 border border-brand-border bg-brand-card" style={{ borderRadius: "2px" }}>
                <p className="text-xs font-mono font-bold text-brand-text uppercase tracking-widest mb-3">How it works</p>
                <ul className="space-y-2">
                  {[
                    "AI reads your selected topics to find relevant stories beyond your core picks",
                    "Surfaces connections between stories across different topics you follow",
                    "Highlights what's trending specifically within your interest areas",
                    "Your data is never sold or shared with third parties",
                    "You can turn this off at any time in your preferences",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-brand-muted font-sans">
                      <svg className="w-4 h-4 text-brand-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consent toggle */}
              <div
                onClick={() => {
                  if (!aiPersonalization) {
                    setAiPersonalization(true);
                    setAiConsented(true);
                  } else {
                    setAiPersonalization(false);
                    setAiConsented(false);
                  }
                }}
                className={`flex items-start gap-4 p-5 border-2 cursor-pointer transition-smooth ${
                  aiPersonalization
                    ? "border-brand-accent bg-brand-accent/5"
                    : "border-brand-border bg-brand-card hover:border-brand-accent/40"
                }`}
                style={{ borderRadius: "2px" }}
                role="checkbox"
                aria-checked={aiPersonalization}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    setAiPersonalization((v) => !v);
                    setAiConsented((v) => !v);
                  }
                }}
              >
                {/* Custom checkbox */}
                <div className={`w-5 h-5 flex-shrink-0 border-2 flex items-center justify-center mt-0.5 transition-smooth ${
                  aiPersonalization ? "bg-brand-accent border-brand-accent" : "border-brand-border bg-brand-card"
                }`} style={{ borderRadius: "2px" }}>
                  {aiPersonalization && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-text font-sans leading-snug">
                    Personalize my newsletter with AI-curated sections
                  </p>
                  <p className="text-xs text-brand-muted mt-1 font-sans leading-relaxed">
                    I consent to Papertrail using AI to analyze my topic selections and enrich my briefing with curated story recommendations. I can withdraw this consent at any time in my preferences.
                  </p>
                </div>
              </div>

              {!aiPersonalization && (
                <p className="mt-3 text-xs text-center text-brand-muted font-sans">
                  You can skip this and enable it later in your preferences.
                </p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-sm text-brand-muted hover:text-brand-text transition-smooth flex items-center gap-1.5 font-sans"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
              </button>
            ) : (
              <Link href="/" className="text-sm text-brand-muted hover:text-brand-text transition-smooth font-sans">← Home</Link>
            )}

            <div className="flex items-center gap-3">
              {/* On step 5, allow skipping */}
              {step === 5 && !aiPersonalization && (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="text-sm text-brand-muted hover:text-brand-text transition-smooth font-sans"
                >
                  {submitting ? "Subscribing..." : "Skip & subscribe"}
                </button>
              )}

              {step < TOTAL_STEPS ? (
                <button
                  onClick={() => canProceed() && setStep(step + 1)}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 px-7 py-3 font-semibold text-sm transition-smooth ${
                    canProceed()
                      ? "bg-brand-accent hover:bg-brand-accentHover text-white"
                      : "bg-brand-border text-brand-muted cursor-not-allowed"
                  }`}
                  style={{ borderRadius: "2px" }}
                >
                  Continue
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`flex items-center gap-2 px-8 py-3 font-semibold text-sm transition-smooth ${
                    !submitting
                      ? "bg-brand-accent hover:bg-brand-accentHover text-white glow"
                      : "bg-brand-border text-brand-muted cursor-not-allowed"
                  }`}
                  style={{ borderRadius: "2px" }}
                >
                  {submitting ? "Subscribing..." : aiPersonalization ? "Subscribe with AI ✦" : "Subscribe Free"}
                </button>
              )}
            </div>
          </div>

          {submitError && (
            <p className="mt-4 text-sm text-red-600 text-center font-sans">{submitError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
