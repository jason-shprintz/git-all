import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "git-all — Unified Contribution Heatmap",
  description: "See your GitHub and GitLab contributions in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
