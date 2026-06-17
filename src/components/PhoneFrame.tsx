import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="flex justify-center bg-[#1e293b] min-h-[100dvh] w-full">
      <div className="w-full max-w-[430px] min-h-[100dvh] bg-[#f8f9ff] text-[#0b1c30] flex flex-col relative shadow-2xl border-x border-[#c5c6cd]/20 overflow-x-hidden pb-20 mx-auto">
        {children}
      </div>
    </div>
  );
};
