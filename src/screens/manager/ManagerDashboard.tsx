import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../../components/PhoneFrame';
import { AppHeader } from '../../components/AppHeader';
import { BottomNav } from '../../components/BottomNav';
import {
  MapPin,
  Users,
  TrendingUp,
  AlertTriangle,
  FileText,
  Activity,
  CheckCircle2,
  Camera,
  AlertCircle,
  MapPinOff,
  UserX,
  ArrowRight,
  TrendingDown,
  MessageSquare
} from 'lucide-react';

const ProgressCircle: React.FC<{ percentage: number; color?: string }> = ({
  percentage,
  color = '#006c49'
}) => {
  const radius = 18;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="transparent"
          stroke={`${color}20`}
          strokeWidth="3.5"
        />
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth="3.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-[#0b1c30]">
        {percentage}%
      </div>
    </div>
  );
};

export const ManagerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [syncTime, setSyncTime] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  // Set initial sync time based on language
  useEffect(() => {
    setSyncTime(lang === 'BN' ? '১০:৪৫ AM' : '10:45 AM');
  }, [lang]);

  const showToastMessage = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSyncTime(lang === 'BN' ? 'এখনই (Just Now)' : 'Just Now');
      showToastMessage(
        lang === 'BN' 
          ? 'ডাটা সফলভাবে রিফ্রেশ করা হয়েছে! (ERP/GPS/Activity সোর্স আপ-টু-ডেট)' 
          : 'Data successfully refreshed from ERP/GPS/Activity mock sources!'
      );
    }, 800);
  };

  const handleHealthChipClick = (source: string) => {
    showToastMessage(
      lang === 'BN'
        ? `${source} ডাটা সোর্স সক্রিয় এবং সঠিক অবস্থানে আছে।`
        : `${source} data source is healthy and active.`
    );
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  const officers = [
    {
      id: 'rahim-ahmed',
      name: 'Rahim Ahmed',
      initials: 'RA',
      location: lang === 'BN' ? 'গুলিস্তান মার্কেট' : 'Gulistan Market',
      visits: '3/20',
      collection: '৳15,000',
      coverage: '15%',
      status: lang === 'BN' ? 'উচ্চ ঝুঁকি' : 'High Risk',
      statusType: 'danger',
    },
    {
      id: 'kamrul-hasan',
      name: 'Kamrul Hasan',
      initials: 'KH',
      location: lang === 'BN' ? 'মতিঝিল সি/এ' : 'Motijheel C/A',
      visits: '14/20',
      collection: '৳95,000',
      coverage: '70%',
      status: lang === 'BN' ? 'সঠিক পথে' : 'On Track',
      statusType: 'success',
    }
  ];

  return (
    <PhoneFrame>
      <AppHeader
        title={lang === 'BN' ? 'ম্যানেজার ড্যাশবোর্ড' : 'Manager Dashboard'}
        subtitle={lang === 'BN' ? 'টেরিটরি কমান্ড সেন্টার' : 'Territory Command Center'}
        syncTime={syncTime}
        showGPSStatus={false}
        lang={lang}
        onLanguageToggle={toggleLanguage}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <main className="flex-grow space-y-5 px-4 overflow-y-auto pb-6">
        {/* Territory Indicator */}
        <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-[#c5c6cd]/30 shadow-sm">
          <div className="flex items-center gap-2">
            <MapPin className="text-[#006c49]" size={18} />
            <div>
              <h2 className="text-xs font-bold text-[#0b1c30] flex items-center gap-1">
                {lang === 'BN' ? 'ঢাকা দক্ষিণ' : 'Dhaka South'}
                <span className="text-[10px] text-[#44474c] font-normal">(Dhaka South)</span>
              </h2>
              <p className="text-[9px] text-[#75777d]">
                {lang === 'BN' ? 'টেরিটরির সামগ্রিক অবস্থা' : 'Overall Territory Status'}
              </p>
            </div>
          </div>
          <span className="text-[9px] text-[#75777d] font-semibold bg-[#eff4ff] px-2.5 py-0.5 rounded-full border border-[#c5c6cd]/20">
            {lang === 'BN' ? 'ঢাকা জোন' : 'Dhaka Zone'}
          </span>
        </div>

        {/* Data Source Health Card */}
        <section className="bg-white rounded-2xl p-4 border border-[#c5c6cd]/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#eff4ff] pb-2">
            <h3 className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
              <Activity size={15} className="text-[#006c49]" />
              <span>{lang === 'BN' ? 'ডাটা সোর্স হেলথ চেক' : 'Data Source Health Check'}</span>
            </h3>
            <span className="text-[9px] text-[#006c49] font-bold bg-[#9af2c5]/25 px-2 py-0.5 rounded-full">
              {lang === 'BN' ? 'সক্রিয়' : 'Active'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <button 
              onClick={() => handleHealthChipClick(lang === 'BN' ? 'ERP সিঙ্ক' : 'ERP Sync')}
              className="flex items-center gap-1.5 bg-[#f8f9ff] p-2 rounded-xl border border-[#c5c6cd]/10 text-left hover:bg-[#eff4ff] active:scale-95 transition-all outline-none"
            >
              <CheckCircle2 size={13} className="text-[#006c49]" />
              <span className="text-[#44474c]">{lang === 'BN' ? 'ERP সিঙ্ক সম্পন্ন' : 'ERP Synced'}</span>
            </button>
            <button 
              onClick={() => handleHealthChipClick(lang === 'BN' ? 'GPS লাইভ ট্র্যাকিং' : 'GPS Tracking')}
              className="flex items-center gap-1.5 bg-[#f8f9ff] p-2 rounded-xl border border-[#c5c6cd]/10 text-left hover:bg-[#eff4ff] active:scale-95 transition-all outline-none"
            >
              <CheckCircle2 size={13} className="text-[#006c49]" />
              <span className="text-[#44474c]">{lang === 'BN' ? 'GPS লাইভ ট্র্যাকিং' : 'GPS Live'}</span>
            </button>
            <button 
              onClick={() => handleHealthChipClick(lang === 'BN' ? 'উপস্থিতি ম্যাচ' : 'Attendance Matching')}
              className="flex items-center gap-1.5 bg-[#f8f9ff] p-2 rounded-xl border border-[#c5c6cd]/10 text-left hover:bg-[#eff4ff] active:scale-95 transition-all outline-none"
            >
              <CheckCircle2 size={13} className="text-[#006c49]" />
              <span className="text-[#44474c]">{lang === 'BN' ? 'উপস্থিতি ম্যাচড' : 'Attendance Matched'}</span>
            </button>
            <button 
              onClick={() => handleHealthChipClick(lang === 'BN' ? 'অ্যাক্টিভিটি আপডেট' : 'Activity Log')}
              className="flex items-center gap-1.5 bg-[#f8f9ff] p-2 rounded-xl border border-[#c5c6cd]/10 text-left hover:bg-[#eff4ff] active:scale-95 transition-all outline-none"
            >
              <CheckCircle2 size={13} className="text-[#006c49]" />
              <span className="text-[#44474c]">{lang === 'BN' ? 'অ্যাক্টিভিটি আপডেট' : 'Activity Updated'}</span>
            </button>
          </div>
          <button 
            onClick={() => navigate('/manager/reports')}
            className="w-full bg-[#eff4ff] p-2 rounded-xl border border-[#c5c6cd]/25 flex items-center justify-between text-[10px] font-semibold mt-1 hover:bg-[#dce9ff] active:scale-95 transition-all outline-none"
          >
            <span className="text-[#0b1c30] flex items-center gap-1">
              <Camera size={13} className="text-[#0c714d]" />
              {lang === 'BN' ? 'ছবি প্রমাণ ভেরিফিকেশন হার' : 'Photo Proof Compliance'}
            </span>
            <span className="text-[#0c714d] text-xs font-bold">৭৮%</span>
          </button>
        </section>

        {/* KPI Grid */}
        <section className="space-y-2.5">
          <h3 className="text-xs font-bold text-[#0b1c30] px-1 uppercase tracking-wider">
            {lang === 'BN' ? 'মূল পারফরম্যান্স সূচক' : 'Key Performance Indicators'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {/* KPI 1: Active Officers */}
            <button 
              onClick={() => navigate('/manager/officer/demo-officer')}
              className="bg-white rounded-2xl p-3 border border-[#c5c6cd]/30 shadow-sm flex flex-col justify-between h-28 text-left hover:border-[#006c49]/40 active:scale-[0.98] transition-all outline-none"
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-[10px] font-bold text-[#44474c] leading-tight">
                  {lang === 'BN' ? 'ডিউটিতে সক্রিয়' : 'Active Officers'}
                </span>
                <div className="bg-[#eff4ff] p-1 rounded-lg text-[#0b1c30]">
                  <Users size={14} />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xl font-bold text-[#0b1c30]">১২</span>
                  <span className="text-xs text-[#75777d]">/১৫</span>
                </div>
                <div className="w-full bg-[#eff4ff] h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#006c49] h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </button>

            {/* KPI 2: Sales Target */}
            <button 
              onClick={() => navigate('/manager/reports')}
              className="bg-white rounded-2xl p-3 border border-[#c5c6cd]/30 shadow-sm flex flex-col justify-between h-28 text-left hover:border-[#006c49]/40 active:scale-[0.98] transition-all outline-none"
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-[10px] font-bold text-[#44474c] leading-tight">
                  {lang === 'BN' ? 'টেরিটরি সেলস লক্ষ্য' : 'Sales Target'}
                </span>
                <TrendingUp size={14} className="text-[#006c49]" />
              </div>
              <div className="flex items-center gap-2">
                <ProgressCircle percentage={78} />
                <div>
                  <span className="text-[9px] text-[#006c49] font-bold block">
                    {lang === 'BN' ? 'সক্রিয় পথে' : 'On Track'}
                  </span>
                  <span className="text-[8px] text-[#75777d] block">
                    {lang === 'BN' ? 'টার্গেট ৭৮% পূরণ' : '78% of Target'}
                  </span>
                </div>
              </div>
            </button>

            {/* KPI 3: Collection Target */}
            <button 
              onClick={() => navigate('/manager/risks?filter=collection')}
              className="bg-white rounded-2xl p-3 border border-[#c5c6cd]/30 shadow-sm flex flex-col justify-between h-28 text-left border-l-4 border-l-[#ba1a1a] hover:border-[#ba1a1a]/40 active:scale-[0.98] transition-all outline-none"
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-[10px] font-bold text-[#44474c] leading-tight">
                  {lang === 'BN' ? 'বকেয়া কালেকশন' : 'Collection Target'}
                </span>
                <AlertTriangle size={14} className="text-[#ba1a1a]" />
              </div>
              <div className="flex items-center gap-2">
                <ProgressCircle percentage={62} color="#ba1a1a" />
                <div>
                  <span className="text-[9px] text-[#ba1a1a] font-bold block">
                    {lang === 'BN' ? 'লক্ষ্যের নিচে' : 'Below Target'}
                  </span>
                  <span className="text-[8px] text-[#75777d] block">
                    {lang === 'BN' ? 'টার্গেট ৬২% পূরণ' : '62% of Target'}
                  </span>
                </div>
              </div>
            </button>

            {/* KPI 4: Coverage and Risks */}
            <button 
              onClick={() => navigate('/manager/territory')}
              className="bg-white rounded-2xl p-3 border border-[#c5c6cd]/30 shadow-sm flex flex-col justify-between h-28 text-left hover:border-[#006c49]/40 active:scale-[0.98] transition-all outline-none"
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-[10px] font-bold text-[#44474c] leading-tight">
                  {lang === 'BN' ? 'রুট কভারেজ ও ঝুঁকি' : 'Coverage & Risks'}
                </span>
                <FileText size={14} className="text-[#75777d]" />
              </div>
              <div>
                <div className="flex justify-between items-center text-[10px] mb-1">
                  <span className="text-[#75777d]">{lang === 'BN' ? 'কভারেজ:' : 'Coverage:'}</span>
                  <span className="font-bold text-[#0b1c30]">৮৫%</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-[#75777d]">{lang === 'BN' ? 'ঝুঁকিপূর্ণ ডিলার:' : 'Risky Dealers:'}</span>
                  <span className="font-bold text-[#ba1a1a] bg-[#ffdad6] px-1.5 py-0.2 rounded-full text-[9px]">৩ জন</span>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Urgent Exception Alerts */}
        <section className="space-y-2.5">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-[#0b1c30] flex items-center gap-1">
              <AlertCircle className="text-[#ba1a1a]" size={16} />
              <span>{lang === 'BN' ? 'জরুরি এক্সেপশন অ্যালার্ট' : 'Urgent Exceptions'}</span>
            </h3>
            <button
              onClick={() => navigate('/manager/risks')}
              className="text-[10px] font-bold text-[#006c49] flex items-center gap-0.5 hover:underline outline-none"
            >
              <span>{lang === 'BN' ? 'রিভিউ করুন' : 'Review'}</span>
              <ArrowRight size={10} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => navigate('/manager/officer/rahim-ahmed')}
              className="bg-[#ffdad6] text-[#93000a] p-3 rounded-xl flex items-start gap-1.5 shadow-sm border border-[#ba1a1a]/15 text-left hover:bg-[#ffdad6]/80 active:scale-95 transition-all outline-none"
            >
              <UserX size={15} className="shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[10px] font-bold leading-tight">
                  {lang === 'BN' ? '৩ জনের কাজ কম' : '3 Inactive FSOs'}
                </h4>
                <p className="text-[8px] opacity-80 mt-0.5">
                  {lang === 'BN' ? 'নিষ্ক্রিয়তা > ২ ঘণ্টা' : 'No activity > 2 hrs'}
                </p>
              </div>
            </button>

            <button 
              onClick={() => navigate('/manager/risks?filter=collection')}
              className="bg-[#ffdad6] text-[#93000a] p-3 rounded-xl flex items-start gap-1.5 shadow-sm border border-[#ba1a1a]/15 text-left hover:bg-[#ffdad6]/80 active:scale-95 transition-all outline-none"
            >
              <AlertTriangle size={15} className="shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[10px] font-bold leading-tight">
                  {lang === 'BN' ? 'বকেয়া ফলো-আপ' : 'Overdue Followups'}
                </h4>
                <p className="text-[8px] opacity-80 mt-0.5">
                  {lang === 'BN' ? '৫টি গুরুত্বপূর্ণ ডিলার' : '5 critical accounts'}
                </p>
              </div>
            </button>

            <button 
              onClick={() => navigate('/manager/risks?filter=gps')}
              className="bg-[#ffdad6] text-[#93000a] p-3 rounded-xl flex items-start gap-1.5 shadow-sm border border-[#ba1a1a]/15 text-left hover:bg-[#ffdad6]/80 active:scale-95 transition-all outline-none"
            >
              <MapPinOff size={15} className="shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[10px] font-bold leading-tight">
                  {lang === 'BN' ? 'GPS লোকেশন অমিল' : 'GPS Deviation'}
                </h4>
                <p className="text-[8px] opacity-80 mt-0.5">
                  {lang === 'BN' ? '২ জন রুটের বাইরে' : '2 officers off-route'}
                </p>
              </div>
            </button>

            <button 
              onClick={() => navigate('/manager/reports')}
              className="bg-[#ffdad6] text-[#93000a] p-3 rounded-xl flex items-start gap-1.5 shadow-sm border border-[#ba1a1a]/15 text-left hover:bg-[#ffdad6]/80 active:scale-95 transition-all outline-none"
            >
              <Camera size={15} className="shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[10px] font-bold leading-tight">
                  {lang === 'BN' ? 'ছবি প্রমাণ বাকি' : 'Photo Pending'}
                </h4>
                <p className="text-[8px] opacity-80 mt-0.5">
                  {lang === 'BN' ? '৪টি কমপ্লিট ভিজিট' : '4 visits need proof'}
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* Market Insights & Feedback */}
        <section className="bg-white rounded-2xl p-4 border border-[#c5c6cd]/30 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5 border-b border-[#eff4ff] pb-2">
            <MessageSquare size={14} className="text-[#0e1c2f]" />
            <span>{lang === 'BN' ? 'বাজারের তথ্য ও ফিডব্যাক' : 'Market Insights & Feedback'}</span>
          </h3>

          <div className="space-y-2.5 text-[10px]">
            {/* Display Photos */}
            <div className="flex items-start gap-2 bg-[#f8f9ff] p-2.5 rounded-xl border border-[#c5c6cd]/10 justify-between">
              <div className="flex items-start gap-2">
                <Camera size={14} className="text-[#006c49] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#0b1c30]">{lang === 'BN' ? 'সর্বশেষ ছবি প্রমাণ (পণ্য ডিসপ্লে)' : 'Latest Display Photo Proof'}</p>
                  <p className="text-[#44474c] mt-0.5">{lang === 'BN' ? 'রহমান ট্রেডার্স-এ নতুন ডিসপ্লে সেটআপ সম্পন্ন।' : 'New product display setup at Rahman Traders verified.'}</p>
                </div>
              </div>
              <button 
                onClick={() => showToastMessage(lang === 'BN' ? 'পণ্য ডিসপ্লে ছবি অনুমোদিত!' : 'Display photo proof verified!')}
                className="bg-[#006c49] text-white px-2 py-1 rounded text-[8px] font-semibold hover:bg-[#0c714d] active:scale-95 transition-all shrink-0 self-center outline-none"
              >
                {lang === 'BN' ? 'রিভিউ' : 'Review'}
              </button>
            </div>

            {/* Competitor Activity */}
            <div className="flex items-start gap-2 bg-[#f8f9ff] p-2.5 rounded-xl border border-[#c5c6cd]/10 justify-between">
              <div className="flex items-start gap-2">
                <TrendingDown size={14} className="text-[#ba1a1a] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#0b1c30]">{lang === 'BN' ? 'প্রতিযোগীদের কার্যক্রম অ্যালার্ট' : 'Competitor Activity Alert'}</p>
                  <p className="text-[#44474c] mt-0.5">{lang === 'BN' ? 'Brand X ১০% অতিরিক্ত ছাড় দিচ্ছে নর্থ জোনে।' : 'Brand X offering 10% extra discount in North Zone.'}</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/manager/reports')}
                className="bg-[#0b1c30] text-white px-2 py-1 rounded text-[8px] font-semibold hover:opacity-90 active:scale-95 transition-all shrink-0 self-center outline-none"
              >
                {lang === 'BN' ? 'অ্যাকশন' : 'Action'}
              </button>
            </div>

            {/* Dealer Complaints */}
            <div className="flex items-start gap-2 bg-[#f8f9ff] p-2.5 rounded-xl border border-[#c5c6cd]/10 justify-between">
              <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-[#75777d] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#0b1c30]">{lang === 'BN' ? 'ডিলার অভিযোগ' : 'Dealer Complaint'}</p>
                  <p className="text-[#44474c] mt-0.5">{lang === 'BN' ? 'সাউথ জোনে ডেলিভারি দেরির অভিযোগ সমাধান সাপেক্ষ।' : 'Delivery delay complaint at Karim Paint House pending.'}</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/manager/risks')}
                className="bg-[#0b1c30] text-white px-2 py-1 rounded text-[8px] font-semibold hover:opacity-90 active:scale-95 transition-all shrink-0 self-center outline-none"
              >
                {lang === 'BN' ? 'রিভিউ' : 'Review'}
              </button>
            </div>
          </div>
        </section>

        {/* Officers List Overview */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-[#0b1c30] px-1 uppercase tracking-wider">
              {lang === 'BN' ? 'সেলস অফিসারদের তালিকা' : 'Sales Officers Overview'}
            </h3>
          </div>

          <div className="space-y-3">
            {officers.map((officer) => (
              <button
                key={officer.id}
                onClick={() => navigate(`/manager/officer/${officer.id}`)}
                className={`w-full text-left bg-white rounded-2xl p-4 flex flex-col gap-3 border border-[#c5c6cd]/30 shadow-sm hover:border-[#006c49]/50 active:scale-[0.98] transition-all cursor-pointer border-l-4 outline-none ${
                  officer.statusType === 'danger' ? 'border-l-[#ba1a1a]' : 'border-l-[#006c49]'
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#0b1c30] flex items-center justify-center font-bold text-sm border border-[#c5c6cd]/10">
                      {officer.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0b1c30] flex items-center gap-1">
                        {officer.name}
                        {officer.statusType === 'danger' ? (
                          <AlertTriangle size={13} className="text-[#ba1a1a]" />
                        ) : (
                          <CheckCircle2 size={13} className="text-[#006c49]" />
                        )}
                      </h4>
                      <p className="text-[9px] text-[#44474c] flex items-center gap-0.5 mt-0.5">
                        <MapPin size={9} />
                        {officer.location}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${
                      officer.statusType === 'danger'
                        ? 'bg-[#ffdad6] text-[#93000a]'
                        : 'bg-[#9af2c5] text-[#0c714d]'
                    }`}
                  >
                    {officer.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-[#eff4ff] pt-2.5 text-center w-full">
                  <div>
                    <span className="text-[8px] text-[#75777d] block uppercase">
                      {lang === 'BN' ? 'ভিজিট' : 'Visits'}
                    </span>
                    <span
                      className={`text-[11px] font-bold ${
                        officer.statusType === 'danger' ? 'text-[#ba1a1a]' : 'text-[#006c49]'
                      }`}
                    >
                      {officer.visits}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] text-[#75777d] block uppercase">
                      {lang === 'BN' ? 'কালেকশন' : 'Collection'}
                    </span>
                    <span className="text-[11px] font-bold text-[#0b1c30]">{officer.collection}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-[#75777d] block uppercase">
                      {lang === 'BN' ? 'কভারেজ' : 'Coverage'}
                    </span>
                    <span
                      className={`text-[11px] font-bold ${
                        officer.statusType === 'danger' ? 'text-[#ba1a1a]' : 'text-[#006c49]'
                      }`}
                    >
                      {officer.coverage}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Toast Notification */}
      {toast.visible && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[100] bg-[#0b1c30]/95 text-white px-4 py-3 rounded-xl shadow-xl border border-white/10 text-[11px] font-semibold transition-all duration-300 w-[90%] text-center backdrop-blur-md animate-fade-in">
          {toast.message}
        </div>
      )}

      <BottomNav />
    </PhoneFrame>
  );
};
export default ManagerDashboard;
