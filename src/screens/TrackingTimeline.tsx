import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { BottomNav } from '../components/BottomNav';
import { Play, Pause, MapPin, Store, CheckCircle, Upload, Battery, RefreshCw, ChevronLeft } from 'lucide-react';

interface TimelineEvent {
  title: string;
  time: string;
  type: 'start' | 'pause' | 'resume' | 'arrival' | 'visit_start' | 'visit_end' | 'submit';
  subtitle?: string;
  badge?: string;
}

export const TrackingTimeline: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');

  const timelineEvents: TimelineEvent[] = [
    {
      title: 'ডিউটি শুরু',
      time: '০৮:৩০ AM',
      type: 'start'
    },
    {
      title: 'কাজ সাময়িক বন্ধ',
      time: '১০:১৫ AM',
      type: 'pause',
      subtitle: 'চা বিরতি'
    },
    {
      title: 'আবার শুরু',
      time: '১০:২০ AM',
      type: 'resume'
    },
    {
      title: 'রহমান ট্রেডার্স-এ পৌঁছেছেন',
      time: '১০:৪৫ AM',
      type: 'arrival',
      subtitle: 'জিপিএস ভেরিফায়েড'
    },
    {
      title: 'ভিজিট শুরু',
      time: '১০:৫০ AM',
      type: 'visit_start'
    },
    {
      title: 'ভিজিট শেষ',
      time: '১১:১০ AM',
      type: 'visit_end',
      subtitle: 'অর্ডার সংগ্রহ: ৫,০০০ ৳'
    },
    {
      title: 'রিপোর্ট জমা দেওয়া হয়েছে',
      time: '০৬:০০ PM',
      type: 'submit'
    }
  ];

  const getIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'start':
      case 'resume':
        return <Play size={16} className="text-[#0c714d] fill-current" />;
      case 'pause':
        return <Pause size={16} className="text-[#ba1a1a]" />;
      case 'arrival':
        return <MapPin size={16} className="text-[#0e1c2f]" />;
      case 'visit_start':
        return <Store size={16} className="text-[#44474c]" />;
      case 'visit_end':
        return <CheckCircle size={16} className="text-[#006c49]" />;
      case 'submit':
        return <Upload size={16} className="text-white" />;
    }
  };

  const getBgClass = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'start':
      case 'resume':
        return 'bg-[#9af2c5]/40 text-[#0c714d] border-[#9af2c5]';
      case 'pause':
        return 'bg-[#ffdad6] text-[#ba1a1a] border-[#ffdad6]';
      case 'arrival':
        return 'bg-[#d6e3fe] text-[#0e1c2f] border-[#d6e3fe]';
      case 'visit_start':
      case 'visit_end':
        return 'bg-[#eff4ff] text-[#0b1c30] border-[#c5c6cd]/30';
      case 'submit':
        return 'bg-[#0e1c2f] text-white border-[#0e1c2f]';
    }
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  return (
    <PhoneFrame>
      <header className="bg-white shadow-sm flex justify-between items-center w-full px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-[#eff4ff] p-2 rounded-full text-[#0b1c30] transition-colors flex items-center justify-center active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-sm font-bold text-[#0b1c30]">
              {lang === 'BN' ? 'ট্র্যাকিং টাইমলাইন' : 'Tracking Timeline'}
            </h1>
            <p className="text-[10px] text-[#44474c] mt-0.5">
              {lang === 'BN' ? 'আজকের কার্যক্রম লগ' : 'Today\'s Activity Log'}
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

      <main className="flex-grow overflow-y-auto px-4 pb-32 pt-4">
        <div className="mb-4">
          <h2 className="text-base font-bold text-[#0b1c30]">
            {lang === 'BN' ? 'আজকের ট্র্যাকিং' : 'Today\'s Tracking'}
          </h2>
          <p className="text-xs text-[#44474c] mt-0.5">
            {lang === 'BN' ? '২৪ অক্টোবর ২০২৬ • আপনার সম্পূর্ণ অ্যাক্টিভিটি লগ' : '24 October 2026 • Full Activity Log'}
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative pl-1">
          {/* Timeline continuous vertical line */}
          <div className="absolute left-[17px] top-4 bottom-4 w-0.5 bg-[#c5c6cd]/30 z-0" />

          {timelineEvents.map((event, idx) => {
            return (
              <div key={idx} className="relative pl-9 pb-6">
                {/* Node icon bubble */}
                <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center z-10 shadow-sm ${getBgClass(event.type)}`}>
                  {getIcon(event.type)}
                </div>

                {/* Content Card */}
                <div className="bg-white p-3.5 rounded-xl border border-[#e5eeff]/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold text-[#0b1c30] leading-snug">
                      {lang === 'EN' && event.type === 'start' ? 'Duty Started' : 
                       lang === 'EN' && event.type === 'pause' ? 'Duty Paused' :
                       lang === 'EN' && event.type === 'resume' ? 'Duty Resumed' :
                       lang === 'EN' && event.type === 'arrival' ? 'Arrived at Rahman Traders' :
                       lang === 'EN' && event.type === 'visit_start' ? 'Visit Started' :
                       lang === 'EN' && event.type === 'visit_end' ? 'Visit Ended' :
                       lang === 'EN' && event.type === 'submit' ? 'EOD Report Submitted' : event.title}
                    </span>
                    <span className="text-[10px] font-bold text-[#75777d] shrink-0">
                      {event.time}
                    </span>
                  </div>
                  {event.subtitle && (
                    <p className="text-[10px] font-medium text-[#75777d] mt-1">
                      {lang === 'EN' && event.subtitle === 'চা বিরতি' ? 'Tea Break' :
                       lang === 'EN' && event.subtitle === 'জিপিএস ভেরিফায়েড' ? 'GPS Verified' :
                       lang === 'EN' && event.subtitle.includes('অর্ডার') ? 'Order Collected: ৳5,000' : event.subtitle}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Battery & Sync Status Sticky overlay */}
      <div className="absolute bottom-[72px] left-4 right-4 z-40">
        <div className="bg-white/95 backdrop-blur-sm border border-[#c5c6cd]/30 rounded-xl p-3 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#006c49]">
            <Battery size={16} className="shrink-0" />
            <span className="text-[10px] font-bold text-[#0b1c30]">
              {lang === 'BN' ? 'ব্যাটারি সেভার চালু আছে' : 'Battery Saver Active'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#75777d]">
            <RefreshCw size={12} className="shrink-0" />
            <span className="text-[9px] font-semibold">
              {lang === 'BN' ? 'সর্বশেষ সিঙ্ক: ২ মিনিট আগে' : 'Last Sync: 2m ago'}
            </span>
          </div>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
};
export default TrackingTimeline;
