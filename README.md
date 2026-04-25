# Fluentra (Web Prototype)

You asked for a non-React-Native implementation.
This project is now a **framework-free web app** (HTML/CSS/JavaScript modules).

## Stack
- Vanilla HTML/CSS/JavaScript
- No React Native
- No Expo

## Features implemented
- XP / coins / streak / levels
- Skill tree with unlock prerequisites and costs
- Speaking practice actions
- Writing practice actions + IELTS band projection
- Missions and boss mock IELTS exam
- Profile progression and character unlocks
- AI integration endpoint placeholders

## Run

```bash
npm run start
```

Open: `http://localhost:4173`

## Quick checks

```bash
npm run check
```

## File map
- `web/index.html` – app shell
- `web/styles.css` – dark gamified UI
- `web/app.js` – interaction logic and game loop
- `web/data.js` – progression, missions, skills, AI service data
- `web/ielts.js` – IELTS band estimator helper
