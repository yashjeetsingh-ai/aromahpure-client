# Aromapure Air - Client Dashboard Guide

## 🎨 Design System

### Brand Colors
- **Primary**: Deep Forest Green `#354C47`
- **Secondary**: Sage Grey `#A6B1A0`
- **Accent**: Gold `#D4B56A`
- **Success**: `#7FC37E`
- **Warning**: `#FFA500`
- **Danger**: `#D9534F`

### Typography
- **Primary Font**: Poppins (300-800 weights)
- **Logo Font**: Great Vibes (cursive)
- **Body**: Inter (fallback)

### UI Elements
- **Border Radius**: 20-28px (1.25rem - 1.75rem)
- **Glass Morphism**: `bg-white/10 backdrop-blur-md`
- **Shadows**: Soft drop shadows with glow effects
- **Animations**: Framer Motion for smooth transitions

---

## 📱 Screens Overview

### Screen 1: Client Dashboard Overview (`/dashboard`)
**Features:**
- 2×2 grid of summary cards (Total Machines, Active, Needs Refill, Upcoming Maintenance)
- Swipeable quick stats cards with animated meters
- Quick action buttons
- Animated wave background

**Key Components:**
- Summary cards with gradient backgrounds
- Oil level progress bars with smooth animations
- Shimmer effects on stat cards

---

### Screen 2: My Machines List (`/machines`)
**Features:**
- Search bar with real-time filtering
- Filter pills (All, Good, Medium, Low, Urgent)
- Sort dropdown (Location, Oil Level, Refill Date)
- Machine cards with:
  - Machine name, location, code, SKU
  - Status pills (Installed, Assigned, Offline)
  - Oil level progress bar with color coding
  - Usage rate and last refill date
  - Online/offline indicator

**Interactions:**
- Tap card → Navigate to machine detail
- Filter by oil level status
- Search by name, location, or code

---

### Screen 3: Machine Detail Modal (`/machine/:id`)
**Features:**
- Device header with online/offline status
- WiFi enabled badge
- **Running Frequency**: Circular animated ring meter (Apple-style)
- **Last Refill Date**: Calendar card with highlight
- **Oil Level**: Large circular gauge with smooth animation
- **Device Errors**: Alert cards for active issues
- **History Buttons**: Refill History, Maintenance, Error Logs

**Animations:**
- Circular meters animate from 0 to target value
- Oil level gauge with color coding (green/yellow/orange/red)

---

### Screen 4: Refill History (`/refill-history`)
**Features:**
- Search bar for fragrance codes or notes
- Date range filters (All, This Week, This Month, This Year)
- Stats banner (Total Refills, Volume Refilled)
- Refill cards showing:
  - Date, time, technician name
  - Amount added (+XXX ml)
  - Before → After level visualization
  - Fragrance code badge
  - Notes
- Bottom stats (This Month, This Year)

---

### Screen 5: Maintenance & Service (`/maintenance`)
**Features:**
- Tab switcher (Upcoming | Completed)
- Analytics banner:
  - Total Visits
  - Completed count
  - Pending count
  - Next Scheduled Visit (highlighted)
- Service cards with:
  - Visit date
  - Technician name
  - Machine name and location
  - Status pill (Pending, Assigned, Completed)
  - Notes section
  - Status icons

---

### Screen 6: Usage Analytics (`/analytics`)
**Features:**
- **Usage Over Time**: Animated line chart (7-day view)
- **Level Trends**: Animated progress bars showing level drops
- **Refill Frequency**: Monthly bar chart
- **Machine Comparison**: Horizontal bar sliders
- **Predictions Card**:
  - Estimated Next Refill Date
  - Days Until Empty
  - Recommended refill schedule

**Chart Animations:**
- Line charts animate path drawing
- Bar charts fill from 0 to target
- Smooth transitions between data points

---

### Screen 7: Account Information (`/account`)
**Features:**
- Profile card with:
  - Company name and contact person
  - Avatar icon
  - Email, phone, address
  - Edit button
- Settings list:
  - Notifications preferences
  - Change password
- Logout section with confirmation

---

## 🎯 Navigation

### Bottom Navigation Bar
- **Home** (`/dashboard`) - Main dashboard
- **Account** (`/account`) - Profile and settings
- **Alerts** (`/alerts`) - System alerts

### Quick Actions
- Dashboard → Machines List
- Dashboard → Analytics
- Machine Detail → Refill History
- Machine Detail → Maintenance
- Machine Detail → Error Logs

---

## ✨ Animations & Interactions

### Page Transitions
- Fade-in on page load
- Slide-up for cards
- Scale-in for summary cards

### Micro-interactions
- Button press: Scale to 0.95
- Card hover: Scale 1.02, lift -4px
- Tab switching: Smooth fade transition
- Progress bars: Animate from 0 to target

### Background
- Animated wave patterns (subtle, non-distracting)
- Gradient overlays with pulse effects
- Layered SVG shapes

---

## 📦 Component Structure

```
src/
├── pages/
│   ├── ClientDashboardPage.jsx      # Screen 1
│   ├── MachinesListPage.jsx       # Screen 2
│   ├── MachineDetailModalPage.jsx # Screen 3
│   ├── RefillHistoryPage.jsx     # Screen 4
│   ├── MaintenancePage.jsx        # Screen 5
│   ├── AnalyticsPage.jsx          # Screen 6
│   └── AccountPage.jsx            # Screen 7
├── components/
│   ├── ui/
│   │   ├── AnimatedWaveBackground.jsx
│   │   ├── Button.jsx
│   │   └── Card.jsx
│   └── BottomNavigation.jsx
└── config/
    └── theme.js
```

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Login credentials:**
   - Username: `Yash`
   - Password: `123`

4. **Navigate to dashboard:**
   - After login, you'll be redirected to `/dashboard`
   - Use bottom navigation to switch between screens
   - Tap machine cards to view details

---

## 🎨 Design Principles

1. **Mobile-First**: All screens optimized for 360×760 viewport
2. **Card-Based Layout**: No dense tables, everything in cards
3. **Smooth Animations**: All transitions use Framer Motion
4. **Glass Morphism**: Consistent glass effect across UI
5. **Color Coding**: Status indicators use semantic colors
6. **Accessibility**: Proper contrast ratios and touch targets

---

## 📝 Notes

- All data is client-side (no backend required)
- Charts use SVG for smooth animations
- Responsive design for mobile screens only
- All text is prop-based (no hard-coded strings in components)
- Logout functionality works across all screens

---

## 🔄 Future Enhancements

- Real-time data updates
- Push notifications
- Offline mode support
- Dark/light theme toggle
- Multi-language support
- Advanced filtering options

