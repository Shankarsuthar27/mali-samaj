import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, Bell, ExternalLink, RefreshCw } from 'lucide-react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { RegistrationRequest } from '../types/admin';

export const AdminLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [notifications, setNotifications] = useState<RegistrationRequest[]>([]);
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    fetchPendingCount();

    // Supabase Realtime Listener for new registration requests
    if (isSupabaseConfigured()) {
      const channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'registration_requests',
          },
          (payload) => {
            const newReq = payload.new as RegistrationRequest;
            setNotifications((prev) => [newReq, ...prev]);
            setPendingCount((prev) => prev + 1);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  const fetchPendingCount = async () => {
    try {
      if (isSupabaseConfigured()) {
        const { count, data } = await supabase
          .from('registration_requests')
          .select('*', { count: 'exact' })
          .eq('status', 'pending')
          .order('submitted_at', { ascending: false });

        setPendingCount(count || 0);
        if (data) setNotifications(data as RegistrationRequest[]);
      }
    } catch (e) {
      console.warn('Failed fetching pending count:', e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-devanagari">
      {/* Sidebar */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        pendingCount={pendingCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Header */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
              Admin Control Center
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            {/* Realtime Refresh Button */}
            <button
              onClick={fetchPendingCount}
              className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
              title="Refresh Queue"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 relative transition-colors"
              >
                <Bell className="w-5 h-5" />
                {pendingCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-slate-900 animate-pulse" />
                )}
              </button>

              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fadeIn">
                  <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                    <span className="font-bold text-sm text-white">Notifications</span>
                    <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                      {pendingCount} Pending
                    </span>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/50">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-xs text-slate-400 text-center">No new notifications</p>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <Link
                          key={n.id}
                          to="/admin/registrations"
                          onClick={() => setShowNotifs(false)}
                          className="block p-3 hover:bg-slate-800/60 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white truncate">{n.full_name}</span>
                            <span className="text-[10px] text-slate-400">{n.current_city}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">New registration request submitted</p>
                        </Link>
                      ))
                    )}
                  </div>

                  <div className="p-2 border-t border-slate-800 text-center bg-slate-950/40">
                    <Link
                      to="/admin/registrations"
                      onClick={() => setShowNotifs(false)}
                      className="text-xs font-bold text-orange-400 hover:text-orange-300"
                    >
                      View All Requests &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* View Public Website */}
            <Link
              to="/"
              className="hidden sm:flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors border border-slate-700"
              target="_blank"
            >
              <span>Main Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
