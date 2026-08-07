import React from 'react';
import { Calendar, FolderOpen } from 'lucide-react';

export const GreetingsPage: React.FC = () => {
  const greetingItems = [
    {
      id: 1,
      name: 'प्रवीण भाई G माली',
      date: '15 Jul 2026',
      category: 'शुभकामना सन्देश',
      image: '/images/team/1.webp',
      isCircular: true,
    },
    {
      id: 2,
      name: 'अनुभव चंदेल (अधिवक्ता)',
      date: '15 Jul 2026',
      category: 'शुभकामना सन्देश',
      image: null,
      isCircular: false,
    },
    {
      id: 3,
      name: 'हंसराज माली (साइबर सिक्योरिटी) IT',
      date: '15 Jul 2026',
      category: 'शुभकामना सन्देश',
      image: '/images/people/WhatsApp-Image-2026-06-24-at-11.53.23-PM-2.webp',
      isCircular: true,
    },
    {
      id: 4,
      name: 'मुकेश सोलंकी (पूर्व अतिरिक्त जिला शिक्षा अधिकारी)',
      date: '15 Jul 2026',
      category: 'शुभकामना सन्देश',
      image: null,
      isCircular: false,
    },
    {
      id: 5,
      name: 'मदन लाल माली (राधे कृष्णा इंडस्ट्रीज)',
      date: '15 Jul 2026',
      category: 'शुभकामना सन्देश',
      image: '/images/team/WhatsApp-Image-2026-07-10-at-10.06.50-AM-1.webp',
      isCircular: false,
    },
    {
      id: 6,
      name: 'CA कमलेश सोलंकी',
      date: '15 Jul 2026',
      category: 'शुभकामना सन्देश',
      image: '/images/people/WhatsApp-Image-2026-07-05-at-11.53.09-PM.webp',
      isCircular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-devanagari py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <div className="divide-y divide-dashed divide-gray-305">
            {greetingItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-4 py-4 first:pt-0 last:pb-0">
                {item.image ? (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-md border border-gray-200 p-0.5 bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`w-full h-full object-cover ${
                        item.isCircular ? 'rounded-full border border-amber-400 p-0.5' : 'rounded-sm'
                      }`}
                    />
                  </div>
                ) : null}
                
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="text-[#a83535] font-medium text-sm sm:text-base leading-snug">
                    {item.name}
                  </h3>
                  <div className="flex items-center space-x-3.5 text-[11px] sm:text-xs text-gray-400 mt-0.5">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span>{item.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FolderOpen className="w-3 h-3 text-gray-400" />
                      <span>{item.category}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

