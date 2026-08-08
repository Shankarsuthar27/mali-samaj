import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, UserCheck, ShieldOff, Eye, MapPin, Briefcase, Trash2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Profile } from '../../types/admin';
import { markProfileAsDeleted } from '../../lib/deletedProfiles';

export const AdminMembersPage: React.FC = () => {
  const [members, setMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchApprovedMembers();
  }, []);

  const fetchApprovedMembers = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('status', 'approved')
          .order('full_name');

        if (data) setMembers(data as Profile[]);
      } else {
        setMembers([
          {
            id: '1',
            slug: 'dinesh-kumar-mali',
            full_name: 'दिनेश कुमार माली',
            gotra: 'माली',
            marwar_location: 'सियाणा (जालौर)',
            current_city: 'बैंगलोर',
            state: 'कर्नाटक',
            occupation: 'Pooja Beauty Center (Wholesale)',
            phone: '9535009850',
            designation: 'Wholesale Business Owner',
            company_name: 'Pooja Beauty Center',
            status: 'approved',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            slug: 'kamlesh-solanki',
            full_name: 'CA कमलेश सोलंकी',
            gotra: 'सोलंकी',
            marwar_location: 'पाली',
            current_city: 'अहमदाबाद',
            state: 'गुजरात',
            occupation: 'के. सोलंकी एंड कंपनी (चार्टर्ड अकाउंटेंट)',
            phone: '9327058542',
            designation: 'Chartered Accountant',
            company_name: 'K. Solanki & Co.',
            status: 'approved',
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

  const handleDisableMember = async (member: Profile) => {
    if (!confirm(`क्या आप ${member.full_name} की प्रोफाइल डायरेक्टरी से हटाना/निष्क्रिय करना चाहते हैं?`)) return;

    try {
      markProfileAsDeleted([member.id, member.slug, member.phone]);
      if (isSupabaseConfigured()) {
        await supabase.from('profiles').update({ status: 'disabled' }).eq('id', member.id);
        if (member.phone) {
          await supabase.from('registration_requests').update({ status: 'rejected', rejection_reason: 'Admin disabled profile' }).eq('phone', member.phone);
        }
      }
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
      alert('सदस्यता निष्क्रिय कर दी गई है।');
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleDeleteMember = async (member: Profile) => {
    if (!confirm(`क्या आप निश्चित रूप से ${member.full_name} की प्रोफाइल डायरेक्टरी से स्थायी रूप से हटाना (Delete) चाहते हैं?`)) return;

    try {
      markProfileAsDeleted([member.id, member.slug, member.phone]);
      if (isSupabaseConfigured()) {
        await supabase.from('profiles').delete().eq('id', member.id);
        if (member.slug) {
          await supabase.from('profiles').delete().eq('slug', member.slug);
        }
        if (member.phone) {
          await supabase.from('registration_requests').delete().eq('phone', member.phone);
        }
      }
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
      alert(`${member.full_name} की प्रोफाइल सफलता पूर्वक हटा दी गई है।`);
    } catch (err: any) {
      alert('Delete Error: ' + err.message);
    }
  };

  const filteredMembers = members.filter(
    (m) =>
      m.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.current_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.gotra.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.occupation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-devanagari">
      <div>
        <h2 className="text-2xl font-extrabold text-white">स्वीकृत सदस्य (Approved Members)</h2>
        <p className="text-xs text-slate-400">पब्लिक डायरेक्टरी में प्रदर्शित लाइव सदस्यों की सूची</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="नाम, शहर, व्यवसाय खोजें..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
          />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs">लोड हो रहा है...</div>
        ) : filteredMembers.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">कोई स्वीकृत सदस्य नहीं मिला</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-bold">
                  <th className="py-3 px-4">सदस्य का नाम</th>
                  <th className="py-3 px-4">गोत्र</th>
                  <th className="py-3 px-4">वर्तमान शहर</th>
                  <th className="py-3 px-4">व्यापार / पेशा</th>
                  <th className="py-3 px-4">संपर्क (Phone)</th>
                  <th className="py-3 px-4 text-right">कार्रवाई</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center space-x-2">
                      <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{m.full_name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-amber-400 font-medium">{m.gotra}</td>
                    <td className="py-3.5 px-4 text-slate-300">📍 {m.current_city}, {m.state}</td>
                    <td className="py-3.5 px-4 text-slate-300">💼 {m.occupation}</td>
                    <td className="py-3.5 px-4 text-slate-300">📞 {m.phone}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/directory/${m.slug || m.id}`}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDisableMember(m)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-600 hover:text-white text-[11px] font-bold transition-colors"
                          title="Disable Profile"
                        >
                          <ShieldOff className="w-3.5 h-3.5 inline mr-1" />
                          <span>Disable</span>
                        </button>
                        <button
                          onClick={() => handleDeleteMember(m)}
                          className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white text-[11px] font-bold transition-colors"
                          title="Delete Profile"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline mr-1" />
                          <span>Delete</span>
                        </button>
                      </div>
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
