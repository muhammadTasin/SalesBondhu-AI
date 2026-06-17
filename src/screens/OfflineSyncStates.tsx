import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { BottomNav } from '../components/BottomNav';
import { WifiOff, RefreshCw, Store, MapPin, PauseCircle, Database, ArrowLeft } from 'lucide-react';

export const OfflineSyncStates: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [syncLoading, setSyncLoading] = useState(false);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  const handleManualSave = () => {
    alert(lang === 'BN' ? 'ফোনের মেমরিতে তথ্য ম্যানুয়ালি সেভ করা হয়েছে!' : 'Data saved manually to local storage!');
  };

  const handleSyncNow = () => {
    setSyncLoading(true);
    setTimeout(() => {
      setSyncLoading(false);
      alert(lang === 'BN' ? 'সব তথ্য সফলভাবে সার্ভারের সাথে সিঙ্ক করা হয়েছে!' : 'All data synced successfully with server!');
    }, 1500);
  };

  return (
    <PhoneFrame>
      <header className="bg-white shadow-sm flex justify-between items-center w-full px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-[#eff4ff] p-2 rounded-full text-[#0b1c30] transition-colors flex items-center justify-center active:scale-95"
          >
            <ArrowLeft size={20} className="shrink-0" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-[#0b1c30]">
              {lang === 'BN' ? 'সিস্টেমের অবস্থা' : 'System Status'}
            </h1>
            <p className="text-[10px] text-[#44474c] mt-0.5">
              {lang === 'BN' ? 'কানেক্টিভিটি ও সিঙ্ক' : 'Connectivity & Sync'}
            </p>
          </div>
        </div>
        
        <button
          onClick={toggleLanguage}
          className="bg-[#eff4ff] text-[#0b1c30] rounded-full px-2.5 py-1 text-[11px] font-semibold flex items-center shadow-sm border border-[#c5c6cd]/30"
        >
          {lang === 'BN' ? 'বাং | EN' : 'EN | বাং'}
        </button>
      </header>

      <main className="flex-grow overflow-y-auto px-4 pb-24 space-y-4 pt-4">
        <div className="mb-2">
          <h2 className="text-base font-bold text-[#0b1c30]">
            {lang === 'BN' ? 'কানেক্টিভিটি স্ট্যাটাস' : 'Connectivity Status'}
          </h2>
          <p className="text-xs text-[#75777d] mt-0.5">
            {lang === 'BN' ? 'আপনার ডেটা সংযোগ ও সিঙ্কের বর্তমান অবস্থা দেখুন।' : 'View your data connection and synchronization state.'}
          </p>
        </div>

        {/* Sync Cards Grid */}
        <div className="space-y-4">
          {/* 1. Offline Mode */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] border-l-4 border-l-[#75777d] flex flex-col justify-between space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#eff4ff] rounded-full text-[#75777d] flex items-center justify-center">
                <WifiOff size={16} />
              </div>
              <h3 className="text-xs font-bold text-[#0b1c30]">
                {lang === 'BN' ? 'অফলাইন মোড চালু' : 'Offline Mode Active'}
              </h3>
            </div>
            <p className="text-[11px] font-semibold text-[#75777d]">
              {lang === 'BN' ? 'ইন্টারনেট নেই। আপনার কাজগুলো ফোনে সেভ করে রাখা হচ্ছে।' : 'No internet connection. Your work is being saved locally on your phone.'}
            </p>
            <button
              onClick={handleManualSave}
              className="w-full py-2 bg-[#eff4ff] text-[#0b1c30] font-bold text-xs rounded-lg hover:bg-[#dce9ff] transition-colors active:scale-95"
            >
              {lang === 'BN' ? 'ম্যানুয়ালি সেভ করুন' : 'Save Manually'}
            </button>
          </div>

          {/* 2. Sync Pending */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] border-l-4 border-l-[#f59e0b] flex flex-col justify-between space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#fef3c7] rounded-full text-[#92400e] flex items-center justify-center">
                <RefreshCw size={16} className={syncLoading ? 'animate-spin' : ''} />
              </div>
              <h3 className="text-xs font-bold text-[#0b1c30]">
                {lang === 'BN' ? 'সিঙ্ক বাকি আছে' : 'Sync Pending'}
              </h3>
            </div>
            <p className="text-[11px] font-semibold text-[#75777d]">
              {lang === 'BN' ? 'ফোনের আপডেটগুলো এখনো সার্ভারে জমা হয়নি।' : 'Phone updates have not been sent to the server yet.'}
            </p>
            <button
              onClick={handleSyncNow}
              disabled={syncLoading}
              className="w-full py-2 bg-[#006c49] text-white font-bold text-xs rounded-lg hover:bg-[#0c714d] transition-colors shadow-sm active:scale-95 disabled:opacity-50"
            >
              {syncLoading ? (lang === 'BN' ? 'সিঙ্ক হচ্ছে...' : 'Syncing...') : (lang === 'BN' ? 'এখনই সিঙ্ক করুন' : 'Sync Now')}
            </button>
          </div>

          {/* 3. Visit Updates Pending */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] border-l-4 border-l-[#006c49] flex flex-col justify-between space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#eff4ff] rounded-full text-[#006c49] flex items-center justify-center">
                <Store size={16} />
              </div>
              <h3 className="text-xs font-bold text-[#0b1c30]">
                {lang === 'BN' ? '৩টি ভিজিট সেভ করা বাকি' : '3 Visits Pending Save'}
              </h3>
            </div>
            <p className="text-[11px] font-semibold text-[#75777d]">
              {lang === 'BN' ? 'ভিজিটগুলো চেক করে সাবমিট করুন।' : 'Review and submit your finished visit details.'}
            </p>
            <button
              onClick={() => navigate('/visit-plan')}
              className="w-full py-2 bg-[#eff4ff] text-[#0b1c30] font-bold text-xs rounded-lg hover:bg-[#dce9ff] transition-colors active:scale-95"
            >
              {lang === 'BN' ? 'রিভিউ করুন' : 'Review'}
            </button>
          </div>

          {/* 4. Location Unavailable */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] border-l-4 border-l-[#ba1a1a] flex flex-col justify-between space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#ffdad6] rounded-full text-[#ba1a1a] flex items-center justify-center">
                <MapPin size={16} />
              </div>
              <h3 className="text-xs font-bold text-[#0b1c30]">
                {lang === 'BN' ? 'লোকেশন পাওয়া যাচ্ছে না' : 'Location Signal Lost'}
              </h3>
            </div>
            <p className="text-[11px] font-semibold text-[#75777d]">
              {lang === 'BN' ? 'লোকেশন সিগন্যাল নেই। আপনার অবস্থান ট্র্যাক করা যাচ্ছে না।' : 'GPS signal lost. Your position cannot be tracked.'}
            </p>
            <button
              onClick={() => navigate('/settings')}
              className="w-full py-2 bg-[#eff4ff] text-[#0b1c30] font-bold text-xs rounded-lg hover:bg-[#dce9ff] transition-colors active:scale-95"
            >
              {lang === 'BN' ? 'সেটিংস দেখুন' : 'Go to Settings'}
            </button>
          </div>

          {/* 5. Tracking Paused */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] border-l-4 border-l-[#75777d] flex flex-col justify-between space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#eff4ff] rounded-full text-[#75777d] flex items-center justify-center">
                <PauseCircle size={16} />
              </div>
              <h3 className="text-xs font-bold text-[#0b1c30]">
                {lang === 'BN' ? 'ট্র্যাকিং বন্ধ আছে' : 'Tracking Paused'}
              </h3>
            </div>
            <p className="text-[11px] font-semibold text-[#75777d]">
              {lang === 'BN' ? 'অটোমেটিক লোকেশন ট্র্যাকিং সাময়িকভাবে বন্ধ রাখা হয়েছে।' : 'Automatic background location tracking is temporarily paused.'}
            </p>
            <button
              onClick={() => navigate('/duty')}
              className="w-full py-2 bg-[#0e1c2f] text-white font-bold text-xs rounded-lg hover:bg-[#213145] transition-colors active:scale-95 shadow-sm"
            >
              {lang === 'BN' ? 'চালু করুন' : 'Resume Tracking'}
            </button>
          </div>

          {/* 6. Data Unavailable */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] border-l-4 border-l-[#c5c6cd] flex flex-col justify-between space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#eff4ff] rounded-full text-[#75777d] flex items-center justify-center">
                <Database size={16} />
              </div>
              <h3 className="text-xs font-bold text-[#0b1c30]">
                {lang === 'BN' ? 'তথ্য লোড হচ্ছে না' : 'Data Unavailable'}
              </h3>
            </div>
            <p className="text-[11px] font-semibold text-[#75777d]">
              {lang === 'BN' ? 'সার্ভার থেকে তথ্য পাওয়া যাচ্ছে না। আবার চেষ্টা করুন।' : 'Unable to pull database records from the server. Try again.'}
            </p>
            <button
              onClick={handleSyncNow}
              className="w-full py-2 bg-[#eff4ff] text-[#0b1c30] font-bold text-xs rounded-lg hover:bg-[#dce9ff] transition-colors active:scale-95"
            >
              {lang === 'BN' ? 'আবার চেষ্টা করুন' : 'Retry'}
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </PhoneFrame>
  );
};
export default OfflineSyncStates;
