import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { Flame, Coins, TrendingDown, Store, Map, DollarSign, History, Play } from 'lucide-react';

interface DealerItem {
  id: string;
  name: string;
  location: string;
  distance: string;
  priorityScore: number;
  dues?: string;
  salesDrop?: string;
  lastVisit: string;
  type: 'urgent' | 'warning' | 'normal' | 'lead';
}

export const TodayVisitPlan: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [filter, setFilter] = useState<'all' | 'urgent' | 'dues' | 'drop'>('all');

  const dealers: DealerItem[] = [
    {
      id: '1',
      name: 'রহমান ট্রেডার্স',
      location: 'উত্তরা, ঢাকা',
      distance: '২.৫ কিমি',
      priorityScore: 92,
      dues: '৳৮৫,০০০ বকেয়া',
      salesDrop: 'সেলস ৩৫% কমেছে',
      lastVisit: '১২ দিন আগে শেষ ভিজিট',
      type: 'urgent'
    },
    {
      id: '2',
      name: 'মোল্লা এন্টারপ্রাইজ',
      location: 'টঙ্গী, গাজীপুর',
      distance: '৪.১ কিমি',
      priorityScore: 78,
      dues: '৳৪৫,০০০ বকেয়া',
      lastVisit: '৫ দিন আগে শেষ ভিজিট',
      type: 'warning'
    },
    {
      id: '3',
      name: 'জনতা হার্ডওয়্যার',
      location: 'মিরপুর, ঢাকা',
      distance: '১.৮ কিমি',
      priorityScore: 65,
      lastVisit: '৩ দিন আগে শেষ ভিজিট',
      type: 'normal'
    }
  ];

  const filteredDealers = dealers.filter((d) => {
    if (filter === 'all') return true;
    if (filter === 'urgent') return d.type === 'urgent';
    if (filter === 'dues') return !!d.dues;
    if (filter === 'drop') return !!d.salesDrop;
    return true;
  });

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  return (
    <PhoneFrame>
      <AppHeader
        title={lang === 'BN' ? 'আজকের ভিজিট প্ল্যান' : 'Today\'s Visit Plan'}
        subtitle={lang === 'BN' ? 'ডিলার অ্যাকশন লিস্ট' : 'Dealer Action List'}
        showGPSStatus={true}
        lang={lang}
        onLanguageToggle={toggleLanguage}
      />

      {/* Main Area */}
      <main className="flex-grow overflow-y-auto px-4 pb-6 space-y-4">
        {/* Filter Chips */}
        <div className="flex overflow-x-auto gap-2 py-1 scrollbar-hide">
          <button
            onClick={() => setFilter('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              filter === 'all'
                ? 'bg-[#0e1c2f] text-white border-transparent'
                : 'bg-white text-[#44474c] border-[#c5c6cd]/30'
            }`}
          >
            {lang === 'BN' ? 'সব ডিলার' : 'All Outlets'}
          </button>
          <button
            onClick={() => setFilter('urgent')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              filter === 'urgent'
                ? 'bg-[#ba1a1a] text-white border-transparent'
                : 'bg-white text-[#44474c] border-[#c5c6cd]/30'
            }`}
          >
            <Flame size={14} className="shrink-0 fill-current" />
            {lang === 'BN' ? 'জরুরি' : 'Urgent'}
          </button>
          <button
            onClick={() => setFilter('dues')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              filter === 'dues'
                ? 'bg-[#0e1c2f] text-white border-transparent'
                : 'bg-white text-[#44474c] border-[#c5c6cd]/30'
            }`}
          >
            <Coins size={14} className="shrink-0" />
            {lang === 'BN' ? 'বকেয়া কালেকশন' : 'Collections'}
          </button>
          <button
            onClick={() => setFilter('drop')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              filter === 'drop'
                ? 'bg-[#0e1c2f] text-white border-transparent'
                : 'bg-white text-[#44474c] border-[#c5c6cd]/30'
            }`}
          >
            <TrendingDown size={14} className="shrink-0" />
            {lang === 'BN' ? 'সেলস ড্রপ' : 'Sales Drops'}
          </button>
        </div>

        {/* Dealer list */}
        <section className="space-y-4">
          {filteredDealers.map((dealer) => {
            const badgeColor =
              dealer.type === 'urgent'
                ? 'bg-[#ba1a1a] text-white'
                : dealer.type === 'warning'
                ? 'bg-[#eff4ff] text-[#0e1c2f] border border-[#c5c6cd]'
                : 'bg-[#9af2c5] text-[#0c714d]';

            const iconBg =
              dealer.type === 'urgent'
                ? 'bg-[#ffdad6] text-[#ba1a1a]'
                : 'bg-[#eff4ff] text-[#0e1c2f]';

            return (
              <div
                key={dealer.id}
                className="bg-white rounded-2xl shadow-sm p-4 border border-[#e5eeff] relative overflow-hidden flex flex-col gap-3"
              >
                {/* Score badge top-right */}
                <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold shadow-sm ${badgeColor}`}>
                  Priority {dealer.priorityScore}
                </div>

                {/* Details */}
                <div className="flex gap-3 items-start mt-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-[#c5c6cd]/20 ${iconBg}`}>
                    <Store size={18} className="shrink-0" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#0b1c30] truncate">{dealer.name}</h3>
                    <p className="text-xs text-[#44474c] flex items-center gap-1 mt-0.5">
                      <Map size={12} className="shrink-0 text-[#75777d]" />
                      <span>{dealer.location} ({dealer.distance})</span>
                    </p>
                  </div>
                </div>

                {/* KPI highlights */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {dealer.dues && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#ffdad6] text-[#ba1a1a] border border-[#ffdad6]">
                      <DollarSign size={12} className="shrink-0" />
                      {dealer.dues}
                    </span>
                  )}
                  {dealer.salesDrop && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#2a1702]/10 text-[#5a4226] border border-[#2a1702]/10">
                      <TrendingDown size={12} className="shrink-0" />
                      {dealer.salesDrop}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#eff4ff] text-[#44474c] border border-[#c5c6cd]/30">
                    <History size={12} className="shrink-0" />
                    {dealer.lastVisit}
                  </span>
                </div>

                {/* Action button */}
                <div className="mt-2 pt-3 border-t border-[#eff4ff] flex justify-end">
                  <button
                    onClick={() => navigate(`/visit-prep/${dealer.id}`)}
                    className="bg-[#0e1c2f] text-white rounded-lg py-2.5 px-4 font-bold text-xs hover:bg-[#213145] active:scale-95 transition-all shadow-sm flex items-center gap-1 justify-center w-full"
                  >
                    <Play size={14} className="shrink-0 fill-current" />
                    {lang === 'BN' ? 'ভিজিট শুরু করুন' : 'Start Visit'}
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </main>

      <BottomNav />
    </PhoneFrame>
  );
};
export default TodayVisitPlan;
