# Testing (iPad + Web)

## 1) Start locally on your computer
```bash
npm run check
npm run start
```
App URL: `http://localhost:4173`

## 2) Test in desktop browser first
- Open app and confirm tabs switch correctly.
- Trigger lesson/check-in/mission/boss actions.
- Refresh page and verify progress persists (localStorage).

## 3) Test directly on iPad (Safari)

### Option A: same Wi-Fi local network (recommended)
1. On your computer, find LAN IP (example: `192.168.1.20`).
2. Start app: `npm run start`.
3. On iPad Safari, open: `http://<YOUR_LAN_IP>:4173`.
4. Verify UI scales for tablet and buttons are touch-friendly.

### Option B: remote tunnel (if LAN blocked)
- Use a secure tunnel tool (Cloudflare Tunnel / ngrok) to expose local port `4173`, then open that URL on iPad.

## 4) iPad-specific checks
- Portrait + landscape both look correct.
- Tabs/buttons are easy to tap (no accidental misses).
- Sticky side panel is visible on wider layout.
- Safe-area spacing looks correct near top/bottom edges.
- Progress state remains after Safari refresh.

## 5) Functional checks by tab

### Learn
- Complete lesson: XP/coins/lesson count increase.
- Daily check-in: streak and coins increase.
- Unlock eligible skills: coins decrease and skill changes to `Unlocked`.

### Speak
- Trigger each speaking action and verify XP/coins increase.

### Write
- Trigger writing actions and verify XP/coins increase.
- Verify IELTS projection card values render.

### Arena
- Claim each mission once: first claim rewards, then shows `Done`.
- Boss exam: rewards are added and exam history updates.

### Profile
- Verify HUD and side panel stats reflect actions.
- Verify progress bar and character unlocks update with level.
