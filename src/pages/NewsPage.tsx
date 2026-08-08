import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, FolderOpen } from 'lucide-react';
import { fetchAllBlogs, BlogPost } from '../lib/blogs';

export const NewsPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const isMarwar = category === 'marwar';

  useEffect(() => {
    setLoading(true);
    fetchAllBlogs().then((data) => {
      setBlogs(data || []);
      setLoading(false);
    });
  }, [category]);

  const targetCategory = isMarwar ? 'मारवाड़' : 'प्रवास प्रदेश';
  const newsItems = blogs.filter((b) => (b.category || 'मारवाड़') === targetCategory);

  const handleNewsClick = (id: string | number) => {
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

          {loading ? (
            <div className="py-12 text-center text-gray-500 text-sm">समाचार लोड हो रहे हैं...</div>
          ) : newsItems.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-sm">इस श्रेणी में कोई समाचार उपलब्ध नहीं है</div>
          ) : (
            newsItems.map((item) => {
              const postDate = item.meta ? item.meta.split(' • ')[0] : 'Recent';
              const postCategory = item.category || targetCategory;

              return (
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
                        <span>{postDate}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>{postCategory}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}

      </div>
    </div>
  );
};
