import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PhoneFrame } from '../components/PhoneFrame';
import { saveVisitCompletion } from '../services/visitDraftService';
import { getCurrentRole } from '../lib/mockSession';
import { supabase } from '../lib/supabase';
import {
  ArrowLeft,
  Store,
  Navigation,
  Plus,
  Minus,
  Locate,
  Compass,
  CheckCircle2,
  Wifi,
  WifiOff,
  Battery,
  AlertTriangle,
  TrendingDown,
  History,
  Megaphone,
  BookOpen,
  CheckSquare,
  Square,
  Phone,
  MessageCircle,
  Camera,
  Edit,
  Send,
  Upload,
  Check,
  X
} from 'lucide-react';

export const ActiveVisit: React.FC = () => {
  const navigate = useNavigate();
  const { visitId } = useParams<{ visitId: string }>();
  const [lang, setLang] = useState<'BN' | 'EN'>('BN');
  
  // Dual-state selector: 'guidance' (Live Visit Route) or 'logging' (Logging & Report)
  const [visitState, setVisitState] = useState<'guidance' | 'logging'>('guidance');

  // Network offline status
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  // Map zoom level: 0.8x, 1x, 1.25x, 1.5x, 1.75x
  const zoomLevels = [0.8, 1.0, 1.25, 1.5, 1.75];
  const [zoomIndex, setZoomIndex] = useState(1); // Default to 1.0x (index 1)

  // Timer counter
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  // Form states
  const [photoAdded, setPhotoAdded] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [orderAmount, setOrderAmount] = useState('');
  const [collectionAmount, setCollectionAmount] = useState('');
  const [dealerFeedback, setDealerFeedback] = useState('');
  const [competitorInfo, setCompetitorInfo] = useState('');
  const [followupDate, setFollowupDate] = useState('');
  const [complaintIssue, setComplaintIssue] = useState('');
  const [productInterest, setProductInterest] = useState('');
  const [showBlankConfirm, setShowBlankConfirm] = useState(false);

  // Objectives checklist
  const [objectives, setObjectives] = useState([
    { id: 'payment', textBn: 'বকেয়া কালেকশন সম্পন্ন করা', textEn: 'Payment follow-up audit', checked: false },
    { id: 'order', textBn: 'নতুন অর্ডারের তাগাদা ও বুকিং', textEn: 'New order booking check', checked: false },
    { id: 'stock', textBn: 'স্টক লেভেল অডিট ও ইনভেন্টরি চেক', textEn: 'Stock inventory check', checked: false },
    { id: 'photo', textBn: 'পণ্য ডিসপ্লে ছবি প্রমাণ সংগ্রহ', textEn: 'Collect shop layout photo proof', checked: false }
  ]);

  // Input refs for focus shortcuts
  const feedbackRef = useRef<HTMLTextAreaElement>(null);

  // Role Guard Redirect
  const role = getCurrentRole();
  useEffect(() => {
    if (role === 'manager' || role === 'admin') {
      navigate('/manager');
    } else if (!role) {
      navigate('/login');
    }
  }, [role, navigate]);

  // Fetch dynamic dealer info based on visitId
  const getDealerData = (id: string | undefined) => {
    const normalizedId = id || 'rahman-traders';
    
    if (normalizedId.includes('karim')) {
      return {
        id: 'karim-paint-house',
        name: 'Karim Paint House',
        nameBn: 'করিম পেইন্ট হাউস',
        location: 'মতিঝিল সি/এ, ঢাকা',
        locationShort: 'Motijheel, Dhaka',
        distance: '১.৫ কিমি',
        eta: '১০ মিনিট',
        start: '11:15 AM',
        etaTime: '11:25 AM',
        reasonsBn: [
          '৳৩০,০০০ বকেয়া',
          'Sales ১০% কমেছে',
          'শেষ ভিজিট ৫ দিন আগে',
          'পেমেন্ট শিডিউল করুন'
        ],
        reasonsEn: [
          '৳30,000 outstanding dues',
          'Sales dropped by 10%',
          'Last visit 5 days ago',
          'Finalize payment schedule'
        ],
        talkingPointsBn: [
          '"করিম ভাই, বকেয়া ৳৩০,০০০ কি এই সপ্তাহে ক্লিয়ার করা সম্ভব?"',
          '"গত মাসে সেলস ১০% ড্রপ হয়েছে, কোনো বিশেষ কারণ আছে কি?"',
          '"আমাদের নতুন ডিলার অফারটি চালু করলে সেলস আবার বাড়তে পারে।"'
        ],
        talkingPointsEn: [
          '"Brother Karim, is it possible to clear the ৳30,000 overdue this week?"',
          '"Sales dropped by 10% last month, is there any specific market issue?"',
          '"Launching our new dealer scheme could push your sales up again."'
        ],
        gpsStatus: 'GPS Active',
        gpsAccuracy: 'High GPS'
      };
    }
    
    if (normalizedId.includes('mirpur')) {
      return {
        id: 'mirpur-paint-market',
        name: 'Mirpur Paint Market',
        nameBn: 'মিরপুর পেইন্ট মার্কেট',
        location: 'মিরপুর ১২, ঢাকা',
        locationShort: 'Mirpur 12, Dhaka',
        distance: '১.২ কিমি',
        eta: '৭ মিনিট',
        start: '02:30 PM',
        etaTime: '02:37 PM',
        reasonsBn: [
          'বকেয়া নেই (৳০)',
          'সেলস স্বাভাবিক',
          'শেষ ভিজিট ২ দিন আগে',
          'নতুন প্রমোশন দিন'
        ],
        reasonsEn: [
          'No outstanding dues (৳0)',
          'Sales are steady',
          'Last visit 2 days ago',
          'Pitch new promotions'
        ],
        talkingPointsBn: [
          '"মিরপুর পেইন্টস-এর স্টক লেভেল কেমন আছে, ভাই?"',
          '"পণ্য ডেলিভারি নিয়ে কোনো অভিযোগ বা ফিডব্যাক আছে?"',
          '"নতুন ডিসপ্লে স্কিমে অংশ নিলে অতিরিক্ত ৫% কমিশন পাবেন।"'
        ],
        talkingPointsEn: [
          '"How are the inventory levels of Mirpur Paint Market, brother?"',
          '"Do you have any feedback or complaints regarding product delivery?"',
          '"Participating in the new display scheme guarantees an extra 5% margin."'
        ],
        gpsStatus: 'GPS Active',
        gpsAccuracy: 'High GPS'
      };
    }

    if (normalizedId.includes('new-era')) {
      return {
        id: 'new-era-paints',
        name: 'New Era Paints',
        nameBn: 'নিউ এরা পেইন্টস',
        location: 'রামপুরা, ঢাকা',
        locationShort: 'Rampura, Dhaka',
        distance: '০.৪ কিমি',
        eta: '৩ মিনিট',
        start: '09:15 AM',
        etaTime: '09:18 AM',
        reasonsBn: [
          'নতুন আউটলেট',
          '৳০ বকেয়া',
          'কখনো ভিজিট করা হয়নি',
          'প্রথম অর্ডার বুক করুন'
        ],
        reasonsEn: [
          'New prospect outlet',
          '৳0 outstanding dues',
          'Never visited before',
          'Book initial sales order'
        ],
        talkingPointsBn: [
          '"আমাদের সম্পূর্ণ ওয়াটারপ্রুফ রেঞ্জটি দেখতে পারেন।"',
          '"প্রথম অর্ডারে আমরা ফ্রি ডেলিভারি ও ১০% স্পেশাল ছাড় দিচ্ছি।"',
          '"আপনার এরিয়াতে আমাদের ব্র্যান্ডের ভালো ডিমান্ড তৈরি হচ্ছে।"'
        ],
        talkingPointsEn: [
          '"You can view our complete premium waterproof paints range."',
          '"We are offering free delivery and 10% special discount on first orders."',
          '"Our brand is currently generating strong consumer demand in Badda/Rampura."'
        ],
        gpsStatus: 'GPS Active',
        gpsAccuracy: 'High GPS'
      };
    }

    if (normalizedId.includes('badda')) {
      return {
        id: 'badda-hardware',
        name: 'Badda Hardware',
        nameBn: 'বাড্ডা হার্ডওয়্যার',
        location: 'বাড্ডা লিংক রোড, ঢাকা',
        locationShort: 'Badda, Dhaka',
        distance: '১.৮ কিমি',
        eta: '১২ মিনিট',
        start: '04:00 PM',
        etaTime: '04:12 PM',
        reasonsBn: [
          'উচ্চ সম্ভাবনা ডিলার',
          '৳০ বকেয়া',
          'শেষ ভিজিট ৭ দিন আগে',
          'ব্র্যান্ডিং সাইনেজ অফার'
        ],
        reasonsEn: [
          'High potential dealer',
          '৳0 outstanding dues',
          'Last visit 7 days ago',
          'Pitch branding signage setup'
        ],
        talkingPointsBn: [
          '"আমাদের সাথে এক্সক্লুসিভ ডিলার পার্টনারশিপে কী সুবিধা পাবেন তা বলি।"',
          '"ব্র্যান্ডিং সাইনেজ আমরা বিনামূল্যে সেটআপ করে দেবো।"',
          '"মার্কেটে প্রতিযোগীদের তুলনায় আমাদের ডিস্ট্রিবিউশন মার্জিন বেশি।"'
        ],
        talkingPointsEn: [
          '"Let me share the benefits of an exclusive dealership partnership with us."',
          '"We can setup external shop branding and signboards free of cost."',
          '"Our dealer distribution margins are higher than competitor averages."'
        ],
        gpsStatus: 'GPS Active',
        gpsAccuracy: 'High GPS'
      };
    }

    // Default: Rahman Traders
    return {
      id: 'rahman-traders',
      name: 'Rahman Traders',
      nameBn: 'রহমান ট্রেডার্স',
      location: 'মিরপুর ১০, ঢাকা',
      locationShort: 'Mirpur 10, Dhaka',
      distance: '১.২ কিমি',
      eta: '৮ মিনিট',
      start: '10:45 AM',
      etaTime: '10:53 AM',
      reasonsBn: [
        '৳৮৫,০০০ বকেয়া',
        'Sales ৪০% কমেছে',
        'শেষ ভিজিট ১২ দিন আগে',
        'Exterior Paint push করুন'
      ],
      reasonsEn: [
        '৳85,000 overdue dues',
        'Sales dropped by 40%',
        'Last visit 12 days ago',
        'Push new Exterior Paint stock'
      ],
      talkingPointsBn: [
        '"রহমান ভাই, গত মাসে বিক্রি একটু কম ছিল, কী সমস্যা হচ্ছে?"',
        '"বকেয়া ৳৮৫,০০০ কবে ক্লিয়ার করতে পারবেন?"',
        '"নতুন এক্সটেরিয়র পেইন্ট স্টক করছেন না কেন? ডিমান্ড তো ভালো।"'
      ],
      talkingPointsEn: [
        '"Brother Rahman, sales were low last month, are you facing any issues?"',
        '"When can you clear the outstanding overdue of ৳85,000?"',
        '"Why aren\'t you stocking the new exterior paint range? Demand is high."'
      ],
      gpsStatus: 'GPS Active',
      gpsAccuracy: 'High GPS'
    };
  };

  const dealer = getDealerData(visitId);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToastMessage(lang === 'BN' ? 'ইন্টারনেট সংযোগ ফিরে এসেছে!' : 'Internet connection restored!');
    };
    const handleOffline = () => {
      setIsOnline(false);
      showToastMessage(lang === 'BN' ? 'ইন্টারনেট সংযোগ বিচ্ছিন্ন! অফলাইন মোড সক্রিয়।' : 'Internet connection lost! Offline mode active.');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Stopwatch timer increment
    const timer = setInterval(() => {
      setElapsedMinutes(prev => prev + 1);
    }, 60000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(timer);
    };
  }, [lang]);

  const showToastMessage = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2500);
  };

  // Guidance Map Zoom Controls
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

  const handleResetMap = () => {
    setZoomIndex(1); // Reset to 1.0x
    showToastMessage(lang === 'BN' ? 'ম্যাপ পজিশন রিসেট করা হয়েছে' : 'Map position reset');
  };

  const handleOpenGoogleMaps = () => {
    showToastMessage(
      lang === 'BN' 
        ? 'গুগল ম্যাপস নেভিগেশন চালু করা হচ্ছে... (সিমুলেটেড)' 
        : 'Launching Google Maps navigation route... (Simulated)'
    );
  };

  // Toggle Objectives Checklist
  const handleToggleObjective = (id: string) => {
    setObjectives(prev => 
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  // Quick Action triggers
  const handleQuickAction = (actionType: string) => {
    if (actionType === 'call') {
      showToastMessage(
        lang === 'BN' 
          ? `${dealer.nameBn}-এর নাম্বারে কল করা হচ্ছে... (সিমুলেটেড)` 
          : `Dialing contact number for ${dealer.name}... (Simulated)`
      );
    } else if (actionType === 'whatsapp') {
      showToastMessage(
        lang === 'BN' 
          ? `হোয়াটসঅ্যাপ চ্যাট চালু করা হচ্ছে... (সিমুলেটেড)` 
          : `Initiating WhatsApp message thread... (Simulated)`
      );
    } else if (actionType === 'photo') {
      if (visitState === 'logging') {
        handlePhotoUploadSimulation();
      } else {
        showToastMessage(
          lang === 'BN' 
            ? 'ছবি আপলোড করতে প্রথমে নিচে "দোকানে পৌঁছেছি" ট্যাপ করুন।' 
            : 'To capture photos, confirm "Reached Store" first.'
        );
      }
    } else if (actionType === 'note') {
      if (visitState === 'logging') {
        feedbackRef.current?.focus();
        showToastMessage(lang === 'BN' ? 'ফিডব্যাক বক্সে লিখুন।' : 'Write in dealer feedback.');
      } else {
        showToastMessage(
          lang === 'BN' 
            ? 'নোট লিখতে প্রথমে নিচে "দোকানে পৌঁছেছি" ট্যাপ করুন।' 
            : 'To log notes, confirm "Reached Store" first.'
        );
      }
    } else if (actionType === 'manager') {
      showToastMessage(
        lang === 'BN' 
          ? 'ম্যানেজারকে আপনার রুট পজিশন ও অ্যাক্টিভিটি রিপোর্ট পাঠানো হয়েছে!' 
          : 'Live status notification pushed to territory manager queue!'
      );
    }
  };

  // Guidance -> Logging Transition
  const handleConfirmArrival = () => {
    setVisitState('logging');
    showToastMessage(
      lang === 'BN' 
        ? 'জিপিএস ভেরিফাইড! দোকানে আগমন সফলভাবে লক করা হয়েছে।' 
        : 'GPS Verified! Reached destination successfully locked.'
    );
  };

  // Photo Upload Simulation
  const handlePhotoUploadSimulation = () => {
    setPhotoAdded(true);
    setPhotoUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuCRmEaIiCZOi1aA0v4JBRYf0kkLdbVTIZKMgiZhQZ4FGW4xnkLDQFdeiiRDZaT7tx8zPJuHh7HJf1Zojt-CPH7PTeuavUwLZgEvGO-kMf4tLAynVdVcwUV3Pqij0WrvQ5Z30v5lZ9OCZw3sLX5DL2pedzhwKiQTVGviwL89E8rxNuZ4QtQfjpwTj03ceXF2U2TzYjT7czTokzlfhrXgChGQc6f66hmFP-MvQey0q1Zbejrvtl1cjhQPS05NPICb6RuZHACw_qpJ-A');
    showToastMessage(lang === 'BN' ? 'ভিজিট প্রমাণ ছবি সফলভাবে যুক্ত হয়েছে!' : 'Visit photo proof successfully attached!');
  };

  const handleCancelPhoto = () => {
    setPhotoAdded(false);
    setPhotoUrl(null);
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'BN' ? 'EN' : 'BN'));
  };

  // Submit Visit report
  const completeVisit = async (completedWithoutData: boolean) => {
    const missingFields: string[] = [];
    const filledFields: string[] = [];

    const orderEntered = orderAmount.trim() !== '';
    const collectionEntered = collectionAmount.trim() !== '';
    const feedbackEntered = dealerFeedback.trim() !== '';
    const competitorEntered = competitorInfo.trim() !== '';
    const followupEntered = followupDate.trim() !== '';
    const complaintEntered = complaintIssue.trim() !== '';
    const productEntered = productInterest.trim() !== '';

    if (orderEntered) filledFields.push('orderAmount'); else missingFields.push('orderAmount');
    if (collectionEntered) filledFields.push('collectionAmount'); else missingFields.push('collectionAmount');
    if (feedbackEntered) filledFields.push('notes'); else missingFields.push('notes');
    if (competitorEntered) filledFields.push('competitorUpdate'); else missingFields.push('competitorUpdate');
    if (followupEntered) filledFields.push('followupDate'); else missingFields.push('followupDate');
    if (complaintEntered) filledFields.push('complaintIssue'); else missingFields.push('complaintIssue');
    if (productEntered) filledFields.push('productInterest'); else missingFields.push('productInterest');
    if (photoAdded) filledFields.push('proofPhotos'); else missingFields.push('proofPhotos');

    const payload = {
      visitId: visitId || 'rahman-traders',
      dealerId: dealer.id,
      completedAt: new Date().toISOString(),
      completedWithoutData,
      filledFields,
      missingFields,
      note: completedWithoutData
        ? "Sales officer completed visit without entering order, collection, note, or proof photo."
        : `Visit logged. Order: ৳${orderAmount || '0'}, Collection: ৳${collectionAmount || '0'}`,
      data: {
        orderAmount,
        collectionAmount,
        followupDate,
        competitorUpdate: competitorInfo,
        complaintIssue,
        productInterest,
        notes: dealerFeedback,
        photosCount: photoAdded ? 1 : 0
      }
    };

    // TODO: Replace demo local queue with real authenticated Supabase/API sync.
    // Always save to localStorage draft/queue for demo purposes
    console.log('Demo Mode: Saving visit report to local offline queue...', payload);
    saveVisitCompletion(payload);

    const isSyncEnabled = import.meta.env.VITE_ENABLE_SUPABASE_VISIT_SYNC === 'true';
    let apiSuccess = false;
    let errorMessage = '';

    if (isOnline && isSyncEnabled && supabase) {
      try {
        console.log('API sync is enabled. Attempting Supabase database insert...');
        
        // 1. Resolve Dealer UUID from code
        let dbDealerId = null;
        const { data: dbDealer } = await supabase
          .from('dealers')
          .select('id')
          .eq('code', dealer.id)
          .single();
        
        if (dbDealer) {
          dbDealerId = dbDealer.id;
        } else {
          // If no matching dealer is found, try to fetch the first dealer in the database
          const { data: allDealers } = await supabase.from('dealers').select('id').limit(1);
          if (allDealers && allDealers.length > 0) {
            dbDealerId = allDealers[0].id;
          }
        }

        // TODO: Attach current officer ID from real auth session.
        // 2. Resolve User ID from Supabase Auth
        const { data: authData } = await supabase.auth.getUser();
        let officerId = authData.user?.id;

        if (!officerId) {
          // Fallback: If not logged in via Supabase auth, query the first user with role sales_officer
          const { data: dbUsers } = await supabase
            .from('users')
            .select('id')
            .eq('role', 'sales_officer')
            .limit(1);
          if (dbUsers && dbUsers.length > 0) {
            officerId = dbUsers[0].id;
          }
        }

        // TODO: Upload photo proof to storage bucket.
        // Currently using mock image URL for demonstration.

        if (officerId && dbDealerId) {
          // 3. Insert into officer_visits
          const { error: visitErr } = await supabase
            .from('officer_visits')
            .insert({
              officer_id: officerId,
              dealer_id: dbDealerId,
              check_in_ts: new Date(Date.now() - elapsedMinutes * 60000).toISOString(),
              check_out_ts: new Date().toISOString(),
              visit_source: 'manual',
              proof_photo_url: photoUrl
            });

          // 4. Insert into activity_reports
          const { error: reportErr } = await supabase
            .from('activity_reports')
            .insert({
              officer_id: officerId,
              dealer_id: dbDealerId,
              date: new Date().toISOString().split('T')[0],
              notes: dealerFeedback || null,
              competitor_info: competitorInfo || null,
              issue_flag: complaintIssue.trim() !== ''
            });

          if (!visitErr && !reportErr) {
            apiSuccess = true;
          } else {
            errorMessage = (visitErr?.message || '') + ' ' + (reportErr?.message || '');
            console.error('Supabase insert errors:', { visitErr, reportErr });
          }
        } else {
          errorMessage = 'Could not resolve officerId or dbDealerId from database.';
          console.warn(errorMessage);
        }
      } catch (err: any) {
        errorMessage = err?.message || 'Unknown network error';
        console.error('Failed to submit to Supabase:', err);
      }
    }

    if (apiSuccess) {
      alert(lang === 'BN' ? 'ভিজিট রিপোর্ট সফলভাবে সরাসরি ডাটাবেজে সংরক্ষিত হয়েছে!' : 'Visit report successfully synced and saved directly to database!');
    } else {
      // Show local queue success message for demo fallback or disabled flag
      if (!isOnline) {
        alert(
          lang === 'BN' 
            ? 'ইন্টারনেট সংযোগ নেই! রিপোর্ট অফলাইন ড্রাফটে সেভ করা হয়েছে।' 
            : 'No internet connection! Report successfully saved to offline drafts.'
        );
      } else if (isSyncEnabled && supabase) {
        // Sync enabled but failed
        alert(
          lang === 'BN' 
            ? `সিঙ্ক ব্যর্থ হয়েছে: ${errorMessage || 'ডেটাবেজ টেবিল সংগতি মেলেনি'}। ডেমো মোডে স্থানীয়ভাবে সেভ করা হয়েছে।` 
            : `Sync failed: ${errorMessage || 'DB Schema mismatch'}. Saved locally in demo mode.`
        );
      } else {
        // Default Demo Mode popup
        alert(
          lang === 'BN' 
            ? 'ডেমো মোড: ভিজিট স্থানীয়ভাবে সংরক্ষিত হয়েছে এবং সিঙ্ক লাইনে রাখা হয়েছে।' 
            : 'Demo mode: visit saved locally and sync queued.'
        );
      }
    }

    navigate('/today');
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();

    const isFormBlank = 
      orderAmount.trim() === '' &&
      collectionAmount.trim() === '' &&
      followupDate.trim() === '' &&
      competitorInfo.trim() === '' &&
      complaintIssue.trim() === '' &&
      productInterest.trim() === '' &&
      dealerFeedback.trim() === '' &&
      !photoAdded;

    if (isFormBlank) {
      setShowBlankConfirm(true);
    } else {
      completeVisit(false);
    }
  };

  const currentZoom = zoomLevels[zoomIndex];

  return (
    <PhoneFrame>
      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-[#ba1a1a] text-white py-1 px-4 text-center text-[10px] font-bold z-50 flex items-center justify-center gap-1.5 shadow-sm animate-pulse shrink-0">
          <WifiOff size={12} />
          <span>{lang === 'BN' ? 'ইন্টারনেট সংযোগ বিচ্ছিন্ন! অফলাইন মোড চালু।' : 'No Internet Connection! Offline mode active.'}</span>
        </div>
      )}

      {visitState === 'guidance' ? (
        /* Screen 1: Live Visit Route & Guidance */
        <>
          {/* Header */}
          <header className="bg-[#0e1c2f] flex items-center justify-between px-4 w-full h-16 shrink-0 shadow-sm z-50 text-white">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate(-1)}
                className="text-white hover:opacity-85 active:scale-95 p-1.5 rounded-full"
                aria-label="Go back"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-xs font-bold">{lang === 'BN' ? 'লাইভ ভিজিট' : 'Live Visit'}</h1>
                <span className="text-[9px] font-semibold text-[#9df4c8] flex items-center gap-0.5 mt-0.5">
                  <Locate size={9} className="fill-current text-[#9df4c8] animate-pulse" />
                  GPS Active
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleLanguage}
                className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10"
              >
                {lang === 'BN' ? 'বাং | EN' : 'EN | বাং'}
              </button>
              <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRmEaIiCZOi1aA0v4JBRYf0kkLdbVTIZKMgiZhQZ4FGW4xnkLDQFdeiiRDZaT7tx8zPJuHh7HJf1Zojt-CPH7PTeuavUwLZgEvGO-kMf4tLAynVdVcwUV3Pqij0WrvQ5Z30v5lZ9OCZw3sLX5DL2pedzhwKiQTVGviwL89E8rxNuZ4QtQfjpwTj03ceXF2U2TzYjT7czTokzlfhrXgChGQc6f66hmFP-MvQey0q1Zbejrvtl1cjhQPS05NPICb6RuZHACw_qpJ-A"
                />
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <main className="flex-grow overflow-y-auto px-4 pb-24 mt-3 space-y-5 scrollbar-hide">
            {/* Dealer Context */}
            <section className="bg-white rounded-2xl p-4 border border-[#e5eeff]/50 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-sm font-bold text-[#0b1c30]">{lang === 'BN' ? dealer.nameBn : dealer.name}</h2>
                  <p className="text-[10px] text-[#75777d] mt-1 flex items-center gap-0.5">
                    <Locate size={12} className="text-[#75777d]" />
                    {lang === 'BN' ? dealer.location : dealer.locationShort}
                  </p>
                </div>
                <div className="bg-[#eff4ff] flex items-center justify-center w-9 h-9 rounded-full shrink-0">
                  <Store size={16} className="text-[#0e1c2f]" />
                </div>
              </div>
            </section>

            {/* Custom SVG Route Map */}
            <section className="relative rounded-2xl overflow-hidden h-[240px] shadow-md border border-[#c5c6cd]/30 bg-[#eff4ff]">
              
              {/* Scalable map content */}
              <div 
                className="absolute inset-0 transition-transform duration-500 ease-out origin-center"
                style={{ transform: `scale(${currentZoom})` }}
              >
                <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Grids */}
                  <rect width="100%" height="100%" fill="#f4f7fc" />
                  
                  {/* Road layouts */}
                  <path d="M 50,150 L 350,150" stroke="#ffffff" strokeWidth="24" strokeLinecap="round" />
                  <path d="M 200,50 L 200,250" stroke="#ffffff" strokeWidth="24" strokeLinecap="round" />
                  <path d="M 50,70 L 350,230" stroke="#ffffff" strokeWidth="20" strokeLinecap="round" />
                  
                  {/* Road divider lanes */}
                  <path d="M 50,150 L 350,150" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5,5" />
                  <path d="M 200,50 L 200,250" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5,5" />

                  {/* Road labels */}
                  <text x="60" y="132" fontSize="9" fontWeight="bold" fill="#75777d">Main Road</text>
                  <text x="210" y="85" fontSize="9" fontWeight="bold" fill="#75777d">Mirpur 10 Lane</text>
                  <text x="245" y="195" fontSize="8" fontWeight="semibold" fill="#75777d" transform="rotate(22, 245, 195)">Dealer Point Link</text>

                  {/* Navigation Route Line (Blue) */}
                  <path 
                    d="M 90,120 L 200,150 L 310,210" 
                    fill="none" 
                    stroke="#1976D2" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    opacity="0.25" 
                    className="animate-pulse"
                  />
                  <path 
                    d="M 90,120 L 200,150 L 310,210" 
                    fill="none" 
                    stroke="#1976D2" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />

                  {/* User Pin */}
                  <circle cx="90" cy="120" r="12" fill="#1976D2" fillOpacity="0.2" className="animate-ping" />
                  <circle cx="90" cy="120" r="5" fill="#1976D2" stroke="#ffffff" strokeWidth="1.8" />
                  <text x="52" y="105" fontSize="8" fontWeight="bold" fill="#0b1c30">You (আপনি)</text>

                  {/* Destination Pin */}
                  <g transform="translate(310,210)">
                    <circle cx="0" cy="0" r="14" fill="#0c714d" fillOpacity="0.2" className="animate-pulse" />
                    <circle cx="0" cy="-3" r="5.5" fill="#0c714d" stroke="#ffffff" strokeWidth="1.5" />
                    <path d="M -5.5,-2 L 0,7 L 5.5,-2 Z" fill="#0c714d" />
                  </g>
                  <text x="260" y="235" fontSize="8" fontWeight="bold" fill="#0c714d">
                    {lang === 'BN' ? dealer.nameBn.split(' ')[0] : dealer.name.split(' ')[0]}
                  </text>
                </svg>
              </div>

              {/* ETA overlays */}
              <div className="absolute inset-x-0 top-0 p-3 flex justify-between items-start pointer-events-none">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2.5 shadow border border-[#c5c6cd]/30 flex items-center gap-3 pointer-events-auto">
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] text-[#75777d] uppercase font-bold">ETA</span>
                    <span className="text-xs font-extrabold text-[#0e1c2f]">{lang === 'BN' ? dealer.eta : '8 mins'}</span>
                  </div>
                  <div className="h-6 w-px bg-[#c5c6cd]/55"></div>
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] text-[#75777d] uppercase font-bold">Distance</span>
                    <span className="text-[10px] font-semibold text-[#0e1c2f]">{lang === 'BN' ? dealer.distance : '1.2 km'}</span>
                  </div>
                </div>
                
                <div className="bg-[#9af2c5] text-[#0c714d] border border-[#006c49]/15 rounded-full px-2.5 py-1 text-[9px] font-bold flex items-center gap-0.5">
                  <CheckCircle2 size={11} className="fill-current text-[#0c714d]" />
                  <span>{lang === 'BN' ? 'রুট পরিষ্কার' : 'Route Clear'}</span>
                </div>
              </div>

              {/* Map Floating Controls */}
              <div className="absolute right-2 bottom-2 flex flex-col gap-1.5">
                <div className="bg-white rounded-lg shadow border border-[#c5c6cd]/30 flex flex-col overflow-hidden">
                  <button 
                    onClick={handleZoomIn}
                    className="p-2 hover:bg-[#eff4ff] active:scale-90 transition-all text-[#0b1c30] outline-none"
                    aria-label="Zoom in"
                  >
                    <Plus size={15} />
                  </button>
                  <button 
                    onClick={handleZoomOut}
                    className="p-2 hover:bg-[#eff4ff] border-t border-[#c5c6cd]/30 active:scale-90 transition-all text-[#0b1c30] outline-none"
                    aria-label="Zoom out"
                  >
                    <Minus size={15} />
                  </button>
                </div>
                <button 
                  onClick={handleResetMap}
                  className="bg-white rounded-lg shadow border border-[#c5c6cd]/30 p-2 hover:bg-[#eff4ff] active:scale-90 transition-all text-[#0b1c30] outline-none"
                  aria-label="Reset position"
                >
                  <Compass size={15} />
                </button>
              </div>

              <div className="absolute left-2 bottom-2">
                <button 
                  onClick={handleOpenGoogleMaps}
                  className="bg-[#0b1c30] text-white rounded-full px-3 py-1.5 text-[10px] font-bold flex items-center gap-1 shadow hover:opacity-90 active:scale-95 transition-all outline-none"
                >
                  <Navigation size={12} className="fill-current text-white" />
                  <span>{lang === 'BN' ? 'Google Maps খুলুন' : 'Open Google Maps'}</span>
                </button>
              </div>
            </section>

            {/* Current Visit Stats */}
            <section className="bg-white rounded-2xl p-4 border border-[#e5eeff]/50 shadow-sm flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="bg-[#eff4ff] text-[#0b1c30] p-2 rounded-full flex items-center justify-center shrink-0">
                  <BookOpen size={16} />
                </div>
                <div>
                  <h3 className="text-[10px] text-[#75777d] uppercase font-bold">{lang === 'BN' ? 'বর্তমান ভিজিট সময়সূচী' : 'Current Visit Schedule'}</h3>
                  <p className="text-xs font-bold text-[#0b1c30] mt-0.5">
                    Start: {dealer.start} • ETA: {dealer.etaTime}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-bold text-[#0c714d] bg-[#9af2c5]/25 px-2 py-0.5 rounded-full flex items-center gap-0.5 justify-end">
                  <Wifi size={10} />
                  {dealer.gpsAccuracy}
                </span>
                <span className="text-[8px] text-[#75777d] mt-1 block font-semibold flex items-center gap-0.5 justify-end">
                  <Battery size={10} className="text-[#0c714d]" />
                  Smart GPS
                </span>
              </div>
            </section>

            {/* Why Visit Urgent (Bento Grid) */}
            <section className="space-y-2.5">
              <h3 className="text-xs font-bold text-[#0b1c30] px-1 uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle size={14} className="text-[#ba1a1a]" />
                <span>{lang === 'BN' ? 'কেন এই ভিজিট জরুরি?' : 'Why Visit First?'}</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-3 text-left">
                {dealer.reasonsBn.map((reason, index) => {
                  const isFirst = index === 0;
                  return (
                    <div 
                      key={index}
                      className={`rounded-xl p-3 border flex flex-col justify-between h-20 ${
                        isFirst 
                          ? 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/20 font-bold' 
                          : 'bg-white text-[#44474c] border-[#e5eeff]/60 shadow-sm font-semibold'
                      }`}
                    >
                      {isFirst ? (
                        <AlertTriangle size={15} className="text-[#ba1a1a]" />
                      ) : index === 1 ? (
                        <TrendingDown size={15} className="text-[#44474c]" />
                      ) : index === 2 ? (
                        <History size={15} className="text-[#44474c]" />
                      ) : (
                        <Megaphone size={15} className="text-[#44474c]" />
                      )}
                      <span className="text-[10px] leading-tight mt-2">
                        {lang === 'BN' ? reason : dealer.reasonsEn[index]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Talking Points script */}
            <section className="bg-[#0e1c2f] text-white rounded-2xl p-4 relative overflow-hidden border border-white/5 text-left">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#9df4c8]/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-[#9df4c8] mb-3">
                <MessageCircle size={14} className="text-[#9df4c8]" />
                <span>{lang === 'BN' ? 'ডিলারের সাথে কী বলবেন' : 'How to speak (Talking points)'}</span>
              </h3>
              
              <ul className="space-y-3 text-xs leading-relaxed text-[#c5c6cd]">
                {(lang === 'BN' ? dealer.talkingPointsBn : dealer.talkingPointsEn).map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check size={14} className="text-[#9df4c8] shrink-0 mt-0.5 font-bold" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Task Checklist */}
            <section className="space-y-2.5">
              <h3 className="text-xs font-bold text-[#0b1c30] px-1 uppercase tracking-wider flex items-center gap-1">
                <CheckSquare size={14} className="text-[#0e1c2f]" />
                <span>{lang === 'BN' ? 'ভিজিটে কী করবেন' : 'Visit Checklist Tasks'}</span>
              </h3>
              
              <div className="bg-white rounded-2xl border border-[#e5eeff]/50 shadow-sm overflow-hidden divide-y divide-[#eff4ff]">
                {objectives.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleToggleObjective(item.id)}
                    className="w-full flex items-center p-3.5 gap-3 hover:bg-[#f8f9ff]/50 transition-colors text-left outline-none"
                  >
                    {item.checked ? (
                      <CheckSquare size={18} className="text-[#006c49] shrink-0" />
                    ) : (
                      <Square size={18} className="text-[#75777d] shrink-0" />
                    )}
                    <span className={`text-xs ${item.checked ? 'line-through text-[#75777d]' : 'text-[#0b1c30] font-semibold'}`}>
                      {lang === 'BN' ? item.textBn : item.textEn}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Quick Actions Scroll bar */}
            <section className="space-y-2">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
                <button
                  onClick={() => handleQuickAction('call')}
                  className="bg-white border border-[#c5c6cd]/30 rounded-xl p-3 flex flex-col items-center justify-center min-w-[80px] gap-1.5 shadow-sm hover:bg-[#eff4ff]/30 active:scale-95 transition-all outline-none"
                >
                  <div className="bg-[#eff4ff] p-2 rounded-full text-[#0b1c30] shrink-0">
                    <Phone size={14} />
                  </div>
                  <span className="text-[10px] font-bold text-[#0b1c30]">{lang === 'BN' ? 'কল করুন' : 'Call'}</span>
                </button>
                <button
                  onClick={() => handleQuickAction('whatsapp')}
                  className="bg-white border border-[#c5c6cd]/30 rounded-xl p-3 flex flex-col items-center justify-center min-w-[80px] gap-1.5 shadow-sm hover:bg-[#eff4ff]/30 active:scale-95 transition-all outline-none"
                >
                  <div className="bg-[#eff4ff] p-2 rounded-full text-[#0c714d] shrink-0">
                    <MessageCircle size={14} />
                  </div>
                  <span className="text-[10px] font-bold text-[#0b1c30]">WhatsApp</span>
                </button>
                <button
                  onClick={() => handleQuickAction('photo')}
                  className="bg-white border border-[#c5c6cd]/30 rounded-xl p-3 flex flex-col items-center justify-center min-w-[80px] gap-1.5 shadow-sm hover:bg-[#eff4ff]/30 active:scale-95 transition-all outline-none"
                >
                  <div className="bg-[#eff4ff] p-2 rounded-full text-[#0b1c30] shrink-0">
                    <Camera size={14} />
                  </div>
                  <span className="text-[10px] font-bold text-[#0b1c30]">{lang === 'BN' ? 'ছবি তুলুন' : 'Camera'}</span>
                </button>
                <button
                  onClick={() => handleQuickAction('note')}
                  className="bg-white border border-[#c5c6cd]/30 rounded-xl p-3 flex flex-col items-center justify-center min-w-[80px] gap-1.5 shadow-sm hover:bg-[#eff4ff]/30 active:scale-95 transition-all outline-none"
                >
                  <div className="bg-[#eff4ff] p-2 rounded-full text-[#0b1c30] shrink-0">
                    <Edit size={14} />
                  </div>
                  <span className="text-[10px] font-bold text-[#0b1c30]">{lang === 'BN' ? 'নোট লিখুন' : 'Notes'}</span>
                </button>
                <button
                  onClick={() => handleQuickAction('manager')}
                  className="bg-white border border-[#c5c6cd]/30 rounded-xl p-3 flex flex-col items-center justify-center min-w-[80px] gap-1.5 shadow-sm hover:bg-[#eff4ff]/30 active:scale-95 transition-all outline-none"
                >
                  <div className="bg-[#eff4ff] p-2 rounded-full text-[#ba1a1a] shrink-0">
                    <AlertTriangle size={14} />
                  </div>
                  <span className="text-[10px] font-bold text-[#0b1c30]">{lang === 'BN' ? 'ম্যানেজার' : 'Manager'}</span>
                </button>
              </div>
            </section>
          </main>

          {/* Sticky Bottom Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#c5c6cd]/25 p-4 shadow-[0px_-4px_25px_rgba(0,0,0,0.06)] flex gap-3">
            <button 
              onClick={() => navigate(`/visit-prep/${dealer.id}`)}
              className="flex-1 bg-white border border-[#c5c6cd] text-[#44474c] rounded-full py-3 px-4 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#eff4ff] active:scale-95 transition-all outline-none"
            >
              <X size={15} />
              <span>{lang === 'BN' ? 'ভিজিট বাতিল' : 'Cancel Visit'}</span>
            </button>
            <button 
              onClick={handleConfirmArrival}
              className="flex-[2] bg-[#006c49] hover:bg-[#0c714d] text-white rounded-full py-3 px-4 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow shadow-[#006c49]/10 outline-none"
            >
              <CheckCircle2 size={15} />
              <span>{lang === 'BN' ? 'দোকানে পৌঁছেছি' : 'Reached Outlet'}</span>
            </button>
          </div>
        </>
      ) : (
        /* Screen 2: Visit Logging & Report */
        <>
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-[#c5c6cd]/30 sticky top-0 z-50 flex items-center justify-between px-4 w-full h-16 shrink-0 text-[#0b1c30]">
            <button 
              onClick={() => setVisitState('guidance')}
              className="flex items-center text-[#0b1c30] hover:opacity-80 transition-opacity active:scale-95 p-1.5 rounded-full"
              aria-label="Back to route guidance"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="text-xs font-extrabold tracking-wide uppercase">{lang === 'BN' ? 'সেলসবন্ধু AI' : 'SalesBondhu AI'}</div>
            <button 
              onClick={toggleLanguage}
              className="text-[#0b1c30] text-[10px] font-bold bg-[#eff4ff] px-3 py-1.5 rounded-full border border-[#c5c6cd]/30 hover:bg-[#dce9ff] transition-colors outline-none"
            >
              {lang === 'BN' ? 'বাং | EN' : 'EN | বাং'}
            </button>
          </header>

          {/* Form Content */}
          <main className="flex-grow overflow-y-auto px-4 pb-28 pt-4 space-y-6 text-left scrollbar-hide">
            
            {/* Top Bento Summary Card */}
            <section className="bg-white rounded-2xl shadow-sm border border-[#e5eeff]/60 p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#9af2c5]/15 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h1 className="text-sm font-bold text-[#0b1c30]">
                    {lang === 'BN' ? dealer.nameBn : dealer.name}
                  </h1>
                  <p className="text-[10px] text-[#75777d] mt-0.5 flex items-center gap-0.5">
                    <Locate size={11} className="text-[#75777d]" />
                    {lang === 'BN' ? dealer.location : dealer.locationShort}
                  </p>
                </div>
                <span className="bg-[#9af2c5] text-[#0c714d] border border-[#006c49]/10 px-2.5 py-0.5 rounded-lg text-[9px] font-bold flex items-center gap-0.5">
                  <Check size={10} className="stroke-[3px]" />
                  GPS verified
                </span>
              </div>

              {/* Status block */}
              <div className="mt-4 bg-[#f8f9ff] rounded-xl p-3 flex items-center gap-2 border border-[#c5c6cd]/20">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <div className="absolute w-full h-full bg-[#006c49] opacity-25 rounded-full animate-ping"></div>
                  <div className="w-2 h-2 rounded-full bg-[#006c49] relative z-10"></div>
                </div>
                <span className="text-[10px] font-bold text-[#0c714d]">
                  {lang === 'BN' ? `দোকানে পৌঁছেছেন (${elapsedMinutes} মি.)` : `At Outlet (${elapsedMinutes} Mins)`}
                </span>
              </div>
            </section>

            <form onSubmit={handleSubmitReport} className="space-y-5">
              
              {/* Photo Upload Box */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#44474c] uppercase tracking-wide flex items-center gap-1.5">
                  <Camera size={14} className="text-[#75777d]" />
                  <span>{lang === 'BN' ? 'ভিজিট প্রমাণ ফটো (বাধ্যতামূলক)' : 'Photo Proof (Mandatory)'}</span>
                </label>
                
                {photoAdded && photoUrl ? (
                  <div className="relative rounded-2xl overflow-hidden border border-[#006c49]/35 bg-white p-3.5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#eff4ff] overflow-hidden border border-[#c5c6cd]/30 shrink-0">
                        <img src={photoUrl} alt="Visit Proof" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-[#0c714d] flex items-center gap-1">
                          <CheckCircle2 size={13} className="fill-current text-[#0c714d]" />
                          {lang === 'BN' ? 'ছবি যুক্ত হয়েছে' : 'Photo proof attached'}
                        </span>
                        <span className="text-[9px] text-[#75777d] mt-0.5 block">{lang === 'BN' ? 'সাইজ: ১.২ MB • জিপিএস ট্যাগড' : 'Size: 1.2 MB • GPS Tagged'}</span>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={handleCancelPhoto}
                      className="text-[#ba1a1a] hover:bg-[#ffdad6]/40 p-2 rounded-full transition-colors active:scale-90 outline-none"
                      aria-label="Remove photo proof"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handlePhotoUploadSimulation}
                    className="w-full border-2 border-dashed border-[#c5c6cd] hover:border-[#006c49] rounded-2xl bg-white p-7 text-center group transition-all cursor-pointer active:scale-[0.98] outline-none"
                  >
                    <div className="flex flex-col items-center justify-center gap-2.5">
                      <div className="w-11 h-11 rounded-full bg-[#f8f9ff] text-[#75777d] group-hover:bg-[#9af2c5]/20 group-hover:text-[#0c714d] flex items-center justify-center transition-colors">
                        <Upload size={20} />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0b1c30] block">{lang === 'BN' ? 'ক্যামেরা খুলতে ট্যাপ করুন' : 'Tap to open camera'}</span>
                        <span className="text-[9px] text-[#75777d]/70 mt-0.5 block font-semibold">{lang === 'BN' ? 'কম্প্লায়েন্স: কমপক্ষে ১টি দোকান ফ্রন্ট ছবি' : 'Compliance: At least 1 storefront picture'}</span>
                      </div>
                    </div>
                  </button>
                )}
              </div>

              <hr className="border-[#eff4ff]" />

              {/* Financial Inputs Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Order Amount */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#44474c] uppercase">{lang === 'BN' ? 'অর্ডারের পরিমাণ' : 'Order Amount'}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#75777d]">৳</span>
                    <input 
                      type="number"
                      value={orderAmount}
                      onChange={(e) => setOrderAmount(e.target.value)}
                      className="w-full bg-white border border-[#c5c6cd] rounded-xl pl-6 pr-3 py-3 text-xs text-[#0b1c30] font-bold focus:ring-1 focus:ring-[#006c49] focus:border-[#006c49] outline-none placeholder-[#75777d]/40 shadow-sm h-11"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Collection Amount */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#44474c] uppercase">{lang === 'BN' ? 'কালেকশন পরিমাণ' : 'Collection Amount'}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#75777d]">৳</span>
                    <input 
                      type="number"
                      value={collectionAmount}
                      onChange={(e) => setCollectionAmount(e.target.value)}
                      className="w-full bg-white border border-[#c5c6cd] rounded-xl pl-6 pr-3 py-3 text-xs text-[#0b1c30] font-bold focus:ring-1 focus:ring-[#006c49] focus:border-[#006c49] outline-none placeholder-[#75777d]/40 shadow-sm h-11"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Log Data (Followup, Product Interest) */}
              <div className="grid grid-cols-2 gap-3.5 pt-1">
                {/* Follow-up Date */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-bold text-[#44474c] uppercase">{lang === 'BN' ? 'পরবর্তী ফলো-আপ তারিখ' : 'Follow-up Date'}</label>
                  <input 
                    type="date"
                    value={followupDate}
                    onChange={(e) => setFollowupDate(e.target.value)}
                    className="w-full bg-white border border-[#c5c6cd] rounded-xl px-3 py-3 text-xs text-[#0b1c30] font-semibold focus:ring-1 focus:ring-[#006c49] focus:border-[#006c49] outline-none shadow-sm h-11"
                  />
                </div>

                {/* Product Interest */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-bold text-[#44474c] uppercase">{lang === 'BN' ? 'পণ্যের প্রতি আগ্রহ' : 'Product Interest'}</label>
                  <input 
                    type="text"
                    value={productInterest}
                    onChange={(e) => setProductInterest(e.target.value)}
                    className="w-full bg-white border border-[#c5c6cd] rounded-xl px-3 py-3 text-xs text-[#0b1c30] font-semibold focus:ring-1 focus:ring-[#006c49] focus:border-[#006c49] outline-none placeholder-[#75777d]/40 shadow-sm h-11"
                    placeholder={lang === 'BN' ? 'যেমন: এক্সটেরিয়র পেইন্ট' : 'e.g. Exterior Paint'}
                  />
                </div>
              </div>

              {/* Textareas */}
              <div className="space-y-4 pt-1">
                {/* Dealer Feedback */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#44474c] uppercase">{lang === 'BN' ? 'ডিলার ফিডব্যাক ও নোট' : 'Dealer Feedback Notes'}</label>
                  <textarea 
                    ref={feedbackRef}
                    value={dealerFeedback}
                    onChange={(e) => setDealerFeedback(e.target.value)}
                    rows={3}
                    className="w-full bg-white border border-[#c5c6cd] rounded-xl px-3 py-3 text-xs text-[#0b1c30] font-medium focus:ring-1 focus:ring-[#006c49] focus:border-[#006c49] outline-none transition-all placeholder-[#75777d]/50 resize-none shadow-sm"
                    placeholder={lang === 'BN' ? 'ডিলার বা পেমেন্ট সম্পর্কিত মন্তব্য লিখুন...' : 'Enter details or feedback notes...'}
                  />
                </div>

                {/* Competitor Info */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#44474c] uppercase">{lang === 'BN' ? 'প্রতিযোগীর তথ্য ও স্কিম' : 'Competitor Schemes & Info'}</label>
                  <textarea 
                    value={competitorInfo}
                    onChange={(e) => setCompetitorInfo(e.target.value)}
                    rows={2}
                    className="w-full bg-white border border-[#c5c6cd] rounded-xl px-3 py-3 text-xs text-[#0b1c30] font-medium focus:ring-1 focus:ring-[#006c49] focus:border-[#006c49] outline-none transition-all placeholder-[#75777d]/50 resize-none shadow-sm"
                    placeholder={lang === 'BN' ? 'প্রতিযোগীদের কোনো ডিসকাউন্ট বা প্রমোশন দেখেছেন?' : 'Observe any competitor activity or display banners?'}
                  />
                </div>

                {/* Complaint / Service Issue */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#44474c] uppercase">{lang === 'BN' ? 'অভিযোগ / সার্ভিস সমস্যা' : 'Complaints & Issues'}</label>
                  <textarea 
                    value={complaintIssue}
                    onChange={(e) => setComplaintIssue(e.target.value)}
                    rows={2}
                    className="w-full bg-white border border-[#c5c6cd] rounded-xl px-3 py-3 text-xs text-[#0b1c30] font-medium focus:ring-1 focus:ring-[#006c49] focus:border-[#006c49] outline-none transition-all placeholder-[#75777d]/50 resize-none shadow-sm"
                    placeholder={lang === 'BN' ? 'ডিলারের কোনো অভিযোগ বা সমস্যা থাকলে লিখুন...' : 'Enter any delivery or product quality complaints...'}
                  />
                </div>
              </div>

              {/* Quick Actions in logging mode */}
              <section className="space-y-2 pt-2 border-t border-[#eff4ff]">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
                  <button
                    type="button"
                    onClick={() => handleQuickAction('call')}
                    className="bg-white border border-[#c5c6cd]/30 rounded-xl p-3 flex flex-col items-center justify-center min-w-[80px] gap-1.5 shadow-sm hover:bg-[#eff4ff]/30 active:scale-95 transition-all outline-none"
                  >
                    <div className="bg-[#eff4ff] p-2 rounded-full text-[#0b1c30] shrink-0">
                      <Phone size={14} />
                    </div>
                    <span className="text-[10px] font-bold text-[#0b1c30]">{lang === 'BN' ? 'কল করুন' : 'Call'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickAction('whatsapp')}
                    className="bg-white border border-[#c5c6cd]/30 rounded-xl p-3 flex flex-col items-center justify-center min-w-[80px] gap-1.5 shadow-sm hover:bg-[#eff4ff]/30 active:scale-95 transition-all outline-none"
                  >
                    <div className="bg-[#eff4ff] p-2 rounded-full text-[#0c714d] shrink-0">
                      <MessageCircle size={14} />
                    </div>
                    <span className="text-[10px] font-bold text-[#0b1c30]">WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickAction('photo')}
                    className="bg-white border border-[#c5c6cd]/30 rounded-xl p-3 flex flex-col items-center justify-center min-w-[80px] gap-1.5 shadow-sm hover:bg-[#eff4ff]/30 active:scale-95 transition-all outline-none"
                  >
                    <div className="bg-[#eff4ff] p-2 rounded-full text-[#0b1c30] shrink-0">
                      <Camera size={14} />
                    </div>
                    <span className="text-[10px] font-bold text-[#0b1c30]">{lang === 'BN' ? 'ছবি প্রমাণ' : 'Photo'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickAction('note')}
                    className="bg-white border border-[#c5c6cd]/30 rounded-xl p-3 flex flex-col items-center justify-center min-w-[80px] gap-1.5 shadow-sm hover:bg-[#eff4ff]/30 active:scale-95 transition-all outline-none"
                  >
                    <div className="bg-[#eff4ff] p-2 rounded-full text-[#0b1c30] shrink-0">
                      <Edit size={14} />
                    </div>
                    <span className="text-[10px] font-bold text-[#0b1c30]">{lang === 'BN' ? 'নোট লিখুন' : 'Notes'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickAction('manager')}
                    className="bg-white border border-[#c5c6cd]/30 rounded-xl p-3 flex flex-col items-center justify-center min-w-[80px] gap-1.5 shadow-sm hover:bg-[#eff4ff]/30 active:scale-95 transition-all outline-none"
                  >
                    <div className="bg-[#eff4ff] p-2 rounded-full text-[#ba1a1a] shrink-0">
                      <AlertTriangle size={14} />
                    </div>
                    <span className="text-[10px] font-bold text-[#0b1c30]">{lang === 'BN' ? 'ম্যানেজার' : 'Manager'}</span>
                  </button>
                </div>
              </section>

              {/* Fixed Bottom Submission Area */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-[#c5c6cd]/30 z-40 shadow-[0px_-4px_25px_rgba(0,0,0,0.03)]">
                <button
                  type="submit"
                  className="w-full bg-[#006c49] hover:bg-[#0c714d] text-white rounded-full py-4 px-6 font-bold text-xs tracking-wide active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#006c49]/20"
                >
                  <Send size={15} />
                  <span>{lang === 'BN' ? 'ভিজিট রিপোর্ট জমা দিন' : 'Submit Visit Report'}</span>
                </button>
              </div>
            </form>
          </main>
        </>
      )}

      {/* Floating Toast Notification */}
      {toast.visible && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#0e1c2f]/95 text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#c5c6cd]/25 text-[10px] font-semibold transition-all duration-300 w-[90%] text-center backdrop-blur-sm animate-fade-in-up">
          {toast.message}
        </div>
      )}

      {/* Blank Completion Confirmation Modal */}
      {showBlankConfirm && (
        <div className="absolute inset-0 bg-[#0e1c2f]/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-[90%] max-w-[340px] shadow-2xl border border-white/20 text-center flex flex-col gap-4 animate-fade-in-scale">
            <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-sm font-bold text-[#0b1c30]">
              {lang === 'BN' ? 'কোনো ভিজিট তথ্য দেওয়া হয়নি' : 'No Visit Data Provided'}
            </h3>
            <p className="text-[11px] text-[#44474c] leading-relaxed">
              {lang === 'BN' 
                ? 'আপনি এখনো অর্ডার, কালেকশন, নোট বা ছবি যোগ করেননি। তবুও ভিজিট শেষ করলে রিপোর্টে ‘তথ্য দেওয়া হয়নি’ হিসেবে সংরক্ষণ হবে।'
                : 'You have not added any order, collection, notes, or photos yet. Ending the visit now will save it as "No Data Provided" in the report.'
              }
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowBlankConfirm(false)}
                className="w-full bg-[#eff4ff] text-[#0b1c30] border border-[#c5c6cd]/30 rounded-full py-2.5 text-xs font-bold hover:bg-[#dce9ff] transition-colors active:scale-95"
              >
                {lang === 'BN' ? 'তথ্য যোগ করব' : 'Add Info'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowBlankConfirm(false);
                  completeVisit(true);
                }}
                className="w-full bg-[#ba1a1a] text-white rounded-full py-2.5 text-xs font-bold hover:bg-red-700 transition-colors active:scale-95"
              >
                {lang === 'BN' ? 'তবুও ভিজিট শেষ করুন' : 'End Visit Anyway'}
              </button>
            </div>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
};
export default ActiveVisit;
