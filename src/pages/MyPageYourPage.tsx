import React from 'react';
import { UserCheck, Edit3, Share2, Sparkles, Shield, Bookmark } from 'lucide-react';

interface MyPageYourPageProps {
  onOpenRegister: () => void;
}

export const MyPageYourPage: React.FC<MyPageYourPageProps> = ({ onOpenRegister }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-devanagari py-10">
      
      {/* Header Banner */}
      <div className="bg-mandala-pattern text-white py-12 px-4 text-center border-b border-blue-400/20 shadow-md">
        <div className="max-w-4xl mx-auto">
          <span className="text-yellow-300 font-semibold text-sm">माली सैनी कम्युनिटी हब</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 mb-3">मेरा पेज – आपका पेज</h1>
          <p className="text-sm text-blue-100">प्रत्येक समाज बंधु का अपना डिजिटल प्रोफाइल एवं अभिव्यक्ति मंच</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
        
        {/* Intro Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center space-y-4">
          <div className="w-16 h-16 bg-amber-100 text-orange-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            आपकी पहचान, समाज का स्वाभिमान
          </h2>
          <p className="text-gray-650 max-w-2xl mx-auto text-base leading-relaxed">
            'मेरा पेज – आपका पेज' मारवाड़ी माली सैनी प्रवासी समाज द्वारा निर्मित एक अनूठा डिजिटल पोर्टफोलियो है। यहाँ आप अपनी पारिवारिक पृष्ठभूमि, व्यापार, समाज सेवा एवं उपलब्धियों को प्रदर्शित कर सकते हैं।
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenRegister}
              className="bg-btnGreen hover:bg-btnGreenHover text-white px-8 py-3 rounded-full font-bold text-base shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              अपना प्रोफाइल पेज बनाएं (Create My Profile)
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center space-y-3">
            <UserCheck className="w-10 h-10 text-blue-600 mx-auto" />
            <h3 className="font-bold text-lg text-gray-900">सत्यापित समाज कार्ड</h3>
            <p className="text-xs text-gray-600">आपको प्राप्त होगा डिजिटल मेम्बरशिप आईडी व डायरेक्टरी कार्ड।</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center space-y-3">
            <Edit3 className="w-10 h-10 text-orange-600 mx-auto" />
            <h3 className="font-bold text-lg text-gray-900">व्यापार व सेवा प्रचार</h3>
            <p className="text-xs text-gray-600">अपने बिज़नेस प्रोडक्ट, सर्विसेज एवं ऑफर समाज जनों के साथ साझा करें।</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center space-y-3">
            <Share2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-lg text-gray-900">परिवार व वंशावली</h3>
            <p className="text-xs text-gray-600">मूल निवास मारवाड़ स्थान व प्रवास शहर का विवरण अपडेट करें।</p>
          </div>
        </div>

      </div>
    </div>
  );
};
