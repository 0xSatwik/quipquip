'use client';

import React from 'react';
import Link from 'next/link';

export default function CryptogramGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 fade-in">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-800 dark:to-teal-700 rounded-t-xl p-6 shadow-lg">
        <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-white/20 text-white mb-3">
          Beginner Guide
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          How to Solve Cryptograms: A Beginner's Guide
        </h1>
        <p className="text-emerald-100">
          Published on May 7, 2024 • 8 min read
        </p>
      </div>
      
      <article className="bg-white dark:bg-slate-800 rounded-b-xl shadow-lg p-6 mb-8 prose dark:prose-invert max-w-none prose-headings:text-gray-800 dark:prose-headings:text-white prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
        <div className="mb-8">
          <h2>Introduction to Cryptograms</h2>
          <p>
            Cryptograms are letter-substitution puzzles where each letter of the alphabet is consistently replaced by another letter throughout the text. For example, every 'A' might be replaced with 'X', every 'B' with 'K', and so on. The challenge is to figure out this substitution pattern and reveal the hidden message.
          </p>
          <p>
            Solving cryptograms can seem intimidating at first, but with a systematic approach and some practice, you'll be decoding these puzzles with ease.
          </p>
        </div>
        
        <div className="mb-8">
          <h2>Understanding the Basics</h2>
          <p>
            Before diving into specific techniques, it's important to understand a few key concepts:
          </p>
          <ul>
            <li><strong>Substitution:</strong> In a cryptogram, each letter is consistently replaced by the same letter throughout the puzzle.</li>
            <li><strong>Frequency Analysis:</strong> In English, certain letters appear more frequently than others. For example, 'E' is the most common letter, followed by 'T', 'A', 'O', and 'I'.</li>
            <li><strong>Word Patterns:</strong> Certain word structures and common words can give you important clues.</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2>Step-by-Step Approach</h2>
          <h3>Step 1: Look for Single-Letter Words</h3>
          <p>
            In English, there are only two common single-letter words: 'a' and 'I'. If you see a single letter standing alone in your cryptogram, it's very likely to be one of these two.
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg my-4">
            <p className="font-mono">JGV YXK X LRK</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">If we see the single letter 'X' in this example, it's likely to be 'A' or 'I'.</p>
          </div>
          
          <h3>Step 2: Identify Short Words</h3>
          <p>
            Common two and three-letter words can provide useful clues:
          </p>
          <ul>
            <li><strong>Two-letter words:</strong> of, to, in, it, is, be, as, at, so, we, he, by, or, on, do, if, me, my, up</li>
            <li><strong>Three-letter words:</strong> the, and, for, are, but, not, you, all, any, can, had, her, was, one, our, out, day, get, has, him</li>
          </ul>
          <p>
            'THE' is particularly useful to identify, as it's the most common three-letter word in English.
          </p>
          
          <h3>Step 3: Look for Letter Patterns</h3>
          <p>
            Repeated letter patterns can reveal common words. For example:
          </p>
          <ul>
            <li>A word with the pattern 'XYZX' might be 'that', 'were', or 'mama'</li>
            <li>A longer word with a double letter in the middle like 'X--YY--Z' might be 'attention', 'different', etc.</li>
          </ul>
          
          <h3>Step 4: Use Frequency Analysis</h3>
          <p>
            The most common letters in English are E, T, A, O, I, N, S, H, R, D, L, U (in roughly that order). Count how often each cipher letter appears; the most frequent ones likely represent these common letters.
          </p>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg my-4">
            <h4 className="text-indigo-800 dark:text-indigo-300 mb-2">Common Letter Frequencies</h4>
            <ul className="text-gray-700 dark:text-gray-300 grid grid-cols-2 md:grid-cols-4 gap-2">
              <li>E: 12.7%</li>
              <li>T: 9.1%</li>
              <li>A: 8.2%</li>
              <li>O: 7.5%</li>
              <li>I: 7.0%</li>
              <li>N: 6.7%</li>
              <li>S: 6.3%</li>
              <li>H: 6.1%</li>
            </ul>
          </div>
          
          <h3>Step 5: Context and Trial and Error</h3>
          <p>
            As you identify more letters, you'll start to see partially decoded words. Use context to make educated guesses about the remaining letters.
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg my-4">
            <p className="font-mono">T-E Q-I-K BR--N F-X J-MPS -V-R T-E L-Z- D-G</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">With some letters identified, you might recognize this as "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG"</p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2>Practical Example</h2>
          <p>Let's work through a simple example:</p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <p className="font-mono font-bold">BX QNX DVQE BX OXQAT</p>
          </div>
          
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              We notice 'BX' appears twice. Common repeated two-letter words include 'to', 'of', 'in', 'it', and 'we'. Since 'we' can't appear twice in this short sentence, 'to' or 'the' are likely candidates.
            </li>
            <li>
              Let's try 'BX' = 'to'. This gives us:
              <p className="font-mono mt-1">to QNX DVQE to OXQAT</p>
            </li>
            <li>
              The structure now suggests a phrase like "to ___ ____ to ____". The common expression "to each their own" could fit here.
            </li>
            <li>
              Testing this, 'QNX' would be 'each', 'DVQE' would be 'their', and 'OXQAT' would be 'learn'.
            </li>
            <li>
              Checking our substitutions (B=t, X=o, Q=e, N=a, D=t, V=h, E=r, O=l, A=r, T=n), we get:
              <p className="font-mono mt-1">to each their learn</p>
            </li>
            <li>
              This doesn't quite make sense. Let's revise: BX might be 'we'. This gives:
              <p className="font-mono mt-1">we QNX DVQE we OXQAT</p>
            </li>
            <li>
              A common phrase could be "we are what we learn".
            </li>
            <li>
              Testing this new hypothesis, we get: B=w, X=e, Q=a, N=r, D=w, V=h, E=a, O=l, A=r, T=n.
            </li>
            <li>
              This gives us: 
              <p className="font-mono mt-1">we are what we learn</p>
              Which makes perfect sense!
            </li>
          </ol>
        </div>
        
        <div className="mb-8">
          <h2>Common Challenges and Tips</h2>
          <h3>What if I Get Stuck?</h3>
          <p>
            If you find yourself stuck, try these approaches:
          </p>
          <ul>
            <li>Look for apostrophes, which often indicate contractions or possessives</li>
            <li>Identify question marks and exclamation points to find sentence structures</li>
            <li>Try a completely different starting point</li>
            <li>Use our <Link href="/solver" className="text-indigo-600 dark:text-indigo-400 font-medium">cryptogram solver</Link> to get a hint or check your work</li>
          </ul>
          
          <h3>Practice Makes Perfect</h3>
          <p>
            The more cryptograms you solve, the more familiar you'll become with common patterns and techniques. Check our <Link href="/daily" className="text-indigo-600 dark:text-indigo-400 font-medium">daily solutions</Link> to practice on fresh puzzles.
          </p>
        </div>
        
        <div className="mb-8">
          <h2>Conclusion</h2>
          <p>
            Solving cryptograms is a rewarding mental exercise that improves pattern recognition, vocabulary, and problem-solving skills. By starting with the simple techniques outlined in this guide, you'll build the foundation for tackling more complex puzzles.
          </p>
          <p>
            Remember that cryptograms are meant to be fun challenges. Don't hesitate to use our <Link href="/solver" className="text-indigo-600 dark:text-indigo-400 font-medium">solver tool</Link> if you get stuck or want to check your solution.
          </p>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
          <h3>Ready to test your skills?</h3>
          <p>
            Try solving some cryptograms on your own, or use our solver to tackle more challenging puzzles.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link 
              href="/solver" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              Try the Solver
            </Link>
            <Link 
              href="/guides" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              Back to Guides
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
} 