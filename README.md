# Fluentra – Gamified IELTS + Professional English Mobile App

Fluentra is a mobile-first concept and scaffold for an addictive, game-driven English learning experience that starts at beginner level and scales to IELTS + professional fluency.

## Product Direction

### 1) End-to-end progression (Beginner → Pro)
- **Player loop:** lesson → XP → coins → rewards → unlocks → harder quests.
- **Level design:** foundational language literacy, intermediate communication, advanced real-world scenarios, pro IELTS + workplace performance.
- **Economy:** coins for skill unlocks, avatar progression, and cosmetics.

### 2) Skill tree system
- Four core tracks:
  - Grammar
  - Speaking
  - Writing
  - Vocabulary
- Tiered nodes from beginner to pro with prerequisites, XP rewards, and coin costs.

### 3) Speaking practice ladder
- Beginner: sentence repetition with pronunciation scoring.
- Intermediate: AI conversation simulations.
- Advanced: real-life scenario roleplays.
- Pro: IELTS speaking test simulator with time pressure + rubric scoring.

### 4) Writing practice ladder
- Sentence correction.
- Paragraph building.
- Essay writing with AI evaluation and IELTS-style band scoring.

### 5) Gamification mechanics
- Daily streaks.
- Weekly leaderboards.
- Missions and limited-time challenges.
- Boss levels via mock IELTS exams.

### 6) UX style
- Dark-theme visual identity.
- Map-based journey progression.
- Character/avatar unlocks.
- Smooth reward feedback and animation-ready card components.

### 7) AI integration
- Speech recognition for pronunciation.
- GPT-based conversation partner.
- Essay correction + criterion-level scoring.

### 8) Professional English mode
- Business email writing.
- Interview simulation.
- Workplace communication and etiquette.

---

## Code Scaffold Included

- `App.tsx`: modern dark-theme showcase screen integrating progression, skill tree, mission system, AI service architecture, and IELTS score preview.
- `src/data/skillTree.ts`: unlockable multi-track skill tree.
- `src/data/progression.ts`: levels, avatars, and missions.
- `src/engine/ielts.ts`: reusable IELTS-style band estimation engine.
- `src/ai/services.ts`: API contract stubs for AI-powered speaking/writing features.

## Suggested Next Build Steps
1. Add navigation with tabs (`Learn`, `Speak`, `Write`, `Arena`, `Profile`).
2. Add backend services for XP economy, streak persistence, and leaderboards.
3. Integrate speech-to-text and phoneme scoring provider.
4. Wire GPT conversation + essay scorer endpoints.
5. Add weekly boss exams and season passes for retention loops.

## Run

```bash
npm install
npm run start
```
