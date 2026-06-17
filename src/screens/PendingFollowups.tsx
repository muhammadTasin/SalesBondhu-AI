import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, Phone, Store, Clock, Navigation, AlertCircle, AlertOctagon } from 'lucide-react';

interface FollowUpItem {
  id: string;
  dealerName: string;
  category: 'collection' | 'potential' | 'complaint' | 'manager';
  subtitle: string;
  priorityText: string;
  priorityLevel: 'urgent' | 'warning' | 'normal';
  amount?: string;
  comment?: string;
}

export const PendingFollowups: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [activeTab, setActiveTab] = useState<'all' | 'collection' | 'potential' | 'complaint' | 'manager'>('all');

  const followups: FollowUpItem[] = [
    {
      id: '1',
      dealerName: 'রহমান ট্রেডার্স',
      category: 'collection',
      subtitle: 'কালেকশন ফলো-আপ',
      priorityText: 'আজকের মধ্যে',
      priorityLevel: 'urgent',
      amount: '৳৮৫,০০০'
    },
    {
      id: '2',
      dealerName: 'সুপারমার্ট',
      category: 'potential',
      subtitle: 'পটেনশিয়াল ডিলার',
      priorityText: '১৪ দিন বাকি',
      priorityLevel: 'warning',
      comment: '১৪ দিন ফলো-আপ হয়নি'
    },
    {
      id: '3',
      dealerName: 'হার্ডওয়্যার স্টোর',
      category: 'complaint',
      subtitle: 'কমপ্লেইন',
      priorityText: 'পেন্ডিং',
      priorityLevel: 'urgent',
      comment: 'ডেলিভারি কমপ্লেইন পেন্ডিং'
    }
  ];

  const filteredFollowups = followups.filter((f) => {
    if (activeTab === 'all') return true;
    return f.category === activeTab;
  });

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  const handleCall = (name: string) => {
    alert(lang === 'BN' ? `${name}-কে কল করা হচ্ছে...` : `Calling ${name}...`);
  };

  const handleReportManager = (name: string) => {
    alert(lang === 'BN' ? `ম্যানেজারকে ${name} এর কমপ্লেইন জানানো হয়েছে।` : `Reported ${name}'s complaint to manager.`);
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
              {lang === 'BN' ? 'বাকি ফলো-আপ' : 'Pending Follow-ups'}
            </h1>
            <p className="text-[10px] text-[#44474c] mt-0.5">
              {lang === 'BN' ? 'ফলো-আপ লিস্ট' : 'Actionable Follow-up List'}
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

      <main className="flex-grow overflow-y-auto pt-4 pb-20">
        {/* Horizontal scroll tabs */}
        <div className="flex overflow-x-auto gap-2 px-4 pb-2.5 scrollbar-hide shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-[#0e1c2f] text-white border-transparent'
                : 'bg-white text-[#44474c] border-[#c5c6cd]/40'
            }`}
          >
            {lang === 'BN' ? 'সব' : 'All'}
          </button>
          <button
            onClick={() => setActiveTab('collection')}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
              activeTab === 'collection'
                ? 'bg-[#0e1c2f] text-white border-transparent'
                : 'bg-white text-[#44474c] border-[#c5c6cd]/40'
            }`}
          >
            {lang === 'BN' ? 'কালেকশন' : 'Collections'}
          </button>
          <button
            onClick={() => setActiveTab('potential')}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
              activeTab === 'potential'
                ? 'bg-[#0e1c2f] text-white border-transparent'
                : 'bg-white text-[#44474c] border-[#c5c6cd]/40'
            }`}
          >
            {lang === 'BN' ? 'পটেনশিয়াল ডিলার' : 'Potential Dealers'}
          </button>
          <button
            onClick={() => setActiveTab('complaint')}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
              activeTab === 'complaint'
                ? 'bg-[#0e1c2f] text-white border-transparent'
                : 'bg-white text-[#44474c] border-[#c5c6cd]/40'
            }`}
          >
            {lang === 'BN' ? 'কমপ্লেইন' : 'Complaints'}
          </button>
        </div>

        {/* Task Cards list */}
        <div className="px-4 space-y-4 mt-2">
          {filteredFollowups.map((item) => {
            const sideColor = item.priorityLevel === 'urgent' ? 'bg-[#ba1a1a]' : 'bg-[#f59e0b]';
            const badgeBg = item.priorityLevel === 'urgent' ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#fef3c7] text-[#92400e]';
            
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff] relative overflow-hidden flex flex-col gap-3"
              >
                {/* Left accent strip */}
                <div className={`absolute top-0 left-0 w-1 h-full ${sideColor}`} />

                {/* Card Header info */}
                <div className="flex justify-between items-start mt-1">
                  <div>
                    <h2 className="text-sm font-bold text-[#0b1c30]">{item.dealerName}</h2>
                    <p className="text-[10px] font-semibold text-[#75777d] mt-0.5">{item.subtitle}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${badgeBg}`}>
                    {item.priorityLevel === 'urgent' ? <AlertCircle size={10} /> : <Clock size={10} />}
                    {item.priorityText}
                  </span>
                </div>

                {/* Middle details values */}
                {item.amount && (
                  <div className="bg-[#f8f9ff] rounded-xl p-3 border border-[#e5eeff] flex justify-between items-center">
                    <span className="text-xs text-[#75777d] font-semibold">বকেয়া:</span>
                    <span className="text-sm font-bold text-[#ba1a1a]">{item.amount}</span>
                  </div>
                )}

                {item.comment && (
                  <div className="bg-[#f8f9ff] rounded-xl p-3 border border-[#e5eeff]">
                    <p className="text-xs text-[#75777d] font-medium leading-relaxed">
                      {item.comment}
                    </p>
                  </div>
                )}

                {/* Bottom action triggers */}
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => handleCall(item.dealerName)}
                    className="flex-1 bg-[#eff4ff] text-[#0b1c30] font-bold text-xs py-3 rounded-full flex items-center justify-center gap-1.5 hover:bg-[#dce9ff] transition-colors active:scale-95 transition-transform border border-[#c5c6cd]/30"
                  >
                    <Phone size={14} className="shrink-0" />
                    {lang === 'BN' ? 'কল করুন' : 'Call'}
                  </button>

                  {item.category === 'collection' && (
                    <button
                      onClick={() => navigate('/visit-prep/1')}
                      className="flex-1 bg-[#006c49] text-white font-bold text-xs py-3 rounded-full flex items-center justify-center gap-1.5 shadow-md hover:bg-[#0c714d] active:scale-95 transition-transform"
                    >
                      <Store size={14} className="shrink-0" />
                      {lang === 'BN' ? 'ভিজিট করুন' : 'Visit'}
                    </button>
                  )}

                  {item.category === 'potential' && (
                    <button
                      onClick={() => navigate('/visit-prep/2')}
                      className="flex-1 bg-[#006c49] text-white font-bold text-xs py-3 rounded-full flex items-center justify-center gap-1.5 shadow-md hover:bg-[#0c714d] active:scale-95 transition-transform"
                    >
                      <Navigation size={14} className="shrink-0" />
                      {lang === 'BN' ? 'ভিজিট শুরু' : 'Start Visit'}
                    </button>
                  )}

                  {item.category === 'complaint' && (
                    <button
                      onClick={() => handleReportManager(item.dealerName)}
                      className="flex-1 bg-[#0e1c2f] text-white font-bold text-xs py-3 rounded-full flex items-center justify-center gap-1.5 hover:bg-[#213145] active:scale-95 transition-transform shadow-sm"
                    >
                      <AlertOctagon size={14} className="shrink-0" />
                      {lang === 'BN' ? 'জানান' : 'Report'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </PhoneFrame>
  );
};
export default PendingFollowups;
