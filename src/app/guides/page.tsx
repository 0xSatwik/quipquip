'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GuidesIndex() {
  // Guide articles data with images
  const guides = [
    {
      id: 'how-to-solve-cryptograms',
      title: 'How to Solve Cryptograms: A Beginner\'s Guide',
      category: 'Beginner',
      image: '/images/cryptogram-guide.jpg',
      color: 'from-green-400 to-emerald-600'
    },
    {
      id: 'advanced-cryptogram-techniques',
      title: 'Advanced Cryptogram Solving Techniques',
      category: 'Advanced',
      image: '/images/advanced-cryptogram.jpg',
      color: 'from-purple-400 to-indigo-600'
    },
    {
      id: 'cryptoquips-explained',
      title: 'Understanding Cryptoquips: History and Tips',
      category: 'Intermediate',
      image: '/images/cryptogram-history.jpg',
      color: 'from-blue-400 to-cyan-600'
    },
    {
      id: 'frequency-analysis',
      title: 'Using Frequency Analysis for Cryptograms',
      category: 'Technique',
      image: '/images/frequency-analysis.jpg',
      color: 'from-amber-400 to-orange-600'
    },
    {
      id: 'celebrity-ciphers',
      title: 'Mastering Celebrity Ciphers',
      category: 'Intermediate',
      image: '/images/celebrity-cipher.jpg',
      color: 'from-pink-400 to-rose-600'
    },
    {
      id: 'daily-cryptogram-practice',
      title: 'Daily Practice Tips for Cryptogram Enthusiasts',
      category: 'Practice',
      image: '/images/practice-tips.jpg',
      color: 'from-teal-400 to-emerald-600'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 rounded-3xl overflow-hidden mb-12 shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/10 bg-center [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-white/5 to-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-br from-white/5 to-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative py-16 px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cryptogram Guides & Tutorials
          </h1>
          <p className="text-xl text-teal-50 max-w-3xl mx-auto">
            Master the art of solving cryptograms with our comprehensive collection of expert guides
          </p>
        </div>
      </div>
      
      {/* Guides Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {guides.map((guide, index) => (
          <Link 
            key={guide.id}
            href={`/guides/${guide.id}`}
            className="group block h-full"
          >
            <div className="h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="aspect-[4/3] relative overflow-hidden">
                {/* Placeholder gradient while images are created */}
                <div className={`absolute inset-0 bg-gradient-to-br ${guide.color}`}>
                  <div className="absolute inset-0 bg-grid-white/10 mix-blend-soft-light"></div>
                </div>
                
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10"></div>
                
                <div className="absolute top-4 left-4 z-20">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full 
                    ${guide.category === 'Beginner' ? 'bg-green-100 text-green-800' : 
                    guide.category === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                    guide.category === 'Advanced' ? 'bg-purple-100 text-purple-800' :
                    guide.category === 'Technique' ? 'bg-amber-100 text-amber-800' :
                    'bg-teal-100 text-teal-800'}`}
                  >
                    {guide.category}
                  </span>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <span className="bg-white/90 dark:bg-gray-900/90 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    Read Article
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                  {guide.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-700 dark:to-blue-700 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 mix-blend-soft-light"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8 md:max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Test Your Skills?
              </h2>
              <p className="text-indigo-100 text-lg">
                Put your cryptogram-solving knowledge to the test with our interactive solver, or check out the daily cryptogram solutions to keep practicing.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/solver" 
                className="inline-flex items-center justify-center bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-xl transition-all duration-200"
              >
                Try the Solver
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                href="/daily" 
                className="inline-flex items-center justify-center bg-indigo-800 text-white hover:bg-indigo-700 px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-xl transition-all duration-200"
              >
                Daily Solutions
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 