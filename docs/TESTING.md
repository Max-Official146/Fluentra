# Testing (Web + Android)

## 1) Local sanity checks
```bash
npm run check
npm run start
```
Open `http://localhost:4173`.

## 2) Web functional checks
- Switch tabs (Learn/Speak/Write/Arena/Profile).
- Complete lesson/check-in and verify XP/coins/streak updates.
- Unlock skills and verify coin deduction + unlock state.
- Claim missions once and verify no double-reward.
- Run boss exam and confirm history updates.
- Refresh page and verify state persists.

## 3) Android Chrome (PWA) checks
1. Open app URL on Android Chrome.
2. Install with "Add to Home screen".
3. Launch installed app icon.
4. Verify:
   - app opens fullscreen/standalone,
   - actions work with touch,
   - data persists after app close/reopen,
   - app still loads basic UI when briefly offline (cached shell).

## 4) Optional native Android packaging checks (Capacitor)
- Build + open Android project using steps from README.
- Verify web assets load in WebView and gameplay functions the same as browser.
