'use client';

import React, { useState, useEffect } from 'react';
import LetterMappings from './LetterMappings';

// Cloudflare Worker URL - direct connection
const WORKER_URL = 'https://cryptoquip-solver.litebloggingpro.workers.dev';

// Define types for API responses
interface SolveResponse {
  id: string;
}

interface Solution {
  plaintext: string;
  key: string;
}

interface SolutionData {
  solutions: Solution[];
  result: number;
}

interface WordMapping {
  cipherWord: string;
  plainWord: string;
  isVisible: boolean;
}

// Create a function to parse the substitution key
const parseSubstitutionKey = (key: string): Record<string, string> => {
  const mapping: Record<string, string> = {};
  // Key format is typically "ABCDE...Z -> abcde...z"
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

// Function to apply mapping to a cipher word
const decodeWord = (cipherWord: string, mapping: Record<string, string>): string => {
  return cipherWord
    .split('')
    .map(char => {
      // Preserve punctuation and spaces
      if (/[A-Za-z]/.test(char)) {
        return mapping[char.toUpperCase()] || mapping[char.toLowerCase()] || char;
      }
      return char;
    })
    .join('');
};

// Create a function to generate mapping from cipher and plaintext
const generateLetterMapping = (cipher: string, plaintext: string): Record<string, string> => {
  const mapping: Record<string, string> = {};
  
  // Split into words
  const cipherWords = cipher.match(/\b[\w']+\b/g) || [];
  const plainWords = plaintext.match(/\b[\w']+\b/g) || [];
  
  // Process each word pair
  for (let i = 0; i < Math.min(cipherWords.length, plainWords.length); i++) {
    const cipherWord = cipherWords[i].toUpperCase();
    const plainWord = plainWords[i].toLowerCase();
    
    // Map each letter in the word
    for (let j = 0; j < Math.min(cipherWord.length, plainWord.length); j++) {
      const cipherChar = cipherWord[j];
      const plainChar = plainWord[j];
      
      // Only map if both are letters and not already mapped to a different letter
      if (/[A-Z]/.test(cipherChar) && /[a-z]/.test(plainChar)) {
        // Check if this mapping contradicts an existing one
        if (mapping[cipherChar] && mapping[cipherChar] !== plainChar) {
          console.warn(`Conflicting mapping for ${cipherChar}: ${mapping[cipherChar]} vs ${plainChar}`);
        } else {
          mapping[cipherChar] = plainChar;
        }
      }
    }
  }
  
  return mapping;
};

export default function SolverInterface() {
  const [cipher, setCipher] = useState('');
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<Solution | null>(null);
  const [wordMappings, setWordMappings] = useState<WordMapping[]>([]);
  const [activeMappingTab, setActiveMappingTab] = useState<'words' | 'letters'>('words');
  const [error, setError] = useState<string | null>(null);

  // Process solution to create word mappings and letter mapping
  useEffect(() => {
    if (solution) {
      // For letter mapping - generate from cipher and solution text directly 
      // instead of relying on the API's key which might be in different format
      const letterMapping = generateLetterMapping(cipher, solution.plaintext);
      setSolution({...solution, key: formatMappingForDisplay(letterMapping)});
      
      // Word mappings code - keep existing logic
      const mapping = parseSubstitutionKey(solution.key);
      
      // Split by words and punctuation while preserving them
      const cipherWords = cipher.match(/\b[\w']+\b|\s+|[^\w\s]/g) || [];
      const plainWords = solution.plaintext.match(/\b[\w']+\b|\s+|[^\w\s]/g) || [];
      
      // Create word mappings
      const mappings: WordMapping[] = [];
      let plainIndex = 0;
      
      for (let i = 0; i < cipherWords.length; i++) {
        const cipherWord = cipherWords[i];
        // Skip spaces and punctuation for display
        if (/^\s+$/.test(cipherWord) || /^[^\w\s]$/.test(cipherWord)) {
          continue;
        }
        
        // Find corresponding plain word
        if (plainIndex < plainWords.length) {
          // Skip spaces and punctuation in plain text
          while (plainIndex < plainWords.length && 
                 (/^\s+$/.test(plainWords[plainIndex]) || /^[^\w\s]$/.test(plainWords[plainIndex]))) {
            plainIndex++;
          }
          
          if (plainIndex < plainWords.length) {
            mappings.push({
              cipherWord,
              plainWord: plainWords[plainIndex],
              isVisible: false
            });
            plainIndex++;
          }
        }
      }
      
      // Set initial mappings with all hidden
      setWordMappings(mappings);
      
      // Reveal mappings one by one with a delay
      let delay = 300;
      mappings.forEach((_, index) => {
        setTimeout(() => {
          setWordMappings(prev => {
            const updated = [...prev];
            if (updated[index]) {
              updated[index] = { ...updated[index], isVisible: true };
            }
            return updated;
          });
        }, delay);
        delay += 100;
      });
    }
  }, [solution, cipher]);

  // Format the mapping for display in the UI
  const formatMappingForDisplay = (mapping: Record<string, string>): string => {
    const cipherChars = Object.keys(mapping).sort().join('');
    const plainChars = Object.keys(mapping).sort().map(key => {
      // Capitalize the plain text letter to match the cipher letter capitalization
      return mapping[key].toUpperCase();
    }).join('');
    return `${cipherChars} -> ${plainChars}`;
  };

  const handleSolve = async () => {
    if (!cipher.trim()) {
      setError('Please enter a cipher.');
      return;
    }

    setLoading(true);
    setError(null);
    setSolution(null);
    setWordMappings([]);

    try {
      // Step 1: Submit cipher directly to the Cloudflare Worker
      console.log(`Submitting cipher to Cloudflare Worker at ${WORKER_URL}/solve`);
      const solveRes = await fetch(`${WORKER_URL}/solve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ciphertext: cipher.trim()
        }),
        // These options ensure we don't use relative URLs
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow'
      });

      if (!solveRes.ok) {
        const errorData = await solveRes.json().catch(() => ({ error: 'Failed to parse error response' }));
        throw new Error(errorData.error || `Failed to solve cipher: ${solveRes.status}`);
      }

      const solveData = await solveRes.json() as SolveResponse;
      console.log('Received solve response from worker:', solveData);

      if (!solveData.id) {
        throw new Error('No ID returned from API');
      }

      // Step 2: Poll for results directly from the Cloudflare Worker
      let statusData: SolutionData | null = null;
      let attempts = 0;
      const maxAttempts = 20;

      while (attempts < maxAttempts) {
        console.log(`Checking status (attempt ${attempts + 1}/${maxAttempts}) at ${WORKER_URL}/status`);
        const statusRes = await fetch(`${WORKER_URL}/status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: solveData.id }),
          // These options ensure we don't use relative URLs
          mode: 'cors',
          cache: 'no-cache',
          redirect: 'follow'
        });

        if (!statusRes.ok) {
          const errorData = await statusRes.json().catch(() => ({ error: 'Failed to parse error response' }));
          throw new Error(errorData.error || `Failed to get solution status: ${statusRes.status}`);
        }

        statusData = await statusRes.json() as SolutionData;
        console.log('Received status response from worker:', statusData);

        if (statusData.result === 0) {
          break;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
      }

      if (!statusData || !statusData.solutions || statusData.solutions.length === 0) {
        throw new Error('No solution found.');
      }

      // Step 3: Display best solution
      const bestSolution = statusData.solutions[0];
      setSolution(bestSolution);
    } catch (error) {
      console.error('Error in handleSolve:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Create a visual mapping from the solution key
  const renderLetterMapping = () => {
    if (!solution) return null;
    
    // Parse the mapping from the solution key that we've generated
    const mapping = parseSubstitutionKey(solution.key);
    
    // Directly generate mapping from cipher and plaintext for more accuracy
    const directMapping = generateLetterMapping(cipher, solution.plaintext);
    
    // Use the direct mapping which will be more accurate
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 shadow-lg">
        <h3 className="font-bold text-xl mb-4 text-indigo-700 dark:text-indigo-400">Letter Mapping</h3>
        <LetterMappings mapping={directMapping} />
      </div>
    );
  };

  // Render word-by-word mapping
  const renderWordMapping = () => {
    if (!solution || wordMappings.length === 0) return null;
    
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 shadow-lg">
        <h3 className="font-bold text-xl mb-4 text-purple-700 dark:text-purple-400">Word-by-Word Translation</h3>
        
        <div className="flex flex-wrap gap-3 justify-center">
          {wordMappings.map((mapping, index) => (
            <div 
              key={`word-${index}`}
              className={`flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 transition-all duration-500 transform ${mapping.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="bg-purple-100 dark:bg-purple-900/50 px-3 py-1 rounded-t-md w-full text-center">
                <span className="font-mono text-purple-700 dark:text-purple-300">{mapping.cipherWord}</span>
              </div>
              <div className="h-8 flex items-center justify-center">
                <svg className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div className="bg-pink-100 dark:bg-pink-900/50 px-3 py-1 rounded-b-md w-full text-center">
                <span className="font-bold text-pink-700 dark:text-pink-300">{mapping.plainWord}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render the full solution with formatting
  const renderFullSolution = () => {
    if (!solution) return null;
    
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl mb-6">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-800 dark:to-teal-700 px-6 py-4">
          <h3 className="font-bold text-xl text-white">Complete Solution</h3>
        </div>
        <div className="p-6">
          <p className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800 text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-medium">
            {solution.plaintext}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-800 dark:to-blue-700 rounded-t-2xl p-6 shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          Cryptogram Solver
        </h2>
        <p className="text-indigo-100 text-center">
          Unlock the secrets of cryptograms with advanced AI assistance
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-b-2xl shadow-lg p-6 mb-8">
        <div className="mb-6">
          <label htmlFor="cipher" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter your cryptogram:
          </label>
          <textarea
            id="cipher"
            value={cipher}
            onChange={(e) => setCipher(e.target.value)}
            className="w-full p-4 border border-indigo-300 dark:border-indigo-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            rows={4}
            placeholder="Enter your cryptogram here..."
          />
        </div>

        <button
          onClick={handleSolve}
          disabled={loading}
          className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span>Solve Cryptogram</span>
            </>
          )}
        </button>
      </div>

      {loading && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 dark:border-indigo-700 dark:border-t-indigo-400 rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Decrypting Your Cryptogram</h3>
            <p className="text-gray-600 dark:text-gray-400">Our AI is analyzing patterns and solving your puzzle...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-600 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-700 dark:text-red-400">Error Solving Cryptogram</h3>
              <p className="mt-1 text-sm text-red-600 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {solution && (
        <div className="space-y-6">
          {/* Complete solution display */}
          {renderFullSolution()}
          
          {/* Tabs for different mapping views */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex">
                <button
                  onClick={() => setActiveMappingTab('words')}
                  className={`px-4 py-3 text-sm font-medium ${activeMappingTab === 'words' ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Word Mapping
                </button>
                <button
                  onClick={() => setActiveMappingTab('letters')}
                  className={`px-4 py-3 text-sm font-medium ${activeMappingTab === 'letters' ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Letter Mapping
                </button>
              </nav>
            </div>
            <div className="p-4">
              {activeMappingTab === 'words' ? renderWordMapping() : renderLetterMapping()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 