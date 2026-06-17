import React from 'react';

export const MapRadar: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 pointer-events-none">
      {/* Radar range dashed outline */}
      <div className="w-[200px] h-[200px] bg-[#1976D2]/10 border border-dashed border-[#1976D2]/30 rounded-full absolute pointer-events-none" />
      
      {/* Pulse ring animation */}
      <div className="w-5 h-5 bg-[#1976D2] rounded-full border-[3px] border-white shadow-lg relative z-10 animate-ping opacity-75" />
      <div className="w-5 h-5 bg-[#1976D2] rounded-full border-[3px] border-white shadow-lg absolute z-10" />
      
      <div className="absolute -bottom-7 bg-white/95 px-2 py-0.5 rounded shadow border border-[#c5c6cd]/50 text-[10px] font-semibold text-[#0b1c30] whitespace-nowrap z-10">
        আপনি এখানে
      </div>
    </div>
  );
};

interface DealerBubbleProps {
  top: string;
  left: string;
  level: 'urgent' | 'warning' | 'normal' | 'lead';
  icon: string;
  label?: string;
  onClick?: () => void;
}

export const DealerBubble: React.FC<DealerBubbleProps> = ({
  top,
  left,
  level,
  icon,
  label,
  onClick
}) => {
  let bgColor = '';
  switch (level) {
    case 'urgent':
      bgColor = 'bg-[#ba1a1a]';
      break;
    case 'warning':
      bgColor = 'bg-[#ffdad6] text-[#ba1a1a] border-[#ba1a1a]';
      break;
    case 'normal':
      bgColor = 'bg-[#006c49]';
      break;
    case 'lead':
      bgColor = 'bg-[#d6e3fe] text-[#0e1c2f]';
      break;
  }

  return (
    <div
      style={{ top, left }}
      onClick={onClick}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer pointer-events-auto"
    >
      <div className="relative group">
        <div className={`w-7 h-7 rounded-full ${bgColor} border-2 border-white shadow-md flex items-center justify-center transition-transform duration-200 hover:scale-110`}>
          <span className="material-symbols-outlined text-white text-[15px] fill-current">
            {icon}
          </span>
        </div>
        {label && (
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 px-1.5 py-0.5 rounded shadow border border-[#c5c6cd]/30 text-[9px] font-semibold text-[#0b1c30] whitespace-nowrap pointer-events-none opacity-80">
            {label}
          </div>
        )}
      </div>
    </div>
  );
};
