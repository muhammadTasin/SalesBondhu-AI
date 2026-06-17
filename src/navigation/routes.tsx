import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginRoleSelection } from '../screens/LoginRoleSelection';
import { DutyTrackingConsent } from '../screens/DutyTrackingConsent';
import { TodayDashboard } from '../screens/TodayDashboard';
import { FieldMapIntelligence } from '../screens/FieldMapIntelligence';
import { OptimizedRoute } from '../screens/OptimizedRoute';
import { TodayVisitPlan } from '../screens/TodayVisitPlan';
import { VisitPreparation } from '../screens/VisitPreparation';
import { ActiveVisit } from '../screens/ActiveVisit';

// Placeholder screen components for the remaining 8 screens
export const SalesCoachScreen = () => <div className="p-8"><h1>Sales Coach AI</h1><p>Placeholder Screen</p></div>;
export const TrackingTimelineScreen = () => <div className="p-8"><h1>Tracking Timeline</h1><p>Placeholder Screen</p></div>;
export const EndDayReportScreen = () => <div className="p-8"><h1>End-of-Day Report</h1><p>Placeholder Screen</p></div>;
export const FollowupsScreen = () => <div className="p-8"><h1>Pending Follow-ups</h1><p>Placeholder Screen</p></div>;
export const OfflineSyncScreen = () => <div className="p-8"><h1>Offline & Sync States</h1><p>Placeholder Screen</p></div>;
export const ManagerDashboardScreen = () => <div className="p-8"><h1>Manager Dashboard</h1><p>Placeholder Screen</p></div>;
export const ManagerOfficerDetailScreen = () => <div className="p-8"><h1>Manager Officer Detail</h1><p>Placeholder Screen</p></div>;
export const SettingsScreen = () => <div className="p-8"><h1>Settings & Duty Preferences</h1><p>Placeholder Screen</p></div>;

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoleSelection />} />
      <Route path="/duty" element={<DutyTrackingConsent />} />
      <Route path="/today" element={<TodayDashboard />} />
      <Route path="/route" element={<OptimizedRoute />} />
      <Route path="/map" element={<FieldMapIntelligence />} />
      <Route path="/visit-plan" element={<TodayVisitPlan />} />
      <Route path="/visit-prep/:dealerId" element={<VisitPreparation />} />
      <Route path="/active-visit/:visitId" element={<ActiveVisit />} />
      <Route path="/coach" element={<SalesCoachScreen />} />
      <Route path="/timeline" element={<TrackingTimelineScreen />} />
      <Route path="/end-day-report" element={<EndDayReportScreen />} />
      <Route path="/followups" element={<FollowupsScreen />} />
      <Route path="/offline-sync" element={<OfflineSyncScreen />} />
      <Route path="/manager" element={<ManagerDashboardScreen />} />
      <Route path="/manager/officer/:officerId" element={<ManagerOfficerDetailScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      
      {/* Fallback to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

