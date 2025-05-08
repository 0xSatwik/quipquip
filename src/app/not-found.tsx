'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We couldn't find the page you were looking for.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/solver" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Go to Solver
          </Link>
          <Link 
            href="/daily" 
            className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          >
            Daily Solutions
          </Link>
        </div>
      </div>
    </div>
  );
} 