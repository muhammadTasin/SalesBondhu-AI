import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, ShieldCheck, MapPin, PhoneCall, CheckCircle2, Radio } from 'lucide-react';
import { PhoneFrame } from '../components/PhoneFrame';

/**
 * SOS safety flow (showcase edition).
 *
 * Officer holds the SOS button → an alert goes to their manager with live location →
 * the manager asks "Are you safe?" → the officer confirms → only the manager can close
 * the alert. Location sharing stays on until it is closed, so a false "I'm safe" can't
 * silently end the emergency. Every step below is simulated with timers.
 */

type Phase = 'idle' | 'sent' | 'check' | 'safe' | 'closed';

interface LogEntry {
  at: Date;
  bn: string;
  en: string;
}

const HOLD_MS = 3000;
const MANAGER_NAME = { bn: 'কামরুল হাসান', en: 'Kamrul Hasan' };

const hhmm = (d: Date) => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

export const SosSafety: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [phase, setPhase] = useState<Phase>('idle');
  const [holdProgress, setHoldProgress] = useState(0);
  const [log, setLog] = useState<LogEntry[]>([]);
  const holdStart = useRef<number | null>(null);
  const holdTimer = useRef<number | null>(null);

  const t = (bn: string, en: string) => (lang === 'BN' ? bn : en);
  const addLog = (bn: string, en: string) => setLog((prev) => [...prev, { at: new Date(), bn, en }]);

  // Simulated manager side: after the alert, the manager checks in; after the officer
  // confirms, the manager reviews and closes the alert.
  useEffect(() => {
    if (phase === 'sent') {
      const id = window.setTimeout(() => {
        setLog((prev) => [...prev, { at: new Date(), bn: 'ম্যানেজার জানতে চাইলেন: আপনি নিরাপদ?', en: 'Manager asked: are you safe?' }]);
        setPhase('check');
      }, 3500);
      return () => window.clearTimeout(id);
    }
    if (phase === 'safe') {
      const id = window.setTimeout(() => {
        setLog((prev) => [...prev, { at: new Date(), bn: 'ম্যানেজার অ্যালার্ট বন্ধ করেছেন', en: 'Manager closed the alert' }]);
        setPhase('closed');
      }, 3500);
      return () => window.clearTimeout(id);
    }
  }, [phase]);

  useEffect(() => () => {
    if (holdTimer.current) window.clearInterval(holdTimer.current);
  }, []);

  const startHold = () => {
    if (phase !== 'idle') return;
    holdStart.current = performance.now();
    holdTimer.current = window.setInterval(() => {
      const elapsed = performance.now() - (holdStart.current ?? performance.now());
      const p = Math.min(1, elapsed / HOLD_MS);
      setHoldProgress(p);
      if (p >= 1) {
        if (holdTimer.current) window.clearInterval(holdTimer.current);
        holdTimer.current = null;
        setPhase('sent');
        addLog('জরুরি অ্যালার্ট পাঠানো হয়েছে', 'Emergency alert sent');
        addLog(`${MANAGER_NAME.bn}-কে জানানো হয়েছে, লাইভ লোকেশন চালু`, `${MANAGER_NAME.en} notified, live location on`);
      }
    }, 50);
  };

  const cancelHold = () => {
    if (holdTimer.current) window.clearInterval(holdTimer.current);
    holdTimer.current = null;
    if (phase === 'idle') setHoldProgress(0);
  };

  const confirmSafe = () => {
    addLog('অফিসার নিশ্চিত করেছেন: নিরাপদ', 'Officer confirmed: safe');
    setPhase('safe');
  };

  const needHelp = () => {
    addLog('অফিসার সাহায্য চেয়েছেন, ম্যানেজার কল করছেন', 'Officer asked for help, manager is calling');
    setPhase('sent');
  };

  const R = 70;
  const C = 2 * Math.PI * R;
  const alertOpen = phase === 'sent' || phase === 'check' || phase === 'safe';

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
            <h1 className="text-sm font-bold text-[#0b1c30]">{t('এসওএস নিরাপত্তা', 'SOS Safety')}</h1>
            <p className="text-[10px] text-[#44474c] font-semibold">{t('মাঠে একা থাকলেও সুরক্ষিত', 'Safe, even when alone in the field')}</p>
          </div>
        </div>
        <button
          onClick={() => setLang((l) => (l === 'BN' ? 'EN' : 'BN'))}
          className="bg-[#eff4ff] text-[#0b1c30] rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm border border-[#c5c6cd]/30"
        >
          {lang === 'BN' ? 'বাং | EN' : 'EN | বাং'}
        </button>
      </header>

      {alertOpen && (
        <div className="bg-[#ba1a1a] text-white px-4 py-2 flex items-center gap-2 text-[11px] font-bold">
          <Radio size={14} className="animate-pulse shrink-0" />
          {t('জরুরি অবস্থা সক্রিয়: লাইভ লোকেশন শেয়ার হচ্ছে', 'Emergency active: sharing live location')}
        </div>
      )}

      <main className="flex-grow flex flex-col px-4 py-5 space-y-5">
        {phase === 'idle' && (
          <section className="flex flex-col items-center text-center space-y-4 pt-4">
            <p className="text-xs text-[#44474c] max-w-[280px]">
              {t(
                'বিপদে পড়লে বাটনটি ৩ সেকেন্ড চেপে ধরুন। ভুল করে চাপ লাগলে ছেড়ে দিন, কিছু পাঠানো হবে না।',
                'In danger, press and hold for 3 seconds. Let go early and nothing is sent.',
              )}
            </p>
            <button
              onPointerDown={startHold}
              onPointerUp={cancelHold}
              onPointerLeave={cancelHold}
              aria-label={t('এসওএস চেপে ধরুন', 'Hold SOS')}
              className="relative w-48 h-48 rounded-full select-none touch-none active:scale-95 transition-transform"
            >
              <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="80" cy="80" r={R} fill="none" stroke="#ffdad6" strokeWidth="10" />
                <circle
                  cx="80" cy="80" r={R} fill="none" stroke="#ba1a1a" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={C} strokeDashoffset={C * (1 - holdProgress)}
                />
              </svg>
              <span className="absolute inset-5 rounded-full bg-[#ba1a1a] text-white flex flex-col items-center justify-center shadow-lg">
                <ShieldAlert size={40} />
                <span className="text-lg font-extrabold mt-1">SOS</span>
                <span className="text-[10px] font-semibold opacity-90">{t('চেপে ধরে রাখুন', 'Press and hold')}</span>
              </span>
            </button>
          </section>
        )}

        {alertOpen && (
          <section className="bg-white rounded-xl p-4 border border-[#ffdad6] shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-[#ffdad6] text-[#ba1a1a] p-2 rounded-full"><ShieldAlert size={18} /></div>
              <div>
                <h2 className="text-sm font-bold text-[#0b1c30]">{t('জরুরি অ্যালার্ট পাঠানো হয়েছে', 'Emergency alert sent')}</h2>
                <p className="text-[11px] text-[#44474c]">
                  {t(`ম্যানেজার: ${MANAGER_NAME.bn}`, `Manager: ${MANAGER_NAME.en}`)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-[#f8f9ff] rounded-lg p-2.5 border border-[#e5eeff] flex items-center gap-1.5">
                <MapPin size={14} className="text-[#ba1a1a] shrink-0" />
                <span>{t('লোকেশন: লাইভ, ±১২ মি', 'Location: live, ±12 m')}</span>
              </div>
              <div className="bg-[#f8f9ff] rounded-lg p-2.5 border border-[#e5eeff] flex items-center gap-1.5">
                <PhoneCall size={14} className="text-[#006c49] shrink-0" />
                <span>{t('ম্যানেজার দেখছেন', 'Manager is watching')}</span>
              </div>
            </div>
          </section>
        )}

        {phase === 'check' && (
          <section className="bg-[#0e1c2f] text-white rounded-xl p-4 shadow-lg space-y-3">
            <h2 className="text-base font-bold">{t('আপনি কি নিরাপদ?', 'Are you safe?')}</h2>
            <p className="text-[11px] opacity-80">
              {t(`${MANAGER_NAME.bn} জানতে চাইছেন।`, `${MANAGER_NAME.en} is checking on you.`)}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={confirmSafe} className="bg-[#6cf8bb] text-[#002113] font-bold text-xs rounded-lg py-2.5 active:scale-95">
                {t('আমি নিরাপদ', "I'm safe")}
              </button>
              <button onClick={needHelp} className="bg-[#ba1a1a] text-white font-bold text-xs rounded-lg py-2.5 active:scale-95">
                {t('সাহায্য দরকার', 'I need help')}
              </button>
            </div>
          </section>
        )}

        {phase === 'safe' && (
          <section className="bg-[#e8f5e9] rounded-xl p-4 border border-[#c8e6c9] text-[11px] text-[#1b5e20] flex gap-2">
            <ShieldCheck size={18} className="shrink-0" />
            <span>
              {t(
                'আপনি নিরাপদ জানিয়েছেন। ম্যানেজার অ্যালার্ট বন্ধ না করা পর্যন্ত লোকেশন শেয়ার চালু থাকবে।',
                'You said you are safe. Location sharing stays on until your manager closes the alert.',
              )}
            </span>
          </section>
        )}

        {phase === 'closed' && (
          <section className="bg-white rounded-xl p-4 border border-[#c8e6c9] shadow-sm space-y-3 text-center">
            <CheckCircle2 size={36} className="text-[#006c49] mx-auto" />
            <h2 className="text-sm font-bold">{t('অ্যালার্ট বন্ধ হয়েছে', 'Alert closed')}</h2>
            <p className="text-[11px] text-[#44474c]">
              {t('ম্যানেজার ঘটনাটি পর্যালোচনা করে বন্ধ করেছেন। লোকেশন শেয়ার বন্ধ।', 'Your manager reviewed and closed it. Location sharing is off.')}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-[#0e1c2f] text-white font-bold text-xs rounded-lg py-2.5 active:scale-95"
            >
              {t('ভিজিটে ফিরে যান', 'Back to visit')}
            </button>
          </section>
        )}

        {log.length > 0 && (
          <section className="space-y-2">
            <h3 className="text-[11px] font-bold text-[#44474c]">{t('ঘটনার সময়রেখা', 'Timeline')}</h3>
            <ol className="relative border-l-2 border-[#e5eeff] ml-2 space-y-2">
              {log.map((e, i) => (
                <li key={i} className="pl-3 text-[11px]">
                  <span className="absolute -left-[5px] mt-1 w-2 h-2 rounded-full bg-[#ba1a1a]" />
                  <span className="font-bold text-[#0b1c30] mr-1.5">{hhmm(e.at)}</span>
                  <span className="text-[#44474c]">{lang === 'BN' ? e.bn : e.en}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
      </main>
    </PhoneFrame>
  );
};

export default SosSafety;
