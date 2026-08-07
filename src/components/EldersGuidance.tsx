import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const EldersGuidance: React.FC = () => {
  const guidanceList = [
    { id: '1', name: 'नाम 1', title: 'परिचय', text: 'विवरण' },
    { id: '2', name: 'नाम 2', title: 'परिचय', text: 'विवरण' },
    { id: '3', name: 'नाम 3', title: 'परिचय', text: 'विवरण' },
    { id: '4', name: 'नाम 4', title: 'परिचय', text: 'विवरण' },
  ];

  const [currentIndex, setCurrentIndex] = useState(2); // Start showing index 2 & 3 (नाम 3 & नाम 4) as in screenshot

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? guidanceList.length - 2 : prev - 2));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= guidanceList.length - 2 ? 0 : prev + 2));
  };

  const visibleGuidance = [
    guidanceList[currentIndex],
    guidanceList[currentIndex + 1] || guidanceList[0],
  ];

  return (
    <section className="py-16 bg-[#2D3E15] text-white relative overflow-hidden border-t border-black/10 font-devanagari">
      
      {/* Background Mandala overlay */}
      <div className="absolute inset-0 bg-purple-mandala-pattern opacity-10 pointer-events-none filter invert brightness-200" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide mb-3">
            बड़े बुजुर्गों का मार्गदर्शन
          </h2>
          <p className="text-[#fbc02d] text-sm sm:text-base font-semibold leading-relaxed">
            समाज के बड़े बुजुर्ग, शिक्षाविद एवं संत अपने अनुभव एवं ज्ञान को समाज के मार्गदर्शन के लिए यहाँ प्रस्तुत कर सकते है
          </p>
        </div>

        {/* Testimonials Carousel Grid */}
        <div className="relative px-6 sm:px-12 flex items-center justify-between">
          
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 p-2 text-white/80 hover:text-white hover:scale-110 transition-all focus:outline-none"
            aria-label="Previous Guidances"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Testimonial speech bubble cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {visibleGuidance.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                
                {/* Speech bubble box */}
                <div className="w-full bg-black/15 border border-white/5 rounded-lg p-10 relative text-center shadow-lg min-h-[140px] flex items-center justify-center">
                  <p className="text-xl italic text-white/95 font-medium tracking-wide">
                    {item.text}
                  </p>
                  
                  {/* Bubble arrow pointer at bottom */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-black/15" />
                </div>

                {/* Name & Title below bubble */}
                <div className="text-center mt-7 space-y-1">
                  <h4 className="text-xl font-bold text-white tracking-wide">
                    {item.name}
                  </h4>
                  <p className="text-sm font-semibold text-[#fbc02d]">
                    {item.title}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 p-2 text-white/80 hover:text-white hover:scale-110 transition-all focus:outline-none"
            aria-label="Next Guidances"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

        </div>

      </div>
    </section>
  );
};
export default EldersGuidance;
