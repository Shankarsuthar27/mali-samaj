import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, Phone, Mail, Home, ArrowLeft, UserCheck, Share2, ShieldCheck, Globe, Trash2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Profile } from '../types/admin';
import { useAdminAuth } from '../context/AdminAuthContext';
import { markProfileAsDeleted } from '../lib/deletedProfiles';

export const DirectoryProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAdminAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [slug]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured() && slug) {
        // First try querying by slug
        let { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'approved')
          .maybeSingle();

        // If not found by slug and slug looks like a valid UUID, try querying by id
        const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(slug);
        if (!data && isUuid) {
          const { data: dataById } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', slug)
            .eq('status', 'approved')
            .maybeSingle();
          data = dataById;
        }

        if (data) {
          setProfile(data as Profile);
          setLoading(false);
          return;
        }
      }

      // Sample fallback profiles matching requested slug/id
      const sampleProfiles: Profile[] = [
        {
          id: '7',
          slug: 'dinesh-kumar-mali',
          full_name: 'दिनेश कुमार माली',
          father_name: 'रामलाल जी माली',
          gotra: 'माली',
          marwar_location: 'सियाणा (जालौर)',
          current_city: 'बैंगलोर',
          state: 'कर्नाटक',
          country: 'भारत',
          occupation: 'Pooja Beauty Center (Wholesale Business)',
          phone: '9535009850',
          email: 'dinesh@poojabeauty.com',
          address: 'Pooja Beauty Center # 184, 2nd C Main Road, Koramangala 8th Block, Bengaluru-560095',
          profile_image: '/images/team/1.webp',
          designation: 'Wholesale Business Owner',
          company_name: 'Pooja Beauty Center',
          category: 'व्यापार / व्यवसाय',
          bio: 'मारवाड़ी माली सैनी प्रवासी समाज डायरेक्टरी के वरिष्ठ पंजीकृत व्यवसायी। पूजा ब्यूटी सेंटर बैंगलोर के संस्थापक एवं संचालक।',
          status: 'approved',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '8',
          slug: 'praveen-sundesa',
          full_name: 'प्रवीण सुंदेसा',
          father_name: 'शांतिलाल जी सुंदेसा',
          gotra: 'सुंदेसा',
          marwar_location: 'जसवंतपुरा (जालौर)',
          current_city: 'सूरत',
          state: 'गुजरात',
          country: 'भारत',
          occupation: 'Shree Sundha Fabrics SSF (Garments)',
          phone: '8740008961',
          address: '452/53 Vijay Nagar, Archana Circle, Surat',
          profile_image: '/images/team/9.webp',
          company_name: 'Shree Sundha Fabrics',
          category: 'व्यापार / व्यवसाय',
          status: 'approved',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      const match = sampleProfiles.find((p) => p.slug === slug || p.id === slug);
      setProfile(match || null);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (!profile) return;
    if (!confirm(`क्या आप निश्चित रूप से ${profile.full_name} की प्रोफाइल डायरेक्टरी से स्थायी रूप से हटाना (Delete) चाहते हैं?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      markProfileAsDeleted([profile.id, profile.slug, profile.phone]);
      if (isSupabaseConfigured()) {
        await supabase.from('profiles').delete().eq('id', profile.id);
        if (profile.slug) {
          await supabase.from('profiles').delete().eq('slug', profile.slug);
        }
        if (profile.phone) {
          await supabase.from('registration_requests').delete().eq('phone', profile.phone);
        }
      }

      alert(`${profile.full_name} की प्रोफाइल सफलता पूर्वक हटा दी गई है।`);
      navigate('/directory');
    } catch (err: any) {
      alert('Delete Error: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center space-y-4 font-devanagari">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-gray-500">प्रोफाइल लोड हो रही है...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-20 text-center space-y-4 font-devanagari max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800">प्रोफाइल नहीं मिली</h2>
        <p className="text-xs text-gray-500">
          यह सदस्य प्रोफाइल उपलब्ध नहीं है अथवा हटा दी गई है।
        </p>
        <Link
          to="/directory"
          className="inline-flex items-center space-x-2 bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>डायरेक्टरी सूची पर लौटें</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 font-devanagari min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Back Link & Admin Delete Bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/directory"
            className="inline-flex items-center space-x-2 text-xs font-bold text-orange-600 hover:text-orange-700 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>डायरेक्टरी में वापस जाएं</span>
          </Link>

          {/* Delete Profile Button */}
          <button
            onClick={handleDeleteProfile}
            disabled={isDeleting}
            className="inline-flex items-center space-x-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition-all disabled:opacity-50"
            title="Delete Profile"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isDeleting ? 'हटाया जा रहा है...' : 'प्रोफाइल हटाएं (Delete)'}</span>
          </button>
        </div>

        {/* Profile Card Main */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          
          {/* Header Banner */}
          <div className="bg-mandala-pattern bg-[#1b75bc] h-36 relative p-6 flex items-end justify-between border-b border-blue-400/30">
            <div className="flex items-center space-x-2 bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow backdrop-blur-sm">
              <UserCheck className="w-4 h-4" />
              <span>सत्यापित डायरेक्टरी सदस्य (Approved Member)</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 relative">
            
            {/* Avatar & Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 -mt-20 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white p-1.5 shadow-2xl border-2 border-orange-200 overflow-hidden shrink-0">
                  {profile.profile_image ? (
                    <img src={profile.profile_image} alt={profile.full_name} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <div className="w-full h-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-3xl rounded-2xl">
                      {profile.full_name[0]}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-900">{profile.full_name}</h1>
                  <p className="text-sm font-semibold text-orange-600">
                    {profile.designation || profile.occupation}
                  </p>
                  <p className="text-xs text-gray-500">
                    पिता: <strong>{profile.father_name || 'N/A'}</strong> | गोत्र: <strong className="text-amber-700">{profile.gotra}</strong>
                  </p>
                </div>
              </div>

              {/* Call Action Button */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                <a
                  href={`tel:${profile.phone}`}
                  className="bg-btnGreen hover:bg-btnGreenHover text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>संपर्क करें ({profile.phone})</span>
                </a>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-150">
              
              {/* Left Details */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">
                  व्यक्तिगत एवं व्यापारिक विवरण
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start space-x-3">
                    <Briefcase className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-500 block">व्यापार / संस्थान:</span>
                      <span className="font-bold text-gray-800 text-sm">{profile.company_name || profile.occupation}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-500 block">वर्तमान प्रवास स्थान:</span>
                      <span className="font-bold text-gray-800">{profile.current_city}, {profile.state} ({profile.country || 'भारत'})</span>
                    </div>
                  </div>

                  {profile.marwar_location && (
                    <div className="flex items-start space-x-3">
                      <Home className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-500 block">मूल निवास (मारवाड़ स्थान):</span>
                        <span className="font-bold text-gray-800">{profile.marwar_location}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Contact & Bio */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">
                  संपर्क एवं पता
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start space-x-3">
                    <Phone className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-500 block">व्हाट्सएप / फोन:</span>
                      <span className="font-bold text-gray-900">{profile.phone}</span>
                    </div>
                  </div>

                  {profile.email && (
                    <div className="flex items-start space-x-3">
                      <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-500 block">ईमेल:</span>
                        <span className="font-bold text-gray-900">{profile.email}</span>
                      </div>
                    </div>
                  )}

                  {profile.address && (
                    <div className="flex items-start space-x-3">
                      <Globe className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-500 block">पूरा पता:</span>
                        <span className="font-medium text-gray-800 leading-relaxed">{profile.address}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Bio Section */}
            {profile.bio && (
              <div className="mt-6 pt-6 border-t border-gray-150">
                <h3 className="text-sm font-bold text-gray-900 mb-2">परिचय (About)</h3>
                <p className="text-xs sm:text-sm text-gray-650 leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                  {profile.bio}
                </p>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="bg-slate-100 px-6 py-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <span>पंजीकृत दिनांक: {new Date(profile.created_at).toLocaleDateString()}</span>
            <div className="flex items-center space-x-1 text-emerald-700 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>सत्यापित समाज डायरेक्टरी प्रोफाइल</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
