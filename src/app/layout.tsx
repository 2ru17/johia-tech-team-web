import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://johia-technicals.vercel.app'),
  title: 'Technicals Ministry // Interactive 3D Booth & Onboarding',
  description:
    'Interactive 3D Sanctuary Stage, RF Wireless Prep, 19-Inch Outboard Rack Sequencer, Mackie Master Fader, ShowArt DMX-384B, REAPER v7.41 DAW, and OBS Studio Mode Onboarding.',
  openGraph: {
    title: 'Technicals Ministry',
    description:
      'Interactive 3D Sanctuary Stage, Audio, Lighting & Broadcast Onboarding Experience.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technicals Ministry',
    description:
      'Interactive 3D Sanctuary Stage, Audio, Lighting & Broadcast Onboarding Experience.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#06070A] text-slate-100 selection:bg-sky-500/30 selection:text-sky-200">
        {children}
      </body>
    </html>
  );
}
