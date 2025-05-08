'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// API endpoints
const API_ENDPOINTS = {
  cryptoquip: 'https://cryptoquip-worker.akagautam7.workers.dev/',
  cryptoquote: 'https://cryptoquote-worker.akagautam7.workers.dev/',
};

// Solution types with metadata
const solutionTypes = [
  { 
    id: 'cryptoquip', 
    name: 'Daily Cryptoquip', 
    color: 'blue',
    description: 'Daily cryptogram puzzles with clever puns and wordplay',
    source: 'King Features Syndicate'
  },
  { 
    id: 'celebrity', 
    name: 'Celebrity Cipher', 
    color: 'purple',
    description: 'Quotes from famous celebrities encoded as cryptograms',
    source: 'Tribune Content Agency'
  },
  { 
    id: 'cryptoquote', 
    name: 'Cryptoquote of the Day', 
    color: 'emerald',
    description: 'Famous quotes and sayings encoded as cryptograms',
    source: 'Universal Uclick'
  }
];

interface SolutionStatus {
  available: boolean;
  author?: string;
  loading: boolean;
  error?: string;
}

export default function DailyIndex() {
  const [solutionStatus, setSolutionStatus] = useState<Record<string, SolutionStatus>>({
    cryptoquip: { available: true, loading: true },
    cryptoquote: { available: true, loading: true },
    celebrity: { available: true, loading: false }
  });

  useEffect(() => {
    // Function to check solution availability
    const checkSolution = async (type: string, endpoint: string) => {
      try {
        const response = await fetch(endpoint, { 
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
          const data = await response.json();
          return {
            available: true,
            author: data.author,
            loading: false
          };
        } else {
          return {
            available: true, // Always show as available
            loading: false
          };
        }
      } catch (error) {
        console.error(`Error checking ${type} solution:`, error);
        return {
          available: true, // Always show as available even if API fails
          loading: false
        };
      }
    };

    // Check each solution type with an API endpoint
    const checkAllSolutions = async () => {
      const statusUpdates: Record<string, SolutionStatus> = { ...solutionStatus };
      
      for (const [type, endpoint] of Object.entries(API_ENDPOINTS)) {
        statusUpdates[type] = await checkSolution(type, endpoint);
      }
      
      // For Celebrity, we leave it hard-coded for now
      if (!statusUpdates.celebrity) {
        statusUpdates.celebrity = {
          available: true,
          loading: false
        };
      }
      
      setSolutionStatus(statusUpdates);
    };

    checkAllSolutions();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 fade-in">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-800 dark:to-blue-700 rounded-t-2xl p-6 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          Daily Solutions
        </h1>
        <p className="text-indigo-100 text-center">
          Check out today's cryptogram solutions
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-b-2xl shadow-lg p-6 mb-8">
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          We provide solutions for popular cryptogram puzzles including Cryptoquips, Celebrity Ciphers, and Cryptoquotes updated daily.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutionTypes.map(type => (
            <Link 
              key={type.id}
              href={`/daily/${type.id}`}
              className={`block bg-${type.color}-50 dark:bg-${type.color}-900/30 border border-${type.color}-200 dark:border-${type.color}-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 relative overflow-hidden`}
            >
              {solutionStatus[type.id]?.loading && (
                <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 dark:border-indigo-700 dark:border-t-indigo-400 rounded-full animate-spin"></div>
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <h2 className={`text-xl font-bold text-${type.color}-700 dark:text-${type.color}-400`}>
                  {type.name}
                </h2>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  Available
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {type.description}
              </p>
              
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {type.source}
              </div>
              
              <div className="mt-4 text-right">
                <span className={`inline-block px-3 py-1 bg-${type.color}-600 text-white rounded-lg text-sm`}>
                  View Solution
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-gray-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20 rounded-xl p-6 shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 text-indigo-800 dark:text-indigo-300">
          Have your own cryptogram to solve?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Try our powerful cryptogram solver to instantly decode any cryptogram, or check out our guides to learn how to solve them yourself.
        </p>
        <div className="flex flex-wrap gap-4">
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
            Read Our Guides
          </Link>
        </div>
      </div>
    </div>
  );
} 