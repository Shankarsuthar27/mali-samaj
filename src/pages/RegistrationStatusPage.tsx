import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, CheckCircle2, XCircle, ArrowRight, User, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { RegistrationRequest } from '../types/admin';

export const RegistrationStatusPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [request, setRequest] = useState<RegistrationRequest | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearched(true);
    setRequest(null);

    try {
      if (isSupabaseConfigured()) {
        const { data } = await supabase
          .from('registration_requests')
          .select('*')
          .or(`phone.eq.${searchQuery},email.eq.${searchQuery}`)
          .order('submitted_at', { ascending: false })
          .limit(1);

        if (data && data.length > 0) {
          setRequest(data[0] as RegistrationRequest);
        }
      } else {
        // Sample fallback response for demonstration
        if (searchQuery === '9876543210') {
          setRequest({
            id: 'req-1',
            full_name: 'रामेश्वर लाल माली',
            father_name: 'मोहनलाल जी',
            gotra: 'पंवार',
            marwar_location: 'सोजत (पाली)',
            current_city: 'अहमदाबाद',
            state: 'गुजरात',
            occupation: 'टेक्सटाइल व्यापार',
            phone: '9876543210',
            status: 'pending',
            submitted_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto font-devanagari">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-orange-600 font-bold text-xs uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
          सदस्यता स्थिति ट्रैक करें
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          पंजीयन आवेदन स्थिति (Registration Status)
        </h1>
        <p className="text-gray-600 text-sm max-w-lg mx-auto">
          अपना पंजीकृत मोबाइल नंबर दर्ज करके अपने डायरेक्टरी पंजीयन आवेदन की वर्तमान स्थिति जांचें।
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-200 mb-10">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="पंजीकृत व्हाट्सएप नंबर या ईमेल दर्ज करें (उदा. 9876543210)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-navOrange hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50"
          >
            {loading ? <span>खोज जारी है...</span> : <span>स्थिति जांचें (Search Status)</span>}
          </button>
        </form>
      </div>

      {/* Search Result Display */}
      {searched && (
        <div className="animate-fadeIn">
          {request ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 space-y-8">
              {/* Profile Card Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-150">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl shadow-inner">
                    {request.full_name[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{request.full_name}</h3>
                    <p className="text-xs text-gray-500">
                      गोत्र: <strong>{request.gotra}</strong> | शहर: <strong>{request.current_city}</strong> ({request.state})
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <span
                    className={`inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      request.status === 'pending'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : request.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {request.status === 'pending' && <Clock className="w-4 h-4 text-amber-600" />}
                    {request.status === 'approved' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {request.status === 'rejected' && <XCircle className="w-4 h-4 text-rose-600" />}
                    <span>{request.status}</span>
                  </span>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-900">प्रगति स्थिति (Workflow Timeline)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  {/* Step 1 */}
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-1">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                    <h5 className="font-bold text-xs text-emerald-900">1. पंजीकरण जमा हुआ</h5>
                    <p className="text-[11px] text-emerald-700">
                      {new Date(request.submitted_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div
                    className={`p-4 rounded-2xl space-y-1 border ${
                      request.status === 'pending'
                        ? 'bg-amber-50 border-amber-200'
                        : request.status === 'approved' || request.status === 'rejected'
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <Clock
                      className={`w-6 h-6 mx-auto ${
                        request.status === 'pending' ? 'text-amber-600 animate-spin' : 'text-emerald-600'
                      }`}
                    />
                    <h5 className="font-bold text-xs text-gray-900">2. एडमिन समीक्षा (Under Review)</h5>
                    <p className="text-[11px] text-gray-600">
                      {request.status === 'pending' ? 'समीक्षाधीन है...' : 'समीक्षा पूर्ण'}
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div
                    className={`p-4 rounded-2xl space-y-1 border ${
                      request.status === 'approved'
                        ? 'bg-emerald-50 border-emerald-300'
                        : request.status === 'rejected'
                        ? 'bg-rose-50 border-rose-300'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    {request.status === 'approved' ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                    ) : request.status === 'rejected' ? (
                      <XCircle className="w-6 h-6 text-rose-600 mx-auto" />
                    ) : (
                      <Clock className="w-6 h-6 text-gray-400 mx-auto" />
                    )}
                    <h5 className="font-bold text-xs text-gray-900">
                      {request.status === 'approved'
                        ? '3. स्वीकृत (Approved)'
                        : request.status === 'rejected'
                        ? '3. अस्वीकृत (Rejected)'
                        : '3. अंतिम निर्णय'}
                    </h5>
                    <p className="text-[11px] text-gray-600">
                      {request.status === 'approved'
                        ? 'डायरेक्टरी में लाइव'
                        : request.status === 'rejected'
                        ? 'आवेदन अस्वीकृत'
                        : 'प्रतीक्षारत'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Banner Based on Status */}
              {request.status === 'approved' && (
                <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h5 className="font-bold text-emerald-900 text-sm">बधाई हो! आपका पंजीकरण स्वीकृत हो चुका है।</h5>
                    <p className="text-xs text-emerald-700">आपकी प्रोफाइल अब मारवाड़ी माली सैनी समाज डायरेक्टरी में लाइव है।</p>
                  </div>
                  <Link
                    to="/directory"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-colors flex items-center space-x-1 shrink-0"
                  >
                    <span>डायरेक्टरी में प्रोफाइल देखें</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {request.status === 'rejected' && (
                <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl space-y-2">
                  <h5 className="font-bold text-rose-900 text-sm flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>आपका आवेदन अस्वीकृत किया गया है।</span>
                  </h5>
                  {request.rejection_reason && (
                    <p className="text-xs text-rose-800 bg-white/80 p-3 rounded-xl border border-rose-200">
                      <strong>कारण:</strong> {request.rejection_reason}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-200 space-y-4">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto" />
              <h4 className="text-lg font-bold text-gray-900">कोई रिकॉर्ड नहीं मिला</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                प्रविष्ट व्हाट्सएप नंबर <strong>{searchQuery}</strong> से कोई भी पंजीयन रिकॉर्ड नहीं पाया गया। कृपया नंबर पुनः जांचें।
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
