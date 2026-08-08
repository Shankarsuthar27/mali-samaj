import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  Eye, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Briefcase
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { RegistrationRequest } from '../../types/admin';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminRegistrationsPage: React.FC = () => {
  const { adminProfile } = useAdminAuth();
  const [requests, setRequests] = useState<RegistrationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals
  const [selectedRequest, setSelectedRequest] = useState<RegistrationRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase
          .from('registration_requests')
          .select('*')
          .order('submitted_at', { ascending: false });

        if (error) throw error;
        if (data) setRequests(data as RegistrationRequest[]);
      } else {
        // Fallback sample data
        setRequests([
          {
            id: '1',
            full_name: 'रामेश्वर लाल माली',
            father_name: 'मोहनलाल जी',
            gotra: 'पंवार',
            marwar_location: 'सोजत (पाली)',
            current_city: 'अहमदाबाद',
            state: 'गुजरात',
            occupation: 'टेक्सटाइल व्यापार',
            phone: '9876543210',
            email: 'rameshwar@gmail.com',
            status: 'pending',
            submitted_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            full_name: 'दिनेश कुमार सुंदेसा',
            father_name: 'पारसमल जी',
            gotra: 'सुंदेसा',
            marwar_location: 'जालौर',
            current_city: 'बैंगलोर',
            state: 'कर्नाटक',
            occupation: 'Pooja Beauty Center',
            phone: '9535009850',
            email: 'dinesh@gmail.com',
            status: 'pending',
            submitted_at: new Date(Date.now() - 3600000).toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            full_name: 'CA कमलेश सोलंकी',
            father_name: 'गहलोत जी',
            gotra: 'सोलंकी',
            marwar_location: 'पाली',
            current_city: 'अहमदाबाद',
            state: 'गुजरात',
            occupation: 'के. सोलंकी एंड कंपनी (चार्टर्ड अकाउंटेंट)',
            phone: '9327058542',
            email: 'kamlesh@solankica.com',
            status: 'approved',
            submitted_at: new Date(Date.now() - 86400000).toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '4',
            full_name: 'विक्रम भाटी',
            father_name: 'सुरेश जी',
            gotra: 'भाटी',
            marwar_location: 'जोधपुर',
            current_city: 'मुंबई',
            state: 'महाराष्ट्र',
            occupation: 'होटल व्यवसाय',
            phone: '9820011223',
            email: 'vikram@mumbaihotel.com',
            status: 'rejected',
            rejection_reason: 'अधूरी पिता का नाम व संपर्क जानकारी',
            submitted_at: new Date(Date.now() - 172800000).toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (err: any) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Approval Action
  const handleConfirmApprove = async () => {
    if (!selectedRequest) return;
    setActionLoading(true);

    try {
      if (isSupabaseConfigured()) {
        let rpcSuccess = false;
        try {
          const { error } = await supabase.rpc('approve_registration_request', {
            p_request_id: selectedRequest.id,
            p_admin_id: adminProfile?.user_id || '00000000-0000-0000-0000-000000000001',
          });
          if (!error) rpcSuccess = true;
        } catch (e) {
          rpcSuccess = false;
        }

        // Direct table fallback if RPC is not present in Supabase schema cache
        if (!rpcSuccess) {
          const baseSlug = (selectedRequest.full_name || 'member')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
          const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;

          // 1. Insert profile
          await supabase.from('profiles').insert({
            slug,
            full_name: selectedRequest.full_name,
            father_name: selectedRequest.father_name,
            gotra: selectedRequest.gotra,
            marwar_location: selectedRequest.marwar_location,
            current_city: selectedRequest.current_city,
            state: selectedRequest.state,
            occupation: selectedRequest.occupation,
            phone: selectedRequest.phone,
            email: selectedRequest.email || null,
            profile_image: selectedRequest.profile_image || null,
            company_name: selectedRequest.occupation,
            status: 'approved',
          });

          // 2. Update request status
          const { error: updateErr } = await supabase
            .from('registration_requests')
            .update({
              status: 'approved',
            })
            .eq('id', selectedRequest.id);

          if (updateErr) throw updateErr;
        }
      }

      setRequests((prev) =>
        prev.map((r) =>
          r.id === selectedRequest.id ? { ...r, status: 'approved' } : r
        )
      );

      setShowApproveModal(false);
      setShowDetailModal(false);
      alert(`स्वीकृति सफल! ${selectedRequest.full_name} की जानकारी डायरेक्टरी में लाइव हो गई है।`);
    } catch (err: any) {
      alert('Approval Error: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Rejection Action
  const handleConfirmReject = async () => {
    if (!selectedRequest) return;
    if (!rejectionReason.trim()) {
      alert('कृपया अस्वीकृति का कारण दर्ज करें!');
      return;
    }
    setActionLoading(true);

    try {
      if (isSupabaseConfigured()) {
        let rpcSuccess = false;
        try {
          const { error } = await supabase.rpc('reject_registration_request', {
            p_request_id: selectedRequest.id,
            p_reason: rejectionReason,
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
              rejection_reason: rejectionReason,
            })
            .eq('id', selectedRequest.id);

          if (updateErr) throw updateErr;
        }
      }

      setRequests((prev) =>
        prev.map((r) =>
          r.id === selectedRequest.id
            ? { ...r, status: 'rejected', rejection_reason: rejectionReason }
            : r
        )
      );

      setShowRejectModal(false);
      setShowDetailModal(false);
      setRejectionReason('');
      alert(`आवेदन अस्वीकृत किया गया।`);
    } catch (err: any) {
      alert('Rejection Error: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Filtering Logic
  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.gotra.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.current_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesState = stateFilter === 'all' || r.state === stateFilter;

    return matchesSearch && matchesStatus && matchesState;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage) || 1;
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 font-devanagari">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">पंजीयन अनुरोध (Registration Requests)</h2>
          <p className="text-xs text-slate-400">सभी प्राप्त पंजीयन आवेदनों की समीक्षा करें एवं स्वीकृत / अस्वीकृत करें</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="नाम, गोत्र, मोबाइल या शहर खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value="all">सभी स्टेटस (All Status)</option>
              <option value="pending">लंबित (Pending Only)</option>
              <option value="approved">स्वीकृत (Approved Only)</option>
              <option value="rejected">अस्वीकृत (Rejected Only)</option>
            </select>
          </div>

          {/* State Filter */}
          <div className="sm:col-span-3">
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value="all">सभी राज्य (All States)</option>
              <option value="गुजरात">गुजरात</option>
              <option value="महाराष्ट्र">महाराष्ट्र</option>
              <option value="राजस्थान">राजस्थान</option>
              <option value="कर्नाटक">कर्नाटक</option>
              <option value="तमिलनाडु">तमिलनाडु</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-16 text-center text-slate-400 space-y-3">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs">डेटा लोड हो रहा है...</p>
          </div>
        ) : paginatedRequests.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            कोई पंजीयन अनुरोध नहीं मिला
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-bold">
                  <th className="py-3.5 px-4">नाम / गोत्र</th>
                  <th className="py-3.5 px-4">संपर्क (Mobile/Email)</th>
                  <th className="py-3.5 px-4">वर्तमान स्थान</th>
                  <th className="py-3.5 px-4">व्यापार / पेशा</th>
                  <th className="py-3.5 px-4">दिनांक</th>
                  <th className="py-3.5 px-4">स्टेटस</th>
                  <th className="py-3.5 px-4 text-right">कार्रवाई</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {paginatedRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div className="flex items-center space-x-2">
                        <span>{req.full_name}</span>
                        <span className="text-[11px] text-amber-400 font-normal">({req.gotra})</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal block">पिता: {req.father_name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <div>📞 {req.phone}</div>
                      {req.email && <div className="text-[11px] text-slate-400">✉️ {req.email}</div>}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <div>📍 {req.current_city}, {req.state}</div>
                      <div className="text-[10px] text-slate-400">मूल: {req.marwar_location}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      💼 {req.occupation}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(req.submitted_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          req.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : req.status === 'approved'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {req.status === 'pending' && <Clock className="w-3 h-3" />}
                        {req.status === 'approved' && <CheckCircle2 className="w-3 h-3" />}
                        {req.status === 'rejected' && <X className="w-3 h-3" />}
                        <span>{req.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {/* View Details */}
                        <button
                          onClick={() => {
                            setSelectedRequest(req);
                            setShowDetailModal(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {req.status === 'pending' && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedRequest(req);
                                setShowApproveModal(true);
                              }}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold shadow flex items-center space-x-1 transition-colors"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>Accept</span>
                            </button>

                            <button
                              onClick={() => {
                                setSelectedRequest(req);
                                setShowRejectModal(true);
                              }}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-rose-600/30 hover:text-rose-400 border border-slate-700 text-slate-300 rounded-lg text-[11px] font-bold flex items-center space-x-1 transition-colors"
                            >
                              <UserX className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length}
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-white">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl space-y-4">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">पंजीयन आवेदन विवरण (Registration Details)</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-slate-400 block">पूरा नाम:</span>
                  <span className="font-bold text-white text-sm">{selectedRequest.full_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">पिता / पति का नाम:</span>
                  <span className="font-bold text-white text-sm">{selectedRequest.father_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">गोत्र:</span>
                  <span className="font-bold text-amber-400">{selectedRequest.gotra}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">मूल निवास (मारवाड़):</span>
                  <span className="font-bold text-white">{selectedRequest.marwar_location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">वर्तमान शहर:</span>
                  <span className="font-bold text-white">{selectedRequest.current_city}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">वर्तमान राज्य:</span>
                  <span className="font-bold text-white">{selectedRequest.state}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">व्यापार / पेशा:</span>
                  <span className="font-bold text-white">{selectedRequest.occupation}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">व्हाट्सएप मोबाइल:</span>
                  <span className="font-bold text-white">{selectedRequest.phone}</span>
                </div>
              </div>

              {selectedRequest.rejection_reason && (
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-rose-300">
                  <span className="font-bold block">अस्वीकृति का कारण (Rejection Reason):</span>
                  <p>{selectedRequest.rejection_reason}</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Status: <strong className="uppercase text-white">{selectedRequest.status}</strong>
              </span>

              {selectedRequest.status === 'pending' && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowApproveModal(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Approve Registration</span>
                  </button>
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white border border-rose-500/30 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1"
                  >
                    <UserX className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* APPROVE CONFIRMATION MODAL */}
      {showApproveModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl mx-auto flex items-center justify-center">
              <UserCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">पंजीयन स्वीकृति की पुष्टि करें</h3>
            <p className="text-xs text-slate-300">
              क्या आप निश्चित रूप से <strong>{selectedRequest.full_name}</strong> का पंजीयन स्वीकार करना चाहते हैं?
              स्वीकृति के बाद यह जानकारी सार्वजनिक डायरेक्टरी में दिखाई देने लगेगी।
            </p>
            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                onClick={() => setShowApproveModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold"
              >
                रद्द करें (Cancel)
              </button>
              <button
                onClick={handleConfirmApprove}
                disabled={actionLoading}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1 shadow-lg shadow-emerald-600/30"
              >
                {actionLoading ? 'स्वीकार हो रहा है...' : 'हां, स्वीकार करें (Approve)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL WITH REASON */}
      {showRejectModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-rose-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-lg font-bold text-white">आवेदन अस्वीकार करें (Reject Request)</h3>
            </div>
            <p className="text-xs text-slate-300">
              <strong>{selectedRequest.full_name}</strong> का आवेदन अस्वीकृत करने का कारण दर्ज करें:
            </p>
            <textarea
              rows={3}
              placeholder="उदा. अधूरी जानकारी / अमान्य मोबाइल नंबर..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
            />
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold"
              >
                रद्द करें (Cancel)
              </button>
              <button
                onClick={handleConfirmReject}
                disabled={actionLoading}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30"
              >
                {actionLoading ? 'अस्वीकृत हो रहा है...' : 'अस्वीकार करें (Confirm Reject)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
