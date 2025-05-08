'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 rounded-t-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            About Cryptogram Solver
          </h1>
          <p className="text-lg text-indigo-100 max-w-3xl mx-auto text-center">
            The ultimate tool for decoding cryptograms, cryptoquips, and more
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-b-2xl shadow-lg p-8 mb-8">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Cryptogram Solver was created to make solving cryptograms accessible to everyone. Whether you're stuck on a difficult cryptoquip or just want to check your work on a celebrity cipher, our powerful AI-driven tools make decoding letter-substitution puzzles quick and accurate.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            We provide daily solutions to popular cryptogram puzzles while also offering educational resources to help you improve your own solving skills.
          </p>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Our Features</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Advanced AI-powered cryptogram solver for instant decoding</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Daily solutions for Cryptoquips, Celebrity Ciphers, and Cryptoquotes</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Educational guides and solving techniques for cryptogram enthusiasts</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 bg-gradient-to-r from-gray-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20 rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-400 text-center">Ready to Try It?</h2>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/solver" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            Try the Solver
          </Link>
          <Link 
            href="/daily" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            View Daily Solutions
          </Link>
          <Link 
            href="/contact" 
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
} 