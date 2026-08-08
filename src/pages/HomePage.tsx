import React from 'react';
import { Hero } from '../components/Hero';
import { TickerMarquee } from '../components/TickerMarquee';
import { AboutSection } from '../components/AboutSection';
import { SuccessStories } from '../components/SuccessStories';
import { EventGallery } from '../components/EventGallery';
import { CommunityHighlights } from '../components/CommunityHighlights';
import { EldersGuidance } from '../components/EldersGuidance';
import { ActivityCarousel } from '../components/ActivityCarousel';
import { DirectorySection } from '../components/DirectorySection';
import { WelfareGridSection } from '../components/WelfareGridSection';
import { LandingAccordionItem } from '../components/LandingAccordionItem';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, Newspaper, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onOpenRegister: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenRegister }) => {
  const latestNews = [
    {
      id: '1',
      title: 'अहमदाबाद में मारवाड़ी माली सैनी समाज का विशाल स्नेह मिलन एवं डायरेक्टरी विमोचन समारोह संपन्न',
      category: 'प्रवास प्रदेश',
      date: '०५ अगस्त २०२६',
      summary: 'समारोह में गुजरात भर से हजारों समाज बंधु उपस्थित रहे। भामाशाहों का बहुमान किया गया।',
      image: '/images/1212.webp',
      link: '/category/pravas-pradesh',
    },
    {
      id: '2',
      title: 'जोधपुर: संत लिखमीदास जी महाराज के मंदिर प्रांगण में विशेष पूजा-अर्चना एवं प्रतिभा सम्मान',
      category: 'मारवाड़',
      date: '०१ अगस्त २०२६',
      summary: 'मारवाड़ क्षेत्र के मेधावी छात्र-छात्राओं को समाज द्वारा प्रोत्साहन पुरस्कार वितरित किए गए।',
      image: '/images/Untitled-design-36.webp',
      link: '/category/marwar',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-devanagari">
      {/* Hero Banner */}
      <Hero onOpenRegister={onOpenRegister} />

      {/* Ticker Announcement */}
      <TickerMarquee />

      {/* About Us Section */}
      <AboutSection />

      {/* Success Stories Section */}
      <SuccessStories />

      {/* Event Gallery Grid Section */}
      <EventGallery />

      {/* Community Highlights Section */}
      <CommunityHighlights />

      {/* Elders Guidance Section */}
      <EldersGuidance />

      {/* Activity Carousel Section */}
      <ActivityCarousel />

      {/* Directory Section */}
      

      {/* News Highlights */}
      <section className="py-14 bg-gradient-to-b from-gray-50 to-amber-50/30 font-devanagari border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-orange-600 font-bold text-xs uppercase bg-orange-100 px-3 py-1 rounded-full">
                गतिविधि समाचार
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
                ताज़ा गतिविधियां एवं मारवाड़-प्रवास समाचार
              </h2>
            </div>
            <Link
              to="/category/marwar"
              className="mt-4 md:mt-0 inline-flex items-center text-sm font-bold text-orange-600 hover:text-orange-800"
            >
              <span>सभी समाचार देखें</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestNews.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col sm:flex-row group"
              >
                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden bg-gray-100">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-orange-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {news.category}
                  </span>
                </div>
                
                <div className="sm:w-3/5 p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-gray-400 font-medium">{news.date}</span>
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-snug mt-1 mb-2 group-hover:text-orange-600 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {news.summary}
                    </p>
                  </div>
                  <Link
                    to={news.link}
                    className="mt-4 inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    <span>आगे पढ़ें</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Landing Accordion Item */}
      <LandingAccordionItem />

      {/* Welfare Topics Grid */}
      <WelfareGridSection />

      {/* Call to Action Banner */}
      <section className="bg-mandala-pattern text-white py-12 px-4 sm:px-8 text-center relative font-devanagari">
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-yellow-300">
            क्या आप मारवाड़ी माली सैनी समाज बंधु हैं?
          </h3>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
            आज ही समाज डायरेक्टरी से जुड़ें और अपने परिवार एवं व्यापार का विवरण दर्ज करके एकजुट समाज का हिस्सा बनें।
          </p>
          <button
            onClick={onOpenRegister}
            className="mt-4 inline-block bg-btnGreen hover:bg-btnGreenHover text-white text-lg font-bold px-8 py-3.5 rounded-full shadow-2xl transition-all transform hover:-translate-y-1 border border-green-300/40"
          >
            अभी पंजीयन करें (Register Now)
          </button>
        </div>
      </section>
    </div>
  );
};
