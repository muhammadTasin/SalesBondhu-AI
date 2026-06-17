import React from 'react';

interface ProgressRingProps {
  percentage: number;
  label: string;
  sublabel?: string;
  size?: number;
  strokeWidth?: number;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  label,
  sublabel,
  size = 88,
  strokeWidth = 8
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-[20px] p-6 flex items-center shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#e5eeff]/50">
      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Track */}
          <circle
            className="text-[#006c49]/10"
            cx={size / 2}
            cy={size / 2}
            fill="transparent"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            className="text-[#006c49] transition-all duration-1000 ease-out"
            cx={size / 2}
            cy={size / 2}
            fill="transparent"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-[#0b1c30]">{percentage}%</span>
        </div>
      </div>
      <div className="ml-5">
        <h2 className="text-base font-semibold text-[#0b1c30]">{label}</h2>
        {sublabel && <p className="text-xs text-[#44474c] mt-0.5">{sublabel}</p>}
      </div>
    </div>
  );
};
