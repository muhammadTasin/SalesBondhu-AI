import React from 'react';
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
import { ManagerDashboard } from '../screens/manager/ManagerDashboard';
import { ManagerOfficerDetail } from '../screens/manager/ManagerOfficerDetail';
import { ManagerRiskCenter } from '../screens/manager/ManagerRiskCenter';
import { ManagerTerritoryMap } from '../screens/manager/ManagerTerritoryMap';
import { ManagerEndDayReview } from '../screens/manager/ManagerEndDayReview';
import { SettingsDutyPreferences } from '../screens/SettingsDutyPreferences';
import { getCurrentRole } from '../lib/mockSession';

interface RouteGuardProps {
  element: React.ReactElement;
  allowedRoles: ('sales_officer' | 'manager' | 'admin')[];
}

const RouteGuard: React.FC<RouteGuardProps> = ({ element, allowedRoles }) => {
  const role = getCurrentRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    if (role === 'sales_officer') {
      return <Navigate to="/today" replace />;
    } else {
      return <Navigate to="/manager" replace />;
    }
  }

  return element;
};

const RootRedirect = () => {
  const role = getCurrentRole();
  if (role === 'sales_officer') {
    return <Navigate to="/today" replace />;
  } else if (role === 'manager' || role === 'admin') {
    return <Navigate to="/manager" replace />;
  }
  return <Navigate to="/login" replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginRoleSelection />} />
      
      {/* Sales Officer Routes */}
      <Route path="/duty" element={<RouteGuard allowedRoles={['sales_officer']} element={<DutyTrackingConsent />} />} />
      <Route path="/today" element={<RouteGuard allowedRoles={['sales_officer']} element={<TodayDashboard />} />} />
      <Route path="/route" element={<RouteGuard allowedRoles={['sales_officer']} element={<OptimizedRoute />} />} />
      <Route path="/map" element={<RouteGuard allowedRoles={['sales_officer']} element={<FieldMapIntelligence />} />} />
      <Route path="/visit-plan" element={<RouteGuard allowedRoles={['sales_officer']} element={<TodayVisitPlan />} />} />
      <Route path="/visit-prep/:dealerId" element={<RouteGuard allowedRoles={['sales_officer']} element={<VisitPreparation />} />} />
      <Route path="/active-visit/:visitId" element={<RouteGuard allowedRoles={['sales_officer']} element={<ActiveVisit />} />} />
      <Route path="/coach" element={<RouteGuard allowedRoles={['sales_officer']} element={<SalesCoach />} />} />
      <Route path="/timeline" element={<RouteGuard allowedRoles={['sales_officer']} element={<TrackingTimeline />} />} />
      <Route path="/end-day-report" element={<RouteGuard allowedRoles={['sales_officer']} element={<EndOfDayReport />} />} />
      <Route path="/followups" element={<RouteGuard allowedRoles={['sales_officer']} element={<PendingFollowups />} />} />
      <Route path="/offline-sync" element={<RouteGuard allowedRoles={['sales_officer']} element={<OfflineSyncStates />} />} />
      
      {/* Manager Routes */}
      <Route path="/manager" element={<RouteGuard allowedRoles={['manager', 'admin']} element={<ManagerDashboard />} />} />
      <Route path="/manager/officer/:officerId" element={<RouteGuard allowedRoles={['manager', 'admin']} element={<ManagerOfficerDetail />} />} />
      <Route path="/manager/risks" element={<RouteGuard allowedRoles={['manager', 'admin']} element={<ManagerRiskCenter />} />} />
      <Route path="/manager/territory" element={<RouteGuard allowedRoles={['manager', 'admin']} element={<ManagerTerritoryMap />} />} />
      <Route path="/manager/reports" element={<RouteGuard allowedRoles={['manager', 'admin']} element={<ManagerEndDayReview />} />} />
      
      {/* Shared Shared Routes */}
      <Route path="/settings" element={<RouteGuard allowedRoles={['sales_officer', 'manager', 'admin']} element={<SettingsDutyPreferences />} />} />
      
      {/* Fallback to root redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
