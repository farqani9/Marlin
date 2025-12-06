# Marlin CRM Design System

> **Theme:** ShadCN-inspired dark mode  
> **Reference:** https://ui.shadcn.com/

---

## Color Palette

### Background Colors
| Token | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| `background` | `--background` | `#09090b` | Main app background |
| `card` | `--card` | `#0a0a0b` | Card/panel backgrounds |
| `popover` | `--popover` | `#0a0a0b` | Dropdowns, modals |
| `muted` | `--muted` | `#27272a` | Subtle backgrounds, hover states |

### Foreground Colors
| Token | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| `foreground` | `--foreground` | `#fafafa` | Primary text |
| `muted-foreground` | `--muted-foreground` | `#a1a1aa` | Secondary text, placeholders |
| `card-foreground` | `--card-foreground` | `#fafafa` | Text on cards |

### Border & Accent Colors
| Token | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| `border` | `--border` | `#27272a` | Borders, dividers |
| `input` | `--input` | `#27272a` | Input borders |
| `ring` | `--ring` | `#d4d4d8` | Focus rings |
| `primary` | `--primary` | `#fafafa` | Primary buttons, active states |
| `primary-foreground` | `--primary-foreground` | `#18181b` | Text on primary |
| `secondary` | `--secondary` | `#27272a` | Secondary buttons |
| `accent` | `--accent` | `#27272a` | Hover backgrounds |

### Semantic Colors
| Token | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| `destructive` | `--destructive` | `#7f1d1d` | Delete, error actions |
| `success` | Custom | `#166534` | Success states |
| `warning` | Custom | `#854d0e` | Warning states |

---

## Typography

### Font Family
```css
--font-sans: "Geist", system-ui, sans-serif;
--font-mono: "Geist Mono", monospace;
```

### Font Sizes
| Name | Size | Line Height | Usage |
|------|------|-------------|-------|
| `xs` | 12px | 16px | Badges, captions |
| `sm` | 14px | 20px | Secondary text, table cells |
| `base` | 16px | 24px | Body text |
| `lg` | 18px | 28px | Subheadings |
| `xl` | 20px | 28px | Section titles |
| `2xl` | 24px | 32px | Page titles |
| `3xl` | 30px | 36px | Dashboard metrics |

### Font Weights
- `normal` (400) — Body text
- `medium` (500) — Labels, nav items
- `semibold` (600) — Headings, buttons
- `bold` (700) — Emphasis, metrics

---

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `0` | 0 | Reset |
| `1` | 4px | Tight spacing |
| `2` | 8px | Icon gaps, small padding |
| `3` | 12px | Input padding |
| `4` | 16px | Card padding, section gaps |
| `5` | 20px | Larger gaps |
| `6` | 24px | Section spacing |
| `8` | 32px | Large section gaps |
| `10` | 40px | Page margins |
| `12` | 48px | Major sections |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 4px | Small elements (badges) |
| `md` | 6px | Buttons, inputs |
| `lg` | 8px | Cards, panels |
| `xl` | 12px | Modals, large cards |
| `full` | 9999px | Avatars, pills |

---

## Shadows

```css
/* Subtle shadow for cards */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* Elevated elements */
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

/* Modals, dropdowns */
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
```

---

## Layout Structure

### Sidebar
- **Width:** 240px (expanded), 60px (collapsed)
- **Background:** `--muted` or slightly lighter than main bg
- **Logo height:** 48px
- **Nav item height:** 40px
- **Nav item padding:** 12px horizontal
- **Active indicator:** Left border 2px `--primary`

### Top Bar
- **Height:** 56px
- **Border:** Bottom 1px `--border`
- **Padding:** 16px horizontal

### Content Area
- **Max width:** 1400px (centered)
- **Padding:** 24px (desktop), 16px (mobile)
- **Gap between sections:** 24px

### Cards
- **Padding:** 16px (compact), 24px (standard)
- **Border:** 1px `--border`
- **Border radius:** `lg` (8px)
- **Background:** `--card`

---

## Component Patterns

### Summary Card
```
┌─────────────────────────┐
│ Label (muted-foreground)│
│ $124,500 (3xl, bold)    │
│ +12% from last week (sm)│
└─────────────────────────┘
```

### Navigation Item
```
[ Icon ]  Label
  Active: bg-accent, text-foreground, left-border primary
  Hover: bg-accent/50
  Default: text-muted-foreground
```

### Data Table Row
```
│ Name │ Company │ Status │ Actions │
  Hover: bg-muted
  Selected: bg-accent
  Border: bottom 1px --border
```

### Task List Item
```
[ ] Task title               Dec 15
    └── Lead: Acme Corp (badge)
  Checkbox uses primary color when checked
```

### Activity Feed Item
```
● Icon   Entity moved from Stage A → Stage B
         2 hours ago
  Timeline line: 1px --border
```

---

## Status Colors (Badges)

| Status | Background | Text |
|--------|------------|------|
| New | `bg-blue-500/10` | `text-blue-500` |
| Qualified | `bg-green-500/10` | `text-green-500` |
| In Discussion | `bg-yellow-500/10` | `text-yellow-500` |
| Proposal Sent | `bg-purple-500/10` | `text-purple-500` |
| Follow-up | `bg-orange-500/10` | `text-orange-500` |
| Closed Won | `bg-emerald-500/10` | `text-emerald-500` |
| Closed Lost | `bg-red-500/10` | `text-red-500` |

### Priority Indicators
| Priority | Color |
|----------|-------|
| High | `text-red-500` |
| Medium | `text-yellow-500` |
| Low | `text-muted-foreground` |

---

## Animation & Transitions

```css
/* Default transition */
transition: all 150ms ease;

/* Hover states */
transition: background-color 150ms ease, color 150ms ease;

/* Modals/Drawers */
transition: transform 200ms ease-out, opacity 200ms ease-out;

/* Skeleton loading */
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

---

## Responsive Breakpoints

| Name | Min Width | Usage |
|------|-----------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Extra large |

### Layout Behavior
- **< 768px:** Sidebar hidden, hamburger menu
- **768px - 1024px:** Sidebar collapsed (icons only)
- **> 1024px:** Sidebar expanded

---

## Iconography

- **Library:** Lucide React (bundled with ShadCN)
- **Size:** 16px (inline), 20px (nav), 24px (headers)
- **Stroke width:** 2px (default), 1.5px (subtle)
- **Color:** `currentColor` (inherits text color)

### Common Icons
| Usage | Icon |
|-------|------|
| Dashboard | `LayoutDashboard` |
| Leads | `Users` |
| Deals | `Briefcase` |
| Tasks | `CheckSquare` |
| Settings | `Settings` |
| Search | `Search` |
| Add | `Plus` |
| Edit | `Pencil` |
| Delete | `Trash2` |
| More | `MoreHorizontal` |

---

## Accessibility

- Focus rings visible on keyboard navigation
- Minimum contrast ratio: 4.5:1 for text
- Interactive elements: minimum 44x44px touch target
- ARIA labels on icon-only buttons
- Keyboard navigable modals and dropdowns
