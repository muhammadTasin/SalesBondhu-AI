import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PhoneFrame } from '../../components/PhoneFrame';
import { BottomNav } from '../../components/BottomNav';
import { mockDealers, mockOfficers } from '../../data/managerMockData';
import {
  Search,
  Compass,
  Store,
  Activity,
  RefreshCw,
  Plus,
  Minus,
  Users,
  ArrowLeft
} from 'lucide-react';

export const ManagerTerritoryMap: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('rahman-traders');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Stateful Zoom levels: 0.8x, 1x, 1.25x, 1.5x, 1.75x
  const zoomLevels = [0.8, 1.0, 1.25, 1.5, 1.75];
  const [zoomIndex, setZoomIndex] = useState(1); // Default to 1.0x (index 1)
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  const showToastMessage = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2000);
  };

  // Zoom operations
  const handleZoomIn = () => {
    if (zoomIndex < zoomLevels.length - 1) {
      setZoomIndex(prev => prev + 1);
      showToastMessage(`Zoom: ${zoomLevels[zoomIndex + 1]}x`);
    } else {
      showToastMessage(lang === 'BN' ? 'সর্বোচ্চ জুম সীমায় আছেন' : 'Maximum zoom reached');
    }
  };

  const handleZoomOut = () => {
    if (zoomIndex > 0) {
      setZoomIndex(prev => prev - 1);
      showToastMessage(`Zoom: ${zoomLevels[zoomIndex - 1]}x`);
    } else {
      showToastMessage(lang === 'BN' ? 'সর্বনিম্ন জুম সীমায় আছেন' : 'Minimum zoom reached');
    }
  };

  const handleResetZoom = () => {
    setZoomIndex(1); // Reset to 1.0x
    setSelectedNodeId(null);
    showToastMessage(lang === 'BN' ? 'রিসেন্টার এবং জুম রিসেট করা হয়েছে' : 'Map recentered, zoom reset');
  };

  // Parse deep-linked query parameters on mount
  useEffect(() => {
    const dealerParam = searchParams.get('dealer');
    const officerParam = searchParams.get('officer');

    if (dealerParam) {
      // e.g. ?dealer=rahman
      const matchedNode = mockDealers.find(d => d.id.includes(dealerParam));
      if (matchedNode) {
        setSelectedNodeId(matchedNode.id);
        setZoomIndex(3); // Zoom to 1.5x
        showToastMessage(
          lang === 'BN' 
            ? `ডিলার খুঁজুন: ${matchedNode.name} হাইলাইট করা হয়েছে!` 
            : `Dealer Search: ${matchedNode.name} highlighted!`
        );
      }
    } else if (officerParam) {
      // e.g. ?officer=rahim
      const matchedOfficer = mockOfficers.find(o => o.id.includes(officerParam));
      if (matchedOfficer) {
        // Find corresponding active dealer or route node for the officer
        const targetNode = mockDealers.find(d => d.officerId === matchedOfficer.id) || mockDealers[0];
        setSelectedNodeId(targetNode.id);
        setZoomIndex(3); // Zoom to 1.5x
        showToastMessage(
          lang === 'BN'
            ? `অফিসার ${matchedOfficer.name}-এর রুট ও পজিশন ফোকাস করা হয়েছে!`
            : `FSO ${matchedOfficer.name}'s active route focused!`
        );
      }
    }
  }, [searchParams]);

  const currentZoom = zoomLevels[zoomIndex];

  // Click handler for dealer node selection
  const handleNodeClick = (id: string, name: string) => {
    setSelectedNodeId(id);
    showToastMessage(lang === 'BN' ? `${name} ফোকাস করা হয়েছে` : `Focused on ${name}`);
  };

  const selectedNode = mockDealers.find((n) => n.id === selectedNodeId) || null;

  // Filter nodes based on search query
  const filteredNodes = mockDealers.filter((node) => 
    node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.officer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PhoneFrame>
      
      {/* Top search & status area */}
      <div className="relative z-30 pt-6 px-4 w-full flex flex-col gap-2 pointer-events-none bg-gradient-to-b from-[#f8f9ff]/90 to-transparent pb-3">
        {/* Search & Language toggle */}
        <div className="flex items-center justify-between w-full gap-2">
          {/* Header Back Button for Context */}
          <button 
            onClick={() => navigate('/manager')}
            className="bg-white/95 p-2 rounded-full shadow-md border border-[#c5c6cd]/30 pointer-events-auto active:scale-90 transition-transform shrink-0"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={16} className="text-[#0b1c30]" />
          </button>
          
          {/* Search bar */}
          <div className="flex-grow bg-white/95 backdrop-blur-sm rounded-full shadow-md flex items-center px-3.5 py-2 pointer-events-auto border border-[#c5c6cd]/30">
            <Search size={14} className="text-[#75777d] mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'BN' ? 'ডিলার বা এরিয়া খুঁজুন...' : 'Search dealers or FSOs...'}
              className="bg-transparent border-none text-xs text-[#0b1c30] w-full p-0 focus:ring-0 focus:outline-none placeholder-[#75777d]/60"
            />
          </div>
          
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="bg-[#0b1c30] text-white rounded-full px-3 py-2 text-[10px] font-bold shadow-md hover:opacity-95 active:scale-95 transition-all pointer-events-auto shrink-0 outline-none"
          >
            {lang === 'BN' ? 'বাং | EN' : 'EN | বাং'}
          </button>
        </div>

        {/* Data Source Health status chips */}
        <div className="flex gap-1.5 overflow-x-auto py-0.5 pointer-events-auto scrollbar-hide">
          <span className="flex-shrink-0 inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[#006c49] font-bold text-[8px] px-2 py-1 rounded-full shadow-sm border border-[#006c49]/10">
            <Activity size={10} className="stroke-[2.5px]" />
            GPS: LIVE
          </span>
          <span className="flex-shrink-0 inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[#006c49] font-bold text-[8px] px-2 py-1 rounded-full shadow-sm border border-[#006c49]/10">
            <RefreshCw size={10} className="stroke-[2.5px]" />
            ERP: SYNCED
          </span>
          <span className="flex-shrink-0 inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[#0c714d] font-bold text-[8px] px-2 py-1 rounded-full shadow-sm border border-[#0c714d]/10">
            <Users size={10} className="stroke-[2px]" />
            12/15 ACTIVE
          </span>
        </div>
      </div>

      {/* Map Canvas Wrapper */}
      <div className="relative flex-grow w-full overflow-hidden z-10 bg-[#f4f7fc]">
        
        {/* Stateful Scaled Map Inner Container */}
        <div 
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `scale(${currentZoom})`, transformOrigin: 'center center' }}
        >
          {/* SVG Map lanes, roads, grids */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridPattern" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e0e6ed" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridPattern)" />

            {/* Plan Route Lanes (Green solid path) */}
            <path
              d="M 60,280 L 110,280 L 130,130 L 80,80 L 230,80 L 350,180"
              fill="none"
              stroke="#006c49"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />

            {/* Actual GPS Tracking movement (Dashed Red deviation lane) */}
            <path
              d="M 60,280 L 110,280 L 80,180 L 60,130 L 230,80"
              fill="none"
              stroke="#ba1a1a"
              strokeWidth="4"
              strokeDasharray="5,5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />

            {/* Missed Zone Alert dotted boundary line */}
            <path
              d="M 180,350 L 270,300 L 350,180"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3.5"
              strokeDasharray="2,2"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Translucent Low Coverage Zone Circle */}
            <circle cx="100" cy="110" r="52" fill="#ffdad6" fillOpacity="0.45" stroke="#ba1a1a" strokeWidth="1" strokeDasharray="3,3" />
            <text x="65" y="165" fontSize="7" fontWeight="bold" fill="#93000a" opacity="0.75" className="select-none pointer-events-none">Low Coverage Zone</text>
          </svg>

          {/* Spaced out Dealer Marker Buttons */}
          {filteredNodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            return (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node.id, node.name)}
                style={{ top: `${node.lat}px`, left: `${node.lng}px` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 outline-none"
              >
                <div className="relative flex flex-col items-center">
                  {/* Ping effect for selected or urgent items */}
                  {(isSelected || node.status === 'urgent') && (
                    <span 
                      style={{ backgroundColor: node.statusColor }}
                      className="absolute w-8 h-8 rounded-full opacity-40 animate-ping -top-0.5"
                    />
                  )}
                  {/* Pin Circle */}
                  <div 
                    style={{ borderColor: node.statusColor }}
                    className={`w-7.5 h-7.5 rounded-full bg-white shadow-md border-[2.5px] flex items-center justify-center transition-all duration-200 ${
                      isSelected ? 'scale-125 border-4 ring-2 ring-white shadow-xl' : 'hover:scale-115'
                    }`}
                  >
                    <Store size={12} style={{ color: node.statusColor }} />
                  </div>
                  {/* Pointer arrow pin */}
                  <div 
                    style={{ borderTopColor: node.statusColor }}
                    className="w-0 h-0 border-x-[4px] border-x-transparent border-t-[5px]"
                  />
                  {/* Micro label banner */}
                  <div className="bg-white/95 px-1 rounded shadow-sm border border-[#c5c6cd]/30 text-[7px] font-bold text-[#0b1c30] whitespace-nowrap mt-0.5 pointer-events-none">
                    {node.name.split(' ')[0]}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Active Officers Markers */}
          {/* Rahim (RA) near Rahman Traders */}
          <div className="absolute top-[138px] left-[78px] transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
            <div className="w-5 h-5 bg-[#ba1a1a] rounded-full border-2 border-white shadow-md text-white font-bold text-[8px] flex items-center justify-center pulse-ring">
              RA
            </div>
            <div className="bg-[#eff4ff] text-[#ba1a1a] font-bold text-[5px] px-1 rounded border border-[#ba1a1a]/30 mt-0.5">
              OFF-ROUTE
            </div>
          </div>

          {/* Kamrul (KH) near Karim Paint House */}
          <div className="absolute top-[75px] left-[255px] transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
            <div className="w-5 h-5 bg-[#006c49] rounded-full border-2 border-white shadow-md text-white font-bold text-[8px] flex items-center justify-center pulse-ring">
              KH
            </div>
            <div className="bg-[#eff4ff] text-[#006c49] font-bold text-[5px] px-1 rounded border border-[#006c49]/30 mt-0.5">
              ON-ROUTE
            </div>
          </div>
        </div>

        {/* Map Control buttons (Zoom In, Zoom Out, Recenter) */}
        <div className="absolute bottom-4 right-4 z-40 flex flex-col gap-2 pointer-events-auto">
          <button 
            onClick={handleZoomIn}
            className="bg-white text-[#0b1c30] p-2.5 rounded-full shadow-lg border border-[#c5c6cd]/30 active:scale-90 transition-all hover:bg-[#eff4ff] outline-none"
            aria-label="Zoom in"
          >
            <Plus size={16} />
          </button>
          <button 
            onClick={handleZoomOut}
            className="bg-white text-[#0b1c30] p-2.5 rounded-full shadow-lg border border-[#c5c6cd]/30 active:scale-90 transition-all hover:bg-[#eff4ff] outline-none"
            aria-label="Zoom out"
          >
            <Minus size={16} />
          </button>
          <button 
            onClick={handleResetZoom}
            className="bg-white text-[#0b1c30] p-2.5 rounded-full shadow-lg border border-[#c5c6cd]/30 active:scale-90 transition-all hover:bg-[#eff4ff] outline-none"
            aria-label="Reset and recenter"
          >
            <Compass size={16} />
          </button>
        </div>

        {/* Map Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-40 bg-white/95 backdrop-blur-sm rounded-xl p-2.5 shadow-md border border-[#c5c6cd]/30 flex flex-col gap-1.5 text-[8px] font-bold text-[#0b1c30]">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>{lang === 'BN' ? 'জরুরী (Urgent)' : 'Urgent'}</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>{lang === 'BN' ? 'ফলো-আপ (Follow-up)' : 'Follow-up'}</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#006c49]"></span>{lang === 'BN' ? 'সুস্থ (Healthy)' : 'Healthy'}</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0284c7]"></span>{lang === 'BN' ? 'সম্ভাব্য (Potential)' : 'Potential'}</div>
        </div>
      </div>

      {/* Contextual Bottom sheet */}
      <div className="relative z-30 w-full flex flex-col justify-end bg-white border-t border-[#c5c6cd]/25 shadow-[0px_-8px_25px_rgba(0,0,0,0.08)] p-4 space-y-3">
        {/* Grabber indicator */}
        <div className="flex justify-center w-full cursor-pointer pb-1">
          <div className="w-12 h-1 bg-[#c5c6cd] rounded-full"></div>
        </div>

        {/* Header row */}
        <div className="flex justify-between items-center border-b border-[#eff4ff] pb-2">
          <h3 className="text-xs font-bold text-[#0b1c30]">
            {lang === 'BN' ? 'টেরিটরি পারফরম্যান্স' : 'Territory Performance'}
          </h3>
          <span className="text-[9px] font-bold text-[#006c49] bg-[#9af2c5]/25 px-2 py-0.5 rounded-full">
            {lang === 'BN' ? '৬টি বেল্ট চিহ্নিত' : '6 Belts Audited'}
          </span>
        </div>

        {/* Selected Dealer Summary card */}
        {selectedNode ? (
          <div className="bg-[#f8f9ff] rounded-xl p-3 border border-[#c5c6cd]/25 space-y-2 text-[10px] animate-fade-in">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-[#0b1c30] flex items-center gap-1">
                  {selectedNode.name}
                  <span 
                    style={{ backgroundColor: selectedNode.statusColor }}
                    className="w-2 h-2 rounded-full animate-pulse"
                  />
                </h4>
                <p className="text-[9px] text-[#75777d] mt-0.5">
                  {lang === 'BN' ? 'দায়িত্বপ্রাপ্ত অফিসার:' : 'Assigned FSO:'} <strong className="font-semibold text-[#44474c]">{selectedNode.officer}</strong>
                </p>
              </div>
              <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase ${
                selectedNode.status === 'urgent' ? 'bg-[#ffdad6] text-[#93000a]' :
                selectedNode.status === 'followup' ? 'bg-[#ffddba] text-[#5a4226]' :
                selectedNode.status === 'healthy' ? 'bg-[#9af2c5] text-[#0c714d]' : 'bg-[#d3e4fe] text-[#0f3b75]'
              }`}>
                {selectedNode.status}
              </span>
            </div>

            <p className="text-[9px] text-[#44474c] bg-white p-1.5 rounded border border-[#c5c6cd]/10 italic">
              {selectedNode.descriptionBN}
            </p>

            {/* Card data grid */}
            <div className="grid grid-cols-3 gap-1 pt-2 border-t border-[#eff4ff] text-center text-[9px]">
              <div>
                <span className="text-[#75777d] block uppercase text-[7px]">{lang === 'BN' ? 'অর্ডার' : 'Sales'}</span>
                <span className="font-bold text-[#0b1c30]">{selectedNode.sales}</span>
              </div>
              <div>
                <span className="text-[#75777d] block uppercase text-[7px]">{lang === 'BN' ? 'আদায়কৃত' : 'Collected'}</span>
                <span className="font-bold text-[#006c49]">{selectedNode.collection}</span>
              </div>
              <div>
                <span className="text-[#75777d] block uppercase text-[7px]">{lang === 'BN' ? 'কভারেজ' : 'Coverage'}</span>
                <span className="font-bold text-[#0b1c30]">{selectedNode.coverage}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-[#75777d]">
            {lang === 'BN' ? 'ম্যাপে ডিলার বা জোন সিলেক্ট করুন' : 'Select a dealer node on the map'}
          </div>
        )}

        {/* Scrollable list of dealer chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {mockDealers.map((node) => {
            const isActive = node.id === selectedNodeId;
            return (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node.id, node.name)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-[10px] font-semibold border text-left flex items-center gap-1.5 transition-all outline-none ${
                  isActive
                    ? 'bg-[#0b1c30] text-white border-transparent shadow-md scale-105'
                    : 'bg-white text-[#44474c] border-[#c5c6cd]/30 hover:bg-[#eff4ff] active:scale-95'
                }`}
              >
                <span 
                  style={{ backgroundColor: node.statusColor }}
                  className="w-1.5 h-1.5 rounded-full"
                />
                <span>{node.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toast.visible && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#0e1c2f]/95 text-white px-4 py-2 rounded-xl shadow-lg border border-[#c5c6cd]/25 text-[9px] font-semibold transition-all duration-300 w-[85%] text-center backdrop-blur-sm">
          {toast.message}
        </div>
      )}

      <BottomNav />
    </PhoneFrame>
  );
};
export default ManagerTerritoryMap;
