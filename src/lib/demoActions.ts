/**
 * Utility functions for exporting reports and simulating demo actions.
 */

// Helper to trigger browser download of a text blob
export const triggerDownload = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Excel-compatible CSV generator
export const exportCSV = (data: any[], headers: string[], filename: string) => {
  // Add UTF-8 BOM for Excel compatibility
  const BOM = '\uFEFF';
  let csvContent = BOM + headers.join(',') + '\n';
  
  data.forEach((row) => {
    const rowValues = row.map((value: any) => {
      // Escape commas and double quotes
      let stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        stringValue = `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    });
    csvContent += rowValues.join(',') + '\n';
  });

  triggerDownload(csvContent, filename, 'text/csv;charset=utf-8;');
};

// JSON report generator
export const exportJSON = (data: any, filename: string) => {
  const jsonContent = JSON.stringify(data, null, 2);
  triggerDownload(jsonContent, filename, 'application/json;charset=utf-8;');
};

// Generate the ERP-ready payload
export const generateERPPayload = (managerName: string, date: string, mockData: any) => {
  return {
    region: 'Dhaka South (ঢাকা দক্ষিণ)',
    date: date,
    manager: managerName,
    salesSummary: {
      achieved: mockData.salesAchieved,
      currency: 'BDT'
    },
    collectionSummary: {
      achieved: mockData.collectionAchieved,
      target: mockData.collectionTarget,
      currency: 'BDT'
    },
    routeCoverage: mockData.routeCoverage,
    photoProofStatus: '78% compliant',
    officers: [
      {
        id: 'rahim-ahmed',
        name: 'Rahim Ahmed',
        visits: '3/20',
        collection: '৳15,000',
        gpsScore: '60%',
        status: 'High Risk'
      },
      {
        id: 'kamrul-hasan',
        name: 'Kamrul Hasan',
        visits: '14/20',
        collection: '৳95,000',
        gpsScore: '95%',
        status: 'On Track'
      }
    ],
    risks: [
      {
        dealer: 'Rahman Traders',
        type: 'Due & Sales Drop',
        dueAmount: 85000,
        salesDecline: '40%'
      },
      {
        dealer: 'Karim Paint House',
        type: 'Inactive High Potential',
        idleDays: 14
      }
    ],
    tomorrowActions: mockData.tomorrowActionsEN,
    weeklyActions: [
      'Low coverage territory review',
      'Collection risk follow-up',
      'High-potential dealer conversion',
      'GPS mismatch coaching',
      'Photo proof compliance'
    ],
    timestamp: new Date().toISOString()
  };
};
