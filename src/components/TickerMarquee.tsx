import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TickerMarquee: React.FC = () => {
  const announcements = [
    'मारवाड़ी माली सैनी प्रवासी समाज डायरेक्टरी २०२६ में पंजीकरण हेतु ऑनलाइन फॉर्म भरें।',
    'संत शिरोमणि श्री लिखमीदास जी महाराज के वार्षिक जन्मोत्सव समारोह की हार्दिक शुभकामनाएं।',
    'प्रवास प्रदेश (अहमदाबाद, मुंबई, सूरत, बैंगलोर) के समाज बंधुओं हेतु विशेष व्यापारिक मीटिंग।',
    'युवा उद्यमी एवं रोजगार सहायता प्रकोष्ठ द्वारा निःशुल्क परामर्श सुविधा उपलब्ध।',
  ];

  return (
    <div className="bg-amber-400 text-gray-900 font-devanagari py-2 px-4 border-y border-amber-500 shadow-inner flex items-center overflow-hidden">
      <div className="flex items-center space-x-2 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded shrink-0 shadow">
        <Bell className="w-3.5 h-3.5 animate-bounce" />
        <span>ताजा सूचना</span>
      </div>

      <div className="ml-3 overflow-hidden whitespace-nowrap w-full">
        <div className="inline-block animate-marquee space-x-8 text-sm font-semibold">
          {announcements.map((text, idx) => (
            <span key={idx} className="inline-flex items-center space-x-2 mr-8">
              <span className="text-orange-700">★</span>
              <span>{text}</span>
            </span>
          ))}
        </div>
      </div>

      <Link
        to="/category/marwar"
        className="hidden md:flex items-center text-xs font-bold text-gray-800 hover:text-orange-800 shrink-0 ml-4 border-l border-amber-600 pl-3"
      >
        <span>सभी देखें</span>
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
