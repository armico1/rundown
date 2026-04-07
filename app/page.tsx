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

const FEATURES = [
  {
    title: "Pick Your Topics",
    description: "Choose from 25 categories or add your own. Get only what matters to you.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
  },
  {
    title: "Choose Your Frequency",
    description: "Every day, every other day, 3× a week, or weekly. Your schedule, your pace.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: "Read or Listen",
    description: "Get your briefing as a quick email, a podcast episode, or both.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
  },
  {
    title: "Catch Me Up",
    description: "Missed a few days? One tap gives you the biggest stories you missed.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

export default function Home() {
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);

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
            <Link
              href="/subscribe"
              className="text-sm font-semibold px-5 py-2 rounded-sm bg-brand-accent hover:bg-brand-accentHover text-white transition-smooth"
            >
              Subscribe Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="ruled-bg relative pt-36 pb-28 px-6 overflow-hidden border-b border-brand-border">
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-brand-border bg-brand-card shadow-sm"
            style={{ borderRadius: "2px" }}>
            <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse" />
            <span className="text-xs font-mono text-brand-muted uppercase tracking-widest">Free daily briefings</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-6xl sm:text-8xl font-bold text-brand-text leading-[1.05] mb-7">
            Your daily news,
            <br />
            <span className="text-brand-accent ink-underline">your way.</span>
          </h1>

          <p className="text-lg text-brand-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Papertrail delivers a personalized 5-minute news briefing every morning.
            Pick your topics, choose your frequency, read or listen.
            Just the stories that matter to you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/subscribe"
              className="group flex items-center gap-2.5 px-9 py-4 bg-brand-accent hover:bg-brand-accentHover text-white font-semibold text-lg transition-smooth glow"
              style={{ borderRadius: "2px" }}
            >
              Get Started Free
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <span className="text-sm text-brand-muted font-sans">No credit card. Unsubscribe anytime.</span>
          </div>

          {/* Topic index cards preview */}
          <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl mx-auto">
            {TOPICS.slice(0, 16).map((topic) => (
              <div
                key={topic.id}
                onMouseEnter={() => setHoveredTopic(topic.id)}
                onMouseLeave={() => setHoveredTopic(null)}
                className={`flex items-center gap-1.5 px-3 py-1.5 transition-smooth cursor-default ${
                  hoveredTopic === topic.id
                    ? "bg-brand-accent/10 border-brand-accent text-brand-text shadow-sm"
                    : "bg-brand-card border-brand-border text-brand-muted"
                }`}
                style={{ border: "1px solid", borderRadius: "2px", boxShadow: hoveredTopic === topic.id ? undefined : "1px 2px 4px rgba(0,0,0,0.06)" }}
              >
                <span className="text-sm">{topic.icon}</span>
                <span className="text-sm font-sans">{topic.label}</span>
              </div>
            ))}
            <Link
              href="/subscribe"
              className="flex items-center px-3 py-1.5 text-sm font-semibold text-brand-accent hover:text-brand-accentHover transition-smooth"
            >
              +9 more →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 border-b border-brand-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-text mb-4">
              News that fits your life
            </h2>
            <p className="text-brand-muted text-lg max-w-xl mx-auto font-sans">
              Stop doomscrolling. Start knowing what matters.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="index-card p-6 pt-10 group"
              >
                <div className="w-10 h-10 bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-4 group-hover:bg-brand-accent/20 transition-smooth"
                  style={{ borderRadius: "2px" }}>
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-brand-text mb-2">{feature.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed font-sans">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 border-b border-brand-border bg-brand-deeper ruled-lines">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              ["5 min", "Average read time"],
              ["25+", "Topic categories"],
              ["100%", "Free forever"],
            ].map(([stat, label], i) => (
              <div key={i}>
                <div className="font-display text-5xl sm:text-6xl font-bold text-brand-accent mb-1">{stat}</div>
                <div className="text-sm text-brand-muted font-sans">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter preview */}
      <section className="py-24 px-6 border-b border-brand-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-text mb-4">
              Here&apos;s what yours looks like
            </h2>
            <p className="text-brand-muted text-lg font-sans">
              This is the format and structure you&apos;ll receive each morning.
            </p>
          </div>

          {/* Index card mockup */}
          <div className="index-card pt-10 shadow-lg overflow-hidden">
            <div className="px-8 pb-6 pt-4 border-b border-brand-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-accent/15 flex items-center justify-center flex-shrink-0"
                  style={{ borderRadius: "2px" }}>
                  <span className="text-brand-accent font-display font-bold text-sm">pt</span>
                </div>
                <div>
                  <div className="text-brand-text font-semibold text-sm font-sans">Papertrail</div>
                  <div className="text-brand-muted text-xs font-sans">Your personalized briefing</div>
                </div>
                <div className="ml-auto text-xs text-brand-muted font-mono whitespace-nowrap">Today, 8:00 AM</div>
              </div>
            </div>

            <div className="px-8 py-7 ruled-lines space-y-6">
              <p className="text-brand-text/80 leading-relaxed font-sans">Good morning — here&apos;s what you need to know today.</p>

              <div>
                <h3 className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-2 font-sans">The Big Story</h3>
                <p className="text-sm text-brand-muted leading-relaxed font-sans">
                  Your top story would appear here, tailored to the topics you selected.
                  150–250 words covering what happened, why it matters, and what&apos;s next.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-2 font-sans">Markets Today</h3>
                <p className="text-sm text-brand-muted leading-relaxed font-sans">
                  Key market movements, earnings, economic data — only included if you select Stocks & Markets.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-2 font-sans">In Other News</h3>
                <p className="text-sm text-brand-muted leading-relaxed font-sans">
                  3–4 additional stories matching your chosen topics. Each one: headline, quick summary, why it matters.
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border text-sm text-brand-muted font-sans">
                That&apos;s your morning rundown. See you tomorrow. ✏️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-brand-deeper ruled-lines">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-text mb-4">
            Start your mornings informed
          </h2>
          <p className="text-brand-muted text-lg mb-8 leading-relaxed font-sans">
            Join Papertrail and get the news that matters to you, delivered how you want it. Always free.
          </p>
          <Link
            href="/subscribe"
            className="inline-flex items-center gap-2.5 px-9 py-4 bg-brand-accent hover:bg-brand-accentHover text-white font-semibold text-lg transition-smooth glow"
            style={{ borderRadius: "2px" }}
          >
            Subscribe Free
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

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
          </div>
        </div>
      </footer>
    </div>
  );
}
