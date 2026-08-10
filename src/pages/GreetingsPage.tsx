import React, { useEffect, useState } from 'react';
import { Calendar, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchAllBlogs, BlogPost } from '../lib/blogs';

export const GreetingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAllBlogs().then((data) => {
      setBlogs(data || []);
      setLoading(false);
    });
  }, []);

  const staticGreetingItems = [
    {
      id: 'static-1',
      name: 'प्रवीण भाई G माली',
      date: '15 Jul 2026',
      category: 'शुभकामना सन्देश',
      image: '/images/team/1.webp',
      isCircular: true,
    },
    {
      id: 'static-2',
      name: 'अनुभव चंदेल (अधिवक्ता)',
      date: '15 Jul 2026',
      category: 'शुभकामना सन्देश',
      image: null,
      isCircular: false,
    },
    {
      id: 'static-3',
      name: 'हंसराज माली (साइबर सिक्योरिटी) IT',
      date: '15 Jul 2026',
      category: 'शुभकामना सन्देश',
      image: '/images/people/WhatsApp-Image-2026-06-24-at-11.53.23-PM-2.webp',
      isCircular: true,
    },
    {
      id: 'static-4',
      name: 'मुकेश सोलंकी (पूर्व अतिरिक्त जिला शिक्षा अधिकारी)',
      date: '15 Jul 2026',
      category: 'शुभकामना सन्देश',
      image: null,
      isCircular: false,
    },
    {
      id: 'static-5',
      name: 'मदन लाल माली (राधे कृष्णा इंडस्ट्रीज)',
      date: '15 Jul 2026',
      category: 'शुभकामना सन्देश',
      image: '/images/team/WhatsApp-Image-2026-07-10-at-10.06.50-AM-1.webp',
      isCircular: false,
    },
    {
      id: 'static-6',
      name: 'CA कमलेश सोलंकी',
      date: '15 Jul 2026',
      category: 'शुभकामना सन्देश',
      image: '/images/people/WhatsApp-Image-2026-07-05-at-11.53.09-PM.webp',
      isCircular: false,
    },
  ];

  const dynamicGreetings = blogs.filter((b) => {
    const cat = (b.category || '').trim();
    return cat === 'शुभकामनाएं' || cat === 'शुभकामना सन्देश';
  });

  const handleBlogClick = (id: string | number) => {
    navigate('/about/blog', { state: { selectedPostId: id } });
  };

  return (
    <div className="min-h-screen bg-white font-devanagari py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <div className="divide-y divide-dashed divide-gray-300">
            {/* Dynamic Greetings Blogs */}
            {dynamicGreetings.map((b) => {
              const bDate = b.meta ? b.meta.split(' • ')[0] : 'हाल ही में';
              return (
                <div
                  key={b.id}
                  onClick={() => handleBlogClick(b.id)}
                  className="flex items-start space-x-4 py-4 cursor-pointer hover:bg-slate-50/60 p-2 rounded-xl transition-all"
                >
                  {b.image && (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-md border border-gray-200 p-0.5 bg-white flex items-center justify-center overflow-hidden">
                      <img
                        src={b.image}
                        alt={b.title}
                        className="w-full h-full object-cover rounded-sm"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="text-[#a83535] font-bold text-sm sm:text-base leading-snug hover:underline">
                      {b.title}
                    </h3>
                    <div className="flex items-center space-x-3.5 text-[11px] sm:text-xs text-gray-400 mt-1">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{bDate}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FolderOpen className="w-3 h-3 text-gray-400" />
                        <span>{b.category || 'शुभकामनाएं'}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Static Greeting Items */}
            {staticGreetingItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-4 py-4">
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

