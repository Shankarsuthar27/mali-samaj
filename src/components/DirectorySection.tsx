import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, Phone, UserCheck, Filter, Home, ArrowRight, User } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Profile } from '../types/admin';
import { isProfileDeleted } from '../lib/deletedProfiles';

export const DirectorySection: React.FC = () => {
  const [members, setMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedState, setSelectedState] = useState('All');

  useEffect(() => {
    fetchApprovedProfiles();
  }, []);

  const fetchApprovedProfiles = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('status', 'approved')
          .order('full_name');

        if (!error && data) {
          setMembers((data as Profile[]).filter((p) => !isProfileDeleted(p)));
          setLoading(false);
          return;
        }
      }

      // Fallback sample members
      const sample = [
        {
          id: '7',
          slug: 'dinesh-kumar-mali',
          full_name: 'दिनेश कुमार माली',
          gotra: 'माली',
          current_city: 'बैंगलोर',
          state: 'कर्नाटक',
          occupation: 'Pooja Beauty Center (Wholesale Business)',
          phone: '9535009850',
          address: 'Pooja Beauty Center # 184, Koramangala 8th Block, Bengaluru',
          profile_image: '/images/team/1.webp',
          marwar_location: 'सियाणा (जालौर)',
          company_name: 'Pooja Beauty Center',
          designation: 'Wholesale Business Owner',
          status: 'approved',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '8',
          slug: 'praveen-sundesa',
          full_name: 'प्रवीण सुंदेसा',
          gotra: 'सुंदेसा',
          current_city: 'सूरत',
          state: 'गुजरात',
          occupation: 'Shree Sundha Fabrics SSF (Garments)',
          phone: '8740008961',
          address: '452/53 Vijay Nagar, Archana Circle, Surat',
          profile_image: '/images/team/9.webp',
          marwar_location: 'जसवंतपुरा (जालौर)',
          company_name: 'Shree Sundha Fabrics',
          status: 'approved',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '10',
          slug: 'ca-ravi-parihar',
          full_name: 'CA रवि परिहार',
          gotra: 'परिहार',
          current_city: 'पुणे',
          state: 'महाराष्ट्र',
          occupation: 'RAVI PARIHAR & ASSOCIATES (Professional Services)',
          phone: '8239679374',
          address: 'D-601, PRIDE PLATINUM, BANER, PUNE',
          profile_image: '/images/team/10.webp',
          marwar_location: 'शिवगंज',
          company_name: 'RAVI PARIHAR & ASSOCIATES',
          designation: 'Chartered Accountant',
          status: 'approved',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '11',
          slug: 'bhanwar-sundesa',
          full_name: 'भंवर सुंदेसा',
          gotra: 'सुंदेसा',
          current_city: 'मुंबई',
          state: 'महाराष्ट्र',
          occupation: 'MAHADEV GRANITES (Marble & Tiles)',
          phone: '9869423239',
          address: 'W E Highway Airport Service Road, Vile Parle East, Mumbai',
          marwar_location: 'मुंबई',
          company_name: 'MAHADEV GRANITES',
          status: 'approved',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '12',
          slug: 'jagdish-kumar-gehlot',
          full_name: 'जगदीश कुमार गहलोत',
          gotra: 'गहलोत',
          current_city: 'पुणे',
          state: 'महाराष्ट्र',
          occupation: 'Hari Om Marbles',
          phone: '8237375050',
          address: 'Hadapsar, Pune, Maharashtra',
          marwar_location: 'शिवगंज (सिरोही)',
          company_name: 'Hari Om Marbles',
          status: 'approved',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ] as Profile[];

      setMembers(sample.filter((p) => !isProfileDeleted(p)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter((member) => {
    if (isProfileDeleted(member)) return false;

    const matchesSearch =
      member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.gotra.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.current_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.marwar_location && member.marwar_location.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCity = selectedCity === 'All' || member.current_city === selectedCity;
    const matchesState = selectedState === 'All' || member.state === selectedState;

    return matchesSearch && matchesCity && matchesState;
  });

  return (
    <section className="py-16 bg-slate-50 font-devanagari">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-orange-600 font-bold text-sm uppercase tracking-wider bg-orange-100 px-3.5 py-1 rounded-full">
            समाज बंधु खोजें (Approved Directory)
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 mb-4">
            मारवाड़ी माली सैनी प्रवासी डायरेक्टरी
          </h2>
          <p className="text-gray-650 text-base">
            देश भर में निवासरत अपने समाज बंधुओं से जुड़ें, व्यापारिक सहयोग बढ़ाएं और एक-दूसरे की मदद करें।
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-200 mb-10 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="नाम, गोत्र, व्यापार या शहर खोजें..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>

            {/* City Filter */}
            <div className="sm:col-span-3 relative">
              <Filter className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none appearance-none"
              >
                <option value="All">सभी शहर (All Cities)</option>
                <option value="अहमदाबाद">अहमदाबाद</option>
                <option value="मुंबई">मुंबई</option>
                <option value="सूरत">सूरत</option>
                <option value="बैंगलोर">बैंगलोर</option>
                <option value="जोधपुर">जोधपुर</option>
                <option value="पुणे">पुणे</option>
              </select>
            </div>

            {/* State Filter */}
            <div className="sm:col-span-3 relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none appearance-none"
              >
                <option value="All">सभी राज्य (All States)</option>
                <option value="गुजरात">गुजरात</option>
                <option value="महाराष्ट्र">महाराष्ट्र</option>
                <option value="राजस्थान">राजस्थान</option>
                <option value="कर्नाटक">कर्नाटक</option>
                <option value="तमिलनाडु">तमिलनाडु</option>
              </select>
            </div>

          </div>
        </div>

        {/* Member Cards Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-gray-500">स्वीकृत डायरेक्टरी डेटा लोड हो रहा है...</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow border border-gray-200">
            <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800">कोई स्वीकृत सदस्य नहीं मिला</h3>
            <p className="text-xs text-gray-500 mt-1">कृपया खोज शब्द या फिल्टर बदल कर पुनः प्रयास करें।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col justify-between relative overflow-hidden"
              >
                {/* Verification badge */}
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-green-50 px-2 py-0.5 rounded-full border border-green-150 shadow-xs">
                  <UserCheck className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-[10px] font-bold text-green-700">सत्यापित (Approved)</span>
                </div>

                <div className="space-y-4">
                  {/* Top Profile Image & Details */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-tr from-amber-100 to-orange-100 border-2 border-white shadow-md shrink-0 flex items-center justify-center text-orange-600 font-bold text-xl">
                      {member.profile_image ? (
                        <img src={member.profile_image} alt={member.full_name} className="w-full h-full object-cover" />
                      ) : (
                        <span>{member.full_name[0]}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-extrabold text-base text-gray-900 group-hover:text-orange-600 transition-colors truncate">
                        {member.full_name}
                      </h3>
                      <span className="inline-block bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[11px] font-semibold border border-amber-200 mt-1">
                        गोत्र: {member.gotra}
                      </span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                    <div className="flex items-start space-x-2">
                      <Briefcase className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                      <span className="font-semibold text-gray-800 line-clamp-2">{member.occupation}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>{member.current_city}, {member.state}</span>
                    </div>

                    {member.marwar_location && (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Home className="w-4 h-4 text-gray-400 shrink-0" />
                        <span>मूल निवास: {member.marwar_location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center space-x-1.5 text-xs font-bold text-green-600 hover:text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>कॉल करें</span>
                  </a>

                  <Link
                    to={`/directory/${member.slug || member.id}`}
                    className="flex items-center space-x-1 text-xs font-bold text-orange-600 hover:text-orange-700 hover:translate-x-1 transition-all"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
