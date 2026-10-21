import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'JOHIA Technicals // Tech Booth Onboarding',
    short_name: 'Technicals',
    description:
      'Interactive 3D Sanctuary Stage, Audio, Lighting & Broadcast Onboarding Experience.',
    start_url: '/',
    display: 'standalone',
    background_color: '#121212',
    theme_color: '#121212',
    icons: [
      {
        src: '/images/johia-logo.png',
        sizes: '143x143',
        type: 'image/png',
      },
      {
        src: '/og-image.png',
        sizes: '1200x630',
        type: 'image/png',
      },
    ],
  };
}
