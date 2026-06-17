import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { AppHeader } from '../components/AppHeader';
import { Download, StopCircle } from 'lucide-react';
import { PhotoProofUploader } from '../components/PhotoProofUploader';
import { saveVisitCompletion } from '../services/visitDraftService';

export const ActiveVisit: React.FC = () => {
  const navigate = useNavigate();
  const { visitId } = useParams<{ visitId: string }>();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [elapsedMinutes, setElapsedMinutes] = useState(12);

  // Form states
  const [orderAmount, setOrderAmount] = useState('');
  const [collectionAmount, setCollectionAmount] = useState('');
  const [followupDate, setFollowupDate] = useState('');
  const [competitorUpdate, setCompetitorUpdate] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [showBlankConfirm, setShowBlankConfirm] = useState(false);

  useEffect(() => {
    console.log('Active visit initialized for ID:', visitId);
    const interval = setInterval(() => {
      setElapsedMinutes((prev) => prev + 1);
    }, 60000); // Increment every minute
    return () => clearInterval(interval);
  }, [visitId]);

  const completeVisit = (completedWithoutData: boolean) => {
    const missingFields: string[] = [];
    const filledFields: string[] = [];

    if (orderAmount.trim() === '') missingFields.push('orderAmount'); else filledFields.push('orderAmount');
    if (collectionAmount.trim() === '') missingFields.push('collectionAmount'); else filledFields.push('collectionAmount');
    if (followupDate.trim() === '') missingFields.push('followupDate'); else filledFields.push('followupDate');
    if (competitorUpdate.trim() === '') missingFields.push('competitorUpdate'); else filledFields.push('competitorUpdate');
    if (notes.trim() === '') missingFields.push('notes'); else filledFields.push('notes');
    if (selectedPhotos.length === 0) missingFields.push('proofPhotos'); else filledFields.push('proofPhotos');

    saveVisitCompletion({
      visitId: visitId || 'unknown-visit',
      dealerId: '1', // Rahman Traders has ID '1' in map/preparation
      completedAt: new Date().toISOString(),
      completedWithoutData,
      missingFields,
      filledFields,
      note: completedWithoutData 
        ? "Sales officer completed visit without entering order, collection, note, or proof photo."
        : "Sales officer completed visit with data.",
      data: completedWithoutData ? undefined : {
        orderAmount,
        collectionAmount,
        followupDate,
        competitorUpdate,
        notes,
        photosCount: selectedPhotos.length
      }
    });

    if (completedWithoutData) {
      alert(lang === 'BN' ? 'ভিজিট শেষ হয়েছে — কোনো তথ্য দেওয়া হয়নি' : 'Visit completed — no data provided');
    } else {
      alert(lang === 'BN' ? 'ভিজিটটি সফলভাবে সম্পন্ন হয়েছে!' : 'Visit completed successfully!');
    }
    navigate('/today');
  };

  const handleEndVisit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isFormBlank = 
      orderAmount.trim() === '' &&
      collectionAmount.trim() === '' &&
      followupDate.trim() === '' &&
      competitorUpdate.trim() === '' &&
      notes.trim() === '' &&
      selectedPhotos.length === 0;

    if (isFormBlank) {
      setShowBlankConfirm(true);
    } else {
      completeVisit(false);
    }
  };

  const handleSaveOffline = () => {
    alert(lang === 'BN' ? 'ভিজিট ডাটা অফলাইনে সংরক্ষণ করা হয়েছে!' : 'Visit data saved offline!');
    navigate('/today');
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  return (
    <PhoneFrame>
      <AppHeader
        title={lang === 'BN' ? 'চলমান ভিজিট' : 'Active Visit'}
        subtitle={lang === 'BN' ? 'রহমান ট্রেডার্স' : 'Rahman Traders'}
        showGPSStatus={true}
        syncTime="২ মিনিট আগে"
        lang={lang}
        onLanguageToggle={toggleLanguage}
      />

      <main className="flex-grow overflow-y-auto px-4 pb-24 mt-2 space-y-5">
        {/* Status Card & Timer */}
        <div className="bg-white rounded-[20px] p-5 shadow-sm border border-[#e5eeff]/50 flex flex-col items-center justify-center text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#9af2c5]/30 text-[#0c714d] px-3.5 py-1 rounded-full font-bold text-[11px] animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]" />
            {lang === 'BN' ? 'ভিজিট চলছে' : 'Visit In Progress'}
          </div>
          
          <div className="relative w-28 h-28 flex items-center justify-center mt-2">
            {/* SVG Timer circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-[#006c49]/10"
                cx="50"
                cy="50"
                fill="none"
                r="44"
                stroke="currentColor"
                strokeWidth="5"
              />
              <circle
                className="text-[#006c49] transition-all duration-500 ease-in-out"
                cx="50"
                cy="50"
                fill="none"
                r="44"
                stroke="currentColor"
                strokeWidth="5"
                strokeDasharray="276.4"
                strokeDashoffset="120"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex flex-col items-center z-10">
              <span className="text-2xl font-bold text-[#0b1c30]">{elapsedMinutes}</span>
              <span className="text-[10px] text-[#44474c] font-semibold">{lang === 'BN' ? 'মিনিট' : 'Mins'}</span>
            </div>
          </div>
        </div>

        {/* Input Fields Form */}
        <form onSubmit={handleEndVisit} className="bg-white rounded-[20px] p-5 shadow-sm border border-[#e5eeff]/50 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#44474c] mb-1.5">
                {lang === 'BN' ? 'অর্ডারের পরিমাণ' : 'Order Amount'}
              </label>
              <input
                type="number"
                placeholder="৳ ০.০০"
                value={orderAmount}
                onChange={(e) => setOrderAmount(e.target.value)}
                className="w-full bg-[#eff4ff] border-none rounded-xl py-3 px-3 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#bac7e1] outline-none h-11 placeholder-[#75777d]/60"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#44474c] mb-1.5">
                {lang === 'BN' ? 'কালেকশনের পরিমাণ' : 'Collection Amount'}
              </label>
              <input
                type="number"
                placeholder="৳ ০.০০"
                value={collectionAmount}
                onChange={(e) => setCollectionAmount(e.target.value)}
                className="w-full bg-[#eff4ff] border-none rounded-xl py-3 px-3 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#bac7e1] outline-none h-11 placeholder-[#75777d]/60"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#44474c] mb-1.5">
              {lang === 'BN' ? 'পরবর্তী ফলো-আপের তারিখ' : 'Follow-up Date'}
            </label>
            <input
              type="date"
              value={followupDate}
              onChange={(e) => setFollowupDate(e.target.value)}
              className="w-full bg-[#eff4ff] border-none rounded-xl py-3 px-3 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#bac7e1] outline-none h-11"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#44474c] mb-1.5">
              {lang === 'BN' ? 'কম্পিটিটর আপডেট' : 'Competitor Update'}
            </label>
            <input
              type="text"
              placeholder={lang === 'BN' ? 'প্রতিযোগীর নাম ও অফার...' : 'Competitor name and offers...'}
              value={competitorUpdate}
              onChange={(e) => setCompetitorUpdate(e.target.value)}
              className="w-full bg-[#eff4ff] border-none rounded-xl py-3 px-3 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#bac7e1] outline-none h-11 placeholder-[#75777d]/60"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#44474c] mb-1.5" htmlFor="visit-notes">
              {lang === 'BN' ? 'ভিজিট নোট দিন' : 'Visit Notes'}
            </label>
            <textarea
              id="visit-notes"
              rows={2}
              placeholder={lang === 'BN' ? 'ভিজিটের বিস্তারিত বিবরণ...' : 'Enter visit details...'}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#eff4ff] border-none rounded-xl py-3 px-3 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#bac7e1] outline-none transition-all resize-none placeholder-[#75777d]/60"
            />
          </div>

          {/* Proof Photos Area */}
          <PhotoProofUploader
            lang={lang}
            uploadStyle="active-visit"
            onPhotosChange={setSelectedPhotos}
          />

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleSaveOffline}
              className="w-full bg-[#eff4ff] text-[#0b1c30] border border-[#c5c6cd]/30 rounded-xl py-3 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#dce9ff] transition-colors active:scale-95 transition-transform"
            >
              <Download size={18} className="shrink-0" />
              {lang === 'BN' ? 'অফলাইনে সেভ করুন' : 'Save Offline'}
            </button>
            <button
              type="submit"
              className="w-full bg-[#ba1a1a] text-white rounded-xl py-3.5 text-sm font-bold shadow-md hover:bg-red-700 transition-colors active:scale-95 transition-transform flex items-center justify-center gap-1.5"
            >
              <StopCircle size={18} className="shrink-0 fill-current" />
              {lang === 'BN' ? 'ভিজিট শেষ করুন' : 'End Visit'}
            </button>
          </div>
        </form>
      </main>

      {/* Confirmation Modal for Blank Visit Completion */}
      {showBlankConfirm && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-[320px] shadow-xl border border-[#c5c6cd]/30 space-y-4 animate-fade-in text-center">
            <h3 className="text-sm font-bold text-[#ba1a1a]">
              {lang === 'BN' ? 'কোনো ভিজিট তথ্য দেওয়া হয়নি' : 'No Visit Data Provided'}
            </h3>
            <p className="text-[11px] text-[#44474c] leading-relaxed">
              {lang === 'BN' 
                ? 'আপনি এখনো অর্ডার, কালেকশন, নোট বা ছবি যোগ করেননি। তবুও ভিজিট শেষ করলে রিপোর্টে ‘তথ্য দেওয়া হয়নি’ হিসেবে সংরক্ষণ হবে।'
                : 'You have not added any order, collection, notes, or photos yet. Ending the visit now will save it as "No Data Provided" in the report.'
              }
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowBlankConfirm(false)}
                className="w-full bg-[#eff4ff] text-[#0b1c30] border border-[#c5c6cd]/30 rounded-xl py-2.5 text-xs font-bold hover:bg-[#dce9ff] transition-colors active:scale-95"
              >
                {lang === 'BN' ? 'তথ্য যোগ করব' : 'Add Info'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowBlankConfirm(false);
                  completeVisit(true);
                }}
                className="w-full bg-[#ba1a1a] text-white rounded-xl py-2.5 text-xs font-bold hover:bg-red-700 transition-colors active:scale-95"
              >
                {lang === 'BN' ? 'তবুও ভিজিট শেষ করুন' : 'End Visit Anyway'}
              </button>
            </div>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
};
export default ActiveVisit;
