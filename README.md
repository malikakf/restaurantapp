# 🍽️ RestaurantOS

> **Professional Restaurant Management System** — A modern, mobile-first PWA built for the fast-paced restaurant environment.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)

---

## ✨ Features

- 🧑‍🍳 **Waiter View** — Browse the full menu, add items to an order, and send to kitchen/bar with one tap
- 👨‍🍳 **Kitchen Display** — Real-time food order queue with live timers; start cooking and mark ready
- 🍸 **Bar Display** — Dedicated drink order queue filtered from mixed orders
- 📊 **Manager Dashboard** — Live stats, floor plan overview, top sellers, and recent order history
- 📱 **Progressive Web App** — Installable on mobile devices, works offline
- 🌑 **Dark luxury UI** — Near-black background with gold accents, glassmorphism cards
- ✨ **Fluid animations** — Framer Motion transitions throughout
- 🔔 **Toast notifications** — Real-time feedback for all key actions
- 🗂️ **12-table floor plan** — Color-coded table status (available / occupied / waiting)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 + vite-plugin-pwa |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| Routing | React Router v6 |
| State | Zustand 4 |
| Icons | Lucide React |
| Notifications | React Hot Toast |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/restaurantapp.git
cd restaurantapp

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Static output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Deploy to Vercel

1. Push the repository to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite — just click **Deploy**

No additional configuration required.

---

## 📱 PWA Installation

On a mobile device, open the app in Chrome or Safari and use "Add to Home Screen" to install it as a native-like app.

---

## 📄 License

MIT — free to use and modify.
