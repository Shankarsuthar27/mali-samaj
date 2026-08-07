import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, TrendingUp, Briefcase, Award, ArrowUpRight } from 'lucide-react';

export const WelfareGridSection: React.FC = () => {
  const welfareItems = [
    {
      title: 'सोशल वेलफेयर',
      path: '/welfare/social-welfare',
      icon: HeartHandshake,
      color: 'bg-rose-500',
      description: 'समाज बंधुओं हेतु आकस्मिक सहायता, शिक्षा छात्रवृत्ति, चिकित्सा सहयोग एवं सामाजिक कल्याण योजनाएं।',
    },
    {
      title: 'व्यापारिक सलाह',
      path: '/welfare/business-advice',
      icon: TrendingUp,
      color: 'bg-blue-600',
      description: 'नए एवं अनुभवी उद्यमियों हेतु व्यापार वृद्धि सलाह, टैक्स व लीगल परामर्श, नेटवर्क बिल्डिंग सहयोग।',
    },
    {
      title: 'रोजगार अवसर',
      path: '/welfare/employment-opportunities',
      icon: Briefcase,
      color: 'bg-emerald-600',
      description: 'युवाओं हेतु जॉब ओपनिंग, इंटर्नशिप, वोकेशनल ट्रेनिंग और समाज के प्रतिष्ठानों में सीधी भर्ती सहायता।',
    },
    {
      title: 'पुरुषार्थी समाज रत्न',
      path: '/welfare/samaj-ratna',
      icon: Award,
      color: 'bg-amber-500',
      description: 'विभिन्न क्षेत्रों में उल्लेखनीय सफलता एवं सेवा कार्य करने वाले हमारे गौरवशाली विभूतियों का सम्मान।',
    },
  ];

  return (
    <section className="py-16 bg-white font-devanagari border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-purple-700 font-bold text-sm bg-purple-100 px-3.5 py-1 rounded-full">
            हित की बात
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 mb-4">
            समाज उत्थान एवं वेलफेयर पहल
          </h2>
          <p className="text-gray-600 text-base">
            मारवाड़ी माली सैनी प्रवासी समाज द्वारा संचालित जनहितैषी एवं विकासपरक योजनाएं
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {welfareItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.path}
                className="bg-gray-50 hover:bg-white p-6 rounded-2xl border border-gray-200 hover:border-orange-300 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className={`${item.color} w-12 h-12 rounded-xl text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-orange-600 group-hover:text-orange-700 pt-2 border-t border-gray-200/60">
                  <span>विस्तार से जानें</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
