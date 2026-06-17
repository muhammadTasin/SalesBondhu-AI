import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import {
  ArrowLeft,
  AlertTriangle,
  Navigation,
  Banknote,
  ShoppingCart,
  UserCheck,
  Clock,
  Map,
  ShoppingBag,
  MapPinOff,
  FileText,
  BellRing
} from 'lucide-react';

export const ManagerOfficerDetail: React.FC = () => {
  const navigate = useNavigate();
  const { officerId } = useParams<{ officerId: string }>();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [approved, setApproved] = useState(false);
  const [comment, setComment] = useState('');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  // Setup mock data depending on officer ID
  const isRahim = officerId === 'rahim-ahmed';
  const officerName = isRahim ? 'Rahim Ahmed' : 'Kamrul Hasan';
  const officerInitials = isRahim ? 'RA' : 'KH';
  const officerRole = lang === 'BN' ? 'ফিল্ড সেলস অফিসার • ঢাকা দক্ষিণ' : 'Field Sales Officer • Dhaka South';

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
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#eff4ff] text-[#0b1c30] flex items-center justify-center font-bold text-xs">
              {officerInitials}
            </div>
            <div>
              <h1 className="text-sm font-bold text-[#0b1c30]">{officerName}</h1>
              <p className="text-[10px] text-[#44474c]">{officerRole}</p>
            </div>
          </div>
        </div>
        <button
          onClick={toggleLanguage}
          className="text-xs font-semibold bg-[#eff4ff] text-[#0b1c30] px-3 py-1 rounded-full border border-[#c5c6cd]/30 active:scale-95 transition-all"
        >
          {lang === 'BN' ? 'বাং | EN' : 'EN | বাং'}
        </button>
      </header>

      <main className="flex-grow p-4 space-y-6 overflow-y-auto pb-8">
        {/* Exception Mismatch Alert (Only shown for Rahim Ahmed as he is High Risk) */}
        {isRahim && (
          <div className="bg-[#ffdad6] text-[#93000a] border border-[#ba1a1a]/30 rounded-xl p-4 flex items-start gap-3 shadow-sm">
            <AlertTriangle size={20} className="shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold">
                {lang === 'BN' ? 'লোকেশন মিলছে না' : 'Location Mismatch'}
              </h3>
              <p className="text-[11px] leading-relaxed mt-1">
                {lang === 'BN'
                  ? 'Rahman Traders-এর ভিজিট লোকেশন প্ল্যান করা জায়গার সাথে মিলছে না। প্রায় ২.৪ কিমি দূরে পাওয়া গেছে।'
                  : 'Rahman Traders visit location does not match the planned route. Found approximately 2.4 km away.'}
              </p>
            </div>
          </div>
        )}

        {/* Performance Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Visits completed */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#c5c6cd]/30 flex flex-col justify-between h-32 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#eff4ff] rounded-full opacity-35 blur-xl"></div>
            <div className="flex items-center gap-1.5 text-[#44474c] z-10">
              <Navigation size={16} className="text-[#006c49]" />
              <span className="text-[11px] font-medium">
                {lang === 'BN' ? 'ভিজিট শেষ হয়েছে' : 'Visits Completed'}
              </span>
            </div>
            <div className="z-10">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-[#0b1c30]">{isRahim ? '৩' : '১৪'}</span>
                <span className="text-xs text-[#75777d]">/ ২০</span>
              </div>
              <div className="w-full bg-[#eff4ff] h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-[#006c49] h-full rounded-full"
                  style={{ width: isRahim ? '15%' : '70%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Collection */}
          <div className="bg-[#0e1c2f] text-white rounded-xl p-4 shadow-sm border border-[#c5c6cd]/30 flex flex-col justify-between h-32 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#006c49]/20 rounded-full opacity-20 blur-xl"></div>
            <div className="flex items-center gap-1.5 text-white/70 z-10">
              <Banknote size={16} className="text-[#9af2c5]" />
              <span className="text-[11px] font-medium">
                {lang === 'BN' ? 'কালেকশন' : 'Collection'}
              </span>
            </div>
            <div className="z-10">
              <span className="text-2xl font-bold text-white">{isRahim ? '৳১৫,০০০' : '৳৯৫,০০০'}</span>
              <p className="text-[9px] text-[#9af2c5] font-semibold mt-1 flex items-center gap-0.5">
                <span>{isRahim ? '15% of target' : '112% of target'}</span>
              </p>
            </div>
          </div>

          {/* Orders - Full Width */}
          <div className="col-span-2 bg-white rounded-xl p-4 shadow-sm border border-[#c5c6cd]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#0b1c30]">
                <ShoppingCart size={20} />
              </div>
              <div>
                <span className="text-[10px] text-[#44474c] block">
                  {lang === 'BN' ? 'মোট অর্ডার' : 'Total Orders'}
                </span>
                <span className="text-lg font-bold text-[#0b1c30]">{isRahim ? '৳১.২L' : '৳২.৮L'}</span>
              </div>
            </div>
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                isRahim ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-[#9af2c5] text-[#0c714d]'
              }`}
            >
              {isRahim ? (lang === 'BN' ? 'ঝুঁকিপূর্ণ' : 'At Risk') : (lang === 'BN' ? 'চমৎকার' : 'Excellent')}
            </span>
          </div>

          {/* Attendance */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#c5c6cd]/30 flex flex-col justify-between h-28 relative overflow-hidden">
            <div className="flex items-center gap-1.5 text-[#44474c] z-10">
              <UserCheck size={16} className="text-[#006c49]" />
              <span className="text-[11px] font-medium">{lang === 'BN' ? 'উপস্থিতি' : 'Attendance'}</span>
            </div>
            <div className="z-10">
              <span className="text-base font-bold text-[#0b1c30]">
                {lang === 'BN' ? 'উপস্থিত' : 'Present'}
              </span>
              <p className="text-[9px] text-[#75777d] mt-1">
                {lang === 'BN' ? 'রিপোর্ট: ০৮:৩০ AM' : 'Reported: 08:30 AM'}
              </p>
            </div>
          </div>

          {/* Territory Time */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#c5c6cd]/30 flex flex-col justify-between h-28 relative overflow-hidden">
            <div className="flex items-center gap-1.5 text-[#44474c] z-10">
              <Clock size={16} className="text-[#006c49]" />
              <span className="text-[11px] font-medium">{lang === 'BN' ? 'কাজের সময়' : 'Territory Time'}</span>
            </div>
            <div className="z-10">
              <span className="text-base font-bold text-[#0b1c30]">{isRahim ? '২ ঘণ্টা' : '৬ ঘ. ৪৫ মি.'}</span>
              <p className="text-[9px] text-[#75777d] mt-1">
                {lang === 'BN' ? 'শুরু থেকে সক্রিয়' : 'Active since start'}
              </p>
            </div>
          </div>
        </div>

        {/* Map Route Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-[#c5c6cd]/30 overflow-hidden">
          <div className="p-3 border-b border-[#c5c6cd]/20 flex justify-between items-center bg-[#eff4ff]/20">
            <h3 className="text-xs font-bold text-[#0b1c30]">
              {isRahim ? (lang === 'BN' ? 'রুট থেকে বাইরে' : 'Out of Route') : (lang === 'BN' ? 'রুট ট্র্যাকিং' : 'Route Tracking')}
            </h3>
            <Map size={16} className="text-[#44474c]" />
          </div>
          <div className="relative h-44 w-full bg-[#eff4ff]">
            <img
              alt="Map View"
              className="w-full h-full object-cover opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGrDCEggxjhekik6X323sHsYgr7fYjMQFP1s8NmPS_6xam5qcftEPmOPrlfDLrjKX7mHkE_zxWR7_tawoLwEaH10Asx4t7S-Sz228Sw0Kp6F4Ghr42C0PXtLAjSDtLfC-bBgd5A6tq4yThoDJnBQGrC-NhBYG6A-AluxrgYLxOP-KXpJ1AguszSpd46nGwC2CdqXQTmu9wvv5pqUd58CM9exSyxdBDHqWXSzCFOGnx7T6BM6oZcmqdQBVimXNKCqTisqmJTwLseA"
            />
            {/* Map Overlay Legends */}
            <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-sm border border-[#c5c6cd]/30 flex flex-col gap-1 z-10">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-1 bg-[#006c49] rounded-full"></div>
                <span className="text-[9px] text-[#44474c] font-semibold">
                  {lang === 'BN' ? 'পরিকল্পিত রুট' : 'Planned'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-1 bg-[#ba1a1a] rounded-full border border-dashed border-[#ba1a1a]"></div>
                <span className="text-[9px] text-[#44474c] font-semibold">
                  {lang === 'BN' ? 'প্রকৃত রুট' : 'Actual'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Activity Timeline */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#c5c6cd]/30">
          <h3 className="text-xs font-bold text-[#0b1c30] mb-4">
            {lang === 'BN' ? 'আজকের কাজ' : 'Today\'s Activity'}
          </h3>
          <div className="relative pl-6 space-y-6 before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-[#c5c6cd]/30">
            {/* Timeline Item 1 */}
            <div className="relative">
              <div className="absolute -left-[20px] top-1 w-2.5 h-2.5 bg-[#006c49] rounded-full border-2 border-white shadow-sm z-10"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-[#0b1c30]">
                    {lang === 'BN' ? 'দিন শুরু হয়েছে' : 'Day Started'}
                  </p>
                  <p className="text-[10px] text-[#44474c] mt-0.5">
                    {lang === 'BN' ? 'হোম বেস থেকে চেক-ইন' : 'Checked in from Home Base'}
                  </p>
                </div>
                <span className="text-[10px] text-[#75777d] font-semibold">08:30</span>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative">
              <div className="absolute -left-[20px] top-1 w-2.5 h-2.5 bg-[#006c49] rounded-full border-2 border-white shadow-sm z-10"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-[#0b1c30]">
                    {lang === 'BN' ? 'রহমান স্টোর-এ পৌঁছানো' : 'Reached Rahman Store'}
                  </p>
                  {isRahim ? (
                    <p className="text-[10px] text-[#ba1a1a] mt-0.5 flex items-center gap-1 font-semibold">
                      <MapPinOff size={12} />
                      {lang === 'BN' ? 'লোকেশন অমিল পাওয়া গেছে' : 'Location Mismatch Logged'}
                    </p>
                  ) : (
                    <p className="text-[10px] text-[#006c49] mt-0.5">
                      {lang === 'BN' ? 'সঠিক স্থানে ভেরিফাইড' : 'Verified on location'}
                    </p>
                  )}
                </div>
                <span className="text-[10px] text-[#75777d] font-semibold">10:45</span>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative">
              <div className="absolute -left-[20px] top-1 w-2.5 h-2.5 bg-[#c5c6cd] rounded-full border-2 border-white shadow-sm z-10"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-[#0b1c30]">
                    {lang === 'BN' ? 'ভিজিট শেষ হয়েছে' : 'Visit Ended'}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="bg-[#eff4ff] text-[#0b1c30] px-2 py-0.5 rounded border border-[#c5c6cd]/30 text-[9px] font-bold flex items-center gap-1">
                      <ShoppingBag size={10} />
                      ৳৪৫k {lang === 'BN' ? 'অর্ডার' : 'Order'}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-[#75777d] font-semibold">11:10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Manager Review Comments Box */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#c5c6cd]/30 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-[#0b1c30]">
              {lang === 'BN' ? 'ম্যানেজার রিভিউ' : 'Manager Review'}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-[#44474c]">
                {approved ? (lang === 'BN' ? 'অনুমোদিত' : 'Approved') : (lang === 'BN' ? 'অপেক্ষমান' : 'Pending')}
              </span>
              <button
                onClick={() => setApproved(!approved)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  approved ? 'bg-[#006c49]' : 'bg-[#c5c6cd]'
                }`}
                role="switch"
                aria-checked={approved}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    approved ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-[#eff4ff]/30 border border-[#c5c6cd]/50 rounded-xl p-3 text-xs focus:outline-none focus:border-[#006c49] min-h-[80px]"
            placeholder={lang === 'BN' ? 'আপনার মন্তব্য লিখুন...' : 'Write your comments here...'}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button className="flex-grow flex-1 bg-white text-[#44474c] border border-[#c5c6cd] font-semibold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#eff4ff] active:scale-95 transition-all">
            <FileText size={16} />
            <span>{lang === 'BN' ? 'রিপোর্ট দেখুন' : 'View Report'}</span>
          </button>
          <button className="flex-grow flex-1 bg-[#006c49] text-white font-semibold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#0c714d] active:scale-95 transition-all shadow-md">
            <BellRing size={16} />
            <span>{lang === 'BN' ? 'রিমাইন্ডার দিন' : 'Send Reminder'}</span>
          </button>
        </div>
      </main>
    </PhoneFrame>
  );
};
export default ManagerOfficerDetail;
