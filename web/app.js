import { aiServices, characters, levelThresholds, missions, skillTree } from "./data.js";
import { estimateBandScore } from "./ielts.js";

const state = {
  tab: "Learn",
  xp: 120,
  coins: 320,
  streak: 2,
  lessonsDone: 1,
  unlockedSkills: ["g1", "s1", "w1", "v1"],
  completedMissions: [],
  mockExamHistory: []
};

function getLevel(xp) {
  let level = 1;
  for (let i = 0; i < levelThresholds.length; i += 1) {
    if (xp >= levelThresholds[i]) level = i + 1;
  }
  const currentBase = levelThresholds[level - 1] ?? 0;
  const nextBase = levelThresholds[level] ?? currentBase + 500;
  const progress = Math.min(1, (xp - currentBase) / Math.max(1, nextBase - currentBase));
  return { level, progress };
}

function reward(xp, coins) {
  state.xp += xp;
  state.coins += coins;
  state.lessonsDone += 1;
  render();
}

function unlockSkill(id, cost) {
  const node = skillTree.find((s) => s.id === id);
  if (!node) return;
  if (state.unlockedSkills.includes(id) || state.coins < cost) return;
  if (!node.prerequisites.every((p) => state.unlockedSkills.includes(p))) return;
  state.coins -= cost;
  state.unlockedSkills.push(id);
  render();
}

function claimMission(mission) {
  if (state.completedMissions.includes(mission)) return;
  state.completedMissions.push(mission);
  state.xp += 100;
  state.coins += 80;
  render();
}

function bossExam() {
  const band = estimateBandScore({
    wordCount: 260 + state.lessonsDone * 2,
    cohesionScore: Math.min(0.92, 0.65 + state.lessonsDone * 0.01),
    grammarAccuracy: Math.min(0.9, 0.66 + state.lessonsDone * 0.01),
    lexicalRange: Math.min(0.9, 0.67 + state.lessonsDone * 0.01)
  }).overall;
  state.mockExamHistory.unshift(band);
  state.mockExamHistory = state.mockExamHistory.slice(0, 5);
  state.xp += Math.round(band * 35);
  state.coins += Math.round(band * 25);
  render();
}

function tabButton(label) {
  const active = state.tab === label ? "active" : "";
  return `<button class="tab ${active}" data-tab="${label}">${label}</button>`;
}

function renderLearn() {
  return `
    <section class="section">
      <h2>Map Journey</h2>
      <p class="muted">Rookie Port → Grammar Valley → IELTS Citadel → Career City.</p>
      <button class="action" data-action="lesson">Complete Beginner Lesson (+60 XP / +25 coins)</button>
      <button class="action secondary" data-action="checkin">Daily Check-in (+1 streak / +20 coins)</button>
    </section>
    <section class="section">
      <h2>Skill Tree Unlocks</h2>
      <div class="grid">
        ${skillTree.map((node) => {
          const unlocked = state.unlockedSkills.includes(node.id);
          const canUnlock = node.prerequisites.every((p) => state.unlockedSkills.includes(p));
          return `<div class="card">
            <div><strong>${node.name}</strong> · ${node.tier}</div>
            <div class="muted">${node.area} | Cost ${node.unlockCost} | Reward ${node.xpReward} XP</div>
            ${unlocked
              ? `<div class="success">Unlocked</div>`
              : canUnlock
                ? `<button class="action" data-unlock="${node.id}">Unlock ${node.id}</button>`
                : `<div class="locked">Locked: complete prerequisites</div>`}
          </div>`;
        }).join("")}
      </div>
    </section>`;
}

function renderSpeak() {
  return `<section class="section"><h2>Speaking Practice</h2>
    <button class="action" data-reward="45,15">Sentence repetition (+45 XP)</button>
    <button class="action" data-reward="55,20">AI conversation simulation (+55 XP)</button>
    <button class="action" data-reward="70,30">Real-life scenario roleplay (+70 XP)</button>
    <button class="action" data-reward="80,35">IELTS speaking simulator (+80 XP)</button>
  </section>`;
}

function renderWrite() {
  const band = estimateBandScore({
    wordCount: 260 + state.lessonsDone * 2,
    cohesionScore: Math.min(0.92, 0.65 + state.lessonsDone * 0.01),
    grammarAccuracy: Math.min(0.9, 0.66 + state.lessonsDone * 0.01),
    lexicalRange: Math.min(0.9, 0.67 + state.lessonsDone * 0.01)
  });

  return `<section class="section"><h2>Writing + Professional English</h2>
    <button class="action" data-reward="40,15">Sentence correction (+40 XP)</button>
    <button class="action" data-reward="50,20">Paragraph building (+50 XP)</button>
    <div class="card">
      <strong>Essay projection: Band ${band.overall}</strong>
      <div class="muted">TR ${band.taskResponse} · CC ${band.coherence} · LR ${band.lexicalResource} · GRA ${band.grammar}</div>
    </div>
    <button class="action" data-reward="70,30">Business email mission (+70 XP)</button>
  </section>`;
}

function renderArena() {
  return `<section class="section"><h2>Missions</h2>
    <ul>${missions.map((m) => `<li>${m} - ${state.completedMissions.includes(m) ? "<span class='success'>Done</span>" : `<a href='#' data-mission="${m}">Claim</a>`}</li>`).join("")}</ul>
  </section>
  <section class="section"><h2>Boss Level: Mock IELTS</h2>
    <button class="action" data-action="boss">Simulate Boss Exam</button>
    <p class="muted">Recent bands: ${state.mockExamHistory.length ? state.mockExamHistory.join(", ") : "None yet"}</p>
  </section>
  <section class="section"><h2>AI Integration Layer</h2>
    <div class="grid">${aiServices.map((s) => `<div class='card'><strong>${s.name}</strong><div class='muted'>${s.purpose}</div><div class='small'>${s.endpointHint}</div></div>`).join("")}</div>
  </section>`;
}

function renderProfile() {
  const { level, progress } = getLevel(state.xp);
  const unlockedCharacters = characters.filter((c) => level >= c.unlockLevel);

  return `<section class="section"><h2>Profile</h2>
    <div class="stat-row">
      <div class="stat"><strong>${level}</strong><div class="muted">Level</div></div>
      <div class="stat"><strong>${state.xp}</strong><div class="muted">XP</div></div>
      <div class="stat"><strong>${state.coins}</strong><div class="muted">Coins</div></div>
      <div class="stat"><strong>${state.streak}d</strong><div class="muted">Streak</div></div>
    </div>
    <div class="progress"><div style="width:${Math.round(progress * 100)}%"></div></div>
    <div class="muted">${state.lessonsDone} lessons completed.</div>
  </section>
  <section class="section"><h2>Unlocked Characters</h2>
    <div class="grid">${unlockedCharacters.map((a) => `<div class='card'><strong>${a.name}</strong><div class='muted'>${a.perk}</div></div>`).join("") || "<div class='locked'>No characters unlocked yet.</div>"}</div>
  </section>`;
}

function render() {
  const { level } = getLevel(state.xp);
  const app = document.querySelector("#app");

  let content = "";
  if (state.tab === "Learn") content = renderLearn();
  if (state.tab === "Speak") content = renderSpeak();
  if (state.tab === "Write") content = renderWrite();
  if (state.tab === "Arena") content = renderArena();
  if (state.tab === "Profile") content = renderProfile();

  app.innerHTML = `
    <h1>Fluentra</h1>
    <p class="subtitle">Web prototype (non-React-Native) · Level ${level}</p>
    <div class="tabs">
      ${["Learn", "Speak", "Write", "Arena", "Profile"].map(tabButton).join("")}
    </div>
    ${content}
  `;

  app.querySelectorAll("[data-tab]").forEach((el) => {
    el.addEventListener("click", () => {
      state.tab = el.getAttribute("data-tab");
      render();
    });
  });

  app.querySelectorAll("[data-reward]").forEach((el) => {
    el.addEventListener("click", () => {
      const [xp, coins] = el.getAttribute("data-reward").split(",").map(Number);
      reward(xp, coins);
    });
  });

  app.querySelectorAll("[data-unlock]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("data-unlock");
      const node = skillTree.find((s) => s.id === id);
      if (node) unlockSkill(id, node.unlockCost);
    });
  });

  app.querySelectorAll("[data-mission]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      claimMission(el.getAttribute("data-mission"));
    });
  });

  const lessonBtn = app.querySelector("[data-action='lesson']");
  if (lessonBtn) lessonBtn.addEventListener("click", () => reward(60, 25));

  const checkinBtn = app.querySelector("[data-action='checkin']");
  if (checkinBtn) {
    checkinBtn.addEventListener("click", () => {
      state.streak += 1;
      state.coins += 20;
      render();
    });
  }

  const bossBtn = app.querySelector("[data-action='boss']");
  if (bossBtn) bossBtn.addEventListener("click", bossExam);
}

render();
