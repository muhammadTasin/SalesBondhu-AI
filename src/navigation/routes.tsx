import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginRoleSelection } from '../screens/LoginRoleSelection';
import { DutyTrackingConsent } from '../screens/DutyTrackingConsent';
import { TodayDashboard } from '../screens/TodayDashboard';
import { FieldMapIntelligence } from '../screens/FieldMapIntelligence';
import { OptimizedRoute } from '../screens/OptimizedRoute';
import { TodayVisitPlan } from '../screens/TodayVisitPlan';
import { VisitPreparation } from '../screens/VisitPreparation';
import { ActiveVisit } from '../screens/ActiveVisit';
import { SalesCoach } from '../screens/SalesCoach';
import { TrackingTimeline } from '../screens/TrackingTimeline';
import { EndOfDayReport } from '../screens/EndOfDayReport';
import { PendingFollowups } from '../screens/PendingFollowups';
import { OfflineSyncStates } from '../screens/OfflineSyncStates';
import { ManagerDashboard } from '../screens/ManagerDashboard';
import { ManagerOfficerDetail } from '../screens/ManagerOfficerDetail';
import { SettingsDutyPreferences } from '../screens/SettingsDutyPreferences';

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
      <Route path="/coach" element={<SalesCoach />} />
      <Route path="/timeline" element={<TrackingTimeline />} />
      <Route path="/end-day-report" element={<EndOfDayReport />} />
      <Route path="/followups" element={<PendingFollowups />} />
      <Route path="/offline-sync" element={<OfflineSyncStates />} />
      <Route path="/manager" element={<ManagerDashboard />} />
      <Route path="/manager/officer/:officerId" element={<ManagerOfficerDetail />} />
      <Route path="/settings" element={<SettingsDutyPreferences />} />
      
      {/* Fallback to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

