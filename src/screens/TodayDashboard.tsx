import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { AppHeader } from '../components/AppHeader';
import { ProgressRing } from '../components/ProgressRing';
import { MetricCard } from '../components/MetricCard';
import { BottomNav } from '../components/BottomNav';
import { AlertCircle, Store, TrendingDown, Calendar, Package, ArrowRight, Filter, Truck, Users } from 'lucide-react';

export const TodayDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [activeFilter, setActiveFilter] = useState<'dues' | 'drop' | 'nearby'>('dues');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  const handleStartVisit = () => {
    // Navigate to visit preparation screen for Rahman Traders (dealer ID 1)
    navigate('/visit-prep/1');
  };

  return (
    <PhoneFrame>
      <AppHeader
        title={lang === 'BN' ? 'শুভ সকাল, আরিফ' : 'Good Morning, Arif'}
        subtitle={lang === 'BN' ? 'সেলস কো-পাইলট ড্যাশবোর্ড' : 'Sales Co-Pilot Dashboard'}
        syncTime="২ মিনিট আগে"
        showGPSStatus={true}
        lang={lang}
        onLanguageToggle={toggleLanguage}
      />

      <main className="flex-grow space-y-6 px-4 overflow-y-auto pb-6">
        {/* Target Card (Circular Progress) */}
        <ProgressRing
          percentage={45}
          label={lang === 'BN' ? 'আজকের টার্গেট' : 'Today\'s Target'}
          sublabel={lang === 'BN' ? 'আরও ৫৫% পূরণ করতে হবে' : '55% more to complete'}
          size={80}
          strokeWidth={8}
        />

        {/* Main Recommendation: Highlight Card */}
        <div className="relative bg-[#0e1c2f] rounded-[20px] p-6 shadow-md overflow-hidden text-white border border-[#eff4ff]/10">
          {/* Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#006c49]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Badge and Title */}
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="inline-flex items-center gap-1 bg-[#ba1a1a] text-white font-semibold text-[11px] px-2.5 py-1 rounded-full shadow-sm">
                  <AlertCircle size={13} className="shrink-0" />
                  <span>{lang === 'BN' ? '৳৮৫,০০০ বকেয়া' : '৳85,000 Overdue'}</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Store size={18} className="text-white shrink-0" />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="inline-flex items-center gap-1 bg-white/10 text-white font-semibold text-[10px] px-2 py-0.5 rounded-full border border-white/10">
                  <TrendingDown size={12} className="shrink-0" />
                  {lang === 'BN' ? 'সেলস ৩৫% কমেছে' : 'Sales down 35%'}
                </span>
                <span className="inline-flex items-center gap-1 bg-white/10 text-white font-semibold text-[10px] px-2 py-0.5 rounded-full border border-white/10">
                  <Calendar size={12} className="shrink-0" />
                  {lang === 'BN' ? '১২ দিন আগে শেষ ভিজিট' : 'Last visit 12d ago'}
                </span>
              </div>
              <div className="mt-1 inline-flex items-center gap-1 text-[#9af2c5] font-semibold text-[11px]">
                <Package size={14} className="shrink-0" />
                <span>{lang === 'BN' ? 'পণ্য অফার করুন: Exterior Paint' : 'Offer Product: Exterior Paint'}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-4">
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
              {lang === 'BN' ? 'স্মার্ট সুপারিশ' : 'Smart Recommendation'}
            </p>
            <h3 className="text-lg font-bold text-white mt-1">
              {lang === 'BN' ? 'আগে রহমান ট্রেডার্স-এ যান' : 'Visit Rahman Traders first'}
            </h3>
            
            <div className="bg-white/10 rounded-lg p-3 my-4 border border-white/10">
              <p className="text-[11px] font-bold text-white/60 mb-0.5">
                {lang === 'BN' ? 'কেন আগে যাবেন?' : 'Why visit first?'}
              </p>
              <p className="text-xs text-white/90">
                {lang === 'BN'
                  ? '৳৮৫,০০০ বকেয়া এবং সেলস ৩৫% কমেছে। দ্রুত রিকভারি প্রয়োজন।'
                  : '৳85,000 outstanding dues and sales dropped by 35%. Critical action required.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleStartVisit}
            className="relative z-10 w-full bg-[#006c49] text-white font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#0c714d] active:scale-95 transition-all shadow-lg"
          >
            {lang === 'BN' ? 'ভিজিট শুরু করুন' : 'Start Visit Now'}
            <ArrowRight size={18} className="shrink-0" />
          </button>
        </div>

        {/* Filter Chips (Horizontal scrollable) */}
        <div className="flex overflow-x-auto gap-2 py-1 scrollbar-hide">
          <button
            onClick={() => setActiveFilter('dues')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition-all ${
              activeFilter === 'dues'
                ? 'bg-[#0e1c2f] text-white border-transparent shadow-sm'
                : 'bg-white text-[#44474c] border-[#c5c6cd]/30 hover:bg-[#eff4ff]'
            }`}
          >
            <Filter size={14} className="shrink-0" />
            {lang === 'BN' ? 'বকেয়া' : 'Dues'}
          </button>
          <button
            onClick={() => setActiveFilter('drop')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              activeFilter === 'drop'
                ? 'bg-[#0e1c2f] text-white border-transparent shadow-sm'
                : 'bg-white text-[#44474c] border-[#c5c6cd]/30 hover:bg-[#eff4ff]'
            }`}
          >
            {lang === 'BN' ? 'সেলস ড্রপ' : 'Sales Drop'}
          </button>
          <button
            onClick={() => setActiveFilter('nearby')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              activeFilter === 'nearby'
                ? 'bg-[#0e1c2f] text-white border-transparent shadow-sm'
                : 'bg-white text-[#44474c] border-[#c5c6cd]/30 hover:bg-[#eff4ff]'
            }`}
          >
            {lang === 'BN' ? 'কাছাকাছি' : 'Nearby'}
          </button>
        </div>

        {/* Grid Metric Cards */}
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            title={lang === 'BN' ? 'আজকের ভিজিট' : 'Today\'s Visits'}
            value={lang === 'BN' ? '৪টি পেন্ডিং' : '4 Pending'}
            icon={<Truck size={20} className="text-[#006c49] stroke-[2.5px]" />}
            onClick={() => navigate('/visit-plan')}
          />
          <MetricCard
            title={lang === 'BN' ? 'নতুন লিড' : 'New Leads'}
            value={lang === 'BN' ? '৩ জন নতুন' : '3 New'}
            icon={<Users size={20} className="text-[#0e1c2f] stroke-[2.5px]" />}
          />
        </div>
      </main>

      <BottomNav />
    </PhoneFrame>
  );
};
export default TodayDashboard;
