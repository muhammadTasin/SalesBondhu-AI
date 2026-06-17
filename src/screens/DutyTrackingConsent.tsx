import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { AppHeader } from '../components/AppHeader';

export const DutyTrackingConsent: React.FC = () => {
  const navigate = useNavigate();
  const [dutyActive, setDutyActive] = useState(false);
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setDutyActive(checked);
    if (checked) {
      // Wait 1.5 seconds, then transition to Today Dashboard (/today)
      setTimeout(() => {
        navigate('/today');
      }, 1200);
    }
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  return (
    <PhoneFrame>
      <AppHeader
        title={lang === 'BN' ? 'লোকেশন ট্র্যাকিং' : 'Location Consent'}
        subtitle={lang === 'BN' ? 'ডিউটি ও ট্র্যাকিং সম্মতি' : 'Duty Tracking Consent'}
        showGPSStatus={false}
        syncTime=""
        lang={lang}
        onLanguageToggle={toggleLanguage}
      />

      <main className="flex-grow flex flex-col items-center justify-center px-4 relative mt-4">
        {/* Illustration Area */}
        <div className="w-full aspect-square max-w-[280px] mx-auto mb-6 relative rounded-[20px] overflow-hidden bg-[#eff4ff] border border-[#c5c6cd]/30 shadow-sm flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-[#eff4ff] to-transparent" />
          
          {/* Mock Map pin bouncing accent */}
          <div className="relative flex flex-col items-center animate-bounce">
            <div className="w-16 h-16 rounded-full border-[3px] border-[#006c49] flex items-center justify-center bg-white shadow-[0_8px_16px_rgba(0,108,73,0.15)]">
              <span className="material-symbols-outlined text-[#006c49] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                location_on
              </span>
            </div>
            <div className="w-8 h-1.5 bg-[#44474c]/20 rounded-full blur-[1px] mt-2 animate-pulse" />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center mb-8 px-2 max-w-[320px] mx-auto">
          <h2 className="text-xl font-bold text-[#0b1c30] mb-2">
            {lang === 'BN' ? 'লোকেশন ট্র্যাকিং' : 'Location Tracking'}
          </h2>
          <p className="text-sm text-[#44474c] leading-relaxed">
            {lang === 'BN'
              ? 'আপনার ভিজিট প্ল্যান এবং রুট সহজ করতে ডিউটি চলাকালীন লোকেশন ব্যবহার করা হবে।'
              : 'Your location will be used during duty hours to optimize your daily visit plan and route.'}
          </p>
        </div>

        {/* Action Card */}
        <div className="w-full bg-white rounded-[20px] p-5 shadow-sm border border-[#e5eeff] transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#9af2c5] text-[#0c714d] flex items-center justify-center">
                <span className="material-symbols-outlined font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                  trip_origin
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0b1c30]">
                  {lang === 'BN' ? 'ডিউটি শুরু করুন' : 'Start Duty'}
                </h3>
                <p className="text-xs text-[#44474c] mt-0.5">
                  {lang === 'BN' ? 'টগল অন করে কাজ শুরু করুন' : 'Toggle on to start work'}
                </p>
              </div>
            </div>
            
            {/* Custom Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={dutyActive}
                onChange={handleToggle}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-[#525f75]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#525f75]/20 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-[#006c49] shadow-inner" />
            </label>
          </div>
          
          {/* Expandable Status Message */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${dutyActive ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
            <div className="pt-4 border-t border-[#eff4ff] flex items-start gap-2">
              <span className="material-symbols-outlined text-[#006c49] text-lg mt-0.5">check_circle</span>
              <p className="text-xs text-[#006c49] font-medium leading-relaxed">
                {lang === 'BN'
                  ? 'লোকেশন ট্র্যাকিং সক্রিয় হয়েছে। আপনার রুট অপ্টিমাইজ করা হচ্ছে।'
                  : 'Location tracking active. Optimizing your route plan...'}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="w-full py-4 text-center mt-auto z-10">
        <p className="text-[10px] font-semibold text-[#75777d]">
          {lang === 'BN' ? 'সম্মতি প্রদান করে ডিউটি শুরু করুন' : 'Provide consent to begin duty'}
        </p>
      </footer>
    </PhoneFrame>
  );
};
export default DutyTrackingConsent;
