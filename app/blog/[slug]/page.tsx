import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug, getRelatedPosts, type ContentBlock } from "../../lib/blog";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Papertrail`,
    description: post.excerpt,
  };
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={index} className="text-brand-muted leading-[1.8] text-[1.0625rem]">
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2 key={index} className="text-2xl font-bold text-brand-text mt-10 mb-4 leading-snug">
          {block.text}
        </h2>
      );
    case "subheading":
      return (
        <h3 key={index} className="text-xl font-semibold text-brand-text mt-8 mb-3 leading-snug">
          {block.text}
        </h3>
      );
    case "quote":
      return (
        <blockquote key={index} className="my-8 pl-6 border-l-4 border-brand-dark">
          <p className="text-xl italic text-brand-text leading-relaxed mb-2">
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
            <li key={i} className="flex items-start gap-3 text-brand-muted leading-relaxed text-[1.0625rem]">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-brand-dark flex-shrink-0" />
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

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);

  return (
    <div className="bg-white text-brand-text min-h-screen">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-brand-text">
            papertrail
          </Link>
          <div className="hidden sm:flex items-center gap-8">
            <Link href="/explore" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Explore</Link>
            <Link href="/catchup" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Catch Me Up</Link>
            <Link href="/settings" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Preferences</Link>
          </div>
          <Link href="/subscribe" className="btn-primary text-xs py-3 px-5">Subscribe Free</Link>
        </div>
      </nav>

      <div className="pt-28 pb-24 px-6 sm:px-10">
        <div className="max-w-2xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-brand-muted mb-10">
            <Link href="/" className="hover:text-brand-text transition-colors">Home</Link>
            <span className="text-brand-border">/</span>
            <Link href="/explore" className="hover:text-brand-text transition-colors">Explore</Link>
            <span className="text-brand-border">/</span>
            <span className="text-brand-text truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-brand-border bg-brand-section text-brand-muted">
                {post.category}
              </span>
              <span className="text-xs text-brand-subtle">{post.date}</span>
              <span className="text-brand-border">·</span>
              <span className="text-xs text-brand-subtle">{post.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-[1.1] mb-6 tracking-tight">
              {post.title}
            </h1>

            <p className="text-lg text-brand-muted leading-relaxed border-l-2 border-brand-border pl-4">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 mt-8 pt-8 border-t border-brand-border">
              <div className="w-9 h-9 rounded-full bg-brand-section flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-xs text-brand-text">pt</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-brand-text">{post.author}</div>
                <div className="text-xs text-brand-subtle">Published {post.date}</div>
              </div>
            </div>
          </header>

          <div className="divider mb-12" />

          {/* Body */}
          <article className="space-y-5">
            {post.body.map((block, i) => renderBlock(block, i))}
          </article>

          {/* Tags / back */}
          <div className="mt-14 pt-8 border-t border-brand-border flex items-center justify-between flex-wrap gap-4">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-brand-border bg-brand-section text-brand-muted">
              {post.category}
            </span>
            <Link
              href="/explore"
              className="text-sm text-brand-muted hover:text-brand-text transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Explore
            </Link>
          </div>

          {/* Subscribe CTA */}
          <div className="mt-12 p-8 border border-brand-border rounded-2xl text-center bg-brand-section">
            <div className="text-xl font-bold text-brand-text mb-2">
              Enjoyed this? Get the daily brief.
            </div>
            <p className="text-sm text-brand-muted mb-6 max-w-sm mx-auto leading-relaxed">
              Papertrail delivers a 5-minute personalized news briefing every morning. Free, forever.
            </p>
            <Link href="/subscribe" className="btn-primary text-xs py-3 px-6">
              Subscribe Free
            </Link>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold text-brand-text mb-6">More from the blog</h2>
              <div className="space-y-4">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group border border-brand-border rounded-xl flex items-start gap-4 p-5 hover:border-brand-dark/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-brand-border bg-brand-section text-brand-muted">
                          {rp.category}
                        </span>
                        <span className="text-xs text-brand-subtle">{rp.readTime}</span>
                      </div>
                      <h3 className="text-base font-bold text-brand-text leading-snug group-hover:text-brand-muted transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                    </div>
                    <svg
                      className="w-4 h-4 text-brand-subtle group-hover:text-brand-text group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
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
      <footer className="bg-brand-dark border-t border-white/10 py-10 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-sm font-bold text-white/70">papertrail</span>
          <div className="flex items-center gap-8">
            {[["Explore","/explore"],["Catch Me Up","/catchup"],["Preferences","/settings"],["Subscribe","/subscribe"]].map(([label,href])=>(
              <Link key={href} href={href} className="text-xs text-white/40 hover:text-white/80 transition-colors link-underline">{label}</Link>
            ))}
          </div>
          <span className="text-xs text-white/30 font-mono">&copy; 2026 Papertrail</span>
        </div>
      </footer>
    </div>
  );
}
