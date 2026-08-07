import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { HeartHandshake, TrendingUp, Briefcase, Award, CheckCircle } from 'lucide-react';

export const WelfarePage: React.FC = () => {
  const { subtopic } = useParams<{ subtopic?: string }>();

  const subtopicDetails: Record<string, { title: string; desc: string; icon: any; content: string[] }> = {
    'social-welfare': {
      title: 'सोशल वेलफेयर (Social Welfare)',
      desc: 'समाज बंधुओं हेतु आकस्मिक सहायता, शिक्षा छात्रवृत्ति, सहायता योजनाएं',
      icon: HeartHandshake,
      content: [
        'मेधावी विद्यार्थियों हेतु उच्च शिक्षा छात्रवृत्ति योजना।',
        'समाज की ज़रूरतमंद विधवाओं एवं असहाय परिवारों को मासिक सहायता।',
        'गंभीर बीमारी की स्थिति में मेडिकल रिलीफ फंड सहायता।',
        'सामूहिक विवाह एवं फिजूलखर्ची रोकने हेतु जागरूकता अभियान।',
      ],
    },
    'business-advice': {
      title: 'व्यापारिक सलाह (Business Advice)',
      desc: 'उद्यमियों हेतु व्यापार वृद्धि, जीएसटी, फाइनेंस व लीगल परामर्श',
      icon: TrendingUp,
      content: [
        'नया व्यापार शुरू करने हेतु अनुभवी व्यापारियों से वन-ऑन-वन परामर्श।',
        'जीएसटी, इनकम टैक्स एवं लीगल कंप्लायंस हेतु निःशुल्क मार्गदर्शन।',
        'प्रवास प्रदेशों (गुजरात, महाराष्ट्र, दक्षिण भारत) में बिजनेस नेटवर्किंग मीट।',
        'महिला उद्यमियों एवं कुटीर उद्योगों को प्रोत्साहन सहायता।',
      ],
    },
    'employment-opportunities': {
      title: 'रोजगार अवसर (Employment Opportunities)',
      desc: 'युवाओं हेतु जॉब ओपनिंग, वोकेशनल ट्रेनिंग और भर्ती सहायता',
      icon: Briefcase,
      content: [
        'मारवाड़ी माली सैनी समाज के प्रतिष्ठानों में युवाओं हेतु प्राथमिकता से नौकरी।',
        'आईटी, अकाउंट्स, सेल्स एवं टेक्निकल फील्ड्स में जॉब पोर्टल लिस्टिंग।',
        'रिज्यूमे बिल्डिंग एवं इंटरव्यू तैयारी हेतु कार्यशालाएं।',
        'स्किल डेवलपमेंट एवं वोकेशनल ट्रेनिंग कोर्स।',
      ],
    },
    'samaj-ratna': {
      title: 'पुरुषार्थी समाज रत्न (Samaj Ratna Honors)',
      desc: 'विभिन्न क्षेत्रों में उत्कृष्ट योगदान देने वाले हमारे समाज रत्न',
      icon: Award,
      content: [
        'उद्योग, कला, खेल, सिविल सर्विसेज एवं समाज सेवा में उत्कृष्ट विभूतियों का सम्मान।',
        'वार्षिक भामाशाह एवं समाज रत्न अलंकरण समारोह।',
        'भावी पीढ़ी को प्रेरित करने हेतु महान विभूतियों के जीवन वृत्त की गाथा।',
      ],
    },
  };

  const currentKey = subtopic || 'social-welfare';
  const currentData = subtopicDetails[currentKey] || subtopicDetails['social-welfare'];
  const Icon = currentData.icon;

  return (
    <div className="min-h-screen bg-gray-50 font-devanagari py-10">
      
      <div className="bg-mandala-pattern text-white py-12 px-4 text-center border-b border-blue-400/20 shadow-md">
        <div className="max-w-4xl mx-auto">
          <span className="text-yellow-300 font-semibold text-sm">हित की बात</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 mb-3">{currentData.title}</h1>
          <p className="text-sm text-blue-100">{currentData.desc}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <Link
            to="/welfare/social-welfare"
            className={`p-3 rounded-xl text-center text-sm font-bold border transition-all ${
              currentKey === 'social-welfare'
                ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                : 'bg-white text-gray-700 hover:border-orange-300'
            }`}
          >
            सोशल वेलफेयर
          </Link>
          <Link
            to="/welfare/business-advice"
            className={`p-3 rounded-xl text-center text-sm font-bold border transition-all ${
              currentKey === 'business-advice'
                ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                : 'bg-white text-gray-700 hover:border-orange-300'
            }`}
          >
            व्यापारिक सलाह
          </Link>
          <Link
            to="/welfare/employment-opportunities"
            className={`p-3 rounded-xl text-center text-sm font-bold border transition-all ${
              currentKey === 'employment-opportunities'
                ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                : 'bg-white text-gray-700 hover:border-orange-300'
            }`}
          >
            रोजगार अवसर
          </Link>
          <Link
            to="/welfare/samaj-ratna"
            className={`p-3 rounded-xl text-center text-sm font-bold border transition-all ${
              currentKey === 'samaj-ratna'
                ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                : 'bg-white text-gray-700 hover:border-orange-300'
            }`}
          >
            पुरुषार्थी समाज रत्न
          </Link>
        </div>

        {/* Content Box */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-200 space-y-6">
          <div className="flex items-center space-x-3 text-orange-600 border-b pb-4">
            <Icon className="w-8 h-8" />
            <h2 className="text-2xl font-bold text-gray-900">{currentData.title}</h2>
          </div>

          <div className="space-y-3">
            {currentData.content.map((point, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50/50 rounded-xl border border-orange-100">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-800 text-base font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
