import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cryptogram Solver | Cryptoquip, Celebrity Cipher & Cryptoquote Solutions',
  description: 'Free online cryptogram solver and daily solutions for Cryptoquips, Celebrity Ciphers, and Cryptoquotes. Instantly decode letter substitution puzzles with our powerful tools.',
  keywords: 'cryptogram solver, cryptoquip solution, celebrity cipher, cryptoquote, decode cryptograms, daily cryptogram solutions, letter substitution, puzzle solver',
  authors: [{ name: 'CryptogramSolver' }],
  openGraph: {
    title: 'Cryptogram Solver | Cryptoquip, Celebrity Cipher & Cryptoquote Solutions',
    description: 'Free online cryptogram solver and daily solutions for Cryptoquips, Celebrity Ciphers, and Cryptoquotes. Instantly decode letter substitution puzzles.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cryptogram Solver | Cryptoquip, Celebrity Cipher & Cryptoquote Solutions',
    description: 'Free online cryptogram solver and daily solutions for Cryptoquips, Celebrity Ciphers, and Cryptoquotes.',
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
