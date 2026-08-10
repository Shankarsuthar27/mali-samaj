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
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3">
            शुभकामना संदेश (Greetings)
          </h1>

          {loading ? (
            <div className="py-8 text-center text-gray-400 text-sm">लोड हो रहा है...</div>
          ) : dynamicGreetings.length === 0 ? (
            <div className="py-8 text-center text-gray-500 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
              इस श्रेणी (शुभकामनाएं) में अभी कोई ब्लॉग प्रकाशित नहीं हुआ है। Admin Panel से ब्लॉग जोड़ते समय श्रेणी "शुभकामनाएं" चुनें।
            </div>
          ) : (
            <div className="divide-y divide-dashed divide-gray-300">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

