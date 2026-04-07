import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug, getRelatedPosts, type ContentBlock } from "../../lib/blog";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Papertrail`,
    description: post.excerpt,
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  "Behind the Product": "text-violet-700 bg-violet-50 border-violet-200",
  "Tips & Tricks": "text-amber-700 bg-amber-50 border-amber-200",
  Research: "text-blue-700 bg-blue-50 border-blue-200",
  Wellness: "text-green-700 bg-green-50 border-green-200",
  Community: "text-rose-700 bg-rose-50 border-rose-200",
};

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={index} className="text-brand-text/85 leading-[1.8] text-[1.0625rem]">
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2
          key={index}
          className="font-display text-2xl font-bold text-brand-text mt-10 mb-4 leading-snug"
        >
          {block.text}
        </h2>
      );
    case "subheading":
      return (
        <h3
          key={index}
          className="font-display text-xl font-semibold text-brand-text mt-8 mb-3 leading-snug"
        >
          {block.text}
        </h3>
      );
    case "quote":
      return (
        <blockquote
          key={index}
          className="my-8 pl-6 border-l-4 border-brand-accent"
        >
          <p className="font-display text-xl italic text-brand-text leading-relaxed mb-2">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <cite className="text-sm text-brand-muted not-italic font-medium">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );
    case "list":
      return (
        <ul key={index} className="space-y-2 my-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-brand-text/85 leading-relaxed text-[1.0625rem]">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "divider":
      return (
        <div key={index} className="my-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-brand-border" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-border" />
          <div className="flex-1 h-px bg-brand-border" />
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-brand-border/70 bg-brand-dark/88 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-bold text-brand-text tracking-tight">
            paper<span className="text-brand-accent">trail</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/explore" className="text-sm text-brand-muted hover:text-brand-text transition-smooth">
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

      <div className="pt-24 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-brand-muted mb-10">
            <Link href="/" className="hover:text-brand-text transition-smooth">Home</Link>
            <span className="text-brand-border">/</span>
            <Link href="/explore" className="hover:text-brand-text transition-smooth">Explore</Link>
            <span className="text-brand-border">/</span>
            <span className="text-brand-text truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  CATEGORY_COLORS[post.category] ?? "text-brand-muted bg-brand-deeper border-brand-border"
                }`}
              >
                {post.category}
              </span>
              <span className="text-xs text-brand-muted">{post.date}</span>
              <span className="text-brand-border">·</span>
              <span className="text-xs text-brand-muted">{post.readTime}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-[1.1] mb-6 tracking-tight">
              {post.title}
            </h1>

            <p className="text-lg text-brand-muted leading-relaxed border-l-2 border-brand-border pl-4">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 mt-8 pt-8 border-t border-brand-border">
              <div className="w-9 h-9 rounded-full bg-brand-accent/15 flex items-center justify-center flex-shrink-0">
                <span className="text-brand-accent font-bold text-xs">pt</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-brand-text">{post.author}</div>
                <div className="text-xs text-brand-muted">Published {post.date}</div>
              </div>
            </div>
          </header>

          {/* Divider */}
          <div className="horizon-line mb-12" style={{ height: "2px", background: "linear-gradient(90deg, transparent, rgba(189,208,228,0.8) 20%, rgba(189,208,228,1) 50%, rgba(189,208,228,0.8) 80%, transparent)" }} />

          {/* Body */}
          <article className="space-y-5 ruled-lines px-2 py-4" style={{ background: "rgba(253,252,242,0.6)", borderRadius: "2px" }}>
            {post.body.map((block, i) => renderBlock(block, i))}
          </article>

          {/* Tags / share */}
          <div className="mt-14 pt-8 border-t border-brand-border flex items-center justify-between flex-wrap gap-4">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                CATEGORY_COLORS[post.category] ?? "text-brand-muted bg-brand-deeper border-brand-border"
              }`}
            >
              {post.category}
            </span>
            <Link
              href="/explore"
              className="text-sm text-brand-muted hover:text-brand-text transition-smooth flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Explore
            </Link>
          </div>

          {/* Subscribe CTA */}
          <div className="mt-12 p-8 index-card overflow-hidden">
            <div />
            <div className="relative text-center">
              <div className="font-display text-xl font-bold text-brand-text mb-2">
                Enjoyed this? Get the daily brief.
              </div>
              <p className="text-sm text-brand-muted mb-6 max-w-sm mx-auto leading-relaxed">
                Papertrail delivers a 5-minute personalized news briefing every morning. Free, forever.
              </p>
              <Link
                href="/subscribe"
                className="inline-flex items-center gap-2 px-7 py-3 bg-brand-accent hover:bg-brand-accentHover text-white font-semibold text-sm transition-smooth glow" style={{ borderRadius: "2px" }}
              >
                Subscribe Free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-xl font-bold text-brand-text mb-6">More from the blog</h2>
              <div className="space-y-4">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group index-card flex items-start gap-4 p-5 pt-10"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                            CATEGORY_COLORS[rp.category] ?? "text-brand-muted bg-brand-deeper border-brand-border"
                          }`}
                        >
                          {rp.category}
                        </span>
                        <span className="text-xs text-brand-muted">{rp.readTime}</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-brand-text leading-snug group-hover:text-brand-accent transition-smooth line-clamp-2">
                        {rp.title}
                      </h3>
                    </div>
                    <svg
                      className="w-4 h-4 text-brand-muted group-hover:text-brand-accent group-hover:translate-x-0.5 transition-smooth flex-shrink-0 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
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
          </div>
        </div>
      </footer>
    </div>
  );
}
