import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ALL_PROPERTIES = [
  { name: "The Weave", builder: "At JVC by Al Ghurair", isFav: true },
  { name: "Ellington Properties", builder: "The Cove", isFav: true },
  { name: "Dubai Islands", builder: "Emaar, Ellington Properties" },
  { name: "Dubai Marina", builder: "Nakheel Properties" },
  { name: "Palm Jumeirah", builder: "Emaar" },
  { name: "Dubai Hills Estate", builder: "Meraas" },
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("recent"); // ⭐ MAIN TOGGLE
  const [favStates, setFavStates] = useState(
    ALL_PROPERTIES.map((p) => p.isFav || false)
  );

  const toggleFav = (index: number) => {
    const updated = [...favStates];
    updated[index] = !updated[index];
    setFavStates(updated);
  };

  const RECENT = ALL_PROPERTIES.slice(0, 2); // ⭐ first 2 items

  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity 
      style={styles.propertyCard}
      onPress={() => {
        if (item.name === "The Weave") {
          router.push("/dashboard");
        }
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => toggleFav(index)}>
            <Ionicons
              name={favStates[index] ? "heart" : "heart-outline"}
              size={16}
              color={favStates[index] ? "red" : "white"}
            />
          </TouchableOpacity>

          <Text style={styles.propertyName}>{item.name}</Text>
        </View>

        <Text style={styles.propertyBuilder}>{item.builder}</Text>
      </View>

      <Ionicons name="arrow-forward" size={20} color="white" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greetingSmall}>Hello Arpit,</Text>
          <Text style={styles.greetingLarge}>Good Morning !</Text>
        </View>

        <TouchableOpacity style={styles.notificationWrapper}>
          <Ionicons name="notifications-outline" size={26} color="#fff" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      {/* ⭐ TOGGLE BUTTONS – NO NAVIGATION */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={selectedTab === "recent" ? styles.toggleActive : styles.toggleInactive}
          onPress={() => setSelectedTab("recent")}
        >
          <Text
            style={
              selectedTab === "recent"
                ? styles.toggleActiveText
                : styles.toggleInactiveText
            }
          >
            Recent
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={selectedTab === "all" ? styles.toggleActive : styles.toggleInactive}
          onPress={() => setSelectedTab("all")}
        >
          <Text
            style={
              selectedTab === "all"
                ? styles.toggleActiveText
                : styles.toggleInactiveText
            }
          >
            All
          </Text>
        </TouchableOpacity>
      </View>

      {/* ⭐ LIST CHANGES BASED ON TOGGLE */}
      <FlatList
        data={selectedTab === "recent" ? RECENT : ALL_PROPERTIES}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* BOTTOM TAB BAR */}
      <View style={styles.tabBar}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name="file-text" size={23} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerButton} onPress={() => router.push("/form1")}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name="search" size={23} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/Profile")}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12141D",
    padding: 24,
    paddingTop: 70,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  greetingSmall: { color: "#B9B9B9", fontSize: 18 },
  greetingLarge: { color: "#fff", fontSize: 28, fontWeight: "700" },

  notificationWrapper: { position: "relative", padding: 6 },
  notificationDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#F1FE74",
    position: "absolute",
    top: 2,
    right: 2,
  },

  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#1B1D27",
    padding: 6,
    borderRadius: 12,
    marginBottom: 20,
  },

  toggleActive: {
    flex: 1,
    backgroundColor: "#F1FE74",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  toggleInactive: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },

  toggleActiveText: { color: "#000", fontWeight: "600" },
  toggleInactiveText: { color: "#A3A3A3" },

  propertyCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#2F313C",
  },
  row: { flexDirection: "row", alignItems: "center", gap: 6 },
  propertyName: { color: "white", fontSize: 16 },
  propertyBuilder: { color: "#8A8A8A", marginTop: 4, fontSize: 13 },

  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: "#1A1C20",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  centerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1FE74",
    justifyContent: "center",
    alignItems: "center",
  },
  plus: { fontSize: 22, color: "#000", marginTop: -1 },
});
