"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const TOPICS_PREVIEW = [
  "World News", "US Politics", "Markets", "Business & Tech",
  "Science", "Health", "Sports", "Climate", "AI", "Crypto",
  "Space", "Personal Finance",
];

const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Pick your topics",
    body: "Choose from 25 categories — world news, markets, AI, sports, and more. Your briefing covers only what you care about.",
  },
  {
    number: "02",
    title: "Set your schedule",
    body: "Daily, every other day, 3× a week, or weekly. Your pace, your inbox.",
  },
  {
    number: "03",
    title: "Read in 5 minutes",
    body: "A clean, scannable briefing lands every morning. No filler. No algorithm. Just the stories that matter to you.",
  },
];

const ease = [0.19, 1, 0.22, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [heroEmail, setHeroEmail] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(heroEmail.trim());
    window.location.href = `/subscribe${encoded ? `?email=${encoded}` : ""}`;
  };

  return (
    <div className="bg-white text-brand-text">

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-brand-text">
            papertrail
          </Link>
          <div className="hidden sm:flex items-center gap-8">
            <Link href="/explore" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Explore</Link>
            <Link href="/catchup" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Catch Me Up</Link>
            <Link href="/settings" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Preferences</Link>
          </div>
          <Link href="/subscribe" className="btn-primary text-xs py-3 px-5">
            Subscribe Free
          </Link>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center pt-24 pb-20 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* Eyebrow */}
            <motion.p variants={fadeUp} className="label">
              Free daily news briefings
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-display-xl font-extrabold text-brand-text leading-none tracking-tightest max-w-4xl"
            >
              The morning briefing you&apos;ll actually read.
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              className="text-xl text-brand-muted max-w-xl leading-relaxed"
            >
              Personalized 5-minute news in your inbox every morning.
              Pick your topics. Choose your pace. Read or listen.
            </motion.p>

            {/* Email CTA */}
            <motion.form
              variants={fadeUp}
              onSubmit={handleHeroSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg"
            >
              <input
                type="email"
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-clean flex-1"
              />
              <motion.button
                type="submit"
                className="btn-primary flex-shrink-0"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Get started free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.button>
            </motion.form>

            <motion.p variants={fadeUp} className="text-xs text-brand-subtle">
              No credit card. No spam. Unsubscribe anytime.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats strip ─────────────────────────────────────── */}
      <section className="bg-brand-dark text-white py-10 px-6 sm:px-10">
        <AnimatedSection className="max-w-5xl mx-auto grid grid-cols-3 gap-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          {[
            ["5 min", "average read time"],
            ["25+", "topic categories"],
            ["100%", "free forever"],
          ].map(([stat, label]) => (
            <motion.div key={label} variants={fadeUp}>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">{stat}</div>
              <div className="text-sm text-white/50 mt-0.5 font-medium">{label}</div>
            </motion.div>
          ))}
        </AnimatedSection>
      </section>

      {/* ── Topics preview ──────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-10 bg-brand-section">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <motion.p variants={fadeUp} className="label mb-4">25 topics to choose from</motion.p>
            <motion.h2 variants={fadeUp} className="text-display-md font-bold text-brand-text mb-10 max-w-xl">
              Only the news you actually care about.
            </motion.h2>
            <motion.div variants={stagger} className="flex flex-wrap gap-2 mb-10">
              {TOPICS_PREVIEW.map((topic) => (
                <motion.span
                  key={topic}
                  variants={fadeUp}
                  className="px-4 py-2 rounded-full border border-brand-border bg-white text-sm font-medium text-brand-muted"
                >
                  {topic}
                </motion.span>
              ))}
              <motion.span variants={fadeUp}>
                <Link href="/subscribe" className="px-4 py-2 rounded-full bg-brand-dark text-white text-sm font-semibold inline-block hover:bg-neutral-800 transition-colors">
                  +13 more →
                </Link>
              </motion.span>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <motion.p variants={fadeUp} className="label mb-4">Simple by design</motion.p>
            <motion.h2 variants={fadeUp} className="text-display-md font-bold text-brand-text mb-16 max-w-xl">
              Up and running in under two minutes.
            </motion.h2>
            <motion.div variants={stagger} className="grid sm:grid-cols-3 gap-px bg-brand-border">
              {HOW_IT_WORKS.map((step) => (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  className="bg-white p-8 sm:p-10 flex flex-col gap-5"
                >
                  <span className="label text-brand-subtle">{step.number}</span>
                  <h3 className="text-xl font-bold text-brand-text leading-snug">{step.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{step.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Briefing preview ─────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-10 bg-brand-dark text-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="grid sm:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p variants={fadeUp} className="label-dark mb-4">What you get</motion.p>
              <motion.h2 variants={fadeUp} className="text-display-md font-bold text-white mb-6">
                Scannable, sharp, and done in 5 minutes.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/60 text-sm leading-relaxed mb-8">
                Each briefing covers your top story in depth, key market moves (if you follow them), 3–4 additional stories matched to your topics, and a quick closer. No fluff, no filler.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link href="/explore" className="btn-white text-xs py-3 px-5">
                  See sample editions →
                </Link>
              </motion.div>
            </div>

            {/* Mock briefing card */}
            <motion.div
              variants={fadeUp}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 text-sm space-y-5"
            >
              <div className="flex items-center gap-3 pb-5 border-b border-white/10">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">pt</div>
                <div>
                  <div className="font-semibold text-white text-xs">Papertrail</div>
                  <div className="text-white/40 text-xs">Your personalized briefing</div>
                </div>
                <div className="ml-auto text-white/30 text-xs font-mono">Today, 7:00 AM</div>
              </div>
              <p className="text-white/70 text-xs">Good morning — here&apos;s what you need to know.</p>
              {[
                ["THE BIG STORY", "Your lead story would appear here, 150–200 words, tailored to your topics."],
                ["MARKETS", "Key market movements — only if you follow Stocks & Markets."],
                ["IN OTHER NEWS", "3 more stories from your topics. Headline, summary, why it matters."],
              ].map(([heading, text]) => (
                <div key={heading}>
                  <p className="text-xs font-bold text-white/30 tracking-widest uppercase mb-1.5">{heading}</p>
                  <p className="text-white/60 text-xs leading-relaxed">{text}</p>
                </div>
              ))}
              <div className="pt-4 border-t border-white/10 text-white/30 text-xs">That&apos;s your morning. See you tomorrow.</div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── AI personalization ───────────────────────────────── */}
      <section className="py-24 px-6 sm:px-10 bg-white border-t border-brand-border">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="grid sm:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} className="space-y-3">
              {[
                { tag: "AI Curated · Because you follow Markets & AI", headline: "How AI trading algorithms shifted S&P 500 volatility this week" },
                { tag: "AI Curated · Trending in your topics", headline: "The semiconductor shortage quietly reshaping the next decade" },
                { tag: "AI Curated · You might have missed", headline: "Fed rate signals and what they mean for the housing markets you track" },
              ].map((ex) => (
                <div key={ex.headline} className="p-5 border border-brand-border rounded-xl hover:border-brand-text/30 transition-colors">
                  <p className="text-xs font-mono text-brand-subtle mb-1.5">{ex.tag}</p>
                  <p className="text-sm font-semibold text-brand-text leading-snug">{ex.headline}</p>
                </div>
              ))}
            </motion.div>
            <div>
              <motion.p variants={fadeUp} className="label mb-4">Optional AI personalization</motion.p>
              <motion.h2 variants={fadeUp} className="text-display-md font-bold text-brand-text mb-6">
                Let AI find what you didn&apos;t know you needed.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-brand-muted text-sm leading-relaxed mb-8">
                Opt in to AI-curated sections — stories that connect your topics, surface what&apos;s trending in your world, and find the pieces you would have missed. Always transparent. Always optional.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link href="/subscribe" className="btn-primary text-xs py-3 px-5">
                  Try it free →
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="py-32 px-6 sm:px-10 bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <motion.h2 variants={fadeUp} className="text-display-lg font-extrabold text-white mb-6 tracking-tightest">
              Start tomorrow morning.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-lg mb-12 max-w-lg mx-auto">
              Join Papertrail free. Your first briefing arrives tomorrow.
            </motion.p>
            <motion.form
              variants={fadeUp}
              onSubmit={handleHeroSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm outline-none focus:border-white/60 transition-colors"
              />
              <motion.button
                type="submit"
                className="btn-white text-xs py-3 px-6 flex-shrink-0"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Subscribe free →
              </motion.button>
            </motion.form>
            <motion.p variants={fadeUp} className="text-white/30 text-xs mt-4">
              No credit card. No spam. Unsubscribe anytime.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-brand-dark border-t border-white/10 py-10 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-sm font-bold text-white/70">papertrail</span>
          <div className="flex items-center gap-8">
            {[
              ["Explore", "/explore"],
              ["Catch Me Up", "/catchup"],
              ["Preferences", "/settings"],
              ["Subscribe", "/subscribe"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-xs text-white/40 hover:text-white/80 transition-colors link-underline">
                {label}
              </Link>
            ))}
          </div>
          <span className="text-xs text-white/30 font-mono">&copy; 2026 Papertrail</span>
        </div>
      </footer>
    </div>
  );
}
