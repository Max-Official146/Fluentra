# Fluentra (iPad-Optimized Web Prototype)

This version is designed for **iPad Safari** (and desktop browsers), with large touch targets, responsive two-pane layout, and persistent local progress.

## Stack
- Vanilla HTML/CSS/JavaScript
- No React Native
- No Expo

## iPad-focused improvements
- Safe-area support (`viewport-fit=cover` + inset-aware spacing)
- Touch-friendly controls (44px+ targets)
- Two-pane layout on tablet widths (main content + sticky side panel)
- Persistent local progress via `localStorage`

## Run locally

```bash
npm run start
```

Open: `http://localhost:4173`

## Quick checks

```bash
npm run check
```

## iPad testing guide
- See `docs/TESTING.md` for full local + iPad testing steps.

## File map
- `web/index.html` – iPad-ready shell and meta tags
- `web/styles.css` – responsive tablet styles
- `web/app.js` – stateful game loop with persistence
- `web/data.js` – progression, skills, missions, AI service metadata
- `web/ielts.js` – IELTS band estimator helper
