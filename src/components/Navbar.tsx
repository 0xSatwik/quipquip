'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <nav className={`${scrolled ? 'py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm' : 'py-4 bg-white dark:bg-slate-900'} sticky top-0 z-50 shadow-md transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 flex items-center justify-center text-white shadow-md">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
                </svg>
              </div>
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-300 dark:hover:to-purple-300 transition-all duration-300">
                Cryptogram Solver
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/solver"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive('/solver')
                  ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              Solver
            </Link>
            <Link
              href="/daily"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive('/daily')
                  ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              Daily Solutions
            </Link>
            <Link
              href="/guides"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive('/guides')
                  ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              Guides
            </Link>
            <Link
              href="/solver"
              className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Try Solver
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              {!isMenuOpen && (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
              {/* Icon when menu is open */}
              {isMenuOpen && (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-slate-900 shadow-lg rounded-b-xl">
          <Link
            href="/solver"
            className={`block px-4 py-3 rounded-lg text-sm font-medium ${
              isActive('/solver')
                ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
            } transition-colors duration-200`}
            onClick={() => setIsMenuOpen(false)}
          >
            Solver
          </Link>
          <Link
            href="/daily"
            className={`block px-4 py-3 rounded-lg text-sm font-medium ${
              isActive('/daily')
                ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
            } transition-colors duration-200`}
            onClick={() => setIsMenuOpen(false)}
          >
            Daily Solutions
          </Link>
          <Link
            href="/guides"
            className={`block px-4 py-3 rounded-lg text-sm font-medium ${
              isActive('/guides')
                ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
            } transition-colors duration-200`}
            onClick={() => setIsMenuOpen(false)}
          >
            Guides
          </Link>
          <Link
            href="/solver"
            className="block px-4 py-3 text-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            Try Solver
          </Link>
        </div>
      </div>
    </nav>
  );
} 