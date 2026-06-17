import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PhoneFrame } from '../../components/PhoneFrame';
import { mockOfficers } from '../../data/managerMockData';
import {
  ArrowLeft,
  AlertTriangle,
  Navigation,
  Banknote,
  ShoppingCart,
  UserCheck,
  Clock,
  MapPin,
  CheckCircle2,
  Bell,
  HelpCircle,
  FileCheck,
  MapPinOff,
  Camera,
  Layers,
  Check,
  X
} from 'lucide-react';

export const ManagerOfficerDetail: React.FC = () => {
  const navigate = useNavigate();
  const { officerId } = useParams<{ officerId: string }>();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  
  // Stateful interactions
  const [approved, setApproved] = useState(false);
  const [comment, setComment] = useState('');
  const [reminderSent, setReminderSent] = useState(false);
  const [showExplanationBox, setShowExplanationBox] = useState(false);
  const [explanationQuery, setExplanationQuery] = useState('');
  const [selectedRoutePoint, setSelectedRoutePoint] = useState<string | null>(null);
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  // Resolve dynamic officer mock data
  const activeOfficerId = officerId === 'rahim-ahmed' || officerId === 'kamrul-hasan' ? officerId : 'demo-officer';
  const officer = mockOfficers.find(o => o.id === activeOfficerId) || mockOfficers[2];

  // Sync state settings depending on officerId
  useEffect(() => {
    setApproved(officerId === 'kamrul-hasan');
    setComment(
      officerId === 'rahim-ahmed' 
        ? 'রহমান ট্রেডার্সে জিপিএস মিলছে না কেন? ব্যাখ্যা প্রয়োজন।' 
        : officerId === 'kamrul-hasan' 
          ? 'উত্তম কাজ। কালেকশন লক্ষ্যমাত্রা ছাড়িয়েছে।' 
          : ''
    );
    setReminderSent(false);
    setShowExplanationBox(false);
    setSelectedRoutePoint(null);
    setSelectedTimelineIndex(null);
  }, [officerId]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  const showToastMessage = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2500);
  };

  const handleSendReminder = () => {
    setReminderSent(true);
    showToastMessage(
      lang === 'BN'
        ? `${officer.name}-এর ডিভাইসে জিপিএস ট্র্যাকিং ও বকেয়া তাগাদার সতর্কতা পাঠানো হয়েছে!`
        : `GPS tracking & pending collection alerts dispatched to ${officer.name}!`
    );
  };

  const handleAskExplanation = () => {
    setShowExplanationBox(true);
  };

  const submitExplanationQuery = () => {
    setShowExplanationBox(false);
    showToastMessage(
      lang === 'BN'
        ? `এফএসও ${officer.name}-এর কাছে ব্যাখ্যা চেয়ে রিকোয়েস্ট পাঠানো হয়েছে: "${explanationQuery}"`
        : `Explanation request dispatched to ${officer.name}: "${explanationQuery}"`
    );
    setExplanationQuery('');
  };

  const handleRouteReview = () => {
    // Navigate to territory map with the officer filter query state
    navigate(`/manager/territory?officer=${officer.id}`);
  };

  const handleRouteApproveToggle = () => {
    const nextState = !approved;
    setApproved(nextState);
    showToastMessage(
      nextState
        ? (lang === 'BN' ? 'রুট এবং ভিজিট সফলভাবে অনুমোদিত হয়েছে!' : 'Route and visits approved successfully!')
        : (lang === 'BN' ? 'অনুমোদন প্রত্যাহার করা হয়েছে।' : 'Route approval withdrawn.')
    );
  };

  const handleRoutePointClick = (pointName: string, detail: string) => {
    setSelectedRoutePoint(pointName);
    showToastMessage(`${pointName}: ${detail}`);
  };

  const isRahim = officer.id === 'rahim-ahmed';

  return (
    <PhoneFrame>
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-6 pb-4 bg-white border-b border-[#c5c6cd]/30 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/manager')}
            className="text-[#44474c] hover:bg-[#eff4ff] active:scale-95 transition-all p-1.5 rounded-full"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#eff4ff] text-[#0b1c30] flex items-center justify-center font-bold text-xs border border-[#c5c6cd]/10">
              {officer.initials}
            </div>
            <div>
              <h1 className="text-xs font-bold text-[#0b1c30]">{officer.name}</h1>
              <p className="text-[9px] text-[#44474c]">
                {lang === 'BN' ? officer.locationBN : officer.locationEN}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={toggleLanguage}
          className="text-[10px] font-semibold bg-[#eff4ff] text-[#0b1c30] px-3 py-1 rounded-full border border-[#c5c6cd]/30 active:scale-95 transition-all"
        >
          {lang === 'BN' ? 'বাং | EN' : 'EN | বাং'}
        </button>
      </header>

      <main className="flex-grow p-4 space-y-5 overflow-y-auto pb-8 relative">
        {/* Exception Alert for Rahim (Location Mismatch) */}
        {isRahim && (
          <div className="bg-[#ffdad6] text-[#93000a] border border-[#ba1a1a]/30 rounded-xl p-3.5 flex items-start gap-2.5 shadow-sm">
            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider">
                {lang === 'BN' ? 'লোকেশন মিলছে না' : 'Location Mismatch'}
              </h3>
              <p className="text-[10px] leading-relaxed mt-1">
                {lang === 'BN'
                  ? 'Rahman Traders-এর ভিজিট লোকেশন প্ল্যান করা জায়গার সাথে মিলছে না। প্রায় ২.৪ কিমি দূরে পাওয়া গেছে।'
                  : 'Rahman Traders visit location does not match the planned route. Found approximately 2.4 km away.'}
              </p>
            </div>
          </div>
        )}

        {/* FSO Health & Attendance Summary */}
        <section className="bg-white rounded-2xl p-3.5 border border-[#c5c6cd]/30 shadow-sm grid grid-cols-3 gap-2 text-center text-[10px]">
          <div>
            <span className="text-[#75777d] block uppercase text-[8px]">{lang === 'BN' ? 'ডিউটি স্ট্যাটাস' : 'Duty Status'}</span>
            <span className="inline-flex items-center gap-1 font-bold text-[#006c49] bg-[#9af2c5]/25 px-2 py-0.5 rounded-full mt-1">
              <UserCheck size={11} />
              {lang === 'BN' ? 'অন ডিউটি' : 'On Duty'}
            </span>
          </div>
          <div>
            <span className="text-[#75777d] block uppercase text-[8px]">{lang === 'BN' ? 'শেষ জিপিএস সিঙ্ক' : 'Last GPS Sync'}</span>
            <span className="font-bold text-[#0b1c30] block mt-1">
              {lang === 'BN' ? '০২ মি. আগে' : '2 mins ago'}
            </span>
          </div>
          <div>
            <span className="text-[#75777d] block uppercase text-[8px]">{lang === 'BN' ? 'চলতি টেরিটরি' : 'Current Territory'}</span>
            <span className="font-bold text-[#0b1c30] block mt-1">
              {lang === 'BN' ? officer.locationBN : officer.locationEN}
            </span>
          </div>
        </section>

        {/* Performance Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Visits Completed */}
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#c5c6cd]/30 flex flex-col justify-between h-28 relative overflow-hidden">
            <div className="flex items-center gap-1 text-[#44474c] z-10">
              <Navigation size={14} className="text-[#006c49]" />
              <span className="text-[10px] font-bold">{lang === 'BN' ? 'ভিজিট সম্পন্ন' : 'Visits Completed'}</span>
            </div>
            <div className="z-10">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-[#0b1c30]">{officer.visitsCompleted}</span>
                <span className="text-xs text-[#75777d]">/ {officer.visitsTarget}</span>
              </div>
              <div className="w-full bg-[#eff4ff] h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-[#006c49] h-full rounded-full"
                  style={{ width: `${(officer.visitsCompleted / officer.visitsTarget) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Collection */}
          <div className="bg-[#0e1c2f] text-white rounded-xl p-3.5 shadow-sm flex flex-col justify-between h-28 relative overflow-hidden">
            <div className="flex items-center gap-1 text-white/70 z-10">
              <Banknote size={14} className="text-[#9af2c5]" />
              <span className="text-[10px] font-bold">{lang === 'BN' ? 'কালেকশন' : 'Collection'}</span>
            </div>
            <div className="z-10">
              <span className="text-xl font-bold text-white">{officer.collection}</span>
              <p className="text-[8px] text-[#9af2c5] font-semibold mt-1">
                {officer.collectionPercent} {lang === 'BN' ? 'পূরণ হয়েছে' : 'of target'}
              </p>
            </div>
          </div>

          {/* Sales Target Progress */}
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#c5c6cd]/30 flex items-center justify-between col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#0b1c30]">
                <ShoppingCart size={16} />
              </div>
              <div>
                <span className="text-[9px] text-[#44474c] block">{lang === 'BN' ? 'অর্ডার অগ্রগতি' : 'Sales Target Progress'}</span>
                <span className="text-sm font-bold text-[#0b1c30]">{officer.sales}</span>
              </div>
            </div>
            <span
              className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${
                isRahim ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-[#9af2c5] text-[#0c714d]'
              }`}
            >
              {lang === 'BN' ? officer.salesStatusBN : officer.salesStatusEN}
            </span>
          </div>

          {/* GPS Score */}
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#c5c6cd]/30 flex flex-col justify-between h-24">
            <div className="flex items-center gap-1 text-[#44474c]">
              <MapPin size={14} className="text-[#006c49]" />
              <span className="text-[10px] font-bold">{lang === 'BN' ? 'রুট ট্র্যাকিং স্কোর' : 'GPS Match Score'}</span>
            </div>
            <div>
              <span className="text-lg font-bold text-[#0b1c30]">{officer.gpsScore}%</span>
              <p className="text-[8px] text-[#75777d] mt-0.5">
                {lang === 'BN' ? 'রুট প্ল্যান মেনে চলা' : 'Adherence to route'}
              </p>
            </div>
          </div>

          {/* Territory Time */}
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#c5c6cd]/30 flex flex-col justify-between h-24">
            <div className="flex items-center gap-1 text-[#44474c]">
              <Clock size={14} className="text-[#006c49]" />
              <span className="text-[10px] font-bold">{lang === 'BN' ? 'টেরিটরি সময়' : 'Territory Time'}</span>
            </div>
            <div>
              <span className="text-lg font-bold text-[#0b1c30]">
                {lang === 'BN' ? officer.territoryTimeBN : officer.territoryTimeEN}
              </span>
              <p className="text-[8px] text-[#75777d] mt-0.5">
                {lang === 'BN' ? 'ডিউটি চেক-ইন সময়' : 'Active since check-in'}
              </p>
            </div>
          </div>
        </div>

        {/* Route Discipline Vector Visualisation */}
        <section className="bg-white rounded-2xl p-4 border border-[#c5c6cd]/30 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-[#eff4ff] pb-2">
            <h3 className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
              <Layers size={14} className="text-[#0e1c2f]" />
              <span>{lang === 'BN' ? 'রুট ডিসিপ্লিন ও ট্র্যাক' : 'Route Discipline & Tracking'}</span>
            </h3>
            <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${
              isRahim ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-[#9af2c5] text-[#0c714d]'
            }`}>
              {isRahim ? (lang === 'BN' ? 'রুট বিচ্যুতি' : 'Route Deviated') : (lang === 'BN' ? 'সক্রিয় রুট' : 'On Route')}
            </span>
          </div>

          {/* Custom SVG Map Grid with clickable nodes */}
          <div className="relative h-44 w-full bg-[#f8f9ff] rounded-xl border border-[#c5c6cd]/20 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridDetail" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5eeff" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gridDetail)" />
              
              {/* Planned Route Line (Green) */}
              <path
                d="M 40,130 L 120,60 L 220,50 L 320,110"
                fill="none"
                stroke="#006c49"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Actual Route Line */}
              {isRahim ? (
                <path
                  d="M 40,130 L 110,120 L 180,140 L 320,110"
                  fill="none"
                  stroke="#ba1a1a"
                  strokeWidth="3.5"
                  strokeDasharray="5,5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M 40,130 L 120,60 L 220,50 L 320,110"
                  fill="none"
                  stroke="#006c49"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>

            {/* Clickable Overlay Buttons for Route Points */}
            <button
              onClick={() => handleRoutePointClick('Badda Dealer Belt', lang === 'BN' ? 'অফিসার ডিউটি চেক-ইন সম্পন্ন করেছিলেন।' : 'Checked in at 08:30.')}
              className={`absolute top-[120px] left-[30px] w-6 h-6 rounded-full flex items-center justify-center focus:outline-none transition-transform active:scale-75 ${
                selectedRoutePoint === 'Badda Dealer Belt' ? 'bg-[#0e1c2f] text-white scale-125 z-20' : 'bg-white text-[#0e1c2f] border border-[#c5c6cd] shadow'
              }`}
            >
              <span className="text-[8px] font-bold">1</span>
            </button>

            <button
              onClick={() => handleRoutePointClick('Rahman Traders', isRahim ? (lang === 'BN' ? 'জিপিএস বিচ্যুতি: ২.৪ কিমি দূরে পাওয়া গেছে।' : 'GPS deviation flagged.') : (lang === 'BN' ? 'চেক-ইন ভেরিফাইড।' : 'Verified on spot.'))}
              className={`absolute top-[48px] left-[108px] w-6 h-6 rounded-full flex items-center justify-center focus:outline-none transition-transform active:scale-75 ${
                selectedRoutePoint === 'Rahman Traders' ? 'bg-[#ba1a1a] text-white scale-125 z-20' : 'bg-white text-[#ba1a1a] border border-[#c5c6cd] shadow'
              }`}
            >
              <span className="text-[8px] font-bold">2</span>
            </button>

            <button
              onClick={() => handleRoutePointClick('Karim Paint House', lang === 'BN' ? 'কাগজপত্র ও পেমেন্ট রিসিভ।' : 'Outstanding check cleared.')}
              className={`absolute top-[38px] left-[208px] w-6 h-6 rounded-full flex items-center justify-center focus:outline-none transition-transform active:scale-75 ${
                selectedRoutePoint === 'Karim Paint House' ? 'bg-[#006c49] text-white scale-125 z-20' : 'bg-white text-[#006c49] border border-[#c5c6cd] shadow'
              }`}
            >
              <span className="text-[8px] font-bold">3</span>
            </button>

            <button
              onClick={() => handleRoutePointClick('Mirpur Paint Market', lang === 'BN' ? 'ভিজিট লক্ষ্যমাত্রা পেন্ডিং।' : 'Visit target details.')}
              className={`absolute top-[98px] left-[308px] w-6 h-6 rounded-full flex items-center justify-center focus:outline-none transition-transform active:scale-75 ${
                selectedRoutePoint === 'Mirpur Paint Market' ? 'bg-[#0284c7] text-white scale-125 z-20' : 'bg-white text-[#0284c7] border border-[#c5c6cd] shadow'
              }`}
            >
              <span className="text-[8px] font-bold">4</span>
            </button>

            {/* Map Legends */}
            <div className="absolute top-2 left-2 bg-white/95 px-2 py-1 rounded shadow-sm text-[8px] font-bold border border-[#c5c6cd]/30 flex flex-col gap-0.5">
              <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#006c49]"></span>{lang === 'BN' ? 'পরিকল্পিত রুট' : 'Planned'}</span>
              <span className="flex items-center gap-1"><span className={`w-2 h-0.5 ${isRahim ? 'bg-[#ba1a1a] border-dashed border-[#ba1a1a]' : 'bg-[#006c49]'}`}></span>{lang === 'BN' ? 'প্রকৃত রুট' : 'Actual'}</span>
            </div>

            {/* Labels overlay */}
            <div className="absolute top-[28px] left-[78px] text-[7px] font-bold text-[#0b1c30]">Rahman Traders</div>
            <div className="absolute top-[20px] left-[200px] text-[7px] font-bold text-[#0b1c30]">Karim Paint House</div>
            <div className="absolute top-[125px] left-[255px] text-[7px] font-bold text-[#0b1c30]">Mirpur Paint Market</div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] bg-[#f8f9ff] p-2.5 rounded-xl border border-[#c5c6cd]/10">
            <div>
              <span className="text-[#75777d] block text-[8px] uppercase">{lang === 'BN' ? 'বাদ পড়া রুট পয়েন্ট' : 'Missed Route Points'}</span>
              <span className={`font-bold ${isRahim ? 'text-[#ba1a1a]' : 'text-[#006c49]'}`}>
                {isRahim ? (lang === 'BN' ? '২টি লোকেশন বাদ' : '2 points missed') : (lang === 'BN' ? '০টি' : 'None')}
              </span>
            </div>
            <div>
              <span className="text-[#75777d] block text-[8px] uppercase">{lang === 'BN' ? 'অতিরিক্ত অবস্থান (Dwell)' : 'Dwell-time Exceeded'}</span>
              <span className={`font-bold ${isRahim ? 'text-[#ba1a1a]' : 'text-[#006c49]'}`}>
                {isRahim ? (lang === 'BN' ? '১টি (৪৮ মিনিট)' : '1 event (48 mins)') : (lang === 'BN' ? '০টি' : 'None')}
              </span>
            </div>
          </div>
        </section>

        {/* Dealer Visit Timeline */}
        <section className="bg-white rounded-2xl p-4 border border-[#c5c6cd]/30 shadow-sm space-y-3.5">
          <h3 className="text-xs font-bold text-[#0b1c30] mb-2 uppercase tracking-wider">
            {lang === 'BN' ? 'ডিলার ভিজিট টাইমলাইন' : 'Dealer Visit Timeline'}
          </h3>
          <div className="relative pl-5 space-y-5 before:absolute before:inset-y-0 before:left-[9px] before:w-[1.5px] before:bg-[#c5c6cd]/30">
            {officer.timeline.map((item, index) => {
              const isSelected = selectedTimelineIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedTimelineIndex(index);
                    showToastMessage(lang === 'BN' ? `টাইমলাইন নোট: ${item.noteBN}` : `Timeline note: ${item.noteEN}`);
                  }}
                  className={`w-full text-left relative focus:outline-none transition-all p-2 rounded-xl border ${
                    isSelected ? 'bg-[#eff4ff]/60 border-[#006c49]/30' : 'border-transparent hover:bg-[#f8f9ff]'
                  }`}
                >
                  <div className={`absolute -left-[22px] top-3.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm z-10 ${
                    item.gpsVerified ? 'bg-[#006c49]' : 'bg-[#ba1a1a]'
                  }`}></div>
                  <div className="flex justify-between items-start text-[10px] w-full">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-[#0b1c30]">{lang === 'BN' ? item.titleBN : item.titleEN}</h4>
                      <p className="text-[9px] text-[#75777d]">{lang === 'BN' ? item.detailBN : item.detailEN}</p>
                      
                      <div className="flex flex-wrap gap-1.5 py-1">
                        <span className={`px-2 py-0.2 rounded-full font-bold text-[8px] flex items-center gap-0.5 ${
                          item.gpsVerified ? 'bg-[#9af2c5] text-[#0c714d]' : 'bg-[#ffdad6] text-[#93000a]'
                        }`}>
                          {item.gpsVerified ? <CheckCircle2 size={10} /> : <MapPinOff size={10} />}
                          {item.gpsVerified ? (lang === 'BN' ? 'GPS ভেরিফাইড' : 'GPS Verified') : (lang === 'BN' ? 'লোকেশন অমিল' : 'GPS Mismatch')}
                        </span>
                        
                        <span className={`px-2 py-0.2 rounded-full font-bold text-[8px] flex items-center gap-0.5 border ${
                          item.photoProof ? 'bg-[#eff4ff] text-[#0b1c30] border-[#c5c6cd]/25' : 'bg-[#f5f3f5] text-[#75777d] border-transparent'
                        }`}>
                          <Camera size={10} className={item.photoProof ? 'text-[#0c714d]' : 'text-[#75777d]'} />
                          {item.photoProof ? (lang === 'BN' ? 'ছবি প্রমাণ OK' : 'Photo Proof OK') : (lang === 'BN' ? 'ছবি প্রমাণ নেই' : 'Photo Missing')}
                        </span>
                      </div>
                      
                      <p className="text-[#44474c] bg-white p-1.5 rounded border border-[#c5c6cd]/10 text-[9px] mt-1.5">
                        <strong className="font-bold">{lang === 'BN' ? 'নোট:' : 'Note:'}</strong> {lang === 'BN' ? item.noteBN : item.noteEN}
                      </p>
                    </div>
                    <span className="text-[#75777d] font-semibold shrink-0">{item.time}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Manager Review Comments Box */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#c5c6cd]/30 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-[#0b1c30]">
              {lang === 'BN' ? 'ম্যানেজার রিভিউ ও মতামত' : 'Manager Review Comments'}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-[#44474c]">
                {approved ? (lang === 'BN' ? 'অনুমোদিত' : 'Approved') : (lang === 'BN' ? 'অপেক্ষমান' : 'Pending')}
              </span>
              <button
                onClick={handleRouteApproveToggle}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  approved ? 'bg-[#006c49]' : 'bg-[#c5c6cd]'
                }`}
                role="switch"
                aria-checked={approved}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    approved ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-[#eff4ff]/30 border border-[#c5c6cd]/50 rounded-xl p-3 text-xs focus:outline-none focus:border-[#006c49] min-h-[80px]"
            placeholder={lang === 'BN' ? 'আপনার মন্তব্য লিখুন...' : 'Write your comments here...'}
          />
        </section>

        {/* Dynamic Mock Explanation Input Modal Overlay */}
        {showExplanationBox && (
          <div className="fixed inset-0 z-50 bg-black/55 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl p-5 w-full max-w-[380px] shadow-2xl border border-[#c5c6cd]/30 space-y-4">
              <div className="flex justify-between items-center border-b border-[#eff4ff] pb-2">
                <h3 className="text-xs font-bold text-[#0b1c30]">
                  {lang === 'BN' ? 'এফএসও ব্যাখ্যা তলব' : 'Request Explanation'}
                </h3>
                <button 
                  onClick={() => setShowExplanationBox(false)}
                  className="text-[#75777d] hover:text-[#0b1c30] p-0.5 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-[10px] text-[#44474c] leading-relaxed">
                {lang === 'BN'
                  ? `${officer.name}-এর নিকট আজকের বিচ্যুতি বা অসঙ্গতির বিষয়ে ব্যাখ্যা চেয়ে বার্তা পাঠান। এটি ফিজিক্যাল ডিভাইস এলার্ট ট্রিগার করবে।`
                  : `Send an official inquiry request to FSO ${officer.name} concerning route or collection anomalies.`}
              </p>
              <textarea
                value={explanationQuery}
                onChange={(e) => setExplanationQuery(e.target.value)}
                placeholder={lang === 'BN' ? 'ব্যাখ্যার বিষয় লিখুন (যেমন: রহমান ট্রেডার্সে লোকেশন মিলছে না কেন?)' : 'Enter the query details...'}
                className="w-full bg-[#f8f9ff] border border-[#c5c6cd]/60 rounded-xl p-3 text-xs min-h-[90px] focus:outline-none focus:ring-1 focus:ring-[#006c49]"
              />
              <div className="flex gap-2.5 pt-1.5">
                <button
                  onClick={() => setShowExplanationBox(false)}
                  className="flex-1 bg-white border border-[#c5c6cd] text-[#44474c] text-[10px] font-bold py-2.5 rounded-xl hover:bg-[#eff4ff] active:scale-95 transition-all outline-none"
                >
                  {lang === 'BN' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  onClick={submitExplanationQuery}
                  className="flex-1 bg-[#ba1a1a] text-white text-[10px] font-bold py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all outline-none"
                >
                  {lang === 'BN' ? 'অনুরোধ পাঠান' : 'Submit Request'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Manager Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex gap-2">
            <button 
              onClick={handleSendReminder}
              className={`flex-grow flex-1 border font-semibold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all outline-none ${
                reminderSent 
                  ? 'bg-[#9af2c5]/25 border-[#006c49]/30 text-[#0c714d]' 
                  : 'bg-white border-[#c5c6cd] text-[#44474c] hover:bg-[#eff4ff]'
              }`}
            >
              {reminderSent ? <Check size={15} /> : <Bell size={14} />}
              <span>
                {reminderSent
                  ? (lang === 'BN' ? 'রিমাইন্ডার পাঠানো হয়েছে' : 'Reminder Sent')
                  : (lang === 'BN' ? 'রিমাইন্ডার পাঠান' : 'Send Reminder')}
              </span>
            </button>
            <button 
              onClick={handleAskExplanation}
              className="flex-grow flex-1 bg-white text-[#44474c] border border-[#c5c6cd] font-semibold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#eff4ff] active:scale-95 transition-all outline-none"
            >
              <HelpCircle size={15} />
              <span>{lang === 'BN' ? 'ব্যাখ্যা চান' : 'Ask Explanation'}</span>
            </button>
          </div>
          <button 
            onClick={handleRouteReview}
            className="w-full bg-[#0b1c30] text-white font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-1.5 hover:opacity-95 active:scale-[0.98] transition-all shadow-md outline-none"
          >
            <FileCheck size={16} />
            <span>{lang === 'BN' ? 'টেরিটরি ম্যাপে রুট ট্র্যাক করুন' : 'Track Route on Map'}</span>
          </button>
        </div>
      </main>

      {/* Floating Toast Notification */}
      {toast.visible && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#0e1c2f]/95 text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#c5c6cd]/25 text-[10px] font-semibold transition-all duration-300 w-[90%] text-center backdrop-blur-sm animate-fade-in-up">
          {toast.message}
        </div>
      )}
    </PhoneFrame>
  );
};
export default ManagerOfficerDetail;
