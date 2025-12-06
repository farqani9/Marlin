# **UI DEVELOPMENT PLAN (Auth-Free Internal CRM)**

**All screens + all components + detailed behavior + UI flow.**

No styling, no colors — pure structural UI plan.

---

# **1️⃣ GLOBAL LAYOUT & SHARED COMPONENTS**

### **App Shell (Main Layout — visible on every screen)**

**Components:**

- **SidebarNav**
    - Logo / branding (small)
    - Main navigational items:
        - Dashboard
        - Leads
        - Deals
        - Tasks
        - Search (optional)
        - Settings (minimal)
- **TopBar**
    - Current page title
    - Global search button (opens search overlay)
    - Notifications icon (optional)
- **ContentArea**
    - Container where each screen renders
- **GlobalOverlays**
    - Command palette (Cmd+K)
    - Create modal/drawer (Lead, Deal, Task)
    - Toast messages

---

# **2️⃣ SCREENS + COMPONENTS (FULL DETAIL)**

---

## **A. Dashboard Screen**

**Route:** `/dashboard`

**Purpose:** Overview of pipeline, activity & tasks.

**Layout Structure:**

### **1. Page Header**

- Title: “Dashboard”
- No primary action needed here

### **2. Summary Cards Row**

Each card displays:

- Metric title (e.g., “Pipeline Value”)
- Metric number
- Small subline (e.g., “From 12 active deals”)

Cards:

- Total pipeline value
- Open deals
- New leads this week
- Tasks due today

### **3. Upcoming Tasks Section**

Components:

- Section header (“Upcoming Tasks”)
- TaskList:
    - Checkbox
    - Task title
    - Due date
    - Linked entity (Lead/Deal)
- Each task is clickable → opens detail screen of linked entity

### **4. Recent Activity Section**

Components:

- Section header (“Recent Activity”)
- ActivityFeed:
    
    Each entry:
    
    - Icon (type of activity)
    - Entity name (clickable)
    - Description:
        - “Deal moved from Qualified → Proposal”
        - “Task completed: Send invoice”
    - Timestamp

---

## **B. Leads Module**

---

### **1. Leads List View (default)**

**Route:** `/leads`

### **Page header**

- Title: “Leads”
- Primary action: **“New Lead”** → opens FormDrawer

### **FilterBar**

- Search input (name, company)
- Filters:
    - Status (dropdown)
    - Source (dropdown)
    - Priority (dropdown)
- Buttons:
    - Save View
    - Clear filters

### **ViewToggle**

- Buttons:
    - List View
    - Board View

### **DataTable (Core Component)**

Columns:

- Lead name (clickable)
- Company
- Contact (email/phone)
- Status (badge)
- Lead Source
- Next Action
- Next Action Date

Row behavior:

- Click → Lead Detail screen
- Row menu (ellipsis):
    - Edit
    - Delete

If no leads:

- EmptyState with CTA: “Create your first lead”

---

### **2. Leads Board View (Kanban)**

**Route:** `/leads?view=board`

### **Columns**

- New
- Qualified
- In Discussion
- Proposal Sent
- Follow-up Required

### **Cards**

Card displays:

- Lead name
- Company
- Status
- Next action date
- Small priority indicator (if set)

### **Drag and drop**

- Moving a card updates status
- Activity log entry created in background

---

### **3. Create / Edit Lead Form**

**Opened from:**

- New Lead button
- Row menu → Edit

**FormDrawer structure:**

- Lead Name (required)
- Company
- Contact Name
- Email
- Phone
- Status (dropdown)
- Lead Source
- Priority (dropdown)
- Next Action
- Next Action Date

Bottom:

- Save button
- Cancel button

---

### **4. Lead Detail Screen**

**Route:** `/leads/[id]`

### **Header**

- Lead Name
- Company (optional link)
- Status badge (editable)
- Right-aligned actions:
    - Edit
    - Create Deal
    - Delete (in dropdown)

### **Main Content (Tabs)**

### **Tab 1: Overview**

- **Details Panel:**
    - All lead field values in read-mode
    - Editable field-by-field inline (optional)
- **Related Deals Panel:**
    - List of deals linked to this lead
    - “Create Deal” inline button
- **Next Action Widget:**
    - Text + date
    - Quick edit button

### **Tab 2: Activity**

- Activity timeline
    - Status changes
    - Notes added
    - Tasks created/completed

### **Tab 3: Notes**

- Rich text editor area
- Auto-save

### **Tab 4: Tasks**

- TaskList filtered to this lead
- Quick add task input at top

### **Right Sidebar (always visible on this screen)**

- Quick Add Task
- Quick Add Note
- Summary Card:
    - Priority
    - Next action date

---

## **C. Deals Module**

---

### **1. Deals Board View (Primary View)**

**Route:** `/deals`

### **Page Header**

- Title: “Deals”
- Primary Button: “New Deal”

### **FilterBar**

- Search (deal name or company)
- Stage filter
- Value range filter

### **Board Columns**

- New
- Qualified
- Proposal
- Negotiation
- Closed Won
- Closed Lost

### **Deal Cards**

Info shown:

- Deal title
- Company
- Value
- Probability
- Expected close date

### **Drag & Drop Functionality**

- Moves deal between stages
- Auto-creates activity entry

---

### **2. Deals List View (optional)**

**Route:** `/deals?view=list`

### **Table Columns**

- Deal Title
- Lead / Company
- Stage
- Value
- Probability
- Expected Close Date

---

### **3. Create / Edit Deal Form**

**Opened from:**

- Dashboard widget
- Lead detail screen
- Deals board/list
- Cmd+K palette

### **FormDrawer Fields**

- Deal Title
- Linked Lead (dropdown)
- Value
- Stage
- Probability (%)
- Expected Close Date
- Short note (optional)

---

### **4. Deal Detail Screen**

**Route:** `/deals/[id]`

### **Header**

- Deal title
- Stage dropdown
- Value
- Actions: Edit, Delete

### **Main Tabs**

### **Overview**

- Key fields:
    - Lead / Company (clickable link)
    - Value
    - Stage
    - Probability
    - Expected close date

### **Activity**

- Timeline of stage changes, tasks, notes

### **Notes**

- Rich text area

### **Tasks**

- List of tasks for this deal
- Quick add task input

### **Right Sidebar**

- Probability
- Expected close date
- Quick Add Task
- Quick Add Note

---

## **D. Tasks Module**

---

### **1. Tasks List Screen**

**Route:** `/tasks`

### **Page Header**

- Title: “Tasks”

### **Quick Filters**

Buttons:

- Today
- Upcoming
- Overdue

### **TaskList**

Each row displays:

- Checkbox
- Title
- Due date
- Linked Lead/Deal
- Clicking → opens linked entity’s detail page

---

### **2. Create/Edit Task Form**

**FormDrawer:**

- Title
- Due date
- Link to (Lead or Deal)
- Description (optional)

---

## **E. Search**

### **1. Search Overlay**

Triggered via Cmd+K or search button.

### **Overlay Layout**

- Search input
- Result sections:
    - Leads
    - Deals
    - Tasks

Each list item:

- Title
- Type badge (Lead/Deal/Task)
- Snippet (company, value, etc.)
- Click → detail page

---

## **F. Settings (Minimal)**

### **1. Workspace Settings**

**Route:** `/settings`

Fields:

- Workspace name
- Pipeline stage names (read-only for MVP or editable if desired)

---

# **3️⃣ UI FLOW (AUTH-FREE VERSION)**

### **App Entry**

→ `/dashboard`

### **Main Navigation**

Sidebar links:

- Dashboard → `/dashboard`
- Leads → `/leads`
    - Click lead → `/leads/[id]`
    - Switch view → `?view=board`
- Deals → `/deals`
    - Click card → `/deals/[id]`
- Tasks → `/tasks`
    - Click task → opens linked entity
- Settings → `/settings`

### **Entity Creation**

Universal methods to create:

- “New Lead”/“New Deal”/“New Task” buttons
- Command Palette (Cmd+K)
- Lead → Create Deal from inside detail
- Deal → Create Task from inside detail

### **Search Flow**

Cmd+K → search overlay → click result → detail page