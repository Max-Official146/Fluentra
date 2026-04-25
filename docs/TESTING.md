# Fluentra Testing Guide

This guide explains exactly how to validate the current prototype.

## 1) Install dependencies

```bash
npm install
```

If this fails with registry/proxy errors, fix npm access first (company proxy, VPN, `.npmrc` mirror).

## 2) Static checks

### Type check
```bash
npm run typecheck
```
Expected: command exits with code `0` and no TypeScript errors.

## 3) Run app

```bash
npm run start
```

In Expo terminal:
- press `a` for Android
- press `i` for iOS (macOS)
- or scan QR in Expo Go

## 4) Manual feature test checklist

## Learn tab
- Tap **Complete Beginner Lesson**:
  - XP increases
  - coins increase
  - lessons completed increases
- Tap **Daily Check-in**:
  - streak increases
  - coins increase
- Try unlocking a skill with prerequisites met:
  - coins decrease
  - skill shows `Unlocked`

## Speak tab
- Run each speaking action:
  - repetition, AI conversation, scenario, IELTS simulator
  - XP/coins update after each action

## Write tab
- Run correction and paragraph actions:
  - XP/coins update
- Confirm IELTS projection card shows band breakdown values
- Run professional email mission action and verify rewards

## Arena tab
- Claim each mission once:
  - first tap rewards XP/coins
  - second tap remains `Done` and gives no extra rewards
- Run boss exam:
  - exam history updates
  - XP/coins increase based on band

## Profile tab
- Verify stats reflect interactions from other tabs
- Verify progress bar updates with XP
- Verify character chips unlock when level reaches thresholds

## 5) Definition of pass

Prototype is considered healthy if:
1. App launches in Expo.
2. All buttons respond without crashes.
3. State transitions are consistent with actions.
4. No type errors on `npm run typecheck`.

