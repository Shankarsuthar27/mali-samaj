import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
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
import { DirectoryProfilePage } from './pages/DirectoryProfilePage';
import { RegistrationStatusPage } from './pages/RegistrationStatusPage';
import { WelfarePage } from './pages/WelfarePage';
import { ContactPage } from './pages/ContactPage';
import { MyPageYourPage } from './pages/MyPageYourPage';

// Admin System
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminRegistrationsPage } from './pages/admin/AdminRegistrationsPage';
import { AdminMembersPage } from './pages/admin/AdminMembersPage';
import { AdminRejectedPage } from './pages/admin/AdminRejectedPage';
import { AdminDirectoryPage } from './pages/admin/AdminDirectoryPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminBlogsPage } from './pages/admin/AdminBlogsPage';

function ScrollToTopHelper() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PublicLayout({ onOpenRegister }: { onOpenRegister: () => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-devanagari text-gray-900 selection:bg-orange-500 selection:text-white">
      <TopHeader />
      <Navbar onOpenRegister={onOpenRegister} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleOpenRegister = () => setIsRegisterOpen(true);
  const handleCloseRegister = () => setIsRegisterOpen(false);

  return (
    <AdminAuthProvider>
      <Router>
        <ScrollToTopHelper />

        <Routes>
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="registrations" element={<AdminRegistrationsPage />} />
            <Route path="members" element={<AdminMembersPage />} />
            <Route path="rejected" element={<AdminRejectedPage />} />
            <Route path="directory" element={<AdminDirectoryPage />} />
            <Route path="blogs" element={<AdminBlogsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Public Website Routes */}
          <Route element={<PublicLayout onOpenRegister={handleOpenRegister} />}>
            <Route path="/" element={<HomePage onOpenRegister={handleOpenRegister} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/:subpage" element={<AboutPage />} />
            <Route path="/category" element={<NewsPage />} />
            <Route path="/category/:category" element={<NewsPage />} />
            <Route path="/my-page-your-page" element={<MyPageYourPage onOpenRegister={handleOpenRegister} />} />
            <Route path="/greetings" element={<GreetingsPage />} />
            <Route path="/directory" element={<DirectoryPage />} />
            <Route path="/directory/:slug" element={<DirectoryProfilePage />} />
            <Route path="/registration-status" element={<RegistrationStatusPage />} />
            <Route path="/welfare" element={<WelfarePage />} />
            <Route path="/welfare/:subtopic" element={<WelfarePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>

        {/* Global Registration Modal & Scroll Button */}
        <RegistrationModal isOpen={isRegisterOpen} onClose={handleCloseRegister} />
        <ScrollToTopButton />
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
