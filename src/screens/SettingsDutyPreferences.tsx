import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { ArrowLeft, Edit2, Globe, MapPin, BatteryCharging, Bell, ChevronRight, Shield, Info, LogOut } from 'lucide-react';

export const SettingsDutyPreferences: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [dutyTracking, setDutyTracking] = useState(true);
  const [batterySaver, setBatterySaver] = useState(false);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  return (
    <PhoneFrame>
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-6 pb-4 bg-white border-b border-[#c5c6cd]/30 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-[#44474c] hover:bg-[#eff4ff] active:scale-95 transition-all p-1.5 rounded-full"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-[#0b1c30]">
            {lang === 'BN' ? 'সেটিংস' : 'Settings'}
          </h1>
        </div>
        <button
          onClick={toggleLanguage}
          className="text-xs font-semibold bg-[#eff4ff] text-[#0b1c30] px-3 py-1 rounded-full border border-[#c5c6cd]/30 active:scale-95 transition-all"
        >
          {lang === 'BN' ? 'বাং | EN' : 'EN | বাং'}
        </button>
      </header>

      <main className="flex-grow p-4 space-y-6 overflow-y-auto pb-8">
        {/* Profile Card */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-[#c5c6cd]/30 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-[#eff4ff] border-2 border-[#c5c6cd]/50 shrink-0">
            <img
              alt="Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCXvlrPlagz0YnSVeaZp9jm0T7UVWGrXY8izLkLoK1YtgJth88feKwyL90Jh8tHp3OyqSrGHNmMMAaMSkSkMa60LMDEIlnz88L1KLPXeMVUSnMAc07SkFFkAHYx0FFLXRxRFc689aDNVR8PaXSwX4FaQcBrPcZj8uqIg-62rKVP2-J9itamAPd1Ebe6OtcTPApck9fFX1fRl7ekLB2zpxXePxOQv3eEDEB3fa3rWbaF1ajs1WlQCS8HeGYwnOldNUTlAZBXkF5jA"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-lg font-bold text-[#0b1c30]">
              {lang === 'BN' ? 'আরিফ রহমান' : 'Arif Rahman'}
            </h2>
            <p className="text-xs text-[#44474c] mt-0.5">
              {lang === 'BN' ? 'ফিল্ড সেলস অফিসার • আইডি: S-4921' : 'Field Sales Officer • ID: S-4921'}
            </p>
            <button className="mt-2 text-xs font-semibold text-[#006c49] flex items-center gap-1 hover:underline active:scale-95 transition-all">
              <span>{lang === 'BN' ? 'প্রোফাইল এডিট করুন' : 'Edit Profile'}</span>
              <Edit2 size={12} />
            </button>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="space-y-2">
          <h3 className="text-xs font-semibold text-[#44474c] uppercase tracking-wider pl-1">
            {lang === 'BN' ? 'পছন্দসমূহ' : 'Preferences'}
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-[#c5c6cd]/30 overflow-hidden divide-y divide-[#c5c6cd]/20">
            {/* Language */}
            <div className="p-4 flex justify-between items-center hover:bg-[#eff4ff]/20 transition-colors">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-[#44474c]" />
                <span className="text-sm font-medium text-[#0b1c30]">
                  {lang === 'BN' ? 'ভাষা (Language)' : 'Language'}
                </span>
              </div>
              <div className="flex bg-[#eff4ff] rounded-full p-1 border border-[#c5c6cd]/30">
                <button
                  onClick={() => setLang('EN')}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                    lang === 'EN'
                      ? 'bg-white text-[#0b1c30] shadow-sm'
                      : 'text-[#44474c]'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('BN')}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                    lang === 'BN'
                      ? 'bg-white text-[#0b1c30] shadow-sm'
                      : 'text-[#44474c]'
                  }`}
                >
                  বাং
                </button>
              </div>
            </div>

            {/* Duty Tracking */}
            <div className="p-4 space-y-2 hover:bg-[#eff4ff]/20 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-[#006c49]" />
                  <span className="text-sm font-medium text-[#0b1c30]">
                    {lang === 'BN' ? 'ডিউটি ট্র্যাকিং' : 'Duty Tracking'}
                  </span>
                </div>
                <button
                  onClick={() => setDutyTracking(!dutyTracking)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    dutyTracking ? 'bg-[#006c49]' : 'bg-[#c5c6cd]'
                  }`}
                  role="switch"
                  aria-checked={dutyTracking}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      dutyTracking ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-[#44474c] pl-8 leading-relaxed">
                {lang === 'BN'
                  ? 'ডিউটি ট্র্যাকিং চালু থাকলে আপনার অবস্থান দেখা যাবে। এটি ভিজিট লগ এবং রুট অপ্টিমাইজেশানের জন্য প্রয়োজনীয়।'
                  : 'Tracking is visible and can be paused anytime. Used to log client visits and optimize routes.'}
              </p>
            </div>

            {/* Battery & Data Saver */}
            <div className="p-4 flex justify-between items-center hover:bg-[#eff4ff]/20 transition-colors">
              <div className="flex items-center gap-3">
                <BatteryCharging size={20} className="text-[#44474c]" />
                <span className="text-sm font-medium text-[#0b1c30]">
                  {lang === 'BN' ? 'ব্যাটারি ও ডাটা সেভার' : 'Battery & Data Saver'}
                </span>
              </div>
              <button
                onClick={() => setBatterySaver(!batterySaver)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  batterySaver ? 'bg-[#006c49]' : 'bg-[#c5c6cd]'
                }`}
                role="switch"
                aria-checked={batterySaver}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    batterySaver ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Notifications */}
            <div className="p-4 flex justify-between items-center hover:bg-[#eff4ff]/20 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-[#44474c]" />
                <span className="text-sm font-medium text-[#0b1c30]">
                  {lang === 'BN' ? 'নোটিফিকেশন' : 'Notifications'}
                </span>
              </div>
              <ChevronRight size={18} className="text-[#44474c]" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="space-y-2">
          <h3 className="text-xs font-semibold text-[#44474c] uppercase tracking-wider pl-1">
            {lang === 'BN' ? 'অ্যাপ সম্পর্কে' : 'About'}
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-[#c5c6cd]/30 overflow-hidden divide-y divide-[#c5c6cd]/20">
            {/* Privacy & Terms */}
            <div className="p-4 flex justify-between items-center hover:bg-[#eff4ff]/20 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-[#44474c]" />
                <span className="text-sm font-medium text-[#0b1c30]">
                  {lang === 'BN' ? 'প্রাইভেসি এবং শর্তাবলী' : 'Privacy & Terms'}
                </span>
              </div>
              <ChevronRight size={18} className="text-[#44474c]" />
            </div>

            {/* App Version */}
            <div className="p-4 flex justify-between items-center hover:bg-[#eff4ff]/20 transition-colors">
              <div className="flex items-center gap-3">
                <Info size={20} className="text-[#44474c]" />
                <span className="text-sm font-medium text-[#0b1c30]">
                  {lang === 'BN' ? 'অ্যাপ সংস্করণ' : 'App Version'}
                </span>
              </div>
              <span className="text-xs font-medium text-[#44474c]">v2.4.1</span>
            </div>
          </div>
        </section>

        {/* Logout */}
        <div className="pt-2">
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-white border border-[#ba1a1a] text-[#ba1a1a] rounded-xl py-3 font-semibold flex justify-center items-center gap-2 hover:bg-[#ffdad6]/20 transition-colors active:scale-95"
          >
            <LogOut size={18} />
            <span>{lang === 'BN' ? 'লগআউট' : 'Logout'}</span>
          </button>
        </div>
      </main>
    </PhoneFrame>
  );
};
export default SettingsDutyPreferences;
