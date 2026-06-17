import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import {
  MapPin,
  Users,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  UserMinus,
  AlertCircle,
  MapPinOff,
  ChevronRight,
  Flag,
  Gauge
} from 'lucide-react';

const ProgressCircle: React.FC<{ percentage: number; color?: string }> = ({
  percentage,
  color = '#006c49'
}) => {
  const radius = 20;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="transparent"
          stroke={`${color}20`}
          strokeWidth="4"
        />
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#0b1c30]">
        {percentage}%
      </div>
    </div>
  );
};

export const ManagerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');

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
      collection: '৳15k',
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
      collection: '৳95k',
      coverage: '70%',
      status: lang === 'BN' ? 'সঠিক পথে' : 'On Track',
      statusType: 'success',
    }
  ];

  return (
    <PhoneFrame>
      <AppHeader
        title={lang === 'BN' ? 'ম্যানেজার ড্যাশবোর্ড' : 'Manager Dashboard'}
        subtitle={lang === 'BN' ? 'ঢাকা দক্ষিণ অঞ্চল' : 'Dhaka South Territory'}
        syncTime="১০:৪৫ AM"
        showGPSStatus={false}
        lang={lang}
        onLanguageToggle={toggleLanguage}
      />

      <main className="flex-grow space-y-6 px-4 overflow-y-auto pb-6">
        {/* Territory Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-[#c5c6cd]/30 shadow-sm">
          <div className="flex items-center gap-2">
            <MapPin className="text-[#006c49]" size={20} />
            <div>
              <h2 className="text-sm font-bold text-[#0b1c30]">
                {lang === 'BN' ? 'ঢাকা দক্ষিণ' : 'Dhaka South'}
              </h2>
              <p className="text-[10px] text-[#44474c]">
                {lang === 'BN' ? 'টেরিটরির অবস্থা' : 'Territory Status'}
              </p>
            </div>
          </div>
          <span className="text-[10px] text-[#44474c]">
            {lang === 'BN' ? 'আপডেট: আজ ১০:৪৫ AM' : 'Updated: Today 10:45 AM'}
          </span>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* KPI 1 */}
          <div className="bg-white rounded-xl p-3 border border-[#c5c6cd]/30 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-medium text-[#44474c] leading-tight">
                {lang === 'BN' ? 'ডিউটিতে আছে' : 'On Duty'}
              </span>
              <div className="bg-[#eff4ff] p-1 rounded-md text-[#0b1c30]">
                <Users size={16} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-bold text-[#0b1c30]">১২</span>
                <span className="text-xs text-[#75777d]">/১৫</span>
              </div>
              <div className="w-full bg-[#eff4ff] h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#006c49] h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-white rounded-xl p-3 border border-[#c5c6cd]/30 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-medium text-[#44474c] leading-tight">
                {lang === 'BN' ? 'সেলস লক্ষ্য' : 'Sales Target'}
              </span>
              <TrendingUp size={16} className="text-[#006c49]" />
            </div>
            <div className="flex flex-col items-center">
              <ProgressCircle percentage={78} />
              <span className="text-[10px] text-[#006c49] font-semibold mt-1">
                {lang === 'BN' ? 'সঠিক পথে' : 'On track'}
              </span>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-white rounded-xl p-3 border-l-4 border-l-[#ba1a1a] border border-[#c5c6cd]/30 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-medium text-[#44474c] leading-tight">
                {lang === 'BN' ? 'কালেকশন' : 'Collection'}
              </span>
              <AlertTriangle size={16} className="text-[#ba1a1a]" />
            </div>
            <div className="flex flex-col items-center">
              <ProgressCircle percentage={62} color="#ba1a1a" />
              <span className="text-[10px] text-[#ba1a1a] font-semibold mt-1">
                {lang === 'BN' ? 'লক্ষ্যের নিচে' : 'Below target'}
              </span>
            </div>
          </div>
        </div>

        {/* Exception Alerts */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-[#0b1c30] flex items-center gap-1.5">
            <AlertCircle className="text-[#ba1a1a]" size={18} />
            <span>{lang === 'BN' ? 'জরুরি অ্যালার্ট' : 'Emergency Alerts'}</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#ffdad6] text-[#93000a] p-3 rounded-xl flex items-start gap-2 shadow-sm border border-[#ba1a1a]/15">
              <UserMinus size={18} className="shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold leading-tight">
                  {lang === 'BN' ? '৩ জনের কাজ কম' : '3 Inactive Officers'}
                </h4>
                <p className="text-[10px] opacity-80 mt-0.5">
                  {lang === 'BN' ? 'শেষ সক্রিয়তা > ২ ঘণ্টা' : 'Last active > 2h'}
                </p>
              </div>
            </div>

            <div className="bg-[#ffdad6] text-[#93000a] p-3 rounded-xl flex items-start gap-2 shadow-sm border border-[#ba1a1a]/15">
              <AlertTriangle size={18} className="shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold leading-tight">
                  {lang === 'BN' ? 'বকেয়া ফলো-আপ বাকি' : 'Pending Followups'}
                </h4>
                <p className="text-[10px] opacity-80 mt-0.5">
                  {lang === 'BN' ? '৫টি গুরুত্বপূর্ণ অ্যাকাউন্ট' : '5 critical accounts'}
                </p>
              </div>
            </div>

            <div className="bg-[#ffdad6] text-[#93000a] p-3 rounded-xl flex items-start gap-2 shadow-sm border border-[#ba1a1a]/15">
              <MapPinOff size={18} className="shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold leading-tight">
                  {lang === 'BN' ? 'লোকেশন মিলছে না' : 'Location Mismatch'}
                </h4>
                <p className="text-[10px] opacity-80 mt-0.5">
                  {lang === 'BN' ? '২ জন রুট এর বাইরে' : '2 officers off-route'}
                </p>
              </div>
            </div>

            <div className="bg-[#ffdad6] text-[#93000a] p-3 rounded-xl flex items-start gap-2 shadow-sm border border-[#ba1a1a]/15">
              <Gauge size={18} className="shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold leading-tight">
                  {lang === 'BN' ? 'লো প্রোডাক্টিভিটি' : 'Low Productivity'}
                </h4>
                <p className="text-[10px] opacity-80 mt-0.5">
                  {lang === 'BN' ? '৪ জনের আউটপুট কম' : '4 low outputs'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Officers Overview */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-[#0b1c30]">
              {lang === 'BN' ? 'সেলস অফিসারদের তালিকা' : 'Sales Officers Overview'}
            </h3>
            <button className="text-xs font-semibold text-[#006c49] flex items-center gap-0.5 hover:underline">
              <span>{lang === 'BN' ? 'সব দেখুন' : 'View All'}</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {officers.map((officer) => (
              <div
                key={officer.id}
                onClick={() => navigate(`/manager/officer/${officer.id}`)}
                className={`bg-white rounded-xl p-4 flex flex-col gap-3 border border-[#c5c6cd]/30 shadow-sm hover:border-[#006c49]/50 active:scale-[0.98] transition-all cursor-pointer border-l-4 ${
                  officer.statusType === 'danger' ? 'border-l-[#ba1a1a]' : 'border-l-[#006c49]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#0b1c30] flex items-center justify-center font-bold text-sm">
                      {officer.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0b1c30] flex items-center gap-1.5">
                        {officer.name}
                        {officer.statusType === 'danger' ? (
                          <Flag size={14} className="text-[#ba1a1a] fill-[#ba1a1a]" />
                        ) : (
                          <CheckCircle2 size={14} className="text-[#006c49] fill-[#006c49]/10" />
                        )}
                      </h4>
                      <p className="text-[10px] text-[#44474c] flex items-center gap-0.5 mt-0.5">
                        <MapPin size={10} />
                        {officer.location}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      officer.statusType === 'danger'
                        ? 'bg-[#ffdad6] text-[#93000a]'
                        : 'bg-[#9af2c5] text-[#0c714d]'
                    }`}
                  >
                    {officer.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-[#c5c6cd]/20 pt-2 text-center">
                  <div>
                    <span className="text-[9px] text-[#75777d] block">
                      {lang === 'BN' ? 'ভিজিট' : 'Visits'}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        officer.statusType === 'danger' ? 'text-[#ba1a1a]' : 'text-[#006c49]'
                      }`}
                    >
                      {officer.visits}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#75777d] block">
                      {lang === 'BN' ? 'কালেকশন' : 'Collection'}
                    </span>
                    <span className="text-xs font-bold text-[#0b1c30]">{officer.collection}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#75777d] block">
                      {lang === 'BN' ? 'কভারেজ' : 'Coverage'}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        officer.statusType === 'danger' ? 'text-[#ba1a1a]' : 'text-[#006c49]'
                      }`}
                    >
                      {officer.coverage}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </PhoneFrame>
  );
};
export default ManagerDashboard;
