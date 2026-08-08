import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, FolderOpen } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();

  const isMarwar = category === 'marwar';
  
  const newsItems = isMarwar
    ? [
        {
          id: 1,
          title: 'राजस्थान प्रदेश माली-सैनी महासभा के प्रतिनिधिमंडल ने राजधानी में निदेशक जनगणना, राजस्थान को एक महत्वपूर्ण ज्ञापन सौंपा।',
          category: 'मारवाड़',
          date: '31 Jul 2026',
          image: '/images/blog/WhatsApp-Image-2026-07-28-at-3.30.18-PM.webp',
        },
        {
          id: 7,
          title: 'जालोर के गौरव: आदित्य सोलंकी ने प्रथम प्रयास में उत्तीर्ण की सी.ए. परीक्षा, क्षेत्र में हर्ष का माहौल',
          category: 'मारवाड़',
          date: '15 Jul 2026',
          image: '/images/blog/dd111.webp',
        },
      ]
    : [
        {
          id: 4,
          title: 'चेन्नई में माली समाज भवन चेन्नई-79 का भूमिपूजन समारोह संपन्न',
          category: 'प्रवास प्रदेश',
          date: '18 Jul 2026',
          image: '/images/blog/WhatsApp-Image-2026-07-10-at-8.54.44-AM-e1783668865531.webp',
        },
        {
          id: 5,
          title: 'विजयादशमी महोत्सव पर शस्त्र पूजन एवं शस्त्र प्रदर्शन कार्यक्रम',
          category: 'प्रवास प्रदेश',
          date: '15 Jul 2026',
          image: '/images/blog/ChatGPT-Image-Jul-10-2026-12_52_15-PM-Copy.webp',
        },
      ];

  const handleNewsClick = (id: number) => {
    navigate('/about/blog', { state: { selectedPostId: id } });
  };

  return (
    <div className="min-h-screen bg-white font-devanagari py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        
        {/* Category Tabs */}
        <div className="flex justify-start border-b border-gray-250 pb-2">
          <div className="flex space-x-6 text-sm font-bold">
            <Link
              to="/category/marwar"
              className={`pb-2 border-b-2 transition-all ${
                isMarwar 
                  ? 'border-orange-500 text-orange-600 font-extrabold' 
                  : 'border-transparent text-gray-500 hover:text-orange-600'
              }`}
            >
              मारवाड़ गतिविधि समाचार
            </Link>
            <Link
              to="/category/pravas-pradesh"
              className={`pb-2 border-b-2 transition-all ${
                !isMarwar 
                  ? 'border-orange-500 text-orange-600 font-extrabold' 
                  : 'border-transparent text-gray-500 hover:text-orange-600'
              }`}
            >
              प्रवास प्रदेश गतिविधि
            </Link>
          </div>
        </div>

        {/* List of News Items */}
        <div className="divide-y divide-dashed divide-gray-300">
          {newsItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleNewsClick(item.id)}
              className="flex items-start space-x-4 py-6 first:pt-0 last:pb-0 cursor-pointer group"
            >
              {/* Thumbnail Image Container */}
              <div className="w-36 h-24 sm:w-40 sm:h-26 md:w-48 md:h-32 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 group-hover:opacity-90 transition-opacity">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 space-y-2">
                <h3 className="text-[#A83535] font-bold text-sm sm:text-base leading-snug group-hover:underline">
                  {item.title}
                </h3>
                <div className="flex items-center space-x-3 text-[11px] text-gray-400 font-bold">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>{item.category}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
