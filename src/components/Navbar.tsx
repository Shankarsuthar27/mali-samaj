import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { 
  Users, 
  HelpCircle, 
  FileText, 
  ShieldCheck, 
  Camera, 
  BookOpen, 
  Globe, 
  MapPin, 
  Heart, 
  Briefcase, 
  GraduationCap, 
  Award,
  ChevronDown,
  Menu,
  X,
  UserPlus
} from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
}

type LinkItem = {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  description?: string;
};
const aboutLinks: LinkItem[] = [
  {
    title: 'संस्थान परिचय',
    href: '/about/institute-intro',
    description: 'संस्थान के उद्देश्य एवं परिचय की जानकारी',
    icon: ShieldCheck,
  },
  {
    title: 'हमारी टीम',
    href: '/about/our-team',
    description: 'कार्यकारिणी एवं संचालक मंडल का विवरण',
    icon: Users,
  },
  {
    title: 'फोटो गैलरी',
    href: '/about/photo-gallery',
    description: 'सांस्कृतिक एवं सामाजिक कार्यक्रमों की तस्वीरें',
    icon: Camera,
  },
  {
    title: 'नियम एवं अनुशासन',
    href: '/about/rules-discipline',
    description: 'वेबसाइट उपयोग के नियम एवं आचार संहिता',
    icon: FileText,
  },
];

const aboutLinks2: LinkItem[] = [
  {
    title: 'आपके सवाल – हमारे जवाब',
    href: '/about/faq',
    icon: HelpCircle,
  },
  {
    title: 'All Blog',
    href: '/about/blog',
    icon: BookOpen,
  },
];

const newsLinks: LinkItem[] = [
  {
    title: 'मारवाड़ समाचार',
    href: '/category/marwar',
    description: 'मारवाड़ क्षेत्र की सामाजिक गतिविधियां',
    icon: Globe,
  },
  {
    title: 'प्रवास प्रदेश समाचार',
    href: '/category/pravas-pradesh',
    description: 'प्रवास क्षेत्रों की ताज़ा गतिविधियां',
    icon: MapPin,
  },
];

const welfareLinks: LinkItem[] = [
  {
    title: 'सोशल वेलफेयर',
    href: '/welfare/social-welfare',
    description: 'सामाजिक सरोकार एवं कल्याण योजनाएं',
    icon: Heart,
  },
  {
    title: 'व्यापारिक सलाह',
    href: '/welfare/business-advice',
    description: 'व्यवसाय एवं उद्योग मार्गदर्शन',
    icon: Briefcase,
  },
  {
    title: 'रोजगार अवसर',
    href: '/welfare/employment-opportunities',
    description: 'कैरियर एवं नौकरी के नए अवसर',
    icon: GraduationCap,
  },
  {
    title: 'समाज रत्न',
    href: '/welfare/samaj-ratna',
    description: 'समाज के पुरुषार्थी रत्न एवं प्रेरणा स्त्रोत',
    icon: Award,
  },
];
// Helper function to combine tailwind classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [open, setOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const scrolled = useScroll(10);
  const location = useLocation();

  const [aboutExpanded, setAboutExpanded] = React.useState(false);
  const [newsExpanded, setNewsExpanded] = React.useState(false);
  const [welfareExpanded, setWelfareExpanded] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setAboutExpanded(false);
      setNewsExpanded(false);
      setWelfareExpanded(false);
    }
  }, [open]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent bg-navOrange shadow-md font-devanagari',
        scrolled && 'bg-navOrange/95 backdrop-blur-lg border-orange-600/20 shadow-lg'
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex-shrink-0 focus:outline-none z-50">
            <div className="bg-white p-1 rounded-full shadow-sm border border-gray-100 flex items-center justify-center">
              <img
                src="/images/WhatsApp_Image_2026-06-19_at_6.43.20_PM-removebg-preview.webp"
                alt="मारवाड़ी माली सैनी प्रवासी समाज Logo"
                className="h-11 sm:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
          <div className="hidden xs:block text-left">
            <span className="block text-white font-extrabold text-xs sm:text-sm tracking-wider leading-none">
              मारवाड़ी माली सैनी
            </span>
            <span className="block text-white/90 font-bold text-[10px] sm:text-xs leading-tight">
              प्रवासी समाज
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          
          {/* Homelink */}
          <Link
            to="/"
            className={cn(
              'px-3 py-2 text-sm font-semibold text-white hover:text-accentYellow rounded-md transition-colors',
              location.pathname === '/' && 'text-accentYellow'
            )}
          >
            होम
          </Link>

          {/* Dropdown 1: हमारे बारे में */}
          <div
            className="relative py-2"
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={cn(
                'flex items-center space-x-1 px-3 py-1.5 text-sm font-semibold text-white hover:text-accentYellow rounded-md focus:outline-none transition-colors',
                activeDropdown === 'about' && 'text-accentYellow bg-white/15'
              )}
            >
              <span>हमारे बारे में</span>
              <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', activeDropdown === 'about' && 'rotate-180')} />
            </button>

            {activeDropdown === 'about' && (
              <div className="absolute top-full left-0 w-64 bg-[#344219] rounded-md shadow-2xl overflow-hidden border border-[#485b24]/80 py-1 z-50 animate-fadeIn font-devanagari">
                <div className="flex flex-col">
                  {aboutLinks.concat(aboutLinks2).map((item, i) => (
                    <Link
                      key={i}
                      to={item.href}
                      className="block px-5 py-3 text-left text-[#e5dcad] hover:text-white hover:bg-[#556822] font-bold text-xs sm:text-sm border-b border-[#485b24]/50 last:border-b-0 transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dropdown 2: गतिविधि समाचार */}
          <div
            className="relative py-2"
            onMouseEnter={() => handleMouseEnter('news')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={cn(
                'flex items-center space-x-1 px-3 py-1.5 text-sm font-semibold text-white hover:text-accentYellow rounded-md focus:outline-none transition-colors',
                activeDropdown === 'news' && 'text-accentYellow bg-white/15'
              )}
            >
              <span>गतिविधि समाचार</span>
              <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', activeDropdown === 'news' && 'rotate-180')} />
            </button>

            {activeDropdown === 'news' && (
              <div className="absolute top-full left-0 w-64 bg-[#344219] rounded-md shadow-2xl overflow-hidden border border-[#485b24]/80 py-1 z-50 animate-fadeIn font-devanagari">
                <div className="flex flex-col">
                  {newsLinks.map((item, i) => (
                    <Link
                      key={i}
                      to={item.href}
                      className="block px-5 py-3 text-left text-[#e5dcad] hover:text-white hover:bg-[#556822] font-bold text-xs sm:text-sm border-b border-[#485b24]/50 last:border-b-0 transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dropdown 3: हित की बात */}
          <div
            className="relative py-2"
            onMouseEnter={() => handleMouseEnter('welfare')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={cn(
                'flex items-center space-x-1 px-3 py-1.5 text-sm font-semibold text-white hover:text-accentYellow rounded-md focus:outline-none transition-colors',
                activeDropdown === 'welfare' && 'text-accentYellow bg-white/15'
              )}
            >
              <span>हित की बात</span>
              <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', activeDropdown === 'welfare' && 'rotate-180')} />
            </button>

            {activeDropdown === 'welfare' && (
              <div className="absolute top-full left-0 w-64 bg-[#344219] rounded-md shadow-2xl overflow-hidden border border-[#485b24]/80 py-1 z-50 animate-fadeIn font-devanagari">
                <div className="flex flex-col">
                  {welfareLinks.map((item, i) => (
                    <Link
                      key={i}
                      to={item.href}
                      className="block px-5 py-3 text-left text-[#e5dcad] hover:text-white hover:bg-[#556822] font-bold text-xs sm:text-sm border-b border-[#485b24]/50 last:border-b-0 transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Direct Link: मेरा पेज – आपका पेज */}
          <Link
            to="/my-page-your-page"
            className={cn(
              'px-3 py-2 text-sm font-semibold text-white hover:text-accentYellow rounded-md transition-colors',
              location.pathname === '/my-page-your-page' && 'text-accentYellow'
            )}
          >
            मेरा पेज
          </Link>

          {/* Direct Link: शुभकामना सन्देश */}
          <Link
            to="/greetings"
            className={cn(
              'px-3 py-2 text-sm font-semibold text-white hover:text-accentYellow rounded-md transition-colors',
              location.pathname === '/greetings' && 'text-accentYellow'
            )}
          >
            शुभकामनाएं
          </Link>

          {/* Direct Link: डायरेक्टरी */}
          <Link
            to="/directory"
            className={cn(
              'px-3 py-2 text-sm font-semibold text-white hover:text-accentYellow rounded-md transition-colors',
              location.pathname === '/directory' && 'text-accentYellow'
            )}
          >
            डायरेक्टरी
          </Link>

          {/* Direct Link: संपर्क */}
          <Link
            to="/contact"
            className={cn(
              'px-3 py-2 text-sm font-semibold text-white hover:text-accentYellow rounded-md transition-colors',
              location.pathname === '/contact' && 'text-accentYellow'
            )}
          >
            संपर्क
          </Link>

        </div>

        {/* CTA Register Button (Desktop) */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={onOpenRegister}
            className="bg-btnGreen hover:bg-btnGreenHover text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center space-x-1.5 border border-green-300/20"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register Now</span>
          </button>
        </div>

        {/* Mobile menu trigger and register button */}
        <div className="flex items-center space-x-2 lg:hidden z-50">
          <button
            onClick={onOpenRegister}
            className="bg-btnGreen hover:bg-btnGreenHover text-white px-3.5 py-2 rounded-full text-xs font-bold shadow-md flex items-center space-x-1"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register</span>
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="bg-white/15 hover:bg-white/25 text-white p-2.5 rounded-lg focus:outline-none shadow-sm transition-colors"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer via Portal */}
      <MobileMenu open={open} onClose={() => setOpen(false)}>
        {/* Mobile Header Bar */}
        <div className="bg-mandala-pattern bg-[#1b75bc] flex items-center justify-between px-4 py-3 h-18 shrink-0 shadow-md">
          {/* Logo */}
          <Link to="/" onClick={() => setOpen(false)} className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0 w-12 h-12">
            <img
              src="/images/WhatsApp_Image_2026-06-19_at_6.43.20_PM-removebg-preview.webp"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Register & Close buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setOpen(false);
                onOpenRegister();
              }}
              className="bg-btnGreen hover:bg-btnGreenHover text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-1.5 border border-green-300/20"
            >
              <UserPlus className="w-4 h-4 shrink-0" />
              <span>Register</span>
            </button>

            <button
              onClick={() => setOpen(false)}
              className="bg-navOrange hover:bg-[#e66b00] text-white p-2.5 rounded-xl shadow-md transition-colors flex items-center justify-center h-10 w-10 shrink-0"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 shrink-0" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-navOrange font-devanagari pb-20">
          {/* 1. होम */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block text-white text-lg font-bold py-1.5 transition-colors hover:text-accentYellow"
          >
            होम
          </Link>

          {/* 2. हमारे बारे में (Accordion) */}
          <div className="flex flex-col">
            <button
              onClick={() => setAboutExpanded(!aboutExpanded)}
              className="flex items-center justify-between w-full text-white text-lg font-bold py-1.5 focus:outline-none"
            >
              <span>हमारे बारे में</span>
              <ChevronDown className={cn("w-5 h-5 text-accentYellow transition-transform duration-200", aboutExpanded && "rotate-180")} />
            </button>
            <div className={cn(
              "transition-all duration-350 ease-in-out overflow-hidden",
              aboutExpanded ? "max-h-[500px] opacity-100 mt-2 mb-1" : "max-h-0 opacity-0 mt-0 mb-0 pointer-events-none"
            )}>
              <div className="bg-[#344219] rounded-2xl overflow-hidden border border-[#485b24]/80 shadow-inner">
                <Link
                  to="/about/institute-intro"
                  onClick={() => setOpen(false)}
                  className="block text-[#e5dcad] font-bold text-[15px] px-5 py-3.5 border-b border-[#485b24]/50 hover:text-white hover:bg-[#556822] transition-colors"
                >
                  संस्थान परिचय
                </Link>
                <Link
                  to="/about/our-team"
                  onClick={() => setOpen(false)}
                  className="block text-[#e5dcad] font-bold text-[15px] px-5 py-3.5 border-b border-[#485b24]/50 hover:text-white hover:bg-[#556822] transition-colors"
                >
                  हमारी टीम
                </Link>
                <Link
                  to="/about/photo-gallery"
                  onClick={() => setOpen(false)}
                  className="block text-[#e5dcad] font-bold text-[15px] px-5 py-3.5 border-b border-[#485b24]/50 hover:text-white hover:bg-[#556822] transition-colors"
                >
                  फोटो गैलरी
                </Link>
                <Link
                  to="/about/rules-discipline"
                  onClick={() => setOpen(false)}
                  className="block text-[#e5dcad] font-bold text-[15px] px-5 py-3.5 border-b border-[#485b24]/50 hover:text-white hover:bg-[#556822] transition-colors"
                >
                  नियम एवं अनुशासन
                </Link>
                <Link
                  to="/about/faq"
                  onClick={() => setOpen(false)}
                  className="block text-[#e5dcad] font-bold text-[15px] px-5 py-3.5 border-b border-[#485b24]/50 hover:text-white hover:bg-[#556822] transition-colors"
                >
                  आपके सवाल - हमारे जवाब
                </Link>
                <Link
                  to="/about/blog"
                  onClick={() => setOpen(false)}
                  className="block text-[#e5dcad] font-bold text-[15px] px-5 py-3.5 last:border-0 hover:text-white hover:bg-[#556822] transition-colors"
                >
                  Blog
                </Link>
              </div>
            </div>
          </div>

          {/* 3. गतिविधि समाचार (Accordion) */}
          <div className="flex flex-col">
            <button
              onClick={() => setNewsExpanded(!newsExpanded)}
              className="flex items-center justify-between w-full text-white text-lg font-bold py-1.5 focus:outline-none"
            >
              <span>गतिविधि समाचार</span>
              <ChevronDown className={cn("w-5 h-5 text-accentYellow transition-transform duration-200", newsExpanded && "rotate-180")} />
            </button>
            <div className={cn(
              "transition-all duration-350 ease-in-out overflow-hidden",
              newsExpanded ? "max-h-[300px] opacity-100 mt-2 mb-1" : "max-h-0 opacity-0 mt-0 mb-0 pointer-events-none"
            )}>
              <div className="bg-[#344219] rounded-2xl overflow-hidden border border-[#485b24]/80 shadow-inner">
                <Link
                  to="/category/marwar"
                  onClick={() => setOpen(false)}
                  className="block text-[#e5dcad] font-bold text-[15px] px-5 py-3.5 border-b border-[#485b24]/50 hover:text-white hover:bg-[#556822] transition-colors"
                >
                  मारवाड़ समाचार
                </Link>
                <Link
                  to="/category/pravas-pradesh"
                  onClick={() => setOpen(false)}
                  className="block text-[#e5dcad] font-bold text-[15px] px-5 py-3.5 last:border-0 hover:text-white hover:bg-[#556822] transition-colors"
                >
                  प्रवास प्रदेश समाचार
                </Link>
              </div>
            </div>
          </div>

          {/* 4. मेरा पेज - आपका पेज */}
          <Link
            to="/my-page-your-page"
            onClick={() => setOpen(false)}
            className="block text-white text-lg font-bold py-1.5 transition-colors hover:text-accentYellow"
          >
            मेरा पेज - आपका पेज
          </Link>

          {/* 5. शुभकामना सन्देश */}
          <Link
            to="/greetings"
            onClick={() => setOpen(false)}
            className="block text-white text-lg font-bold py-1.5 transition-colors hover:text-accentYellow"
          >
            शुभकामना सन्देश
          </Link>

          {/* 6. डायरेक्टरी */}
          <Link
            to="/directory"
            onClick={() => setOpen(false)}
            className="block text-white text-lg font-bold py-1.5 transition-colors hover:text-accentYellow"
          >
            डायरेक्टरी
          </Link>

          {/* 7. हित की बात (Accordion) */}
          <div className="flex flex-col">
            <button
              onClick={() => setWelfareExpanded(!welfareExpanded)}
              className="flex items-center justify-between w-full text-white text-lg font-bold py-1.5 focus:outline-none"
            >
              <span>हित की बात</span>
              <ChevronDown className={cn("w-5 h-5 text-accentYellow transition-transform duration-200", welfareExpanded && "rotate-180")} />
            </button>
            <div className={cn(
              "transition-all duration-350 ease-in-out overflow-hidden",
              welfareExpanded ? "max-h-[400px] opacity-100 mt-2 mb-1" : "max-h-0 opacity-0 mt-0 mb-0 pointer-events-none"
            )}>
              <div className="bg-[#344219] rounded-2xl overflow-hidden border border-[#485b24]/80 shadow-inner">
                <Link
                  to="/welfare/social-welfare"
                  onClick={() => setOpen(false)}
                  className="block text-[#e5dcad] font-bold text-[15px] px-5 py-3.5 border-b border-[#485b24]/50 hover:text-white hover:bg-[#556822] transition-colors"
                >
                  सोशल वेलफेयर
                </Link>
                <Link
                  to="/welfare/business-advice"
                  onClick={() => setOpen(false)}
                  className="block text-[#e5dcad] font-bold text-[15px] px-5 py-3.5 border-b border-[#485b24]/50 hover:text-white hover:bg-[#556822] transition-colors"
                >
                  व्यापारिक सलाह
                </Link>
                <Link
                  to="/welfare/employment-opportunities"
                  onClick={() => setOpen(false)}
                  className="block text-[#e5dcad] font-bold text-[15px] px-5 py-3.5 border-b border-[#485b24]/50 hover:text-white hover:bg-[#556822] transition-colors"
                >
                  रोजगार अवसर
                </Link>
                <Link
                  to="/welfare/samaj-ratna"
                  onClick={() => setOpen(false)}
                  className="block text-[#e5dcad] font-bold text-[15px] px-5 py-3.5 last:border-0 hover:text-white hover:bg-[#556822] transition-colors"
                >
                  समाज रत्न
                </Link>
              </div>
            </div>
          </div>

          {/* 8. संपर्क */}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block text-white text-lg font-bold py-1.5 transition-colors hover:text-accentYellow"
          >
            संपर्क
          </Link>
        </div>
      </MobileMenu>
    </header>
  );
};

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function MobileMenu({ open, onClose, children }: MobileMenuProps) {
  if (!open || typeof window === 'undefined') return null;

  return createPortal(
    <div
      id="mobile-menu"
      className="fixed inset-0 bg-[#FF7700] z-[100] flex flex-col overflow-hidden animate-slideDown lg:hidden"
    >
      {children}
    </div>,
    document.body
  );
}

interface ListItemProps {
  title: string;
  description?: string;
  icon: React.ComponentType<any>;
  href: string;
  onClick?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  description,
  icon: Icon,
  href,
  onClick
}) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="w-full flex flex-row gap-x-3 hover:bg-gray-100 rounded-lg p-2 transition-all duration-200 group"
    >
      <div className="bg-gray-50 flex aspect-square size-11 items-center justify-center rounded-lg border border-gray-200/50 shadow-sm shrink-0 group-hover:bg-white transition-colors">
        <Icon className="text-gray-600 group-hover:text-navOrange size-5 transition-colors" />
      </div>
      <div className="flex flex-col items-start justify-center min-w-0">
        <span className="font-semibold text-xs sm:text-sm text-gray-800 group-hover:text-navOrange transition-colors truncate w-full">
          {title}
        </span>
        {description && (
          <span className="text-gray-450 text-[10px] sm:text-xs leading-normal truncate w-full">
            {description}
          </span>
        )}
      </div>
    </Link>
  );
};

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);

  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  React.useEffect(() => {
    onScroll();
  }, [onScroll]);

  return scrolled;
}
