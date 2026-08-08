import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook, MessageCircle, Youtube, Shield } from 'lucide-react';

export const TopHeader: React.FC = () => {
  return (
    <div className="bg-mandala-pattern text-white border-b border-blue-400/20 py-2.5 px-4 sm:px-8 text-xs sm:text-sm font-devanagari transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        {/* Left Content */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 justify-center sm:justify-start">
          <a
            href="mailto:pravasimaliweb@gmail.com"
            className="hidden sm:flex items-center space-x-2 text-headerLightText hover:text-white transition-colors duration-200"
            title="Send Email"
          >
            <Mail className="w-4 h-4 text-cyan-300 shrink-0" />
            <span className="font-medium tracking-wide">pravasimaliweb@gmail.com</span>
          </a>
          
          <a
            href="tel:9460511491"
            className="flex items-center space-x-2 text-headerLightText hover:text-white transition-colors duration-200"
            title="Call Support"
          >
            <Phone className="w-4 h-4 text-cyan-300 shrink-0" />
            <span className="font-medium tracking-wide">9460511491</span>
          </a>
        </div>

        {/* Right Content - Social Icons & Admin Login Link */}
        <div className="flex items-center space-x-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-full text-headerLightText hover:text-pink-400 hover:bg-white/10 transition-all duration-200"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-full text-headerLightText hover:text-blue-400 hover:bg-white/10 transition-all duration-200"
            title="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/919460511491"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-full text-headerLightText hover:text-green-400 hover:bg-white/10 transition-all duration-200"
            title="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-full text-headerLightText hover:text-red-500 hover:bg-white/10 transition-all duration-200"
            title="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>

          {/* Dedicated Admin Portal Direct Link */}
          <Link
            to="/admin/login"
            className="flex items-center space-x-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 hover:text-white border border-amber-400/40 px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-xs"
            title="Admin Login Portal"
          >
            <Shield className="w-3.5 h-3.5 text-amber-300" />
            <span>Admin Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
