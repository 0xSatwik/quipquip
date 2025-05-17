import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cryptoquip Solver | Free Online Cryptogram Decoder Tool',
  description: 'Solve Cryptoquips, Cryptograms, Cryptoquotes and Celebrity Ciphers instantly with our free online tool. Decrypt substitution puzzles with powerful algorithms and helpful hints.',
  keywords: 'cryptoquip solver, cryptogram decoder, cryptoquote solver, celebrity cipher tool, cipher solver, puzzle solver, letter substitution, cryptogram solution',
  robots: 'index, follow',
  openGraph: {
    title: 'Cryptoquip Solver | Free Online Cryptogram Decoder Tool',
    description: 'Instantly solve Cryptoquips, Cryptograms, Cryptoquotes and Celebrity Ciphers with our free online tool.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cryptoquip Solver | Free Online Cryptogram Decoder Tool',
    description: 'Instantly solve Cryptoquips, Cryptograms, Cryptoquotes and Celebrity Ciphers with our free tool.',
  },
};

export default function SolverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 