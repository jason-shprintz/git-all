import { ThemeToggle } from '@/components/ThemeToggle';
import { FAQ_ITEMS } from '@/lib/faq';
import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'GitAll — View GitHub & GitLab Contributions in One Place',
  description:
    'GitAll lets you see GitHub and GitLab contribution graphs in one unified heatmap. Free, no login required.',
  metadataBase: new URL('https://gitall.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GitAll — View GitHub & GitLab Contributions in One Place',
    description:
      'GitAll lets you see GitHub and GitLab contribution graphs in one unified heatmap. Free, no login required.',
    url: 'https://gitall.app',
    siteName: 'GitAll',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitAll — View GitHub & GitLab Contributions in One Place',
    description:
      'GitAll lets you see GitHub and GitLab contribution graphs in one unified heatmap. Free, no login required.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
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

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'GitAll',
    url: 'https://gitall.app',
    description:
      'See GitHub and GitLab contributions in one unified heatmap. Free, no login required.',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'Toastbyte Studios',
      url: 'https://toastbyte.studio',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
