import Link from "next/link";
import { notFound } from "next/navigation";
import { RUNDOWNS, getRundownBySlug } from "../../../lib/rundowns";

export async function generateStaticParams() {
  return RUNDOWNS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const edition = getRundownBySlug(slug);
  if (!edition) return {};
  return {
    title: `${edition.shortDate} Sample Edition`,
    description: `Sample KYN briefing for ${edition.date}: ${edition.topStory}`,
    openGraph: {
      title: `${edition.shortDate} Sample Edition`,
      description: edition.topStory,
      type: "article",
      publishedTime: edition.date,
    },
    alternates: { canonical: `https://kyn.news/explore/rundowns/${slug}` },
  };
}

function parseInlineMarkdown(text: string): React.ReactNode[] {
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

export default async function RundownPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const edition = getRundownBySlug(slug);
  if (!edition) notFound();

  const currentIndex = RUNDOWNS.findIndex((r) => r.slug === slug);
  const prevEdition = currentIndex < RUNDOWNS.length - 1 ? RUNDOWNS[currentIndex + 1] : null;
  const nextEdition = currentIndex > 0 ? RUNDOWNS[currentIndex - 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: edition.topStory,
    description: `Sample KYN briefing for ${edition.date}. ${edition.topStory}`,
    author: { "@type": "Organization", name: "KYN", url: "https://kyn.news" },
    publisher: { "@type": "Organization", name: "KYN", url: "https://kyn.news" },
    datePublished: edition.date,
    url: `https://kyn.news/explore/rundowns/${slug}`,
    keywords: edition.topics.join(", "),
  };

  return (
    <div className="bg-white text-brand-text min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-brand-text">
            KYN
          </Link>
          <div className="hidden sm:flex items-center gap-8">
            <Link href="/explore" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Explore</Link>
            <Link href="/catchup" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Catch Up</Link>
            <Link href="/settings" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Preferences</Link>
          </div>
          <Link href="/subscribe" className="btn-primary text-xs py-3 px-5">Start free</Link>
        </div>
      </nav>

      <div className="pt-28 pb-24 px-6 sm:px-10">
        <div className="max-w-2xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-brand-muted mb-10 flex-wrap">
            <Link href="/" className="hover:text-brand-text transition-colors">Home</Link>
            <span className="text-brand-border">/</span>
            <Link href="/explore" className="hover:text-brand-text transition-colors">Explore</Link>
            <span className="text-brand-border">/</span>
            <Link href="/explore" className="hover:text-brand-text transition-colors">Sample Editions</Link>
            <span className="text-brand-border">/</span>
            <span className="text-brand-text">{edition.shortDate}</span>
          </nav>

          {/* Disclaimer */}
          <div className="mb-8 flex items-start gap-3 p-4 rounded-xl border border-brand-border bg-brand-section text-sm text-brand-muted">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-brand-subtle" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span>
              This is a <strong className="text-brand-text">sample edition</strong> illustrating the KYN briefing format. Real subscriber editions are personalized per reader and are not publicly archived.
            </span>
          </div>

          {/* Email-style briefing card */}
          <div className="border border-brand-border rounded-2xl overflow-hidden">

            {/* Email header */}
            <div className="px-7 pt-6 pb-5 border-b border-brand-border bg-brand-section">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">pt</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-brand-text text-sm">KYN</div>
                    <div className="text-xs text-brand-subtle">{edition.dayOfWeek}, 8:00 AM</div>
                  </div>
                  <div className="text-xs text-brand-muted">Your personalized morning briefing · {edition.date}</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {edition.topics.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white border border-brand-border text-brand-subtle">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Briefing content */}
            <div className="px-7 py-8 space-y-8 bg-white">
              {edition.sections.map((section, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-brand-text uppercase tracking-widest">
                      {section.label}
                    </span>
                    <div className="flex-1 h-px bg-brand-border" />
                  </div>

                  {section.headline && (
                    <h2 className="text-xl font-bold text-brand-text mb-3 leading-snug">
                      {section.headline}
                    </h2>
                  )}

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

            {/* Email footer */}
            <div className="px-7 py-5 border-t border-brand-border bg-brand-section">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-xs text-brand-muted">
                  KYN · Your personalized daily brief
                </p>
                <Link
                  href="/subscribe"
                  className="text-xs font-semibold text-brand-text hover:text-brand-muted transition-colors link-underline"
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
                className="group flex items-center gap-2 text-sm text-brand-muted hover:text-brand-text transition-colors"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span>
                  <span className="block text-xs text-brand-subtle mb-0.5">Older edition</span>
                  <span className="font-medium">{prevEdition.shortDate}</span>
                </span>
              </Link>
            ) : <div />}

            {nextEdition ? (
              <Link
                href={`/explore/rundowns/${nextEdition.slug}`}
                className="group flex items-center gap-2 text-sm text-brand-muted hover:text-brand-text transition-colors text-right"
              >
                <span>
                  <span className="block text-xs text-brand-subtle mb-0.5">Newer edition</span>
                  <span className="font-medium">{nextEdition.shortDate}</span>
                </span>
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            ) : <div />}
          </div>

          {/* Subscribe CTA */}
          <div className="mt-10 p-8 border border-brand-border rounded-2xl text-center bg-brand-section">
            <p className="text-xl font-bold text-brand-text mb-2">
              Want this in your inbox every morning?
            </p>
            <p className="text-sm text-brand-muted mb-6 leading-relaxed max-w-sm mx-auto">
              Yours will be personalized to your topics, delivered on your schedule. Always free.
            </p>
            <Link href="/subscribe" className="btn-primary text-xs py-3 px-6">
              Subscribe free
            </Link>
            <p className="mt-3 text-xs text-brand-subtle">No credit card. Unsubscribe anytime.</p>
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              href="/explore"
              className="text-sm text-brand-muted hover:text-brand-text transition-colors inline-flex items-center gap-1.5"
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
