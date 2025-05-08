'use client';

import React from 'react';
import Link from 'next/link';

export default function GuidesIndex() {
  // Guide articles data
  const guides = [
    {
      id: 'how-to-solve-cryptograms',
      title: 'How to Solve Cryptograms: A Beginner\'s Guide',
      description: 'Learn the basic techniques and strategies for solving letter-substitution cryptograms.',
      date: 'May 7, 2024',
      category: 'Beginner',
      readTime: '8 min read'
    },
    {
      id: 'advanced-cryptogram-techniques',
      title: 'Advanced Cryptogram Solving Techniques',
      description: 'Take your cryptogram-solving skills to the next level with these advanced strategies.',
      date: 'May 5, 2024',
      category: 'Advanced',
      readTime: '12 min read'
    },
    {
      id: 'cryptoquips-explained',
      title: 'Understanding Cryptoquips: History and Tips',
      description: 'Discover the history behind Cryptoquips and effective methods for solving them quickly.',
      date: 'May 3, 2024',
      category: 'Intermediate',
      readTime: '10 min read'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 fade-in">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-800 dark:to-teal-700 rounded-t-2xl p-6 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          Cryptogram Guides
        </h1>
        <p className="text-emerald-100 text-center">
          Learn how to solve cryptograms with our comprehensive guides and tutorials
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-b-2xl shadow-lg p-6 mb-8">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Our guides will help you understand cryptograms and develop the skills to solve them on your own. 
          From beginner tips to advanced techniques, we cover everything you need to know about cryptogram solving.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map(guide => (
            <Link
              key={guide.id}
              href={`/guides/${guide.id}`}
              className="block bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-center mb-3">
                <span className={`px-2 py-1 text-xs font-medium rounded 
                  ${guide.category === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                  guide.category === 'Intermediate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                  'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'}`}
                >
                  {guide.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-3">
                  {guide.date} • {guide.readTime}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                {guide.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {guide.description}
              </p>
              <div className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-800 dark:hover:text-emerald-300 inline-flex items-center">
                Read guide
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6 shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 text-indigo-800 dark:text-indigo-300">
          Can't find what you're looking for?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Try our powerful cryptogram solver to instantly decode any cryptogram, or check out our daily solutions.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link 
            href="/solver" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            Try the Solver
          </Link>
          <Link 
            href="/daily" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            View Daily Solutions
          </Link>
        </div>
      </div>
    </div>
  );
} 