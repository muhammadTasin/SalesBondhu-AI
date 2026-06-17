import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { MapRadar, DealerBubble } from '../components/MapElements';
import { BottomNav } from '../components/BottomNav';
import { DealerCard } from '../components/DealerCard';
import { Search, Store, Plus, Navigation, Locate, ChevronRight } from 'lucide-react';

export const FieldMapIntelligence: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [selectedRange, setSelectedRange] = useState<'500m' | '1km' | '2km'>('1km');
  const [selectedDealer, setSelectedDealer] = useState<string | null>('rahman');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Geolocation states
  const [isLocating, setIsLocating] = useState(false);
  const [locatingStatus, setLocatingStatus] = useState<string | null>(null);
  const [, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  const handleLocate = () => {
    setIsLocating(true);
    setLocatingStatus(lang === 'BN' ? 'লোকেশন খোঁজা হচ্ছে...' : 'Locating...');
    
    if (!navigator.geolocation) {
      alert(lang === 'BN' ? 'আপনার ব্রাউজারে জিপিএস সমর্থন করে না।' : 'Geolocation not supported by your browser.');
      setIsLocating(false);
      setLocatingStatus(null);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLocating(false);
        setLocatingStatus(lang === 'BN' ? 'আপনার বর্তমান লোকেশন পাওয়া গেছে' : 'Current location found');
        setSelectedRange('500m'); // Zoom in on success
        setSelectedDealer(null); // Center
        setTimeout(() => setLocatingStatus(null), 3000);
      },
      (error) => {
        console.error(error);
        setIsLocating(false);
        setLocatingStatus(
          lang === 'BN'
            ? 'লোকেশন পারমিশন পাওয়া যায়নি। সেটিংস থেকে লোকেশন চালু করুন।'
            : 'Location permission denied. Please enable location in settings.'
        );
        setTimeout(() => setLocatingStatus(null), 4000);
      }
    );
  };

  const allDealersList = [
    {
      id: 'rahman',
      name: 'Rahman Store',
      nameBn: 'রহমান স্টোর',
      distance: 0.8, // km
      priorityLevel: 'urgent',
      priorityTextBn: 'খুব জরুরি',
      priorityTextEn: 'Urgent',
      dues: '৳৮৫,০০০',
      sales: '৪০% কমেছে',
      lastVisit: '১২ দিন আগে',
      top: '32%',
      left: '58%',
      dealerId: '1',
    },
    {
      id: 'karim',
      name: 'Karim Paint House',
      nameBn: 'করিম পেইন্ট হাউস',
      distance: 1.5, // km
      priorityLevel: 'warning',
      priorityTextBn: 'নজর দেওয়া দরকার',
      priorityTextEn: 'Warning',
      dues: '৳৩০,০০০',
      sales: '১০% কমেছে',
      lastVisit: '৫ দিন আগে',
      top: '42%',
      left: '32%',
      dealerId: '2',
    },
    {
      id: 'modern',
      name: 'Modern Hardware',
      nameBn: 'মডার্ন হার্ডওয়্যার',
      distance: 1.9, // km
      priorityLevel: 'normal',
      priorityTextBn: 'স্বাভাবিক',
      priorityTextEn: 'Normal',
      dues: '৳০.০০',
      sales: 'স্বাভাবিক',
      lastVisit: '২ দিন আগে',
      top: '62%',
      left: '72%',
      dealerId: '3',
    },
    {
      id: 'newera',
      name: 'New Era Paints',
      nameBn: 'নিউ এরা পেইন্টস',
      distance: 0.4, // km
      priorityLevel: 'lead',
      priorityTextBn: 'নতুন সুযোগ',
      priorityTextEn: 'Lead',
      dues: '৳০.০০',
      sales: 'নতুন সুযোগ',
      lastVisit: 'কখনো নয়',
      top: '55%',
      left: '22%',
      dealerId: '4',
    }
  ];

  // Filter based on selected radius and search query
  const maxDistance = selectedRange === '500m' ? 0.5 : selectedRange === '1km' ? 1.0 : 2.0;
  const filteredDealers = allDealersList.filter(d => {
    const matchesDistance = d.distance <= maxDistance;
    const matchesSearch = searchQuery.trim() === '' || 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nameBn.includes(searchQuery);
    return matchesDistance && matchesSearch;
  });

  // Zoom scale multiplier
  let zoomScale = 1.0;
  if (selectedRange === '500m') {
    zoomScale = 1.35;
  } else if (selectedRange === '2km') {
    zoomScale = 0.75;
  }

  // Bangla radius list
  const nearbyTitle = lang === 'BN'
    ? `${selectedRange === '500m' ? '৫০০ মি.' : selectedRange === '1km' ? '১ কিমি' : '২ কিমি'} এর মধ্যে ডিলার (${filteredDealers.length} জন)`
    : `Dealers within ${selectedRange} (${filteredDealers.length})`;

  return (
    <PhoneFrame>
      {/* Full Screen Map Canvas */}
      <div className="absolute inset-0 z-0 bg-[#e5e3df] overflow-hidden">
        {/* Dynamic Zoom Wrapper */}
        <div 
          className="absolute inset-0 transition-transform duration-500 ease-out origin-center"
          style={{ transform: `scale(${zoomScale})` }}
        >
          {/* Subtle Grid Mock Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* User Location Center Radar */}
          <MapRadar range={selectedRange} />

          {/* Interactive Dealer Markers */}
          {filteredDealers.map((dealer) => (
            <DealerBubble
              key={dealer.id}
              top={dealer.top}
              left={dealer.left}
              level={dealer.priorityLevel as any}
              icon={
                dealer.priorityLevel === 'urgent' ? <Store size={14} className="text-white shrink-0" /> :
                dealer.priorityLevel === 'warning' ? <Store size={14} className="text-[#ba1a1a] shrink-0" /> :
                dealer.priorityLevel === 'normal' ? <Store size={14} className="text-white shrink-0" /> :
                <Plus size={14} className="text-[#0e1c2f] shrink-0" />
              }
              label={lang === 'BN' ? dealer.nameBn : dealer.name}
              isActive={selectedDealer === dealer.id}
              onClick={() => setSelectedDealer(dealer.id)}
            />
          ))}
        </div>
        
        {/* Top Search Area */}
        <div className="relative z-30 pt-4 px-4 w-full flex items-center justify-between gap-3">
          <div className="flex-grow bg-white rounded-full shadow-md flex items-center px-4 py-2 border border-[#c5c6cd]/30">
            <Search size={20} className="text-[#75777d] mr-2 shrink-0" />
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

        {/* Floating locating status toast */}
        {locatingStatus && (
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#0e1c2f]/90 text-white text-[10px] font-semibold px-4 py-2 rounded-full shadow-lg text-center backdrop-blur-sm border border-white/10 animate-pulse">
            {locatingStatus}
          </div>
        )}

        {/* Floating Smart Summary Card */}
        {selectedDealer && (
          (() => {
            const currentDealerData = allDealersList.find(d => d.id === selectedDealer);
            if (!currentDealerData) return null;
            return (
              <div className="absolute top-[32%] left-1/2 transform -translate-x-1/2 z-30 w-64 bg-white rounded-xl shadow-lg border border-[#c5c6cd]/30 overflow-hidden animate-fade-in">
                <div className={`px-3 py-1.5 flex justify-between items-center ${
                  currentDealerData.priorityLevel === 'urgent' ? 'bg-[#ffdad6] text-[#93000a]' :
                  currentDealerData.priorityLevel === 'warning' ? 'bg-[#ffe082]/30 text-[#e65100]' :
                  currentDealerData.priorityLevel === 'normal' ? 'bg-[#9af2c5]/30 text-[#0c714d]' :
                  'bg-[#d6e3fe] text-[#0e1c2f]'
                }`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {lang === 'BN' ? currentDealerData.priorityTextBn : currentDealerData.priorityTextEn}
                  </span>
                  <span className="text-[9px] font-semibold flex items-center">
                    <Navigation size={12} className="mr-0.5 shrink-0" />
                    {lang === 'BN' ? `${currentDealerData.distance} কিমি দূরে` : `${currentDealerData.distance} km away`}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold text-[#0b1c30] mb-2">
                    {lang === 'BN' ? currentDealerData.nameBn : currentDealerData.name}
                  </h3>
                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#44474c]">{lang === 'BN' ? 'বকেয়া:' : 'Dues:'}</span>
                      <span className={`font-bold ${currentDealerData.priorityLevel === 'urgent' ? 'text-[#ba1a1a]' : 'text-[#0b1c30]'}`}>
                        {currentDealerData.dues}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#44474c]">{lang === 'BN' ? 'সেল:' : 'Sales:'}</span>
                      <span className="font-semibold">{currentDealerData.sales}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#44474c]">{lang === 'BN' ? 'শেষ ভিজিট:' : 'Last Visit:'}</span>
                      <span className="font-semibold">{currentDealerData.lastVisit}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/visit-prep/${currentDealerData.dealerId}`)}
                    className="w-full bg-[#006c49] text-white py-2 rounded-lg text-xs font-semibold hover:bg-[#0c714d] transition-colors flex items-center justify-center gap-1 active:scale-95"
                  >
                    <Navigation size={14} className="shrink-0" />
                    {lang === 'BN' ? 'ভিজিট করুন' : 'Visit Now'}
                  </button>
                </div>
              </div>
            );
          })()
        )}
      </div>

      {/* Recenter / Action Button & Pull-up bottom sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-40 pb-16 flex flex-col justify-end">
        {/* Recenter / GPS Button */}
        <div className="flex justify-end px-4 mb-3">
          <button
            onClick={handleLocate}
            disabled={isLocating}
            aria-label="Locate current position"
            className="bg-white text-[#0b1c30] p-2.5 rounded-full shadow-md border border-[#c5c6cd]/30 hover:bg-[#eff4ff] active:scale-95 transition-transform flex items-center justify-center disabled:opacity-50"
          >
            <Locate size={20} className={`shrink-0 ${isLocating ? 'animate-spin text-[#1976D2]' : ''}`} />
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
                {nearbyTitle}
              </h2>
              <button
                onClick={() => navigate('/visit-plan')}
                className="text-xs font-semibold text-[#1976D2] hover:underline flex items-center"
              >
                {lang === 'BN' ? 'সব দেখুন' : 'View All'}
                <ChevronRight size={14} className="ml-0.5 shrink-0" />
              </button>
            </div>

            {/* Horizontal scroll list */}
            <div className="flex overflow-x-auto space-x-3 pb-1 -mx-4 px-4 scrollbar-hide">
              {filteredDealers.map((dealer) => (
                <DealerCard
                  key={dealer.id}
                  name={lang === 'BN' ? dealer.nameBn : dealer.name}
                  distance={lang === 'BN' ? `${dealer.distance} কি.মি. দূরে` : `${dealer.distance} km away`}
                  priorityLevel={dealer.priorityLevel as any}
                  priorityText={lang === 'BN' ? dealer.priorityTextBn : dealer.priorityTextEn}
                  actionText={lang === 'BN' ? 'ভিজিট করুন →' : 'Visit →'}
                  isActive={selectedDealer === dealer.id}
                  onCardClick={() => setSelectedDealer(dealer.id)}
                  onActionClick={() => navigate(`/visit-prep/${dealer.dealerId}`)}
                />
              ))}
              {filteredDealers.length === 0 && (
                <div className="text-xs text-[#75777d] py-8 px-4 text-center w-full">
                  {lang === 'BN' ? 'এই সীমার মধ্যে কোনো ডিলার পাওয়া যায়নি' : 'No dealers found in this range'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
};
export default FieldMapIntelligence;
