import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TextToolsHub — Free Online Text Utilities',
    short_name: 'TextToolsHub',
    description: 'Transform, analyze, clean, and format text instantly in your browser with 100% privacy.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#10b981',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
