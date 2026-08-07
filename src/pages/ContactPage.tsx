import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-devanagari py-10">
      
      <div className="bg-mandala-pattern text-white py-12 px-4 text-center border-b border-blue-400/20 shadow-md">
        <div className="max-w-4xl mx-auto">
          <span className="text-yellow-300 font-semibold text-sm">संपर्क करें</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 mb-3">मारवाड़ी माली सैनी प्रवासी समाज</h1>
          <p className="text-sm text-blue-100">आपकी सलाह, प्रश्न अथवा सहयोग हेतु हमसे जुड़े</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-mandala-pattern text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-950/85 pointer-events-none" />
              <div className="relative z-10 space-y-6">
                
                <h3 className="text-2xl font-bold text-yellow-300 border-b border-white/20 pb-3">
                  केन्द्रीय संपर्क सूत्र
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-cyan-300 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-300">ईमेल आईडी</h4>
                      <a href="mailto:pravasimaliweb@gmail.com" className="text-sm font-semibold hover:text-yellow-300 transition-colors">
                        pravasimaliweb@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-cyan-300 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-300">हेल्पलाइन नंबर</h4>
                      <a href="tel:9460511491" className="text-sm font-semibold hover:text-yellow-300 transition-colors">
                        +91 9460511491
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-cyan-300 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-300">मुख्यालय एवं कार्यालय</h4>
                      <p className="text-xs leading-relaxed text-blue-100 mt-1">
                        केन्द्रीय कार्यालय: जोधपुर (मारवाड़), राजस्थान <br />
                        प्रवास प्रदेश कार्यालय: अहमदाबाद / मुंबई
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-xs text-yellow-300 font-bold mb-2">सहायता समय:</p>
                  <p className="text-xs text-gray-200">सोमवार से शनिवार: सुबह ०९:०० से शाम ०८:०० तक</p>
                </div>

              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">संदेश अथवा सुझाव भेजें</h3>
              <p className="text-xs text-gray-500 mb-6">नीचे दिए गए फॉर्म में अपनी जानकारी भरें, हमारी टीम शीघ्र संपर्क करेगी।</p>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
                  <h4 className="text-2xl font-bold text-gray-900">धन्यवाद! संदेश प्राप्त हुआ।</h4>
                  <p className="text-sm text-gray-600">हमारी टीम आपसे जल्द ही संपर्क करेगी।</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">पूरा नाम *</label>
                      <input
                        type="text"
                        required
                        placeholder="उदा. रमेश कुमार"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">मोबाइल नंबर *</label>
                      <input
                        type="tel"
                        required
                        placeholder="उदा. 9876543210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">ईमेल आईडी (वैकल्पिक)</label>
                    <input
                      type="email"
                      placeholder="उदा. yourname@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">आपका संदेश / सुझाव *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="यहाँ अपना संदेश विस्तार से लिखें..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-btnGreen hover:bg-btnGreenHover text-white py-3 rounded-xl font-bold text-base shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>संदेश प्रेषित करें (Send Message)</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
