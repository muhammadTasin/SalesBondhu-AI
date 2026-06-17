export interface DealerNode {
  id: string;
  name: string;
  status: 'urgent' | 'followup' | 'healthy' | 'potential';
  statusColor: string;
  lat: number; // Y coordinate in SVG (adjusted for spacing)
  lng: number; // X coordinate in SVG (adjusted for spacing)
  descriptionBN: string;
  descriptionEN: string;
  sales: string;
  collection: string;
  coverage: string;
  officer: string;
  officerId: string;
}

export interface FSOInfo {
  id: string;
  name: string;
  initials: string;
  locationBN: string;
  locationEN: string;
  visitsCompleted: number;
  visitsTarget: number;
  collection: string;
  collectionPercent: string;
  sales: string;
  salesStatusBN: string;
  salesStatusEN: string;
  gpsScore: number;
  territoryTimeBN: string;
  territoryTimeEN: string;
  checkInTime: string;
  timeline: {
    time: string;
    titleBN: string;
    titleEN: string;
    detailBN: string;
    detailEN: string;
    gpsVerified: boolean;
    photoProof: boolean;
    noteBN: string;
    noteEN: string;
  }[];
}

export interface RiskAlert {
  id: string;
  type: 'due' | 'decline' | 'gps' | 'all';
  title: string;
  owner: string;
  ownerId: string;
  role: string;
  severity: 'high' | 'medium' | 'low';
  severityLabelBN: string;
  severityLabelEN: string;
  reasonTitleBN: string;
  reasonTitleEN: string;
  reasonDetailsBN: string[];
  reasonDetailsEN: string[];
  actionLabelBN: string;
  actionLabelEN: string;
  extraDetails?: {
    verifiedCount?: number;
    totalCount?: number;
  };
}

export const mockDealers: DealerNode[] = [
  {
    id: 'rahman-traders',
    name: 'Rahman Traders',
    lat: 130,
    lng: 60,
    status: 'urgent',
    statusColor: '#ba1a1a', // Red
    descriptionBN: '৳৮৫,০০০ বকেয়া ও সেলস ৪০% পতন।',
    descriptionEN: '৳85,000 overdue & 40% sales drop.',
    sales: '৳১.২L',
    collection: '৳১৫k',
    coverage: '১৫%',
    officer: 'Rahim Ahmed',
    officerId: 'rahim-ahmed'
  },
  {
    id: 'karim-paint',
    name: 'Karim Paint House',
    lat: 80,
    lng: 230,
    status: 'followup',
    statusColor: '#f59e0b', // Amber
    descriptionBN: '১৪ দিন ধরে ক্রয় করা হয়নি। ক্রিয়াকলাপ ধীর।',
    descriptionEN: 'No purchase recorded for 14 days. Activity slow.',
    sales: '৳২.৫L',
    collection: '৳৮০k',
    coverage: '৬০%',
    officer: 'Kamrul Hasan',
    officerId: 'kamrul-hasan'
  },
  {
    id: 'mirpur-market',
    name: 'Mirpur Paint Market',
    lat: 180,
    lng: 350,
    status: 'healthy',
    statusColor: '#006c49', // Green
    descriptionBN: 'সেলস ভালো ও লক্ষ্যমাত্রা পূরণ হয়েছে।',
    descriptionEN: 'Steady sales matching monthly target.',
    sales: '৳৪.৮L',
    collection: '৳৪.০L',
    coverage: '৯৫%',
    officer: 'Kamrul Hasan',
    officerId: 'kamrul-hasan'
  },
  {
    id: 'badda-belt',
    name: 'Badda Dealer Belt',
    lat: 280,
    lng: 110,
    status: 'healthy',
    statusColor: '#006c49', // Green
    descriptionBN: 'রুট কভারেজ সঠিক অবস্থানে আছে।',
    descriptionEN: 'Active routing and healthy coverage.',
    sales: '৳৩.২L',
    collection: '৳৩.০L',
    coverage: '৯০%',
    officer: 'Rahim Ahmed',
    officerId: 'rahim-ahmed'
  },
  {
    id: 'gulshan-zone',
    name: 'Gulshan Zone',
    lat: 50,
    lng: 150,
    status: 'potential',
    statusColor: '#0284c7', // Blue
    descriptionBN: '৩টি নতুন লিড সনাক্ত করা হয়েছে।',
    descriptionEN: '3 new high potential leads detected.',
    sales: '৳০',
    collection: '৳০',
    coverage: '০%',
    officer: 'Unassigned',
    officerId: ''
  },
  {
    id: 'uttara-belt',
    name: 'Uttara Dealer Belt',
    lat: 300,
    lng: 270,
    status: 'potential',
    statusColor: '#0284c7', // Blue
    descriptionBN: 'নতুন বাজার সম্প্রসারণের সুযোগ আছে।',
    descriptionEN: 'High expansion opportunities registered.',
    sales: '৳১.০L',
    collection: '৳৫০k',
    coverage: '৪৫%',
    officer: 'Unassigned',
    officerId: ''
  }
];

export const mockOfficers: FSOInfo[] = [
  {
    id: 'rahim-ahmed',
    name: 'Rahim Ahmed',
    initials: 'RA',
    locationBN: 'গুলিস্তান মার্কেট',
    locationEN: 'Gulistan Market',
    visitsCompleted: 3,
    visitsTarget: 20,
    collection: '৳১৫,০০০',
    collectionPercent: '15%',
    sales: '৳১.২L',
    salesStatusBN: 'ঝুঁকিপূর্ণ',
    salesStatusEN: 'At Risk',
    gpsScore: 60,
    territoryTimeBN: '২ ঘণ্টা',
    territoryTimeEN: '2 Hours',
    checkInTime: '08:30 AM',
    timeline: [
      {
        time: '08:30',
        titleBN: 'দিন শুরু হয়েছে',
        titleEN: 'Day Started',
        detailBN: 'হোম বেস থেকে চেক-ইন',
        detailEN: 'Checked in from Home Base',
        gpsVerified: true,
        photoProof: true,
        noteBN: 'রুট চালু করা হয়েছে।',
        noteEN: 'Started planned route.'
      },
      {
        time: '10:45',
        titleBN: 'রহমান ট্রেডার্স-এ আগমন',
        titleEN: 'Reached Rahman Traders',
        detailBN: 'লোকেশন অমিল পাওয়া গেছে (২.৪ কিমি দূরে)',
        detailEN: 'Location mismatch detected (2.4 km away)',
        gpsVerified: false,
        photoProof: true,
        noteBN: 'নতুন ডিলার নিয়ে সংক্ষিপ্ত আলোচনা হয়েছে।',
        noteEN: 'Brief discussion with the dealer.'
      },
      {
        time: '11:10',
        titleBN: 'ভিজিট শেষ হয়েছে',
        titleEN: 'Visit Ended',
        detailBN: 'অর্ডার এবং ড্রাফট রিপোর্ট সাবমিট',
        detailEN: 'Order and draft report submitted',
        gpsVerified: false,
        photoProof: false,
        noteBN: '৳১৫,০০০ কালেকশন ও ৳৪৫k অর্ডার বুকিং করা হয়েছে।',
        noteEN: 'Collected ৳15,000 and booked ৳45k orders.'
      }
    ]
  },
  {
    id: 'kamrul-hasan',
    name: 'Kamrul Hasan',
    initials: 'KH',
    locationBN: 'মতিঝিল সি/এ',
    locationEN: 'Motijheel C/A',
    visitsCompleted: 14,
    visitsTarget: 20,
    collection: '৳৯৫,০০০',
    collectionPercent: '112%',
    sales: '৳২.৮L',
    salesStatusBN: 'চমৎকার',
    salesStatusEN: 'Excellent',
    gpsScore: 95,
    territoryTimeBN: '৮ ঘণ্টা ১৫ মিনিট',
    territoryTimeEN: '8 Hours 15 Mins',
    checkInTime: '08:15 AM',
    timeline: [
      {
        time: '08:15',
        titleBN: 'দিন শুরু হয়েছে',
        titleEN: 'Day Started',
        detailBN: 'মতিঝিল অফিস থেকে চেক-ইন',
        detailEN: 'Checked in from Motijheel Office',
        gpsVerified: true,
        photoProof: true,
        noteBN: 'সকল রুট টার্গেট রেডি।',
        noteEN: 'All route targets ready.'
      },
      {
        time: '11:30',
        titleBN: 'করিম পেইন্ট হাউস-এ আগমন',
        titleEN: 'Reached Karim Paint House',
        detailBN: 'সঠিক স্থানে ভেরিফাইড',
        detailEN: 'Verified on planned location',
        gpsVerified: true,
        photoProof: true,
        noteBN: 'বকেয়া পরিশোধের ব্যবস্থা করা হয়েছে।',
        noteEN: 'Sorted outstanding payment.'
      },
      {
        time: '14:20',
        titleBN: 'মিরপুর পেইন্ট মার্কেট-এ আগমন',
        titleEN: 'Reached Mirpur Paint Market',
        detailBN: 'সঠিক স্থানে ভেরিফাইড',
        detailEN: 'Verified on planned location',
        gpsVerified: true,
        photoProof: true,
        noteBN: '৳৪০k বকেয়া কালেকশন হয়েছে।',
        noteEN: 'Collected ৳40k outstanding dues.'
      }
    ]
  },
  {
    id: 'demo-officer',
    name: 'Arif Rahman',
    initials: 'AR',
    locationBN: 'ঢাকা দক্ষিণ',
    locationEN: 'Dhaka South',
    visitsCompleted: 7,
    visitsTarget: 8,
    collection: '৳৯৫,০০০',
    collectionPercent: '79%',
    sales: '৳২.৮L',
    salesStatusBN: 'চমৎকার',
    salesStatusEN: 'Excellent',
    gpsScore: 87,
    territoryTimeBN: '৬ ঘণ্টা ৪৫ মিনিট',
    territoryTimeEN: '6 Hours 45 Mins',
    checkInTime: '08:30 AM',
    timeline: [
      {
        time: '08:30',
        titleBN: 'দিন শুরু হয়েছে',
        titleEN: 'Day Started',
        detailBN: 'হোম বেস থেকে চেক-ইন',
        detailEN: 'Checked in from Home Base',
        gpsVerified: true,
        photoProof: true,
        noteBN: 'চেক ইন সম্পন্ন।',
        noteEN: 'Check in complete.'
      },
      {
        time: '10:45',
        titleBN: 'রহমান স্টোর-এ আগমন',
        titleEN: 'Reached Rahman Store',
        detailBN: 'সঠিক স্থানে ভেরিফাইড',
        detailEN: 'Verified on planned location',
        gpsVerified: true,
        photoProof: true,
        noteBN: 'প্রিমিয়াম পেইন্ট নিয়ে আলোচনা হয়েছে।',
        noteEN: 'Discussed premium paint replenishment.'
      },
      {
        time: '11:10',
        titleBN: 'রহমান স্টোর-এ ভিজিট শেষ',
        titleEN: 'Ended Visit at Rahman Store',
        detailBN: '৳৪৫k অর্ডার বুকিং করা হয়েছে',
        detailEN: 'Booked ৳45k orders successfully',
        gpsVerified: true,
        photoProof: true,
        noteBN: 'অর্ডার প্রস্তুত এবং পাঠানো হয়েছে।',
        noteEN: 'Order packaged and transmitted.'
      }
    ]
  }
];

export const mockRisks: RiskAlert[] = [
  {
    id: 'rahman-traders',
    type: 'due',
    title: 'Rahman Traders',
    owner: 'Rahim Ahmed',
    ownerId: 'rahim-ahmed',
    role: 'FSO',
    severity: 'high',
    severityLabelBN: 'উচ্চ ঝুঁকি',
    severityLabelEN: 'High Risk',
    reasonTitleBN: 'বকেয়া ও সেলস ঝুঁকি',
    reasonTitleEN: 'Outstanding Dues & Sales Risk',
    reasonDetailsBN: [
      '৳৮৫,০০০ বকেয়া (Credit Limit Exceeded)',
      'Sales ৪০% কমেছে'
    ],
    reasonDetailsEN: [
      '৳85,000 overdue (Credit Limit Exceeded)',
      'Sales dropped by 40% compared to average'
    ],
    actionLabelBN: 'কালেকশন ফলো-আপ',
    actionLabelEN: 'Collection Follow-up'
  },
  {
    id: 'karim-paint',
    type: 'decline',
    title: 'Karim Paint House',
    owner: 'Kamrul Hasan',
    ownerId: 'kamrul-hasan',
    role: 'FSO',
    severity: 'medium',
    severityLabelBN: 'মাঝারি',
    severityLabelEN: 'Medium Risk',
    reasonTitleBN: 'High potential / Inactive',
    reasonTitleEN: 'High Potential / Inactive Retailer',
    reasonDetailsBN: [
      '১৪ দিন ধরে কোনো পণ্য ক্রয় করা হয়নি।'
    ],
    reasonDetailsEN: [
      'No transactions logged in the past 14 days.'
    ],
    actionLabelBN: 'রিমাইন্ডার পাঠান',
    actionLabelEN: 'Send Reminder'
  },
  {
    id: 'rahim-gps',
    type: 'gps',
    title: 'Rahim Ahmed',
    owner: 'Rahim Ahmed',
    ownerId: 'rahim-ahmed',
    role: 'Sales Officer',
    severity: 'high',
    severityLabelBN: 'উচ্চ ঝুঁকি',
    severityLabelEN: 'High Risk',
    reasonTitleBN: 'GPS Mismatch',
    reasonTitleEN: 'GPS Location Deviation',
    reasonDetailsBN: [
      '৫টি ভিজিট রিপোর্টের মধ্যে জিপিএস ৩টি ভেরিফাই করেছে।'
    ],
    reasonDetailsEN: [
      'Reported 5 store check-ins, but GPS coordinates verify only 3.'
    ],
    actionLabelBN: 'রুট রিভিউ',
    actionLabelEN: 'Review Route',
    extraDetails: {
      verifiedCount: 3,
      totalCount: 5
    }
  }
];

export const mockMarketInsights = {
  displayPhotosBN: 'রহমান ট্রেডার্স-এ নতুন ডিসপ্লে সেটআপ সম্পন্ন এবং ভেরিফাইড।',
  displayPhotosEN: 'New retail display setup at Rahman Traders verified via photo upload.',
  competitorActivityBN: 'Brand X ১০% অতিরিক্ত ছাড় দিচ্ছে নর্থ জোনে (৩ জন ডিলারের রিপোর্ট)।',
  competitorActivityEN: 'Brand X offering 10% promotional cash discount in North Zone.',
  dealerComplaintsBN: 'সাউথ জোনে ডেলিভারি দেরির অভিযোগ (১টি অমীমাংসিত রয়েছে)।',
  dealerComplaintsEN: 'Delivery delay complaints registered by Mirpur dealers.'
};

export const mockEODSummary = {
  salesAchieved: '৳২,৮০,০০০',
  collectionAchieved: '৳৯৫,০০০',
  collectionTarget: '৳১,২০,০০০',
  routeCoverage: '৮৫%',
  visitsCompleted: '৭',
  visitsTarget: '৮',
  topPerformer: 'Kamrul Hasan',
  coachingNeeds: 'Rahim Ahmed',
  tomorrowActionsBN: [
    'রহমান ট্রেডার্স-এর বকেয়া কালেকশনে জোরালো তাগাদা দেওয়া।',
    'নিষ্ক্রিয় উচ্চ-সম্ভাবনা ডিলারদের নতুন করে ভিজিট শিডিউল করা।'
  ],
  tomorrowActionsEN: [
    'Conduct aggressive collection push at Rahman Traders.',
    'Map out routes for inactive high-potential dealer conversion.'
  ]
};
