'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 rounded-t-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Contact Us
          </h1>
          <p className="text-lg text-indigo-100 max-w-3xl mx-auto text-center">
            Get in touch with the Cryptogram Solver team
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-b-2xl shadow-lg p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-400">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">Email</h3>
                  <a 
                    href="mailto:contact@cryptogram-solver.com" 
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    contact@cryptogram-solver.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">Support</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Have a question or need help? Send us an email or reach out on social media.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-400">Connect With Us</h2>
            
            <div className="space-y-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div className="bg-blue-500 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Twitter</h3>
                  <p className="text-gray-600 dark:text-gray-300">Follow us for updates</p>
                </div>
              </a>
              
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div className="bg-indigo-600 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Facebook</h3>
                  <p className="text-gray-600 dark:text-gray-300">Connect with our community</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          href="/privacy" 
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
} 