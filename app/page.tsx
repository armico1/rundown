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

const FEATURES = [
  {
    title: "Pick Your Topics",
    description: "Choose from 8 categories or add your own custom interests. Get only what matters to you.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
  },
  {
    title: "Choose Your Frequency",
    description: "Every day, every other day, 3x a week, or weekly. Your schedule, your pace.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: "Read or Listen",
    description: "Get your briefing as a quick email, a podcast episode, or both. Your format, your choice.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
  },
  {
    title: "Catch Me Up",
    description: "Missed a few days? One tap gives you the biggest stories you missed, personalized to your interests.",
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
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-brand-border/50 bg-brand-dark/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-tight">
              foot<span className="text-brand-accent">note</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/catchup" className="text-sm text-brand-muted hover:text-white transition-smooth">
              Catch Me Up
            </Link>
            <Link
              href="/subscribe"
              className="text-sm font-medium px-5 py-2 rounded-full bg-brand-accent hover:bg-brand-accentHover text-white transition-smooth"
            >
              Subscribe Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-border bg-brand-card/50 mb-8">
            <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse" />
            <span className="text-xs font-medium text-brand-muted uppercase tracking-wider">Free daily briefings</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
            Your daily news,<br />
            <span className="animated-gradient">your way.</span>
          </h1>

          <p className="text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Footnote delivers a personalized 5-minute news briefing every morning.
            Pick your topics, choose your frequency, read or listen.
            Just the stories that matter to you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/subscribe"
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-brand-accent hover:bg-brand-accentHover text-white font-semibold text-lg transition-smooth glow"
            >
              Get Started Free
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <span className="text-sm text-brand-muted">No credit card. Unsubscribe anytime.</span>
          </div>

          {/* Floating topic chips preview */}
          <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
            {TOPICS.map((topic) => (
              <div
                key={topic.id}
                onMouseEnter={() => setHoveredTopic(topic.id)}
                onMouseLeave={() => setHoveredTopic(null)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-smooth cursor-default ${
                  hoveredTopic === topic.id
                    ? "border-brand-accent bg-brand-accent/10 text-white"
                    : "border-brand-border bg-brand-card/50 text-brand-muted"
                }`}
              >
                <span>{topic.icon}</span>
                <span className="text-sm font-medium">{topic.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 border-t border-brand-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              News that fits your life
            </h2>
            <p className="text-brand-muted text-lg max-w-xl mx-auto">
              Stop doomscrolling. Start knowing what matters.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-brand-border bg-brand-card/30 hover:bg-brand-card/60 hover:border-brand-accent/30 transition-smooth"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-4 group-hover:bg-brand-accent/20 transition-smooth">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof / stats */}
      <section className="py-20 px-6 border-t border-brand-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              ["5 min", "Average read time"],
              ["8", "Topic categories"],
              ["100%", "Free forever"],
            ].map(([stat, label], i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat}</div>
                <div className="text-sm text-brand-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample newsletter preview */}
      <section className="py-24 px-6 border-t border-brand-border/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Here&apos;s what yours looks like
            </h2>
            <p className="text-brand-muted text-lg">
              A real preview based on today&apos;s news.
            </p>
          </div>

          <div className="rounded-2xl border border-brand-border bg-brand-card/50 p-8 glow">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-brand-border">
              <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center">
                <span className="text-brand-accent font-bold text-sm">fn</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Footnote</div>
                <div className="text-brand-muted text-xs">Your personalized briefing</div>
              </div>
              <div className="ml-auto text-xs text-brand-muted">Today, 8:00 AM</div>
            </div>

            <div className="space-y-6">
              <p className="text-brand-text">Good morning — here&apos;s what you need to know today.</p>

              <div>
                <h3 className="text-white font-bold mb-1">THE BIG STORY</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Your top story would appear here, tailored to the topics you selected.
                  150-250 words covering what happened, why it matters, and what&apos;s next.
                </p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-1">MARKETS TODAY</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Key market movements, earnings, economic data — only included if you select Stocks & Markets.
                </p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-1">IN OTHER NEWS</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  3-4 additional stories matching your chosen topics. Each one: headline, quick summary, why it matters.
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border text-sm text-brand-muted">
                That&apos;s your morning rundown. See you tomorrow.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 border-t border-brand-border/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Start your mornings informed
          </h2>
          <p className="text-brand-muted text-lg mb-8">
            Join Footnote and get the news that matters to you, delivered how you want it. Always free.
          </p>
          <Link
            href="/subscribe"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-accent hover:bg-brand-accentHover text-white font-semibold text-lg transition-smooth glow"
          >
            Subscribe Free
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-border/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-brand-muted">
            &copy; 2026 Footnote. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link href="/subscribe" className="text-sm text-brand-muted hover:text-white transition-smooth">Subscribe</Link>
            <Link href="/catchup" className="text-sm text-brand-muted hover:text-white transition-smooth">Catch Me Up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
