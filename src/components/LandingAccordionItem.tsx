import React, { useState } from 'react';

// --- Data for the image accordion ---
const accordionItems = [
  {
    id: 1,
    title: 'Voice Assistant',
    imageUrl: '/images/people/WhatsApp-Image-2026-06-24-at-11.53.23-PM-2.webp',
  },
  {
    id: 2,
    title: 'AI Image Generation',
    imageUrl: '/images/people/WhatsApp-Image-2026-06-25-at-12.48.06-PM.webp',
  },
  {
    id: 3,
    title: 'AI Chatbot + Local RAG',
    imageUrl: '/images/people/WhatsApp-Image-2026-07-05-at-11.53.09-PM.webp',
  },
  {
    id: 4,
    title: 'AI Agent',
    imageUrl: '/images/people/WhatsApp-Image-2026-07-05-at-11.52.16-PM.webp',
  },
  {
    id: 5,
    title: 'Visual Understanding',
    imageUrl: '/images/people/WhatsApp-Image-2026-07-10-at-8.54.44-AM-1.webp',
  },
];

// --- Accordion Item Component ---
interface AccordionItemProps {
  item: typeof accordionItems[0];
  isActive: boolean;
  onMouseEnter: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter }) => {
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out shrink-0
        ${isActive ? 'w-[260px] xs:w-[320px] sm:w-[400px]' : 'w-[50px] sm:w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error';
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 "></div>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white text-base sm:text-lg font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0'
              : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
      >
        {/* {item.title} */}
      </span>
    </div>
  );
};

// --- Main App Component ---
export const LandingAccordionItem: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(4);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white font-sans border-t border-gray-200">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tighter">
              मारवाड़ी माली सैनी प्रवासी समाज

            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
           
यह वेबसाइट मारवाड़ क्षेत्र के उन सभी समाज बंधुओं को समर्पित हैं जो मारवाड़ एवं प्रवास में निवासरत है तथा अपने जीवन निर्वाह - विकास के साथ साथ समाज के सभी बंधुओं के लिए सेवा के रूप में यथा-योग्यता अपना
            </p>
            <div className="mt-8">
              <a 
                href="#contact"
                className="inline-block bg-green-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full lg:w-1/2 overflow-hidden">
            <div className="flex flex-row items-center justify-start lg:justify-center gap-2 sm:gap-4 overflow-x-auto p-4 custom-scrollbar">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default LandingAccordionItem;
