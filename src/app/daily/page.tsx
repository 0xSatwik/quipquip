'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
      </svg>
    )
  },
  { 
    id: 'celebrity', 
    name: 'Celebrity Cipher', 
    color: 'purple',
    description: 'Quotes from famous celebrities encoded as cryptograms',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    )
  },
  { 
    id: 'cryptoquote', 
    name: 'Cryptoquote of the Day', 
    color: 'emerald',
    description: 'Famous quotes and sayings encoded as cryptograms',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
      </svg>
    )
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 dark:from-indigo-800 dark:via-blue-800 dark:to-purple-800 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-3 relative z-10">
            Daily Cryptogram Solutions
          </h1>
          <p className="text-indigo-100 text-center text-lg max-w-2xl mx-auto relative z-10">
            Get instant access to today's decoded cryptogram puzzles and improve your solving skills
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-8">
          <p className="text-gray-600 dark:text-gray-300 mb-10 text-center max-w-3xl mx-auto">
            Our daily solutions provide instant answers to popular letter-substitution puzzles, helping you understand the patterns and techniques for solving cryptograms on your own.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutionTypes.map((type, index) => (
              <motion.div
                key={type.id}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link 
                  href={`/daily/${type.id}`}
                  className="group block h-full"
                >
                  <div className={`bg-gradient-to-br from-${type.color}-500 to-${type.color}-700 dark:from-${type.color}-700 dark:to-${type.color}-900 rounded-xl p-6 shadow-lg transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl relative overflow-hidden h-full`}>
                    <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-white/10 blur-md"></div>
                    <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-md"></div>
                    
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full bg-${type.color}-400/30 flex items-center justify-center text-white mr-4`}>
                        {type.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white group-hover:text-white/90">
                          {type.name}
                        </h2>
                        <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/30 text-white">
                          <span className="relative flex h-2 w-2 mr-1">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                          </span>
                          Updated Today
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-white/80 mb-6 mt-2">
                      {type.description}
                    </p>
                    
                    <div className="absolute bottom-5 right-5">
                      <div className="bg-white/20 group-hover:bg-white/30 rounded-full p-2 transition-all duration-300">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 shadow-lg border border-indigo-100 dark:border-indigo-900/50"
      >
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-6 md:mb-0 md:mr-8">
            <div className="bg-indigo-600 rounded-full p-5 w-16 h-16 flex items-center justify-center mx-auto md:mx-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
          </div>
          <div className="md:flex-1">
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-indigo-800 dark:text-indigo-300 text-center md:text-left">
              Have your own cryptogram to solve?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-5 text-center md:text-left">
              Try our powerful AI-driven cryptogram solver to instantly decode any letter-substitution puzzle, or check out our guides to learn solving techniques.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link 
                href="/solver" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Try the Solver
              </Link>
              <Link 
                href="/guides" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Read Our Guides
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 