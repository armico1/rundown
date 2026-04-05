"use client";

import Link from "next/link";
import { useState } from "react";

type Tab = "blog" | "rundowns" | "podcast" | "reviews";

const BLOG_POSTS = [
  {
    id: "why-we-built-footnote",
    category: "Behind the Product",
    title: "Why we built Footnote: the media diet problem",
    excerpt:
      "Most people want to stay informed. The problem isn't motivation — it's the firehose. We built Footnote because we were drowning too.",
    author: "The Footnote Team",
    date: "Mar 28, 2026",
    readTime: "4 min read",
    featured: true,
  },
  {
    id: "picking-topics",
    category: "Tips & Tricks",
    title: "How to pick the right topics for your morning brief",
    excerpt:
      "Start narrow, not wide. The readers who get the most value from Footnote pick 3–5 topics they genuinely care about, not 15.",
    author: "The Footnote Team",
    date: "Mar 21, 2026",
    readTime: "3 min read",
    featured: false,
  },
  {
    id: "science-of-5min",
    category: "Research",
    title: "The science behind the 5-minute news brief",
    excerpt:
      "Cognitive load research shows your brain absorbs short, structured summaries 40% better than long-form articles. Here's how we designed for that.",
    author: "The Footnote Team",
    date: "Mar 14, 2026",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: "bias-free-ai",
    category: "Behind the Product",
    title: "Our approach to summarization without the spin",
    excerpt:
      "AI summarization can amplify bias just as easily as reduce it. Here's the methodology we developed to keep our briefings as neutral as possible.",
    author: "The Footnote Team",
    date: "Mar 7, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "healthier-news",
    category: "Wellness",
    title: "Building a healthier relationship with the news",
    excerpt:
      "Doomscrolling is a real phenomenon with measurable mental health effects. How one intentional daily brief can break the cycle.",
    author: "The Footnote Team",
    date: "Feb 28, 2026",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: "community-mornings",
    category: "Community",
    title: "How 10,000 readers now start their mornings",
    excerpt:
      "We surveyed our most engaged readers. The results surprised us: the biggest change wasn't being more informed — it was feeling less anxious.",
    author: "The Footnote Team",
    date: "Feb 21, 2026",
    readTime: "3 min read",
    featured: false,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Behind the Product": "text-violet-700 bg-violet-50 border-violet-200",
  "Tips & Tricks": "text-amber-700 bg-amber-50 border-amber-200",
  Research: "text-blue-700 bg-blue-50 border-blue-200",
  Wellness: "text-green-700 bg-green-50 border-green-200",
  Community: "text-rose-700 bg-rose-50 border-rose-200",
};

const RUNDOWNS = [
  {
    date: "Saturday, April 5, 2026",
    shortDate: "Apr 5",
    topStory: "Global markets reacted sharply to new tariff announcements, with the S&P 500 sliding 2.1% in early trading.",
    topics: ["Stocks & Markets", "Global Economy", "US Politics"],
    editions: 847,
  },
  {
    date: "Friday, April 4, 2026",
    shortDate: "Apr 4",
    topStory: "A landmark climate agreement was signed by 40 nations, committing to net-zero emissions in the energy sector by 2040.",
    topics: ["Climate & Energy", "International Affairs", "World News"],
    editions: 912,
  },
  {
    date: "Thursday, April 3, 2026",
    shortDate: "Apr 3",
    topStory: "OpenAI unveiled its latest model, claiming significant advances in reasoning and coding benchmarks.",
    topics: ["Artificial Intelligence", "Business & Tech", "Science"],
    editions: 1043,
  },
  {
    date: "Wednesday, April 2, 2026",
    shortDate: "Apr 2",
    topStory: "The Federal Reserve held rates steady, signaling caution amid mixed economic signals from the labor market.",
    topics: ["Stocks & Markets", "US Economy", "Personal Finance"],
    editions: 889,
  },
  {
    date: "Tuesday, April 1, 2026",
    shortDate: "Apr 1",
    topStory: "A new study found that daily exercise reduces the risk of cognitive decline by 35% in adults over 50.",
    topics: ["Health & Wellness", "Science", "Research"],
    editions: 776,
  },
  {
    date: "Monday, March 31, 2026",
    shortDate: "Mar 31",
    topStory: "NASA confirmed the discovery of complex organic molecules in a Mars soil sample, reigniting the search for ancient life.",
    topics: ["Space", "Science", "World News"],
    editions: 1204,
  },
];

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

const REVIEWS = [
  {
    name: "Sarah M.",
    location: "New York, NY",
    rating: 5,
    date: "Apr 2, 2026",
    text: "I used to spend 45 minutes every morning scrolling through news apps, feeling anxious. Now I get my Footnote brief, spend 5 minutes, and I'm genuinely better informed. This is the product I didn't know I needed.",
    topics: ["World News", "US Politics", "Business & Tech"],
  },
  {
    name: "James K.",
    location: "Chicago, IL",
    rating: 5,
    date: "Mar 29, 2026",
    text: "The AI summaries are remarkably neutral. I've tested them against topics I know well and they consistently present multiple angles without editorializing. Rare in today's media landscape.",
    topics: ["Science", "Climate & Energy"],
  },
  {
    name: "Priya L.",
    location: "San Francisco, CA",
    rating: 5,
    date: "Mar 22, 2026",
    text: "Finally a news product for busy professionals. I added AI, crypto, and global economy — and every morning I walk into meetings knowing exactly what's relevant. My team has noticed.",
    topics: ["Artificial Intelligence", "Crypto & Web3", "Global Economy"],
  },
  {
    name: "Marcus T.",
    location: "Austin, TX",
    rating: 5,
    date: "Mar 15, 2026",
    text: "The podcast version is a game changer. I listen during my commute and arrive at work already caught up. The audio production is clean — feels like a real show, not text-to-speech.",
    topics: ["Sports", "Entertainment", "Health & Wellness"],
  },
  {
    name: "Rachel H.",
    location: "Boston, MA",
    rating: 4,
    date: "Mar 8, 2026",
    text: "Very impressed with the personalization. I cover a niche mix — space, law, and international affairs — and the briefs are accurate and well-sourced. One suggestion: add article links for deep dives.",
    topics: ["Space", "Law & Justice", "International Affairs"],
  },
  {
    name: "David W.",
    location: "Seattle, WA",
    rating: 5,
    date: "Feb 28, 2026",
    text: "My partner and I both subscribe with different topic sets. She focuses on arts and culture, I'm on markets and politics — and somehow each brief feels genuinely tailored. The personalization is real.",
    topics: ["Stocks & Markets", "US Politics"],
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? "text-amber-400" : "text-brand-border"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

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
          <Link href="/" className="text-xl font-bold text-brand-text tracking-tight">
            foot<span className="text-brand-accent">note</span>
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
              className="text-sm font-semibold px-5 py-2 rounded-full bg-brand-accent hover:bg-brand-accentHover text-white transition-smooth"
            >
              Subscribe Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Page header */}
      <div className="sunrise-hero relative pt-32 pb-16 px-6 overflow-hidden border-b border-brand-border/60">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(251,191,36,0.18) 0%, rgba(249,115,22,0.1) 40%, transparent 70%)" }} />
        <div className="horizon-line absolute bottom-0 left-0 right-0" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-border bg-brand-card mb-6 shadow-sm">
            <span className="text-xs font-medium text-brand-muted uppercase tracking-widest">Read · Listen · Discover</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-brand-text leading-tight mb-4">
            Explore Footnote
          </h1>
          <p className="text-lg text-brand-muted max-w-xl mx-auto leading-relaxed">
            Stories from the team, past editions to catch up on, podcast episodes, and what our readers are saying.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[65px] z-40 bg-brand-dark/95 backdrop-blur-md border-b border-brand-border/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-smooth ${
                  tab === t.id
                    ? "border-brand-accent text-brand-accent"
                    : "border-transparent text-brand-muted hover:text-brand-text hover:border-brand-border"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-6xl mx-auto px-6 py-14 pb-24">

        {/* BLOG */}
        {tab === "blog" && (
          <div>
            {/* Featured post */}
            {(() => {
              const post = BLOG_POSTS.find((p) => p.featured)!;
              return (
                <div className="mb-12 p-8 rounded-2xl border border-brand-border bg-brand-card card-warm group cursor-pointer">
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
                </div>
              );
            })()}

            {/* Grid of posts */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BLOG_POSTS.filter((p) => !p.featured).map((post) => (
                <div
                  key={post.id}
                  className="group p-6 rounded-2xl border border-brand-border bg-brand-card card-warm cursor-pointer flex flex-col"
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAST RUNDOWNS */}
        {tab === "rundowns" && (
          <div>
            <div className="flex items-start justify-between mb-10">
              <div>
                <h2 className="font-display text-2xl font-bold text-brand-text mb-1">Recent Editions</h2>
                <p className="text-brand-muted text-sm">Browse past daily briefings. Each edition was personalized for thousands of readers.</p>
              </div>
              <Link
                href="/catchup"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-accent hover:bg-brand-accentHover text-white font-semibold text-sm transition-smooth flex-shrink-0"
              >
                Custom catch-up
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="space-y-4">
              {RUNDOWNS.map((run, i) => (
                <div
                  key={i}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-2xl border border-brand-border bg-brand-card card-warm cursor-pointer"
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
                    <div className="text-xs text-brand-muted mb-1">{run.editions.toLocaleString()} editions sent</div>
                    <span className="text-xs font-medium text-brand-accent opacity-0 group-hover:opacity-100 transition-smooth">
                      View →
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-2xl border border-brand-border bg-brand-deeper text-center">
              <p className="text-brand-muted text-sm mb-1">Want a personalized recap instead?</p>
              <p className="text-xs text-brand-muted mb-4">Tell us your topics and we&apos;ll build a custom catch-up for you.</p>
              <Link
                href="/catchup"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-accent hover:bg-brand-accentHover text-white font-semibold text-sm transition-smooth"
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
            {/* Hero episode */}
            <div className="mb-12 p-8 rounded-2xl border border-brand-border bg-brand-card overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                style={{ background: "radial-gradient(ellipse, rgba(217,74,10,0.1) 0%, transparent 70%)" }} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                  <span className="text-xs font-semibold text-brand-accent uppercase tracking-widest">Latest Episode</span>
                </div>
                <div className="sm:flex sm:items-start sm:gap-8">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-200 via-orange-300 to-rose-400 flex items-center justify-center flex-shrink-0 mb-4 sm:mb-0 shadow-md">
                    <span className="text-3xl font-bold text-white font-display italic">fn</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-bold text-brand-text mb-2 leading-snug">
                      Ep. 42 — Markets rattle, AI milestone, and the Mars find
                    </h2>
                    <p className="text-brand-muted text-sm leading-relaxed mb-4">
                      Today&apos;s brief covers the sharp market reaction to tariff news, OpenAI&apos;s new model release, and NASA&apos;s remarkable Mars discovery — all in under 7 minutes.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-brand-muted">
                      <span>Apr 5, 2026</span>
                      <span className="text-brand-border">·</span>
                      <span>6 min 48 sec</span>
                    </div>
                  </div>
                </div>

                {/* Waveform / play button placeholder */}
                <div className="mt-6 flex items-center gap-4">
                  <button className="w-12 h-12 rounded-full bg-brand-accent hover:bg-brand-accentHover text-white flex items-center justify-center transition-smooth glow flex-shrink-0">
                    <svg className="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <div className="flex-1 h-8 flex items-center gap-0.5">
                    {Array.from({ length: 60 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-brand-border rounded-full"
                        style={{ height: `${Math.sin(i * 0.4) * 50 + 55}%`, opacity: i < 22 ? 1 : 0.4 }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-brand-muted flex-shrink-0">2:34 / 6:48</span>
                </div>
              </div>
            </div>

            {/* Subscribe on platforms */}
            <h3 className="font-display text-xl font-bold text-brand-text mb-6">Subscribe &amp; Listen</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
              {PODCAST_PLATFORMS.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  className={`group flex items-center gap-3 p-4 rounded-xl border transition-smooth ${platform.color}`}
                >
                  <div className="flex-shrink-0">{platform.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{platform.name}</div>
                    {platform.badge && (
                      <div className="text-xs opacity-70">{platform.badge}</div>
                    )}
                  </div>
                  <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-smooth flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Recent episodes */}
            <h3 className="font-display text-xl font-bold text-brand-text mb-6">Recent Episodes</h3>
            <div className="space-y-3">
              {[
                { ep: 42, title: "Markets rattle, AI milestone, and the Mars find", date: "Apr 5", duration: "6:48" },
                { ep: 41, title: "Climate deal, Fed holds rates, NCAA weekend recap", date: "Apr 4", duration: "7:12" },
                { ep: 40, title: "OpenAI's new model and what it means for your job", date: "Apr 3", duration: "8:01" },
                { ep: 39, title: "Middle East tensions, housing data, March Madness", date: "Apr 2", duration: "6:33" },
                { ep: 38, title: "A deep dive into the week's biggest science stories", date: "Mar 31", duration: "9:14" },
              ].map((ep) => (
                <div
                  key={ep.ep}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-brand-border bg-brand-card hover:bg-brand-deeper hover:border-brand-accent/30 transition-smooth cursor-pointer"
                >
                  <button className="w-9 h-9 rounded-full border border-brand-border group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-white text-brand-muted flex items-center justify-center transition-smooth flex-shrink-0">
                    <svg className="w-4 h-4 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <div className="flex-shrink-0 w-10 text-center">
                    <span className="text-xs font-bold text-brand-muted">Ep.{ep.ep}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-text leading-snug line-clamp-1 group-hover:text-brand-accent transition-smooth">
                      {ep.title}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 text-xs text-brand-muted">
                    <div>{ep.date}</div>
                    <div>{ep.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REVIEWS */}
        {tab === "reviews" && (
          <div>
            {/* Stats */}
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-12 p-8 rounded-2xl border border-brand-border bg-brand-card">
              <div className="text-center">
                <div className="font-display text-6xl font-bold text-brand-accent leading-none mb-2">4.9</div>
                <StarRating rating={5} />
                <div className="text-xs text-brand-muted mt-2">Average rating</div>
              </div>
              <div className="w-px bg-brand-border self-stretch hidden sm:block" />
              <div className="flex-1 space-y-2 w-full sm:w-auto">
                {[
                  { stars: 5, pct: 91 },
                  { stars: 4, pct: 7 },
                  { stars: 3, pct: 2 },
                  { stars: 2, pct: 0 },
                  { stars: 1, pct: 0 },
                ].map(({ stars, pct }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-xs text-brand-muted w-4 text-right flex-shrink-0">{stars}</span>
                    <svg className="w-3 h-3 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="flex-1 h-1.5 rounded-full bg-brand-border overflow-hidden">
                      <div className="h-full rounded-full bg-amber-400 transition-smooth" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-brand-muted w-7 flex-shrink-0">{pct}%</span>
                  </div>
                ))}
              </div>
              <div className="text-center sm:text-right">
                <div className="font-display text-3xl font-bold text-brand-text">10,482</div>
                <div className="text-xs text-brand-muted">total reviews</div>
                <div className="mt-4">
                  <Link
                    href="/subscribe"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-accent hover:bg-brand-accentHover text-white font-semibold text-xs transition-smooth"
                  >
                    Join them free
                  </Link>
                </div>
              </div>
            </div>

            {/* Review cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {REVIEWS.map((review, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-brand-border bg-brand-card card-warm flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold text-brand-text text-sm">{review.name}</div>
                      <div className="text-xs text-brand-muted">{review.location}</div>
                    </div>
                    <div className="text-right">
                      <StarRating rating={review.rating} />
                      <div className="text-xs text-brand-muted mt-1">{review.date}</div>
                    </div>
                  </div>
                  <p className="text-sm text-brand-muted leading-relaxed flex-1 mb-4">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-brand-border">
                    {review.topics.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-brand-deeper border border-brand-border text-brand-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit review CTA */}
            <div className="mt-10 p-6 rounded-2xl border border-brand-border bg-brand-deeper text-center">
              <p className="font-display text-lg font-bold text-brand-text mb-1">Love Footnote?</p>
              <p className="text-sm text-brand-muted mb-4">Share your experience and help other readers find us.</p>
              <a
                href="mailto:hello@footnote.news?subject=My Footnote Review"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white font-semibold text-sm transition-smooth"
              >
                Write a review
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-brand-border/60 py-12 px-6 bg-brand-dark">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-brand-text">
              foot<span className="text-brand-accent">note</span>
            </span>
            <span className="text-brand-border">·</span>
            <span className="text-sm text-brand-muted">&copy; 2026. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/explore" className="text-sm text-brand-muted hover:text-brand-text transition-smooth">Explore</Link>
            <Link href="/subscribe" className="text-sm text-brand-muted hover:text-brand-text transition-smooth">Subscribe</Link>
            <Link href="/catchup" className="text-sm text-brand-muted hover:text-brand-text transition-smooth">Catch Me Up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
