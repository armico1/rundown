"use client";

import Link from "next/link";
import { useState } from "react";

const TOPICS = [
  { id: "world-news", label: "World News", icon: "🌍" },
  { id: "politics", label: "US Politics", icon: "🏛️" },
  { id: "stocks", label: "Stocks & Markets", icon: "📈" },
  { id: "business-tech", label: "Business & Tech", icon: "💼" },
  { id: "science", label: "Science & Health", icon: "🔬" },
  { id: "sports", label: "Sports", icon: "⚽" },
  { id: "entertainment", label: "Entertainment", icon: "🎬" },
  { id: "climate", label: "Climate & Energy", icon: "🌱" },
];

const FREQUENCIES = [
  { id: "daily", label: "Every day", desc: "Monday through Saturday" },
  { id: "every-other-day", label: "Every other day", desc: "3-4 times per week" },
  { id: "3x-week", label: "3x per week", desc: "Monday, Wednesday, Friday" },
  { id: "weekly", label: "Once a week", desc: "Monday mornings" },
];

const FORMATS = [
  { id: "read", label: "Read", desc: "Email newsletter", icon: "📧" },
  { id: "listen", label: "Listen", desc: "Audio briefing", icon: "🎧" },
  { id: "both", label: "Both", desc: "Email + audio link", icon: "✨" },
];

export default function Subscribe() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [customTopics, setCustomTopics] = useState("");
  const [frequency, setFrequency] = useState("");
  const [format, setFormat] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const canProceed = () => {
    if (step === 1) return name.trim() && email.trim() && email.includes("@");
    if (step === 2) return selectedTopics.length >= 1;
    if (step === 3) return frequency !== "";
    if (step === 4) return format !== "";
    return false;
  };

  const handleSubmit = async () => {
    setSubmitting(true);

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
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-brand-success/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-brand-success" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">You&apos;re in.</h1>
          <p className="text-brand-muted mb-2">
            Welcome to Footnote, {name.split(" ")[0]}. Your first personalized briefing arrives tomorrow morning.
          </p>
          <p className="text-sm text-brand-muted mb-8">
            {selectedTopics.length} topics &middot; {FREQUENCIES.find(f => f.id === frequency)?.label} &middot; {FORMATS.find(f => f.id === format)?.label}
          </p>
          <Link href="/" className="text-brand-accent hover:text-brand-accentHover transition-smooth text-sm">
            &larr; Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-brand-border/50 bg-brand-dark/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white tracking-tight">
            foot<span className="text-brand-accent">note</span>
          </Link>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-smooth ${
                  s === step ? "w-8 bg-brand-accent" : s < step ? "w-4 bg-brand-accent/50" : "w-4 bg-brand-border"
                }`}
              />
            ))}
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-xl mx-auto">

          {/* Step 1: Name & Email */}
          {step === 1 && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Let&apos;s get started</h1>
              <p className="text-brand-muted mb-10">Tell us who you are. Takes 30 seconds.</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-brand-text mb-2">First name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ari"
                    className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-card/50 text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-smooth"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-text mb-2">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-card/50 text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-smooth"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Topics */}
          {step === 2 && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">What do you care about?</h1>
              <p className="text-brand-muted mb-10">Pick at least one topic. We&apos;ll build your briefing around these.</p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {TOPICS.map((topic) => {
                  const selected = selectedTopics.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      onClick={() => toggleTopic(topic.id)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-smooth ${
                        selected
                          ? "chip-selected border-brand-accent text-white"
                          : "border-brand-border bg-brand-card/30 text-brand-muted hover:border-brand-accent/50 hover:text-white"
                      }`}
                    >
                      <span className="text-xl">{topic.icon}</span>
                      <span className="text-sm font-medium">{topic.label}</span>
                      {selected && (
                        <svg className="w-4 h-4 ml-auto text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-text mb-2">
                  Any specific interests? <span className="text-brand-muted font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={customTopics}
                  onChange={(e) => setCustomTopics(e.target.value)}
                  placeholder="e.g., AI startups, Middle East, crypto, NBA"
                  className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-card/50 text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-smooth"
                />
              </div>
            </div>
          )}

          {/* Step 3: Frequency */}
          {step === 3 && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">How often?</h1>
              <p className="text-brand-muted mb-10">Pick a cadence that fits your routine. You can change this anytime.</p>

              <div className="space-y-3">
                {FREQUENCIES.map((freq) => (
                  <button
                    key={freq.id}
                    onClick={() => setFrequency(freq.id)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-smooth ${
                      frequency === freq.id
                        ? "chip-selected border-brand-accent"
                        : "border-brand-border bg-brand-card/30 hover:border-brand-accent/50"
                    }`}
                  >
                    <div>
                      <div className={`font-medium ${frequency === freq.id ? "text-white" : "text-brand-text"}`}>
                        {freq.label}
                      </div>
                      <div className="text-sm text-brand-muted">{freq.desc}</div>
                    </div>
                    {frequency === freq.id && (
                      <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center">
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
              <h1 className="text-3xl font-bold text-white mb-2">How do you want it?</h1>
              <p className="text-brand-muted mb-10">Choose your preferred format. You can always switch later.</p>

              <div className="space-y-3">
                {FORMATS.map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setFormat(fmt.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-smooth ${
                      format === fmt.id
                        ? "chip-selected border-brand-accent"
                        : "border-brand-border bg-brand-card/30 hover:border-brand-accent/50"
                    }`}
                  >
                    <span className="text-2xl">{fmt.icon}</span>
                    <div className="flex-1">
                      <div className={`font-medium ${format === fmt.id ? "text-white" : "text-brand-text"}`}>
                        {fmt.label}
                      </div>
                      <div className="text-sm text-brand-muted">{fmt.desc}</div>
                    </div>
                    {format === fmt.id && (
                      <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center">
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

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-12">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-sm text-brand-muted hover:text-white transition-smooth flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
              </button>
            ) : (
              <Link href="/" className="text-sm text-brand-muted hover:text-white transition-smooth">&larr; Home</Link>
            )}

            {step < 4 ? (
              <button
                onClick={() => canProceed() && setStep(step + 1)}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-smooth ${
                  canProceed()
                    ? "bg-brand-accent hover:bg-brand-accentHover text-white"
                    : "bg-brand-border text-brand-muted cursor-not-allowed"
                }`}
              >
                Continue
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || submitting}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-smooth ${
                  canProceed() && !submitting
                    ? "bg-brand-accent hover:bg-brand-accentHover text-white glow"
                    : "bg-brand-border text-brand-muted cursor-not-allowed"
                }`}
              >
                {submitting ? "Subscribing..." : "Subscribe Free"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
