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

const TIMEFRAMES = [
  { id: "1", label: "Yesterday", desc: "What happened in the last 24 hours" },
  { id: "3", label: "Last 3 days", desc: "Quick weekend catch-up" },
  { id: "7", label: "Last week", desc: "The full week in review" },
];

interface CatchupStory {
  headline: string;
  summary: string;
  topic: string;
  date: string;
}

export default function CatchUp() {
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState("");
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState<CatchupStory[] | null>(null);
  const [error, setError] = useState("");

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const canSubmit = email.trim() && email.includes("@") && selectedTopics.length >= 1 && timeframe !== "";

  const handleCatchUp = async () => {
    setLoading(true);
    setError("");
    setStories(null);

    try {
      const res = await fetch("/api/catchup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          topics: selectedTopics,
          days: parseInt(timeframe),
        }),
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
    <div className="min-h-screen bg-brand-dark">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-brand-border/50 bg-brand-dark/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white tracking-tight">
            foot<span className="text-brand-accent">note</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/subscribe"
              className="text-sm font-medium px-5 py-2 rounded-full bg-brand-accent hover:bg-brand-accentHover text-white transition-smooth"
            >
              Subscribe Free
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-border bg-brand-card/50 mb-6">
              <svg className="w-4 h-4 text-brand-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <span className="text-xs font-medium text-brand-muted uppercase tracking-wider">Instant catch-up</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Catch Me Up
            </h1>
            <p className="text-lg text-brand-muted max-w-lg mx-auto leading-relaxed">
              Missed a few days? Tell us your topics and how far back to look.
              We&apos;ll build you a personalized recap in seconds.
            </p>
          </div>

          {!stories ? (
            <div className="space-y-10">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-brand-text mb-2">Your email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-card/50 text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-smooth"
                />
                <p className="text-xs text-brand-muted mt-1.5">We&apos;ll also send the recap to your inbox.</p>
              </div>

              {/* Topics */}
              <div>
                <label className="block text-sm font-medium text-brand-text mb-3">What topics?</label>
                <div className="grid grid-cols-2 gap-3">
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
              </div>

              {/* Timeframe */}
              <div>
                <label className="block text-sm font-medium text-brand-text mb-3">How far back?</label>
                <div className="space-y-3">
                  {TIMEFRAMES.map((tf) => (
                    <button
                      key={tf.id}
                      onClick={() => setTimeframe(tf.id)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-smooth ${
                        timeframe === tf.id
                          ? "chip-selected border-brand-accent"
                          : "border-brand-border bg-brand-card/30 hover:border-brand-accent/50"
                      }`}
                    >
                      <div>
                        <div className={`font-medium ${timeframe === tf.id ? "text-white" : "text-brand-text"}`}>
                          {tf.label}
                        </div>
                        <div className="text-sm text-brand-muted">{tf.desc}</div>
                      </div>
                      {timeframe === tf.id && (
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

              {/* Error */}
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              {/* Submit */}
              <div className="flex items-center justify-between">
                <Link href="/" className="text-sm text-brand-muted hover:text-white transition-smooth">
                  &larr; Home
                </Link>
                <button
                  onClick={handleCatchUp}
                  disabled={!canSubmit || loading}
                  className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-smooth ${
                    canSubmit && !loading
                      ? "bg-brand-accent hover:bg-brand-accentHover text-white glow"
                      : "bg-brand-border text-brand-muted cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Building your recap...
                    </>
                  ) : (
                    <>
                      Catch Me Up
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Results */
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-white">Your Catch-Up</h2>
                  <p className="text-sm text-brand-muted">
                    {stories.length} stories from the last {timeframe === "1" ? "24 hours" : timeframe === "3" ? "3 days" : "week"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setStories(null);
                    setError("");
                  }}
                  className="text-sm text-brand-accent hover:text-brand-accentHover transition-smooth"
                >
                  Start over
                </button>
              </div>

              {stories.length > 0 ? (
                <div className="space-y-4">
                  {stories.map((story, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl border border-brand-border bg-brand-card/30 hover:bg-brand-card/50 transition-smooth"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-brand-accent uppercase tracking-wider">
                          {TOPICS.find((t) => t.id === story.topic)?.label || story.topic}
                        </span>
                        <span className="text-brand-border">&middot;</span>
                        <span className="text-xs text-brand-muted">{story.date}</span>
                      </div>
                      <h3 className="text-white font-semibold mb-1.5">{story.headline}</h3>
                      <p className="text-sm text-brand-muted leading-relaxed">{story.summary}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-brand-muted">No stories found for the selected topics and timeframe.</p>
                </div>
              )}

              <div className="mt-10 p-5 rounded-2xl border border-brand-border bg-brand-card/30 text-center">
                <p className="text-brand-muted text-sm mb-3">
                  Want this delivered to your inbox automatically?
                </p>
                <Link
                  href="/subscribe"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-accent hover:bg-brand-accentHover text-white font-medium text-sm transition-smooth"
                >
                  Subscribe Free
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
