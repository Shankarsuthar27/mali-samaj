import React, { useEffect, useState } from 'react';
import { UserX, Search, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { RegistrationRequest } from '../../types/admin';

export const AdminRejectedPage: React.FC = () => {
  const [rejectedRequests, setRejectedRequests] = useState<RegistrationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRejected();
  }, []);

  const fetchRejected = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const { data } = await supabase
          .from('registration_requests')
          .select('*')
          .eq('status', 'rejected')
          .order('reviewed_at', { ascending: false });

        if (data) setRejectedRequests(data as RegistrationRequest[]);
      } else {
        setRejectedRequests([
          {
            id: 'req-4',
            full_name: 'विक्रम भाटी',
            father_name: 'सुरेश जी',
            gotra: 'भाटी',
            marwar_location: 'जोधपुर',
            current_city: 'मुंबई',
            state: 'महाराष्ट्र',
            occupation: 'होटल व्यवसाय',
            phone: '9820011223',
            status: 'rejected',
            rejection_reason: 'अधूरी पिता का नाम व संपर्क जानकारी',
            submitted_at: new Date(Date.now() - 172800000).toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = rejectedRequests.filter(
    (r) =>
      r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.current_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6 font-devanagari">
      <div>
        <h2 className="text-2xl font-extrabold text-white">अस्वीकृत अनुरोध इतिहास (Rejected Requests Archive)</h2>
        <p className="text-xs text-slate-400">अस्वीकृत किए गए आवेदनों का पूर्ण रिकॉर्ड एवं कारण</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="नाम, शहर, मोबाइल खोजें..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-rose-500"
          />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs">लोड हो रहा है...</div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">कोई भी अस्वीकृत आवेदन नहीं मिला</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-bold">
                  <th className="py-3 px-4">नाम / गोत्र</th>
                  <th className="py-3 px-4">शहर / राज्य</th>
                  <th className="py-3 px-4">मोबाइल</th>
                  <th className="py-3 px-4">अस्वीकृति का कारण (Reason)</th>
                  <th className="py-3 px-4">समीक्षा तिथि</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center space-x-2">
                      <UserX className="w-4 h-4 text-rose-400 shrink-0" />
                      <div>
                        <span>{r.full_name}</span>
                        <span className="text-[10px] text-amber-400 font-normal block">({r.gotra})</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">📍 {r.current_city}, {r.state}</td>
                    <td className="py-3.5 px-4 text-slate-300">📞 {r.phone}</td>
                    <td className="py-3.5 px-4 text-rose-300 font-medium">
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{r.rejection_reason || 'कारण निर्दिष्ट नहीं'}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {r.reviewed_at ? new Date(r.reviewed_at).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
