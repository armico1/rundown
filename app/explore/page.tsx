"use client";

import Link from "next/link";
import { useState } from "react";
import { BLOG_POSTS } from "../lib/blog";
import { RUNDOWNS } from "../lib/rundowns";

type Tab = "blog" | "rundowns" | "podcast" | "reviews";

const CATEGORY_COLORS: Record<string, string> = {
  "Behind the Product": "text-violet-700 bg-violet-50 border-violet-200",
  "Tips & Tricks": "text-amber-700 bg-amber-50 border-amber-200",
  Research: "text-blue-700 bg-blue-50 border-blue-200",
  Wellness: "text-green-700 bg-green-50 border-green-200",
  Community: "text-rose-700 bg-rose-50 border-rose-200",
};


const PODCAST_PLATFORMS = [
  {
    name: "Spotify",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
    color: "text-[#1DB954] bg-[#1DB954]/8 border-[#1DB954]/20 hover:bg-[#1DB954]/15",
    url: "#",
    badge: null,
  },
  {
    name: "Apple Podcasts",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12.003 0C5.376 0 0 5.372 0 11.997 0 18.626 5.376 24 12.003 24 18.63 24 24 18.626 24 11.997 24 5.372 18.63 0 12.003 0zm0 4.367c2.552 0 4.925.984 6.715 2.774a9.525 9.525 0 0 1 2.764 6.727c0 4.645-3.204 8.816-7.746 9.799a9.538 9.538 0 0 1-5.52-.526l.802-1.828a7.556 7.556 0 0 0 4.382.418c3.584-.777 6.13-3.988 6.13-7.857a7.542 7.542 0 0 0-7.527-7.52c-4.153 0-7.524 3.373-7.524 7.52 0 2.25.996 4.38 2.73 5.845l-1.262 1.554a9.511 9.511 0 0 1-3.43-7.4c0-5.25 4.274-9.506 9.486-9.506zm-.014 3.585a5.927 5.927 0 0 1 5.921 5.921 5.927 5.927 0 0 1-5.921 5.921 5.927 5.927 0 0 1-5.921-5.921 5.927 5.927 0 0 1 5.921-5.921zm0 2.07a3.853 3.853 0 0 0-3.85 3.851 3.853 3.853 0 0 0 3.85 3.85 3.853 3.853 0 0 0 3.851-3.85 3.853 3.853 0 0 0-3.851-3.851zm0 1.932a1.92 1.92 0 0 1 1.921 1.92 1.92 1.92 0 0 1-1.921 1.919 1.92 1.92 0 0 1-1.92-1.92 1.92 1.92 0 0 1 1.92-1.919z" />
      </svg>
    ),
    color: "text-[#9333EA] bg-[#9333EA]/8 border-[#9333EA]/20 hover:bg-[#9333EA]/15",
    url: "#",
    badge: null,
  },
  {
    name: "Amazon Music",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.685zm3.186 7.705a.66.66 0 0 1-.753.074c-1.056-.877-1.245-1.284-1.826-2.122-1.745 1.781-2.981 2.314-5.239 2.314-2.675 0-4.76-1.65-4.76-4.955 0-2.58 1.396-4.335 3.387-5.19 1.726-.76 4.14-.895 5.985-1.103v-.412c0-.756.059-1.649-.384-2.302-.385-.583-1.124-.824-1.778-.824-1.208 0-2.284.619-2.548 1.903-.053.284-.263.564-.55.578l-3.064-.33c-.261-.058-.549-.267-.475-.664C5.947 2.059 9.029 1 11.779 1c1.406 0 3.243.374 4.352 1.437 1.407 1.314 1.273 3.063 1.273 4.968v4.497c0 1.353.561 1.947 1.089 2.677.186.261.226.574-.01.769-.589.492-1.637 1.406-2.211 1.918l-.128-.471zM21.5 19.177c-3.127 2.321-7.659 3.553-11.558 3.553-5.473 0-10.394-2.023-14.116-5.39-.293-.264-.031-.623.321-.419 4.021 2.34 8.985 3.748 14.117 3.748 3.46 0 7.268-.72 10.773-2.208.529-.224.971.347.463.716zm1.327-1.51c-.398-.512-2.638-.241-3.646-.122-.305.037-.352-.23-.077-.423 1.787-1.257 4.718-.894 5.059-.472.34.424-.089 3.358-1.767 4.758-.258.216-.503.101-.388-.184.378-.944 1.218-3.043.819-3.557z" />
      </svg>
    ),
    color: "text-[#00A8E1] bg-[#00A8E1]/8 border-[#00A8E1]/20 hover:bg-[#00A8E1]/15",
    url: "#",
    badge: null,
  },
  {
    name: "Overcast",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3a7 7 0 1 0 0 14A7 7 0 0 0 12 5zm0 2a5 5 0 1 1 0 10A5 5 0 0 1 12 7zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-8.485.515a8.515 8.515 0 0 1 .985-3.985l1.73 1a6.515 6.515 0 0 0-.715 2.985H3.515zm0 1h2a6.515 6.515 0 0 0 .715 2.985l-1.73 1a8.515 8.515 0 0 1-.985-3.985zm16.97 0a8.515 8.515 0 0 1-.985 3.985l-1.73-1A6.515 6.515 0 0 0 20.485 13h2zm0-1h-2a6.515 6.515 0 0 0-.715-2.985l1.73-1a8.515 8.515 0 0 1 .985 3.985z" />
      </svg>
    ),
    color: "text-[#F97316] bg-orange-50 border-orange-200 hover:bg-orange-100",
    url: "#",
    badge: "iOS Only",
  },
  {
    name: "Pocket Casts",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm4.19 16.364A6.5 6.5 0 0 1 5.5 12a6.5 6.5 0 0 1 10.69-4.995l-1.411 1.41A4.5 4.5 0 0 0 7.5 12a4.5 4.5 0 0 0 7.28 3.52l1.41 1.844zm2.12 2.12l-1.41-1.843A8.5 8.5 0 0 0 12 3.5a8.5 8.5 0 0 0-6.9 13.141L3.686 18.055A10.5 10.5 0 0 1 12 1.5a10.5 10.5 0 0 1 8.314 4.055l-1.414 1.413A8.467 8.467 0 0 0 12 3.5z" />
      </svg>
    ),
    color: "text-[#F43F5E] bg-rose-50 border-rose-200 hover:bg-rose-100",
    url: "#",
    badge: null,
  },
  {
    name: "RSS Feed",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
      </svg>
    ),
    color: "text-brand-accent bg-brand-accent/8 border-brand-border hover:bg-brand-accent/15",
    url: "#",
    badge: null,
  },
];


const TABS: { id: Tab; label: string }[] = [
  { id: "blog", label: "Blog" },
  { id: "rundowns", label: "Past Rundowns" },
  { id: "podcast", label: "Podcast" },
  { id: "reviews", label: "Reviews" },
];

export default function Explore() {
  const [tab, setTab] = useState<Tab>("blog");

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-brand-border/70 bg-brand-dark/88 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-bold text-brand-text tracking-tight">
            paper<span className="text-brand-accent">trail</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/explore" className="text-sm font-medium text-brand-text transition-smooth">
              Explore
            </Link>
            <Link href="/catchup" className="text-sm text-brand-muted hover:text-brand-text transition-smooth">
              Catch Me Up
            </Link>
            <Link
              href="/subscribe"
              className="text-sm font-semibold px-5 py-2 bg-brand-accent hover:bg-brand-accentHover text-white transition-smooth" style={{ borderRadius: "2px" }}
            >
              Subscribe Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Page header */}
      <div className="ruled-bg relative pt-32 pb-16 px-6 overflow-hidden border-b border-brand-border">
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-brand-border bg-brand-card mb-6 shadow-sm font-mono text-xs text-brand-muted uppercase tracking-widest" style={{ borderRadius: "2px" }}>
            Read · Listen · Discover
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-brand-text leading-tight mb-4">
            Explore Papertrail
          </h1>
          <p className="text-lg text-brand-muted max-w-xl mx-auto leading-relaxed">
            Stories from the team, past editions to catch up on, podcast episodes, and what our readers are saying.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[65px] z-40 bg-brand-deeper border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto pt-3">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`notebook-tab ${tab === t.id ? "active" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-6xl mx-auto px-6 py-12 pb-24 ruled-lines min-h-[60vh]">

        {/* BLOG */}
        {tab === "blog" && (
          <div>
            {/* Featured post */}
            {(() => {
              const post = BLOG_POSTS.find((p) => p.featured)!;
              return (
                <Link href={`/blog/${post.slug}`} className="block mb-12 p-8 pt-12 index-card group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[post.category] || "text-brand-muted bg-brand-deeper border-brand-border"}`}>
                          {post.category}
                        </span>
                        <span className="text-xs text-brand-muted">{post.date}</span>
                        <span className="text-brand-border text-xs">·</span>
                        <span className="text-xs text-brand-muted">{post.readTime}</span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-text mb-3 leading-snug group-hover:text-brand-accent transition-smooth">
                        {post.title}
                      </h2>
                      <p className="text-brand-muted leading-relaxed max-w-2xl">{post.excerpt}</p>
                    </div>
                    <div className="sm:ml-8 flex-shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent group-hover:gap-3 transition-smooth">
                        Read more
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })()}

            {/* Grid of posts */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BLOG_POSTS.filter((p) => !p.featured).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group index-card p-6 pt-10 flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[post.category] || "text-brand-muted bg-brand-deeper border-brand-border"}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-brand-text mb-2 leading-snug group-hover:text-brand-accent transition-smooth flex-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-brand-muted pt-4 border-t border-brand-border mt-auto">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* PAST RUNDOWNS */}
        {tab === "rundowns" && (
          <div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-brand-text mb-1">Sample Editions</h2>
                <p className="text-brand-muted text-sm">Example briefings showing the format and topics Papertrail covers.</p>
              </div>
              <Link
                href="/catchup"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-brand-accent hover:bg-brand-accentHover text-white font-semibold text-sm transition-smooth flex-shrink-0" style={{ borderRadius: "2px" }}
              >
                Custom catch-up
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="mb-6 flex items-start gap-3 p-4 border border-brand-border bg-brand-deeper text-sm text-brand-muted" style={{ borderRadius: "2px" }}>
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-brand-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              These are illustrative sample briefings to show what Papertrail delivers. Real subscriber editions are personalized per reader and not publicly archived.
            </div>

            <div className="space-y-4">
              {RUNDOWNS.map((run) => (
                <Link
                  key={run.slug}
                  href={`/explore/rundowns/${run.slug}`}
                  className="group index-card flex flex-col sm:flex-row sm:items-center gap-4 p-6 pt-10"
                >
                  <div className="flex-shrink-0 text-center sm:w-16">
                    <div className="font-display text-2xl font-bold text-brand-accent leading-none">{run.shortDate.split(" ")[1]}</div>
                    <div className="text-xs text-brand-muted mt-0.5">{run.shortDate.split(" ")[0]}</div>
                  </div>
                  <div className="w-px bg-brand-border hidden sm:block self-stretch" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-text leading-snug mb-2 group-hover:text-brand-accent transition-smooth line-clamp-2">
                      {run.topStory}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {run.topics.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-brand-deeper border border-brand-border text-brand-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-medium text-brand-accent opacity-0 group-hover:opacity-100 transition-smooth">
                      View →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 p-6 index-card text-center">
              <p className="text-brand-muted text-sm mb-1">Want a personalized recap instead?</p>
              <p className="text-xs text-brand-muted mb-4">Tell us your topics and we&apos;ll build a custom catch-up for you.</p>
              <Link
                href="/catchup"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-accent hover:bg-brand-accentHover text-white font-semibold text-sm transition-smooth" style={{ borderRadius: "2px" }}
              >
                Catch Me Up
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {/* PODCAST */}
        {tab === "podcast" && (
          <div>
            {/* Coming soon banner */}
            <div className="mb-10 flex items-start gap-4 p-5 rounded-2xl border border-amber-200 bg-amber-50">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-amber-800">Podcast coming soon</p>
                <p className="text-sm text-amber-700 mt-0.5">
                  The Papertrail audio briefing is in development. Subscribe below to be notified at launch — the episode previews on this page are illustrative only and do not represent real episodes.
                </p>
              </div>
            </div>

            {/* Hero episode preview */}
            <div className="mb-12 p-8 rounded-2xl border border-brand-border bg-brand-card overflow-hidden relative opacity-60 pointer-events-none select-none">
              <div className="absolute top-3 right-3 z-10">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-700">Preview only</span>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                style={{ background: "radial-gradient(ellipse, rgba(217,74,10,0.1) 0%, transparent 70%)" }} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-brand-border" />
                  <span className="text-xs font-semibold text-brand-muted uppercase tracking-widest">Latest Episode</span>
                </div>
                <div className="sm:flex sm:items-start sm:gap-8">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-200 via-orange-300 to-rose-400 flex items-center justify-center flex-shrink-0 mb-4 sm:mb-0 shadow-md">
                    <span className="text-3xl font-bold text-white font-display italic">fn</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-bold text-brand-text mb-2 leading-snug">
                      Ep. 1 — What a Papertrail audio brief sounds like
                    </h2>
                    <p className="text-brand-muted text-sm leading-relaxed mb-4">
                      Each episode will cover your selected topics in under 7 minutes — the same personalized brief as the email, in audio form.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-border flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 translate-x-0.5 text-brand-muted" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 h-8 flex items-center gap-0.5">
                    {Array.from({ length: 60 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-brand-border rounded-full"
                        style={{ height: `${Math.sin(i * 0.4) * 50 + 55}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Subscribe on platforms */}
            <h3 className="font-display text-xl font-bold text-brand-text mb-2">Subscribe &amp; Listen</h3>
            <p className="text-sm text-brand-muted mb-6">Links will go live at launch. Subscribe to Papertrail to be notified.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
              {PODCAST_PLATFORMS.map((platform) => (
                <div
                  key={platform.name}
                  className={`flex items-center gap-3 p-4 rounded-xl border opacity-50 cursor-not-allowed ${platform.color}`}
                >
                  <div className="flex-shrink-0">{platform.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{platform.name}</div>
                    {platform.badge && (
                      <div className="text-xs opacity-70">{platform.badge}</div>
                    )}
                  </div>
                  <span className="text-xs text-brand-muted flex-shrink-0">Soon</span>
                </div>
              ))}
            </div>

            {/* Notify CTA */}
            <div className="p-6 index-card text-center">
              <p className="font-display text-lg font-bold text-brand-text mb-1">Get notified at launch</p>
              <p className="text-sm text-brand-muted mb-4">Subscribe to Papertrail and you&apos;ll be the first to know when audio briefings go live.</p>
              <Link
                href="/subscribe"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-accent hover:bg-brand-accentHover text-white font-semibold text-sm transition-smooth" style={{ borderRadius: "2px" }}
              >
                Subscribe Free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {/* REVIEWS */}
        {tab === "reviews" && (
          <div>
            {/* Empty state */}
            <div className="max-w-lg mx-auto text-center py-16">
              <div className="w-20 h-20 bg-brand-deeper border border-brand-border flex items-center justify-center mx-auto mb-6" style={{ borderRadius: "4px" }}>
                <svg className="w-9 h-9 text-brand-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-brand-text mb-3">No reviews yet — be the first</h2>
              <p className="text-brand-muted leading-relaxed mb-8">
                Papertrail is newly launched. Once you&apos;ve tried it, we&apos;d love to hear what you think. Reviews are published as they come in — only real subscriber feedback appears here.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/subscribe"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-accent hover:bg-brand-accentHover text-white font-semibold text-sm transition-smooth" style={{ borderRadius: "2px" }}
                >
                  Try Papertrail free
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <a
                  href="mailto:hello@papertrail.news?subject=My Papertrail Review"
                  className="inline-flex items-center gap-2 px-6 py-2.5 border border-brand-border text-brand-muted hover:border-brand-accent hover:text-brand-text font-semibold text-sm transition-smooth" style={{ borderRadius: "2px" }}
                >
                  Submit a review
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-brand-border/60 py-12 px-6 bg-brand-dark">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-brand-text">
              paper<span className="text-brand-accent">trail</span>
            </span>
            <span className="text-brand-border">·</span>
            <span className="text-sm text-brand-muted">&copy; 2026. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/explore" className="text-sm text-brand-muted hover:text-brand-text transition-smooth">Explore</Link>
            <Link href="/subscribe" className="text-sm text-brand-muted hover:text-brand-text transition-smooth">Subscribe</Link>
            <Link href="/catchup" className="text-sm text-brand-muted hover:text-brand-text transition-smooth">Catch Me Up</Link>
            <Link href="/settings" className="text-sm text-brand-muted hover:text-brand-text transition-smooth">Preferences</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
