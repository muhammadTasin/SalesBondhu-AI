# SalesBondhu AI - Screen Inventory & Route Plan

This document outlines the screen inventory mapping the Stitch-exported screens to the final React routes, role permissions, required Supabase data, key actions, and development status.

---

## Screen Inventory

### 1. Login & Role Selection
*   **Stitch Export Folder:** `login_role_selection_modern`
*   **Final Route Path:** `/login`
*   **Allowed Roles:** Anonymous (all roles can log in)
*   **Data Needed from Supabase:** `users` (profiles) for authentication and role redirection (`sales_officer` or `manager`).
*   **Actions/Buttons:**
    *   Email/Password Inputs
    *   Role Selector (Sales Officer / Manager)
    *   Language Toggle (Floating Pill: EN/BN)
    *   "Sign In" button (Primary Emerald green button)
*   **Status:** needs wiring

### 2. Duty Tracking Consent
*   **Stitch Export Folder:** `duty_tracking_consent_modern`
*   **Final Route Path:** `/duty`
*   **Allowed Roles:** `sales_officer`
*   **Data Needed from Supabase:** `users` (profiles) metadata to record/update tracking consent timestamp and status.
*   **Actions/Buttons:**
    *   Detailed consent description card
    *   "I Agree" button (Vibrant Emerald green)
    *   "Learn More / Privacy Policy" button
*   **Status:** needs wiring

### 3. Today Dashboard
*   **Stitch Export Folder:** `today_dashboard_natural_bangla`
*   **Final Route Path:** `/today`
*   **Allowed Roles:** `sales_officer`
*   **Data Needed from Supabase:** `dealers` (target list), `sales_officers` (targets & daily metrics), `tasks`, `alerts`.
*   **Actions/Buttons:**
    *   Start Duty toggle (triggering location tracking)
    *   View Visit Plan
    *   View Optimized Route
    *   AI Copilot recommendations card click
    *   Bottom navigation tabs
*   **Status:** needs wiring

### 4. Field Map Intelligence
*   **Stitch Export Folder:** `field_map_intelligence_polish`
*   **Final Route Path:** `/map`
*   **Allowed Roles:** `sales_officer`
*   **Data Needed from Supabase:** `dealers` location data (latitude/longitude), active visit records.
*   **Actions/Buttons:**
    *   Interactive map view
    *   Dealer marker tap (brings up bottom-sheet detail card)
    *   "Start Visit" button inside bottom sheet
    *   "Directions" button (external map launch)
*   **Status:** needs wiring

### 5. Optimized Route
*   **Stitch Export Folder:** `optimized_route_natural_bangla`
*   **Final Route Path:** `/route`
*   **Allowed Roles:** `sales_officer`
*   **Data Needed from Supabase:** `dealers` coordinates, sequence of visits for the day.
*   **Actions/Buttons:**
    *   Optimized path overlay on map
    *   Visit order list details card
    *   "Accept Route" / "Update Route" buttons
*   **Status:** needs wiring

### 6. Today’s Visit Plan
*   **Stitch Export Folder:** `today_s_visit_plan_modern`
*   **Final Route Path:** `/visit-plan`
*   **Allowed Roles:** `sales_officer`
*   **Data Needed from Supabase:** `officer_visits` joined with `dealers` for today.
*   **Actions/Buttons:**
    *   Dealer priority ranking list
    *   Status indicator chips (Pending / Completed / Missed)
    *   Click dealer card to view `Visit Preparation` page
*   **Status:** needs wiring

### 7. Visit Preparation
*   **Stitch Export Folder:** `visit_preparation_natural_bangla_refined`
*   **Final Route Path:** `/visit-prep/:dealerId`
*   **Allowed Roles:** `sales_officer`
*   **Data Needed from Supabase:** `dealers` (ERP history, due collection balance, stock alerts), `collection_followups`.
*   **Actions/Buttons:**
    *   "Start Visit Now" button
    *   "Ask AI Coach for Talking Points" trigger
    *   View Historical Sales graph
*   **Status:** needs wiring

### 8. Sales Coach
*   **Stitch Export Folder:** `sales_coach_ai_natural_bangla`
*   **Final Route Path:** `/coach`
*   **Allowed Roles:** `sales_officer`
*   **Data Needed from Supabase:** AI-generated scripts, talking points, objection logs, and dealer metrics.
*   **Actions/Buttons:**
    *   Bangla/English Toggle
    *   "Generate Talking Points" buttons for specific objectives (Collections, Stock checks, Sales recovery)
    *   "Back to Visit Prep" button
*   **Status:** needs wiring

### 9. Active Visit
*   **Stitch Export Folder:** `active_visit_natural_bangla`
*   **Final Route Path:** `/active-visit/:visitId`
*   **Allowed Roles:** `sales_officer`
*   **Data Needed from Supabase:** `officer_visits` details, active dealer ID, `tasks` for that dealer.
*   **Actions/Buttons:**
    *   Stock Input fields (Check stock quantity & low-stock tags)
    *   Collection Entry field (payment collection recorded)
    *   Visit Action photo/attachment upload
    *   "Submit Visit Report" button (saves and exits visit)
*   **Status:** needs wiring

### 10. Tracking Timeline
*   **Stitch Export Folder:** `tracking_timeline_natural_bangla`
*   **Final Route Path:** `/timeline`
*   **Allowed Roles:** `sales_officer` / `manager`
*   **Data Needed from Supabase:** `officer_location_pings` and `officer_visits` history for today.
*   **Actions/Buttons:**
    *   Visual vertical timeline representing GPS tracks and visited locations
    *   "Sync Now" check details
    *   Scroll through timestamps
*   **Status:** needs wiring

### 11. End-of-Day Report
*   **Stitch Export Folder:** `end_of_day_report_natural_bangla`
*   **Final Route Path:** `/end-day-report`
*   **Allowed Roles:** `sales_officer`
*   **Data Needed from Supabase:** Today's visits completed, collections total, stock alerts raised.
*   **Actions/Buttons:**
    *   Summary charts and metrics (completed visits vs target)
    *   "End Duty & Submit Report" button (Stops background GPS tracking)
*   **Status:** needs wiring

### 12. Offline & Sync States
*   **Stitch Export Folder:** `offline_sync_states_natural_bangla_standardized`
*   **Final Route Path:** `/offline-sync`
*   **Allowed Roles:** `sales_officer`
*   **Data Needed from Supabase:** Local storage queue size (cached writes).
*   **Actions/Buttons:**
    *   "Sync Queue Now" button
    *   Offline alerts indicators
*   **Status:** needs wiring

### 13. Pending Follow-ups
*   **Stitch Export Folder:** `pending_follow_ups_task_focused`
*   **Final Route Path:** `/followups`
*   **Allowed Roles:** `sales_officer`
*   **Data Needed from Supabase:** `collection_followups` (where status = 'pending'), `tasks`.
*   **Actions/Buttons:**
    *   Task list with checkboxes
    *   Overdue task alert highlights
    *   Call customer link/button
*   **Status:** needs wiring

### 14. Manager Dashboard
*   **Stitch Export Folder:** `manager_dashboard_executive`
*   **Final Route Path:** `/manager`
*   **Allowed Roles:** `manager`
*   **Data Needed from Supabase:** All `sales_officers` activity summaries, route coverage metrics, target vs collection statistics.
*   **Actions/Buttons:**
    *   Officer list (Sorted by target compliance or anomalies)
    *   Filter by territory/region
    *   Click officer card to drill down into `Manager Officer Detail`
*   **Status:** needs wiring

### 15. Manager Officer Detail
*   **Stitch Export Folder:** `manager_officer_detail_polish`
*   **Final Route Path:** `/manager/officer/:officerId`
*   **Allowed Roles:** `manager`
*   **Data Needed from Supabase:** Specific officer location pings, visited path, visit details, performance charts.
*   **Actions/Buttons:**
    *   Date picker
    *   Timeline view map
    *   "Send Alert/Nudge" button
*   **Status:** needs wiring

### 16. Settings & Duty Preferences
*   **Stitch Export Folder:** `settings_duty_preferences`
*   **Final Route Path:** `/settings`
*   **Allowed Roles:** `sales_officer` / `manager`
*   **Data Needed from Supabase:** Profile details, configurations.
*   **Actions/Buttons:**
    *   Language switch toggle (English/Bangla)
    *   Working hours preferences
    *   Duty status toggle (Online / Offline)
    *   Logout button (Red button)
*   **Status:** needs wiring

---

## Route Plan & Route Map

```
/login                          --> Login & Role Selection
/duty                           --> Duty Tracking Consent
/today                          --> Today Dashboard
/route                          --> Optimized Route
/map                            --> Field Map Intelligence
/visit-plan                     --> Today’s Visit Plan
/visit-prep/:dealerId           --> Visit Preparation
/active-visit/:visitId          --> Active Visit
/coach                          --> Sales Coach
/timeline                       --> Tracking Timeline
/end-day-report                 --> End-of-Day Report
/followups                      --> Pending Follow-ups
/offline-sync                   --> Offline & Sync States
/manager                        --> Manager Dashboard
/manager/officer/:officerId     --> Manager Officer Detail
/settings                       --> Settings & Duty Preferences
```
