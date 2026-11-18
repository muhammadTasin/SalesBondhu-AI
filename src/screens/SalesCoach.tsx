import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { BottomNav } from '../components/BottomNav';
import { Bot, Send, Mic, TrendingDown, ArrowLeft, CheckCircle2, MessageSquare, FileText, BookOpen, Calculator } from 'lucide-react';
import { askCoach } from '../ai/coachEngine';
import { toBanglaDigits } from '../ai/banglish';
import type { CoachIntent, SourceRef } from '../ai/types';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  intent?: CoachIntent;
  sources?: SourceRef[];
  insight?: {
    action: string;
    why: string;
    script: string;
    notes: string[];
  };
}

export const SalesCoach: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'user',
      text: 'এখন কী করব?'
    },
    {
      sender: 'ai',
      text: '',
      insight: {
        action: 'সহানুভূতিশীল আলোচনা শুরু করুন',
        why: 'রহমান ট্রেডার্স চাপের মধ্যে আছে (সেলস ৪০% কম)। সরাসরি বকেয়া কালেকশন চাইলে সম্পর্ক ক্ষতিগ্রস্ত হতে পারে। আগে ব্যবসা পুনরুজ্জীবনে সহযোগিতা করার মনোভাব দেখান।',
        script: '"রহমান ভাই, কেমন আছেন? গত মাসের তুলনায় আপনার দোকানে বিক্রি কিছুটা কম দেখলাম। বাজারে কি কোনো বিশেষ সমস্যা হচ্ছে? আমরা কীভাবে আপনাকে সাপোর্ট দিতে পারি?"',
        notes: [
          'ডিলারের মূল সমস্যা ও চ্যালেঞ্জের বিষয়গুলো নোট করুন।',
          'বকেয়া কালেকশনের জন্য চাপ না দিয়ে সুবিধাজনক পেমেন্ট প্রমিজ ডেট আদায় করুন।'
        ]
      }
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  const promptChips: { text: string; key: string; grounded?: boolean }[] = [
    { text: '২৯০০ স্কয়ার ফিট দেয়ালে ১ কোট প্রাইমার + ২ কোট টপকোট, কত লিটার?', key: 'estimate_bn', grounded: true },
    { text: 'WeatherGuard koto khon e shukay?', key: 'kb_banglish', grounded: true },
    { text: 'এখন কী করব?', key: 'what_now' },
    { text: 'কালেকশন কীভাবে চাইব?', key: 'ask_collection' },
    { text: 'ডিলার রাগ করেছে', key: 'dealer_angry' },
    { text: 'কী কথা বলব?', key: 'what_to_say' }
  ];

  // Grounded questions go through the coach engine: calculator or document retrieval,
  // always returned with the source pages it used.
  const askGrounded = (text: string) => {
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    const answer = askCoach(text, lang);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: answer.text, intent: answer.intent, sources: answer.sources },
      ]);
    }, 600);
  };

  const handleChipClick = (text: string, grounded?: boolean) => {
    if (grounded) {
      askGrounded(text);
      return;
    }
    let responseInsight = {
      action: 'পরিস্থিতি শান্ত করুন',
      why: 'ডিলারের অভিযোগ বা অসন্তুষ্টি আগে মনোযোগ দিয়ে শুনতে হবে।',
      script: '"রহমান ভাই, আমি বুঝতে পারছি আপনি বিরক্ত হয়েছেন। দয়া করে আপনার সমস্যাটি বলুন, আমরা এখনই সমাধান করার চেষ্টা করছি।পেমেন্টের বিষয়টি আমরা সহজভাবে দেখতে পারি।"',
      notes: [
        'ডিলারের অভিযোগগুলো বিস্তারিতভাবে নোটবুকে লিখুন।',
        'উর্ধ্বতন কর্মকর্তার সাথে বিষয়টি শেয়ার করে দ্রুত ফিডব্যাক দিন।'
      ]
    };

    if (text.includes('কালেকশন')) {
      responseInsight = {
        action: 'অর্ডারের সাথে কালেকশন লিঙ্ক করুন',
        why: 'বকেয়া পেমেন্ট ক্লিয়ার করা নতুন পণ্য ডেলিভারির গতি বাড়াবে।',
        script: '"রহমান ভাই, বকেয়া অংশটুকু নিষ্পত্তি করতে পারলে আপনার নতুন Exterior Paint এর অর্ডারটি আমরা আজই পাঠিয়ে দিতে পারতাম।"',
        notes: [
          'পেমেন্ট প্রমিজ ডেটটি শিডিউল করুন।',
          'ছোট কিস্তিতে পেমেন্ট সংগ্রহের অফার দিন।'
        ]
      };
    } else if (text.includes('কী কথা বলব')) {
      responseInsight = {
        action: 'নতুন পণ্য অফার করুন',
        why: 'দোকানে নতুনExterior Paint পণ্য প্রদর্শন করলে তাদের সেলস বৃদ্ধি পাবে।',
        script: '"ভাই, আমাদের নতুন আবহাওয়া-প্রতিরোধী Exterior Paint বাজারে ভালো চলছে। আপনার দোকানে ২ কার্টন দিলে বিক্রি বাড়াতে সাহায্য করবে।"',
        notes: [
          'নতুন ডেকোরেটিভ প্যানেল প্রদর্শন করুন।',
          'মার্জিন এবং অতিরিক্ত অফার ডিলারকে বুঝিয়ে বলুন।'
        ]
      };
    }

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text },
      {
        sender: 'ai',
        text: '',
        insight: responseInsight
      }
    ]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const userText = inputVal;
    setInputVal('');
    askGrounded(userText);
  };

  return (
    <PhoneFrame>
      <header className="bg-white shadow-sm flex justify-between items-center w-full px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-[#eff4ff] p-2 rounded-full text-[#0b1c30] transition-colors flex items-center justify-center active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-sm font-bold text-[#0b1c30]">
              {lang === 'BN' ? 'সেলস কোচ AI' : 'Sales Coach AI'}
            </h1>
            <p className="text-[10px] text-[#006c49] font-semibold">Active Co-Pilot</p>
          </div>
        </div>
        
        <button
          onClick={toggleLanguage}
          className="bg-[#eff4ff] text-[#0b1c30] rounded-full px-2.5 py-1 text-[11px] font-semibold flex items-center shadow-sm border border-[#c5c6cd]/30"
        >
          {lang === 'BN' ? 'বাং | EN' : 'EN | বাং'}
        </button>
      </header>

      <main className="flex-grow flex flex-col px-4 pb-20 space-y-4 overflow-y-auto">
        {/* Context Card */}
        <div className="bg-white rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#c5c6cd]/20 mt-3 relative overflow-hidden flex flex-col shrink-0">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#ba1a1a]" />
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-[10px] font-bold text-[#44474c] block">বর্তমান প্রেক্ষাপট</span>
              <h2 className="text-sm font-bold text-[#0b1c30] mt-0.5">রহমান ট্রেডার্স</h2>
            </div>
            <span className="bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold px-2 py-0.5 rounded shrink-0">
              গুরুতর অগ্রাধিকার
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-1">
            <div className="bg-[#f8f9ff] rounded-lg p-2.5 border border-[#e5eeff]">
              <span className="text-[10px] text-[#44474c] block">বকেয়া</span>
              <span className="text-xs font-bold text-[#ba1a1a] mt-0.5 block">৳৮৫,০০০</span>
            </div>
            <div className="bg-[#f8f9ff] rounded-lg p-2.5 border border-[#e5eeff]">
              <span className="text-[10px] text-[#44474c] block">সেলস ট্রেন্ড</span>
              <span className="text-xs font-bold text-[#ba1a1a] flex items-center gap-0.5 mt-0.5">
                <TrendingDown size={14} className="shrink-0" />
                ৪০% কম
              </span>
            </div>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-grow flex flex-col gap-4 py-2">
          {messages.map((msg, index) => {
            if (msg.sender === 'user') {
              return (
                <div key={index} className="self-end max-w-[85%]">
                  <div className="bg-[#0e1c2f] text-white rounded-2xl rounded-tr-sm py-2 px-4 text-xs font-semibold shadow-sm">
                    {msg.text}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="self-start max-w-[95%] space-y-1">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-5 h-5 rounded-full bg-[#6cf8bb] flex items-center justify-center">
                      <Bot size={12} className="text-[#002113]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#44474c]">SalesBondhu AI</span>
                  </div>

                  {msg.text ? (
                    <div className="bg-white rounded-2xl rounded-tl-sm p-3 border border-[#c5c6cd]/20 text-xs text-[#0b1c30] shadow-sm space-y-2">
                      {msg.intent === 'paint_estimate' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#006c49] bg-[#e8f5e9] px-2 py-0.5 rounded-full">
                          <Calculator size={11} className="shrink-0" />
                          {lang === 'BN' ? 'হিসাব করা হয়েছে, অনুমান নয়' : 'Calculated, not guessed'}
                        </span>
                      )}
                      <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="pt-2 border-t border-[#e5eeff] space-y-1">
                          {msg.sources.map((s) => (
                            <div key={s.docId + s.page} className="flex items-center gap-1 text-[10px] text-[#44474c]">
                              <BookOpen size={11} className="text-[#1976D2] shrink-0" />
                              <span>
                                {lang === 'BN'
                                  ? `উৎস: ${s.title}, পৃষ্ঠা ${toBanglaDigits(String(s.page))}`
                                  : `Source: ${s.title}, page ${s.page}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    msg.insight && (
                      <div className="bg-white rounded-2xl rounded-tl-sm p-4 border border-[#c5c6cd]/20 shadow-sm space-y-3">
                        <div>
                          <h3 className="text-xs font-bold text-[#0b1c30] flex items-center gap-1">
                            <CheckCircle2 size={14} className="text-[#006c49] shrink-0" />
                            <span>এখন কী করবেন?</span>
                          </h3>
                          <p className="text-[11px] text-[#44474c] mt-1 ml-5">
                            {msg.insight.action} - {msg.insight.why}
                          </p>
                        </div>

                        <div className="bg-[#eff4ff] p-3 rounded-lg border border-[#c5c6cd]/30">
                          <h3 className="text-xs font-bold text-[#0b1c30] flex items-center gap-1 mb-1">
                            <MessageSquare size={14} className="text-[#1976D2] shrink-0" />
                            <span>কীভাবে কথা বলবেন?</span>
                          </h3>
                          <p className="text-xs text-[#0b1c30] italic font-medium leading-relaxed pl-5">
                            {msg.insight.script}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xs font-bold text-[#0b1c30] flex items-center gap-1">
                            <FileText size={14} className="text-[#75777d] shrink-0" />
                            <span>ভিজিট শেষে যা নোট করবেন</span>
                          </h3>
                          <ul className="list-disc pl-9 text-[11px] text-[#44474c] space-y-1 mt-1">
                            {msg.insight.notes.map((n, i) => (
                              <li key={i}>{n}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  )}
                </div>
              );
            }
          })}
        </div>

        {/* Suggested Chips */}
        <div className="flex overflow-x-auto gap-2 py-1 -mx-4 px-4 scrollbar-hide shrink-0">
          {promptChips.map((chip) => (
            <button
              key={chip.key}
              onClick={() => handleChipClick(chip.text, chip.grounded)}
              className="shrink-0 bg-white border border-[#c5c6cd]/40 hover:bg-[#eff4ff] text-[#0b1c30] font-semibold text-[11px] px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap active:scale-95 shadow-sm"
            >
              {chip.text}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="sticky bottom-0 bg-[#f8f9ff] py-3 z-40 shrink-0">
          <form onSubmit={handleSend} className="relative flex items-center bg-white rounded-full border border-[#c5c6cd]/40 shadow-sm focus-within:ring-2 focus-within:ring-[#bac7e1] transition-shadow">
            <button
              type="button"
              className="p-3 text-[#75777d] hover:text-[#0b1c30] flex items-center justify-center"
            >
              <Mic size={18} />
            </button>
            <input
              type="text"
              placeholder="আপনার প্রশ্ন লিখুন..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-grow bg-transparent border-none focus:ring-0 text-xs text-[#0b1c30] py-3 px-1 outline-none placeholder-[#75777d]/50"
            />
            <button
              type="submit"
              className="p-2.5 mr-1 text-white bg-[#0e1c2f] rounded-full hover:bg-[#213145] transition-colors flex items-center justify-center shrink-0"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </main>

      <BottomNav />
    </PhoneFrame>
  );
};
export default SalesCoach;
