import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  UserCheck, 
  UserX, 
  BookOpen, 
  Settings, 
  LogOut, 
  ShieldAlert, 
  X
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface AdminSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  pendingCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  mobileOpen,
  onCloseMobile,
  pendingCount = 0,
}) => {
  const { logout, adminProfile } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Registration Requests',
      path: '/admin/registrations',
      icon: FileText,
      badge: pendingCount > 0 ? pendingCount : null,
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      label: 'Approved Members',
      path: '/admin/members',
      icon: UserCheck,
    },
    {
      label: 'Rejected Requests',
      path: '/admin/rejected',
      icon: UserX,
    },
    {
      label: 'Manage Blogs',
      path: '/admin/blogs',
      icon: BookOpen,
    },
    {
      label: 'Admin Settings',
      path: '/admin/settings',
      icon: Settings,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200 border-r border-slate-800 font-devanagari">
      {/* Brand & Logo Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-extrabold text-white text-base tracking-wide leading-none">
              माली समाज Admin
            </h2>
            <span className="text-[11px] text-amber-400 font-semibold tracking-wider uppercase">
              Management Portal
            </span>
          </div>
        </div>
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Admin User Info */}
      <div className="p-4 mx-3 my-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-sm shadow">
          {adminProfile?.username?.[0]?.toUpperCase() || 'A'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white truncate">
            {adminProfile?.username || 'admin2233'}
          </p>
          <p className="text-[11px] text-slate-400 capitalize">
            {adminProfile?.role || 'Administrator'}
          </p>
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full shadow-sm ${item.badgeColor}`}>
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-80 max-w-[85vw] h-full z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
