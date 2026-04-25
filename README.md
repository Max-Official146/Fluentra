# Fluentra Mobile (Interactive Prototype)

Fluentra is a gamified English-learning mobile app prototype focused on:
- Beginner → Advanced progression
- IELTS speaking/writing seriousness
- Professional English fluency for work

This version is now **interactive**, not just static UI.

## Implemented in this prototype

### Core progression
- XP, coins, level system
- Daily streak check-in
- Lesson completion rewards
- Character unlocks by level

### Skill tree
- Unlockable nodes across:
  - Grammar
  - Speaking
  - Writing
  - Vocabulary
- Prerequisite-based unlocking and coin costs

### Speaking practice
- Sentence repetition mode action
- AI conversation simulation action
- Real-life scenario roleplay action
- IELTS speaking simulator action

### Writing practice
- Sentence correction action
- Paragraph building action
- Essay band projection using IELTS utility
- Professional English mission (email/interview/workplace direction)

### Gamification
- Missions with claim rewards
- Boss level mock IELTS exam
- Recent mock exam band history

### AI integration stubs
- Pronunciation coach endpoint contract
- GPT conversation endpoint contract
- Essay scoring endpoint contract

---

## Quick start

```bash
git clone <repo-url>
cd Fluentra
npm install
npm run start
```

Then run on device/emulator using Expo controls (`a`, `i`, or QR code).

---

## File map

- `App.tsx` – Main interactive app loop and tabbed experience
- `src/data/skillTree.ts` – Skill tree nodes and requirements
- `src/data/progression.ts` – Level thresholds, avatars, missions
- `src/engine/ielts.ts` – IELTS score estimator helper
- `src/ai/services.ts` – AI endpoint metadata/contracts

