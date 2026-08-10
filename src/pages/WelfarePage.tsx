import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, TrendingUp, Briefcase, Award, CheckCircle, Calendar, ArrowRight, BookOpen, FolderOpen } from 'lucide-react';
import { fetchAllBlogs, BlogPost } from '../lib/blogs';

export const WelfarePage: React.FC = () => {
  const { subtopic } = useParams<{ subtopic?: string }>();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAllBlogs().then((data) => {
      setBlogs(data || []);
      setLoading(false);
    });
  }, [subtopic]);

  const subtopicDetails: Record<string, { title: string; desc: string; categoryName: string; icon: any; content: string[] }> = {
    'social-welfare': {
      title: '',
      desc: 'समाज बंधुओं हेतु आकस्मिक सहायता, शिक्षा छात्रवृत्ति, सहायता योजनाएं',
      categoryName: 'सोशल वेलफेयर',
      icon: HeartHandshake,
      content: [
        
      ],
    },
    'business-advice': {
      title: 'व्यापारिक सलाह (Business Advice)',
      desc: 'उद्यमियों हेतु व्यापार वृद्धि, जीएसटी, फाइनेंस व लीगल परामर्श',
      categoryName: 'व्यापारिक सलाह',
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
      categoryName: 'रोजगार अवसर',
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
      categoryName: 'पुरुषार्थी समाज रत्न',
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

  const categoryBlogs = blogs.filter((b) => {
    const cat = (b.category || '').trim();
    if (currentKey === 'samaj-ratna') {
      return cat === 'पुरुषार्थी समाज रत्न' || cat === 'समाज रत्न';
    }
    return cat === currentData.categoryName;
  });

  const handleBlogClick = (id: string | number) => {
    navigate('/about/blog', { state: { selectedPostId: id } });
  };

  return (
    <div className="min-h-screen bg-white font-devanagari py-10">

 

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 space-y-10">

        {/* Navigation Tabs */}
      

        {/* Content Box for Key Points */}
      

        {/* Dynamic Category Blogs Section Matching Exact Screenshot Design */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl   space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-3 text-orange-600">
              <BookOpen className="w-7 h-7" />
              <h3 className="text-xl font-bold text-gray-900">
                {currentData.categoryName} - ताज़ा ब्लॉग्स एवं समाचार ({categoryBlogs.length})
              </h3>
            </div>
          </div>

          {loading ? (
            <div className="py-8 text-center text-gray-400 text-sm">ब्लॉग्स लोड हो रहे हैं...</div>
          ) : categoryBlogs.length === 0 ? (
            <div className="py-8 text-center text-gray-500 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
              इस श्रेणी ({currentData.categoryName}) में अभी कोई ब्लॉग प्रकाशित नहीं हुआ है। Admin Panel से ब्लॉग जोड़ते समय श्रेणी "{currentData.categoryName}" चुनें।
            </div>
          ) : (
            <div className="divide-y divide-dashed divide-gray-300/80 w-full mx-auto">
              {categoryBlogs.map((blog, idx) => {
                const blogDate = blog.meta ? blog.meta.split(' • ')[0] : 'हाल ही में';
                const postCategory = blog.category || currentData.categoryName;

                return (
                  <div
                    key={blog.id || idx}
                    onClick={() => handleBlogClick(blog.id)}
                    className="py-2.5 sm:py-3 flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5 group cursor-pointer hover:bg-slate-50/50 p-1.5 rounded-lg transition-all"
                  >
                    {/* Left Thumbnail Image */}
                    <div className="w-full sm:w-32 md:w-36 h-24 xs:h-28 sm:h-22 shrink-0 rounded-md overflow-hidden shadow-xs border border-gray-200/80 bg-gray-100">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Right Content Details */}
                    <div className="flex-1 space-y-1.5 pt-0.5">
                      <h3 className="font-normal text-[#a5362b] group-hover:text-[#80251c] text-xs sm:text-sm leading-snug tracking-tight underline decoration-[#a5362b]/40 underline-offset-4 decoration-1 font-devanagari">
                        {blog.title}
                      </h3>

                      <div className="flex items-center space-x-3 text-[10px] sm:text-[11px] font-semibold text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{blogDate}</span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <FolderOpen className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{postCategory}</span>
                        </div>
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
