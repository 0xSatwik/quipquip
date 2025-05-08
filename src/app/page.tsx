'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900 py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to Cryptogram Solver
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-indigo-100">
            Your all-in-one resource for solving and learning about cryptograms, cryptoquips, 
            cryptoquotes, and more with our advanced AI-powered tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/solver"
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              Try the Solver
            </Link>
            <Link
              href="/daily"
              className="bg-indigo-800 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              Daily Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Everything You Need For Cryptograms
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Solver Feature */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                Powerful Solver
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our AI-powered solver can quickly decrypt cryptograms of all types with exceptional accuracy.
              </p>
              <Link 
                href="/solver" 
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                Try it now →
              </Link>
            </div>
            
            {/* Daily Solutions Feature */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                Daily Solutions
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get solutions for today's cryptoquips, celebrity ciphers, and cryptoquotes from popular publications.
              </p>
              <Link 
                href="/daily" 
                className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800 dark:hover:text-purple-300"
              >
                See today's puzzles →
              </Link>
            </div>
            
            {/* Guides Feature */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                Helpful Guides
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Learn how to solve cryptograms yourself with our comprehensive tutorials and tips.
              </p>
              <Link 
                href="/guides" 
                className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-800 dark:hover:text-emerald-300"
              >
                Read our guides →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Solutions Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Latest Daily Solutions
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-full mx-auto mb-4"></div>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Access today's solutions for popular cryptogram puzzles from leading publications
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-900 p-5 text-white relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-blue-400/20 dark:bg-blue-300/10"></div>
                <div className="absolute right-8 bottom-4 w-12 h-12 rounded-full bg-blue-400/20 dark:bg-blue-300/10"></div>
                <h3 className="font-bold text-xl relative z-10">Cryptoquip</h3>
                <p className="text-sm text-blue-100 relative z-10">King Features Syndicate</p>
              </div>
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">Today's Puzzle</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Clever puns and wordplay</p>
                  </div>
                </div>
                <Link 
                  href="/daily/cryptoquip" 
                  className="mt-2 inline-flex items-center justify-center w-full bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/50 text-blue-700 dark:text-blue-300 py-2.5 rounded-lg font-medium transition-colors group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-700"
                >
                  <span>View solution</span>
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-900 p-5 text-white relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-purple-400/20 dark:bg-purple-300/10"></div>
                <div className="absolute right-8 bottom-4 w-12 h-12 rounded-full bg-purple-400/20 dark:bg-purple-300/10"></div>
                <h3 className="font-bold text-xl relative z-10">Celebrity Cipher</h3>
                <p className="text-sm text-purple-100 relative z-10">Tribune Content Agency</p>
              </div>
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">Today's Quote</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">From famous celebrities</p>
                  </div>
                </div>
                <Link 
                  href="/daily/celebrity" 
                  className="mt-2 inline-flex items-center justify-center w-full bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-800/50 text-purple-700 dark:text-purple-300 py-2.5 rounded-lg font-medium transition-colors group-hover:bg-purple-600 group-hover:text-white dark:group-hover:bg-purple-700"
                >
                  <span>View solution</span>
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 dark:from-emerald-600 dark:to-emerald-900 p-5 text-white relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-emerald-400/20 dark:bg-emerald-300/10"></div>
                <div className="absolute right-8 bottom-4 w-12 h-12 rounded-full bg-emerald-400/20 dark:bg-emerald-300/10"></div>
                <h3 className="font-bold text-xl relative z-10">Cryptoquote</h3>
                <p className="text-sm text-emerald-100 relative z-10">Universal Uclick</p>
              </div>
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">Today's Quote</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Famous sayings encoded</p>
                  </div>
                </div>
                <Link 
                  href="/daily/cryptoquote" 
                  className="mt-2 inline-flex items-center justify-center w-full bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 text-emerald-700 dark:text-emerald-300 py-2.5 rounded-lg font-medium transition-colors group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-700"
                >
                  <span>View solution</span>
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/daily" 
              className="inline-flex items-center px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>View All Daily Solutions</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Guide Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Featured Guide
          </h2>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              How to Solve Cryptograms: A Beginner's Guide
            </h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Cryptograms may seem daunting at first, but with a few simple techniques, you can quickly start deciphering these letter-substitution puzzles...
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  The most common approach is to look for patterns in the encrypted text. Single-letter words in English are almost always 'a' or 'i'. The most common three-letter words are typically 'the', 'and', or 'for'. By identifying these patterns...
                </p>
                <Link 
                  href="/guides/how-to-solve-cryptograms" 
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 inline-flex items-center"
                >
                  Read the full guide
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
              <div className="md:w-1/3 flex justify-center items-center">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded text-center">
                      <span className="text-indigo-800 dark:text-indigo-300 font-mono">A → X</span>
                    </div>
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded text-center">
                      <span className="text-indigo-800 dark:text-indigo-300 font-mono">T → N</span>
                    </div>
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded text-center">
                      <span className="text-indigo-800 dark:text-indigo-300 font-mono">E → Q</span>
                    </div>
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded text-center">
                      <span className="text-indigo-800 dark:text-indigo-300 font-mono">I → R</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              href="/guides" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center"
            >
              Explore All Guides
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to solve your cryptogram?
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto text-indigo-100">
            Try our powerful solver now or explore our daily solutions and guides.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/solver"
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              Try the Solver
            </Link>
            <Link
              href="/daily"
              className="bg-indigo-800 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              Daily Solutions
            </Link>
            <Link
              href="/guides"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              Read Our Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 