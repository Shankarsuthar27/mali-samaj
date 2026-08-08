import React, { useState } from 'react';
import { Database, ShieldCheck, Copy, Check, Terminal, Info, KeyRound } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminSettingsPage: React.FC = () => {
  const { adminProfile } = useAdminAuth();
  const [copied, setCopied] = useState(false);
  const isConfigured = isSupabaseConfigured();

  const sqlSetupScript = `-- Run this script in your Supabase SQL Editor:
-- 1. Create Tables & RLS Policies
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  father_name TEXT,
  gotra TEXT,
  marwar_location TEXT,
  current_city TEXT NOT NULL,
  state TEXT NOT NULL,
  occupation TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  status TEXT DEFAULT 'approved',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.registration_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  gotra TEXT NOT NULL,
  marwar_location TEXT NOT NULL,
  current_city TEXT NOT NULL,
  state TEXT NOT NULL,
  occupation TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  status TEXT DEFAULT 'pending',
  rejection_reason TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE,
  username TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin'
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registration_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read approved profiles" ON public.profiles FOR SELECT USING (status = 'approved');
CREATE POLICY "Public insert reg requests" ON public.registration_requests FOR INSERT WITH CHECK (true);
`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSetupScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 font-devanagari">
      <div>
        <h2 className="text-2xl font-extrabold text-white">एडमिन सेटिंग्स एवं डेटाबेस स्थिति (Admin Settings)</h2>
        <p className="text-xs text-slate-400">Supabase डेटाबेस कनेक्शन, माइग्रेशन गाइड और एडमिन क्रेडेंशियल सेटिंग्स</p>
      </div>

      {/* Supabase Status Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
              isConfigured ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
            }`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Supabase Connection Status</h3>
              <p className="text-xs text-slate-400">
                {isConfigured ? 'सफलतापूर्वक जुड़ा हुआ है (Connected)' : 'डेमो लोकल मोड में चल रहा है (Placeholder Config)'}
              </p>
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            isConfigured
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
          }`}>
            {isConfigured ? 'Live Connected' : 'Demo Fallback Active'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-500 font-mono">VITE_SUPABASE_URL</span>
            <p className="text-xs font-mono text-slate-200 truncate">
              {import.meta.env.VITE_SUPABASE_URL || 'Not set'}
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-500 font-mono">VITE_SUPABASE_ANON_KEY</span>
            <p className="text-xs font-mono text-slate-200 truncate">
              {import.meta.env.VITE_SUPABASE_ANON_KEY ? '••••••••••••••••••••' : 'Not set'}
            </p>
          </div>
        </div>
      </div>

      {/* Initial Admin Credentials Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center shadow-lg">
            <KeyRound className="w-6 h-6" /> 
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Initial Admin Account Credentials</h3>
            <p className="text-xs text-slate-400">प्रथम एडमिन लॉगिन क्रेडेंशियल (Never store plaintext in public repos)</p>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Username:</span>
            <span className="font-mono font-bold text-amber-400 text-sm">admin2233</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Default Password:</span>
            <span className="font-mono font-bold text-amber-400 text-sm">admin@2233</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Current Logged-in Admin:</span>
            <span className="font-bold text-white">{adminProfile?.username || 'admin2233'} ({adminProfile?.role || 'admin'})</span>
          </div>
        </div>
      </div>

      {/* SQL Migration Script Helper */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Terminal className="w-6 h-6 text-orange-400" />
            <div>
              <h3 className="text-base font-bold text-white">Supabase SQL Quick Setup Script</h3>
              <p className="text-xs text-slate-400">Supabase SQL Editor में तालिकाएं व RLS नीतियां बनाने के लिए उपयुक्त</p>
            </div>
          </div>
          <button
            onClick={handleCopySql}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-700 flex items-center space-x-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy SQL'}</span>
          </button>
        </div>

        <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-[11px] font-mono text-amber-300/90 overflow-x-auto max-h-60">
          {sqlSetupScript}
        </pre>
      </div>
    </div>
  );
};
