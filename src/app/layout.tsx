import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "GitAll — Unified Contribution Heatmap",
  description:
    "See your GitHub and GitLab contributions in one place. View side-by-side or integrated heatmaps across platforms.",
  metadataBase: new URL("https://gitall.app"),
  openGraph: {
    title: "GitAll — Unified Contribution Heatmap",
    description:
      "See your GitHub and GitLab contributions in one place. View side-by-side or integrated heatmaps across platforms.",
    url: "https://gitall.app",
    siteName: "GitAll",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitAll — Unified Contribution Heatmap",
    description:
      "See your GitHub and GitLab contributions in one place. View side-by-side or integrated heatmaps across platforms.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

/* Inline script injected before first paint to avoid flash of wrong theme */
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
    // 'system' or null → no attribute, CSS media query takes over
  } catch (e) {}
})();
`.trim();

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
