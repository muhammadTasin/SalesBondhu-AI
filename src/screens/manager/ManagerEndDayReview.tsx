import React, { useState, useEffect } from 'react';
import { PhoneFrame } from '../../components/PhoneFrame';
import { AppHeader } from '../../components/AppHeader';
import { BottomNav } from '../../components/BottomNav';
import { mockEODSummary } from '../../data/managerMockData';
import { exportCSV, exportJSON, generateERPPayload } from '../../lib/demoActions';
import {
  Sparkles,
  Award,
  BookOpen,
  CalendarDays,
  FileSpreadsheet,
  CheckSquare,
  ClipboardCheck,
  TrendingUp,
  Banknote,
  Navigation,
  Compass,
  Download,
  Server,
  Code,
  X,
  Check,
  CheckSquare as CheckedIcon,
  Square as UncheckedIcon,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export const ManagerEndDayReview: React.FC = () => {
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  
  // Stateful inputs
  const [aiBrief, setAiBrief] = useState('');
  const [weeklyCompleted, setWeeklyCompleted] = useState<Record<string, boolean>>({
    coverage: false,
    risk: true,
    conversion: false,
    gps: false,
    photo: true
  });
  
  // Approval states
  const [approved, setApproved] = useState(false);
  const [approvalTime, setApprovalTime] = useState<string | null>(null);

  // Export & Sync modal overlays
  const [showExportModal, setShowExportModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);
  
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  // Sync brief content depending on language on mount
  useEffect(() => {
    setAiBrief(
      lang === 'BN' 
        ? 'আজ ঢাকা দক্ষিণ জোনে ৭/৮ ভিজিট সম্পন্ন হয়েছে। মোট কালেকশন ৳৯৫,০০০ এবং নতুন অর্ডার ৳২,৮০,০০০। উত্তর জোনে Brand X এর ডিসকাউন্ট অফারের কারণে কিছু ডিলার দ্বিধাগ্রস্ত। রহিম আহমেদ এর রুট বিচ্যুতি (২.৪ কিমি) এবং কম অ্যাক্টিভিটি লক্ষ্য করা গেছে। কাল ৩টি ফলো-আপ কল এবং বকেয়া আদায় করতে হবে।' 
        : 'Today 7/8 visits completed in Dhaka South. Total collections reached ৳95,000 against new orders of ৳2,80,000. Under North Zone, some dealers showed hesitation due to Brand X 10% extra discount. Rahim Ahmed logged route deviation (2.4 km) and lower activity. Suggest 3 follow-ups tomorrow.'
    );
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  const showToastMessage = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2500);
  };

  const handleCheckboxToggle = (key: string) => {
    setWeeklyCompleted((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
    showToastMessage(
      lang === 'BN' ? 'সাপ্তাহিক চেকলিস্ট আপডেট করা হয়েছে।' : 'Weekly checklist updated.'
    );
  };

  const handleApproveReport = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setApproved(true);
    setApprovalTime(formattedTime);
    showToastMessage(
      lang === 'BN'
        ? `দিনের রিপোর্ট সফলভাবে অনুমোদিত এবং লক করা হয়েছে (সময়: ${formattedTime})!`
        : `Daily report approved and locked at ${formattedTime}!`
    );
  };

  // CSV Exporter Action
  const handleExportCSV = () => {
    const headers = ['Dealer Name', 'FSO Assigned', 'Sales Amount', 'Collection Amount', 'Coverage', 'Risk Status'];
    const data = [
      ['Rahman Traders', 'Rahim Ahmed', '৳1.2L', '৳15,000', '15%', 'High Risk'],
      ['Karim Paint House', 'Kamrul Hasan', '৳2.5L', '৳80,000', '60%', 'Medium Risk'],
      ['Mirpur Paint Market', 'Kamrul Hasan', '৳4.8L', '৳4.0L', '95%', 'Healthy'],
      ['Badda Dealer Belt', 'Rahim Ahmed', '৳3.2L', '৳3.0L', '90%', 'Healthy'],
      ['Uttara Dealer Belt', 'Unassigned', '৳1.0L', '৳50,000', '45%', 'Potential']
    ];
    exportCSV(data, headers, 'salesbondhu-manager-report-2026-06-17.csv');
    showToastMessage(
      lang === 'BN' ? 'CSV ফাইল ডাউনলোড সম্পন্ন হয়েছে!' : 'CSV file downloaded successfully!'
    );
  };

  // JSON Exporter Action
  const handleExportJSON = () => {
    const payload = generateERPPayload('Arif Rahman', '2026-06-17', mockEODSummary);
    exportJSON(payload, 'salesbondhu-manager-report-2026-06-17.json');
    showToastMessage(
      lang === 'BN' ? 'JSON ফাইল ডাউনলোড সম্পন্ন হয়েছে!' : 'JSON file downloaded successfully!'
    );
  };

  // Central Sync Mock Integration
  const handleCentralSync = () => {
    setIsSyncing(true);
    setSyncDone(false);
    
    // Simulate API connection latencies
    setTimeout(() => {
      setIsSyncing(false);
      setSyncDone(true);
      showToastMessage(
        lang === 'BN'
          ? 'সেন্ট্রাল সার্ভার সিঙ্ক সম্পন্ন হয়েছে এবং ইআরপিতে সাবমিট হয়েছে!'
          : 'Central server sync queued. ERP-compatible payload prepared.'
      );
      
      /**
       * TODO: Integrate real API endpoint.
       * Fetch token from session and transmit ERP payload:
       * 
       * const payload = generateERPPayload('Arif Rahman', '2026-06-17', mockEODSummary);
       * fetch('https://api.example.com/v1/erp/sync', {
       *   method: 'POST',
       *   headers: {
       *     'Content-Type': 'application/json',
       *     'Authorization': `Bearer ${accessToken}`
       *   },
       *   body: JSON.stringify(payload)
       * })
       * .then(res => res.json())
       * .then(data => console.log("ERP Sync Success:", data))
       * .catch(err => console.error("ERP Sync Failed:", err));
       */
    }, 1200);
  };

  const erpPayloadPreview = generateERPPayload('Arif Rahman', '2026-06-17', mockEODSummary);

  return (
    <PhoneFrame>
      <AppHeader
        title={lang === 'BN' ? 'ম্যানেজার ইওডি রিভিউ' : 'Manager EOD Review'}
        subtitle={lang === 'BN' ? 'টেরিটরির দৈনিক ও সাপ্তাহিক কার্যবিবরণী' : 'Daily & Weekly Territory Reviews'}
        syncTime={lang === 'BN' ? '১৮:৪৫ PM' : '06:45 PM'}
        showGPSStatus={false}
        lang={lang}
        onLanguageToggle={toggleLanguage}
      />

      <main className="flex-grow space-y-5 px-4 overflow-y-auto pb-6 relative">
        
        {/* Approval Lock Banner */}
        {approved && (
          <div className="bg-[#9af2c5]/20 text-[#0c714d] border border-[#006c49]/30 rounded-xl p-3 flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle2 size={18} className="shrink-0" />
            <span className="text-[10px] font-bold">
              {lang === 'BN' 
                ? `দিনের রিপোর্ট অনুমোদিত এবং লক করা হয়েছে (সময়: ${approvalTime})` 
                : `Daily EOD report approved and locked at ${approvalTime}`}
            </span>
          </div>
        )}

        {/* Daily Summary Stats Grid */}
        <section className="space-y-2">
          <h3 className="text-xs font-bold text-[#0b1c30] px-1 uppercase tracking-wider">
            {lang === 'BN' ? 'আজকের অর্জিত ফলাফল' : 'Daily Summary Grid'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 border border-[#c5c6cd]/30 shadow-sm flex items-center gap-2">
              <div className="bg-[#9af2c5]/20 p-2 rounded-xl text-[#006c49]">
                <TrendingUp size={16} />
              </div>
              <div>
                <span className="text-[8px] text-[#75777d] block uppercase">{lang === 'BN' ? 'অর্ডার সম্পন্ন' : 'Sales Achieved'}</span>
                <span className="text-xs font-bold text-[#0b1c30]">৳২,৮০,০০০</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 border border-[#c5c6cd]/30 shadow-sm flex items-center gap-2">
              <div className="bg-[#eff4ff] p-2 rounded-xl text-[#0b1c30]">
                <Banknote size={16} />
              </div>
              <div>
                <span className="text-[8px] text-[#75777d] block uppercase">{lang === 'BN' ? 'আদায়কৃত কালেকশন' : 'Collection Achieved'}</span>
                <span className="text-xs font-bold text-[#0b1c30]">৳৯৫,০০০</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 border border-[#c5c6cd]/30 shadow-sm flex items-center gap-2">
              <div className="bg-[#eff4ff] p-2 rounded-xl text-[#0b1c30]">
                <Compass size={16} />
              </div>
              <div>
                <span className="text-[8px] text-[#75777d] block uppercase">{lang === 'BN' ? 'টেরিটরি কভারেজ' : 'Route Coverage'}</span>
                <span className="text-xs font-bold text-[#0b1c30]">৮৫%</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 border border-[#c5c6cd]/30 shadow-sm flex items-center gap-2">
              <div className="bg-[#9af2c5]/20 p-2 rounded-xl text-[#006c49]">
                <Navigation size={16} />
              </div>
              <div>
                <span className="text-[8px] text-[#75777d] block uppercase">{lang === 'BN' ? 'ভিজিট সম্পন্ন' : 'Visits Completed'}</span>
                <span className="text-xs font-bold text-[#0b1c30]">৭/৮</span>
              </div>
            </div>
          </div>
        </section>

        {/* AI Manager Brief Section */}
        <section className="bg-white rounded-2xl p-4 border border-[#c5c6cd]/30 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-[#eff4ff] pb-2">
            <h3 className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#0c714d] fill-[#9af2c5]/30" />
              <span>{lang === 'BN' ? 'এআই ম্যানেজার ব্রিফ' : 'AI Manager Brief'}</span>
            </h3>
            <span className="text-[8px] font-bold text-[#0c714d] bg-[#9af2c5]/25 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {lang === 'BN' ? 'অটো-জেনারেটেড' : 'AI Generated'}
            </span>
          </div>
          <textarea
            value={aiBrief}
            onChange={(e) => setAiBrief(e.target.value)}
            disabled={approved}
            className="w-full bg-[#f8f9ff] border-none rounded-xl p-3 text-xs text-[#44474c] focus:ring-1 focus:ring-[#006c49] outline-none min-h-[100px] leading-relaxed resize-y disabled:opacity-85"
            placeholder={lang === 'BN' ? 'এআই ব্রিফ জেনারেট হচ্ছে...' : 'AI Brief generating...'}
          />
        </section>

        {/* Performance & Coaching */}
        <section className="bg-white rounded-2xl p-4 border border-[#c5c6cd]/30 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-[#0b1c30] border-b border-[#eff4ff] pb-2 uppercase tracking-wider">
            {lang === 'BN' ? 'পারফরম্যান্স ও ফিল্ড মনিটরিং' : 'Field Performance & Coaching'}
          </h3>
          
          <div className="space-y-3 text-[10px]">
            {/* Top Performers */}
            <div className="flex items-start gap-2.5">
              <div className="bg-[#9af2c5]/25 p-1.5 rounded-lg text-[#006c49] shrink-0 mt-0.5">
                <Award size={15} />
              </div>
              <div>
                <p className="font-bold text-[#0b1c30]">{lang === 'BN' ? 'সেরা পারফর্মার (Top Performer)' : 'Top Performer'}</p>
                <p className="text-[#44474c] mt-0.5">
                  <strong className="font-semibold text-[#006c49]">{mockEODSummary.topPerformer}</strong> {lang === 'BN' ? 'আজ ১১২% কালেকশন অর্জন করে শীর্ষে আছেন।' : 'met 112% of collection target today.'}
                </p>
              </div>
            </div>

            {/* Coaching Needs */}
            <div className="flex items-start gap-2.5">
              <div className="bg-[#ffdad6] text-[#ba1a1a] p-1.5 rounded-lg shrink-0 mt-0.5">
                <BookOpen size={15} />
              </div>
              <div>
                <p className="font-bold text-[#0b1c30]">{lang === 'BN' ? 'কোচিং এর প্রয়োজন (Coaching Needs)' : 'Coaching Needs'}</p>
                <p className="text-[#44474c] mt-0.5">
                  <strong className="font-semibold text-[#ba1a1a]">{mockEODSummary.coachingNeeds}</strong> {lang === 'BN' ? 'রুট বিচ্যুতি ও কম জিপিএস স্কোরের জন্য মেন্টরিং প্রয়োজন।' : 'requires routing mismatch review and GPS deviation advice.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Points */}
        <section className="bg-white rounded-2xl p-4 border border-[#c5c6cd]/30 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-[#0b1c30] border-b border-[#eff4ff] pb-2 uppercase tracking-wider">
            {lang === 'BN' ? 'পরবর্তী কর্মপরিকল্পনা' : 'Action Points'}
          </h3>
          
          <div className="space-y-3 text-[10px]">
            {/* Tomorrow's Action Points */}
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1 bg-[#eff4ff] text-[#0b1c30] px-2 py-0.5 rounded-full font-bold text-[8px]">
                <CalendarDays size={10} />
                {lang === 'BN' ? 'আগামীকালের অ্যাকশন পয়েন্ট' : "Tomorrow's Action Points"}
              </span>
              <ul className="list-disc list-inside space-y-1 text-[#44474c] ml-1 pl-1">
                {(lang === 'BN' ? mockEODSummary.tomorrowActionsBN : mockEODSummary.tomorrowActionsEN).map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            </div>

            {/* Weekly Checklist */}
            <div className="space-y-2 border-t border-[#eff4ff] pt-2.5">
              <span className="inline-flex items-center gap-1 bg-[#eff4ff] text-[#0b1c30] px-2 py-0.5 rounded-full font-bold text-[8px]">
                <CheckSquare size={10} />
                {lang === 'BN' ? 'সাপ্তাহিক অ্যাকশন পয়েন্ট (চেকলিস্ট)' : 'Weekly Action Points'}
              </span>
              
              <div className="space-y-2.5 pl-1 pt-1.5">
                {/* Checkbox 1 */}
                <button
                  onClick={() => handleCheckboxToggle('coverage')}
                  disabled={approved}
                  className="flex items-start gap-2.5 text-left w-full focus:outline-none"
                >
                  {weeklyCompleted.coverage ? (
                    <CheckedIcon size={14} className="text-[#006c49] shrink-0 mt-0.5" />
                  ) : (
                    <UncheckedIcon size={14} className="text-[#75777d] shrink-0 mt-0.5" />
                  )}
                  <span className={`text-[10px] ${weeklyCompleted.coverage ? 'line-through text-[#75777d]' : 'text-[#44474c]'}`}>
                    {lang === 'BN' ? 'কম কভারেজ এরিয়াগুলোর রুট পুনর্নির্ধারণ করা' : 'Low coverage territory review'}
                  </span>
                </button>

                {/* Checkbox 2 */}
                <button
                  onClick={() => handleCheckboxToggle('risk')}
                  disabled={approved}
                  className="flex items-start gap-2.5 text-left w-full focus:outline-none"
                >
                  {weeklyCompleted.risk ? (
                    <CheckedIcon size={14} className="text-[#006c49] shrink-0 mt-0.5" />
                  ) : (
                    <UncheckedIcon size={14} className="text-[#75777d] shrink-0 mt-0.5" />
                  )}
                  <span className={`text-[10px] ${weeklyCompleted.risk ? 'line-through text-[#75777d]' : 'text-[#44474c]'}`}>
                    {lang === 'BN' ? 'কালেকশন ঝুঁকি ও ক্রেডিট সীমা অডিট করা' : 'Collection risk follow-up'}
                  </span>
                </button>

                {/* Checkbox 3 */}
                <button
                  onClick={() => handleCheckboxToggle('conversion')}
                  disabled={approved}
                  className="flex items-start gap-2.5 text-left w-full focus:outline-none"
                >
                  {weeklyCompleted.conversion ? (
                    <CheckedIcon size={14} className="text-[#006c49] shrink-0 mt-0.5" />
                  ) : (
                    <UncheckedIcon size={14} className="text-[#75777d] shrink-0 mt-0.5" />
                  )}
                  <span className={`text-[10px] ${weeklyCompleted.conversion ? 'line-through text-[#75777d]' : 'text-[#44474c]'}`}>
                    {lang === 'BN' ? 'সম্ভাব্য ডিলার রূপান্তর অগ্রগতি নিশ্চিত করা' : 'High-potential dealer conversion'}
                  </span>
                </button>

                {/* Checkbox 4 */}
                <button
                  onClick={() => handleCheckboxToggle('gps')}
                  disabled={approved}
                  className="flex items-start gap-2.5 text-left w-full focus:outline-none"
                >
                  {weeklyCompleted.gps ? (
                    <CheckedIcon size={14} className="text-[#006c49] shrink-0 mt-0.5" />
                  ) : (
                    <UncheckedIcon size={14} className="text-[#75777d] shrink-0 mt-0.5" />
                  )}
                  <span className={`text-[10px] ${weeklyCompleted.gps ? 'line-through text-[#75777d]' : 'text-[#44474c]'}`}>
                    {lang === 'BN' ? 'জিপিএস বিচ্যুতির জন্য রহিম আহমেদকে কোচিং প্রদান' : 'GPS mismatch coaching sessions'}
                  </span>
                </button>

                {/* Checkbox 5 */}
                <button
                  onClick={() => handleCheckboxToggle('photo')}
                  disabled={approved}
                  className="flex items-start gap-2.5 text-left w-full focus:outline-none"
                >
                  {weeklyCompleted.photo ? (
                    <CheckedIcon size={14} className="text-[#006c49] shrink-0 mt-0.5" />
                  ) : (
                    <UncheckedIcon size={14} className="text-[#75777d] shrink-0 mt-0.5" />
                  )}
                  <span className={`text-[10px] ${weeklyCompleted.photo ? 'line-through text-[#75777d]' : 'text-[#44474c]'}`}>
                    {lang === 'BN' ? 'ছবি প্রমাণ ভেরিফিকেশন কমপ্লায়েন্স সম্পন্ন করা' : 'Photo proof compliance validation'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Review & Export triggers */}
        <div className="flex gap-3 pt-2">
          <button 
            onClick={() => setShowExportModal(true)}
            className="flex-grow flex-1 bg-white text-[#44474c] border border-[#c5c6cd] font-semibold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#eff4ff] active:scale-95 transition-all outline-none"
          >
            <FileSpreadsheet size={15} />
            <span>{lang === 'BN' ? 'রিপোর্ট এক্সপোর্ট' : 'Export Report'}</span>
          </button>
          
          <button 
            onClick={handleApproveReport}
            disabled={approved}
            className={`flex-grow flex-1 font-semibold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md outline-none ${
              approved
                ? 'bg-[#9af2c5] text-[#0c714d] border border-[#006c49]/20 shadow-none cursor-default'
                : 'bg-[#006c49] text-white hover:bg-[#0c714d]'
            }`}
          >
            <ClipboardCheck size={16} />
            <span>{approved ? (lang === 'BN' ? 'অনুমোদিত ও লক' : 'Approved & Locked') : (lang === 'BN' ? 'অনুমোদন ও ক্লোজ' : 'Approve & Close')}</span>
          </button>
        </div>

        {/* Dynamic Modal Sheet for Export Options */}
        {showExportModal && (
          <div className="fixed inset-0 z-50 bg-black/55 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl p-5 w-full max-w-[390px] shadow-2xl border border-[#c5c6cd]/30 space-y-4">
              <div className="flex justify-between items-center border-b border-[#eff4ff] pb-2">
                <h3 className="text-xs font-bold text-[#0b1c30]">
                  {lang === 'BN' ? 'ডাটা ও রিপোর্ট এক্সপোর্ট' : 'Export Reports & Payloads'}
                </h3>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="text-[#75777d] hover:text-[#0b1c30] p-0.5 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="text-[10px] text-[#44474c] leading-relaxed">
                {lang === 'BN'
                  ? 'দৈনিক পারফরম্যান্স এবং রুট ট্র্যাকিং এর ডাটা ডাউনলোড করুন অথবা সরাসরি সেন্ট্রাল ইআরপি সার্ভারের সাথে সিঙ্ক করুন।'
                  : 'Download daily logistics files or trigger active sync queries directly with the enterprise database.'}
              </p>

              {/* Action grid */}
              <div className="space-y-2.5">
                {/* 1. Excel CSV */}
                <button 
                  onClick={handleExportCSV}
                  className="w-full bg-[#f8f9ff] hover:bg-[#eff4ff] border border-[#c5c6cd]/50 rounded-xl p-3 flex items-center justify-between text-left transition-all active:scale-[0.98] outline-none"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="bg-[#9af2c5]/25 p-1.5 rounded-lg text-[#006c49]">
                      <FileSpreadsheet size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#0b1c30] block">Excel-Compatible CSV</span>
                      <span className="text-[8px] text-[#75777d]">{lang === 'BN' ? 'ডাউনলোড: salesbondhu-manager-report.csv' : 'Download standard CSV report'}</span>
                    </div>
                  </div>
                  <Download size={14} className="text-[#75777d]" />
                </button>

                {/* 2. JSON */}
                <button 
                  onClick={handleExportJSON}
                  className="w-full bg-[#f8f9ff] hover:bg-[#eff4ff] border border-[#c5c6cd]/50 rounded-xl p-3 flex items-center justify-between text-left transition-all active:scale-[0.98] outline-none"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="bg-[#eff4ff] p-1.5 rounded-lg text-[#0b1c30]">
                      <Download size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#0b1c30] block">JSON Dataset Report</span>
                      <span className="text-[8px] text-[#75777d]">{lang === 'BN' ? 'ডাউনলোড: standard-json-dataset.json' : 'Download structured json file'}</span>
                    </div>
                  </div>
                  <Download size={14} className="text-[#75777d]" />
                </button>

                {/* 3. ERP Sync */}
                <button 
                  onClick={handleCentralSync}
                  disabled={isSyncing}
                  className={`w-full border rounded-xl p-3 flex items-center justify-between text-left transition-all outline-none ${
                    syncDone 
                      ? 'bg-[#9af2c5]/25 border-[#006c49]/30 text-[#0c714d]' 
                      : 'bg-[#f8f9ff] hover:bg-[#eff4ff] border-[#c5c6cd]/50 active:scale-[0.98]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${syncDone ? 'bg-[#9af2c5]/40 text-[#006c49]' : 'bg-[#e5eeff] text-[#0e1c2f]'}`}>
                      <Server size={16} className={isSyncing ? 'animate-bounce' : ''} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#0b1c30] block">Central Server Sync</span>
                      <span className="text-[8px] text-[#75777d]">
                        {isSyncing 
                          ? (lang === 'BN' ? 'সিঙ্ক করা হচ্ছে...' : 'Syncing databases...') 
                          : syncDone 
                            ? (lang === 'BN' ? 'সিঙ্ক সম্পন্ন ও কিউড!' : 'Sync completed & ERP queued!') 
                            : (lang === 'BN' ? 'ইআরপি ক্লাউড কিউ সিঙ্ক করুন' : 'Push to enterprise central ERP queue')}
                      </span>
                    </div>
                  </div>
                  {isSyncing ? (
                    <RefreshCw size={14} className="animate-spin text-[#006c49]" />
                  ) : syncDone ? (
                    <Check size={14} className="text-[#006c49]" />
                  ) : (
                    <Server size={14} className="text-[#75777d]" />
                  )}
                </button>
              </div>

              {/* Scrollable Code block for ERP-Ready Payload */}
              <div className="space-y-1">
                <span className="text-[8px] font-bold text-[#75777d] uppercase flex items-center gap-1">
                  <Code size={10} />
                  {lang === 'BN' ? 'ইআরপি-রেডি পেলোড প্রাক-দর্শন' : 'ERP-Ready JSON Payload Preview'}
                </span>
                <div className="max-h-24 overflow-y-auto bg-[#0e1c2f] text-[#9af2c5] p-2.5 rounded-xl text-[8px] font-mono leading-relaxed border border-[#c5c6cd]/15">
                  <pre>{JSON.stringify(erpPayloadPreview, null, 2)}</pre>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="w-full bg-[#0b1c30] text-white text-[10px] font-bold py-2.5 rounded-xl hover:opacity-95 active:scale-95 transition-all outline-none"
                >
                  {lang === 'BN' ? 'বন্ধ করুন' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Toast Notification */}
      {toast.visible && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#0e1c2f]/95 text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#c5c6cd]/25 text-[10px] font-semibold transition-all duration-300 w-[90%] text-center backdrop-blur-sm animate-fade-in-up">
          {toast.message}
        </div>
      )}

      <BottomNav />
    </PhoneFrame>
  );
};
export default ManagerEndDayReview;
