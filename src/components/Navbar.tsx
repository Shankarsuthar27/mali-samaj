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
    title: 'समाज ब्लॉग',
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
        'sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent bg-white shadow-md font-devanagari',
        scrolled && 'bg-white/95 backdrop-blur-lg border-gray-200/60 shadow-lg'
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
            <span className="block text-navOrange font-extrabold text-xs sm:text-sm tracking-wider leading-none">
              मारवाड़ी माली सैनी
            </span>
            <span className="block text-gray-800 font-bold text-[10px] sm:text-xs leading-tight">
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
              'px-3 py-2 text-sm font-semibold text-gray-700 hover:text-navOrange rounded-md transition-colors',
              location.pathname === '/' && 'text-navOrange'
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
                'flex items-center space-x-1 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:text-navOrange rounded-md focus:outline-none transition-colors',
                activeDropdown === 'about' && 'text-navOrange bg-gray-50'
              )}
            >
              <span>हमारे बारे में</span>
              <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', activeDropdown === 'about' && 'rotate-180')} />
            </button>

            {activeDropdown === 'about' && (
              <div className="absolute top-full left-0 w-[540px] bg-white rounded-xl shadow-2xl p-4 border border-gray-150 z-50 animate-fadeIn grid grid-cols-12 gap-4">
                <ul className="col-span-7 space-y-2">
                  {aboutLinks.map((item, i) => (
                    <li key={i}>
                      <ListItem {...item} />
                    </li>
                  ))}
                </ul>
                <ul className="col-span-5 bg-gray-50/50 rounded-lg p-3 space-y-2 border border-gray-100">
                  {aboutLinks2.map((item, i) => (
                    <li key={i}>
                      <Link
                        to={item.href}
                        className="flex p-2 hover:bg-gray-100 rounded-md items-center gap-x-2.5 transition-colors group"
                      >
                        <item.icon className="text-gray-550 group-hover:text-navOrange size-4.5 transition-colors" />
                        <span className="font-semibold text-xs sm:text-sm text-gray-800 group-hover:text-navOrange transition-colors">{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
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
                'flex items-center space-x-1 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:text-navOrange rounded-md focus:outline-none transition-colors',
                activeDropdown === 'news' && 'text-navOrange bg-gray-50'
              )}
            >
              <span>गतिविधि समाचार</span>
              <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', activeDropdown === 'news' && 'rotate-180')} />
            </button>

            {activeDropdown === 'news' && (
              <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl p-2.5 border border-gray-150 z-50 animate-fadeIn">
                <ul className="space-y-1.5">
                  {newsLinks.map((item, i) => (
                    <li key={i}>
                      <ListItem {...item} />
                    </li>
                  ))}
                </ul>
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
                'flex items-center space-x-1 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:text-navOrange rounded-md focus:outline-none transition-colors',
                activeDropdown === 'welfare' && 'text-navOrange bg-gray-50'
              )}
            >
              <span>हित की बात</span>
              <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', activeDropdown === 'welfare' && 'rotate-180')} />
            </button>

            {activeDropdown === 'welfare' && (
              <div className="absolute top-full left-0 w-96 bg-white rounded-xl shadow-2xl p-3 border border-gray-150 z-50 animate-fadeIn">
                <ul className="space-y-2">
                  {welfareLinks.map((item, i) => (
                    <li key={i}>
                      <ListItem {...item} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Direct Link: मेरा पेज – आपका पेज */}
          <Link
            to="/my-page-your-page"
            className={cn(
              'px-3 py-2 text-sm font-semibold text-gray-700 hover:text-navOrange rounded-md transition-colors',
              location.pathname === '/my-page-your-page' && 'text-navOrange'
            )}
          >
            मेरा पेज
          </Link>

          {/* Direct Link: शुभकामना सन्देश */}
          <Link
            to="/greetings"
            className={cn(
              'px-3 py-2 text-sm font-semibold text-gray-700 hover:text-navOrange rounded-md transition-colors',
              location.pathname === '/greetings' && 'text-navOrange'
            )}
          >
            शुभकामनाएं
          </Link>

          {/* Direct Link: डायरेक्टरी */}
          <Link
            to="/directory"
            className={cn(
              'px-3 py-2 text-sm font-semibold text-gray-700 hover:text-navOrange rounded-md transition-colors',
              location.pathname === '/directory' && 'text-navOrange'
            )}
          >
            निर्देशिका
          </Link>

          {/* Direct Link: संपर्क */}
          <Link
            to="/contact"
            className={cn(
              'px-3 py-2 text-sm font-semibold text-gray-700 hover:text-navOrange rounded-md transition-colors',
              location.pathname === '/contact' && 'text-navOrange'
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
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2.5 rounded-lg focus:outline-none shadow-sm transition-colors"
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
        <div className="flex w-full flex-col gap-y-4 pb-20">
          
          <div className="flex flex-col gap-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1.5 mb-2">हमारे बारे में</span>
            {aboutLinks.map((link) => (
              <ListItem key={link.title} {...link} onClick={() => setOpen(false)} />
            ))}
            {aboutLinks2.map((link) => (
              <ListItem key={link.title} {...link} onClick={() => setOpen(false)} />
            ))}
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1.5 mb-2">गतिविधि समाचार</span>
            {newsLinks.map((link) => (
              <ListItem key={link.title} {...link} onClick={() => setOpen(false)} />
            ))}
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1.5 mb-2">हित की बात</span>
            {welfareLinks.map((link) => (
              <ListItem key={link.title} {...link} onClick={() => setOpen(false)} />
            ))}
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1.5 mb-2">अन्य लिंक्स</span>
            <Link
              to="/my-page-your-page"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md text-sm font-semibold text-gray-800"
            >
              <span>मेरा पेज</span>
            </Link>
            <Link
              to="/greetings"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md text-sm font-semibold text-gray-800"
            >
              <span>शुभकामनाएं</span>
            </Link>
            <Link
              to="/directory"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md text-sm font-semibold text-gray-800"
            >
              <span>निर्देशिका</span>
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md text-sm font-semibold text-gray-800"
            >
              <span>संपर्क</span>
            </Link>
          </div>

        </div>

        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md pt-3 border-t border-gray-100">
          <button
            onClick={() => {
              setOpen(false);
              onOpenRegister();
            }}
            className="w-full bg-btnGreen hover:bg-btnGreenHover text-white py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center space-x-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register Now</span>
          </button>
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
      className="fixed inset-0 top-[64px] bg-white z-40 flex flex-col overflow-hidden animate-slideDown md:hidden border-t border-gray-150"
    >
      <div className="size-full p-4 overflow-y-auto pb-28 relative">
        {children}
      </div>
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
