import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { MapRadar, DealerBubble } from '../components/MapElements';
import { BottomNav } from '../components/BottomNav';
import { DealerCard } from '../components/DealerCard';

export const FieldMapIntelligence: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [selectedRange, setSelectedRange] = useState<'500m' | '1km' | '2km'>('1km');
  const [selectedDealer, setSelectedDealer] = useState<string | null>('rahman');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  const handleRecenter = () => {
    setSelectedDealer(null);
  };

  return (
    <PhoneFrame>
      {/* Full Screen Map Canvas */}
      <div className="absolute inset-0 z-0 bg-[#e5e3df] overflow-hidden">
        {/* Subtle Grid Mock Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Top Search Area */}
        <div className="relative z-30 pt-4 px-4 w-full flex items-center justify-between gap-3">
          <div className="flex-grow bg-white rounded-full shadow-md flex items-center px-4 py-2 border border-[#c5c6cd]/30">
            <span className="material-symbols-outlined text-[#75777d] mr-2 text-xl">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'BN' ? 'ডিলার বা এলাকা খুঁজুন...' : 'Search outlet or area...'}
              className="bg-transparent border-none focus:ring-0 text-sm text-[#0b1c30] w-full p-0 outline-none placeholder-[#75777d]/60"
            />
          </div>
          
          <button
            onClick={toggleLanguage}
            className="bg-[#0e1c2f] text-white rounded-full px-3 py-1.5 text-xs font-semibold shadow-md shrink-0 active:scale-95"
          >
            {lang === 'BN' ? 'বাং | EN' : 'EN | বাং'}
          </button>
        </div>

        {/* Range Selector Controls */}
        <div className="absolute top-24 right-4 z-30 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-[#c5c6cd]/30 flex flex-col overflow-hidden">
          <button
            onClick={() => setSelectedRange('500m')}
            className={`px-3 py-1.5 text-[10px] font-semibold transition-colors border-b border-[#c5c6cd]/30 ${
              selectedRange === '500m' ? 'bg-[#1976D2] text-white' : 'text-[#0b1c30] hover:bg-[#eff4ff]'
            }`}
          >
            {lang === 'BN' ? '৫০০ মি.' : '500m'}
          </button>
          <button
            onClick={() => setSelectedRange('1km')}
            className={`px-3 py-1.5 text-[10px] font-semibold transition-colors border-b border-[#c5c6cd]/30 ${
              selectedRange === '1km' ? 'bg-[#1976D2] text-white' : 'text-[#0b1c30] hover:bg-[#eff4ff]'
            }`}
          >
            {lang === 'BN' ? '১ কিমি' : '1km'}
          </button>
          <button
            onClick={() => setSelectedRange('2km')}
            className={`px-3 py-1.5 text-[10px] font-semibold transition-colors ${
              selectedRange === '2km' ? 'bg-[#1976D2] text-white' : 'text-[#0b1c30] hover:bg-[#eff4ff]'
            }`}
          >
            {lang === 'BN' ? '২ কিমি' : '2km'}
          </button>
        </div>

        {/* Map Legend */}
        <div className="absolute top-20 left-4 z-30 bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-md border border-[#c5c6cd]/30 flex flex-col space-y-1">
          <div className="flex items-center space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
            <span className="text-[9px] font-semibold text-[#0b1c30]">{lang === 'BN' ? 'খুব জরুরি' : 'Urgent'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-[#ffdad6] border border-[#ba1a1a]" />
            <span className="text-[9px] font-semibold text-[#0b1c30]">{lang === 'BN' ? 'নজর দেওয়া দরকার' : 'Warning'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-[#006c49]" />
            <span className="text-[9px] font-semibold text-[#0b1c30]">{lang === 'BN' ? 'স্বাভাবিক' : 'Normal'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-[#d6e3fe]" />
            <span className="text-[9px] font-semibold text-[#0b1c30]">{lang === 'BN' ? 'নতুন সুযোগ' : 'Lead'}</span>
          </div>
        </div>

        {/* User Location Center Radar */}
        <MapRadar />

        {/* Interactive Dealer Markers */}
        <DealerBubble
          top="28%"
          left="60%"
          level="urgent"
          icon="storefront"
          label={lang === 'BN' ? 'রহমান স্টোর' : 'Rahman Store'}
          onClick={() => setSelectedDealer('rahman')}
        />
        <DealerBubble
          top="40%"
          left="30%"
          level="warning"
          icon="storefront"
          label={lang === 'BN' ? 'করিম পেইন্ট' : 'Karim Paint'}
          onClick={() => setSelectedDealer('karim')}
        />
        <DealerBubble
          top="65%"
          left="75%"
          level="normal"
          icon="storefront"
          label={lang === 'BN' ? 'মডার্ন হার্ডওয়্যার' : 'Modern Hardware'}
          onClick={() => setSelectedDealer('modern')}
        />
        <DealerBubble
          top="60%"
          left="20%"
          level="lead"
          icon="add_business"
          label={lang === 'BN' ? 'নিউ এরা পেইন্টস' : 'New Era Paints'}
          onClick={() => setSelectedDealer('newera')}
        />

        {/* Floating Smart Summary (rahman detail overlay) */}
        {selectedDealer === 'rahman' && (
          <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 z-30 w-64 bg-white rounded-xl shadow-lg border border-[#ffdad6] overflow-hidden">
            <div className="bg-[#ffdad6] px-3 py-1.5 flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#ba1a1a] uppercase tracking-wider">
                {lang === 'BN' ? 'খুব জরুরি' : 'Urgent'}
              </span>
              <span className="text-[9px] font-semibold text-[#44474c] flex items-center">
                <span className="material-symbols-outlined text-[12px] mr-0.5">near_me</span>
                {lang === 'BN' ? '১.২ কিমি দূরে' : '1.2 km away'}
              </span>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-bold text-[#0b1c30] mb-2">রহমান ট্রেডার্স</h3>
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-xs">
                  <span className="text-[#44474c]">{lang === 'BN' ? 'বকেয়া:' : 'Dues:'}</span>
                  <span className="font-bold text-[#ba1a1a]">৳৮৫,০০০</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#44474c]">{lang === 'BN' ? 'সেল:' : 'Sales:'}</span>
                  <span className="font-semibold text-[#ba1a1a]">৪০% কমেছে</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#44474c]">{lang === 'BN' ? 'শেষ ভিজিট:' : 'Last Visit:'}</span>
                  <span className="font-semibold">১২ দিন আগে</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/visit-prep/1')}
                className="w-full bg-[#ba1a1a] text-white py-2 rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-1 active:scale-95"
              >
                <span className="material-symbols-outlined text-[14px]">directions_run</span>
                {lang === 'BN' ? 'আগে ভিজিট করুন' : 'Visit First'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recenter / Action Button & Pull-up bottom sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-40 pb-16 flex flex-col justify-end">
        {/* Recenter Button */}
        <div className="flex justify-end px-4 mb-3">
          <button
            onClick={handleRecenter}
            className="bg-white text-[#0b1c30] p-2.5 rounded-full shadow-md border border-[#c5c6cd]/30 hover:bg-[#eff4ff] active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-xl block">my_location</span>
          </button>
        </div>

        {/* Pull-up Bottom Sheet */}
        <div className="bg-white rounded-t-2xl shadow-[0px_-8px_30px_rgba(0,0,0,0.1)] w-full">
          {/* Grabber */}
          <div className="flex justify-center pt-3 pb-2 w-full">
            <div className="w-10 h-1 bg-[#c5c6cd] rounded-full" />
          </div>
          
          {/* Sheet Content */}
          <div className="px-4 pb-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-bold text-[#0b1c30]">
                {lang === 'BN' ? 'আশেপাশের ডিলার (৪ জন)' : 'Nearby Outlets (4)'}
              </h2>
              <button
                onClick={() => navigate('/visit-plan')}
                className="text-xs font-semibold text-[#1976D2] hover:underline flex items-center"
              >
                {lang === 'BN' ? 'সব দেখুন' : 'View All'}
                <span className="material-symbols-outlined text-[14px] ml-0.5">chevron_right</span>
              </button>
            </div>

            {/* Horizontal scroll list */}
            <div className="flex overflow-x-auto space-x-3 pb-1 -mx-4 px-4 scrollbar-hide">
              <DealerCard
                name="রহমান স্টোর"
                distance="১.২ কি.মি. দূরে"
                priorityLevel="urgent"
                priorityText="খুব জরুরি"
                actionText="ভিজিট করুন →"
                onActionClick={() => navigate('/visit-prep/1')}
              />
              <DealerCard
                name="করিম পেইন্ট হাউস"
                distance="২.৫ কি.মি. দূরে"
                priorityLevel="warning"
                priorityText="নজর দেওয়া দরকার"
                actionText="বিস্তারিত →"
                onActionClick={() => navigate('/visit-prep/2')}
              />
              <DealerCard
                name="মডার্ন হার্ডওয়্যার"
                distance="৩.৮ কি.মি. দূরে"
                priorityLevel="normal"
                priorityText="স্বাভাবিক"
                actionText="বিস্তারিত →"
                onActionClick={() => navigate('/visit-prep/3')}
              />
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
};
export default FieldMapIntelligence;
