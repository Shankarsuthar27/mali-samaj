import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SuccessStories: React.FC = () => {
  const navigate = useNavigate();

  const stories = [
    {
      id: '1',
      blogId: 'jeevan-darshan-1',
      title: 'महात्मा ज्योतिबा फुले',
      description: 'महात्मा ज्योतिराव फुले : शिक्षा, समानता और सामाजिक न्याय के महान क्रांतिदूत',
      image: '/images/0.webp',
    },
    {
      id: '2',
      blogId: 'jeevan-darshan-2',
      title: 'संत शिरोमणि लिखमीदास जी महाराज',
      description: 'भजनं भजते शासनम',
      image: '/images/1.webp',
    },
    {
      id: '3',
      blogId: 'jeevan-darshan-3',
      title: 'शिक्षा ज्योति सावित्री बाई फुले',
      description: 'क्रांतिज्योति सावित्रीबाई फुले : भारत की प्रथम शिक्षिका और नारी जागरण की अग्रदूत',
      image: '/images/2.webp',
    },
  ];

  const handleCardClick = (blogId: string) => {
    navigate('/about/blog', { state: { selectedPostId: blogId } });
  };

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200 font-devanagari relative overflow-hidden">
      
      {/* Repeating background pattern for visual depth */}
      <div className="absolute inset-0 bg-pattern-overlay opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-wide mb-3">
            सफलता की कहानी
          </h2>
          <p className="text-blue-600 hover:text-blue-700 text-sm sm:text-base font-semibold leading-relaxed">
            समाज बंधु अपने जीवन के अनुभव एवं व्यवसाय में सफलता की यात्रा का विवरण यहाँ दर्ज करवा सकते है - फोटो सहित
          </p>
        </div>

        {/* Stories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => handleCardClick(story.blogId)}
              className="bg-white rounded-sm border border-gray-250 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-5 items-center text-center group cursor-pointer"
            >
              <div className="w-full">
                
                {/* Header Image with Gold Gradient Background */}
                <div className="w-full h-44 rounded-sm bg-gradient-to-b from-amber-300 via-amber-450 to-amber-500 flex items-center justify-center p-4 relative overflow-hidden shadow-inner">
                  
                  {/* Subtle inner sunburst glow */}
                  <div className="absolute inset-0 bg-radial-gradient from-white/20 to-transparent pointer-events-none" />

                  {/* Circular Frame for Portrait */}
                  <div className="w-28 h-28 rounded-full overflow-hidden border-[4px] border-white shadow-xl relative z-10 bg-white">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                </div>

                {/* Card Title (Red color) */}
                <h3 className="text-lg sm:text-xl font-bold text-red-650 tracking-wide mt-5 mb-3 group-hover:text-red-700 transition-colors">
                  {story.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed min-h-[48px] px-2 mb-6">
                  {story.description}
                </p>

              </div>

              {/* Action Button: Deep red/burgundy rounded button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(story.blogId);
                }}
                className="inline-flex items-center space-x-1 bg-[#ad0037] hover:bg-[#96002f] text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-[4px] shadow transition-colors duration-200"
              >
                <span>→</span>
                <span>जीवन दर्शन एवं जन सेवा</span>
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default SuccessStories;
