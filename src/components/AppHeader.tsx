import React from 'react';
import { RefreshCw, MapPin } from 'lucide-react';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  syncTime?: string;
  showGPSStatus?: boolean;
  onLanguageToggle?: () => void;
  lang?: 'BN' | 'EN';
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = 'SalesBondhu AI',
  subtitle = 'শুভ সকাল, আরিফ',
  syncTime = '২ মিনিট আগে',
  showGPSStatus = true,
  onLanguageToggle,
  lang = 'BN'
}) => {
  return (
    <header className="flex items-center justify-between px-4 pt-6 pb-4 w-full">
      <div>
        {subtitle && <p className="text-xs text-[#44474c] mb-0.5">{subtitle}</p>}
        <h1 className="text-xl font-semibold text-[#0b1c30]">{title}</h1>
        <div className="flex items-center gap-2 mt-1">
          {syncTime && (
            <span className="flex items-center gap-0.5 text-[10px] text-[#44474c]">
              <RefreshCw size={10} className="stroke-[2.5px]" />
              সর্বশেষ সিঙ্ক: {syncTime}
            </span>
          )}
          {showGPSStatus && (
            <span className="flex items-center gap-0.5 text-[10px] text-[#006c49] font-medium">
              <MapPin size={10} className="stroke-[2.5px]" />
              GPS synced
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onLanguageToggle}
          className="bg-[#eff4ff] text-[#0b1c30] rounded-full px-2.5 py-1 text-[11px] font-semibold flex items-center shadow-sm border border-[#c5c6cd]/30"
        >
          {lang === 'BN' ? 'বাং | EN' : 'EN | বাং'}
        </button>
        
        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c5c6cd] shadow-sm flex-shrink-0 bg-[#eff4ff]">
          <img
            alt="Arif's Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCXvlrPlagz0YnSVeaZp9jm0T7UVWGrXY8izLkLoK1YtgJth88feKwyL90Jh8tHp3OyqSrGHNmMMAaMSkSkMa60LMDEIlnz88L1KLPXeMVUSnMAc07SkFFkAHYx0FFLXRxRFc689aDNVR8PaXSwX4FaQcBrPcZj8uqIg-62rKVP2-J9itamAPd1Ebe6OtcTPApck9fFX1fRl7ekLB2zpxXePxOQv3eEDEB3fa3rWbaF1ajs1WlQCS8HeGYwnOldNUTlAZBXkF5jA"
          />
        </div>
      </div>
    </header>
  );
};
