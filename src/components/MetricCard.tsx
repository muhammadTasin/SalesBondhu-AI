import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[20px] p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#e5eeff]/50 flex flex-col justify-between h-28 cursor-pointer hover:-translate-y-0.5 transition-transform duration-200"
    >
      <div className="flex justify-between items-start">
        {icon}
        <span className="text-xs font-semibold text-[#44474c]">{value}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-[#0b1c30]">{title}</p>
      </div>
    </div>
  );
};
