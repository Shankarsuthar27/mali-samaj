import React from 'react';
import { Link } from 'react-router-dom';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-16 bg-white font-devanagari relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Saint Image & Overlay Logo badge & Purple sidebar stripe */}
          <div className="lg:col-span-5 relative flex items-center min-h-[380px] sm:min-h-[460px] pb-16 lg:pb-0">
            
            {/* Purple Stripe Background (Mandala pattern strip on left) */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-purple-mandala-pattern rounded-l-2xl z-0 hidden sm:block shadow-inner" />
            
            <div className="relative z-10 w-full pl-0 sm:pl-16">
              
              {/* Saint Image Card */}
              <div className="relative rounded-xl overflow-hidden border-[6px] border-white shadow-2xl max-w-[280px] sm:max-w-[320px] mx-auto sm:mx-0 group cursor-pointer">
                <img
                  src="/images/1212.webp"
                  alt="संत शिरोमणि श्री लिखमीदास जी महाराज"
                  className="w-full h-auto object-cover transform group-hover:scale-[1.05] transition-transform duration-500 ease-out"
                />
              </div>

              {/* Circular Logo Badge Overlay (placed bottom left) */}
              <div className="absolute -bottom-8 left-4 sm:-left-4 w-32 h-32 sm:w-36 sm:h-36 bg-white p-2 rounded-full shadow-2xl border border-gray-150 flex items-center justify-center z-20 hover:rotate-[12deg] hover:scale-105 transition-all duration-300 cursor-pointer">
                <img
                  src="/images/WhatsApp_Image_2026-06-19_at_6.43.20_PM-removebg-preview.webp"
                  alt="Logo Badge"
                  className="w-full h-full object-contain"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="lg:col-span-7 space-y-5 pl-0 lg:pl-6 text-gray-800">
            
            {/* Tagline */}
            <span className="block text-red-650 font-bold text-lg sm:text-xl tracking-wide">
              मारवाड़ी माली सैनी प्रवासी
            </span>

            {/* Main Title (About Us with Purple Accent) */}
            <h2 className="text-5xl sm:text-6xl font-extrabold text-footerPurple tracking-tight leading-none">
              About Us
            </h2>

            {/* Subheaders */}
            <div className="space-y-1.5 pt-2">
              <h3 className="text-gray-500 font-bold text-base sm:text-lg">
                मारवाड़ी माली सैनी प्रवासी
              </h3>
              <h4 className="text-gray-900 font-bold text-lg sm:text-xl">
                जड़ों से जुड़े, समाज के साथ आगे बढ़े
              </h4>
              <h5 className="text-gray-800 font-medium text-base sm:text-lg">
                एक समाज, एक परिवार, एक पहचान
              </h5>
            </div>

            {/* Description Paragraphs */}
            <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>
                मारवाड़ क्षेत्र से जुड़े माली सैनी समाज के हजारों परिवार आज देश के विभिन्न राज्यों, महानगरों एवं शहरों में अपने व्यापार, व्यवसाय, उद्योग, सेवा तथा रोजगार के कारण प्रवासरत हैं। समय के साथ भौगोलिक दूरी बढ़ी है, किन्तु समाज के प्रति अपनत्व, पहचान और जुड़ाव की भावना आज भी उतनी ही सशक्त है।
              </p>
              <p>
                इसी भावना को साकार रूप देने के उद्देश्य से “मारवाड़ी माली सैनी प्रवासी” एक आधुनिक डिजिटल सामाजिक मंच एवं वेबसाइट के रूप में विकसित की जा रही है। यह मंच देशभर में बसे समाजबंधुओं को एक साझा पहचान प्रदान करने, आपसी परिचय बढ़ाने तथा संवाद, सहयोग एवं सहभागिता को सशक्त बनाने का प्रयास है।
              </p>
            </div>

            {/* Indicator chevron */}
            <div className="text-btnGreen text-2xl font-bold pt-1">
              »
            </div>

            {/* Action Button: Yellow button labeled "अधिक जाने" */}
            <div className="pt-2">
              <Link
                to="/about/institute-intro"
                className="inline-block bg-btnYellow hover:bg-btnYellowHover text-gray-900 px-8 py-2.5 rounded-[4px] font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 border border-yellow-500/10"
              >
                अधिक जाने
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
