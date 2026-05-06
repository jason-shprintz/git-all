"use client";

import { useEffect, useState } from "react";

type ThemeChoice = "light" | "dark" | "system";

export function ThemeToggle() {
  const [choice, setChoice] = useState<ThemeChoice>("system");

  /* On mount, read the persisted choice */
  useEffect(() => {
    const stored = localStorage.getItem("theme") as ThemeChoice | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      setChoice(stored);
    }
  }, []);

  /* Apply the choice whenever it changes */
  useEffect(() => {
    const root = document.documentElement;
    if (choice === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", choice);
    }
    localStorage.setItem("theme", choice);
  }, [choice]);

  const options: { value: ThemeChoice; label: string; title: string }[] = [
    { value: "light", label: "☀️", title: "Light" },
    { value: "system", label: "⚙️", title: "System" },
    { value: "dark", label: "🌙", title: "Dark" },
  ];

  return (
    <div
      className="fixed top-4 right-4 z-50 flex gap-1 p-1 rounded-lg"
      style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}
      role="group"
      aria-label="Theme selector"
    >
      {options.map(({ value, label, title }) => (
        <button
          key={value}
          onClick={() => setChoice(value)}
          title={title}
          aria-label={title}
          aria-pressed={choice === value}
          className="px-2 py-1 text-sm rounded-md transition-colors cursor-pointer"
          style={{
            backgroundColor: choice === value ? "var(--bg-elevated)" : "transparent",
            color: choice === value ? "var(--text-primary)" : "var(--text-muted)",
            border: choice === value ? "1px solid var(--border)" : "1px solid transparent",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
