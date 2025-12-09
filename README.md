# AromaPure Air - Device Management App

A premium mobile-first UI for managing AromaPure Air devices with a luxurious dark green theme.

## Features

- 🎨 **Luxury Design**: Dark green theme with premium typography and smooth animations
- 📱 **Mobile-First**: Optimized for 360×760 mobile screens
- ✨ **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- 🎯 **Component-Based**: Reusable UI components with consistent styling
- ♿ **Accessible**: Built with accessibility best practices

## Tech Stack

- React 18
- TailwindCSS
- Framer Motion
- React Router
- Lucide React (Icons)
- Vite

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build

```bash
npm run build
```

## Login Credentials

- Username: `Yash`
- Password: `123`

## Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── BackgroundShapes.jsx
│   ├── DeviceCard.jsx
│   └── BottomNavigation.jsx
├── pages/
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   └── DeviceDetailPage.jsx
├── config/
│   └── theme.js
├── App.jsx
├── main.jsx
└── index.css
```

## Design System

### Colors
- Primary: `#3E4F46` (Deep Green)
- Secondary: `#9DB0A4` (Pastel Sage)
- Accent: `#FFD87A` (Gold)
- Success: `#7FC37E`
- Danger: `#D9534F`

### Typography
- Headings: Playfair Display (Serif)
- Body: Inter (Sans-serif)
- Rounded: Nunito

## Components

### Pages
1. **LoginPage**: User/Vendor selection with branding animation
2. **DashboardPage**: Grid of client logos and device cards
3. **DeviceDetailPage**: Detailed device view with circular meters and gauges

### Reusable Components
- `Button`: Multiple variants with hover and press animations
- `Card`: Glass morphism cards with hover effects
- `DeviceCard`: Device status cards with icons
- `BottomNavigation`: Sticky bottom nav with active states
- `BackgroundShapes`: Abstract layered SVG shapes

## License

MIT

