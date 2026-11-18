import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { ActionButton } from '../components/ActionButton';
import { ArrowLeft, MoreVertical, MapPin, Route, AlertTriangle, Brain, Sparkles, Wallet, TrendingDown, Clock, Play, RefreshCw } from 'lucide-react';

export const OptimizedRoute: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      {/* TopAppBar */}
      <header className="bg-white shadow-sm flex justify-between items-center w-full px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/today')}
            className="hover:bg-[#eff4ff] p-2 rounded-full text-[#0b1c30] transition-colors flex items-center justify-center active:scale-95"
          >
            <ArrowLeft size={20} className="shrink-0" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-[#0b1c30]">আজকের সেরা রুট</h1>
            <p className="text-[10px] text-[#44474c] mt-0.5">ERP synced 10:45 AM</p>
          </div>
        </div>
        <button className="hover:bg-[#eff4ff] p-2 rounded-full text-[#75777d] transition-colors flex items-center justify-center active:scale-95">
          <MoreVertical size={20} className="shrink-0" />
        </button>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow overflow-y-auto pb-4 space-y-6">
        {/* Map Preview */}
        <div className="w-full h-44 bg-[#dce9ff] relative overflow-hidden flex items-center justify-center">
          <img
            alt="Map Route"
            className="w-full h-full object-cover opacity-90"
            src="/demo/route-map.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9ff] via-transparent to-transparent" />
        </div>

        <div className="px-4 -mt-8 relative z-10 space-y-5">
          {/* Route Summary Cards (Bento style) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 shadow-sm border border-[#e5eeff]/50 flex flex-col justify-center items-center text-center">
              <div className="flex items-center gap-1 text-[#44474c] mb-1">
                <MapPin size={16} className="shrink-0" />
                <span className="text-[10px] font-bold">Total Visits</span>
              </div>
              <div className="text-xs font-bold text-[#0b1c30]">৮টি ভিজিট প্ল্যান</div>
            </div>
            
            <div className="bg-white rounded-xl p-3 shadow-sm border border-[#e5eeff]/50 flex flex-col justify-center items-center text-center">
              <div className="flex items-center gap-1 text-[#44474c] mb-1">
                <Route size={16} className="shrink-0" />
                <span className="text-[10px] font-bold">Distance</span>
              </div>
              <div className="text-xs font-bold text-[#0b1c30]">১২.৫ km</div>
            </div>

            <div className="bg-[#ffdad6] rounded-xl p-3 shadow-sm border border-[#ffdad6] flex flex-col justify-center items-center text-center col-span-2">
              <div className="flex items-center gap-1 text-[#ba1a1a] mb-1">
                <AlertTriangle size={16} className="shrink-0" />
                <span className="text-[10px] font-bold">Urgent Stops</span>
              </div>
              <div className="text-xs font-bold text-[#ba1a1a]">৩টি জরুরি ভিজিট</div>
            </div>
          </div>

          {/* AI Reason Card */}
          <div className="bg-[#0e1c2f] rounded-xl p-4 shadow-sm relative overflow-hidden text-white border border-white/5">
            <div className="absolute top-2 right-2 opacity-10">
              <Brain size={48} className="text-white" />
            </div>
            <div className="flex items-start gap-3 relative z-10">
              <div className="bg-[#006c49]/20 p-2 rounded-full text-[#9df4c8] flex items-center justify-center">
                <Sparkles size={20} className="shrink-0" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#9df4c8] mb-0.5 uppercase tracking-wider">কেন আগে যাবেন?</div>
                <h3 className="text-sm font-bold text-white">স্মার্ট রুট সুপারিশ</h3>
                <p className="text-xs text-[#bac7e1] mt-1">কালেকশন ঝুঁকি এবং সেলস হ্রাসের ভিত্তিতে তৈরি</p>
              </div>
            </div>
          </div>

          {/* Ordered Stop List */}
          <div>
            <h2 className="text-sm font-bold text-[#0b1c30] mb-3">ভিজিটের সিরিয়াল</h2>
            <div className="space-y-3 relative">
              {/* Vertical Connector Line */}
              <div className="absolute left-[18px] top-4 bottom-4 w-0.5 bg-[#d3e4fe] z-0" />
              
              {/* Stop 1 */}
              <div className="bg-white rounded-xl p-3 shadow-sm border border-[#ba1a1a]/20 relative z-10 flex gap-3 items-center">
                <div className="w-9 h-9 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  ১
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className="text-xs font-bold text-[#0b1c30] truncate">Rahman Traders</h4>
                    <span className="bg-[#ffdad6] text-[#ba1a1a] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#ba1a1a]/10 shrink-0">
                      Urgent
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#ba1a1a] text-xs font-semibold">
                    <Wallet size={16} className="shrink-0" />
                    <span>৳৮৫,০০০ বকেয়া</span>
                  </div>
                </div>
              </div>

              {/* Stop 2 */}
              <div className="bg-white rounded-xl p-3 shadow-sm border border-[#e5eeff]/50 relative z-10 flex gap-3 items-center">
                <div className="w-9 h-9 rounded-full bg-[#0e1c2f] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm border border-[#c5c6cd]">
                  ২
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-bold text-[#0b1c30] truncate mb-0.5">Karim Paint House</h4>
                  <div className="flex items-center gap-1 text-[#ba1a1a] text-xs font-semibold">
                    <TrendingDown size={16} className="shrink-0" />
                    <span>Sales down 40%</span>
                  </div>
                </div>
              </div>

              {/* Stop 3 */}
              <div className="bg-white rounded-xl p-3 shadow-sm border border-[#e5eeff]/50 relative z-10 flex gap-3 items-center">
                <div className="w-9 h-9 rounded-full bg-[#0e1c2f] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm border border-[#c5c6cd]">
                  ৩
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-bold text-[#0b1c30] truncate mb-0.5">Modern Hardware</h4>
                  <div className="flex items-center gap-1 text-[#44474c] text-xs font-semibold">
                    <Clock size={16} className="shrink-0" />
                    <span>Follow-up pending 14 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <ActionButton
              label="রুট শুরু করুন"
              icon={<Play size={18} className="shrink-0 fill-current" />}
              onClick={() => navigate('/active-visit/1')}
              variant="emerald"
            />
            <ActionButton
              label="পুনরায় হিসাব করুন"
              icon={<RefreshCw size={18} className="shrink-0" />}
              variant="light"
            />
          </div>
        </div>
      </main>
    </PhoneFrame>
  );
};
export default OptimizedRoute;
