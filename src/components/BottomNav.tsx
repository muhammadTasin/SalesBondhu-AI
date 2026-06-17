import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, Store, Bot, BarChart3 } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: 'হোম', Icon: Home, path: '/today' },
    { name: 'ম্যাপ', Icon: Compass, path: '/map' },
    { name: 'ডিলার', Icon: Store, path: '/visit-plan' },
    { name: 'কোচ', Icon: Bot, path: '/coach' },
    { name: 'রিপোর্ট', Icon: BarChart3, path: '/end-day-report' }
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    navigate(tab.path);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-white shadow-[0px_-4px_20px_rgba(0,0,0,0.05)] border-t border-[#c5c6cd]/30 flex justify-around items-center px-1 z-50">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => handleTabClick(tab)}
            className={`flex flex-col items-center justify-center py-1 w-14 rounded-xl active:scale-95 transition-all duration-200 ${
              isActive
                ? 'bg-[#9af2c5] text-[#0c714d] font-semibold'
                : 'text-[#44474c] hover:bg-[#eff4ff]'
            }`}
          >
            <tab.Icon
              size={20}
              className={`${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`}
            />
            <span className="text-[9px] mt-1 tracking-tight">{tab.name}</span>
          </button>
        );
      })}
    </div>
  );
};
