import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { MapRadar, DealerBubble } from '../components/MapElements';
import { BottomNav } from '../components/BottomNav';
import { DealerCard } from '../components/DealerCard';
import { 
  Search, 
  Store, 
  Plus, 
  Minus, 
  Locate,
  ChevronRight, 
  Compass, 
  ArrowLeft,
  Navigation
} from 'lucide-react';

export const FieldMapIntelligence: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  
  // Stateful Zoom levels: 0.8x, 1x, 1.25x, 1.5x, 1.75x
  const zoomLevels = [0.8, 1.0, 1.25, 1.5, 1.75];
  const [zoomIndex, setZoomIndex] = useState(1); // Default to 1.0x (index 1)
  
  const [selectedDealer, setSelectedDealer] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [routeVisible, setRouteVisible] = useState(false);
  
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
        setZoomIndex(3); // Zoom to 1.5x
        setSelectedDealer(null); // Center
        setRouteVisible(false);
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
      id: 'rahman-traders',
      name: 'Rahman Traders',
      nameBn: 'রহমান ট্রেডার্স',
      area: 'Dhaka South',
      areaBn: 'ঢাকা দক্ষিণ',
      distance: 0.8, // km
      priorityLevel: 'urgent',
      priorityTextBn: 'খুব জরুরি',
      priorityTextEn: 'Urgent',
      dues: '৳৮৫,০০০',
      sales: '৪০% কমেছে',
      lastVisit: '১২ দিন আগে',
      reasonBn: '৳৮৫,০০০ বকেয়া + সেলস ৪০% কমেছে',
      reasonEn: '৳85,000 overdue dues + 40% sales drop',
      actionBn: 'ভিজিট করুন এবং কালেকশন ফলো-আপ নিন',
      actionEn: 'Visit and take collection follow-up',
      top: '32%',
      left: '58%',
      dealerId: '1',
    },
    {
      id: 'karim-paint',
      name: 'Karim Paint House',
      nameBn: 'করিম পেইন্ট হাউস',
      area: 'Dhaka South',
      areaBn: 'ঢাকা দক্ষিণ',
      distance: 1.5, // km
      priorityLevel: 'warning',
      priorityTextBn: 'নজর দেওয়া দরকার',
      priorityTextEn: 'Warning',
      dues: '৳৩০,০০০',
      sales: '১০% কমেছে',
      lastVisit: '৫ দিন আগে',
      reasonBn: '৳৩০,০০০ বকেয়া + সেলস ১০% কমেছে',
      reasonEn: '৳30,000 overdue dues + 10% sales drop',
      actionBn: 'ভিজিট করে বকেয়া তাগাদা দিন',
      actionEn: 'Visit and push for dues collection',
      top: '44%',
      left: '36%',
      dealerId: '2',
    },
    {
      id: 'mirpur-market',
      name: 'Mirpur Paint Market',
      nameBn: 'মিরপুর পেইন্ট মার্কেট',
      area: 'Dhaka North',
      areaBn: 'ঢাকা উত্তর',
      distance: 1.2, // km
      priorityLevel: 'normal',
      priorityTextBn: 'স্বাভাবিক',
      priorityTextEn: 'Healthy',
      dues: '৳০',
      sales: 'স্বাভাবিক',
      lastVisit: '২ দিন আগে',
      reasonBn: 'সেলস স্বাভাবিক ও নিয়মিত কালেকশন',
      reasonEn: 'Healthy sales and regular collection',
      actionBn: 'রেগুলার ভিজিট করুন ও ফিডব্যাক নিন',
      actionEn: 'Regular visit and collect feedback',
      top: '65%',
      left: '72%',
      dealerId: '3',
    },
    {
      id: 'new-era',
      name: 'New Era Paints',
      nameBn: 'নিউ এরা পেইন্টস',
      area: 'Dhaka East',
      areaBn: 'ঢাকা পূর্ব',
      distance: 0.4, // km
      priorityLevel: 'lead',
      priorityTextBn: 'নতুন সুযোগ',
      priorityTextEn: 'New Opportunity',
      dues: '৳০',
      sales: 'নতুন সুযোগ',
      lastVisit: 'কখনো নয়',
      reasonBn: 'নতুন আউটলেট কভারেজ বৃদ্ধি',
      reasonEn: 'New outlet expansion opportunity',
      actionBn: 'আউটলেট ভিজিট করে সেলস পিচ দিন',
      actionEn: 'Visit outlet and pitch products',
      top: '55%',
      left: '22%',
      dealerId: '4',
    },
    {
      id: 'badda-hardware',
      name: 'Badda Hardware',
      nameBn: 'বাড্ডা হার্ডওয়্যার',
      area: 'Dhaka East',
      areaBn: 'ঢাকা পূর্ব',
      distance: 1.8, // km
      priorityLevel: 'potential',
      priorityTextBn: 'উচ্চ সম্ভাবনা',
      priorityTextEn: 'High Potential',
      dues: '৳০',
      sales: 'উচ্চ সম্ভাবনা',
      lastVisit: '৭ দিন আগে',
      reasonBn: 'নতুন ডিলার অনবোর্ডিং সম্ভাবনা',
      reasonEn: 'Potential new dealer onboarding',
      actionBn: 'ডিলারের সাথে কথা বলুন ও অফার দিন',
      actionEn: 'Discuss with dealer and pitch offers',
      top: '25%',
      left: '25%',
      dealerId: '5',
    }
  ];

  // Derived selected range based on zoom index
  const getSelectedRangeLabel = () => {
    if (zoomIndex === 0) return '2km';
    if (zoomIndex === 1 || zoomIndex === 2) return '1km';
    return '500m';
  };
  const selectedRange = getSelectedRangeLabel();

  // Filter based on selected radius and search query
  const maxDistance = selectedRange === '500m' ? 0.5 : selectedRange === '1km' ? 1.5 : 2.5;
  const filteredDealers = allDealersList.filter(d => {
    const matchesDistance = d.distance <= maxDistance;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = q === '' || 
      d.name.toLowerCase().includes(q) ||
      d.nameBn.includes(q) ||
      d.area.toLowerCase().includes(q) ||
      d.areaBn.includes(q) ||
      d.priorityTextEn.toLowerCase().includes(q) ||
      d.priorityTextBn.includes(q);
    return matchesDistance && matchesSearch;
  });

  // Auto-focus if there is exactly 1 match
  useEffect(() => {
    if (searchQuery.trim() !== '' && filteredDealers.length === 1) {
      setSelectedDealer(filteredDealers[0].id);
    }
  }, [searchQuery, filteredDealers.length]);

  const currentZoom = zoomLevels[zoomIndex];

  // Map Controls
  const handleZoomIn = () => {
    if (zoomIndex < zoomLevels.length - 1) {
      setZoomIndex(prev => prev + 1);
    }
  };

  const handleZoomOut = () => {
    if (zoomIndex > 0) {
      setZoomIndex(prev => prev - 1);
    }
  };

  const handleResetMap = () => {
    setZoomIndex(1); // 1.0x
    setSelectedDealer(null);
    setRouteVisible(false);
  };

  const handleEmptyMapClick = () => {
    setSelectedDealer(null);
    setRouteVisible(false);
  };

  // Sync range chip click with manual zoom index
  const handleRangeChipClick = (range: '500m' | '1km' | '2km') => {
    if (range === '500m') {
      setZoomIndex(3); // 1.5x
    } else if (range === '1km') {
      setZoomIndex(1); // 1.0x
    } else {
      setZoomIndex(0); // 0.8x
    }
  };

  const selectedDealerData = allDealersList.find(d => d.id === selectedDealer);

  // Bangla radius list
  const nearbyTitle = lang === 'BN'
    ? `${selectedRange === '500m' ? '৫০০ মি.' : selectedRange === '1km' ? '১.৫ কিমি' : '২.৫ কিমি'} এর মধ্যে ডিলার (${filteredDealers.length} জন)`
    : `Dealers within ${selectedRange === '500m' ? '500m' : selectedRange === '1km' ? '1.5km' : '2.5km'} (${filteredDealers.length})`;

  return (
    <PhoneFrame>
      {/* Full Screen Map Canvas */}
      <div 
        onClick={handleEmptyMapClick}
        className="absolute inset-0 z-0 bg-[#e5e3df] overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Dynamic Zoom Wrapper */}
        <div 
          className="absolute inset-0 transition-transform duration-500 ease-out origin-center"
          style={{ transform: `scale(${currentZoom})` }}
        >
          {/* Subtle Grid Mock Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* User Location Center Radar */}
          <MapRadar range={selectedRange} />

          {/* Visual Route Highlight path */}
          {routeVisible && selectedDealerData && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 15 }}>
              <line
                x1="50%"
                y1="50%"
                x2={selectedDealerData.left}
                y2={selectedDealerData.top}
                stroke="#1976D2"
                strokeWidth="3.5"
                strokeDasharray="6,4"
                className="animate-pulse"
              />
            </svg>
          )}

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
                dealer.priorityLevel === 'lead' ? <Store size={14} className="text-[#0e1c2f] shrink-0" /> :
                <Store size={14} className="text-white shrink-0" />
              }
              label={lang === 'BN' ? dealer.nameBn : dealer.name}
              isActive={selectedDealer === dealer.id}
              onClick={() => {
                setSelectedDealer(dealer.id);
                setRouteVisible(false); // Reset route when selecting a new dealer
              }}
            />
          ))}
        </div>
        
        {/* Top Search Area */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative z-[60] pt-4 px-4 w-full flex items-center justify-between gap-3"
        >
          {/* Back Button for context */}
          <button 
            onClick={() => navigate('/today')}
            className="bg-white p-2 rounded-full shadow-md border border-[#c5c6cd]/30 active:scale-90 transition-transform shrink-0"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={18} className="text-[#0e1c2f]" />
          </button>

          <div className="flex-grow bg-white rounded-full shadow-md flex items-center px-4 py-2 border border-[#c5c6cd]/30">
            <Search size={18} className="text-[#75777d] mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'BN' ? 'ডিলার, এলাকা বা ঝুঁকি খুঁজুন...' : 'Search dealer, area, or risk...'}
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
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute top-24 right-4 z-[60] bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-[#c5c6cd]/30 flex flex-col overflow-hidden"
        >
          <button
            onClick={() => handleRangeChipClick('500m')}
            className={`px-3 py-1.5 text-[10px] font-semibold transition-colors border-b border-[#c5c6cd]/30 ${
              selectedRange === '500m' ? 'bg-[#1976D2] text-white' : 'text-[#0b1c30] hover:bg-[#eff4ff]'
            }`}
          >
            {lang === 'BN' ? '৫০০ মি.' : '500m'}
          </button>
          <button
            onClick={() => handleRangeChipClick('1km')}
            className={`px-3 py-1.5 text-[10px] font-semibold transition-colors border-b border-[#c5c6cd]/30 ${
              selectedRange === '1km' ? 'bg-[#1976D2] text-white' : 'text-[#0b1c30] hover:bg-[#eff4ff]'
            }`}
          >
            {lang === 'BN' ? '১.৫ কিমি' : '1.5km'}
          </button>
          <button
            onClick={() => handleRangeChipClick('2km')}
            className={`px-3 py-1.5 text-[10px] font-semibold transition-colors ${
              selectedRange === '2km' ? 'bg-[#1976D2] text-white' : 'text-[#0b1c30] hover:bg-[#eff4ff]'
            }`}
          >
            {lang === 'BN' ? '২.৫ কিমি' : '2.5km'}
          </button>
        </div>

        {/* Floating Manual Zoom Controls */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute top-44 right-4 z-[60] flex flex-col gap-2"
        >
          <button
            onClick={handleZoomIn}
            className="bg-white text-[#0e1c2f] p-2 rounded-full shadow-md border border-[#c5c6cd]/30 hover:bg-[#eff4ff] active:scale-90 transition-transform"
            aria-label="Zoom in"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={handleZoomOut}
            className="bg-white text-[#0e1c2f] p-2 rounded-full shadow-md border border-[#c5c6cd]/30 hover:bg-[#eff4ff] active:scale-90 transition-transform"
            aria-label="Zoom out"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={handleResetMap}
            className="bg-white text-[#0e1c2f] p-2 rounded-full shadow-md border border-[#c5c6cd]/30 hover:bg-[#eff4ff] active:scale-90 transition-transform"
            aria-label="Recenter map"
          >
            <Compass size={16} />
          </button>
        </div>

        {/* Map Legend */}
        <div className="absolute top-20 left-4 z-30 bg-white/95 backdrop-blur-sm p-2.5 rounded-lg shadow-md border border-[#c5c6cd]/30 flex flex-col space-y-1.5">
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]" />
            <span className="text-[9px] font-bold text-[#0b1c30]">{lang === 'BN' ? 'খুব জরুরি' : 'Urgent'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffdad6] border border-[#ba1a1a]" />
            <span className="text-[9px] font-bold text-[#0b1c30]">{lang === 'BN' ? 'নজর দেওয়া দরকার' : 'Warning'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#006c49]" />
            <span className="text-[9px] font-bold text-[#0b1c30]">{lang === 'BN' ? 'স্বাভাবিক' : 'Normal'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#d6e3fe] border border-[#c5c6cd]/30" />
            <span className="text-[9px] font-bold text-[#0b1c30]">{lang === 'BN' ? 'নতুন সুযোগ' : 'Lead'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#008080]" />
            <span className="text-[9px] font-bold text-[#0b1c30]">{lang === 'BN' ? 'উচ্চ সম্ভাবনা' : 'Potential'}</span>
          </div>
        </div>

        {/* Floating locating status toast */}
        {locatingStatus && (
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#0e1c2f]/90 text-white text-[10px] font-semibold px-4 py-2 rounded-full shadow-lg text-center backdrop-blur-sm border border-white/10 animate-pulse">
            {locatingStatus}
          </div>
        )}

        {/* Floating Smart Summary Card (Compact Prompt) */}
        {selectedDealer && selectedDealerData && (() => {
          const topNum = parseFloat(selectedDealerData.top);
          const leftNum = parseFloat(selectedDealerData.left);
          
          let positionStyle: React.CSSProperties = {
            position: 'absolute',
            zIndex: 50,
            width: '240px',
            top: selectedDealerData.top,
            left: selectedDealerData.left,
          };
      
          // Determine vertical position: above or below marker
          if (topNum > 50) {
            positionStyle.transform = 'translate(-50%, calc(-100% - 24px))';
          } else {
            positionStyle.transform = 'translate(-50%, 24px)';
          }
      
          // Determine horizontal clamping
          if (leftNum < 35) {
            positionStyle.transform = topNum > 50 
              ? 'translate(-20%, calc(-100% - 24px))'
              : 'translate(-20%, 24px)';
          } else if (leftNum > 65) {
            positionStyle.transform = topNum > 50 
              ? 'translate(-80%, calc(-100% - 24px))'
              : 'translate(-80%, 24px)';
          }

          return (
            <div 
              onClick={(e) => e.stopPropagation()}
              style={positionStyle}
              className="bg-white rounded-2xl shadow-xl border border-[#c5c6cd]/40 overflow-hidden animate-fade-in flex flex-col"
            >
              {/* Header */}
              <div className={`px-3 py-2 flex justify-between items-center ${
                selectedDealerData.priorityLevel === 'urgent' ? 'bg-[#ffdad6]' :
                selectedDealerData.priorityLevel === 'warning' ? 'bg-[#ffe082]/40' :
                selectedDealerData.priorityLevel === 'normal' ? 'bg-[#9af2c5]/40' :
                'bg-[#d6e3fe]'
              }`}>
                <span className={`text-[11px] font-extrabold ${
                  selectedDealerData.priorityLevel === 'urgent' ? 'text-[#93000a]' :
                  selectedDealerData.priorityLevel === 'warning' ? 'text-[#e65100]' :
                  selectedDealerData.priorityLevel === 'normal' ? 'text-[#0c714d]' :
                  'text-[#0e1c2f]'
                }`}>
                  {lang === 'BN' ? selectedDealerData.priorityTextBn : selectedDealerData.priorityTextEn}
                </span>
                <span className="text-[10px] font-semibold text-[#44474c] flex items-center gap-1">
                  <Navigation size={10} className="transform rotate-45" />
                  {lang === 'BN' ? `${selectedDealerData.distance} কিমি দূরে` : `${selectedDealerData.distance} km away`}
                </span>
              </div>
              
              {/* Body */}
              <div className="p-3">
                <h3 className="text-sm font-bold text-[#0b1c30] mb-3">
                  {lang === 'BN' ? selectedDealerData.nameBn : selectedDealerData.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-[#44474c]">{lang === 'BN' ? 'বকেয়া:' : 'Dues:'}</span>
                    <span className={`font-bold ${selectedDealerData.dues !== '৳০' ? 'text-[#ba1a1a]' : 'text-[#0c714d]'}`}>
                      {selectedDealerData.dues}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-[#44474c]">{lang === 'BN' ? 'সেল:' : 'Sales:'}</span>
                    <span className={`font-bold ${selectedDealerData.sales.includes('কমেছে') || selectedDealerData.sales.includes('drop') ? 'text-[#ba1a1a]' : 'text-[#44474c]'}`}>
                      {selectedDealerData.sales}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-[#44474c]">{lang === 'BN' ? 'শেষ ভিজিট:' : 'Last Visit:'}</span>
                    <span className="font-semibold text-[#44474c]">
                      {selectedDealerData.lastVisit}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate(`/visit-prep/${selectedDealerData.id}`)}
                  className={`w-full text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all outline-none ${
                    selectedDealerData.priorityLevel === 'urgent' || selectedDealerData.priorityLevel === 'warning'
                      ? 'bg-[#ba1a1a] hover:bg-[#93000a]'
                      : 'bg-[#006c49] hover:bg-[#0c714d]'
                  }`}
                >
                  {selectedDealerData.priorityLevel === 'urgent' || selectedDealerData.priorityLevel === 'warning' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/><path d="M10 11h2l2-4"/><path d="M10 11v6l2 4"/><path d="M14 16l-2-5"/></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  )}
                  {lang === 'BN' 
                    ? (selectedDealerData.priorityLevel === 'urgent' || selectedDealerData.priorityLevel === 'warning' ? 'আগে ভিজিট করুন' : 'ভিজিট করুন') 
                    : (selectedDealerData.priorityLevel === 'urgent' || selectedDealerData.priorityLevel === 'warning' ? 'Visit First' : 'Visit')}
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Recenter / Action Button & Pull-up bottom sheet */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 left-0 right-0 z-40 pb-16 flex flex-col justify-end pointer-events-none"
      >
        {/* Recenter / GPS Button */}
        <div className="flex justify-end px-4 mb-3 pointer-events-auto">
          <button
            onClick={handleLocate}
            disabled={isLocating}
            aria-label="Locate current position"
            className="bg-white text-[#0b1c30] p-2.5 rounded-full shadow-md border border-[#c5c6cd]/30 hover:bg-[#eff4ff] active:scale-95 transition-transform flex items-center justify-center disabled:opacity-50 outline-none"
          >
            <Locate size={20} className={`shrink-0 ${isLocating ? 'animate-spin text-[#1976D2]' : ''}`} />
          </button>
        </div>

        {/* Pull-up Bottom Sheet */}
        <div className="bg-white rounded-t-2xl shadow-[0px_-8px_30px_rgba(0,0,0,0.1)] w-full pointer-events-auto">
          {/* Grabber */}
          <div className="flex justify-center pt-3 pb-2 w-full cursor-pointer">
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
                className="text-xs font-semibold text-[#1976D2] hover:underline flex items-center outline-none"
              >
                {lang === 'BN' ? 'সব দেখুন' : 'View All'}
                <ChevronRight size={14} className="ml-0.5 shrink-0" />
              </button>
            </div>

            {/* Horizontal scroll list */}
            <div className="flex overflow-x-auto space-x-3 pb-4 pt-1 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {filteredDealers.map((dealer) => (
                <div key={dealer.id} className="snap-start shrink-0">
                  <DealerCard
                    name={lang === 'BN' ? dealer.nameBn : dealer.name}
                    distance={lang === 'BN' ? `${dealer.distance} কি.মি. দূরে` : `${dealer.distance} km away`}
                    priorityLevel={dealer.priorityLevel as any}
                    priorityText={lang === 'BN' ? dealer.priorityTextBn : dealer.priorityTextEn}
                    actionText={lang === 'BN' ? 'ভিজিট করুন →' : 'Visit →'}
                    isActive={selectedDealer === dealer.id}
                    onCardClick={() => {
                      setSelectedDealer(dealer.id);
                      setRouteVisible(false); // Reset route line on card click selection
                    }}
                    onActionClick={() => navigate(`/visit-prep/${dealer.id}`)}
                  />
                </div>
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
