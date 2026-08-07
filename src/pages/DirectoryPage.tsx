import React from 'react';
import { DirectorySection } from '../components/DirectorySection';

export const DirectoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-devanagari">
      <div className="bg-mandala-pattern text-white py-12 px-4 text-center border-b border-blue-400/20 shadow-md">
        <div className="max-w-4xl mx-auto">
          <span className="text-yellow-300 font-semibold text-sm">समाज निर्देशिका</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 mb-3">मारवाड़ी माली सैनी प्रवासी डायरेक्टरी</h1>
          <p className="text-sm text-blue-100">संपूर्ण भारत में निवासरत समाज बंधुओं की संपर्क निर्देशिका</p>
        </div>
      </div>
      <DirectorySection />
    </div>
  );
};
