import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall } from 'lucide-react';

interface HeroProps {
  onOpenRegister?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative min-h-[560px] lg:min-h-[640px] flex items-center justify-center overflow-hidden font-devanagari">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/hero_community_banner.png"
          alt="मारवाड़ी माली सैनी प्रवासी समाज बंधु"
          className="w-full h-full object-cover object-center filter brightness-90 animate-zoom-in-slow"
        />
        {/* Gradient Overlay for high legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
        
        {/* Top Tagline */}
        <div className="inline-block mb-4 animate-fade-in-up">
          <span className="text-yellow-400 font-bold text-lg sm:text-xl lg:text-2xl tracking-wide drop-shadow-md">
            ♦♦♦ जय लिखमीदास जी ♦♦♦
          </span>
        </div>

        {/* Main Title (H1) */}
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-lg text-white font-hindi animate-fade-in-up animation-delay-150">
          मारवाड़ी माली सैनी प्रवासी समाज
        </h1>

        {/* Subtitle Paragraph */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-gray-100 font-normal leading-relaxed mb-8 drop-shadow animate-fade-in-up animation-delay-300">
          यह वेबसाइट मारवाड़ क्षेत्र के उन सभी समाज बंधुओं को समर्पित हैं जो मारवाड़ एवं प्रवास में निवासरत है तथा अपने जीवन निर्वाह - विकास के साथ साथ समाज के सभी बंधुओं के लिए सेवा के रूप में यथा-योग्यता अपना योगदान दे रहे है
        </p>

        {/* Call To Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 animate-fade-in-up animation-delay-450">
          <Link
            to="/about/institute-intro"
            className="bg-btnGreen hover:bg-btnGreenHover text-white px-7 py-3.5 rounded-md font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2 border border-green-300/30"
          >
            <span>हमारे बारे में जाने</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </Link>

          <Link
            to="/contact"
            className="bg-btnYellow hover:bg-btnYellowHover text-gray-900 px-7 py-3.5 rounded-md font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2 border border-yellow-200/40"
          >
            <PhoneCall className="w-5 h-5 mr-1" />
            <span>संपर्क करे</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
