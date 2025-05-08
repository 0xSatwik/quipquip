'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Sample blog post data
const blogPosts = [
  {
    id: 'how-to-solve-cryptograms',
    title: "How to Solve Cryptograms: A Beginner's Guide",
    image: '/images/cryptogram-guide.jpg',
    category: 'Tutorial'
  },
  {
    id: 'famous-cryptograms-history',
    title: 'Famous Cryptograms That Changed History',
    image: '/images/cryptogram-history.jpg',
    category: 'History'
  },
  {
    id: 'advanced-techniques',
    title: 'Advanced Techniques For Tough Cryptograms',
    image: '/images/advanced-cryptogram.jpg',
    category: 'Advanced'
  }
];

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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Everything You Need For Cryptograms
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-full mx-auto mb-6"></div>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
              Our comprehensive platform helps you solve, learn, and master cryptogram puzzles with powerful tools and resources
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Solver Feature */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="relative p-8">
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-indigo-400/10 dark:bg-indigo-300/5 rounded-full blur-xl"></div>
                <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-blue-400/10 dark:bg-blue-300/5 rounded-full blur-xl"></div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-indigo-800 dark:text-indigo-300 relative z-10">
                  Powerful Solver
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10">
                  Our AI-powered cryptogram solver can crack even the most challenging letter-substitution puzzles with exceptional accuracy in seconds.
                </p>
              </div>
              
              <div className="px-8 pb-8">
                <Link 
                  href="/solver" 
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Try the Solver
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Daily Solutions Feature */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="relative p-8">
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-purple-400/10 dark:bg-purple-300/5 rounded-full blur-xl"></div>
                <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-pink-400/10 dark:bg-pink-300/5 rounded-full blur-xl"></div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-purple-800 dark:text-purple-300 relative z-10">
                  Daily Solutions
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10">
                  Get instant access to today's cryptogram solutions including Cryptoquips, Celebrity Ciphers, and Cryptoquotes updated daily.
                </p>
              </div>
              
              <div className="px-8 pb-8">
                <Link 
                  href="/daily" 
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  View Daily Solutions
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Guides Feature */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="relative p-8">
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-emerald-400/10 dark:bg-emerald-300/5 rounded-full blur-xl"></div>
                <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-teal-400/10 dark:bg-teal-300/5 rounded-full blur-xl"></div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-emerald-800 dark:text-emerald-300 relative z-10">
                  Helpful Guides
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10">
                  Master the art of solving cryptograms with our comprehensive tutorials, tips, and step-by-step solving techniques.
                </p>
              </div>
              
              <div className="px-8 pb-8">
                <Link 
                  href="/guides" 
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Explore Our Guides
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
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
                <p className="text-sm text-blue-100 relative z-10">Updated Daily</p>
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
                <p className="text-sm text-purple-100 relative z-10">Updated Daily</p>
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
                <p className="text-sm text-emerald-100 relative z-10">Updated Daily</p>
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

      {/* Blog Post Preview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Cryptogram Guides
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-full mx-auto mb-4"></div>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Learn cryptogram solving techniques from our comprehensive guides and tutorials
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link key={post.id} href={`/guides/${post.id}`} className="group">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                    <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              href="/guides" 
              className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-medium hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900 transition-all duration-200"
            >
              View All Guides
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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