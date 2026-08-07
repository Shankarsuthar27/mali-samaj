import React from 'react';

export const EventGallery: React.FC = () => {
  const eventImages = [
    { id: '1', src: '/images/people/WhatsApp-Image-2026-06-25-at-12.48.06-PM.webp', alt: 'Community Event 1' },
    { id: '2', src: '/images/people/WhatsApp-Image-2026-06-24-at-11.53.23-PM-2.webp', alt: 'Community Event 2' },
    { id: '3', src: '/images/people/WhatsApp-Image-2026-07-05-at-11.53.09-PM.webp', alt: 'Community Event 3' },
  ];

  return (
    <section className=" py-14 bg-gray-50 relative overflow-hidden border-t border-gray-200">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-overlay opacity-20 pointer-events-none" />

      <div className=" relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventImages.map((img) => (
            <div
              key={img.id}
              className="relative rounded-lg overflow-hidden shadow-md border-[6px] border-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white group cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover transform group-hover:scale-[1.08] transition-transform duration-500 ease-out"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default EventGallery;
