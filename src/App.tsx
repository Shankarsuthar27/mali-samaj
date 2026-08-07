import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TopHeader } from './components/TopHeader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { ScrollToTopButton } from './components/ScrollToTopButton';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { NewsPage } from './pages/NewsPage';
import { GreetingsPage } from './pages/GreetingsPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { WelfarePage } from './pages/WelfarePage';
import { ContactPage } from './pages/ContactPage';
import { MyPageYourPage } from './pages/MyPageYourPage';

function ScrollToTopHelper() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleOpenRegister = () => setIsRegisterOpen(true);
  const handleCloseRegister = () => setIsRegisterOpen(false);

  return (
    <Router>
      <ScrollToTopHelper />
      <div className="min-h-screen flex flex-col bg-gray-50 font-devanagari text-gray-900 selection:bg-orange-500 selection:text-white">
        
        {/* Top Utility Header Bar */}
        <TopHeader />

        {/* Main Navigation Bar & Branding */}
        <Navbar onOpenRegister={handleOpenRegister} />

        {/* Dynamic Route Pages */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onOpenRegister={handleOpenRegister} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/:subpage" element={<AboutPage />} />
            <Route path="/category" element={<NewsPage />} />
            <Route path="/category/:category" element={<NewsPage />} />
            <Route path="/my-page-your-page" element={<MyPageYourPage onOpenRegister={handleOpenRegister} />} />
            <Route path="/greetings" element={<GreetingsPage />} />
            <Route path="/directory" element={<DirectoryPage />} />
            <Route path="/welfare" element={<WelfarePage />} />
            <Route path="/welfare/:subtopic" element={<WelfarePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Registration Popup Modal */}
        <RegistrationModal isOpen={isRegisterOpen} onClose={handleCloseRegister} />

        {/* Global Scroll to Top Button */}
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
