import React, { useState } from 'react';

export const ActivityCarousel: React.FC = () => {
  const images = [
    { id: '1', src: '/images/people/WhatsApp-Image-2026-06-25-at-12.48.06-PM.webp', alt: 'Meeting' },
    { id: '2', src: '/images/people/WhatsApp-Image-2026-06-24-at-11.53.23-PM-2.webp', alt: 'Temple' },
    { id: '3', src: '/images/people/WhatsApp-Image-2026-07-05-at-11.52.16-PM.webp', alt: 'Group Kurta' },
    { id: '4', src: '/images/people/WhatsApp-Image-2026-07-05-at-11.53.09-PM.webp', alt: 'Gathering' },
    { id: '5', src: '/images/people/WhatsApp-Image-2026-07-10-at-8.54.44-AM-1.webp', alt: 'Gathering' },
    
  ];

  const [activeDot, setActiveDot] = useState(1);

  return (
    <section className="py-14 bg-gray-50 border-t border-gray-250 relative overflow-hidden font-devanagari">
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-overlay opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Images Horizontal Scroll */}
        <div className="flex overflow-x-auto gap-5 pb-5 snap-x snap-mandatory custom-scrollbar">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative rounded-sm overflow-hidden border-[6px] border-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white aspect-[4/3] min-w-[280px] sm:min-w-[320px] lg:min-w-[340px] snap-start"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Carousel Dots Indicators at the bottom */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDot(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                activeDot === idx ? 'bg-[#38491A] w-3 h-3' : 'bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
export default ActivityCarousel;
