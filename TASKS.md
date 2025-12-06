# 📋 MVP Development Tasks - Internal B2B CRM

> **Generated from:** `MVP_plan.md` and `UI_dev_plan.md`  
> **Tech Stack:** Next.js, TypeScript, ShadCN UI, TailwindCSS, Zustand, TanStack Query, Supabase  
> **Last Updated:** December 6, 2024

---

## 🏗️ Phase 1: Project Setup & Infrastructure ✅

### 1.1 Project Initialization ✅
- [x] Initialize Next.js project with TypeScript
- [x] Install and configure TailwindCSS v4
- [x] Install and configure ShadCN UI components
- [x] Set up Zustand for UI state management
- [x] Install and configure TanStack Query for server sync
- [x] Set up project folder structure (`/components`, `/lib`, `/app`, `/types`, `/hooks`, `/stores`)
- [x] Create TypeScript entity types (Lead, Deal, Task, Note, ActivityLog)
- [x] Set up TanStack Query provider in layout
- [x] Create Cursor rules for AI assistance (6 rule files)
- [x] Create Design System (`DESIGN_SYSTEM.md`)
- [x] Create mock data system (`/lib/mock-data.ts`)

### 1.2 Supabase Setup (Deferred)
- [ ] Create Supabase project
- [x] Set up Supabase client in Next.js (`src/lib/supabase.ts`)
- [ ] Configure environment variables (.env.local)
- [ ] Create database tables and RLS policies

---

## 🎨 Phase 2: Global Layout & Shared Components ✅

### 2.1 App Shell (Main Layout) ✅
- [x] Create `AppLayout` wrapper component (`/components/layout/app-layout.tsx`)
- [x] Implement `Sidebar` component (logo, nav items, active states)
- [x] Implement `TopBar` component (page title, search button with ⌘K hint)
- [x] Dark theme enabled by default

### 2.2 Global Overlays ✅
- [x] Implement Command Palette (Cmd+K) - `/components/common/command-palette.tsx`
- [x] Create base `FormDrawer` component (reusable) - `/components/common/form-drawer.tsx`
- [x] Implement Toast notification system (sonner) - added to providers
- [x] SearchOverlay functionality included in Command Palette

### 2.3 Shared UI Components ✅
- [x] `SummaryCard` - metric display with icon and trend
- [x] `TaskList` - checkbox + title + due date + linked entity
- [x] `ActivityFeed` - timeline with color-coded activity types
- [x] `StatusBadge` - colored status indicator for leads/deals/priority
- [x] `ViewToggle` - List/Board view switcher
- [x] `EmptyState` - dedicated reusable placeholder component
- [x] `FormDrawer` - reusable drawer for forms
- [x] `CommandPalette` - Cmd+K for navigation and actions
- [x] ShadCN components: button, card, table, badge, input, select, dropdown-menu, sheet, tabs, textarea, separator, sonner, dialog, command

---

## 📊 Phase 3: Dashboard Module ✅

### 3.1 Dashboard Screen (`/dashboard`) ✅
- [x] Create dashboard page route
- [x] Root `/` redirects to `/dashboard`
- [x] Implement page title in TopBar
- [x] Create summary cards row (Pipeline Value, Open Deals, New Leads, Tasks Due)
- [x] Implement Upcoming Tasks section with TaskList
- [x] Implement Recent Activity section with ActivityFeed

### 3.2 Dashboard Data Fetching (Deferred)
- [ ] Connect to Supabase when ready (using mock data for now)

---

## 👥 Phase 4: Leads Module ✅

### 4.1 Leads List View (`/leads`) ✅
- [x] Create leads list page route
- [x] Implement PageHeader with "New Lead" button
- [x] Search input (filters by name/company/email)
- [x] Status dropdown filter
- [x] DataTable with columns: Name, Company, Email, Status, Priority, Next Action
- [x] Clickable lead names link to detail page
- [x] Row action menu (Edit, Delete)
- [x] Empty state when no leads match filters

### 4.2 Lead Detail Screen (`/leads/[id]`) ✅
- [x] Create lead detail page route with dynamic ID
- [x] Header with lead name, company, status/priority badges
- [x] Action buttons: Create Deal, Edit, Delete
- [x] **Tab navigation:** Overview, Activity, Notes, Tasks
- [x] **Overview tab:** Contact details card, Related deals list
- [x] **Activity tab:** Activity timeline
- [x] **Notes tab:** Textarea for notes
- [x] **Tasks tab:** Task list with checkboxes
- [x] **Right Sidebar:** Next Action, Quick Add, Summary cards

### 4.3 Leads - Forms & Board View ✅
- [x] Create/Edit Lead form (FormDrawer) - `/components/leads/lead-form-drawer.tsx`
- [x] Board view (Kanban) with drag-and-drop - `/components/leads/leads-board-view.tsx`
- [x] ViewToggle for switching List/Board views
- [x] CRUD operations with local state (create, edit, delete) + toast notifications
- [ ] Connect to Supabase when ready

---

## 💰 Phase 5: Deals Module ✅

### 5.1 Deals Board View (`/deals`) ✅
- [x] Create deals page route
- [x] Pipeline summary cards (Open Deals, Pipeline Value, Weighted Value)
- [x] Implement Kanban board (columns: New, Qualified, Proposal, Negotiation, Won, Lost)
- [x] Deal cards (title, lead name, value, probability, expected close)
- [x] Drag-and-drop between stages with toast notifications
- [x] Search and stage filter

### 5.2 Deal Detail Screen (`/deals/[id]`) ✅
- [x] Create deal detail page with tabs (Overview, Activity, Notes, Tasks)
- [x] Header with deal title, stage badge, value
- [x] Link back to lead
- [x] Right sidebar with weighted value and summary

### 5.3 Create/Edit Deal Form ✅
- [x] FormDrawer with fields: Title, Lead, Value, Stage, Probability, Close Date, Notes
- [x] Probability auto-updates based on stage
- [x] Lead selection from mock data

### 5.4 Deals - Pending
- [ ] Connect to Supabase when ready

---

## ✅ Phase 6: Tasks Module ✅

### 6.1 Tasks List Screen (`/tasks`) ✅
- [x] Create tasks page route
- [x] Stats cards (Total, Due Today, Overdue, Completed)
- [x] Quick filter buttons: All, Today, Upcoming, Overdue, No Date
- [x] Task cards with checkbox completion toggle
- [x] Linked entity badges (Lead/Deal) with click navigation
- [x] Search functionality

### 6.2 Create/Edit Task Form ✅
- [x] FormDrawer with fields: Title, Description, Due Date, Link to Lead, Link to Deal
- [x] Toast notifications on create/complete

---

## ⚙️ Phase 7: Settings & Polish

### 7.1 Settings Screen (`/settings`)
- [ ] Workspace name field
- [ ] Pipeline stage customization (optional)

### 7.2 Polish Items
- [ ] Toast notifications for actions
- [ ] Form validation with Zod
- [ ] Loading states and skeletons
- [ ] Error handling
- [ ] Responsive design (mobile sidebar)

---

## 🚀 Phase 8: Deployment

- [ ] Configure Vercel project
- [ ] Set up Supabase production environment
- [ ] Configure environment variables
- [ ] Test production build

---

## 📌 Current Progress Summary

| Phase | Status |
|-------|--------|
| Phase 1: Setup | ✅ Complete |
| Phase 2: Layout | ✅ Complete (overlays deferred) |
| Phase 3: Dashboard | ✅ Complete |
| Phase 4: Leads | ✅ Complete (forms & board deferred) |
| Phase 5: Deals | ⏳ Not Started |
| Phase 6: Tasks | ⏳ Not Started |
| Phase 7: Settings | ⏳ Not Started |
| Phase 8: Deploy | ⏳ Not Started |
