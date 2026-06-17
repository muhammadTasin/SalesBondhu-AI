import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { AppHeader } from '../components/AppHeader';
import { MapPin, Brain, Lightbulb, Target, CheckCircle, MessageSquare, AlertTriangle, XCircle, CheckSquare, Bot, Play } from 'lucide-react';

export const VisitPreparation: React.FC = () => {
  const navigate = useNavigate();
  const { dealerId } = useParams<{ dealerId: string }>();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  const handleAskCoach = () => {
    alert(lang === 'BN' ? 'কোচ ফিচারটি পরবর্তী ধাপে যুক্ত করা হবে।' : 'AI Coach feature will be added in the next phase.');
  };

  return (
    <PhoneFrame>
      <AppHeader
        title={lang === 'BN' ? 'রহমান ট্রেডার্স' : 'Rahman Traders'}
        subtitle={lang === 'BN' ? 'ভিজিট প্রস্তুতি' : 'Visit Preparation'}
        showGPSStatus={false}
        lang={lang}
        onLanguageToggle={toggleLanguage}
      />

      {/* Main Container */}
      <main className="flex-grow overflow-y-auto px-4 pb-20 space-y-5">
        {/* Header contextual badge */}
        <div className="flex flex-col gap-1 mt-2">
          <div className="flex items-center">
            <span className="px-2 py-0.5 bg-[#ffdad6] text-[#ba1a1a] font-bold text-[9px] rounded-sm uppercase tracking-wider">
              {lang === 'BN' ? 'শীর্ষ অগ্রাধিকার' : 'Top Priority'}
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#0b1c30] mt-1">Rahman Traders</h2>
          <p className="text-xs text-[#44474c] flex items-center gap-1">
            <MapPin size={12} className="shrink-0 text-[#75777d]" />
            <span>Mirpur 10, Dhaka</span>
          </p>
        </div>

        {/* AI Insight: Why Go First */}
        <section className="bg-[#0e1c2f] text-white rounded-xl p-4 relative overflow-hidden border border-white/5">
          <div className="absolute top-2 right-2 opacity-10 pointer-events-none">
            <Brain size={80} className="text-white" />
          </div>
          
          <h3 className="text-sm font-bold flex items-center gap-1.5 mb-3 text-[#9df4c8]">
            <Lightbulb size={16} className="text-[#9df4c8] shrink-0 fill-current" />
            {lang === 'BN' ? 'কেন আগে যাবেন?' : 'Why Visit First?'}
          </h3>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/10 rounded-lg p-2 border border-white/10 flex flex-col justify-center">
              <p className="text-[9px] text-white/50 uppercase font-semibold">{lang === 'BN' ? 'বকেয়া' : 'Dues'}</p>
              <p className="text-xs font-bold text-[#ffdad6] mt-0.5">৳৮৫,০০০</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-2 border border-white/10 flex flex-col justify-center">
              <p className="text-[9px] text-white/50 uppercase font-semibold">{lang === 'BN' ? 'সেলস ড্রপ' : 'Sales Drop'}</p>
              <p className="text-xs font-bold text-white mt-0.5">৪০% কমেছে</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-2 border border-white/10 flex flex-col justify-center">
              <p className="text-[9px] text-white/50 uppercase font-semibold">{lang === 'BN' ? 'শেষ ভিজিট' : 'Last Visit'}</p>
              <p className="text-xs font-bold text-white mt-0.5">১২ দিন আগে</p>
            </div>
          </div>
        </section>

        {/* Visit Objectives */}
        <section className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff]/50">
          <h3 className="text-sm font-bold text-[#0b1c30] flex items-center gap-1.5 mb-3">
            <Target size={16} className="text-[#006c49] shrink-0" />
            {lang === 'BN' ? 'আজকের ভিজিটের লক্ষ্য' : 'Today\'s Visit Objectives'}
          </h3>
          <ul className="space-y-2 text-xs text-[#44474c]">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-[#006c49] mt-0.5 shrink-0" />
              <span>{lang === 'BN' ? 'বকেয়া কালেকশন সম্পন্ন করা' : 'Collect outstanding dues of ৳85,000'}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-[#006c49] mt-0.5 shrink-0" />
              <span>{lang === 'BN' ? 'সেলস কমার কারণ উদ্ঘাটন করা' : 'Identify reason behind 40% sales decline'}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-[#006c49] mt-0.5 shrink-0" />
              <span>
                {lang === 'BN' ? 'Exterior Paint নতুন স্টক পুশ করা' : 'Push new stock of Exterior Paint'}
              </span>
            </li>
          </ul>
        </section>

        {/* How to talk scripts */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-[#0b1c30] flex items-center gap-1.5 px-1">
            <MessageSquare size={16} className="text-[#44474c] shrink-0" />
            {lang === 'BN' ? 'কীভাবে কথা বলবেন' : 'How to Speak (Talking Points)'}
          </h3>
          <div className="space-y-3">
            <div className="bg-[#eff4ff] rounded-xl p-3 border border-[#c5c6cd]/30">
              <p className="text-[10px] font-bold text-[#44474c] uppercase tracking-wider mb-1">
                {lang === 'BN' ? 'সেলস ড্রপ নিয়ে' : 'Regarding Sales Decline'}
              </p>
              <p className="text-xs text-[#0b1c30] italic font-medium leading-relaxed">
                {lang === 'BN'
                  ? '"ভাই, গত মাসের তুলনায় আপনার সেলস কিছুটা কমেছে। কোনো সমস্যা হচ্ছে কি? আমরা কীভাবে সাহায্য করতে পারি?"'
                  : '"Brother, your sales are down compared to last month. Any issues? How can we help?"'}
              </p>
            </div>
            
            <div className="bg-[#eff4ff] rounded-xl p-3 border border-[#c5c6cd]/30">
              <p className="text-[10px] font-bold text-[#44474c] uppercase tracking-wider mb-1">
                {lang === 'BN' ? 'বকেয়া কালেকশন নিয়ে' : 'Regarding Overdue Collection'}
              </p>
              <p className="text-xs text-[#0b1c30] italic font-medium leading-relaxed">
                {lang === 'BN'
                  ? '"ভাই, পেমেন্টটা ক্লিয়ার করলে নতুন অর্ডার দ্রুত প্রসেস করতে পারব।"'
                  : '"Brother, clearing the outstanding payment will allow us to process your new order immediately."'}
              </p>
            </div>
          </div>
        </section>

        {/* What to avoid - Don'ts */}
        <section className="bg-[#ffdad6]/40 rounded-xl p-4 border border-[#ffdad6]">
          <h3 className="text-sm font-bold text-[#ba1a1a] flex items-center gap-1.5 mb-2.5">
            <AlertTriangle size={16} className="text-[#ba1a1a] shrink-0" />
            {lang === 'BN' ? 'কী করবেন না' : 'What to Avoid (Don\'ts)'}
          </h3>
          <ul className="space-y-2 text-xs text-[#ba1a1a] font-medium">
            <li className="flex items-start gap-1.5">
              <XCircle size={16} className="text-[#ba1a1a] mt-0.5 shrink-0" />
              <span>{lang === 'BN' ? 'সরাসরি পেমেন্টের জন্য অতিরিক্ত চাপ দেবেন না।' : 'Do not push too hard for immediate payment.'}</span>
            </li>
            <li className="flex items-start gap-1.5">
              <XCircle size={16} className="text-[#ba1a1a] mt-0.5 shrink-0" />
              <span>
                {lang === 'BN' ? 'উনার কমপ্লেইন না শুনেই নতুন প্রোডাক্ট পুশ করবেন না।' : 'Do not pitch new products without hearing customer complaints.'}
              </span>
            </li>
          </ul>
        </section>

        {/* Checklist - What to note */}
        <section className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff]/50">
          <h3 className="text-sm font-bold text-[#0b1c30] flex items-center gap-1.5 mb-3">
            <CheckSquare size={16} className="text-[#44474c] shrink-0" />
            {lang === 'BN' ? 'কী নোট করবেন' : 'What to Record'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {['অর্ডার', 'কালেকশন', 'পেমেন্ট প্রমিজ ডেট', 'কম্পিটিটর আপডেট', 'প্রুফ ফটো'].map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#c5c6cd] text-xs font-semibold text-[#44474c] bg-[#f8f9ff]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]" />
                {item}
              </span>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#c5c6cd]/30 p-3 flex gap-3 z-50">
        <button
          onClick={handleAskCoach}
          className="flex-1 py-3 px-4 rounded-full border border-[#c5c6cd] text-[#0b1c30] text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#eff4ff] active:scale-95 transition-transform"
        >
          <Bot size={16} className="shrink-0" />
          {lang === 'BN' ? 'কোচকে জিজ্ঞেস করুন' : 'Ask AI Coach'}
        </button>
        <button
          onClick={() => navigate(`/active-visit/${dealerId || 'rahman-traders'}`)}
          className="flex-1 py-3 px-4 rounded-full bg-[#006c49] text-white text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#0c714d] active:scale-95 transition-transform shadow-md"
        >
          <Play size={16} className="shrink-0 fill-current" />
          {lang === 'BN' ? 'ভিজিট শুরু করুন' : 'Start Visit Now'}
        </button>
      </div>
    </PhoneFrame>
  );
};
export default VisitPreparation;
