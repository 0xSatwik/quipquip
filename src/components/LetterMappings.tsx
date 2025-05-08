import React from 'react';

interface LetterMappingsProps {
  mapping: Record<string, string>;
  className?: string;
}

export default function LetterMappings({ mapping, className = '' }: LetterMappingsProps) {
  // Get all entries where values exist
  const mappingEntries = Object.entries(mapping).filter(([_, value]) => value);
  
  // Sorts alphabetically by cipher letter for consistent display
  const sortedMappings = mappingEntries.sort(([a], [b]) => a.localeCompare(b));
  
  return (
    <div className={`${className}`}>
      <h3 className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-200">Letter Mappings:</h3>
      <div className="bg-gradient-to-br from-indigo-50/50 to-blue-50/50 dark:from-indigo-900/30 dark:to-blue-900/30 p-4 rounded-lg">
        <div className="flex flex-wrap gap-3 justify-center">
          {sortedMappings.map(([cipherLetter, plainLetter]) => (
            <div 
              key={cipherLetter} 
              className="relative group"
            >
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 p-3 border border-indigo-100 dark:border-indigo-800">
                <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-2">
                  <span className="font-bold text-xl text-indigo-600 dark:text-indigo-300">{cipherLetter}</span>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <span className="font-bold text-xl text-blue-600 dark:text-blue-300">{plainLetter.toUpperCase()}</span>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-400 dark:group-hover:border-indigo-500 rounded-lg pointer-events-none transition-colors duration-200"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 