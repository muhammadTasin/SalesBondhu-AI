import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: 'হোম', icon: 'home', path: '/today' },
    { name: 'ম্যাপ', icon: 'explore', path: '/map' },
    { name: 'ডিলার', icon: 'storefront', path: '/visit-plan' },
    { name: 'কোচ', icon: 'smart_toy', path: '/coach' },
    { name: 'রিপোর্ট', icon: 'assessment', path: '/end-day-report' }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#ffffff] shadow-[0px_-4px_20px_rgba(0,0,0,0.05)] border-t border-[#c5c6cd]/30 flex justify-around items-center px-1 z-50">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-full active:scale-95 transition-all duration-200 ${
              isActive
                ? 'bg-[#9af2c5] text-[#0c714d] font-semibold'
                : 'text-[#44474c] hover:bg-[#eff4ff]'
            }`}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {tab.icon}
            </span>
            <span className="text-[10px] mt-0.5">{tab.name}</span>
          </button>
        );
      })}
    </div>
  );
};
