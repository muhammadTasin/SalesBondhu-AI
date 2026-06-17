import React from 'react';

interface PriorityBadgeProps {
  level: 'urgent' | 'warning' | 'normal' | 'lead';
  text: string;
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  level,
  text,
  className = ''
}) => {
  let styles = '';
  let iconName = '';

  switch (level) {
    case 'urgent':
      styles = 'bg-[#ba1a1a] text-white';
      iconName = 'error';
      break;
    case 'warning':
      styles = 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ffdad6]';
      iconName = 'warning';
      break;
    case 'normal':
      styles = 'bg-[#9af2c5] text-[#0c714d]';
      iconName = 'check_circle';
      break;
    case 'lead':
      styles = 'bg-[#d6e3fe] text-[#0e1c2f]';
      iconName = 'add_business';
      break;
  }

  return (
    <div className={`inline-flex items-center gap-1 font-semibold text-[11px] px-2.5 py-1 rounded-full shadow-sm ${styles} ${className}`}>
      {iconName && (
        <span className="material-symbols-outlined text-[13px] fill-current">
          {iconName}
        </span>
      )}
      <span>{text}</span>
    </div>
  );
};
