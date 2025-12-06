# **📌 MVP PLAN — Internal Notion-Style B2B CRM**

---

## **1️⃣ Product Overview (1-liner vision)**

**A simple, minimal, Notion-style internal CRM that helps teams track leads, deals, tasks, and activity in one distraction-free workspace.**

This CRM is built for speed, clarity, and easy daily use — no clutter, no complexity.

---

## **2️⃣ Finalized MVP Features (Phase 1 Must-Haves)**

### **A. Core Objects**

- **Leads**
- **Deals**
- **Tasks**
- **Notes**
- **Activity Log**

---

### **B. Leads Module**

- List view (table)
- Board (Kanban) view by lead status
- Create/edit/delete lead
- Inline editing
- Lead detail page with:
    - Overview panel
    - Notes tab
    - Tasks tab
    - Activity tab
    - Related deals section
- Quick add task/note from sidebar

---

### **C. Deals Module**

- Pipeline board (drag & drop)
- Optional list view
- Create/edit/delete deals
- Deal detail page with:
    - Overview panel
    - Notes
    - Tasks
    - Activity
    - Lead link

---

### **D. Tasks Module**

- Central task list (Today / Upcoming / Overdue)
- Linked tasks to Leads or Deals
- Quick add task input
- Complete task via checkbox

---

### **E. Notes + Activity**

- Rich text notes for Leads/Deals
- Auto-logged activity timeline:
    - Status changes
    - Deal stage updates
    - Task creation/completion
    - Notes added

---

### **F. Dashboard**

- Summary cards:
    - Total pipeline value
    - Open deals
    - New leads this week
    - Tasks due today
- Upcoming tasks list
- Recent activity timeline

---

### **G. Global Interaction Layer**

- Command Palette (Cmd+K)
    - Create Lead, Deal, Task
    - Navigate to sections
- Search overlay
    - Leads
    - Deals
    - Tasks
- Global modals/drawers for all "Create" forms

---

### **H. Settings (Minimal)**

- Workspace name
- Pipeline stage names (optional for MVP)

---

## **3️⃣ Detailed User Journey**

### **1. User enters the CRM**

Since it’s internal, the app loads directly to the **Dashboard**.

They immediately see:

- Key metrics (pipeline value, deals, leads)
- Tasks due today
- Recent activity

This gives instant situational awareness.

---

### **2. The user navigates to Leads**

They click “Leads” in the sidebar → goes to `/leads`.

They can:

- Add a new lead (drawer opens)
- Switch between List / Board view
- Use filters to narrow down leads
- Click a lead to open the Lead Detail page

---

### **3. The user opens a Lead detail page**

Inside `/leads/[id]`, they see:

- Lead header (name, company, status)
- Main tabs:
    - Overview
    - Notes
    - Tasks
    - Activity
- Right sidebar:
    - Quick Add Task
    - Quick Add Note
    - Next action summary

They add a note and a task for follow-up.

---

### **4. The user turns a lead into a deal**

From the lead detail page → “Create Deal”

A drawer asks for:

- Deal title
- Value
- Expected close date
- Stage

Now the Deal appears in the Deal pipeline.

---

### **5. The user manages Deals**

At `/deals`, they see a Kanban pipeline.

They:

- Drag deals through stages
- Open a deal to update details
- Add notes/tasks
- Track activity and next steps

---

### **6. The user checks Tasks**

At `/tasks`:

- They see Today / Upcoming / Overdue
- Clicking any task opens the linked Lead/Deal
- They complete tasks with one click

---

### **7. The user uses Search or Cmd+K**

They press **Cmd+K** or click search → overlay opens.

They can:

- Jump to a lead/deal
- Create something quickly
- Navigate anywhere fast

---

### **8. The user reviews activity on Dashboard**

Before ending the day:

- They see which leads moved
- Which deals progressed
- What tasks they still have

---

## **4️⃣ Edge Case Notes**

### **Data Relationships**

- Deals must always be linked to a Lead
    
    → Enforce either auto-linking or mandatory selection.
    

### **Deleting Leads**

If user deletes a lead:

- What happens to related deals?
    - MVP: Auto-delete OR archive deals
    - Suggestion: **Archive** to avoid accidental data loss

### **Multiple tasks without due dates**

- They should appear under a “No Date” bucket

### **Kanban limits**

- Prevent moving “Closed Won/Lost” deals to earlier stages unless confirmed

### **Notes**

- Limit note size to prevent performance issues
- Auto-save notes to avoid accidental loss

### **Tasks overdue**

- Must trigger automatically based on backend/server time

### **Search indexing**

- Only index:
    - Lead name
    - Company
    - Deal title
    - Task title
    - Notes (first 500–1000 chars)

### **Minimal settings**

- Stage names editable?
    
    → Optional for MVP
    
    → If yes, ensure all stages have unique IDs to avoid breaking history
    

---

## **5️⃣ Tech Stack + Monetization Plan**

### **Tech Stack**

**Frontend:**

- Next.js
- TypeScript
- ShadCN UI
- TailwindCSS
- Zustand/Jotai for UI state
- TanStack Query for server sync

**Backend:**

- Supabase (DB + Storage + optional cron jobs)
- Supabase functions (for activity automation)

**Database:**

- PostgreSQL (via Supabase)
    - tables: leads, deals, tasks, notes, activity_log, pipeline_stages

**Deployment:**

- Vercel (front)
- Supabase (back)