import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shield, Eye, EyeOff, Lock, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminLoginSchema, AdminLoginFormValues } from '../../lib/validations';

export const AdminLoginPage: React.FC = () => {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: 'admin2233',
      password: '',
    },
  });

  const onSubmit = async (values: AdminLoginFormValues) => {
    setIsSubmitting(true);
    setAuthError(null);

    const result = await login(values.username, values.password);

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setAuthError(result.error || 'Authentication failed');
      setIsSubmitting(false);
    }
  };

  const handleFillDefaults = () => {
    setValue('username', 'admin2233');
    setValue('password', 'admin@2233');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-devanagari relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-scaleUp">
        {/* Main Login Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/50">
          
          {/* Brand Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 mx-auto flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Shield className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                माली समाज Admin Login
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                प्रशासनिक पैनल में प्रवेश के लिए लॉगिन करें
              </p>
            </div>
          </div>
          

          {/* Global Error Banner */}
          {authError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-6 text-xs text-red-300 flex items-center space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Username / Admin Email
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  {...register('username')}
                  placeholder="admin2233"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors"
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-400 mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-700 bg-slate-950 text-orange-500 focus:ring-orange-500"
                />
                <span>Remember session</span>
              </label>
              <span className="text-slate-500 text-[11px]">Protected by Supabase Auth</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-500/25 transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Admin Portal Login</span>
              )}
            </button>
          </form>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          मारवाड़ी माली सैनी प्रवासी समाज डायरेक्टरी &copy; 2026
        </p>
      </div>
    </div>
  );
};
