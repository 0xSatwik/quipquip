'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the SolverInterface component with SSR disabled
const SolverInterface = dynamic(() => import('../../components/SolverInterface'), {
  ssr: false,
  loading: () => (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 dark:border-indigo-700 dark:border-t-indigo-400 rounded-full animate-spin mb-4"></div>
          <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Loading Solver</h3>
          <p className="text-gray-600 dark:text-gray-400">Please wait...</p>
        </div>
      </div>
    </div>
  )
});

export default function SolverPage() {
  return (
    <Suspense fallback={
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 dark:border-indigo-700 dark:border-t-indigo-400 rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Loading Solver</h3>
            <p className="text-gray-600 dark:text-gray-400">Please wait...</p>
          </div>
        </div>
      </div>
    }>
      <SolverInterface />
    </Suspense>
  );
} 