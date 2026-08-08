import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-purple-mandala-pattern font-devanagari text-white border-t-4 border-white/20">
      
      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Sand/Cream Card (Left) */}
          <div className="lg:col-span-4 bg-[#dfd9cc] text-[#38491A] p-6 rounded-sm shadow-lg flex flex-col items-center justify-between border border-white/10">
            {/* Logo */}
            <div className="w-full flex justify-center mb-4">
              <img
                src="/images/WhatsApp_Image_2026-06-19_at_6.43.20_PM-removebg-preview.webp"
                alt="मारवाड़ी माली सैनी प्रवासी समाज Logo"
                className="h-28 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Hindi Text */}
            <p className="text-sm font-semibold leading-relaxed text-center mb-6 max-w-[280px]">
              मारवाड़ क्षेत्र से जुड़े माली सैनी समाज के हजारों परिवार आज देश के विभिन्न राज्यों, महानगरों एवं शहरों में अपने व्यापार, व्यवसाय, उद्योग, सेवा तथा रोजगार के कारण प्रवासरत हैं।
            </p>

            {/* Social Media Links */}
            <div className="flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1e6b54] hover:bg-[#135d46] text-white flex items-center justify-center transition-colors duration-250 shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1e6b54] hover:bg-[#135d46] text-white flex items-center justify-center transition-colors duration-250 shadow-md"
                aria-label="Facebook"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1e6b54] hover:bg-[#135d46] text-white flex items-center justify-center transition-colors duration-250 shadow-md"
                aria-label="YouTube"
              >
                <Youtube className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: About Us */}
          <div className="lg:col-span-2 flex flex-col space-y-4 pt-4 lg:pt-8 pl-0 lg:pl-6">
            <h3 className="text-xl font-bold text-white tracking-wider border-b-2 border-white/10 pb-1.5 self-start">
              About Us
            </h3>
            <ul className="space-y-3.5 text-base font-medium">
              <li>
                <Link to="/about/institute-intro" className="hover:text-yellow-300 hover:underline transition-all duration-200">
                  हमारे बारे में
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-300 hover:underline transition-all duration-200">
                  हमसे संपर्क करें
                </Link>
              </li>
              <li>
                <Link to="/about/rules-discipline" className="hover:text-yellow-300 hover:underline transition-all duration-200">
                  नियम एवं शर्तें
                </Link>
              </li>
              <li>
                <Link to="/about/rules-discipline" className="hover:text-yellow-300 hover:underline transition-all duration-200">
                  प्राइवेसी पॉलिसी
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div className="lg:col-span-3 flex flex-col space-y-4 pt-4 lg:pt-8 pl-0 lg:pl-4">
            <h3 className="text-xl font-bold text-white tracking-wider border-b-2 border-white/10 pb-1.5 self-start">
              Useful Links
            </h3>
            <ul className="space-y-3.5 text-base font-medium">
              <li>
                <Link to="/directory" className="hover:text-yellow-300 hover:underline transition-all duration-200">
                  डायरेक्टरी
                </Link>
              </li>
              <li>
                <Link to="/greetings" className="hover:text-yellow-300 hover:underline transition-all duration-200">
                  शुभकामना सन्देश
                </Link>
              </li>
              <li>
                <Link to="/about/faq" className="hover:text-yellow-300 hover:underline transition-all duration-200">
                  आपके सवाल - हमारे जवाब
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-amber-300 hover:text-amber-200 hover:underline transition-all duration-200 font-bold flex items-center space-x-1">
                  <span>एडमिन लॉगिन (Admin Panel)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-3 flex flex-col space-y-4 pt-4 lg:pt-8">
            <h3 className="text-xl font-bold text-white tracking-wider border-b-2 border-white/10 pb-1.5 self-start">
              Contact info
            </h3>
            <div className="space-y-4 text-[15px] font-semibold text-white/95 leading-relaxed">
              
              {/* Address */}
              <div className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-white/90 shrink-0 mt-0.5" />
                <span className="hover:text-yellow-300 transition-colors">
                  Rajendra Nagar, Jalore - 343001 Raj.
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-white/90 shrink-0" />
                <a href="tel:9460511491" className="hover:text-yellow-300 transition-colors">
                  +91-9460511491
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-white/90 shrink-0" />
                <a href="mailto:pravasimaliweb@gmail.com" className="hover:text-yellow-300 transition-colors">
                  pravasimaliweb@gmail.com
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-white/90 shrink-0" />
                <span>Office Hours: 8AM - 11PM</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Dark Olive Green Bottom Copyright Bar */}
      <div className="bg-[#38491A] border-t border-black/10 py-5 text-center text-white relative z-10 font-devanagari">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm md:text-base font-bold tracking-wide">
            © 2026 Marwadi Mali Saini Pravasi. All Rights Reserved.
          </p>
        </div>
      </div>

    </footer>
  );
};
