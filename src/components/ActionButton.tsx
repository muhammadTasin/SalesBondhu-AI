import React from 'react';

interface ActionButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: 'emerald' | 'navy' | 'light';
  className?: string;
  type?: 'button' | 'submit';
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
  variant = 'emerald',
  className = '',
  type = 'button'
}) => {
  let btnStyle = '';
  if (variant === 'emerald') {
    btnStyle = 'bg-[#006c49] text-white hover:bg-[#0c714d] active:scale-95 shadow-md';
  } else if (variant === 'navy') {
    btnStyle = 'bg-[#0e1c2f] text-white hover:bg-[#213145] active:scale-95 shadow-md';
  } else {
    btnStyle = 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff] border border-[#c5c6cd]/30';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full rounded-xl py-3 px-4 font-semibold text-sm transition-all flex justify-center items-center gap-1.5 ${btnStyle} ${className}`}
    >
      {label}
      {icon}
    </button>
  );
};
