import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  UserCheck, 
  UserX, 
  Activity, 
  Sparkles,
  Search
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { RegistrationRequest, DashboardStats, AdminActivityLog } from '../../types/admin';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminDashboardPage: React.FC = () => {
  const { adminProfile } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalRegistrations: 0,
    pendingRequests: 0,
    approvedMembers: 0,
    rejectedRequests: 0,
  });
  const [recentRequests, setRecentRequests] = useState<RegistrationRequest[]>([]);
  const [recentLogs, setRecentLogs] = useState<AdminActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured()) {
        // Fetch stats counts
        const { count: total } = await supabase.from('registration_requests').select('*', { count: 'exact', head: true });
        const { count: pending } = await supabase.from('registration_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending');
        const { count: approved } = await supabase.from('registration_requests').select('*', { count: 'exact', head: true }).eq('status', 'approved');
        const { count: rejected } = await supabase.from('registration_requests').select('*', { count: 'exact', head: true }).eq('status', 'rejected');

        setStats({
          totalRegistrations: total || 0,
          pendingRequests: pending || 0,
          approvedMembers: approved || 0,
          rejectedRequests: rejected || 0,
        });

        // Fetch recent pending or overall requests
        const { data: reqs } = await supabase
          .from('registration_requests')
          .select('*')
          .order('submitted_at', { ascending: false })
          .limit(6);

        if (reqs) setRecentRequests(reqs as RegistrationRequest[]);

        // Fetch activity logs
        const { data: logs } = await supabase
          .from('admin_activity_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (logs) setRecentLogs(logs as AdminActivityLog[]);
      } else {
        // Sample fallback data if Supabase credentials are not connected
        setStats({
          totalRegistrations: 1248,
          pendingRequests: 24,
          approvedMembers: 1180,
          rejectedRequests: 44,
        });

        setRecentRequests([
          {
            id: 'req-1',
            full_name: 'रामेश्वर लाल माली',
            father_name: 'मोहनलाल जी',
            gotra: 'पंवार',
            marwar_location: 'सोजत (पाली)',
            current_city: 'अहमदाबाद',
            state: 'गुजरात',
            occupation: 'टेक्सटाइल होलसेल व्यापार',
            phone: '9876543210',
            status: 'pending',
            submitted_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: 'req-2',
            full_name: 'दिनेश कुमार सुंदेसा',
            father_name: 'पारसमल जी',
            gotra: 'सुंदेसा',
            marwar_location: 'जालौर',
            current_city: 'बैंगलोर',
            state: 'कर्नाटक',
            occupation: 'Pooja Beauty Center',
            phone: '9535009850',
            status: 'pending',
            submitted_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: 'req-3',
            full_name: 'CA कमलेश सोलंकी',
            father_name: 'गहलोत जी',
            gotra: 'सोलंकी',
            marwar_location: 'पाली',
            current_city: 'अहमदाबाद',
            state: 'गुजरात',
            occupation: 'के. सोलंकी एंड कंपनी (चार्टर्ड अकाउंटेंट)',
            phone: '9327058542',
            status: 'approved',
            submitted_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

        setRecentLogs([
          {
            id: 'log-1',
            admin_username: 'admin2233',
            action: 'APPROVE_REGISTRATION',
            description: 'Approved registration request for CA कमलेश सोलंकी (अहमदाबाद)',
            created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          },
        ]);
      }
    } catch (e) {
      console.error('Error fetching dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickApprove = async (id: string) => {
    setActionLoading(id);
    try {
      if (isSupabaseConfigured()) {
        const req = recentRequests.find((r) => r.id === id);
        let rpcSuccess = false;
        try {
          const { error } = await supabase.rpc('approve_registration_request', {
            p_request_id: id,
            p_admin_id: adminProfile?.user_id || '00000000-0000-0000-0000-000000000001',
          });
          if (!error) rpcSuccess = true;
        } catch (e) {
          rpcSuccess = false;
        }

        if (!rpcSuccess && req) {
          const baseSlug = (req.full_name || 'member')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
          const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;

          await supabase.from('profiles').insert({
            slug,
            full_name: req.full_name,
            father_name: req.father_name,
            gotra: req.gotra,
            marwar_location: req.marwar_location,
            current_city: req.current_city,
            state: req.state,
            occupation: req.occupation,
            phone: req.phone,
            email: req.email || null,
            profile_image: req.profile_image || null,
            company_name: req.occupation,
            status: 'approved',
          });

          const { error: updateErr } = await supabase
            .from('registration_requests')
            .update({
              status: 'approved',
            })
            .eq('id', id);

          if (updateErr) throw updateErr;
        }
      }

      setRecentRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
      );
      setStats((prev) => ({
        ...prev,
        pendingRequests: Math.max(0, prev.pendingRequests - 1),
        approvedMembers: prev.approvedMembers + 1,
      }));
    } catch (err: any) {
      alert('Approval failed: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleQuickReject = async (id: string) => {
    const reason = prompt('अस्वीकृति का कारण दर्ज करें (Rejection Reason):', 'अधूरी जानकारी / सत्यापन में त्रुटि');
    if (reason === null) return;

    setActionLoading(id);
    try {
      if (isSupabaseConfigured()) {
        let rpcSuccess = false;
        try {
          const { error } = await supabase.rpc('reject_registration_request', {
            p_request_id: id,
            p_reason: reason,
            p_admin_id: adminProfile?.user_id || '00000000-0000-0000-0000-000000000001',
          });
          if (!error) rpcSuccess = true;
        } catch (e) {
          rpcSuccess = false;
        }

        if (!rpcSuccess) {
          const { error: updateErr } = await supabase
            .from('registration_requests')
            .update({
              status: 'rejected',
              rejection_reason: reason,
            })
            .eq('id', id);

          if (updateErr) throw updateErr;
        }
      }

      setRecentRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'rejected', rejection_reason: reason } : r))
      );
      setStats((prev) => ({
        ...prev,
        pendingRequests: Math.max(0, prev.pendingRequests - 1),
        rejectedRequests: prev.rejectedRequests + 1,
      }));
    } catch (err: any) {
      alert('Rejection failed: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-slate-900 rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-900 rounded-2xl" />
          ))}
        </div>
        <div className="h-96 bg-slate-900 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 font-devanagari">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Realtime Administrative Control</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              नमस्ते, {adminProfile?.username || 'Administrator'} 👋
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              मारवाड़ी माली सैनी समाज डायरेक्टरी पंजीयन समीक्षा, सदस्यता स्वीकृति और पब्लिक डायरेक्टरी प्रबंधन केंद्र।
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/admin/registrations"
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center space-x-2 shrink-0"
            >
              <span>पंजीयन अनुरोध समीक्षा ({stats.pendingRequests})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Registrations */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Registrations</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">{stats.totalRegistrations.toLocaleString()}</p>
          <p className="text-[11px] text-slate-500 mt-1">कुल प्राप्त कुल पंजीयन आवेदन</p>
        </div>

        {/* Pending Requests */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Pending Requests</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-400 mt-3">{stats.pendingRequests.toLocaleString()}</p>
          <p className="text-[11px] text-slate-500 mt-1">समीक्षाधीन लंबित अनुरोध</p>
        </div>

        {/* Approved Members */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Approved Members</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-400 mt-3">{stats.approvedMembers.toLocaleString()}</p>
          <p className="text-[11px] text-slate-500 mt-1">स्वीकृत सदस्य (डायरेक्टरी लाइव)</p>
        </div>

        {/* Rejected Requests */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Rejected Requests</span>
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-rose-400 mt-3">{stats.rejectedRequests.toLocaleString()}</p>
          <p className="text-[11px] text-slate-500 mt-1">अस्वीकृत पंजीयन आवेदन</p>
        </div>
      </div>

      {/* Main Grid: Recent Registrations Queue + Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Registrations Queue (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">हालिया पंजीयन अनुरोध (Recent Requests)</h3>
              <p className="text-xs text-slate-400">नवीनतम आए हुए आवेदनों की त्वरित समीक्षा करें</p>
            </div>
            <Link
              to="/admin/registrations"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
            >
              <span>सभी देखें (View All)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-800/60">
            {recentRequests.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-sm">
                कोई पंजीयन अनुरोध नहीं मिला
              </div>
            ) : (
              recentRequests.map((req) => (
                <div key={req.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/30 px-2 rounded-xl transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-white">{req.full_name}</span>
                      <span className="text-xs text-slate-400">({req.gotra})</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          req.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : req.status === 'approved'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      📍 {req.current_city}, {req.state} | 💼 {req.occupation}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      📞 {req.phone} | मूल: {req.marwar_location}
                    </p>
                  </div>

                  {/* Actions */}
                  {req.status === 'pending' && (
                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => handleQuickApprove(req.id)}
                        disabled={actionLoading === req.id}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1 shadow transition-all disabled:opacity-50"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleQuickReject(req.id)}
                        disabled={actionLoading === req.id}
                        className="bg-slate-800 hover:bg-rose-600/30 hover:text-rose-400 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-all disabled:opacity-50"
                      >
                        <UserX className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activity Logs Stream (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
            <Activity className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">एडमिन एक्टिविटी लॉग्स</h3>
          </div>

          <div className="space-y-3">
            {recentLogs.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">कोई एक्टिविटी रिकॉर्ड नहीं है</p>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-amber-400">@{log.admin_username || 'admin'}</span>
                    <span className="text-slate-400">
                      {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-snug">{log.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
