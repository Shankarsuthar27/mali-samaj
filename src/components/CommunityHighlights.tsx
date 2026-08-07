import React from 'react';
import { User, Gift, Award } from 'lucide-react';

export const CommunityHighlights: React.FC = () => {
  return (
    <section className="py-16 bg-white font-devanagari relative overflow-hidden border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Large Community Image */}
          <div className="lg:col-span-6 relative group">
            <div className="relative rounded-lg overflow-hidden border-[6px] border-white shadow-xl bg-white max-w-xl mx-auto hover:shadow-2xl transition-shadow duration-300">
              <img
                src="/images/1212.webp"
                alt="Community Gathering"
                className="w-full h-auto object-cover transform group-hover:scale-[1.05] transition-transform duration-500 ease-out"
              />
            </div>
          </div>

          {/* Right Column: Highlights list with yellow circle icons */}
          <div className="lg:col-span-6 space-y-8 pl-0 lg:pl-8">
            
            {/* Item 1 */}
            <div className="flex items-center space-x-5 hover:translate-x-2 transition-transform duration-300 cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-[#fbc02d] text-[#38491A] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#1e6b54] tracking-wide group-hover:text-emerald-700 transition-colors">
                  Highlights
                </h4>
                <p className="text-sm text-gray-500 font-medium">
                  Description
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center space-x-5 hover:translate-x-2 transition-transform duration-300 cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-[#fbc02d] text-[#38491A] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#1e6b54] tracking-wide group-hover:text-emerald-700 transition-colors">
                  Highlights
                </h4>
                <p className="text-sm text-gray-500 font-medium">
                  Description
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center space-x-5 hover:translate-x-2 transition-transform duration-300 cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-[#fbc02d] text-[#38491A] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#1e6b54] tracking-wide group-hover:text-emerald-700 transition-colors">
                  Highlights
                </h4>
                <p className="text-sm text-gray-500 font-medium">
                  Description
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
export default CommunityHighlights;
