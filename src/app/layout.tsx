import { ThemeToggle } from '@/components/ThemeToggle';
import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'GitAll — View GitHub & GitLab Contributions in One Place',
  description:
    'GitAll lets you see GitHub, GitLab, Bitbucket, and Gitea contribution graphs in one unified heatmap. Free, no login required.',
  metadataBase: new URL('https://gitall.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GitAll — View GitHub & GitLab Contributions in One Place',
    description:
      'GitAll lets you see GitHub, GitLab, Bitbucket, and Gitea contribution graphs in one unified heatmap. Free, no login required.',
    url: 'https://gitall.app',
    siteName: 'GitAll',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitAll — View GitHub & GitLab Contributions in One Place',
    description:
      'GitAll lets you see GitHub, GitLab, Bitbucket, and Gitea contribution graphs in one unified heatmap. Free, no login required.',
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
      'See GitHub, GitLab, Bitbucket, and Gitea/Forgejo contributions in one unified heatmap. Free, no login required.',
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
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I see my GitHub and GitLab contributions in one place?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GitAll (gitall.app) lets you enter usernames from both platforms and instantly view a unified heatmap showing your combined contribution activity.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a tool to combine GitHub and GitLab contribution graphs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — GitAll merges contribution calendars from GitHub, GitLab, Bitbucket, and Gitea/Forgejo into a single unified view.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I compare developer activity across GitHub and GitLab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GitAll shows both a side-by-side view (separate heatmaps per platform) and an integrated view that merges all activity into one combined contribution graph.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need an account to use GitAll?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. GitAll looks up public profile data anonymously — no sign-up, no login, no OAuth required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is GitAll free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, GitAll is completely free to use.',
        },
      },
    ],
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
