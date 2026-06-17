import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, PlusCircle } from 'lucide-react';

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
  let IconComponent: React.ComponentType<{ size?: number; className?: string }> | null = null;

  switch (level) {
    case 'urgent':
      styles = 'bg-[#ba1a1a] text-white';
      IconComponent = AlertCircle;
      break;
    case 'warning':
      styles = 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ffdad6]';
      IconComponent = AlertTriangle;
      break;
    case 'normal':
      styles = 'bg-[#9af2c5] text-[#0c714d]';
      IconComponent = CheckCircle;
      break;
    case 'lead':
      styles = 'bg-[#d6e3fe] text-[#0e1c2f]';
      IconComponent = PlusCircle;
      break;
  }

  return (
    <div className={`inline-flex items-center gap-1 font-semibold text-[11px] px-2.5 py-1 rounded-full shadow-sm ${styles} ${className}`}>
      {IconComponent && (
        <IconComponent size={12} className="stroke-[2.5px] shrink-0" />
      )}
      <span>{text}</span>
    </div>
  );
};
