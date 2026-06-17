import React from 'react';

interface MapRadarProps {
  range?: '500m' | '1km' | '2km';
}

export const MapRadar: React.FC<MapRadarProps> = ({ range = '1km' }) => {
  // Determine radar circle size based on selected range
  let circleSizeClass = 'w-[220px] h-[220px]';
  if (range === '500m') {
    circleSizeClass = 'w-[140px] h-[140px]';
  } else if (range === '2km') {
    circleSizeClass = 'w-[300px] h-[300px]';
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 pointer-events-none">
      {/* Radar range dashed outline */}
      <div className={`${circleSizeClass} bg-[#1976D2]/10 border border-dashed border-[#1976D2]/30 rounded-full absolute pointer-events-none transition-all duration-500`} />
      
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
  icon: React.ReactNode;
  label?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const DealerBubble: React.FC<DealerBubbleProps> = ({
  top,
  left,
  level,
  icon,
  label,
  isActive = false,
  onClick
}) => {
  let bgColor = '';
  switch (level) {
    case 'urgent':
      bgColor = 'bg-[#ba1a1a] text-white';
      break;
    case 'warning':
      bgColor = 'bg-[#ffdad6] text-[#ba1a1a] border-[#ba1a1a]';
      break;
    case 'normal':
      bgColor = 'bg-[#006c49] text-white';
      break;
    case 'lead':
      bgColor = 'bg-[#d6e3fe] text-[#0e1c2f] border-[#c5c6cd]/30';
      break;
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) onClick();
    }
  };

  return (
    <button
      style={{ top, left }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      type="button"
      role="button"
      tabIndex={0}
      aria-label={label ? `View dealer details for ${label}` : 'View dealer details'}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer pointer-events-auto border-none bg-transparent p-0 outline-none transition-all duration-300 ${
        isActive ? 'scale-125 z-30' : 'hover:scale-110'
      }`}
    >
      <div className="relative group">
        <div className={`w-7 h-7 rounded-full ${bgColor} border-2 ${
          isActive ? 'border-[#1976D2] shadow-lg scale-110' : 'border-white shadow-md'
        } flex items-center justify-center transition-all duration-300`}>
          {icon}
        </div>
        {label && (
          <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 rounded shadow border text-[9px] font-bold whitespace-nowrap pointer-events-none transition-colors duration-300 ${
            isActive ? 'bg-[#0e1c2f] text-white border-[#0e1c2f]' : 'bg-white/95 text-[#0b1c30] border-[#c5c6cd]/30'
          }`}>
            {label}
          </div>
        )}
      </div>
    </button>
  );
};
