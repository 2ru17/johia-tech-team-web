import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#121212',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://johia-technicals.vercel.app'),
  title: {
    default: 'Technicals // JOHIA Audio, Visual & Stage Onboarding',
    template: '%s | JOHIA Technicals',
  },
  description:
    'Interactive 3D Sanctuary Stage, RF Wireless Prep, 19-Inch Outboard Rack Sequencer, Mackie Master Fader, ShowArt DMX-384B, REAPER v7.41 DAW, and OBS Studio Mode Onboarding.',
  applicationName: 'JOHIA Technicals',
  authors: [{ name: 'JOHIA Technicals Team', url: 'https://johia-technicals.vercel.app' }],
  generator: 'Next.js',
  keywords: [
    'JOHIA Technicals',
    'Church Sound Booth',
    'Live Audio Engineering',
    'Mackie DL32R',
    'ShowArt DMX-384B',
    'REAPER DAW Multitrack',
    'OBS Studio Mode',
    'Sanctuary 3D Stage',
    'Church Tech Team Onboarding',
    'Wireless Mic Coordination',
    'Power Sequencer Startup',
  ],
  creator: 'JOHIA Technicals',
  publisher: 'JOHIA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Technicals // JOHIA Audio, Visual & Stage Onboarding',
    description:
      'Interactive 3D Sanctuary Stage, Audio, Lighting & Broadcast Onboarding Experience.',
    url: 'https://johia-technicals.vercel.app',
    siteName: 'JOHIA Technicals',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JOHIA Technicals Interactive 3D Tech Booth & Stage',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technicals // JOHIA Audio, Visual & Stage Onboarding',
    description:
      'Interactive 3D Sanctuary Stage, Audio, Lighting & Broadcast Onboarding Experience.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/johia-logo.png', sizes: '143x143', type: 'image/png' },
    ],
    apple: [
      { url: '/images/johia-logo.png', sizes: '143x143', type: 'image/png' },
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://johia-technicals.vercel.app/#website',
      url: 'https://johia-technicals.vercel.app',
      name: 'JOHIA Technicals',
      description:
        'Interactive 3D Sanctuary Stage, Audio, Lighting & Broadcast Onboarding Experience.',
      publisher: {
        '@id': 'https://johia-technicals.vercel.app/#organization',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'Organization',
      '@id': 'https://johia-technicals.vercel.app/#organization',
      name: 'JOHIA Technicals',
      url: 'https://johia-technicals.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://johia-technicals.vercel.app/images/johia-logo.png',
      },
    },
    {
      '@type': 'LearningResource',
      '@id': 'https://johia-technicals.vercel.app/#course',
      name: 'JOHIA Sanctuary Technicals Onboarding & Operational Manual',
      description:
        'Comprehensive volunteer and audio-visual engineering curriculum covering Mackie DL32R, ShowArt DMX-384B, REAPER DAW, and OBS broadcast production.',
      educationalLevel: 'Beginner to Intermediate',
      inLanguage: 'en-US',
      provider: {
        '@id': 'https://johia-technicals.vercel.app/#organization',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#06070A] text-slate-100 selection:bg-sky-500/30 selection:text-sky-200">
        {children}
      </body>
    </html>
  );
}
