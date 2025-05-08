'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DynamicMetadata from '../../../components/DynamicMetadata';
import LetterMappings from '../../../components/LetterMappings';

// API endpoints
const API_ENDPOINTS = {
  cryptoquip: 'https://cryptoquip-worker.akagautam7.workers.dev/',
  cryptoquote: 'https://cryptoquote-worker.akagautam7.workers.dev/',
};

// SEO metadata for each type
const solutionMeta = {
  cryptoquip: {
    title: 'Today\'s Cryptoquip Solution - Daily Cryptogram Answers',
    description: 'Get the solution to today\'s Cryptoquip puzzle. Our daily answers help you solve the latest cryptogram puzzles with clear explanations and letter mappings.',
  },
  celebrity: {
    title: 'Today\'s Celebrity Cipher Solution - Famous Quotes Decoded',
    description: 'Find the solution to today\'s Celebrity Cipher puzzle. Decode famous quotes and sayings from celebrities with our daily cryptogram solution guide.',
  },
  cryptoquote: {
    title: 'Today\'s Cryptoquote Solution - Daily Quote Decoder',
    description: 'View the solution to today\'s Cryptoquote puzzle. Our daily answers reveal encrypted quotes and their authors with complete letter mappings.',
  }
};

// Fallback solution data (used if API fails)
const fallbackSolutions = {
  cryptoquip: {
    date: 'May 7, 2024',
    puzzle: 'ABC DEFG HIJKLM NOP QRS TUVWXYZ',
    solution: 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG',
    author: 'Wordplay Enthusiast',
    hint: 'B = H',
    key: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ -> THEQUICKBROWNFXJMPSVLAZYDG'
  },
  celebrity: {
    date: 'May 7, 2024',
    puzzle: 'XYZ ABCD EFGHI JKL MNOP QRSTUV',
    solution: 'ALL THAT GLITTERS IS NOT GOLD',
    author: 'William Shakespeare',
    hint: 'X = A',
    key: 'XYZABCDEFGHIJKLMNOPQRSTUV -> ALTHRGIESNODWMPFVQJCBKXYZ'
  },
  cryptoquote: {
    date: 'May 7, 2024',
    puzzle: 'LMNOP QRSTU VWXYZ ABCDE FGHIJK',
    solution: 'KNOWLEDGE IS POWER, FRANCE IS BACON',
    author: 'Sir Francis Bacon (misquoted)',
    hint: 'L = K',
    key: 'LMNOPQRSTUVWXYZABCDEFGHIJK -> KNOWLEGISPRFACBDHJMQTUVXYZ'
  }
};

// Interface for solution data
interface SolutionData {
  date: string;
  puzzle: string;
  solution?: string;
  answer?: string; // Some APIs use "answer" instead of "solution"
  author?: string;
  hint?: string;
  clue?: string; // Some APIs use "clue" instead of "hint"
  key?: string;
  timestamp?: string;
}

// Parse the key into a mapping
const parseSubstitutionKey = (key: string): Record<string, string> => {
  const mapping: Record<string, string> = {};
  const parts = key.split(' -> ');
  if (parts.length === 2) {
    const cipherChars = parts[0].split('');
    const plainChars = parts[1].split('');
    
    for (let i = 0; i < cipherChars.length; i++) {
      if (i < plainChars.length) {
        mapping[cipherChars[i]] = plainChars[i];
      }
    }
  }
  return mapping;
};

// Function to create word mappings from puzzle and solution
const createWordMappings = (puzzle: string, solution: string) => {
  const cipherWords = puzzle.split(/\s+/);
  const plainWords = solution.split(/\s+/);
  
  return cipherWords.map((cipherWord, index) => {
    return {
      cipherWord,
      plainWord: index < plainWords.length ? plainWords[index] : '',
    };
  });
};

// Analyze puzzle and solution to derive letter mappings
const analyzeMapping = (puzzle: string, solution: string): Record<string, string> => {
  const mapping: Record<string, string> = {};
  
  // Remove spaces and punctuation for analysis
  const cleanPuzzle = puzzle.replace(/[^A-Za-z]/g, '').toUpperCase();
  const cleanSolution = solution.replace(/[^A-Za-z]/g, '').toUpperCase();
  
  // Create mapping based on character positions
  for (let i = 0; i < Math.min(cleanPuzzle.length, cleanSolution.length); i++) {
    const cipherChar = cleanPuzzle[i];
    const plainChar = cleanSolution[i];
    
    if (cipherChar && plainChar) {
      mapping[cipherChar] = plainChar;
    }
  }
  
  return mapping;
};

// Parse clue (like "D=C") into a mapping entry
const parseClue = (clue: string): [string, string] | null => {
  if (!clue) return null;
  
  const match = clue.match(/([A-Z])\s*=\s*([A-Z])/i);
  if (match && match.length === 3) {
    return [match[1].toUpperCase(), match[2].toUpperCase()];
  }
  
  return null;
};

export default function DailySolutionPage({ params }: { params: { type: string } }) {
  const [solutionData, setSolutionData] = useState<SolutionData | null>(null);
  const [letterMapping, setLetterMapping] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const solutionType = params.type as keyof typeof fallbackSolutions;
  
  useEffect(() => {
    const fetchSolution = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // If we have an API endpoint for this type, fetch from it
        if (API_ENDPOINTS[solutionType as keyof typeof API_ENDPOINTS]) {
          const response = await fetch(API_ENDPOINTS[solutionType as keyof typeof API_ENDPOINTS]);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch solution: ${response.status}`);
          }
          
          const data = await response.json();
          
          // Format the data to match our expected format
          const formattedData: SolutionData = {
            date: data.date || new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            puzzle: data.puzzle,
            solution: data.answer || data.solution, // Some APIs use "answer" instead of "solution"
            author: data.author || '',
            hint: data.clue || data.hint || '',
            timestamp: data.timestamp
          };
          
          setSolutionData(formattedData);
        } else {
          // Throw error if no API endpoint is available
          throw new Error(`No API endpoint available for ${solutionType}`);
        }
      } catch (err) {
        console.error('Error fetching solution:', err);
        setError(`Unable to load today's ${solutionType} solution. Please try again later.`);
        setSolutionData(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSolution();
  }, [solutionType]);
  
  useEffect(() => {
    if (solutionData) {
      // First check if we have a clue/hint to use
      let mapping: Record<string, string> = {};
      const clueMapping = solutionData.hint || solutionData.clue 
        ? parseClue(solutionData.hint || solutionData.clue || '') 
        : null;
      
      if (clueMapping) {
        mapping[clueMapping[0]] = clueMapping[1];
      }
      
      // If we have a key, use it
      if (solutionData.key) {
        mapping = { ...mapping, ...parseSubstitutionKey(solutionData.key) };
      } 
      // Otherwise, analyze the puzzle and solution
      else if (solutionData.puzzle && (solutionData.solution || solutionData.answer)) {
        mapping = { 
          ...mapping, 
          ...analyzeMapping(
            solutionData.puzzle, 
            solutionData.solution || solutionData.answer || ''
          ) 
        };
      }
      
      setLetterMapping(mapping);
    }
  }, [solutionData]);
  
  // Format the date for display with better styling
  const formatDate = (dateString: string) => {
    // Try to parse the date
    try {
      const date = new Date(dateString);
      // Check if the date is valid
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      return dateString; // Return as is if we can't parse it
    } catch (e) {
      return dateString; // Return as is if any error occurs
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 fade-in">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 dark:border-indigo-700 dark:border-t-indigo-400 rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Loading Solution</h3>
            <p className="text-gray-600 dark:text-gray-400">Fetching today's {solutionType} puzzle...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !solutionData) {
    return (
      <div className="max-w-5xl mx-auto p-6 fade-in">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Solution Unavailable</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
              {error || `We couldn't find today's solution for "${solutionType}". Please try again later.`}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Try Again
            </button>
            <Link 
              href="/daily" 
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Back to Daily Solutions
            </Link>
            <Link 
              href="/solver"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              Try the Solver Instead
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // If we got data from API that uses "answer" instead of "solution"
  const solution = solutionData.solution || solutionData.answer || '';
  const wordMappings = createWordMappings(solutionData.puzzle, solution);
  
  // Get title based on type
  const titles = {
    cryptoquip: 'Today\'s Cryptoquip Solution',
    celebrity: 'Today\'s Celebrity Cipher Solution',
    cryptoquote: 'Today\'s Cryptoquote Solution'
  };
  
  // Get color scheme based on type
  const colorSchemes = {
    cryptoquip: {
      gradient: 'from-blue-600 to-indigo-500 dark:from-blue-800 dark:to-indigo-700',
      accent: 'blue',
    },
    celebrity: {
      gradient: 'from-purple-600 to-pink-500 dark:from-purple-800 dark:to-pink-700',
      accent: 'purple',
    },
    cryptoquote: {
      gradient: 'from-emerald-600 to-teal-500 dark:from-emerald-800 dark:to-teal-700',
      accent: 'emerald',
    }
  };
  
  const { gradient, accent } = colorSchemes[solutionType] || colorSchemes.cryptoquip;
  
  // Render word mapping
  const renderWordMapping = () => {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 sm:p-6 shadow-lg">
        <h3 className="font-bold text-xl mb-3 sm:mb-4 text-purple-700 dark:text-purple-400">Word-by-Word Translation</h3>
        
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {wordMappings.map((mapping, index) => (
            <div 
              key={`word-${index}`}
              className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 sm:p-3 transition-all duration-300 hover:scale-105"
            >
              <div className="bg-purple-100 dark:bg-purple-900/50 px-2 sm:px-3 py-1 rounded-t-md w-full text-center">
                <span className="font-mono text-sm sm:text-base text-purple-700 dark:text-purple-300">{mapping.cipherWord}</span>
              </div>
              <div className="h-6 sm:h-8 flex items-center justify-center">
                <svg className="h-4 w-4 sm:h-6 sm:w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div className="bg-pink-100 dark:bg-pink-900/50 px-2 sm:px-3 py-1 rounded-b-md w-full text-center">
                <span className="font-bold text-sm sm:text-base text-pink-700 dark:text-pink-300">{mapping.plainWord}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render letter mapping
  const renderLetterMapping = () => {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-xl p-4 sm:p-6 shadow-lg mb-6">
        <h3 className="font-bold text-xl mb-3 sm:mb-4 text-indigo-700 dark:text-indigo-400">Letter Mapping</h3>
        <LetterMappings mapping={letterMapping} />
      </div>
    );
  };
  
  // Format the hint or clue for display
  const formattedHint = solutionData.hint || solutionData.clue || '';

  // Get meta title and description
  const pageTitle = solutionMeta[solutionType]?.title || `${titles[solutionType]} - Cryptogram Solver`;
  const pageDescription = solutionMeta[solutionType]?.description || `Solution for today's ${solutionType} puzzle - ${formatDate(solutionData.date)}`;
  
  return (
    <>
      <DynamicMetadata 
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={`https://cryptogram-solver.vercel.app/daily/${solutionType}`}
      />
      <div className="max-w-5xl mx-auto p-6 fade-in">
        {error && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="text-yellow-700 dark:text-yellow-400">{error}</p>
          </div>
        )}
        
        <div className={`bg-gradient-to-r ${gradient} rounded-t-2xl p-6 shadow-lg`}>
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
            {titles[solutionType] || 'Daily Solution'}
          </h1>
          <p className="text-white/80 text-center">
            {formatDate(solutionData.date)}
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-b-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Today's Puzzle</h2>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">
                {solutionData.puzzle}
              </div>
              {formattedHint && (
                <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-yellow-800 dark:text-yellow-200">Hint: {formattedHint}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Solution</h2>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800 text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-medium">
                {solution}
              </div>
              
              {solutionData.author && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <span className="text-sm text-blue-800 dark:text-blue-200">
                    Quote by: {solutionData.author}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Tabs for different mapping views */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              <button
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
              >
                Letter & Word Mappings
              </button>
            </nav>
          </div>
          
          <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
            {renderLetterMapping()}
            {renderWordMapping()}
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Link 
            href="/daily"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Back to Daily Solutions
          </Link>
          <Link 
            href="/solver"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try the Solver
          </Link>
        </div>
      </div>
    </>
  );
} 