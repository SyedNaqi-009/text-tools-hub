import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { constructMetadata } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = constructMetadata({
  title: 'Free Online Text Tools for Writers, Developers & Creators',
  description: 'Transform, analyze, clean, and format text instantly in your browser. 22 free client-side text utilities with 100% privacy and zero sign-up.',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased text-slate-800 bg-slate-50">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-lg"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
