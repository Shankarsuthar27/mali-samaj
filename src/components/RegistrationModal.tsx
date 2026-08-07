import React, { useState } from 'react';
import { X, UserPlus, CheckCircle, Upload } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    gotra: '',
    marwarLocation: '',
    currentCity: '',
    state: '',
    occupation: '',
    mobile: '',
    email: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({
        name: '',
        fatherName: '',
        gotra: '',
        marwarLocation: '',
        currentCity: '',
        state: '',
        occupation: '',
        mobile: '',
        email: '',
      });
    }, 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 font-devanagari">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-orange-200 animate-scaleUp">
        
        {/* Modal Header */}
        <div className="bg-mandala-pattern text-white px-6 py-4 flex items-center justify-between border-b border-blue-400/30">
          <div className="flex items-center space-x-3">
            <div className="bg-btnGreen p-2 rounded-full">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">माली सैनी समाज बंधु पंजीयन</h3>
              <p className="text-xs text-blue-200">मारवाड़ी माली सैनी प्रवासी समाज डायरेक्टरी सदस्यता</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
              <h4 className="text-2xl font-bold text-gray-900">आपका पंजीयन सफलता पूर्वक प्राप्त हुआ!</h4>
              <p className="text-gray-600 max-w-md mx-auto">
                धन्यवाद! आपकी जानकारी मारवाड़ी माली सैनी प्रवासी समाज डायरेक्टरी में समीक्षा के पश्चात जोड़ दी जाएगी।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">पूरा नाम (Full Name) *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="उदा. रामेश्वर माली"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">पिता / पति का नाम *</label>
                  <input
                    type="text"
                    name="fatherName"
                    required
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="उदा. मोहनलाल जी"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">गोत्र (Gotra) *</label>
                  <input
                    type="text"
                    name="gotra"
                    required
                    value={formData.gotra}
                    onChange={handleChange}
                    placeholder="उदा. पंवार / सोलंकी / गहलोत"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">मूल निवास (मारवाड़ स्थान) *</label>
                  <input
                    type="text"
                    name="marwarLocation"
                    required
                    value={formData.marwarLocation}
                    onChange={handleChange}
                    placeholder="उदा. जोधपुर / सोजत / पाली / नागौर"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">वर्तमान प्रवास शहर *</label>
                  <input
                    type="text"
                    name="currentCity"
                    required
                    value={formData.currentCity}
                    onChange={handleChange}
                    placeholder="उदा. अहमदाबाद / मुंबई / सूरत"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">वर्तमान राज्य *</label>
                  <select
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                  >
                    <option value="">राज्य चुनें</option>
                    <option value="गुजरात">गुजरात</option>
                    <option value="महाराष्ट्र">महाराष्ट्र</option>
                    <option value="राजस्थान">राजस्थान</option>
                    <option value="कर्नाटक">कर्नाटक</option>
                    <option value="तमिलनाडु">तमिलनाडु</option>
                    <option value="अन्य">अन्य</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">व्यापार / व्यवसाय / पेशा *</label>
                  <input
                    type="text"
                    name="occupation"
                    required
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="उदा. टेक्सटाइल व्यापार / सर्विस"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">व्हाट्सएप नंबर (Mobile) *</label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="उदा. 9876543210"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              {/* Photo upload placeholder */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center bg-gray-50 hover:bg-amber-50/50 transition-colors cursor-pointer">
                <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-600 font-medium">पासपोर्ट साइज़ फोटो अपलोड करें (वैकल्पिक)</p>
                <p className="text-[10px] text-gray-400">PNG, JPG 5MB तक</p>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-btnGreen hover:bg-btnGreenHover text-white py-3 rounded-lg font-bold text-base shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  पंजीकरण जमा करें (Submit Registration)
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
