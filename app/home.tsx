import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// 1. Updated Data with 'status' to allow filtering
const ALL_PROPERTIES = [
  { name: "The Weave", builder: "At JVC by Al Ghurair", isFav: false, status: "Sold" },
  { name: "Ellington Properties", builder: "The Cove", isFav: false, status: "Sold" },
  { name: "Dubai Islands", builder: "Emaar, Ellington Properties", isFav: true, status: "Active" },
  { name: "Dubai Marina", builder: "Nakheel Properties", isFav: false, status: "Active" },
  { name: "Palm Jumeirah", builder: "Emaar", isFav: false, status: "Active" },
  { name: "Dubai Hills Estate", builder: "Meraas", isFav: false, status: "Sold" },
];

const COLORS = {
  bg: "#101010",        // Deep dark background
  cardBg: "#1C1C1E",    // Search bar/Input background
  primary: "#DFFF4F",   // The Lime Yellow accent
  textWhite: "#FFFFFF",
  textGrey: "#8E8E93",
  border: "#2C2C2E",
};

export default function HomeScreen() {
  const router = useRouter();
  
  // State for filtering and search
  const [activeFilter, setActiveFilter] = useState("All"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [favStates, setFavStates] = useState(
    ALL_PROPERTIES.map((p) => p.isFav || false)
  );

  const toggleFav = (index: number) => {
    const updated = [...favStates];
    updated[index] = !updated[index];
    setFavStates(updated);
  };

  // 2. Filter Logic: Changes data based on button click and search
  const getFilteredData = () => {
    let filtered = ALL_PROPERTIES;
    
    // Apply filter
    if (activeFilter === "Sold projects") {
      filtered = filtered.filter((item) => item.status === "Sold");
    } else if (activeFilter === "Favourites") {
      // Show only favorited projects
      filtered = filtered.filter((item, index) => favStates[index]);
    }
    
    // Apply search
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((item) => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.builder.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const displayedData = getFilteredData();

  const renderItem = ({ item }: any) => {
    // Find the original index in ALL_PROPERTIES
    const originalIndex = ALL_PROPERTIES.findIndex(p => p.name === item.name);
    
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.propertyRow}
        onPress={() => {
          if (item.name === "The Weave") {
            router.push("/dashboard");
          }
        }}
      >
        {/* Left: Heart Icon */}
        <TouchableOpacity onPress={() => toggleFav(originalIndex)} style={styles.heartContainer}>
          <Ionicons
            name={favStates[originalIndex] ? "heart" : "heart-outline"}
            size={20}
            color={favStates[originalIndex] ? "#E74C3C" : COLORS.textWhite}
          />
        </TouchableOpacity>

      {/* Middle: Text Info */}
      <View style={styles.textContainer}>
        <Text style={styles.propertyName}>{item.name}</Text>
        <Text style={styles.propertyBuilder}>{item.builder}</Text>
      </View>

      {/* Right: Arrow */}
      <Ionicons name="arrow-forward" size={20} color={COLORS.textWhite} />
    </TouchableOpacity>
    );
  };

  // Helper for Filter Chips
  const FilterChip = ({ label }: { label: string }) => {
    const isActive = activeFilter === label;
    return (
      <TouchableOpacity
        style={[
          styles.filterChip,
          isActive ? styles.filterChipActive : styles.filterChipInactive,
        ]}
        onPress={() => setActiveFilter(label)}
      >
        <Text
          style={[
            styles.filterText,
            isActive ? styles.filterTextActive : styles.filterTextInactive,
          ]}
        >
          {label}
        </Text>
        {label === "Sort By" && (
           <Ionicons name="chevron-down" size={12} color="#fff" style={{marginLeft: 4}}/>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <View style={styles.contentContainer}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetingSmall}>Hello Arpit,</Text>
            <Text style={styles.greetingLarge}>Good Morning</Text>
          </View>
          <TouchableOpacity style={styles.notificationWrapper}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.primary} style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Search projects"
            placeholderTextColor="#666"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        {/* HORIZONTAL FILTERS */}
        <View style={{ height: 50 }}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.filterScroll}
          >
            <FilterChip label="All" />
            <FilterChip label="Sold projects" />
            <FilterChip label="Sort By" />
            <FilterChip label="Favourites" />
          </ScrollView>
        </View>

        {/* SECTION TITLE */}
        <Text style={styles.sectionTitle}>
          {activeFilter === "Sold projects" ? "Sold projects" : 
           activeFilter === "Favourites" ? "Favourites" : "All projects"}
        </Text>

        {/* LIST */}
        {displayedData.length > 0 ? (
          <FlatList
            data={displayedData}
            keyExtractor={(item) => item.name}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color="#333" />
            <Text style={styles.emptyTitle}>No projects found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? `No results for "${searchQuery}"` : "Try adjusting your filters"}
            </Text>
          </View>
        )}
      </View>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  // Header
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 20,
  },
  greetingSmall: { color: COLORS.textGrey, fontSize: 16, marginBottom: 4 },
  greetingLarge: { color: "#fff", fontSize: 28, fontWeight: "700" },
  notificationWrapper: { position: "relative", padding: 4 },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    position: "absolute",
    top: 4,
    right: 4,
  },

  // Search
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  searchInput: { flex: 1, color: "#fff", fontSize: 16 },

  // Filters
  filterScroll: { alignItems: 'center', paddingRight: 20 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChipActive: {
    backgroundColor: "#D6D6D6", // Light grey/white for active
    borderColor: "#D6D6D6",
  },
  filterChipInactive: {
    backgroundColor: "transparent",
    borderColor: "#555",
  },
  filterText: { fontSize: 14, fontWeight: "500" },
  filterTextActive: { color: "#000" },
  filterTextInactive: { color: "#FFF" },

  // List Headers & Items
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 15,
  },
  propertyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  heartContainer: { marginRight: 15 },
  textContainer: { flex: 1 },
  propertyName: { color: "#fff", fontSize: 16, fontWeight: "500", marginBottom: 4 },
  propertyBuilder: { color: "#666", fontSize: 13 },
  separator: { height: 1, backgroundColor: "#222" },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },

  // Bottom Navigation
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