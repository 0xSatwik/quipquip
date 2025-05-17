'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function SolverInterface() {
  const [cipherText, setCipherText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [iterations, setIterations] = useState(100);
  const [maxResults, setMaxResults] = useState(10);
  const [dictionaryWeight, setDictionaryWeight] = useState(5);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<Array<{score: string, key: string, text: string}>>([]);
  const [manualMode, setManualMode] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [letterMap, setLetterMap] = useState<Record<string, string>>({});
  const workerRef = useRef<Worker | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [showSettings, setShowSettings] = useState(false);

  // Initialize the worker
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Create a worker
        workerRef.current = new Worker('/mono-cryptanalysis.js');
        setupWorkerListeners();
      } catch (err) {
        console.error('Error initializing worker:', err);
        setError('Could not load the solver components. Using simple frequency analysis instead.');
      }
    }
    
    return () => {
      // Clean up worker when component unmounts
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  // Reset letter mapping when cipher text changes or mode changes
  useEffect(() => {
    if (manualMode) {
      // Reset letter mapping when starting manual mode or changing cipher text
      setLetterMap({});
    }
  }, [manualMode, cipherText]);

  // Get unique letters from cipher text
  const getUniqueLetters = () => {
    const letters = new Set<string>();
    cipherText.toUpperCase().split('').forEach(char => {
      if (/[A-Z]/.test(char)) {
        letters.add(char);
      }
    });
    return Array.from(letters).sort();
  };

  // Get solution text from letter mapping
  const getSolutionText = () => {
    return cipherText.split('').map(char => {
      const upperChar = char.toUpperCase();
      if (/[A-Z]/.test(upperChar)) {
        return letterMap[upperChar] || '_';
      }
      return char; // Keep all non-alphabetic characters as they are
    }).join('');
  };

  // Handle letter substitution change
  const handleLetterChange = (cipherLetter: string, value: string) => {
    setLetterMap(prev => {
      const newMap = { ...prev };
      if (value === '') {
        delete newMap[cipherLetter];
      } else {
        // Only keep the first character and convert to uppercase
        newMap[cipherLetter] = value.charAt(0).toUpperCase();
      }
      return newMap;
    });
  };

  // Start manual solving
  const startManualSolving = () => {
    if (!cipherText.trim()) {
      setError('Please enter a cipher text.');
      return;
    }

    setError(null);
    setManualMode(true);
    setAutoMode(false);
    setLetterMap({});
  };

  // Start auto solving
  const startAutoSolving = () => {
    if (!cipherText.trim()) {
      setError('Please enter a cipher text.');
      return;
    }
    
    // First cancel any ongoing solve operation and reset the worker
    if (loading) {
      cancelAutoSolving();
    }
    
    // Ensure worker is available and reset
    if (!workerRef.current) {
      try {
        // Create a new worker if it doesn't exist
        workerRef.current = new Worker('/mono-cryptanalysis.js');
        setupWorkerListeners();
      } catch (err) {
        console.error('Error creating worker:', err);
        setError('Solver not available. Please try again later.');
        return;
      }
    } else {
      // Terminate and recreate worker to ensure clean state
      workerRef.current.terminate();
      workerRef.current = new Worker('/mono-cryptanalysis.js');
      setupWorkerListeners();
    }
    
    // Setup state for new solve operation
    setError(null);
    setManualMode(false);
    setAutoMode(true);
    setLoading(true);
    setProgress(0);
    setResults([]);
    
    // Short delay to ensure worker is ready before sending message
    setTimeout(() => {
      if (workerRef.current) {
        // Send the solve request to the worker
        workerRef.current.postMessage({
          inputText: cipherText,
          lang: 'en', // Always English
          iterations: iterations,
          maxResults: maxResults,
          dictionaryWeight: dictionaryWeight,
          spacingMode: 0, // Always Automatic
          reportInterval: 10,
          fastConvergence: true,
          mode: 'general'
        });
      }
    }, 100);
  };

  // Function to set up worker message listeners
  const setupWorkerListeners = () => {
    if (!workerRef.current) return;
    
    // Handle messages from the worker
    workerRef.current.onmessage = (e) => {
      const data = e.data;
      
      if (data.progress !== undefined) {
        setProgress(data.progress);
      }
      
      if (data.items) {
        setResults(data.items);
      }
      
      if (data.isFinal) {
        setLoading(false);
        // Scroll to results section when solution is ready
        if (resultsRef.current) {
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300); // Small delay to ensure state updates and rendering are complete
        }
      }
    };
    
    // Signal that the worker is ready
    workerRef.current.postMessage({ ready: true });
  };

  // Cancel auto solving
  const cancelAutoSolving = () => {
    if (workerRef.current) {
      // Terminate the worker to stop processing
      workerRef.current.terminate();
      
      // Create a new worker instance
      workerRef.current = new Worker('/mono-cryptanalysis.js');
      setupWorkerListeners();
    }
    
    setLoading(false);
    setAutoMode(false);
  };

  // Highlight frequent patterns
  const highlightFrequentPatterns = () => {
    // Find repeated patterns of 2-4 letters
    const patterns: Record<string, number> = {};
    const text = cipherText.toUpperCase().replace(/[^A-Z]/g, '');
    
    // Look for patterns of length 2-4
    for (let len = 2; len <= 4; len++) {
      for (let i = 0; i <= text.length - len; i++) {
        const pattern = text.substr(i, len);
        // Only track valid patterns (all letters)
        if (/^[A-Z]+$/.test(pattern)) {
          patterns[pattern] = (patterns[pattern] || 0) + 1;
        }
      }
    }
    
    // Filter to patterns that appear at least twice
    const frequentPatterns = Object.keys(patterns)
      .filter(p => patterns[p] >= 2)
      .sort((a, b) => patterns[b] - patterns[a])
      .slice(0, 10); // Top 10 most frequent
    
    // Display these patterns
    alert(`Most frequent patterns in your cipher:
${frequentPatterns.map(p => `${p}: appears ${patterns[p]} time${patterns[p] > 1 ? 's' : ''}`).join('\n')}

Common English patterns:
THE, AND, THAT, HAVE, WITH, THIS, FROM, THEY, WILL
Common letter pairs: TH, HE, AN, IN, ER, ON, AT, ND, ST, ES, EN`);
  };

  // Suggest common words - provide hints for common English patterns
  const suggestCommonWords = () => {
    const suggestions = [
      { word: 'the', hint: 'Most common 3-letter word' },
      { word: 'and', hint: 'Common conjunction' },
      { word: 'that', hint: 'Common 4-letter word' },
      { word: 'have', hint: 'Common verb' },
      { word: 'with', hint: 'Common preposition' },
      { word: 'this', hint: 'Common demonstrative' },
      { word: 'from', hint: 'Common preposition' },
      { word: 'they', hint: 'Common pronoun' },
      { word: 'will', hint: 'Common modal verb' },
    ];
    
    // Get frequency analysis of the cipher
    const freq: Record<string, number> = {};
    cipherText.toUpperCase().split('').forEach(char => {
      if (/[A-Z]/.test(char)) {
        freq[char] = (freq[char] || 0) + 1;
      }
    });
    
    // Sort by frequency
    const sortedChars = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);
    
    // Create a suggestion message
    let message = 'Based on frequency analysis:\n\n';
    
    // Add the most frequent letters
    message += 'Most frequent letters in your cipher:\n';
    sortedChars.slice(0, 6).forEach(char => {
      message += `${char}: ${freq[char]} occurrences\n`;
    });
    
    message += '\nMost frequent letters in English: E, T, A, O, I, N\n\n';
    
    message += 'Common words to look for:\n';
    suggestions.forEach(({ word, hint }) => {
      message += `${word.toUpperCase()} - ${hint}\n`;
    });
    
    alert(message);
  };

  // Reset the solution
  const resetKey = () => {
    setLetterMap({});
  };

  // Text manipulation functions
  const removeSpaces = () => {
    setCipherText(prev => prev.replace(/\s+/g, ''));
  };

  const lettersOnly = () => {
    setCipherText(prev => prev.replace(/[^A-Za-z]/g, ''));
  };

  const toUpperCase = () => {
    setCipherText(prev => prev.toUpperCase());
  };

  const toLowerCase = () => {
    setCipherText(prev => prev.toLowerCase());
  };

  return (
    <div className="max-w-5xl mx-auto p-2 sm:p-6">
      <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-slate-800 dark:to-indigo-950 rounded-xl shadow-lg p-4 sm:p-8 border border-indigo-100 dark:border-indigo-900">
        <div className="relative mb-8">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-20"></div>
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20"></div>
          
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
            Cryptoquip Solver
          </h1>
          
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mb-2">
            Solve <span className="font-semibold text-indigo-700 dark:text-indigo-400">Cryptoquips</span>, 
            <span className="font-semibold text-purple-700 dark:text-purple-400"> Cryptograms</span>, 
            <span className="font-semibold text-blue-700 dark:text-blue-400"> Cryptoquotes</span>, and 
            <span className="font-semibold text-teal-700 dark:text-teal-400"> Celebrity Ciphers</span> with our powerful solver tool.
          </p>
          
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Our advanced algorithm helps you decode substitution puzzles where each letter consistently 
            represents another letter. Perfect for puzzle enthusiasts looking to solve newspaper cryptograms 
            and online cipher challenges quickly.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      
        <div className="mb-8">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-950 rounded-xl p-3 sm:p-6 border border-indigo-100 dark:border-indigo-900 shadow-md">
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              Enter your cipher text:
            </h2>
            <div className="relative">
              <textarea
                className="w-full p-4 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg bg-white dark:bg-gray-800 
                         text-gray-800 dark:text-gray-200 text-lg font-mono shadow-inner
                         focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 focus:outline-none
                         transition-all duration-200"
                rows={5}
                value={cipherText}
                onChange={(e) => setCipherText(e.target.value)}
                spellCheck="false"
                placeholder="ENTER YOUR CRYPTOQUIP, CRYPTOGRAM, OR CRYPTOQUOTE HERE..."
                style={{ resize: 'vertical' }}
              />
              <div className="absolute -bottom-1 -right-1 w-16 h-16 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-20"></div>
              <div className="absolute -top-1 -left-1 w-12 h-12 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20"></div>
            </div>
            
            <div className="mt-4 text-sm text-indigo-700 dark:text-indigo-400 italic">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Paste your encoded text exactly as it appears in the puzzle.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <button 
            onClick={() => setShowSettings(!showSettings)} 
            className="flex items-center justify-between w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
          >
            <span className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Advanced Settings
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-200 ${showSettings ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {showSettings && (
            <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md animate-slideDown">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="iterations">
                    Iterations:
                  </label>
                  <input 
                    type="number"
                    id="iterations"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                    min="1"
                    max="10000"
                    value={iterations}
                    onChange={(e) => setIterations(parseInt(e.target.value))}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Higher values may produce better results but take longer (100-500 recommended)</p>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="maxResults">
                    Max Results:
                  </label>
                  <input 
                    type="number"
                    id="maxResults"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                    min="1"
                    max="1000"
                    value={maxResults}
                    onChange={(e) => setMaxResults(parseInt(e.target.value))}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Number of potential solutions to display</p>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="dictionaryWeight">
                    Dictionary Weight:
                  </label>
                  <input 
                    type="number"
                    id="dictionaryWeight"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                    min="0"
                    max="100"
                    value={dictionaryWeight}
                    onChange={(e) => setDictionaryWeight(parseInt(e.target.value))}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">How much to prioritize dictionary words (5-10 recommended)</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button 
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 mr-3"
            onClick={startManualSolving}
            disabled={loading}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              Manual Solving
            </span>
          </button>

          <button
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            onClick={startAutoSolving}
            disabled={loading}
            style={{ display: loading ? 'none' : 'inline-flex' }}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
              </svg>
              Auto Solve
            </span>
          </button>
          
          <button 
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            onClick={cancelAutoSolving}
            style={{ display: loading ? 'inline-flex' : 'none' }}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Cancel
            </span>
          </button>
        </div>

        {manualMode && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Manual Solving</h3>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-indigo-950 border border-indigo-200 dark:border-indigo-900 rounded-xl p-3 sm:p-6 shadow-lg relative">
              {/* Cipher Text Display */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-indigo-700 dark:text-indigo-400 mb-3 inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Cipher Text:
                </h4>
                <div className="p-4 border border-indigo-200 dark:border-indigo-800 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono text-xl text-center tracking-wider shadow-inner">
                  {cipherText}
                </div>
              </div>
              
              {/* Solution Display */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-green-700 dark:text-green-500 mb-3 inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  Solution:
                </h4>
                <div className="p-4 border border-green-200 dark:border-green-900 rounded-lg bg-white dark:bg-gray-900 text-green-800 dark:text-green-400 font-mono text-xl text-center tracking-wider shadow-inner min-h-16">
                  {getSolutionText()}
                </div>
              </div>
              
              {/* Letter Substitution Inputs */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-purple-700 dark:text-purple-400 mb-4 inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Enter letter substitutions:
                </h4>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 bg-white dark:bg-gray-900 p-5 rounded-lg border border-purple-100 dark:border-purple-900 shadow-inner">
                  {getUniqueLetters().map(letter => (
                    <div key={letter} className="flex flex-col items-center group">
                      <div className="text-2xl font-bold mb-2 text-indigo-700 dark:text-indigo-400">{letter}</div>
                      <input
                        type="text"
                        maxLength={1}
                        value={letterMap[letter] || ''}
                        onChange={(e) => handleLetterChange(letter, e.target.value)}
                        className="w-12 h-12 text-center border-2 border-indigo-300 dark:border-indigo-700 rounded-lg text-lg font-bold 
                          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 focus:outline-none
                          transition-all duration-200 transform group-hover:scale-110 shadow-sm 
                          bg-white dark:bg-gray-800 text-purple-800 dark:text-purple-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Letters Used */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-blue-700 dark:text-blue-400 mb-3 inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  Letters Used:
                </h4>
                <div className="flex flex-wrap gap-2 bg-white dark:bg-gray-900 p-4 rounded-lg border border-blue-100 dark:border-blue-900 shadow-inner">
                  {Array.from('abcdefghijklmnopqrstuvwxyz').map(letter => {
                    const isUsed = Object.values(letterMap).includes(letter);
                    return (
                      <div 
                        key={letter} 
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-center font-bold transition-all duration-300 transform ${
                          isUsed 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white dark:from-blue-600 dark:to-indigo-700 dark:text-white scale-110 shadow-md' 
                            : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {letter}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Help Buttons */}
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <button
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 flex items-center"
                  onClick={highlightFrequentPatterns}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd" />
                  </svg>
                  Find Patterns
                </button>
                <button
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 flex items-center"
                  onClick={suggestCommonWords}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Word Hints
                </button>
                <button
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 flex items-center"
                  onClick={resetKey}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Reset Key
                </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-20 -mt-10 -mr-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20 -mb-8 -ml-8"></div>
            </div>
          </div>
        )}

        {autoMode && (
          <div className="mb-6" ref={resultsRef}>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Auto Solve Results</h3>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-green-950 border border-green-200 dark:border-green-900 rounded-xl p-3 sm:p-6 shadow-lg relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 dark:bg-green-900 rounded-full opacity-20 -mt-10 -mr-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-teal-200 dark:bg-teal-900 rounded-full opacity-20 -mb-8 -ml-8"></div>
              
              {/* Progress bar */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-green-700 dark:text-green-500 mb-3 inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Progress: {progress}%
                </h4>
                
                <div className="w-full h-5 bg-green-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-teal-500 dark:from-green-500 dark:to-teal-600 rounded-full transition-all duration-300 flex items-center justify-center"
                    style={{ width: `${progress}%` }}
                  >
                    {progress > 10 && (
                      <span className="text-xs text-white font-semibold">{progress}%</span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Best Match Highlight (displayed when results are available) */}
              {results.length > 0 && (
                <div className="mb-4 mt-1">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-500 dark:from-emerald-600 dark:to-teal-700 p-1 rounded-xl shadow-lg transform hover:scale-[1.01] transition-all duration-300">
                      <div className="bg-white dark:bg-gray-900 p-2 rounded-lg">
                        <div className="mb-1 flex justify-between items-center">
                          <h4 className="text-lg md:text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                            </svg>
                            Top Solution
                          </h4>
                          <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 px-2 py-1 rounded-full text-sm sm:text-base font-bold">
                            Score: {results[0].score}
                          </span>
                        </div>
                        
                        <div className="p-2 bg-emerald-50 dark:bg-gray-800 border border-emerald-100 dark:border-emerald-900 rounded-lg shadow-inner">
                          <p className="font-mono text-base sm:text-lg tracking-wide text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                            {(() => {
                              try {
                                // Same algorithm as the table rows
                                const upperCipherText = cipherText.toUpperCase();
                                const upperSolutionText = results[0].text.toUpperCase();
                                
                                let cipherAlpha = '';
                                let positions: number[] = [];
                                
                                for (let i = 0; i < upperCipherText.length; i++) {
                                  if (/[A-Z]/.test(upperCipherText[i])) {
                                    cipherAlpha += upperCipherText[i];
                                    positions.push(i);
                                  }
                                }
                                
                                const solutionAlpha = upperSolutionText.replace(/[^A-Z]/g, '');
                                const resultArray = upperCipherText.split('');
                                
                                for (let i = 0; i < positions.length && i < solutionAlpha.length; i++) {
                                  resultArray[positions[i]] = solutionAlpha[i];
                                }
                                
                                return resultArray.join('');
                              } catch (error) {
                                console.error('Error in best solution mapping:', error);
                                return results[0].text.toUpperCase();
                              }
                            })()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Results table */}
              {results.length > 1 && (
                <div className="mt-4 sm:mt-8">
                  <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Alternative Solutions
                  </h4>
                  <div className="overflow-hidden rounded-xl border border-green-200 dark:border-green-800 shadow-md">
                    <div className="overflow-x-auto bg-white dark:bg-gray-900">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
                            <th className="py-3 px-4 text-left font-semibold w-24 border-r border-green-400 dark:border-green-700">Score</th>
                            <th className="py-3 px-4 text-left font-semibold">Solution Text</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-green-100 dark:divide-green-900">
                          {results.slice(1).map((result, index) => (
                            <tr 
                              key={index} 
                              className={`${
                                index % 2 === 0 
                                  ? 'bg-green-50 dark:bg-gray-900' 
                                  : 'bg-white dark:bg-gray-800'
                              } hover:bg-green-100 dark:hover:bg-green-900 transition-colors duration-150`}
                            >
                              <td className="py-2 px-2 sm:py-3 sm:px-4 border-r border-green-100 dark:border-green-800 font-medium text-green-700 dark:text-green-400">{result.score}</td>
                              <td className="py-2 px-2 sm:py-3 sm:px-4 font-mono text-gray-800 dark:text-gray-200">
                                {(() => {
                                  try {
                                    // Same algorithm as before
                                    const upperCipherText = cipherText.toUpperCase();
                                    const upperSolutionText = result.text.toUpperCase();
                                    
                                    let cipherAlpha = '';
                                    let positions: number[] = [];
                                    
                                    for (let i = 0; i < upperCipherText.length; i++) {
                                      if (/[A-Z]/.test(upperCipherText[i])) {
                                        cipherAlpha += upperCipherText[i];
                                        positions.push(i);
                                      }
                                    }
                                    
                                    const solutionAlpha = upperSolutionText.replace(/[^A-Z]/g, '');
                                    const resultArray = upperCipherText.split('');
                                    
                                    for (let i = 0; i < positions.length && i < solutionAlpha.length; i++) {
                                      resultArray[positions[i]] = solutionAlpha[i];
                                    }
                                    
                                    return resultArray.join('');
                                  } catch (error) {
                                    console.error('Error in solution mapping:', error);
                                    return result.text.toUpperCase();
                                  }
                                })()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              
              {results.length > 0 && (
                <div className="mt-5 text-center">
                  <p className="text-green-700 dark:text-green-400 italic">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Higher scores indicate more likely solutions.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        </div>
      
      <style jsx>{`
        .crypto-tool-letter {
          display: inline-block;
          margin: 0.1em;
          padding: 0.2em 0.1em;
          line-height: 1.1em;
          text-align: center;
          cursor: pointer;
          font-weight: bold;
        }
        
        .crypto-tool-letter.selected {
          background-color: #ffff00;
          color: #000000;
        }
        
        .crypto-tool-letter-mapped {
          display: block;
          font-size: 0.8em;
          color: #666;
        }
        
        .crypto-tool-letter-container {
          display: inline-block;
          text-align: center;
          margin: 0 0.1em;
        }
        
        .crypto-tool-letter-input {
          width: 1.6em;
          text-align: center;
          padding-left: 0;
          padding-right: 0;
        }
        
        .crypto-tool-key-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.5em;
        }
        
        .crypto-tool-key-cipher {
          font-weight: bold;
          margin-right: 0.5em;
        }
        
        /* New styles for the improved manual solving interface */
        .cipher-text-container {
          line-height: 1.6;
          text-align: center;
          font-size: 16px;
          word-wrap: break-word;
          max-width: 100%;
          padding: 5px;
        }
        
        .cipher-letter {
          display: inline-block;
          font-weight: normal;
          cursor: pointer;
          margin: 0 1px;
        }
        
        .cipher-letter.selected {
          background-color: yellow;
          padding: 0 2px;
        }
        
        .non-letter {
          display: inline-block;
          margin: 0 1px;
        }
        
        .key-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px 0;
          width: 100%;
        }
        
        .key-mapping-row {
          display: flex;
          margin: 2px 0;
          width: 100px;
        }
        
        .key-cipher-letter {
          display: inline-block;
          width: 25px;
          font-size: 18px;
          font-weight: bold;
          margin-right: 15px;
          text-align: left;
          cursor: pointer;
        }
        
        .key-cipher-letter.selected {
          background-color: yellow;
          padding: 0 2px;
        }
        
        .key-plain-letter {
          display: inline-block;
          width: 25px;
          font-size: 18px;
          text-transform: lowercase;
        }

        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 