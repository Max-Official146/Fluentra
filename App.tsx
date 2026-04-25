import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { aiServices } from "./src/ai/services";
import { missions, characters } from "./src/data/progression";
import { skillTree } from "./src/data/skillTree";
import { estimateBandScore } from "./src/engine/ielts";

const previewBand = estimateBandScore({
  wordCount: 280,
  cohesionScore: 0.76,
  grammarAccuracy: 0.72,
  lexicalRange: 0.74
});

function Section({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={["#090d1a", "#0f1b2e", "#131022"]} style={styles.bg}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Fluentra</Text>
          <Text style={styles.subtitle}>
            Duolingo-level fun. IELTS-level rigor. Real-world fluency.
          </Text>

          <Section title="Map Journey + Progression Loop">
            <Text style={styles.body}>
              Beginner-to-Pro world map with XP, coins, daily streaks, boss levels, and unlockable avatars.
            </Text>
            <View style={styles.rowWrap}>
              {characters.map((avatar) => (
                <View style={styles.chip} key={avatar.id}>
                  <Text style={styles.chipTitle}>{avatar.name}</Text>
                  <Text style={styles.chipBody}>Unlock L{avatar.unlockLevel}</Text>
                </View>
              ))}
            </View>
          </Section>

          <Section title="Skill Tree (Grammar • Speaking • Writing • Vocabulary)">
            {skillTree.map((node) => (
              <View key={node.id} style={styles.card}>
                <Text style={styles.cardTitle}>
                  {node.name} · {node.tier}
                </Text>
                <Text style={styles.cardBody}>
                  {node.area} | Cost {node.unlockCost} coins | Reward {node.xpReward} XP
                </Text>
              </View>
            ))}
          </Section>

          <Section title="Speaking Modes">
            <Text style={styles.body}>1) Sentence repetition 2) AI conversation 3) Real-life scenarios 4) IELTS speaking simulator</Text>
          </Section>

          <Section title="Writing Modes">
            <Text style={styles.body}>Sentence correction, paragraph building, and essay writing with band score feedback.</Text>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Sample IELTS Score Preview: Band {previewBand.overall}</Text>
              <Text style={styles.cardBody}>
                TR {previewBand.taskResponse} · CC {previewBand.coherence} · LR {previewBand.lexicalResource} · GRA {previewBand.grammar}
              </Text>
            </View>
          </Section>

          <Section title="Missions, Streaks, Leaderboards">
            {missions.map((m) => (
              <Text key={m} style={styles.listItem}>• {m}</Text>
            ))}
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

          <Section title="Professional English Mode">
            <Text style={styles.body}>
              Email writing drills, interview simulations, and workplace etiquette missions tied to promotion-themed leagues.
            </Text>
          </Section>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#050816" },
  bg: { flex: 1 },
  container: { padding: 18, paddingBottom: 48, gap: 12 },
  title: { color: "#e4ebff", fontSize: 34, fontWeight: "800" },
  subtitle: { color: "#b5c3e6", fontSize: 15, marginBottom: 8 },
  section: {
    backgroundColor: "rgba(19, 29, 54, 0.55)",
    borderColor: "rgba(119, 148, 255, 0.4)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 10
  },
  sectionTitle: { color: "#d7e0ff", fontSize: 18, fontWeight: "700" },
  body: { color: "#b8c7f2", lineHeight: 20 },
  rowWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    backgroundColor: "rgba(68, 91, 164, 0.35)",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10
  },
  chipTitle: { color: "#f2f5ff", fontWeight: "700" },
  chipBody: { color: "#c7d3f9", fontSize: 12 },
  card: {
    backgroundColor: "rgba(42, 56, 99, 0.35)",
    borderRadius: 12,
    padding: 10,
    gap: 4
  },
  cardTitle: { color: "#f3f6ff", fontWeight: "700" },
  cardBody: { color: "#c8d3f7", lineHeight: 19 },
  endpoint: { color: "#89a4ff", fontSize: 12 },
  listItem: { color: "#c8d3f7", lineHeight: 22 }
});
