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
      <div className="flex flex-wrap gap-2">
        {sortedMappings.map(([cipherLetter, plainLetter]) => (
          <div 
            key={cipherLetter} 
            className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm p-3"
          >
            <span className="font-bold text-lg text-indigo-600 dark:text-indigo-300">{cipherLetter}</span>
            <span className="mx-2 text-gray-500">→</span>
            <span className="font-bold text-lg text-blue-600 dark:text-blue-300">{plainLetter.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 