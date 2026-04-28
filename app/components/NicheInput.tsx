"use client";

import { useState } from "react";

const QUICK_ADD: Record<string, string[]> = {
  Teams:  ["Lakers", "Chiefs", "Yankees", "Warriors", "Cowboys", "Celtics"],
  Stocks: ["TSLA", "NVDA", "AAPL", "BTC", "AMZN", "MSFT"],
  People: ["Elon Musk", "LeBron James", "Bezos", "Jensen Huang", "Tim Cook", "Taylor Swift"],
  Topics: ["Fed rates", "AI regulation", "Housing market", "Climate tech", "Box office", "Real estate"],
};

interface Props {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  compact?: boolean;
}

export function NicheInput({
  value,
  onChange,
  placeholder = "e.g., Lakers, TSLA, Bitcoin, NVIDIA...",
  compact = false,
}: Props) {
  const [input, setInput] = useState("");

  const add = (raw: string) => {
    const n = raw.replace(/,/g, "").trim();
    if (n && !value.includes(n) && value.length < 50) {
      onChange([...value, n]);
    }
    setInput("");
  };

  const remove = (n: string) => onChange(value.filter((x) => x !== n));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      add(input);
    }
    if (e.key === "Backspace" && !input && value.length > 0) {
      remove(value[value.length - 1]);
    }
  };

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((n) => (
            <span
              key={n}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-dark text-white text-xs font-medium rounded-full"
            >
              {n}
              <button
                type="button"
                onClick={() => remove(n)}
                className="text-white/50 hover:text-white leading-none text-sm"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => { if (input.trim()) add(input); }}
        placeholder={placeholder}
        className="input-clean"
      />

      <div className={compact ? "space-y-2" : "space-y-3"}>
        {Object.entries(QUICK_ADD).map(([category, items]) => {
          const available = items.filter((s) => !value.includes(s));
          if (!available.length) return null;
          return (
            <div key={category}>
              <p className="text-xs text-brand-subtle mb-1.5">{category}</p>
              <div className="flex flex-wrap gap-1.5">
                {available.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onChange([...value, s])}
                    className="text-xs px-2.5 py-1 rounded-full border border-brand-border text-brand-muted hover:border-brand-dark hover:text-brand-text transition-colors"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
