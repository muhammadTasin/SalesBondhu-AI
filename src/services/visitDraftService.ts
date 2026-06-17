export interface VisitCompletionRecord {
  visitId: string;
  dealerId?: string;
  completedAt: string;
  completedWithoutData: boolean;
  missingFields?: string[];
  filledFields?: string[];
  note: string;
  data?: {
    orderAmount?: string;
    collectionAmount?: string;
    followupDate?: string;
    competitorUpdate?: string;
    notes?: string;
    photosCount?: number;
  };
}

const STORAGE_KEY = 'salesbondhu_visit_completion_queue';

/**
 * Saves a completed visit record locally in the offline queue (localStorage).
 * Future phase will sync these records to Supabase.
 */
export const saveVisitCompletion = (record: VisitCompletionRecord): void => {
  try {
    const existingQueueStr = localStorage.getItem(STORAGE_KEY);
    const queue: VisitCompletionRecord[] = existingQueueStr ? JSON.parse(existingQueueStr) : [];
    queue.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    console.log('Successfully saved visit completion record:', record);
  } catch (error) {
    console.error('Error saving visit completion record:', error);
  }
};

/**
 * Gets all saved visit completion records from the offline queue.
 */
export const getVisitCompletions = (): VisitCompletionRecord[] => {
  try {
    const existingQueueStr = localStorage.getItem(STORAGE_KEY);
    return existingQueueStr ? JSON.parse(existingQueueStr) : [];
  } catch (error) {
    console.error('Error reading visit completion queue:', error);
    return [];
  }
};

/**
 * Clears the visit completion queue from localStorage.
 */
export const clearVisitCompletions = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
