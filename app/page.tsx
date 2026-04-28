"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { BLOG_POSTS } from "./lib/blog";
import { RUNDOWNS } from "./lib/rundowns";
import { NicheInput } from "./components/NicheInput";

type PanelTab = "explore" | "catchup" | "preferences";

interface CatchupStory {
  headline: string;
  summary: string;
  niche: string;
  date: string;
}

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

const PANEL_LABELS: Record<PanelTab, string> = {
  explore:     "Explore",
  catchup:     "Catch Up",
  preferences: "Preferences",
};

export default function Home() {
  const [heroEmail, setHeroEmail] = useState("");
  const [scrolled, setScrolled]   = useState(false);
  const [panel, setPanel]         = useState<PanelTab | null>(null);
  const [activeTab, setActiveTab] = useState<PanelTab>("explore");

  // Catch Up panel state
  const [cuNiches,    setCuNiches]    = useState<string[]>([]);
  const [cuEmail,     setCuEmail]     = useState("");
  const [cuTimeframe, setCuTimeframe] = useState("");
  const [cuLoading,   setCuLoading]   = useState(false);
  const [cuStories,   setCuStories]   = useState<CatchupStory[] | null>(null);
  const [cuError,     setCuError]     = useState("");

  // Preferences panel state
  const [prefNiches,    setPrefNiches]    = useState<string[]>([]);
  const [prefEmail,     setPrefEmail]     = useState("");
  const [prefFrequency, setPrefFrequency] = useState("daily");
  const [prefFormat,    setPrefFormat]    = useState("read");
  const [prefSaving,    setPrefSaving]    = useState(false);
  const [prefSaved,     setPrefSaved]     = useState(false);
  const [prefError,     setPrefError]     = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openPanel = (tab: PanelTab) => {
    setActiveTab(tab);
    setPanel(tab);
  };

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(heroEmail.trim());
    window.location.href = `/subscribe${encoded ? `?email=${encoded}` : ""}`;
  };

  const handleCatchUp = async () => {
    setCuLoading(true);
    setCuError("");
    setCuStories(null);
    try {
      const res = await fetch("/api/catchup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cuEmail, niches: cuNiches, days: parseInt(cuTimeframe) }),
      });
      if (res.ok) {
        const data = await res.json();
        setCuStories(data.stories || []);
      } else {
        setCuError("Something went wrong. Please try again.");
      }
    } catch {
      setCuError("Could not connect. Please try again.");
    } finally {
      setCuLoading(false);
    }
  };

  const handlePrefSave = async () => {
    setPrefSaving(true);
    setPrefError("");
    if (!prefEmail.includes("@")) { setPrefError("Enter a valid email."); setPrefSaving(false); return; }
    if (!prefNiches.length)       { setPrefError("Add at least one niche."); setPrefSaving(false); return; }
    try {
      const res = await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: prefEmail, niches: prefNiches, frequency: prefFrequency, format: prefFormat, aiPersonalization: false }),
      });
      if (res.ok) { setPrefSaved(true); setTimeout(() => setPrefSaved(false), 3000); }
      else { const d = await res.json().catch(() => ({})) as { error?: string }; setPrefError(d.error ?? "Something went wrong."); }
    } catch { setPrefError("Could not connect."); }
    finally { setPrefSaving(false); }
  };

  const canCatchUp = cuNiches.length > 0 && cuTimeframe !== "" && cuEmail.includes("@") && !cuLoading;

  return (
    <div className="bg-white text-brand-text">

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-base font-extrabold tracking-tight text-brand-text">KYN</span>
            <span className="hidden sm:block text-xs text-brand-subtle tracking-wide">Know Your Niche</span>
          </Link>
          <div className="flex items-center gap-1">
            {(["explore", "catchup", "preferences"] as PanelTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => openPanel(tab)}
                className={`text-xs px-3 py-2 rounded-full transition-colors ${
                  panel === tab ? "bg-brand-dark text-white" : "text-brand-muted hover:text-brand-text"
                }`}
              >
                {PANEL_LABELS[tab]}
              </button>
            ))}
            <Link href="/subscribe" className="btn-primary text-xs py-2.5 px-4 ml-2">
              Get My Rundown
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
            <motion.p variants={fadeUp} className="label">Know Your Niche</motion.p>
            <motion.h1 variants={fadeUp} className="text-display-lg font-extrabold text-brand-text leading-none tracking-tightest max-w-3xl">
              Your obsession,<br />delivered daily.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-brand-muted max-w-md leading-relaxed">
              KYN builds a tight daily brief around the exact teams, stocks, and names you follow. Not categories. Your niche.
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
                Get My Rundown
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.button>
            </motion.form>
            <motion.p variants={fadeUp} className="text-xs text-brand-subtle">
              Free forever. No credit card. Unsubscribe anytime.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Niche examples ──────────────────────────────────── */}
      <section className="py-14 px-6 sm:px-10 bg-brand-section border-y border-brand-border">
        <Section className="max-w-4xl mx-auto">
          <motion.p variants={fadeUp} className="label mb-6">What your niche brief looks like</motion.p>
          <motion.div variants={stagger} className="grid sm:grid-cols-3 gap-4 mb-5">
            {[
              { niche: "Lakers", update: "AD returns from ankle injury Tuesday. Reaves extension finalized. Next: vs. Warriors, Thursday." },
              { niche: "TSLA",   update: "Up 4.2% after delivery beat. Musk hints Model 2 reveal. BofA upgrades to Buy, PT $280." },
              { niche: "AOC",    update: "New housing bill introduced in committee. Town hall in the Bronx Friday. Responds to GOP critic." },
            ].map(({ niche, update }) => (
              <motion.div key={niche} variants={fadeUp} className="p-5 bg-white border border-brand-border rounded-xl">
                <p className="text-xs font-bold text-brand-text uppercase tracking-widest mb-2">{niche}</p>
                <p className="text-sm text-brand-muted leading-relaxed">{update}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} className="text-xs text-brand-subtle">
            Not &ldquo;Sports.&rdquo; The Lakers. Not &ldquo;Markets.&rdquo; TSLA. That&apos;s KYN.
          </motion.p>
        </Section>
      </section>

      {/* ── How it works ────────────────────────────────────── */}
      <section className="py-16 px-6 sm:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <Section>
            <motion.p variants={fadeUp} className="label mb-4">Simple by design</motion.p>
            <motion.h2 variants={fadeUp} className="text-display-md font-bold text-brand-text mb-10 max-w-xs">
              Know your niche in 3 steps.
            </motion.h2>
            <motion.div variants={stagger} className="grid sm:grid-cols-3 gap-px bg-brand-border">
              {[
                { n: "01", title: "Name your niche", body: "Type the exact teams, stocks, and names you follow. Not Sports — the Lakers. Not Markets — TSLA." },
                { n: "02", title: "Set your cadence", body: "Daily, every other day, or weekly. Lands in your inbox every morning on your schedule." },
                { n: "03", title: "Know your niche", body: "A tight, sharp 5-minute brief covering everything in your world. Nothing outside it." },
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
            <motion.p variants={fadeUp} className="label-dark mb-4">Know Your Niche</motion.p>
            <motion.h2 variants={fadeUp} className="text-display-md font-extrabold text-white mb-4 tracking-tightest">
              Start knowing yours tomorrow.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 mb-10 max-w-sm mx-auto text-sm leading-relaxed">
              Join KYN free. Tell us your niche. Your first brief arrives tomorrow morning.
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
                Get My Rundown →
              </motion.button>
            </motion.form>
            <motion.p variants={fadeUp} className="text-white/30 text-xs mt-4">Free forever. No card needed.</motion.p>
          </Section>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-brand-dark border-t border-white/10 py-8 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-extrabold text-white/70">KYN <span className="font-normal text-white/30 text-xs">· Know Your Niche</span></span>
          <div className="flex items-center gap-6">
            {(["explore", "catchup", "preferences"] as PanelTab[]).map((tab) => (
              <button key={tab} onClick={() => openPanel(tab)} className="text-xs text-white/40 hover:text-white/80 transition-colors link-underline">
                {PANEL_LABELS[tab]}
              </button>
            ))}
            <Link href="/subscribe" className="text-xs text-white/40 hover:text-white/80 transition-colors link-underline">Subscribe</Link>
          </div>
          <span className="text-xs text-white/30 font-mono">&copy; 2026 KYN</span>
        </div>
      </footer>

      {/* ── Right Panel ──────────────────────────────────────── */}
      <AnimatePresence>
        {panel && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setPanel(null)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed top-0 right-0 h-full z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border flex-shrink-0">
                <div className="flex gap-0.5">
                  {(["explore", "catchup", "preferences"] as PanelTab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                        activeTab === tab ? "bg-brand-dark text-white" : "text-brand-muted hover:text-brand-text"
                      }`}
                    >
                      {PANEL_LABELS[tab]}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPanel(null)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-brand-section transition-colors text-brand-subtle ml-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Panel body */}
              <div className="flex-1 overflow-y-auto">

                {/* EXPLORE */}
                {activeTab === "explore" && (
                  <div className="p-5 space-y-8">
                    <div>
                      <p className="label mb-4">From the blog</p>
                      <div className="space-y-2">
                        {BLOG_POSTS.slice(0, 4).map((post) => (
                          <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            onClick={() => setPanel(null)}
                            className="block p-4 border border-brand-border rounded-xl hover:border-brand-dark/30 transition-colors group"
                          >
                            <p className="text-xs text-brand-subtle mb-1">{post.category} · {post.readTime}</p>
                            <p className="text-sm font-semibold text-brand-text group-hover:text-brand-muted transition-colors leading-snug">{post.title}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="label mb-4">Sample editions</p>
                      <div className="space-y-2">
                        {RUNDOWNS.slice(0, 3).map((run) => (
                          <Link
                            key={run.slug}
                            href={`/explore/rundowns/${run.slug}`}
                            onClick={() => setPanel(null)}
                            className="flex items-center justify-between p-4 border border-brand-border rounded-xl hover:border-brand-dark/30 transition-colors group"
                          >
                            <div>
                              <p className="text-xs text-brand-subtle mb-0.5">{run.shortDate}</p>
                              <p className="text-sm font-medium text-brand-text leading-snug line-clamp-1">{run.topStory}</p>
                            </div>
                            <svg className="w-4 h-4 text-brand-subtle group-hover:text-brand-text transition-colors flex-shrink-0 ml-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* CATCH UP */}
                {activeTab === "catchup" && (
                  <div className="p-5 space-y-5">
                    {!cuStories ? (
                      <>
                        <div>
                          <p className="label mb-3">Your niche</p>
                          <NicheInput value={cuNiches} onChange={setCuNiches} compact />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-brand-text mb-2 uppercase tracking-widest">How far back?</label>
                          <div className="space-y-1.5">
                            {[{ id: "1", label: "Yesterday" }, { id: "3", label: "Last 3 days" }, { id: "7", label: "Last week" }].map((tf) => (
                              <button
                                key={tf.id}
                                onClick={() => setCuTimeframe(tf.id)}
                                className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-colors ${
                                  cuTimeframe === tf.id ? "bg-brand-dark border-brand-dark text-white" : "border-brand-border hover:border-brand-dark text-brand-text"
                                }`}
                              >
                                {tf.label}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-brand-text mb-2 uppercase tracking-widest">Your email</label>
                          <input
                            type="email"
                            value={cuEmail}
                            onChange={(e) => setCuEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="input-clean"
                          />
                        </div>
                        {cuError && <p className="text-red-500 text-xs">{cuError}</p>}
                        <button
                          onClick={handleCatchUp}
                          disabled={!canCatchUp}
                          className={`w-full btn-primary justify-center ${!canCatchUp ? "opacity-40 cursor-not-allowed" : ""}`}
                        >
                          {cuLoading ? "Building your catch-up…" : "Catch Me Up →"}
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-brand-text">Your Catch-Up</p>
                          <button onClick={() => { setCuStories(null); setCuError(""); }} className="text-xs text-brand-muted hover:text-brand-text underline">
                            Reset
                          </button>
                        </div>
                        <div className="space-y-3">
                          {cuStories.map((s, i) => (
                            <div key={i} className="p-4 border border-brand-border rounded-xl">
                              <p className="text-xs font-bold text-brand-text uppercase tracking-wider mb-1">{s.niche}</p>
                              <p className="text-sm font-semibold text-brand-text mb-1 leading-snug">{s.headline}</p>
                              <p className="text-xs text-brand-muted leading-relaxed">{s.summary}</p>
                            </div>
                          ))}
                        </div>
                        <Link href="/subscribe" onClick={() => setPanel(null)} className="btn-primary w-full justify-center text-xs">
                          Get this daily — Subscribe Free →
                        </Link>
                      </>
                    )}
                  </div>
                )}

                {/* PREFERENCES */}
                {activeTab === "preferences" && (
                  <div className="p-5 space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-brand-text mb-2 uppercase tracking-widest">Your email</label>
                      <input type="email" value={prefEmail} onChange={(e) => setPrefEmail(e.target.value)} placeholder="you@example.com" className="input-clean" />
                    </div>
                    <div>
                      <p className="label mb-3">Your niche</p>
                      <NicheInput value={prefNiches} onChange={setPrefNiches} compact />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-text mb-2 uppercase tracking-widest">Frequency</label>
                      <div className="space-y-1.5">
                        {[
                          { id: "daily",          label: "Daily" },
                          { id: "every-other-day", label: "Every other day" },
                          { id: "3x-week",        label: "3× per week" },
                          { id: "weekly",         label: "Weekly" },
                        ].map((f) => (
                          <button
                            key={f.id}
                            onClick={() => setPrefFrequency(f.id)}
                            className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-colors ${
                              prefFrequency === f.id ? "bg-brand-dark border-brand-dark text-white" : "border-brand-border hover:border-brand-dark text-brand-text"
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-text mb-2 uppercase tracking-widest">Format</label>
                      <div className="flex gap-2">
                        {[{ id: "read", label: "Read" }, { id: "listen", label: "Listen" }, { id: "both", label: "Both" }].map((f) => (
                          <button
                            key={f.id}
                            onClick={() => setPrefFormat(f.id)}
                            className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                              prefFormat === f.id ? "bg-brand-dark border-brand-dark text-white" : "border-brand-border text-brand-muted hover:border-brand-dark hover:text-brand-text"
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    {prefError && <p className="text-red-500 text-xs">{prefError}</p>}
                    {prefSaved && (
                      <p className="text-xs text-brand-success flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Preferences saved.
                      </p>
                    )}
                    <button
                      onClick={handlePrefSave}
                      disabled={prefSaving}
                      className={`w-full btn-primary justify-center ${prefSaving ? "opacity-40" : ""}`}
                    >
                      {prefSaving ? "Saving…" : "Save preferences"}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
