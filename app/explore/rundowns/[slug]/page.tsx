import Link from "next/link";
import { notFound } from "next/navigation";
import { RUNDOWNS, getRundownBySlug } from "../../../lib/rundowns";

export async function generateStaticParams() {
  return RUNDOWNS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const edition = getRundownBySlug(params.slug);
  if (!edition) return {};
  return {
    title: `${edition.date} — Footnote Sample Edition`,
    description: `Sample Footnote briefing for ${edition.date}. ${edition.topStory}`,
  };
}

function parseInlineMarkdown(text: string): React.ReactNode[] {
  // Handle **bold** inline markdown
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-brand-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function RundownPage({ params }: { params: { slug: string } }) {
  const edition = getRundownBySlug(params.slug);
  if (!edition) notFound();

  const currentIndex = RUNDOWNS.findIndex((r) => r.slug === params.slug);
  const prevEdition = currentIndex < RUNDOWNS.length - 1 ? RUNDOWNS[currentIndex + 1] : null;
  const nextEdition = currentIndex > 0 ? RUNDOWNS[currentIndex - 1] : null;

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-brand-border/70 bg-brand-dark/88 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-brand-text tracking-tight">
            foot<span className="text-brand-accent">note</span>
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
              className="text-sm font-semibold px-5 py-2 rounded-full bg-brand-accent hover:bg-brand-accentHover text-white transition-smooth"
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
            <Link
              href="/explore"
              className="hover:text-brand-text transition-smooth"
            >
              Sample Editions
            </Link>
            <span className="text-brand-border">/</span>
            <span className="text-brand-text">{edition.shortDate}</span>
          </nav>

          {/* Sample disclaimer */}
          <div className="mb-8 flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50 text-sm text-amber-800">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span>
              This is a <strong>sample edition</strong> illustrating the Footnote briefing format. Real subscriber editions are personalized per reader and are not publicly archived.
            </span>
          </div>

          {/* Email-style briefing container */}
          <div className="rounded-2xl border border-brand-border bg-brand-card shadow-sm overflow-hidden">

            {/* Email header chrome */}
            <div className="px-7 pt-6 pb-5 border-b border-brand-border bg-brand-deeper">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-accent/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-accent font-bold text-sm">fn</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-brand-text text-sm">Footnote</div>
                    <div className="text-xs text-brand-muted">{edition.dayOfWeek}, 8:00 AM</div>
                  </div>
                  <div className="text-xs text-brand-muted">Your personalized morning briefing · {edition.date}</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {edition.topics.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-brand-card border border-brand-border text-brand-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Briefing content */}
            <div className="px-7 py-8 space-y-8">
              {edition.sections.map((section, i) => (
                <div key={i}>
                  {/* Section label */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-brand-accent uppercase tracking-widest">
                      {section.label}
                    </span>
                    <div className="flex-1 h-px bg-brand-border" />
                  </div>

                  {/* Section headline */}
                  {section.headline && (
                    <h2 className="font-display text-xl font-bold text-brand-text mb-3 leading-snug">
                      {section.headline}
                    </h2>
                  )}

                  {/* Section body — handle \n\n as paragraph breaks */}
                  <div className="space-y-4">
                    {section.body.split("\n\n").map((para, pi) => (
                      <p key={pi} className="text-sm text-brand-muted leading-relaxed">
                        {parseInlineMarkdown(para)}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Email footer chrome */}
            <div className="px-7 py-5 border-t border-brand-border bg-brand-deeper">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-xs text-brand-muted">
                  Footnote · Your personalized daily brief
                </p>
                <Link
                  href="/subscribe"
                  className="text-xs font-semibold text-brand-accent hover:text-brand-accentHover transition-smooth"
                >
                  Get this in your inbox →
                </Link>
              </div>
            </div>
          </div>

          {/* Edition navigation */}
          <div className="mt-10 flex items-center justify-between gap-4">
            {prevEdition ? (
              <Link
                href={`/explore/rundowns/${prevEdition.slug}`}
                className="group flex items-center gap-2 text-sm text-brand-muted hover:text-brand-text transition-smooth"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span>
                  <span className="block text-xs text-brand-muted mb-0.5">Older edition</span>
                  <span className="font-medium">{prevEdition.shortDate}</span>
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextEdition ? (
              <Link
                href={`/explore/rundowns/${nextEdition.slug}`}
                className="group flex items-center gap-2 text-sm text-brand-muted hover:text-brand-text transition-smooth text-right"
              >
                <span>
                  <span className="block text-xs text-brand-muted mb-0.5">Newer edition</span>
                  <span className="font-medium">{nextEdition.shortDate}</span>
                </span>
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Subscribe CTA */}
          <div className="mt-10 p-8 rounded-2xl border border-brand-border bg-brand-card text-center relative overflow-hidden">
            <div
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(217,74,10,0.12) 0%, transparent 70%)",
              }}
            />
            <div className="relative">
              <p className="font-display text-xl font-bold text-brand-text mb-2">
                Want this in your inbox every morning?
              </p>
              <p className="text-sm text-brand-muted mb-6 leading-relaxed max-w-sm mx-auto">
                Yours will be personalized to your topics, delivered on your schedule. Always free.
              </p>
              <Link
                href="/subscribe"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand-accent hover:bg-brand-accentHover text-white font-semibold text-sm transition-smooth glow"
              >
                Subscribe Free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <p className="mt-3 text-xs text-brand-muted">No credit card. Unsubscribe anytime.</p>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              href="/explore"
              className="text-sm text-brand-muted hover:text-brand-text transition-smooth inline-flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Explore
            </Link>
          </div>

        </div>
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
