"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const ease = [0.19, 1, 0.22, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const panelVariants = {
  hidden: { x: "100%" },
  show:   { x: 0, transition: { duration: 0.4, ease } },
  exit:   { x: "100%", transition: { duration: 0.3, ease } },
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
  const [heroEmail,  setHeroEmail]  = useState("");
  const [scrolled,   setScrolled]   = useState(false);
  const [panelOpen,  setPanelOpen]  = useState(false);

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
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-base font-extrabold tracking-tight text-brand-text">
            KYN
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/subscribe" className="btn-primary text-xs py-2.5 px-4">
              Start free
            </Link>
            <button
              onClick={() => setPanelOpen(true)}
              aria-label="Open menu"
              className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-brand-section transition-colors"
            >
              <span className="w-[18px] h-[1.5px] bg-brand-text rounded-full block" />
              <span className="w-[18px] h-[1.5px] bg-brand-text rounded-full block" />
              <span className="w-[18px] h-[1.5px] bg-brand-text rounded-full block" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
            <motion.h1 variants={fadeUp} className="text-display-lg font-extrabold text-brand-text leading-none tracking-tightest max-w-3xl">
              Everything you follow.<br />Nothing you don&apos;t.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-brand-muted max-w-md leading-relaxed">
              Tell us what you follow. Wake up to a brief built around every single thing on your list — every morning, in your inbox.
            </motion.p>
            <motion.form variants={fadeUp} onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
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
                Build my brief
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.button>
            </motion.form>
            <motion.p variants={fadeUp} className="text-xs text-brand-subtle">
              Free. No credit card. Unsubscribe anytime.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Niche examples ──────────────────────────────────── */}
      <section className="py-14 px-6 sm:px-10 bg-brand-section border-y border-brand-border">
        <Section className="max-w-4xl mx-auto">
          <motion.div variants={stagger} className="grid sm:grid-cols-3 gap-4 mb-5">
            {[
              { niche: "Lakers",  update: "AD returns from ankle injury Tuesday. Reaves extension finalized. Next: vs. Warriors, Thursday." },
              { niche: "TSLA",    update: "Up 4.2% after delivery beat. Musk hints Model 2 reveal. BofA upgrades to Buy, PT $280." },
              { niche: "Bitcoin", update: "Crosses $72K on ETF inflow surge. BlackRock expands holdings by 18K BTC. Options market pricing further upside through month-end." },
            ].map(({ niche, update }) => (
              <motion.div key={niche} variants={fadeUp} className="p-5 bg-white border border-brand-border rounded-xl">
                <p className="text-xs font-bold text-brand-text uppercase tracking-widest mb-2">{niche}</p>
                <p className="text-sm text-brand-muted leading-relaxed">{update}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} className="text-xs text-brand-subtle">
            Not &ldquo;Sports.&rdquo; The Lakers. Not &ldquo;Markets.&rdquo; TSLA. You tell us what to cover.
          </motion.p>
        </Section>
      </section>

      {/* ── How it works ────────────────────────────────────── */}
      <section className="py-16 px-6 sm:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <Section>
            <motion.h2 variants={fadeUp} className="text-display-md font-bold text-brand-text mb-10 max-w-xs leading-tight">
              Up and running in three steps.
            </motion.h2>
            <motion.div variants={stagger} className="grid sm:grid-cols-3 gap-px bg-brand-border">
              {[
                { n: "01", title: "Tell us what you follow", body: "Type in the teams, stocks, and people you follow. The more specific your list, the sharper your brief." },
                { n: "02", title: "Pick your schedule",      body: "Daily, a few times a week, or weekly. Arrives in your inbox on your schedule." },
                { n: "03", title: "Read in five minutes",    body: "A sharp, focused brief built around everything on your list. Yours, every morning." },
              ].map((s) => (
                <motion.div key={s.n} variants={fadeUp} className="bg-white p-7 flex flex-col gap-4">
                  <span className="label text-brand-subtle">{s.n}</span>
                  <h3 className="text-base font-bold text-brand-text leading-snug">{s.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{s.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-10 bg-brand-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Section>
            <motion.h2 variants={fadeUp} className="text-display-md font-extrabold text-white mb-4 tracking-tightest">
              Your first brief lands tomorrow.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 mb-10 max-w-sm mx-auto text-sm leading-relaxed">
              Tell us what you follow. Wake up to a brief that&apos;s actually about you.
            </motion.p>
            <motion.form variants={fadeUp} onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <input
                type="email"
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm outline-none focus:border-white/60 transition-colors"
              />
              <motion.button
                type="submit"
                className="btn-white text-xs py-3 px-5 flex-shrink-0"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Start free →
              </motion.button>
            </motion.form>
            <motion.p variants={fadeUp} className="text-white/30 text-xs mt-4">No card needed. Cancel anytime.</motion.p>
          </Section>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-brand-dark border-t border-white/10 py-8 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-extrabold text-white/70">KYN</span>
          <div className="flex items-center gap-6">
            <Link href="/explore"   className="text-xs text-white/40 hover:text-white/80 transition-colors link-underline">Explore</Link>
            <Link href="/catchup"   className="text-xs text-white/40 hover:text-white/80 transition-colors link-underline">Catch Up</Link>
            <Link href="/settings"  className="text-xs text-white/40 hover:text-white/80 transition-colors link-underline">Preferences</Link>
            <Link href="/subscribe" className="text-xs text-white/40 hover:text-white/80 transition-colors link-underline">Subscribe</Link>
          </div>
          <span className="text-xs text-white/30 font-mono">&copy; 2026 KYN</span>
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
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setPanelOpen(false)}
            />

            <motion.div
              key="panel"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed top-0 right-0 h-full z-50 w-full max-w-xs bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border flex-shrink-0">
                <span className="text-sm font-extrabold text-brand-text">KYN</span>
                <button
                  onClick={() => setPanelOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-brand-section transition-colors text-brand-subtle"
                  aria-label="Close menu"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
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
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-brand-section transition-colors group"
                  >
                    <div>
                      <p className="font-semibold text-brand-text text-sm">{label}</p>
                      <p className="text-xs text-brand-muted mt-0.5">{desc}</p>
                    </div>
                    <svg
                      className="w-4 h-4 text-brand-subtle group-hover:text-brand-text group-hover:translate-x-0.5 transition-all flex-shrink-0"
                      fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <div className="p-5 border-t border-brand-border flex-shrink-0">
                <Link
                  href="/subscribe"
                  onClick={() => setPanelOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Start free
                </Link>
                <p className="text-center text-xs text-brand-subtle mt-3">No card needed. Cancel anytime.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
