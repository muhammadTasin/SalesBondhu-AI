import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PhoneFrame } from '../../components/PhoneFrame';
import { AppHeader } from '../../components/AppHeader';
import { BottomNav } from '../../components/BottomNav';
import { mockRisks } from '../../data/managerMockData';
import {
  AlertTriangle,
  User,
  MapPinOff,
  Bell,
  MessageCircle,
  Eye,
  TrendingDown,
  PhoneCall,
  Info,
  CheckCircle,
  Check
} from 'lucide-react';

export const ManagerRiskCenter: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [activeTab, setActiveTab] = useState<'all' | 'due' | 'decline' | 'gps'>('all');
  
  // Local state to track interactive statuses on risk cards
  const [riskList, setRiskList] = useState(
    mockRisks.map(risk => ({
      ...risk,
      actionState: 'pending' as 'pending' | 'reminder_sent' | 'followup_requested'
    }))
  );
  
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  // Handle query parameter pre-filtering
  useEffect(() => {
    const filterQuery = searchParams.get('filter');
    if (filterQuery === 'collection') {
      setActiveTab('due');
    } else if (filterQuery === 'gps') {
      setActiveTab('gps');
    }
  }, [searchParams]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  const showToastMessage = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2500);
  };

  const handleCollectionFollowUp = (id: string, name: string) => {
    setRiskList(prev => 
      prev.map(item => item.id === id ? { ...item, actionState: 'followup_requested' } : item)
    );
    showToastMessage(
      lang === 'BN' 
        ? `${name}-এর জন্য বকেয়া কালেকশন রিকোয়েস্ট পাঠানো হয়েছে!` 
        : `Outstanding collection push triggered for ${name}!`
    );
  };

  const handleSendReminder = (id: string, name: string) => {
    setRiskList(prev => 
      prev.map(item => item.id === id ? { ...item, actionState: 'reminder_sent' } : item)
    );
    showToastMessage(
      lang === 'BN' 
        ? `${name}-কে বকেয়া পরিশোধ ও ক্রয়ের তাগিদ দেওয়া হয়েছে!` 
        : `Inactive account alert dispatched to ${name}!`
    );
  };

  const handleSendMessage = (officerName: string) => {
    showToastMessage(
      lang === 'BN' 
        ? `অফিসার ${officerName}-কে হোয়াটসঅ্যাপ ও ইন-অ্যাপ বার্তা পাঠানো হয়েছে!` 
        : `Notification logs sent to officer ${officerName}!`
    );
  };

  const filteredCards = riskList.filter(
    (card) => activeTab === 'all' || card.type === activeTab
  );

  return (
    <PhoneFrame>
      <AppHeader
        title={lang === 'BN' ? 'ঝুঁকি ও এক্সসেপশন' : 'Risks & Exceptions'}
        subtitle={lang === 'BN' ? 'রিয়েল-টাইম ঝুঁকি এনালাইসিস' : 'Real-time Risk Center'}
        syncTime={lang === 'BN' ? '১০:৪৫ AM' : '10:45 AM'}
        showGPSStatus={false}
        lang={lang}
        onLanguageToggle={toggleLanguage}
      />

      <main className="flex-grow space-y-4 px-4 overflow-y-auto pb-6 relative">
        {/* Tabs / Filter Chips */}
        <div className="flex gap-2 overflow-x-auto py-1 scrollbar-hide">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              activeTab === 'all'
                ? 'bg-[#0b1c30] text-white border-transparent shadow-sm'
                : 'bg-white text-[#44474c] border-[#c5c6cd]/30 hover:bg-[#eff4ff]'
            }`}
          >
            {lang === 'BN' ? 'সব' : 'All'}
          </button>
          <button
            onClick={() => setActiveTab('due')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              activeTab === 'due'
                ? 'bg-[#0b1c30] text-white border-transparent shadow-sm'
                : 'bg-white text-[#44474c] border-[#c5c6cd]/30 hover:bg-[#eff4ff]'
            }`}
          >
            {lang === 'BN' ? 'বকেয়া' : 'Dues'}
          </button>
          <button
            onClick={() => setActiveTab('decline')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              activeTab === 'decline'
                ? 'bg-[#0b1c30] text-white border-transparent shadow-sm'
                : 'bg-white text-[#44474c] border-[#c5c6cd]/30 hover:bg-[#eff4ff]'
            }`}
          >
            {lang === 'BN' ? 'সেলস কমেছে' : 'Sales Decline'}
          </button>
          <button
            onClick={() => setActiveTab('gps')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              activeTab === 'gps'
                ? 'bg-[#0b1c30] text-white border-transparent shadow-sm'
                : 'bg-white text-[#44474c] border-[#c5c6cd]/30 hover:bg-[#eff4ff]'
            }`}
          >
            {lang === 'BN' ? 'GPS mismatch' : 'GPS Mismatch'}
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-[#eff4ff] text-[#0b1c30] rounded-xl p-3 border border-[#c5c6cd]/25 flex gap-2 items-start text-[10px]">
          <Info size={14} className="text-[#0c714d] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {lang === 'BN'
              ? 'এখানে দেখানো প্রতিটি ঘটনা ফিল্ড ট্র্যাকিং সোর্স এবং ইআরপি পেমেন্ট ডাটার অসঙ্গতি থেকে চিহ্নিত করা হয়েছে।'
              : 'Each exception here is auto-detected from route mismatches or delayed collection cycles.'}
          </p>
        </div>

        {/* Risk Cards */}
        <div className="space-y-4">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <div
                key={card.id}
                className={`bg-white rounded-2xl p-4 shadow-sm border relative overflow-hidden flex flex-col h-full transition-all duration-300 ${
                  card.actionState !== 'pending' ? 'border-[#006c49]/35 bg-[#9af2c5]/5' : 'border-[#c5c6cd]/30'
                }`}
              >
                {/* Severity indicator strip */}
                <div
                  className={`absolute top-0 left-0 w-1.5 h-full ${
                    card.actionState !== 'pending' ? 'bg-[#006c49]' :
                    card.severity === 'high' ? 'bg-[#ba1a1a]' : 'bg-[#f59e0b]'
                  }`}
                />

                <div className="flex justify-between items-start mb-3 pl-1">
                  <div>
                    <h3 className="text-xs font-bold text-[#0b1c30]">{card.title}</h3>
                    <p className="text-[9px] text-[#75777d] flex items-center gap-0.5 mt-0.5">
                      <User size={10} />
                      {lang === 'BN' ? 'দায়িত্বপ্রাপ্ত:' : 'Owner:'} {card.owner} ({card.role})
                    </p>
                  </div>
                  
                  {card.actionState !== 'pending' ? (
                    <span className="bg-[#9af2c5] text-[#0c714d] px-2 py-0.5 rounded-full font-bold text-[8px] flex items-center gap-0.5">
                      <CheckCircle size={10} />
                      {card.actionState === 'reminder_sent' 
                        ? (lang === 'BN' ? 'রিমাইন্ডার প্রেরিত' : 'Reminder Sent')
                        : (lang === 'BN' ? 'ফলো-আপ প্রেরিত' : 'Followup Requested')}
                    </span>
                  ) : (
                    <span
                      className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${
                        card.severity === 'high'
                          ? 'bg-[#ffdad6] text-[#93000a]'
                          : 'bg-[#ffddba] text-[#5a4226]'
                      }`}
                    >
                      {lang === 'BN' ? card.severityLabelBN : card.severityLabelEN}
                    </span>
                  )}
                </div>

                {/* Reason Details Box */}
                <div
                  className={`rounded-xl p-3 mb-4 border flex-grow transition-colors duration-300 ${
                    card.actionState !== 'pending' ? 'bg-[#9af2c5]/10 border-[#006c49]/15 text-[#0c714d]' :
                    card.severity === 'high'
                      ? 'bg-[#ffdad6]/20 border-[#ba1a1a]/15 text-[#ba1a1a]'
                      : 'bg-[#ffddba]/15 border-[#f59e0b]/20 text-[#5a4226]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-bold">
                    {card.type === 'gps' ? (
                      <MapPinOff size={13} />
                    ) : card.type === 'decline' ? (
                      <TrendingDown size={13} />
                    ) : (
                      <AlertTriangle size={13} />
                    )}
                    <span>{lang === 'BN' ? card.reasonTitleBN : card.reasonTitleEN}</span>
                  </div>
                  <ul className="text-[10px] text-[#44474c] list-disc list-inside space-y-1 ml-0.5 leading-relaxed">
                    {(lang === 'BN' ? card.reasonDetailsBN : card.reasonDetailsEN).map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>

                  {/* GPS Mismatch extra visual indicator */}
                  {card.extraDetails && card.extraDetails.verifiedCount !== undefined && card.extraDetails.totalCount !== undefined && (
                    <div className="mt-3">
                      <div className="flex justify-between text-[8px] font-semibold text-[#75777d] mb-1">
                        <span>{lang === 'BN' ? 'জিপিএস ভেরিফাইড ভিজিট' : 'GPS Verified'}</span>
                        <span>
                          {card.extraDetails.verifiedCount}/{card.extraDetails.totalCount}
                        </span>
                      </div>
                      <div className="w-full bg-[#c5c6cd]/30 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#ba1a1a] h-full rounded-full"
                          style={{
                            width: `${
                              (card.extraDetails.verifiedCount / card.extraDetails.totalCount) * 100
                            }%`
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="mt-auto flex gap-2">
                  {card.type === 'gps' ? (
                    <>
                      <button 
                        onClick={() => handleSendMessage(card.owner)}
                        className="flex-1 bg-white border border-[#c5c6cd] text-[#44474c] py-2 rounded-xl text-[10px] font-bold hover:bg-[#eff4ff] active:scale-95 transition-all flex items-center justify-center gap-1 outline-none"
                      >
                        <MessageCircle size={13} />
                        {lang === 'BN' ? 'বার্তা পাঠান' : 'Message'}
                      </button>
                      <button
                        onClick={() => navigate(`/manager/territory?officer=${card.ownerId}`)}
                        className="flex-1 bg-[#0b1c30] text-white py-2 rounded-xl text-[10px] font-bold hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-1 shadow-sm outline-none"
                      >
                        <Eye size={13} />
                        <span>{lang === 'BN' ? 'রুট রিভিউ' : 'Review Route'}</span>
                      </button>
                    </>
                  ) : card.type === 'due' ? (
                    <button
                      onClick={() => handleCollectionFollowUp(card.id, card.title)}
                      disabled={card.actionState !== 'pending'}
                      className={`w-full py-2.5 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all outline-none ${
                        card.actionState !== 'pending'
                          ? 'bg-[#9af2c5]/30 text-[#0c714d] cursor-default'
                          : 'bg-[#0b1c30] text-white hover:opacity-95 active:scale-95'
                      }`}
                    >
                      {card.actionState !== 'pending' ? <Check size={13} /> : <PhoneCall size={13} />}
                      <span>
                        {card.actionState !== 'pending' 
                          ? (lang === 'BN' ? 'ফলো-আপ রিকোয়েস্ট প্রেরিত' : 'Followup Requested')
                          : (lang === 'BN' ? 'কালেকশন ফলো-আপ' : 'Collection Follow-up')}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSendReminder(card.id, card.title)}
                      disabled={card.actionState !== 'pending'}
                      className={`w-full py-2.5 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all outline-none ${
                        card.actionState !== 'pending'
                          ? 'bg-[#9af2c5]/30 text-[#0c714d] cursor-default'
                          : 'bg-[#0b1c30] text-white hover:opacity-95 active:scale-95'
                      }`}
                    >
                      {card.actionState !== 'pending' ? <Check size={13} /> : <Bell size={13} />}
                      <span>
                        {card.actionState !== 'pending' 
                          ? (lang === 'BN' ? 'রিমাইন্ডার প্রেরিত' : 'Reminder Sent')
                          : (lang === 'BN' ? 'রিমাইন্ডার পাঠান' : 'Send Reminder')}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-[#c5c6cd]/20">
              <AlertTriangle className="mx-auto text-[#75777d] mb-2" size={32} />
              <p className="text-xs text-[#75777d] font-bold">
                {lang === 'BN' ? 'কোনো ঝুঁকি খুঁজে পাওয়া যায়নি' : 'No risks detected for this category'}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Floating Toast Notification */}
      {toast.visible && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[100] bg-[#0b1c30]/95 text-white px-4 py-3 rounded-xl shadow-xl border border-white/10 text-[11px] font-semibold transition-all duration-300 w-[90%] text-center backdrop-blur-md animate-fade-in">
          {toast.message}
        </div>
      )}

      <BottomNav />
    </PhoneFrame>
  );
};
export default ManagerRiskCenter;
