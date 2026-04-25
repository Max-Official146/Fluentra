import React, { useMemo, useReducer, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { aiServices } from "./src/ai/services";
import { characters, levelThresholds, missions } from "./src/data/progression";
import { skillTree } from "./src/data/skillTree";
import { estimateBandScore } from "./src/engine/ielts";

type Tab = "Learn" | "Speak" | "Write" | "Arena" | "Profile";

type UserState = {
  xp: number;
  coins: number;
  streak: number;
  lessonsDone: number;
  unlockedSkills: string[];
  completedMissions: string[];
  mockExamHistory: number[];
};

type UserAction =
  | { type: "COMPLETE_LESSON"; xp: number; coins: number }
  | { type: "UNLOCK_SKILL"; id: string; cost: number }
  | { type: "COMPLETE_MISSION"; mission: string }
  | { type: "BOSS_EXAM"; band: number }
  | { type: "STREAK_CHECKIN" };

const initialState: UserState = {
  xp: 120,
  coins: 320,
  streak: 2,
  lessonsDone: 1,
  unlockedSkills: ["g1", "s1", "w1", "v1"],
  completedMissions: [],
  mockExamHistory: []
};

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "COMPLETE_LESSON":
      return {
        ...state,
        xp: state.xp + action.xp,
        coins: state.coins + action.coins,
        lessonsDone: state.lessonsDone + 1
      };
    case "UNLOCK_SKILL":
      if (state.coins < action.cost || state.unlockedSkills.includes(action.id)) {
        return state;
      }
      return {
        ...state,
        coins: state.coins - action.cost,
        unlockedSkills: [...state.unlockedSkills, action.id]
      };
    case "COMPLETE_MISSION":
      if (state.completedMissions.includes(action.mission)) {
        return state;
      }
      return {
        ...state,
        xp: state.xp + 100,
        coins: state.coins + 80,
        completedMissions: [...state.completedMissions, action.mission]
      };
    case "BOSS_EXAM":
      return {
        ...state,
        xp: state.xp + Math.round(action.band * 35),
        coins: state.coins + Math.round(action.band * 25),
        mockExamHistory: [action.band, ...state.mockExamHistory].slice(0, 5)
      };
    case "STREAK_CHECKIN":
      return {
        ...state,
        streak: state.streak + 1,
        coins: state.coins + 20
      };
    default:
      return state;
  }
}

function getLevel(xp: number) {
  let level = 1;
  for (let i = 0; i < levelThresholds.length; i += 1) {
    if (xp >= levelThresholds[i]) level = i + 1;
  }
  const currentBase = levelThresholds[level - 1] ?? 0;
  const nextBase = levelThresholds[level] ?? currentBase + 500;
  const progress = Math.min(1, (xp - currentBase) / Math.max(1, nextBase - currentBase));

  return { level, progress, nextBase };
}

function Section({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ActionButton({
  text,
  onPress,
  type = "primary"
}: {
  text: string;
  onPress: () => void;
  type?: "primary" | "neutral";
}) {
  return (
    <Pressable
      style={[styles.button, type === "neutral" ? styles.buttonNeutral : styles.buttonPrimary]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>("Learn");
  const [state, dispatch] = useReducer(userReducer, initialState);

  const { level, progress } = useMemo(() => getLevel(state.xp), [state.xp]);

  const availableCharacters = useMemo(
    () => characters.filter((c) => level >= c.unlockLevel),
    [level]
  );

  const latestBand = useMemo(() => {
    const base = estimateBandScore({
      wordCount: 260 + state.lessonsDone * 2,
      cohesionScore: Math.min(0.92, 0.65 + state.lessonsDone * 0.01),
      grammarAccuracy: Math.min(0.9, 0.66 + state.lessonsDone * 0.01),
      lexicalRange: Math.min(0.9, 0.67 + state.lessonsDone * 0.01)
    });
    return base;
  }, [state.lessonsDone]);

  const renderLearnTab = () => (
    <>
      <Section title="Map Journey">
        <Text style={styles.body}>
          Travel from Rookie Port → Grammar Valley → IELTS Citadel → Career City.
        </Text>
        <ActionButton
          text="Complete Beginner Lesson (+60 XP / +25 coins)"
          onPress={() => dispatch({ type: "COMPLETE_LESSON", xp: 60, coins: 25 })}
        />
        <ActionButton
          type="neutral"
          text="Daily Check-in (+1 streak / +20 coins)"
          onPress={() => dispatch({ type: "STREAK_CHECKIN" })}
        />
      </Section>

      <Section title="Skill Tree Unlocks">
        {skillTree.map((node) => {
          const unlocked = state.unlockedSkills.includes(node.id);
          const canUnlock = node.prerequisites.every((p) => state.unlockedSkills.includes(p));
          return (
            <View key={node.id} style={styles.card}>
              <Text style={styles.cardTitle}>
                {node.name} · {node.tier}
              </Text>
              <Text style={styles.cardBody}>
                {node.area} | Cost {node.unlockCost} | Reward {node.xpReward} XP
              </Text>
              {unlocked ? (
                <Text style={styles.success}>Unlocked</Text>
              ) : canUnlock ? (
                <ActionButton
                  text={`Unlock ${node.id}`}
                  onPress={() => dispatch({ type: "UNLOCK_SKILL", id: node.id, cost: node.unlockCost })}
                />
              ) : (
                <Text style={styles.locked}>Locked: complete prerequisites first</Text>
              )}
            </View>
          );
        })}
      </Section>
    </>
  );

  const renderSpeakTab = () => (
    <Section title="Speaking Practice Ladder">
      <Text style={styles.body}>1) Sentence repetition (Beginner)</Text>
      <ActionButton
        text="Practice repetition (+45 XP)"
        onPress={() => dispatch({ type: "COMPLETE_LESSON", xp: 45, coins: 15 })}
      />
      <Text style={styles.body}>2) AI conversation simulation (Intermediate)</Text>
      <ActionButton
        text="Start AI conversation (+55 XP)"
        onPress={() => dispatch({ type: "COMPLETE_LESSON", xp: 55, coins: 20 })}
      />
      <Text style={styles.body}>3) Real-life scenarios (Advanced)</Text>
      <ActionButton
        text="Roleplay workplace scenario (+70 XP)"
        onPress={() => dispatch({ type: "COMPLETE_LESSON", xp: 70, coins: 30 })}
      />
      <Text style={styles.body}>4) IELTS speaking simulator (Pro)</Text>
      <ActionButton
        text="Take speaking simulator (+80 XP)"
        onPress={() => dispatch({ type: "COMPLETE_LESSON", xp: 80, coins: 35 })}
      />
    </Section>
  );

  const renderWriteTab = () => (
    <Section title="Writing + Professional English">
      <Text style={styles.body}>Sentence correction</Text>
      <ActionButton
        text="Correct 8 sentences (+40 XP)"
        onPress={() => dispatch({ type: "COMPLETE_LESSON", xp: 40, coins: 15 })}
      />
      <Text style={styles.body}>Paragraph building</Text>
      <ActionButton
        text="Build a paragraph (+50 XP)"
        onPress={() => dispatch({ type: "COMPLETE_LESSON", xp: 50, coins: 20 })}
      />
      <Text style={styles.body}>Essay writing (AI band score)</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current essay projection: Band {latestBand.overall}</Text>
        <Text style={styles.cardBody}>
          TR {latestBand.taskResponse} · CC {latestBand.coherence} · LR {latestBand.lexicalResource} · GRA {latestBand.grammar}
        </Text>
      </View>
      <Text style={styles.body}>Professional mode: email writing + interview simulation + etiquette drills.</Text>
      <ActionButton
        text="Complete business email mission (+70 XP)"
        onPress={() => dispatch({ type: "COMPLETE_LESSON", xp: 70, coins: 30 })}
      />
    </Section>
  );

  const renderArenaTab = () => (
    <>
      <Section title="Missions & Challenges">
        {missions.map((mission) => {
          const done = state.completedMissions.includes(mission);
          return (
            <View key={mission} style={styles.rowBetween}>
              <Text style={styles.listItem}>• {mission}</Text>
              <Pressable onPress={() => dispatch({ type: "COMPLETE_MISSION", mission })}>
                <Text style={done ? styles.success : styles.link}>{done ? "Done" : "Claim"}</Text>
              </Pressable>
            </View>
          );
        })}
      </Section>

      <Section title="Boss Level: Mock IELTS Exam">
        <Text style={styles.body}>Run full mock exam to earn major rewards and leaderboard points.</Text>
        <ActionButton
          text="Simulate Boss Exam"
          onPress={() => dispatch({ type: "BOSS_EXAM", band: latestBand.overall })}
        />
        {state.mockExamHistory.length > 0 ? (
          <Text style={styles.body}>Recent bands: {state.mockExamHistory.join(", ")}</Text>
        ) : (
          <Text style={styles.locked}>No exam attempts yet.</Text>
        )}
      </Section>

      <Section title="AI Integration Layer">
        {aiServices.map((service) => (
          <View key={service.name} style={styles.card}>
            <Text style={styles.cardTitle}>{service.name}</Text>
            <Text style={styles.cardBody}>{service.purpose}</Text>
            <Text style={styles.endpoint}>{service.endpointHint}</Text>
          </View>
        ))}
      </Section>
    </>
  );

  const renderProfileTab = () => (
    <>
      <Section title="Player Profile">
        <View style={styles.statsRow}>
          <Stat label="Level" value={level} />
          <Stat label="XP" value={state.xp} />
          <Stat label="Coins" value={state.coins} />
          <Stat label="Streak" value={`${state.streak}d`} />
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
        <Text style={styles.body}>{state.lessonsDone} lessons completed.</Text>
      </Section>

      <Section title="Unlocked Characters">
        <View style={styles.rowWrap}>
          {availableCharacters.map((avatar) => (
            <View style={styles.chip} key={avatar.id}>
              <Text style={styles.chipTitle}>{avatar.name}</Text>
              <Text style={styles.chipBody}>{avatar.perk}</Text>
            </View>
          ))}
          {availableCharacters.length === 0 && <Text style={styles.locked}>No character unlocked yet.</Text>}
        </View>
      </Section>
    </>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={["#090d1a", "#0f1b2e", "#131022"]} style={styles.bg}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Fluentra</Text>
          <Text style={styles.subtitle}>IELTS + Professional Fluency RPG</Text>

          <View style={styles.tabs}>
            {(["Learn", "Speak", "Write", "Arena", "Profile"] as Tab[]).map((item) => (
              <Pressable
                key={item}
                style={[styles.tab, tab === item && styles.tabActive]}
                onPress={() => setTab(item)}
              >
                <Text style={styles.tabText}>{item}</Text>
              </Pressable>
            ))}
          </View>

          {tab === "Learn" && renderLearnTab()}
          {tab === "Speak" && renderSpeakTab()}
          {tab === "Write" && renderWriteTab()}
          {tab === "Arena" && renderArenaTab()}
          {tab === "Profile" && renderProfileTab()}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#050816" },
  bg: { flex: 1 },
  container: { padding: 16, paddingBottom: 46, gap: 12 },
  title: { color: "#e8eeff", fontSize: 34, fontWeight: "800" },
  subtitle: { color: "#b2c1e8", marginBottom: 6 },
  tabs: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tab: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#3652a7",
    backgroundColor: "rgba(38, 56, 102, 0.28)",
    paddingHorizontal: 12,
    paddingVertical: 7
  },
  tabActive: { backgroundColor: "rgba(89, 121, 232, 0.5)" },
  tabText: { color: "#eaf0ff", fontWeight: "600" },
  section: {
    backgroundColor: "rgba(19, 29, 54, 0.55)",
    borderColor: "rgba(119, 148, 255, 0.45)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 10
  },
  sectionTitle: { color: "#d7e0ff", fontSize: 18, fontWeight: "700" },
  body: { color: "#bfd0fb", lineHeight: 20 },
  rowWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  chip: {
    backgroundColor: "rgba(68, 91, 164, 0.35)",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    maxWidth: "100%"
  },
  chipTitle: { color: "#f2f5ff", fontWeight: "700" },
  chipBody: { color: "#c7d3f9", fontSize: 12 },
  card: {
    backgroundColor: "rgba(42, 56, 99, 0.35)",
    borderRadius: 12,
    padding: 10,
    gap: 5
  },
  cardTitle: { color: "#f3f6ff", fontWeight: "700" },
  cardBody: { color: "#c8d3f7", lineHeight: 19 },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center"
  },
  buttonPrimary: { backgroundColor: "rgba(106, 137, 255, 0.65)" },
  buttonNeutral: { backgroundColor: "rgba(68, 86, 145, 0.5)" },
  buttonText: { color: "#f8faff", fontWeight: "700" },
  endpoint: { color: "#89a4ff", fontSize: 12 },
  listItem: { color: "#c8d3f7", lineHeight: 22, flex: 1 },
  link: { color: "#9ec0ff", fontWeight: "700" },
  locked: { color: "#98a8d8" },
  success: { color: "#8ef7c7", fontWeight: "700" },
  statsRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  statCard: {
    flexGrow: 1,
    backgroundColor: "rgba(53, 76, 145, 0.35)",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    minWidth: 70
  },
  statValue: { color: "#f2f5ff", fontWeight: "800", fontSize: 18 },
  statLabel: { color: "#bfd0fb", fontSize: 12 },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(73, 91, 146, 0.5)",
    overflow: "hidden"
  },
  progressFill: { height: "100%", backgroundColor: "#87f7d3" }
});
