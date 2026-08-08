import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, UserPlus, CheckCircle, Upload, AlertCircle, ArrowRight, Image as ImageIcon, Copy, Check, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, RegistrationFormValues } from '../lib/validations';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isMissingTable, setIsMissingTable] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      fatherName: '',
      gotra: '',
      marwarLocation: '',
      currentCity: '',
      state: '',
      occupation: '',
      mobile: '',
      email: '',
    },
  });

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('कृपया 5MB से कम साइज़ की फ़ोटो चुनें।');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setIsMissingTable(false);

    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('registration_requests').insert({
          full_name: data.name,
          father_name: data.fatherName,
          gotra: data.gotra,
          marwar_location: data.marwarLocation,
          current_city: data.currentCity,
          state: data.state,
          occupation: data.occupation,
          phone: data.mobile,
          email: data.email || null,
          profile_image: photoPreview || null,
          registration_data: {
            marwar_location: data.marwarLocation,
            current_city: data.currentCity,
            state: data.state,
            occupation: data.occupation,
          },
          status: 'pending',
        });

        if (error) {
          if (error.message.includes('registration_requests') || error.code === '42P01') {
            setIsMissingTable(true);
            throw new Error("Supabase टेबल 'registration_requests' नहीं मिली। कृपया नीचे दिए गए SQL स्क्रिप्ट को अपने Supabase SQL Editor में Run करें।");
          }
          throw error;
        }
      }

      setSubmitted(true);
      reset();
      setPhotoPreview(null);
    } catch (err: any) {
      console.error('Registration submission error:', err);
      setSubmitError(err.message || 'पंजीयन जमा करने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setSubmitError(null);
    setIsMissingTable(false);
    setPhotoPreview(null);
    onClose();
  };

  const quickSqlScript = `-- Run this in your Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.registration_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  gotra TEXT NOT NULL,
  marwar_location TEXT NOT NULL,
  current_city TEXT NOT NULL,
  state TEXT NOT NULL,
  occupation TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  profile_image TEXT,
  registration_data JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'pending',
  rejection_reason TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.registration_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert reg requests" ON public.registration_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read reg requests" ON public.registration_requests FOR SELECT USING (true);
`;

  const copySqlScript = () => {
    navigator.clipboard.writeText(quickSqlScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 font-devanagari">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-orange-200 animate-scaleUp">
        
        {/* Modal Header */}
        <div className="bg-mandala-pattern bg-[#1b75bc] text-white px-6 py-4 flex items-center justify-between border-b border-blue-400/30">
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
            onClick={handleClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
              <h4 className="text-2xl font-bold text-gray-900">आपका पंजीयन सफलता पूर्वक प्राप्त हुआ!</h4>
              <p className="text-gray-600 max-w-md mx-auto text-sm">
                धन्यवाद! आपका आवेदन स्वीकृत हेतु प्रेषित कर दिया गया है। एडमिन द्वारा समीक्षा (Approval) के पश्चात आपकी जानकारी सार्वजनिक डायरेक्टरी में जोड़ दी जाएगी।
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/registration-status"
                  onClick={handleClose}
                  className="bg-navOrange hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow flex items-center space-x-1"
                >
                  <span>पंजीयन स्थिति जांचें (Check Status)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleClose}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5 rounded-xl font-bold text-sm"
                >
                  बंद करें (Close)
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3.5 rounded-xl text-xs space-y-2">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <span className="font-bold">{submitError}</span>
                  </div>

                  {isMissingTable && (
                    <div className="pt-2 border-t border-red-200 space-y-2">
                      <p className="text-gray-700">
                        Supabase डैशबोर्ड में जाएँ ➔ <strong>SQL Editor</strong> ➔ नीचे दिया गया कोड पेस्ट करके <strong>Run</strong> करें:
                      </p>
                      <div className="flex items-center justify-between bg-gray-900 text-amber-300 p-2.5 rounded-lg text-[11px] font-mono">
                        <span>CREATE TABLE registration_requests ...</span>
                        <button
                          type="button"
                          onClick={copySqlScript}
                          className="bg-orange-600 hover:bg-orange-500 text-white px-3 py-1 rounded text-xs font-bold flex items-center space-x-1 shrink-0"
                        >
                          {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">पूरा नाम (Full Name) *</label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="उदा. रामेश्वर माली"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                  {errors.name && <p className="text-[11px] text-red-500 mt-0.5">{errors.name.message}</p>}
                </div>

                {/* Father Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">पिता / पति का नाम *</label>
                  <input
                    type="text"
                    {...register('fatherName')}
                    placeholder="उदा. मोहनलाल जी"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                  {errors.fatherName && <p className="text-[11px] text-red-500 mt-0.5">{errors.fatherName.message}</p>}
                </div>

                {/* Gotra */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">गोत्र (Gotra) *</label>
                  <input
                    type="text"
                    {...register('gotra')}
                    placeholder="उदा. पंवार / सोलंकी / गहलोत"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                  {errors.gotra && <p className="text-[11px] text-red-500 mt-0.5">{errors.gotra.message}</p>}
                </div>

                {/* Native Place */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">मूल निवास (मारवाड़ स्थान) *</label>
                  <input
                    type="text"
                    {...register('marwarLocation')}
                    placeholder="उदा. जोधपुर / सोजत / पाली / नागौर"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                  {errors.marwarLocation && <p className="text-[11px] text-red-500 mt-0.5">{errors.marwarLocation.message}</p>}
                </div>

                {/* Current City */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">वर्तमान प्रवास शहर *</label>
                  <input
                    type="text"
                    {...register('currentCity')}
                    placeholder="उदा. अहमदाबाद / मुंबई / सूरत"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                  {errors.currentCity && <p className="text-[11px] text-red-500 mt-0.5">{errors.currentCity.message}</p>}
                </div>

                {/* Current State */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">वर्तमान राज्य *</label>
                  <select
                    {...register('state')}
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
                  {errors.state && <p className="text-[11px] text-red-500 mt-0.5">{errors.state.message}</p>}
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">व्यापार / व्यवसाय / पेशा *</label>
                  <input
                    type="text"
                    {...register('occupation')}
                    placeholder="उदा. टेक्सटाइल व्यापार / सर्विस"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                  {errors.occupation && <p className="text-[11px] text-red-500 mt-0.5">{errors.occupation.message}</p>}
                </div>

                {/* Mobile / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">व्हाट्सएप नंबर (Mobile) *</label>
                  <input
                    type="tel"
                    {...register('mobile')}
                    placeholder="उदा. 9876543210"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                  {errors.mobile && <p className="text-[11px] text-red-500 mt-0.5">{errors.mobile.message}</p>}
                </div>

                {/* Email (Optional) */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">ईमेल (Email) (वैकल्पिक)</label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="example@mail.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-0.5">{errors.email.message}</p>}
                </div>
              </div>

              {/* Photo Upload Component */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">पासपोर्ट साइज़ फोटो अपलोड करें (वैकल्पिक)</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {photoPreview ? (
                  <div className="flex items-center space-x-4 p-3 bg-amber-50/60 border border-amber-200 rounded-xl">
                    <img src={photoPreview} alt="Preview" className="w-14 h-14 object-cover rounded-lg border border-amber-300 shadow-sm" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-800">फोटो चुनी गई है (Photo Attached)</p>
                      <p className="text-[10px] text-gray-500">पंजीयन के साथ फोटो भेजी जाएगी</p>
                    </div>
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                      title="Remove photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center bg-gray-50 hover:bg-orange-50/50 hover:border-orange-300 transition-all cursor-pointer group"
                  >
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-orange-500 mx-auto mb-1 transition-colors" />
                    <p className="text-xs text-gray-700 font-bold group-hover:text-orange-600">फोटो अपलोड करने के लिए क्लिक करें</p>
                    <p className="text-[10px] text-gray-400">PNG, JPG 5MB तक</p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-btnGreen hover:bg-btnGreenHover text-white py-3 rounded-xl font-bold text-base shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>जमा हो रहा है...</span>
                    </>
                  ) : (
                    <span>पंजीकरण जमा करें (Submit Registration)</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
