# Fluentra (Web + Android, Non-React)

This project uses a **non-React stack** and targets:
1. Web browsers
2. Android devices (via PWA install in Chrome, and Capacitor-ready structure)

## Stack
- Vanilla HTML/CSS/JavaScript modules
- PWA manifest + service worker
- LocalStorage persistence for gameplay state

## Features
- XP / coins / streak / levels
- Skill tree with unlock prerequisites and costs
- Speaking and writing training actions
- IELTS band projection
- Missions + boss mock exam
- Character unlocks

## Run
```bash
npm run check
npm run start
```
Open `http://localhost:4173`

## Android usage
### Option A: PWA install (fastest)
1. Open the app in Android Chrome.
2. Tap **Add to Home screen**.
3. Launch as standalone app.

### Option B: Package as native Android app
Use Capacitor (no React needed):
1. `npm i -D @capacitor/cli @capacitor/core`
2. `npx cap init fluentra com.fluentra.app --web-dir=web`
3. `npm i -D @capacitor/android`
4. `npx cap add android`
5. `npx cap copy android && npx cap open android`

## File map
- `web/index.html` – web shell + PWA meta
- `web/manifest.webmanifest` – install metadata
- `web/sw.js` – offline caching
- `web/styles.css` – responsive layout for mobile + desktop
- `web/app.js` – main game loop and UI wiring
- `web/data.js` – progression/skills/missions/AI metadata
- `web/ielts.js` – IELTS estimator
