"use client";

import Link from "next/link";
import { useState } from "react";
import { BLOG_POSTS } from "../lib/blog";
import { RUNDOWNS } from "../lib/rundowns";

type Tab = "blog" | "rundowns" | "podcast" | "reviews";

const TABS: { id: Tab; label: string }[] = [
  { id: "blog", label: "Blog" },
  { id: "rundowns", label: "Sample Editions" },
  { id: "podcast", label: "Podcast" },
  { id: "reviews", label: "Reviews" },
];

const PODCAST_PLATFORMS = [
  { name: "Spotify", url: "#" },
  { name: "Apple Podcasts", url: "#" },
  { name: "Amazon Music", url: "#" },
  { name: "Overcast", url: "#", badge: "iOS Only" },
  { name: "Pocket Casts", url: "#" },
  { name: "RSS Feed", url: "#" },
];

export default function Explore() {
  const [tab, setTab] = useState<Tab>("blog");

  return (
    <div className="bg-white text-brand-text min-h-screen">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-brand-text">
            KYN
          </Link>
          <div className="hidden sm:flex items-center gap-8">
            <Link href="/explore" className="text-sm font-semibold text-brand-text link-underline">Explore</Link>
            <Link href="/catchup" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Catch Me Up</Link>
            <Link href="/settings" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Preferences</Link>
          </div>
          <Link href="/subscribe" className="btn-primary text-xs py-3 px-5">Subscribe Free</Link>
        </div>
      </nav>

      {/* Page header */}
      <div className="pt-32 pb-16 px-6 sm:px-10 border-b border-brand-border">
        <div className="max-w-5xl mx-auto">
          <p className="label mb-4">Read · Listen · Discover</p>
          <h1 className="text-display-md font-bold text-brand-text mb-4">
            Explore KYN
          </h1>
          <p className="text-brand-muted max-w-xl leading-relaxed">
            Stories from the team, past editions to catch up on, podcast episodes, and what our readers are saying.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[73px] z-40 bg-white border-b border-brand-border">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  tab === t.id
                    ? "border-brand-dark text-brand-text font-semibold"
                    : "border-transparent text-brand-muted hover:text-brand-text"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 min-h-[60vh]">

        {/* BLOG */}
        {tab === "blog" && (
          <div>
            {(() => {
              const post = BLOG_POSTS.find((p) => p.featured)!;
              return (
                <Link
                  href={`/blog/${post.slug}`}
                  className="block mb-12 p-8 border border-brand-border rounded-2xl hover:border-brand-dark/30 transition-colors group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-brand-border bg-brand-section text-brand-muted">
                          {post.category}
                        </span>
                        <span className="text-xs text-brand-subtle">{post.date}</span>
                        <span className="text-brand-border text-xs">·</span>
                        <span className="text-xs text-brand-subtle">{post.readTime}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-brand-text mb-3 leading-snug group-hover:text-brand-muted transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-brand-muted leading-relaxed max-w-2xl">{post.excerpt}</p>
                    </div>
                    <div className="sm:ml-8 flex-shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-text group-hover:gap-3 transition-all">
                        Read more
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })()}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BLOG_POSTS.filter((p) => !p.featured).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border border-brand-border rounded-xl p-6 flex flex-col hover:border-brand-dark/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-brand-border bg-brand-section text-brand-muted">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-text mb-2 leading-snug group-hover:text-brand-muted transition-colors flex-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-brand-subtle pt-4 border-t border-brand-border mt-auto">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SAMPLE EDITIONS */}
        {tab === "rundowns" && (
          <div>
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-brand-text mb-1">Sample Editions</h2>
                <p className="text-brand-muted text-sm">Example briefings showing the format and topics KYN covers.</p>
              </div>
              <Link href="/catchup" className="hidden sm:flex btn-secondary text-xs py-2.5 px-5 gap-2">
                Custom catch-up
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="mb-6 flex items-start gap-3 p-4 border border-brand-border rounded-xl bg-brand-section text-sm text-brand-muted">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-brand-subtle" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              These are illustrative sample briefings to show what KYN delivers. Real subscriber editions are personalized per reader and not publicly archived.
            </div>

            <div className="space-y-3">
              {RUNDOWNS.map((run) => (
                <Link
                  key={run.slug}
                  href={`/explore/rundowns/${run.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 p-6 border border-brand-border rounded-xl hover:border-brand-dark/30 transition-colors"
                >
                  <div className="flex-shrink-0 text-center sm:w-16">
                    <div className="text-2xl font-extrabold text-brand-text leading-none">{run.shortDate.split(" ")[1]}</div>
                    <div className="text-xs text-brand-subtle mt-0.5">{run.shortDate.split(" ")[0]}</div>
                  </div>
                  <div className="w-px bg-brand-border hidden sm:block self-stretch" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-text leading-snug mb-2 group-hover:text-brand-muted transition-colors line-clamp-2">
                      {run.topStory}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {run.topics.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-brand-section border border-brand-border text-brand-subtle">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-medium text-brand-text opacity-0 group-hover:opacity-100 transition-opacity">
                      View →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 p-8 border border-brand-border rounded-2xl text-center bg-brand-section">
              <p className="font-semibold text-brand-text mb-1">Want a personalized recap instead?</p>
              <p className="text-sm text-brand-muted mb-6">Tell us your topics and we&apos;ll build a custom catch-up for you.</p>
              <Link href="/catchup" className="btn-primary text-xs py-3 px-6">
                Catch Me Up
              </Link>
            </div>
          </div>
        )}

        {/* PODCAST */}
        {tab === "podcast" && (
          <div>
            <div className="mb-10 flex items-start gap-4 p-5 rounded-xl border border-brand-border bg-brand-section">
              <svg className="w-5 h-5 text-brand-subtle flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-brand-text">Podcast coming soon</p>
                <p className="text-sm text-brand-muted mt-0.5">
                  The KYN audio briefing is in development. Subscribe to be notified at launch. The episode previews below are illustrative only.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-brand-text mb-2">Subscribe &amp; Listen</h3>
            <p className="text-sm text-brand-muted mb-6">Links go live at launch. Subscribe to KYN to be notified.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
              {PODCAST_PLATFORMS.map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center gap-3 p-4 rounded-xl border border-brand-border bg-brand-section opacity-50 cursor-not-allowed"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-brand-text">{platform.name}</div>
                    {platform.badge && <div className="text-xs text-brand-subtle">{platform.badge}</div>}
                  </div>
                  <span className="text-xs text-brand-subtle flex-shrink-0">Soon</span>
                </div>
              ))}
            </div>

            <div className="p-8 border border-brand-border rounded-2xl text-center bg-brand-section">
              <p className="font-bold text-brand-text mb-1">Get notified at launch</p>
              <p className="text-sm text-brand-muted mb-6">Subscribe to KYN and you&apos;ll be the first to know when audio briefings go live.</p>
              <Link href="/subscribe" className="btn-primary text-xs py-3 px-6">
                Subscribe Free
              </Link>
            </div>
          </div>
        )}

        {/* REVIEWS */}
        {tab === "reviews" && (
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-20 h-20 bg-brand-section border border-brand-border rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-9 h-9 text-brand-subtle" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-brand-text mb-3">No reviews yet — be the first</h2>
            <p className="text-brand-muted leading-relaxed mb-8">
              KYN is newly launched. Once you&apos;ve tried it, we&apos;d love to hear what you think. Only real subscriber feedback appears here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/subscribe" className="btn-primary text-xs py-3 px-6">
                Try KYN free
              </Link>
              <a
                href="mailto:hello@KYN.news?subject=My KYN Review"
                className="btn-secondary text-xs py-3 px-6"
              >
                Submit a review
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-brand-dark border-t border-white/10 py-10 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-sm font-bold text-white/70">KYN</span>
          <div className="flex items-center gap-8">
            {[["Explore","/explore"],["Catch Me Up","/catchup"],["Preferences","/settings"],["Subscribe","/subscribe"]].map(([label,href])=>(
              <Link key={href} href={href} className="text-xs text-white/40 hover:text-white/80 transition-colors link-underline">{label}</Link>
            ))}
          </div>
          <span className="text-xs text-white/30 font-mono">&copy; 2026 KYN</span>
        </div>
      </footer>
    </div>
  );
}
