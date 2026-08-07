import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Phone, UserCheck, Filter, Home } from 'lucide-react';
import { DirectoryMember } from '../types';

export const DirectorySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  const sampleMembers: DirectoryMember[] = [
    {
      id: '7',
      name: 'दिनेश कुमार माली',
      gotra: 'माली',
      city: 'बैंगलोर',
      state: 'कर्नाटक',
      business: 'Pooja Beauty Center (Wholesale Business)',
      phone: '95350 09850',
      address: 'Pooja Beauty Center # 184, 2nd C, Main Road, Koramangala 8th Block , Bengaluru-560095',
      photo: '/images/team/1.webp',
      nativePlace: 'Siyana Jalore',
    },
    {
      id: '8',
      name: 'प्रवीण सुंदेसा',
      gotra: 'सुंदेसा',
      city: 'सूरत',
      state: 'गुजरात',
      business: 'Shree sundha fabrics SSF (Clothing / Garments)',
      phone: '87400 08961',
       address: '452/53vijay nagar Indian petrol pump imata road archana circle surat',
      photo: '/images/team/9.webp',
      nativePlace: 'Jaswant pura (jalore)',
    },
    {
      id: '9',
      name: 'राम',
      gotra: 'टेस्ट',
      city: 'टेस्ट',
      state: 'राजस्थान',
      business: 'ram (Medical / Pharmacy)',
      address:'',
      phone: '777794700',
      nativePlace: 'जालौर',
    },
    {
      id: '10',
      name: 'CA रवि परिहार',
      gotra: 'परिहार',
      city: 'पुणे',
      state: 'महाराष्ट्र',
      business: 'RAVI PARIHAR & ASSOCIATES (Freelancer / Professional Services)',
      address: 'D-601, PRIDE PLATINUM, BANER, PAN CARD CLUB ROAD, PUNE -411016',
      phone: '8239679374',
      photo: '/images/team/10.webp',
      nativePlace: 'शिवगंज',
    },
    {
      id: '11',
      name: 'भंवर सुंदेसा',
      gotra: 'सुंदेसा',
      city: 'मुंबई',
      state: 'महाराष्ट्र',
      business: 'MAHADEV GRANITES (Cement / Marble / Tiles)',
      address: 'W E HIGHWAY AIRPORT SIND SERVICE ROAD MARBLE MARKET SUBHASH NAGAR VILE- PARLE EAST',
      phone: '98694 23239',
      nativePlace: 'मुंबई',
    },
    {
      id: '12',
      name: 'जगदीश कुमार गहलोत',
      gotra: 'गहलोत',
      city: 'पुणे',
      state: 'महाराष्ट्र',
      business: 'Hari Om Marbles (Cement / Marble / Tiles)',
      address: 'Survey No, 152/A, Pune - Solapur Rd, opposite Shankar Math, Hadapsar, Pune, Maharashtra',
      phone: '8237375050',
      nativePlace: 'शिवगंज (सिरोही)',
    },
    {
      id: '13',
      name: 'लीलाराम माली',
      gotra: 'माली',
      city: 'पोसिन्दरा',
      state: 'राजस्थान',
      business: 'Magajiali (Mobile & Accessories)',
      address: 'मु. पोसिंतरा, पोस्ट मेरमाण्डवाडा, तहसील सिरोही, जिला सिरोही',
      phone: '9772317811',
      nativePlace: 'गांव पोसिन्दरा',
    },
    {
      id: '14',
      name: 'सुरेश माली',
      gotra: 'माली',
      city: 'चेन्नई',
      state: 'तमिलनाडु',
      business: 'S.m mobile spare parts (Mobile & Accessories)',
      address: 'Chennai Mount Road, Chennai',
      phone: '9840666304',
      nativePlace: 'खरुआ मोरसीम',
    },
    {
      id: '15',
      name: 'ओमाराम माली',
      gotra: 'माली',
      city: 'बैंगलोर',
      state: 'कर्नाटक',
      business: 'Devi sales (Construction Material / Hardware)',
      address: 'No 7, 8th Main Road, Sampangiram Nagar, Bengaluru - 560027',
      phone: '8618203411',
      nativePlace: 'जालौर',
    },
    {
      id: '16',
      name: 'मुकेश माली',
      gotra: 'माली',
      city: 'हैदराबाद',
      state: 'तेलंगाना',
      business: 'Karishma fancy (Jewellery)',
      address: 'Pathanwadi, Fatehpura Plaza, Begum Bazar, Hyderabad',
      phone: '9509388807',
      nativePlace: 'हैदराबाद',
    },
  ];

  const filteredMembers = sampleMembers.filter((member) => {
    const matchesSearch =
      member.name.includes(searchTerm) ||
      member.gotra.includes(searchTerm) ||
      member.business.includes(searchTerm) ||
      member.city.includes(searchTerm);

    const matchesCity = selectedCity === 'All' || member.city === selectedCity;

    return matchesSearch && matchesCity;
  });

  return (
    <section className="py-16 bg-slate-50 font-devanagari">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-orange-600 font-bold text-sm uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
            समाज बंधु खोजें
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 mb-4">
            मारवाड़ी माली सैनी प्रवासी डायरेक्टरी
          </h2>
          <p className="text-gray-650 text-base">
            देश भर में निवासरत अपने समाज बंधुओं से जुड़ें, व्यापारिक सहयोग बढ़ाएं और एक-दूसरे की मदद करें।
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-200 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="sm:col-span-8 relative">
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
            <div className="sm:col-span-4 relative">
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

          </div>
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-305 border border-gray-100 group flex flex-col justify-between relative overflow-hidden"
            >
              {/* Verification badge in top right corner */}
              <div className="absolute top-4 right-4 flex items-center space-x-1 bg-green-50 px-2 py-0.5 rounded-full border border-green-150">
                <UserCheck className="w-3.5 h-3.5 text-green-600" />
                <span className="text-[10px] text-green-700">सत्यापित</span>
              </div>

              <div>
                {/* Centered big photo section */}
                <div className="flex flex-col items-center mb-5 mt-2">
                  {member.photo ? (
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-orange-500 shadow-md shrink-0 transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-orange-100 border-4 border-orange-500 flex items-center justify-center text-orange-700 font-medium text-4xl shadow-md shrink-0">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <h3 className="font-medium text-gray-955 text-lg sm:text-xl mt-3 text-center group-hover:text-orange-600 transition-colors">
                    {member.name}
                  </h3>
                  <span className="inline-block bg-amber-100 text-amber-900 text-xs px-3 py-1 rounded-full mt-1.5 shadow-sm">
                    गोत्र: {member.gotra}
                  </span>
                </div>

                {/* Details layout */}
                <div className="space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4">
                  <div className="flex items-start space-x-2.5">
                    <Briefcase className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span className="font-medium text-gray-800">{member.business}</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span className="font-medium text-gray-800">{member.city}, {member.state}</span>
                  </div>
                  {member.nativePlace && (
                    <div className="flex items-start space-x-2.5">
                      <Home className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <span className="font-medium text-gray-800">गृह स्थान: {member.nativePlace}</span>
                    </div>
                  )}
                  {member.address && (
                    <div className="flex items-start space-x-2 text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-150 mt-2">
                      <span className="font-medium text-gray-700 shrink-0">पता:</span>
                      <span className="leading-relaxed">{member.address}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <a
                  href={`tel:${member.phone.replace(/\s/g, '')}`}
                  className="flex items-center space-x-2 text-xs font-medium text-white bg-btnGreen hover:bg-btnGreenHover hover:shadow-md px-4 py-2 rounded-xl transition-all duration-200"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{member.phone}</span>
                </a>
                <span className="text-[10px] text-gray-400">सत्यापित सदस्य</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
