import React, { useState, useRef, useEffect } from 'react';
import { Camera, Package, Megaphone, X, CheckCircle } from 'lucide-react';

interface PhotoProofUploaderProps {
  lang: 'BN' | 'EN';
  uploadStyle: 'active-visit' | 'eod-report';
  onPhotosChange?: (files: File[]) => void;
}

interface SelectedPhoto {
  id: string;
  file: File;
  previewUrl: string;
  label: string;
}

export const PhotoProofUploader: React.FC<PhotoProofUploaderProps> = ({
  lang,
  uploadStyle,
  onPhotosChange,
}) => {
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeLabelRef = useRef<string>('');

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      selectedPhotos.forEach((photo) => {
        URL.revokeObjectURL(photo.previewUrl);
      });
    };
  }, [selectedPhotos]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const validPhotos: SelectedPhoto[] = [];
    let limitExceeded = false;
    let invalidType = false;

    const currentTotal = selectedPhotos.length;
    
    files.forEach((file, index) => {
      if (currentTotal + validPhotos.length >= 5) {
        limitExceeded = true;
        return;
      }

      // Validate file type (image only)
      if (!file.type.startsWith('image/')) {
        invalidType = true;
        return;
      }

      const label = activeLabelRef.current || file.name;
      const previewUrl = URL.createObjectURL(file);
      
      validPhotos.push({
        id: `${Date.now()}-${index}-${Math.random()}`,
        file,
        previewUrl,
        label,
      });
    });

    if (invalidType) {
      setErrorMsg(
        lang === 'BN' 
          ? 'শুধুমাত্র ছবি ফাইল নির্বাচন করুন' 
          : 'Please select image files only'
      );
    }

    if (limitExceeded) {
      setErrorMsg(
        lang === 'BN'
          ? 'সর্বোচ্চ ৫টি ছবি যোগ করা যাবে'
          : 'Maximum 5 photos can be added'
      );
    }

    if (validPhotos.length > 0) {
      const newPhotos = [...selectedPhotos, ...validPhotos];
      setSelectedPhotos(newPhotos);
      if (onPhotosChange) {
        onPhotosChange(newPhotos.map((p) => p.file));
      }
    }

    // Reset input value to allow selecting same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = (label: string) => {
    activeLabelRef.current = label;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removePhoto = (idToRemove: string) => {
    const photoToRemove = selectedPhotos.find((p) => p.id === idToRemove);
    if (photoToRemove) {
      URL.revokeObjectURL(photoToRemove.previewUrl);
    }

    const updated = selectedPhotos.filter((p) => p.id !== idToRemove);
    setSelectedPhotos(updated);
    if (onPhotosChange) {
      onPhotosChange(updated.map((p) => p.file));
    }
  };

  // Fixed sample thumbnails for EOD report (from Stitch design)
  const initialEodPhotos = [
    {
      id: 'initial-1',
      label: lang === 'BN' ? 'দোকান' : 'Store Front',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1nOsPm_Z-iB48eoRe82WWNl_U0R8IcJYw3M63cp0_inNzVuUqeCCZbLFli1e5o3TBmqqLJdfq2XXylRE0v-Y_K2pF4ujPsuT-GTyXnsovmlUp0xfnwyZiYWCqmcprmHcEMQEryBtCKfZlDMGRafRcNDxaQl9hvcCu3THLgz5wXP3wKJDljd6rwIBFFlzkDFTNsQf_-N9vlR6BsfBz-3h59ohxhf5-LBZ6JGNZiejaVLp6hYptTU08BPOGTrBd83DclAeAYLFX0Q',
    },
    {
      id: 'initial-2',
      label: lang === 'BN' ? 'প্রদর্শনী' : 'Product Display',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSph1LU2L7QJTzpBOwQP9aIcLLoPBB1QDhMkxHCl6WuWk9bhJUBgwn5CPyioldyUN_eOWtGdY9O_9rduyfjU83PWImumzPjiPv-cSE2J-KGq0IMzCDS0DiaICxhoPQq5-lCpc3515ZJQamzlguFAfWqwo_hPBIZpMDilVbNqz33oAyfVDtYRxfKX79edAP-N55zD8ecaB-Kz0PYdrioz-RX9GlwZ5o1lZpI3pRfy6O0ok2ruc6-JgxLoeE_18sTOuYMUUb5alsPg',
    },
  ];

  const totalPhotosCount = (uploadStyle === 'eod-report' ? initialEodPhotos.length : 0) + selectedPhotos.length;

  if (uploadStyle === 'active-visit') {
    return (
      <div className="space-y-4">
        {/* Hidden input for files & mobile camera */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
          id="active-visit-photo-input"
        />

        <div>
          <span className="block text-[11px] font-bold text-[#44474c] mb-2">
            {lang === 'BN' ? 'প্রমাণস্বরূপ ছবি' : 'Proof of Visit Photos'}
          </span>
          
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              type="button"
              onClick={() => triggerFileInput(lang === 'BN' ? 'স্টক পজিশন' : 'Stock Position')}
              aria-label="Add stock position proof photo"
              className="border border-dashed border-[#c5c6cd] rounded-lg p-2.5 flex flex-col items-center gap-1 text-[#44474c] hover:bg-[#eff4ff] transition-colors focus:ring-2 focus:ring-[#bac7e1] outline-none"
            >
              <Package size={18} className="shrink-0 text-[#44474c]" />
              <span className="text-[9px] font-bold">{lang === 'BN' ? 'স্টক পজিশন' : 'Stock Position'}</span>
            </button>
            <button
              type="button"
              onClick={() => triggerFileInput(lang === 'BN' ? 'ব্র্যান্ডিং মেটেরিয়াল' : 'Branding Materials')}
              aria-label="Add branding materials proof photo"
              className="border border-dashed border-[#c5c6cd] rounded-lg p-2.5 flex flex-col items-center gap-1 text-[#44474c] hover:bg-[#eff4ff] transition-colors focus:ring-2 focus:ring-[#bac7e1] outline-none"
            >
              <Megaphone size={18} className="shrink-0 text-[#44474c]" />
              <span className="text-[9px] font-bold">{lang === 'BN' ? 'ব্র্যান্ডিং মেটেরিয়াল' : 'Branding Materials'}</span>
            </button>
          </div>
          
          <button
            type="button"
            onClick={() => triggerFileInput(lang === 'BN' ? 'অন্যান্য ছবি' : 'Other Photo')}
            aria-label="Add other proof photo"
            className="w-full border-2 border-dashed border-[#c5c6cd] rounded-xl p-3 flex flex-col items-center justify-center text-[#44474c] hover:bg-[#eff4ff] hover:border-[#0e1c2f] transition-colors gap-0.5 focus:ring-2 focus:ring-[#bac7e1] outline-none"
          >
            <Camera size={20} className="shrink-0 text-[#44474c]" />
            <span className="text-[10px] font-bold">{lang === 'BN' ? 'অন্যান্য ছবি যোগ করুন' : 'Add Other Photos'}</span>
          </button>
        </div>

        {/* Display Status & Validation Errors */}
        {errorMsg && (
          <div className="text-[10px] font-bold text-[#ba1a1a] bg-[#ffdad6]/40 p-2 rounded-lg border border-[#ffdad6]">
            {errorMsg}
          </div>
        )}

        {selectedPhotos.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-[#006c49] text-[10px] font-bold">
              <CheckCircle size={12} className="shrink-0" />
              <span>
                {lang === 'BN' 
                  ? `${selectedPhotos.length}টি ছবি আপলোডের জন্য প্রস্তুত` 
                  : `${selectedPhotos.length} photo(s) ready for upload`}
              </span>
            </div>

            {/* Preview Thumbnails */}
            <div className="grid grid-cols-3 gap-2">
              {selectedPhotos.map((photo) => (
                <div key={photo.id} className="flex flex-col gap-1 relative group">
                  <div className="aspect-square bg-[#eff4ff] rounded-lg overflow-hidden border border-[#c5c6cd]/30 relative">
                    <img
                      src={photo.previewUrl}
                      alt={photo.label}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      title={lang === 'BN' ? 'ছবি সরান' : 'Remove photo'}
                      aria-label={`Remove photo ${photo.label}`}
                      className="absolute top-1 right-1 bg-[#ba1a1a] text-white rounded-full p-1 shadow hover:bg-red-700 transition-colors focus:ring-1 focus:ring-white"
                    >
                      <X size={10} className="shrink-0" />
                    </button>
                  </div>
                  <span className="text-[8px] text-center text-[#75777d] font-bold truncate max-w-full">
                    {photo.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // EOD Report layout
  return (
    <div className="space-y-3">
      {/* Hidden input for EOD */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        multiple
        className="hidden"
        id="eod-report-photo-input"
      />

      <div className="flex items-center justify-between bg-[#f8f9ff] p-2 rounded-lg border border-[#e5eeff]">
        <span className="text-[10px] font-bold text-[#44474c]">
          {lang === 'BN'
            ? `${totalPhotosCount}টি ছবি আপলোড করা হয়েছে`
            : `${totalPhotosCount} photos uploaded`}
        </span>
        <CheckCircle size={14} className="text-[#006c49] shrink-0" />
      </div>

      {errorMsg && (
        <div className="text-[10px] font-bold text-[#ba1a1a] bg-[#ffdad6]/40 p-2 rounded-lg border border-[#ffdad6]">
          {errorMsg}
        </div>
      )}

      {/* Grid containing Initial Samples and Selected Files */}
      <div className="grid grid-cols-3 gap-2">
        {/* Initial Static Photos */}
        {initialEodPhotos.map((photo) => (
          <div key={photo.id} className="flex flex-col gap-1">
            <div className="aspect-square bg-[#eff4ff] rounded-lg overflow-hidden border border-[#c5c6cd]/30 relative">
              <img
                src={photo.url}
                alt={photo.label}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[8px] text-center text-[#75777d] font-bold">
              {photo.label}
            </span>
          </div>
        ))}

        {/* Selected Photos */}
        {selectedPhotos.map((photo) => (
          <div key={photo.id} className="flex flex-col gap-1 relative group">
            <div className="aspect-square bg-[#eff4ff] rounded-lg overflow-hidden border border-[#c5c6cd]/30 relative">
              <img
                src={photo.previewUrl}
                alt={photo.label}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
                title={lang === 'BN' ? 'ছবি সরান' : 'Remove photo'}
                aria-label={`Remove photo ${photo.label}`}
                className="absolute top-1 right-1 bg-[#ba1a1a] text-white rounded-full p-1 shadow hover:bg-red-700 transition-colors focus:ring-1 focus:ring-white"
              >
                <X size={10} className="shrink-0" />
              </button>
            </div>
            <span className="text-[8px] text-center text-[#75777d] font-bold truncate max-w-full">
              {photo.label}
            </span>
          </div>
        ))}

        {/* Add photo card/button (only visible if we are below 5 total photos including initial) */}
        {totalPhotosCount < 5 && (
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => triggerFileInput(lang === 'BN' ? 'নতুন ছবি' : 'New Photo')}
              aria-label="Add proof photo"
              className="aspect-square bg-white border border-dashed border-[#c5c6cd] hover:bg-[#f8f9ff] rounded-lg flex flex-col items-center justify-center text-[#75777d] focus:ring-2 focus:ring-[#bac7e1] outline-none"
            >
              <Camera size={16} className="shrink-0" />
              <span className="text-[8px] font-bold mt-1">
                {lang === 'BN' ? 'যোগ করুন' : 'Add'}
              </span>
            </button>
            <span className="text-[8px] text-center text-[#75777d] font-bold">
              {lang === 'BN' ? 'নতুন ছবি' : 'New Photo'}
            </span>
          </div>
        )}
      </div>
      
      {totalPhotosCount >= 5 && (
        <p className="text-[9px] text-center text-[#75777d] font-semibold">
          {lang === 'BN' ? 'সর্বোচ্চ ৫টি ছবি যোগ করা যাবে' : 'Maximum 5 photos can be added'}
        </p>
      )}
    </div>
  );
};
