"use client";

import Link from "next/link";
import { useState } from "react";
import { NicheInput } from "../components/NicheInput";

const FREQUENCIES = [
  { id: "daily",           label: "Every day",      desc: "Monday through Saturday" },
  { id: "every-other-day", label: "Every other day", desc: "3–4 times per week" },
  { id: "3x-week",         label: "3× per week",    desc: "Monday, Wednesday, Friday" },
  { id: "weekly",          label: "Once a week",    desc: "Monday mornings" },
];

const FORMATS = [
  { id: "read",   label: "Read",   desc: "Email newsletter" },
  { id: "listen", label: "Listen", desc: "Audio briefing" },
  { id: "both",   label: "Both",   desc: "Email + audio link" },
];

type Section = "niche" | "schedule" | "ai" | "account";

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: "niche",    label: "Your Niche" },
  { id: "schedule", label: "Schedule & Format" },
  { id: "ai",       label: "AI Personalization" },
  { id: "account",  label: "Account" },
];

export default function Settings() {
  const [activeSection,     setActiveSection]     = useState<Section>("niche");
  const [email,             setEmail]             = useState("");
  const [niches,            setNiches]            = useState<string[]>([]);
  const [frequency,         setFrequency]         = useState("daily");
  const [format,            setFormat]            = useState("read");
  const [aiPersonalization, setAiPersonalization] = useState(false);
  const [saving,            setSaving]            = useState(false);
  const [saved,             setSaved]             = useState(false);
  const [saveError,         setSaveError]         = useState("");

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setSaveError("");

    if (!email.trim().includes("@")) {
      setSaveError("Please enter a valid email address.");
      setSaving(false);
      return;
    }
    if (niches.length === 0) {
      setSaveError("Add at least one niche.");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), niches, frequency, format, aiPersonalization }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 4000);
      } else {
        const data = await res.json().catch(() => ({})) as { error?: string };
        setSaveError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setSaveError("Could not connect. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white text-brand-text min-h-screen">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          <Link href="/" className="text-base font-extrabold tracking-tight text-brand-text">KYN</Link>
          <div className="hidden sm:flex items-center gap-8">
            <Link href="/explore" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Explore</Link>
            <Link href="/catchup" className="text-sm text-brand-muted hover:text-brand-text transition-colors link-underline">Catch Up</Link>
            <Link href="/settings" className="text-sm font-semibold text-brand-text link-underline">Preferences</Link>
          </div>
          <Link href="/subscribe" className="btn-primary text-xs py-3 px-5">Start free</Link>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">

          <div className="mb-10">
            <p className="label mb-4">Account</p>
            <h1 className="text-display-md font-bold text-brand-text mb-2">Preferences</h1>
            <p className="text-brand-muted">Manage your KYN niche brief settings.</p>
          </div>

          {/* Email */}
          <div className="mb-8 p-6 border border-brand-border rounded-xl bg-brand-section">
            <label className="block text-sm font-semibold text-brand-text mb-2">Your email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input-clean max-w-sm"
            />
            <p className="mt-2 text-xs text-brand-subtle">We use this to look up your subscription and apply changes.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar */}
            <div className="lg:w-52 flex-shrink-0">
              <div className="border border-brand-border rounded-xl overflow-hidden">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 text-sm text-left transition-colors border-b border-brand-border last:border-b-0 ${
                      activeSection === item.id
                        ? "bg-brand-dark text-white font-semibold"
                        : "bg-white text-brand-muted hover:text-brand-text hover:bg-brand-section"
                    }`}
                  >
                    {item.label}
                    {item.id === "ai" && aiPersonalization && (
                      <span className={`text-xs font-mono ${activeSection === item.id ? "text-white/60" : "text-brand-subtle"}`}>ON</span>
                    )}
                    {item.id === "niche" && niches.length > 0 && (
                      <span className={`text-xs font-mono ${activeSection === item.id ? "text-white/60" : "text-brand-subtle"}`}>{niches.length}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Panel */}
            <div className="flex-1 min-w-0">

              {/* Your Niche */}
              {activeSection === "niche" && (
                <div className="border border-brand-border rounded-xl p-7">
                  <h2 className="text-2xl font-bold text-brand-text mb-2">Your Niche</h2>
                  <p className="text-sm text-brand-muted mb-6 leading-relaxed">
                    The specific teams, stocks, politicians, and people your brief is built around.
                    {niches.length > 0 ? ` ${niches.length} niche${niches.length !== 1 ? "s" : ""} currently set.` : " Add at least one."}
                  </p>
                  <NicheInput value={niches} onChange={setNiches} />
                </div>
              )}

              {/* Schedule & Format */}
              {activeSection === "schedule" && (
                <div className="border border-brand-border rounded-xl p-7 space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-brand-text mb-2">Frequency</h2>
                    <p className="text-sm text-brand-muted mb-5">How often your niche brief lands in your inbox.</p>
                    <div className="space-y-2">
                      {FREQUENCIES.map((freq) => (
                        <button
                          key={freq.id}
                          onClick={() => setFrequency(freq.id)}
                          className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-colors ${
                            frequency === freq.id
                              ? "bg-brand-dark border-brand-dark text-white"
                              : "border-brand-border bg-white hover:border-brand-dark"
                          }`}
                        >
                          <div>
                            <div className={`font-semibold text-sm ${frequency === freq.id ? "text-white" : "text-brand-text"}`}>{freq.label}</div>
                            <div className={`text-xs ${frequency === freq.id ? "text-white/60" : "text-brand-muted"}`}>{freq.desc}</div>
                          </div>
                          {frequency === freq.id && (
                            <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-brand-border">
                    <h2 className="text-2xl font-bold text-brand-text mb-2 mt-6">Format</h2>
                    <p className="text-sm text-brand-muted mb-5">How you receive your brief.</p>
                    <div className="space-y-2">
                      {FORMATS.map((fmt) => (
                        <button
                          key={fmt.id}
                          onClick={() => setFormat(fmt.id)}
                          className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-colors ${
                            format === fmt.id
                              ? "bg-brand-dark border-brand-dark text-white"
                              : "border-brand-border bg-white hover:border-brand-dark"
                          }`}
                        >
                          <div>
                            <div className={`font-semibold text-sm ${format === fmt.id ? "text-white" : "text-brand-text"}`}>{fmt.label}</div>
                            <div className={`text-xs ${format === fmt.id ? "text-white/60" : "text-brand-muted"}`}>{fmt.desc}</div>
                          </div>
                          {format === fmt.id && (
                            <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* AI Personalization */}
              {activeSection === "ai" && (
                <div className="border border-brand-border rounded-xl p-7">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-2xl font-bold text-brand-text">AI Personalization</h2>
                    {aiPersonalization && (
                      <span className="text-xs font-semibold text-brand-text border border-brand-border px-2 py-0.5 rounded-full bg-brand-section">ACTIVE</span>
                    )}
                  </div>
                  <p className="text-sm text-brand-muted mb-8 leading-relaxed">
                    Let AI go deeper into your niche — finding connections between the things you follow, surfacing trending stories in your world, and catching what you might have missed.
                  </p>

                  <button
                    onClick={() => setAiPersonalization((v) => !v)}
                    className={`w-full flex items-start gap-4 p-5 border-2 rounded-xl cursor-pointer transition-colors mb-6 text-left ${
                      aiPersonalization ? "border-brand-dark bg-brand-dark text-white" : "border-brand-border bg-white hover:border-brand-dark/40"
                    }`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className={`w-10 h-6 rounded-full relative transition-colors ${aiPersonalization ? "bg-white" : "bg-brand-border"}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all shadow-sm ${aiPersonalization ? "bg-brand-dark left-5" : "bg-white left-1"}`} />
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${aiPersonalization ? "text-white" : "text-brand-text"}`}>
                        Go deeper into my niche with AI
                      </p>
                      <p className={`text-xs mt-1 leading-relaxed ${aiPersonalization ? "text-white/60" : "text-brand-muted"}`}>
                        I consent to KYN using AI to enrich my niche briefing with curated story recommendations. I can withdraw this consent at any time.
                      </p>
                    </div>
                  </button>

                  <div className="space-y-2 mb-6">
                    {[
                      { tag: "AI Curated · Based on your niche", headline: "How TSLA's week connects to broader EV market shifts" },
                      { tag: "AI Curated · Trending in your world", headline: "The quiet story affecting the Lakers' playoff chances" },
                    ].map((ex, i) => (
                      <div key={i} className={`p-4 border rounded-xl transition-opacity ${aiPersonalization ? "border-brand-border" : "border-brand-border opacity-50"}`}>
                        <p className="text-xs font-mono text-brand-subtle mb-1">{ex.tag}</p>
                        <p className="text-sm font-semibold text-brand-text leading-snug">{ex.headline}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border border-brand-border rounded-xl bg-brand-section text-xs text-brand-muted leading-relaxed">
                    <strong className="text-brand-text">Privacy note:</strong> AI personalization uses only your niche selections. We do not track opens, clicks, or browsing behavior. Your data is never sold.
                  </div>
                </div>
              )}

              {/* Account */}
              {activeSection === "account" && (
                <div className="border border-brand-border rounded-xl p-7">
                  <h2 className="text-2xl font-bold text-brand-text mb-2">Account</h2>
                  <p className="text-sm text-brand-muted mb-8">Manage your KYN subscription.</p>
                  <div className="space-y-4">
                    <div className="p-5 border border-brand-border rounded-xl">
                      <p className="text-sm font-semibold text-brand-text mb-1">Unsubscribe</p>
                      <p className="text-xs text-brand-muted mb-3 leading-relaxed">Stop receiving KYN briefs. Your preferences will be saved for 90 days.</p>
                      <a href="mailto:hello@kyn.news?subject=Unsubscribe request" className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors">Request unsubscribe →</a>
                    </div>
                    <div className="p-5 border border-brand-border rounded-xl">
                      <p className="text-sm font-semibold text-brand-text mb-1">Privacy &amp; data</p>
                      <p className="text-xs text-brand-muted mb-3 leading-relaxed">Request a copy of your data or ask us to delete your account and all preferences.</p>
                      <a href="mailto:hello@kyn.news?subject=Data request" className="text-xs font-semibold text-brand-text hover:text-brand-muted transition-colors">Contact us about your data →</a>
                    </div>
                  </div>
                </div>
              )}

              {/* Save bar */}
              {activeSection !== "account" && (
                <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex-1">
                    {saveError && <p className="text-sm text-red-600">{saveError}</p>}
                    {saved && (
                      <p className="text-sm text-brand-success flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Preferences saved.
                      </p>
                    )}
                  </div>
                  <button onClick={handleSave} disabled={saving} className={`btn-primary ${saving ? "opacity-40 cursor-not-allowed" : ""}`}>
                    {saving ? "Saving…" : "Save preferences"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
