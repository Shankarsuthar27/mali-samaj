import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, UserPlus } from 'lucide-react';
import { NavItem } from '../types';

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const location = useLocation();

  const navItems: NavItem[] = [
    { label: 'होम', path: '/' },
    {
      label: 'हमारे बारे में',
      dropdownItems: [
        { label: 'संस्थान परिचय', path: '/about/institute-intro' },
        { label: 'हमारी टीम', path: '/about/our-team' },
        { label: 'फोटो गैलरी', path: '/about/photo-gallery' },
        { label: 'नियम एवं अनुशासन', path: '/about/rules-discipline' },
        { label: 'आपके सवाल – हमारे जवाब', path: '/about/faq' },
        { label: 'Blog', path: '/about/blog' },
      ],
    },
    {
      label: 'गतिविधि समाचार',
      dropdownItems: [
        { label: 'मारवाड़', path: '/category/marwar' },
        { label: 'प्रवास प्रदेश', path: '/category/pravas-pradesh' },
      ],
    },
    { label: 'मेरा पेज – आपका पेज', path: '/my-page-your-page' },
    { label: 'शुभकामना सन्देश', path: '/greetings' },
    { label: 'डायरेक्टरी', path: '/directory' },
    {
      label: 'हित की बात',
      dropdownItems: [
        { label: 'सोशल वेलफेयर', path: '/welfare/social-welfare' },
        { label: 'व्यापारिक सलाह', path: '/welfare/business-advice' },
        { label: 'रोजगार अवसर', path: '/welfare/employment-opportunities' },
        { label: 'पुरुषार्थी समाज रत्न', path: '/welfare/samaj-ratna' },
      ],
    },
    { label: 'संपर्क', path: '/contact' },
  ];

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileCategory = (label: string) => {
    setExpandedMobileCategory(expandedMobileCategory === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-50 shadow-lg bg-mandala-pattern">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2">
        <div className="flex items-center justify-between">
          
          {/* Logo (Left): White Card Badge with Circular Logo */}
          <Link to="/" className="flex-shrink-0 z-20 focus:outline-none">
            <div className="bg-white px-3 py-1.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex items-center justify-center">
              <img
                src="/images/WhatsApp_Image_2026-06-19_at_6.43.20_PM-removebg-preview.webp"
                alt="मारवाड़ी माली सैनी प्रवासी समाज Logo"
                className="h-14 sm:h-16 md:h-18 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Main Orange Navigation Bar Container */}
          <nav className="hidden lg:flex flex-1 items-center justify-between bg-navOrange rounded-r-3xl shadow-md ml-4 px-4 py-2 text-white font-devanagari relative">
            <div className="flex items-center space-x-1 lg:space-x-2 text-sm lg:text-base font-semibold">
              {navItems.map((item) => {
                const isDropdown = Boolean(item.dropdownItems && item.dropdownItems.length > 0);
                const isActive = item.path === location.pathname;

                if (isDropdown) {
                  return (
                    <div
                      key={item.label}
                      className="relative py-2"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition-colors duration-200 focus:outline-none ${
                          activeDropdown === item.label
                            ? 'bg-black/20 text-yellow-200'
                            : 'hover:bg-black/15 text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180 text-yellow-300' : ''
                        }`} />
                      </button>

                      {/* Dropdown Menu Box */}
                      {activeDropdown === item.label && (
                        <div className="absolute top-full left-0 w-60 bg-dropdownGreen rounded-b-md shadow-2xl py-2 z-50 border-t-2 border-yellow-400 animate-fadeIn">
                          {item.dropdownItems?.map((subItem) => (
                            <Link
                              key={subItem.label}
                              to={subItem.path}
                              className="block px-4 py-2 text-sm text-white hover:bg-dropdownHover hover:text-yellow-300 transition-colors duration-150 border-b border-white/5 last:border-0"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    to={item.path || '/'}
                    className={`px-3 py-1.5 rounded-md transition-colors duration-200 ${
                      isActive
                        ? 'bg-black/25 text-yellow-300 font-bold'
                        : 'hover:bg-black/15 text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA Button (Right): Rounded Green Pill Button */}
            <button
              onClick={onOpenRegister}
              className="ml-3 bg-btnGreen hover:bg-btnGreenHover text-white px-5 py-2 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2 shrink-0 border border-green-300/30"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register Now</span>
            </button>
          </nav>

          {/* Mobile Menu & Register Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenRegister}
              className="bg-btnGreen hover:bg-btnGreenHover text-white px-3 py-1.5 rounded-full text-xs font-bold shadow flex items-center space-x-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-navOrange text-white p-2 rounded-lg focus:outline-none shadow"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navOrange text-white border-t border-orange-600/50 font-devanagari px-4 py-4 space-y-2 shadow-2xl animate-slideDown">
          {navItems.map((item) => {
            const isDropdown = Boolean(item.dropdownItems && item.dropdownItems.length > 0);
            const isExpanded = expandedMobileCategory === item.label;

            if (isDropdown) {
              return (
                <div key={item.label} className="border-b border-white/10 pb-2">
                  <button
                    onClick={() => toggleMobileCategory(item.label)}
                    className="w-full flex items-center justify-between py-2 text-left text-base font-semibold text-white focus:outline-none"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-yellow-300' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="mt-1 pl-4 space-y-1 bg-dropdownGreen rounded-lg p-2">
                      {item.dropdownItems?.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-2 text-sm text-gray-100 hover:text-yellow-300 border-b border-white/5 last:border-0"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path || '/'}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-semibold text-white hover:text-yellow-200 border-b border-white/10"
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
