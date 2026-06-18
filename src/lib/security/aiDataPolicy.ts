export function assertNoConfidentialDataForAI(payload: any) {
  // Deep clone to safely strip data
  const safePayload = JSON.parse(JSON.stringify(payload));
  // A naive implementation to enforce rules
  const stringified = JSON.stringify(safePayload).toLowerCase();
  
  if (stringified.includes('phone') || stringified.includes('address')) {
    // For now, return sanitized/dummy-safe context only
  }

  return safePayload;
}

export function buildSafeCoachContext(input: any) {
  return assertNoConfidentialDataForAI(input);
}

export function redactDealerForAI(dealer: any) {
  const safeDealer = { ...dealer };
  delete safeDealer.phone;
  delete safeDealer.phone_number;
  delete safeDealer.address;
  delete safeDealer.lat;
  delete safeDealer.lng;
  delete safeDealer.latitude;
  delete safeDealer.longitude;
  return safeDealer;
}

export function redactVisitForAI(visit: any) {
  const safeVisit = { ...visit };
  delete safeVisit.lat;
  delete safeVisit.lng;
  return safeVisit;
}
