"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const STEPS = ["You", "Topics", "Schedule", "Format", "Personalize"];
const TOTAL = STEPS.length;

const ease = [0.19, 1, 0.22, 1] as const;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease } },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0, transition: { duration: 0.25 } }),
};

export default function Subscribe() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [customTopics, setCustomTopics] = useState("");
  const [frequency, setFrequency] = useState("");
  const [format, setFormat] = useState("");
  const [aiPersonalization, setAiPersonalization] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill email from URL param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const e = params.get("email");
    if (e) setEmail(decodeURIComponent(e));
  }, []);

  const toggle = (id: string) =>
    setSelectedTopics((p) => p.includes(id) ? p.filter((t) => t !== id) : [...p, id]);

  const canProceed = () => {
    if (step === 1) return name.trim() !== "" && email.includes("@");
    if (step === 2) return selectedTopics.length >= 1;
    if (step === 3) return frequency !== "";
    if (step === 4) return format !== "";
    return true;
  };

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topics: selectedTopics, customTopics: customTopics.trim(), frequency, format, aiPersonalization }),
      });
      if (res.ok) { setSubmitted(true); return; }
      const data = await res.json().catch(() => ({})) as { error?: string };
      setError(data.error ?? "Something went wrong.");
    } catch { setError("Could not connect. Please try again."); }
    finally { setSubmitting(false); }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-sm text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-3 tracking-tight">You&apos;re in.</h1>
          <p className="text-white/60 text-sm leading-relaxed mb-2">
            Welcome, {name.split(" ")[0]}. Your first briefing arrives tomorrow morning.
          </p>
          {aiPersonalization && <p className="text-xs text-white/40 mb-8">AI personalization is on.</p>}
          <div className="flex flex-col items-center gap-3 mt-8">
            <Link href="/settings" className="btn-white text-xs py-2.5 px-5">Manage preferences →</Link>
            <Link href="/" className="text-xs text-white/40 hover:text-white/70 transition-colors">← Back to home</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-brand-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-base font-bold text-brand-text tracking-tight">papertrail</Link>
          {/* Progress */}
          <div className="flex items-center gap-2">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i + 1 === step ? "w-8 bg-brand-dark" : i + 1 < step ? "w-4 bg-brand-dark/40" : "w-4 bg-brand-border"}`} />
            ))}
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6 min-h-screen flex items-start justify-center">
        <div className="w-full max-w-lg pt-8">
          {/* Step label */}
          <p className="label mb-4">Step {step} of {TOTAL} — {STEPS[step - 1]}</p>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  <h1 className="text-display-md font-extrabold text-brand-text tracking-tight">Let&apos;s get started.</h1>
                  <p className="text-brand-muted text-sm">Takes 2 minutes. No credit card.</p>
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-brand-text uppercase tracking-widest mb-2 block">First name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ari" className="input-line" autoFocus />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-brand-text uppercase tracking-widest mb-2 block">Email address</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input-line" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <h1 className="text-display-md font-extrabold text-brand-text tracking-tight mb-2">What do you care about?</h1>
                  <p className="text-brand-muted text-sm mb-8">Pick at least one. Choose as many as you like.</p>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {TOPICS.map((t) => {
                      const sel = selectedTopics.includes(t.id);
                      return (
                        <button key={t.id} onClick={() => toggle(t.id)}
                          className={`flex items-center gap-2.5 px-4 py-3 rounded-full border text-sm font-medium text-left transition-all duration-200 ${sel ? "bg-brand-dark text-white border-brand-dark" : "bg-white text-brand-muted border-brand-border hover:border-brand-dark/30 hover:text-brand-text"}`}>
                          <span>{t.icon}</span>
                          <span className="leading-tight">{t.label}</span>
                          {sel && <svg className="w-3 h-3 ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                        </button>
                      );
                    })}
                  </div>
                  {selectedTopics.length > 0 && <p className="text-xs text-brand-subtle mb-4">{selectedTopics.length} selected</p>}
                  <div>
                    <label className="text-xs font-semibold text-brand-text uppercase tracking-widest mb-2 block">Specific interests <span className="text-brand-subtle normal-case font-normal tracking-normal">(optional)</span></label>
                    <input type="text" value={customTopics} onChange={(e) => setCustomTopics(e.target.value)} placeholder="e.g., AI startups, Middle East, NBA" className="input-line" />
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div>
                  <h1 className="text-display-md font-extrabold text-brand-text tracking-tight mb-2">How often?</h1>
                  <p className="text-brand-muted text-sm mb-8">You can change this anytime.</p>
                  <div className="space-y-2">
                    {FREQUENCIES.map((f) => (
                      <button key={f.id} onClick={() => setFrequency(f.id)}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border text-left transition-all duration-200 ${frequency === f.id ? "bg-brand-dark text-white border-brand-dark" : "bg-white text-brand-text border-brand-border hover:border-brand-dark/30"}`}>
                        <div>
                          <div className="font-semibold text-sm">{f.label}</div>
                          <div className={`text-xs mt-0.5 ${frequency === f.id ? "text-white/60" : "text-brand-muted"}`}>{f.desc}</div>
                        </div>
                        {frequency === f.id && <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div>
                  <h1 className="text-display-md font-extrabold text-brand-text tracking-tight mb-2">How do you want it?</h1>
                  <p className="text-brand-muted text-sm mb-8">Switch anytime from your preferences.</p>
                  <div className="space-y-2">
                    {FORMATS.map((f) => (
                      <button key={f.id} onClick={() => setFormat(f.id)}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-200 ${format === f.id ? "bg-brand-dark text-white border-brand-dark" : "bg-white text-brand-text border-brand-border hover:border-brand-dark/30"}`}>
                        <span className="text-2xl">{f.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{f.label}</div>
                          <div className={`text-xs mt-0.5 ${format === f.id ? "text-white/60" : "text-brand-muted"}`}>{f.desc}</div>
                        </div>
                        {format === f.id && <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5 — AI opt-in */}
              {step === 5 && (
                <div>
                  <h1 className="text-display-md font-extrabold text-brand-text tracking-tight mb-2">One last thing.</h1>
                  <p className="text-brand-muted text-sm mb-8 leading-relaxed">
                    Opt in to let AI add curated sections to your briefing — stories that connect your topics, surface what&apos;s trending, and find what you might have missed.
                  </p>

                  {/* Preview */}
                  <div className="space-y-2 mb-8">
                    {[
                      { tag: "AI Curated · Based on your topics", headline: "How AI trading algorithms shifted S&P 500 volatility this week" },
                      { tag: "AI Curated · You might have missed", headline: "The semiconductor shortage quietly reshaping the next decade" },
                    ].map((ex) => (
                      <div key={ex.headline} className="p-4 rounded-xl border border-brand-border bg-brand-section">
                        <p className="text-xs font-mono text-brand-subtle mb-1">{ex.tag}</p>
                        <p className="text-sm font-semibold text-brand-text leading-snug">{ex.headline}</p>
                      </div>
                    ))}
                  </div>

                  {/* Consent toggle */}
                  <button
                    onClick={() => setAiPersonalization((v) => !v)}
                    className={`w-full flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 ${aiPersonalization ? "border-brand-dark bg-brand-dark text-white" : "border-brand-border bg-white hover:border-brand-dark/30"}`}
                  >
                    <div className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center mt-0.5 transition-all ${aiPersonalization ? "bg-white border-white" : "border-brand-border"}`}>
                      {aiPersonalization && <svg className="w-3 h-3 text-brand-dark" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${aiPersonalization ? "text-white" : "text-brand-text"}`}>Personalize my briefing with AI-curated sections</p>
                      <p className={`text-xs mt-1 leading-relaxed ${aiPersonalization ? "text-white/60" : "text-brand-muted"}`}>
                        I consent to Papertrail using AI to enrich my briefing. I can withdraw this at any time in preferences.
                      </p>
                    </div>
                  </button>
                  <p className="text-xs text-brand-subtle text-center mt-3">This is optional — you can skip and enable it later.</p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-10">
            {step > 1
              ? <button onClick={() => go(step - 1)} className="text-sm text-brand-muted hover:text-brand-text transition-colors flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>Back
                </button>
              : <Link href="/" className="text-sm text-brand-muted hover:text-brand-text transition-colors">← Home</Link>
            }

            <div className="flex items-center gap-3">
              {step === TOTAL && !aiPersonalization && (
                <button onClick={handleSubmit} disabled={submitting} className="text-sm text-brand-muted hover:text-brand-text transition-colors">
                  {submitting ? "Subscribing..." : "Skip & subscribe"}
                </button>
              )}
              {step < TOTAL ? (
                <motion.button
                  onClick={() => canProceed() && go(step + 1)}
                  disabled={!canProceed()}
                  className={`btn-primary text-xs py-3 px-6 ${!canProceed() ? "opacity-40 cursor-not-allowed" : ""}`}
                  whileHover={canProceed() ? { scale: 1.03 } : {}}
                  whileTap={canProceed() ? { scale: 0.97 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  Continue →
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`btn-primary text-xs py-3 px-6 ${submitting ? "opacity-60" : ""}`}
                  whileHover={!submitting ? { scale: 1.03 } : {}}
                  whileTap={!submitting ? { scale: 0.97 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {submitting ? "Subscribing..." : aiPersonalization ? "Subscribe with AI →" : "Subscribe free →"}
                </motion.button>
              )}
            </div>
          </div>
          {error && <p className="mt-4 text-sm text-red-500 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}
