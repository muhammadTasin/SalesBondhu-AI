import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionButton } from '../components/ActionButton';
import { PhoneFrame } from '../components/PhoneFrame';
import { Rocket, IdCard, Lock, Eye, EyeOff, Fingerprint, User, ShieldAlert } from 'lucide-react';
import { setCurrentRole } from '../lib/mockSession';

export const LoginRoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleOfficerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentRole('sales_officer');
    navigate('/today');
  };

  const handleManagerLogin = () => {
    setCurrentRole('manager');
    navigate('/manager');
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  return (
    <PhoneFrame>
      {/* Floating Language Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleLanguage}
          className="bg-[#0e1c2f] text-white rounded-full px-3 py-1 text-xs font-semibold flex items-center shadow-md hover:opacity-90 transition-opacity"
        >
          <span className="mr-1 font-semibold">{lang === 'BN' ? 'বাং' : 'BN'}</span>
          <span className="opacity-50">|</span>
          <span className="ml-1 opacity-70">{lang === 'BN' ? 'EN' : 'বাং'}</span>
        </button>
      </div>

      <div className="flex-grow flex flex-col justify-center items-center px-4 z-10 relative mt-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#eff4ff] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-[#c5c6cd]/20">
            <Rocket size={32} className="text-[#0e1c2f]" />
          </div>
          <h1 className="text-3xl font-bold text-[#0b1c30] tracking-tight">SalesBondhu AI</h1>
          <p className="text-sm font-medium text-[#44474c] mt-1">
            {lang === 'BN' ? 'আপনার স্মার্ট সেলস কো-পাইলট' : 'Your Smart Sales Co-Pilot'}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white w-full rounded-[20px] p-6 shadow-sm border border-[#e5eeff]/50">
          <form onSubmit={handleOfficerLogin} className="flex flex-col gap-4">
            {/* ID Input Group */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#44474c] ml-1" htmlFor="officer-id">
                {lang === 'BN' ? 'সেলস অফিসার আইডি' : 'Sales Officer ID'}
              </label>
              <div className="relative flex items-center">
                <IdCard size={20} className="absolute left-3 text-[#75777d]" />
                <input
                  id="officer-id"
                  type="text"
                  placeholder={lang === 'BN' ? 'আপনার আইডি লিখুন' : 'Enter your ID'}
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full bg-[#eff4ff] border-none rounded-xl py-3 pl-10 pr-3 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#bac7e1] outline-none transition-shadow placeholder-[#75777d]/60"
                />
              </div>
            </div>

            {/* Password Input Group */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#44474c] ml-1" htmlFor="password">
                {lang === 'BN' ? 'পাসওয়ার্ড' : 'Password'}
              </label>
              <div className="relative flex items-center">
                <Lock size={20} className="absolute left-3 text-[#75777d]" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={lang === 'BN' ? 'পাসওয়ার্ড লিখুন' : 'Enter password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#eff4ff] border-none rounded-xl py-3 pl-10 pr-10 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#bac7e1] outline-none transition-shadow placeholder-[#75777d]/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#75777d] hover:text-[#0b1c30] transition-colors focus:outline-none flex items-center justify-center"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <a href="#" className="text-xs text-[#0e1c2f] hover:underline font-semibold">
                  {lang === 'BN' ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
                </a>
              </div>
            </div>

            {/* Login Buttons */}
            <div className="flex flex-col gap-3 mt-4">
              <ActionButton
                type="submit"
                variant="navy"
                label={lang === 'BN' ? 'সেলস অফিসার হিসেবে লগইন করুন' : 'Login as Sales Officer'}
                icon={<User size={18} />}
              />
              <ActionButton
                type="button"
                variant="light"
                onClick={handleManagerLogin}
                label={lang === 'BN' ? 'ম্যানেজার হিসেবে লগইন করুন' : 'Login as Manager'}
                icon={<ShieldAlert size={18} />}
                className="bg-[#d3e4fe]/40 hover:bg-[#d3e4fe]/70 border-none font-semibold text-[#0b1c30]"
              />
            </div>
          </form>

          {/* Biometric Option */}
          <div className="mt-6 flex flex-col items-center border-t border-[#c5c6cd]/30 pt-6">
            <p className="text-xs text-[#44474c] mb-3">{lang === 'BN' ? 'অথবা বায়োমেট্রিক ব্যবহার করুন' : 'Or login with'}</p>
            <button
              type="button"
              className="w-12 h-12 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#0e1c2f] hover:bg-[#dce9ff] hover:text-[#0b1c30] transition-colors active:scale-95 shadow-sm border border-[#c5c6cd]/20"
            >
              <Fingerprint size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 text-center mt-auto z-10">
        <p className="text-[11px] font-semibold text-[#75777d]">
          {lang === 'BN' ? 'দৈনিক ফিল্ড ভিজিট ও ট্র্যাকিং অ্যাপ' : 'Built for daily field execution'}
        </p>
      </footer>
    </PhoneFrame>
  );
};
export default LoginRoleSelection;
