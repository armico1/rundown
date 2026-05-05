"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const ease = [0.19, 1, 0.22, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const panelVariants = {
  hidden: { x: "100%" },
  show:   { x: 0, transition: { duration: 0.38, ease } },
  exit:   { x: "100%", transition: { duration: 0.28, ease } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [heroEmail, setHeroEmail] = useState("");
  const [scrolled,  setScrolled]  = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

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
    <div className="bg-brand-bg text-brand-text">

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled" : "bg-transparent"}`}>
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-brand-text" style={{ letterSpacing: "-0.025em" }}>
            KYN
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/subscribe" className="btn-nav">
              Start free
            </Link>
            <button
              onClick={() => setPanelOpen(true)}
              aria-label="Open menu"
              className="w-8 h-8 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-brand-border/70 transition-colors"
            >
              <span className="w-[15px] h-px bg-brand-text block" />
              <span className="w-[15px] h-px bg-brand-text block" />
              <span className="w-[15px] h-px bg-brand-text block" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 px-6 sm:px-10 overflow-hidden">
        {/* Aurora nebula — exact Lovable accent gradient colors, soft atmospheric */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute -top-[15%] -left-[5%] w-[90%] h-[130%]"
            style={{
              background: "linear-gradient(140deg, rgba(130,188,255,0.22) 0%, rgba(36,131,255,0.16) 25%, rgba(255,102,244,0.13) 48%, rgba(255,48,41,0.09) 66%, rgba(254,123,2,0.06) 82%, transparent 100%)",
              filter: "blur(72px)",
            }}
          />
        </div>

        <div className="max-w-[1280px] mx-auto w-full relative">
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5 max-w-2xl">

            {/* Pill badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-[5px] border border-brand-border rounded-full text-xs text-brand-muted font-medium" style={{ letterSpacing: "-0.01em" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-muted/50 flex-shrink-0" />
                Free · No credit card required
              </span>
            </motion.div>

            {/* Display headline — 60px scale, weight 600, -1.5px tracking */}
            <motion.h1
              variants={fadeUp}
              className="font-semibold text-brand-text"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 3.75rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}
            >
              Everything you follow.<br />Nothing you don&apos;t.
            </motion.h1>

            {/* Subheading — 20px scale, weight 400, -0.5px tracking */}
            <motion.p
              variants={fadeUp}
              className="text-brand-muted max-w-[420px]"
              style={{ fontSize: "1.125rem", lineHeight: 1.38, letterSpacing: "-0.025em" }}
            >
              Tell us what you follow. Wake up to a brief built around every single thing on your list — every morning, in your inbox.
            </motion.p>

            {/* Hero form — input uses shadow-subtle-2 from spec */}
            <motion.form variants={fadeUp} onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-[440px]">
              <input
                type="email"
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-hero flex-1"
              />
              <motion.button
                type="submit"
                className="btn-primary flex-shrink-0"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Build my brief
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.button>
            </motion.form>

            <motion.p variants={fadeUp} className="text-xs text-brand-subtle" style={{ letterSpacing: "-0.01em" }}>
              Free. No credit card. Unsubscribe anytime.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Niche examples ──────────────────────────────────── */}
      <section className="py-16 px-6 sm:px-10 border-t border-brand-border">
        <Section className="max-w-[1280px] mx-auto">
          <motion.div variants={stagger} className="grid sm:grid-cols-3 gap-3 mb-5">
            {[
              { niche: "Lakers",  update: "AD returns from ankle injury Tuesday. Reaves extension finalized. Next: vs. Warriors, Thursday." },
              { niche: "TSLA",    update: "Up 4.2% after delivery beat. Musk hints Model 2 reveal. BofA upgrades to Buy, PT $280." },
              { niche: "Bitcoin", update: "Crosses $72K on ETF inflow surge. BlackRock expands holdings by 18K BTC. Options market pricing further upside through month-end." },
            ].map(({ niche, update }) => (
              <motion.div
                key={niche}
                variants={fadeUp}
                className="p-5 border border-brand-border rounded-[16px]"
                style={{ boxShadow: "rgba(0,0,0,0.05) 0px 1px 2px 0px" }}
              >
                <p className="text-xs font-semibold text-brand-text uppercase tracking-widest mb-2.5">{niche}</p>
                <p className="text-sm text-brand-muted" style={{ lineHeight: 1.6 }}>{update}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} className="text-xs text-brand-subtle" style={{ letterSpacing: "-0.01em" }}>
            Not &ldquo;Sports.&rdquo; The Lakers. Not &ldquo;Markets.&rdquo; TSLA. You tell us what to cover.
          </motion.p>
        </Section>
      </section>

      {/* ── How it works ────────────────────────────────────── */}
      <section className="py-16 px-6 sm:px-10 border-t border-brand-border">
        <div className="max-w-[1280px] mx-auto">
          <Section>
            <motion.h2
              variants={fadeUp}
              className="font-semibold text-brand-text mb-8"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.25, letterSpacing: "-0.03em" }}
            >
              Up and running in three steps.
            </motion.h2>
            <motion.div variants={stagger} className="grid sm:grid-cols-3 gap-3">
              {[
                { n: "01", title: "Tell us what you follow", body: "Type in the teams, stocks, and people you follow. The more specific your list, the sharper your brief." },
                { n: "02", title: "Pick your schedule",      body: "Daily, a few times a week, or weekly. Arrives in your inbox on your schedule." },
                { n: "03", title: "Read in five minutes",    body: "A sharp, focused brief built around everything on your list. Yours, every morning." },
              ].map((s) => (
                <motion.div key={s.n} variants={fadeUp} className="p-5 border border-brand-border rounded-[16px] flex flex-col gap-4">
                  <span className="text-xs font-semibold text-brand-subtle uppercase tracking-widest">{s.n}</span>
                  <h3 className="text-sm font-semibold text-brand-text leading-snug" style={{ letterSpacing: "-0.02em" }}>{s.title}</h3>
                  <p className="text-sm text-brand-muted" style={{ lineHeight: 1.6 }}>{s.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="relative py-24 px-6 sm:px-10 bg-brand-dark text-white overflow-hidden border-t border-brand-border">
        {/* Gradient orb — decorative, not CTA color per spec */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[280px] blur-3xl rounded-full"
            style={{ background: "linear-gradient(90deg, rgba(36,131,255,0.20) 0%, rgba(255,102,244,0.16) 40%, rgba(255,48,41,0.12) 70%, rgba(254,123,2,0.08) 100%)" }}
          />
        </div>
        <div className="relative max-w-[1280px] mx-auto text-center">
          <Section>
            <motion.h2
              variants={fadeUp}
              className="font-semibold text-white mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.035em" }}
            >
              Your first brief lands tomorrow.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 mb-10 max-w-sm mx-auto text-sm" style={{ lineHeight: 1.6 }}>
              Tell us what you follow. Wake up to a brief that&apos;s actually about you.
            </motion.p>
            <motion.form variants={fadeUp} onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto">
              <input
                type="email"
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "28px",
                  letterSpacing: "-0.02em",
                  boxShadow: "rgba(0,0,0,0.12) 0px 0.5px 0px 0px inset, rgba(255,255,255,0.06) 0px 1px 0px 0px inset",
                }}
              />
              <motion.button
                type="submit"
                className="btn-white flex-shrink-0"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Start free →
              </motion.button>
            </motion.form>
            <motion.p variants={fadeUp} className="text-white/30 text-xs mt-4" style={{ letterSpacing: "-0.01em" }}>No card needed. Cancel anytime.</motion.p>
          </Section>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-brand-dark py-8 px-6 sm:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-semibold text-white/70" style={{ letterSpacing: "-0.02em" }}>KYN</span>
          <div className="flex items-center gap-6">
            <Link href="/explore"   className="text-xs text-white/40 hover:text-white/70 transition-colors">Explore</Link>
            <Link href="/catchup"   className="text-xs text-white/40 hover:text-white/70 transition-colors">Catch Up</Link>
            <Link href="/settings"  className="text-xs text-white/40 hover:text-white/70 transition-colors">Preferences</Link>
            <Link href="/subscribe" className="text-xs text-white/40 hover:text-white/70 transition-colors">Subscribe</Link>
          </div>
          <span className="text-xs text-white/25 font-mono">&copy; 2026 KYN</span>
        </div>
      </footer>

      {/* ── Slide-in Nav Panel ───────────────────────────────── */}
      <AnimatePresence>
        {panelOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/12 backdrop-blur-sm"
              onClick={() => setPanelOpen(false)}
            />

            <motion.div
              key="panel"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed top-0 right-0 h-full z-50 w-[280px] bg-brand-bg flex flex-col"
              style={{ boxShadow: "oklab(0 0 0 / 0.08) 0px 0px 0px 1px, rgba(0,0,0,0.10) 0px 20px 25px -5px, rgba(0,0,0,0.10) 0px 8px 10px -6px" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border flex-shrink-0">
                <span className="text-sm font-semibold text-brand-text" style={{ letterSpacing: "-0.025em" }}>KYN</span>
                <button
                  onClick={() => setPanelOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-brand-border/70 transition-colors text-brand-muted"
                  aria-label="Close menu"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 p-2">
                {[
                  { href: "/explore",  label: "Explore",     desc: "Blog, sample editions, and more." },
                  { href: "/catchup",  label: "Catch Up",    desc: "Missed a few days? Get a quick recap." },
                  { href: "/settings", label: "Preferences", desc: "Manage your brief and delivery settings." },
                ].map(({ href, label, desc }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setPanelOpen(false)}
                    className="flex items-center justify-between p-4 rounded-[12px] hover:bg-brand-border/50 transition-colors group"
                  >
                    <div>
                      <p className="font-medium text-brand-text text-sm" style={{ letterSpacing: "-0.02em" }}>{label}</p>
                      <p className="text-xs text-brand-muted mt-0.5" style={{ letterSpacing: "-0.01em" }}>{desc}</p>
                    </div>
                    <svg
                      className="w-3.5 h-3.5 text-brand-subtle group-hover:text-brand-text group-hover:translate-x-0.5 transition-all flex-shrink-0"
                      fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <div className="p-4 border-t border-brand-border flex-shrink-0">
                <Link
                  href="/subscribe"
                  onClick={() => setPanelOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Start free
                </Link>
                <p className="text-center text-xs text-brand-subtle mt-3" style={{ letterSpacing: "-0.01em" }}>No card needed. Cancel anytime.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
