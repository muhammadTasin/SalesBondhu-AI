import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { FileCheck, RefreshCw, Route, Wallet, ShoppingCart, TrendingUp, Clock, MessageSquare, Hourglass, BarChart3, AlertTriangle, Info, AlertOctagon, AlertCircle, FileEdit, Edit2, Camera, CheckCircle, Send, Save } from 'lucide-react';

export const EndOfDayReport: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [summary, setSummary] = useState(
    'আজ ৭টি ডিলারের সাথে সফল মিটিং সম্পন্ন হয়েছে। মোট কালেকশন ৳৯৫,০০০ এবং নতুন অর্ডার ৳২,৮০,০০০। উত্তর জোনে Brand X এর ডিসকাউন্ট অফারের কারণে কিছু ডিলার দ্বিধাগ্রস্ত। কাল ৩টি ফলো-আপ কল করতে হবে।'
  );
  const [isEditing, setIsEditing] = useState(false);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmitReport = () => {
    alert(lang === 'BN' ? 'রিপোর্টটি সফলভাবে জমা দেওয়া হয়েছে!' : 'Report submitted successfully!');
    navigate('/today');
  };

  const handleSaveDraft = () => {
    alert(lang === 'BN' ? 'ড্রাফট সেভ করা হয়েছে!' : 'Draft saved!');
  };

  return (
    <PhoneFrame>
      <AppHeader
        title={lang === 'BN' ? 'দিনের রিপোর্ট' : 'EOD Report'}
        subtitle={lang === 'BN' ? 'দিন শেষের কার্যক্রম সারসংক্ষেপ' : 'End of Day Summary'}
        showGPSStatus={true}
        syncTime="১৮:৪৫"
        lang={lang}
        onLanguageToggle={toggleLanguage}
      />

      <main className="flex-grow overflow-y-auto px-4 pb-24 space-y-4 pt-2">
        {/* Page Title & Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <FileCheck size={22} className="text-[#006c49] shrink-0" />
            <h2 className="text-sm font-bold text-[#0b1c30]">
              {lang === 'BN' ? 'দিনের রিপোর্ট' : 'Daily Report'}
            </h2>
          </div>
          <span className="text-[9px] font-bold text-[#75777d] flex items-center gap-0.5">
            <RefreshCw size={10} className="shrink-0" />
            ERP synced
          </span>
        </div>

        {/* Summary Statistics (Bento/Card layout) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Visits Completed */}
          <div className="bg-white rounded-xl p-3 border border-[#e5eeff]/50 shadow-sm flex flex-col justify-between h-24">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold text-[#44474c] uppercase">ভিজিট সম্পন্ন</span>
              <Route size={16} className="text-[#0c714d] shrink-0" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0b1c30]">৭/৮ টি</p>
              <div className="w-full bg-[#eff4ff] h-1 rounded-full overflow-hidden mt-1.5">
                <div className="bg-[#006c49] h-full rounded-full" style={{ width: '87.5%' }} />
              </div>
            </div>
          </div>

          {/* Collection Total */}
          <div className="bg-white rounded-xl p-3 border border-[#e5eeff]/50 shadow-sm flex flex-col justify-between h-24">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold text-[#44474c] uppercase">কালেকশন</span>
              <Wallet size={16} className="text-[#1976D2] shrink-0" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0b1c30]">৳৯৫,০০০</p>
              <p className="text-[9px] text-[#75777d] font-semibold">টার্গেট: ৳১.২L</p>
            </div>
          </div>

          {/* Order Value */}
          <div className="bg-white rounded-xl p-3 border border-[#e5eeff]/50 shadow-sm flex flex-col justify-between h-24">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold text-[#44474c] uppercase">মোট অর্ডার</span>
              <ShoppingCart size={16} className="text-[#0e1c2f] shrink-0" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0b1c30]">৳২,৮০,০০০</p>
              <p className="text-[9px] text-[#006c49] font-bold flex items-center gap-0.5 mt-0.5">
                <TrendingUp size={10} className="shrink-0" />
                +১২% গতকাল
              </p>
            </div>
          </div>

          {/* Pending Follow-ups */}
          <div className="bg-[#ffdad6] rounded-xl p-3 border border-[#ffdad6] shadow-sm flex flex-col justify-between h-24">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold text-[#ba1a1a] uppercase">বাকি ফলো-আপ</span>
              <Clock size={16} className="text-[#ba1a1a] shrink-0" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#ba1a1a]">৩ টি</p>
              <button
                onClick={() => navigate('/followups')}
                className="text-[9px] text-[#ba1a1a] font-bold underline mt-1 block"
              >
                বিস্তারিত দেখুন
              </button>
            </div>
          </div>
        </div>

        {/* Manager Review Status */}
        <section className="bg-white rounded-xl p-4 border border-[#e5eeff]/50 shadow-sm">
          <h3 className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5 mb-3">
            <MessageSquare size={14} className="text-[#44474c] shrink-0" />
            {lang === 'BN' ? 'ম্যানেজার রিভিউয়ের অবস্থা' : 'Manager Review Status'}
          </h3>
          <div className="border border-dashed border-[#c5c6cd] rounded-lg p-3 flex flex-col items-center justify-center text-center">
            <Hourglass size={18} className="text-[#75777d] animate-pulse mb-1.5" />
            <p className="text-[11px] font-semibold text-[#75777d]">
              {lang === 'BN' ? 'ম্যানেজারের মতামত এবং অনুমোদনের অপেক্ষায়' : 'Waiting for manager approval and comments'}
            </p>
          </div>
        </section>

        {/* Competitor Updates summary */}
        <section className="bg-white rounded-xl p-4 border border-[#e5eeff]/50 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
            <BarChart3 size={14} className="text-[#44474c] shrink-0" />
            {lang === 'BN' ? 'প্রতিযোগীদের তথ্যের সারসংক্ষেপ' : 'Competitor Updates Summary'}
          </h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2 bg-[#f8f9ff] p-2.5 rounded-lg border border-[#e5eeff]">
              <AlertTriangle size={14} className="text-[#ba1a1a] mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-[#0b1c30]">Brand X নর্থ জোনে ১০% অতিরিক্ত ডিসকাউন্ট দিচ্ছে।</p>
                <p className="text-[9px] text-[#75777d] font-bold mt-0.5">৩ জন ডিলার রিপোর্ট করেছেন</p>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-[#f8f9ff] p-2.5 rounded-lg border border-[#e5eeff]">
              <Info size={14} className="text-[#006c49] mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-[#0b1c30]">প্রতিযোগী ওয়াই প্রিমিয়াম এসকিউ-এর জন্য সাপ্লাই চেইন বিলম্বের সম্মুখীন হচ্ছে।</p>
                <p className="text-[9px] text-[#75777d] font-bold mt-0.5">১ জন ডিলার রিপোর্ট করেছেন</p>
              </div>
            </div>
          </div>
        </section>

        {/* Customer complaints summary */}
        <section className="bg-[#ffdad6]/40 rounded-xl p-4 border border-[#ffdad6] shadow-sm">
          <h3 className="text-xs font-bold text-[#ba1a1a] flex items-center gap-1.5 mb-3">
            <AlertOctagon size={14} className="text-[#ba1a1a] shrink-0" />
            {lang === 'BN' ? 'কাস্টমার অভিযোগের সারসংক্ষেপ' : 'Customer Complaints Summary'}
          </h3>
          <div className="flex items-start gap-2 bg-white/70 p-2.5 rounded-lg border border-[#ffdad6]">
            <AlertCircle size={14} className="text-[#ba1a1a] mt-0.5 shrink-0" />
            <p className="text-[11px] font-semibold text-[#0b1c30] leading-relaxed">
              সাউথ জোনে ডেলিভারি বিলম্ব সংক্রান্ত ২টি অভিযোগ। সাইটে ১টি সমাধান করা হয়েছে।
            </p>
          </div>
        </section>

        {/* Auto Generated Summary */}
        <section className="bg-white rounded-xl p-4 border border-[#e5eeff]/50 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <FileEdit size={14} className="text-[#44474c] shrink-0" />
              <h3 className="text-xs font-bold text-[#0b1c30]">
                {lang === 'BN' ? 'দিনের সামারি' : 'Daily Summary'}
              </h3>
            </div>
            <span className="bg-[#eff4ff] text-[#0b1c30] font-bold text-[8px] px-1.5 py-0.5 rounded tracking-wide uppercase">
              AI Generated
            </span>
          </div>

          {isEditing ? (
            <textarea
              className="w-full bg-[#f8f9ff] border border-[#c5c6cd]/50 rounded-lg p-2.5 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#bac7e1] outline-none"
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          ) : (
            <div className="bg-[#f8f9ff] p-2.5 rounded-lg border border-[#e5eeff] text-xs text-[#0b1c30] leading-relaxed whitespace-pre-wrap">
              {summary}
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleEditToggle}
              className="text-[10px] font-bold text-[#006c49] flex items-center gap-0.5 hover:underline"
            >
              <Edit2 size={10} className="shrink-0" />
              {isEditing ? (lang === 'BN' ? 'সংরক্ষণ করুন' : 'Save Note') : (lang === 'BN' ? 'নোট এডিট করুন' : 'Edit Note')}
            </button>
          </div>
        </section>

        {/* Uploaded Photos summary */}
        <section className="bg-white rounded-xl p-4 border border-[#e5eeff]/50 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
            <Camera size={14} className="text-[#44474c] shrink-0" />
            {lang === 'BN' ? 'ভিজিটের ছবি প্রমাণ' : 'Visit Photos Proof'}
          </h3>
          <div className="flex items-center justify-between bg-[#f8f9ff] p-2 rounded-lg border border-[#e5eeff]">
            <span className="text-[10px] font-bold text-[#44474c]">৩টি ছবি আপলোড করা হয়েছে</span>
            <CheckCircle size={14} className="text-[#006c49] shrink-0" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <div className="aspect-square bg-[#eff4ff] rounded-lg overflow-hidden border border-[#c5c6cd]/30 relative">
                <img
                  alt="Store Front"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1nOsPm_Z-iB48eoRe82WWNl_U0R8IcJYw3M63cp0_inNzVuUqeCCZbLFli1e5o3TBmqqLJdfq2XXylRE0v-Y_K2pF4ujPsuT-GTyXnsovmlUp0xfnwyZiYWCqmcprmHcEMQEryBtCKfZlDMGRafRcNDxaQl9hvcCu3THLgz5wXP3wKJDljd6rwIBFFlzkDFTNsQf_-N9vlR6BsfBz-3h59ohxhf5-LBZ6JGNZiejaVLp6hYptTU08BPOGTrBd83DclAeAYLFX0Q"
                />
              </div>
              <span className="text-[8px] text-center text-[#75777d] font-bold">দোকান</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="aspect-square bg-[#eff4ff] rounded-lg overflow-hidden border border-[#c5c6cd]/30 relative">
                <img
                  alt="Product Display"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSph1LU2L7QJTzpBOwQP9aIcLLoPBB1QDhMkxHCl6WuWk9bhJUBgwn5CPyioldyUN_eOWtGdY9O_9rduyfjU83PWImumzPjiPv-cSE2J-KGq0IMzCDS0DiaICxhoPQq5-lCpc3515ZJQamzlguFAfWqwo_hPBIZpMDilVbNqz33oAyfVDtYRxfKX79edAP-N55zD8ecaB-Kz0PYdrioz-RX9GlwZ5o1lZpI3pRfy6O0ok2ruc6-JgxLoeE_18sTOuYMUUb5alsPg"
                />
              </div>
              <span className="text-[8px] text-center text-[#75777d] font-bold">প্রদর্শনী</span>
            </div>

            <div className="flex flex-col gap-1">
              <button className="aspect-square bg-white border border-dashed border-[#c5c6cd] hover:bg-[#f8f9ff] rounded-lg flex flex-col items-center justify-center text-[#75777d]">
                <Camera size={16} className="shrink-0" />
                <span className="text-[8px] font-bold mt-1">যোগ করুন</span>
              </button>
              <span className="text-[8px] text-center text-[#75777d] font-bold">নতুন ছবি</span>
            </div>
          </div>
        </section>

        {/* Report Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={handleSubmitReport}
            className="w-full bg-[#006c49] text-white py-3.5 rounded-xl font-bold text-xs shadow-md hover:bg-[#0c714d] active:scale-95 transition-transform flex items-center justify-center gap-1.5"
          >
            <Send size={14} className="shrink-0" />
            {lang === 'BN' ? 'রিপোর্ট জমা দিন' : 'Submit Report'}
          </button>
          <button
            onClick={handleSaveDraft}
            className="w-full bg-white text-[#0b1c30] border border-[#c5c6cd]/30 py-3 rounded-xl font-bold text-xs hover:bg-[#eff4ff] active:scale-95 transition-transform flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Save size={14} className="shrink-0" />
            {lang === 'BN' ? 'ড্রাফট সেভ করুন' : 'Save Draft'}
          </button>
        </div>
      </main>

      <BottomNav />
    </PhoneFrame>
  );
};
export default EndOfDayReport;
