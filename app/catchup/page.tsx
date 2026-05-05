"use client";

import Link from "next/link";
import { useState } from "react";
import { NicheInput } from "../components/NicheInput";

const TIMEFRAMES = [
  { id: "1", label: "Yesterday",   desc: "What happened in the last 24 hours" },
  { id: "3", label: "Last 3 days", desc: "Quick weekend catch-up" },
  { id: "7", label: "Last week",   desc: "The full week in review" },
];

interface CatchupStory {
  headline: string;
  summary: string;
  niche: string;
  date: string;
}

export default function CatchUp() {
  const [email,     setEmail]     = useState("");
  const [niches,    setNiches]    = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState("");
  const [loading,   setLoading]   = useState(false);
  const [stories,   setStories]   = useState<CatchupStory[] | null>(null);
  const [error,     setError]     = useState("");

  const canSubmit = email.includes("@") && niches.length >= 1 && timeframe !== "";

  const handleCatchUp = async () => {
    setLoading(true);
    setError("");
    setStories(null);
    try {
      const res = await fetch("/api/catchup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, niches, days: parseInt(timeframe) }),
      });
      if (res.ok) {
        const data = await res.json();
        setStories(data.stories || []);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          <Link href="/" className="text-base font-extrabold tracking-tight text-brand-text">KYN</Link>
          <div className="hidden sm:flex items-center gap-8">
            <Link href="/explore" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Explore</Link>
            <Link href="/catchup" className="text-sm font-semibold text-brand-text link-underline">Catch Up</Link>
            <Link href="/settings" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Preferences</Link>
          </div>
          <Link href="/subscribe" className="btn-primary text-xs py-3 px-5">Start free</Link>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-6 sm:px-10">
        <div className="max-w-2xl mx-auto">

          <div className="mb-12">
            <p className="label mb-4">Instant catch-up</p>
            <h1 className="text-display-md font-bold text-brand-text mb-4">Catch Up</h1>
            <p className="text-lg text-brand-muted leading-relaxed">
              Missed a few days? Tell us your niche and how far back to look. We&apos;ll build a personalized recap in seconds.
            </p>
          </div>

          {!stories ? (
            <div className="space-y-10">

              <div>
                <label className="block text-sm font-semibold text-brand-text mb-2">Your email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-clean"
                />
                <p className="text-xs text-brand-subtle mt-2">We&apos;ll also send the recap to your inbox.</p>
              </div>

              <div>
                <p className="label mb-3">Your niche</p>
                <NicheInput value={niches} onChange={setNiches} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-text mb-3">How far back?</label>
                <div className="space-y-2">
                  {TIMEFRAMES.map((tf) => (
                    <button
                      key={tf.id}
                      onClick={() => setTimeframe(tf.id)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-colors ${
                        timeframe === tf.id
                          ? "bg-brand-dark border-brand-dark text-white"
                          : "border-brand-border bg-brand-bg hover:border-brand-dark"
                      }`}
                    >
                      <div>
                        <div className={`font-semibold text-sm ${timeframe === tf.id ? "text-white" : "text-brand-text"}`}>{tf.label}</div>
                        <div className={`text-xs ${timeframe === tf.id ? "text-white/60" : "text-brand-muted"}`}>{tf.desc}</div>
                      </div>
                      {timeframe === tf.id && (
                        <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex items-center justify-between">
                <Link href="/" className="text-sm text-brand-muted hover:text-brand-text transition-colors">← Home</Link>
                <button
                  onClick={handleCatchUp}
                  disabled={!canSubmit || loading}
                  className={`btn-primary ${(!canSubmit || loading) ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Building your catch-up…
                    </>
                  ) : (
                    <>
                      Catch up
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-brand-text">Your Catch-Up</h2>
                  <p className="text-sm text-brand-muted mt-0.5">
                    {stories.length} stories · {timeframe === "1" ? "last 24 hours" : timeframe === "3" ? "last 3 days" : "last week"}
                  </p>
                </div>
                <button
                  onClick={() => { setStories(null); setError(""); }}
                  className="text-sm text-brand-text hover:text-brand-muted transition-colors underline"
                >
                  Start over
                </button>
              </div>

              {stories.length > 0 ? (
                <div className="space-y-4">
                  {stories.map((story, i) => (
                    <div key={i} className="p-6 border border-brand-border rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-brand-text uppercase tracking-wider">{story.niche}</span>
                        <span className="text-brand-border">&middot;</span>
                        <span className="text-xs text-brand-subtle">{story.date}</span>
                      </div>
                      <h3 className="font-semibold text-brand-text mb-1.5 leading-snug">{story.headline}</h3>
                      <p className="text-sm text-brand-muted leading-relaxed">{story.summary}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-brand-border rounded-xl">
                  <p className="text-brand-muted">No stories found for your niche and timeframe.</p>
                </div>
              )}

              <div className="mt-10 p-8 border border-brand-border rounded-2xl text-center bg-brand-section">
                <p className="font-semibold text-brand-text mb-2">Get this daily, automatically.</p>
                <p className="text-sm text-brand-muted mb-6">Subscribe to KYN for a niche brief in your inbox every morning.</p>
                <Link href="/subscribe" className="btn-primary text-xs py-3 px-6">Start free</Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-brand-dark border-t border-white/10 py-10 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-sm font-bold text-white/70">KYN</span>
          <div className="flex items-center gap-8">
            {[["Explore","/explore"],["Catch Up","/catchup"],["Preferences","/settings"],["Subscribe","/subscribe"]].map(([label,href])=>(
              <Link key={href} href={href} className="text-xs text-white/40 hover:text-white/80 transition-colors link-underline">{label}</Link>
            ))}
          </div>
          <span className="text-xs text-white/30 font-mono">&copy; 2026 KYN</span>
        </div>
      </footer>
    </div>
  );
}
