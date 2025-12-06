<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/ShadCN-UI-000?style=for-the-badge" alt="ShadCN" />
</p>

<h1 align="center">
  🐟 Marlin CRM
</h1>

<p align="center">
  <strong>A sleek, Notion-inspired B2B CRM built for speed and clarity</strong>
</p>

<p align="center">
  Track leads, manage deals, organize tasks — all in one beautiful dark interface.
</p>

---

## ✨ Features

### 📊 Dashboard
- Summary cards with real-time metrics
- Upcoming tasks with linked entities
- Recent activity timeline

### 👥 Leads Module
- **List View** — Searchable, filterable data table
- **Board View** — Kanban with drag-and-drop
- **Detail Page** — Tabbed interface (Overview, Activity, Notes, Tasks)
- **Quick Actions** — Create, edit, delete with toast notifications

### 🎯 Coming Soon
- 💰 Deals Module (Kanban pipeline)
- ✅ Tasks Module
- ⚡ Command Palette (Cmd+K)
- 🔌 Supabase Integration

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | TailwindCSS v4 |
| **Components** | ShadCN UI |
| **State** | Zustand + TanStack Query |
| **Database** | Supabase (coming soon) |
| **Icons** | Lucide React |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/farqani9/Marlin.git
cd Marlin

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to the dashboard.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Dashboard with metrics
│   ├── leads/              # Leads list & detail pages
│   └── ...
├── components/
│   ├── common/             # Reusable components
│   ├── layout/             # App shell (Sidebar, TopBar)
│   ├── leads/              # Lead-specific components
│   └── ui/                 # ShadCN UI components
├── lib/                    # Utilities & mock data
├── stores/                 # Zustand stores
└── types/                  # TypeScript types
```

---

## 🎨 Design System

This project follows a comprehensive design system inspired by **ShadCN's dark theme**:

- **Colors**: Zinc/Slate palette with semantic status colors
- **Typography**: Geist font family
- **Components**: Consistent spacing, borders, and animations
- **Icons**: Lucide React (16-24px)

See [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) for full documentation.

---

## 📝 Development

```bash
# Run development server
npm run dev

# Type check
npx tsc --noEmit

# Build for production
npm run build

# Start production server
npm start
```

---

## 🗺️ Roadmap

- [x] Project Setup & Design System
- [x] Global Layout (Sidebar, TopBar, Command Palette)
- [x] Dashboard Module
- [x] Leads Module (List, Board, Detail, Forms)
- [ ] Deals Module
- [ ] Tasks Module
- [ ] Settings Page
- [ ] Supabase Integration
- [ ] Deployment

---

## 📄 License

MIT © 2024

---

<p align="center">
  Built with ☕ and <a href="https://nextjs.org">Next.js</a>
</p>
