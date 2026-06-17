import React from 'react';
import { MapPin } from 'lucide-react';

interface DealerCardProps {
  name: string;
  distance: string;
  priorityLevel: 'urgent' | 'warning' | 'normal' | 'lead' | 'potential';
  priorityText: string;
  actionText?: string;
  onActionClick?: (e: React.MouseEvent) => void;
  onCardClick?: () => void;
  className?: string;
  isActive?: boolean;
}

export const DealerCard: React.FC<DealerCardProps> = ({
  name,
  distance,
  priorityLevel,
  priorityText,
  actionText = 'বিস্তারিত →',
  onActionClick,
  onCardClick,
  className = '',
  isActive = false
}) => {
  let indicatorColor = '';
  let borderColor = 'border-[#c5c6cd]/30';

  switch (priorityLevel) {
    case 'urgent':
      indicatorColor = 'bg-[#ba1a1a]';
      borderColor = 'border-[#ffdad6]';
      break;
    case 'warning':
      indicatorColor = 'bg-[#ffdad6]';
      borderColor = 'border-[#ffdad6]';
      break;
    case 'normal':
      indicatorColor = 'bg-[#006c49]';
      borderColor = 'border-[#e5eeff]/50';
      break;
    case 'lead':
      indicatorColor = 'bg-[#d6e3fe]';
      borderColor = 'border-[#e5eeff]/50';
      break;
    case 'potential':
      indicatorColor = 'bg-[#008080]';
      borderColor = 'border-[#008080]/30';
      break;
  }

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
    }
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onCardClick
    if (onActionClick) {
      onActionClick(e);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`Select dealer ${name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      className={`flex-shrink-0 w-64 bg-white rounded-xl p-3 border flex flex-col space-y-2 shadow-sm transition-all cursor-pointer ${
        isActive 
          ? 'ring-2 ring-[#006c49] border-transparent scale-[1.02]' 
          : `${borderColor} hover:bg-[#eff4ff]/20`
      } ${className}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold text-[#0b1c30]">{name}</p>
          <p className="text-xs text-[#44474c] flex items-center mt-0.5">
            <MapPin size={12} className="mr-0.5 text-[#75777d] shrink-0" />
            {distance}
          </p>
        </div>
        <div className={`w-2.5 h-2.5 rounded-full mt-1 ${indicatorColor}`} />
      </div>
      <div className="pt-2 border-t border-[#e5eeff] flex justify-between items-center">
        <span className={`text-xs font-semibold ${priorityLevel === 'urgent' ? 'text-[#ba1a1a]' : 'text-[#44474c]'}`}>
          {priorityText}
        </span>
        <button
          onClick={handleActionClick}
          className="text-xs text-[#006c49] hover:underline font-semibold cursor-pointer"
        >
          {actionText}
        </button>
      </div>
    </div>
  );
};
export default DealerCard;
