import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

const COLORS = {
  background: '#121214', // Slightly softer dark background
  primary: '#F0FD73',    // The specific Lime/Yellow from the screenshot
  textWhite: '#FFFFFF',
  textGrey: '#B3B3B3',
  searchBg: '#1C1C1E',
  cardText: '#1A1A1A',
};

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello Arpit,</Text>
          <Text style={styles.title}>Good Morning</Text>
        </View>

        <TouchableOpacity style={styles.bellWrapper}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.textWhite}
          />
          <View style={styles.bellDot} />
        </TouchableOpacity>
      </View>

      {/* Search Bar (Replaces Segmented Control) */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.primary} style={styles.searchIcon} />
        <TextInput 
          placeholder="Search projects" 
          placeholderTextColor="#666" 
          style={styles.searchInput}
        />
      </View>

      {/* Empty State Card */}
      <View style={styles.centerContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.emptyCard}
          onPress={() => router.push('/form1')}
        >
          <View style={styles.iconContainer}>
            {/* Building Icon */}
            <MaterialCommunityIcons
              name="office-building"
              size={60}
              color={COLORS.cardText}
            />
            {/* Plus Badge on Icon */}
            <View style={styles.iconBadge}>
              <Ionicons name="add" size={14} color={COLORS.cardText} />
            </View>
          </View>

          <Text style={styles.emptyTitle}>No projects yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap to add your first project
          </Text>
        </TouchableOpacity>
      </View>

      {/* BOTTOM TAB BAR */}
      <View style={styles.tabBar}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="heart-outline" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerButton} onPress={() => router.push("/form1")}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="document-text-outline" size={24} color="#fff" />
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
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingTop: 60, 
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    color: COLORS.textGrey,
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    color: COLORS.textWhite,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bellWrapper: {
    padding: 4,
    position: 'relative',
  },
  bellDot: {
    position: 'absolute',
    top: 5,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    borderWidth: 1.5,
    borderColor: COLORS.background,
  },

  // Search Bar Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.searchBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textWhite,
    fontSize: 15,
  },

  // Center Card Styles
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyCard: {
    width: '85%',
    aspectRatio: 0.85, // Makes it slightly taller than wide
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // Slight shadow
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  iconBadge: {
    position: 'absolute',
    bottom: -5,
    right: -10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 15,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.cardText,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.cardText,
    opacity: 0.7,
    textAlign: 'center',
  },

  // Bottom Navigation Styles
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: "#27292D",
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
    backgroundColor: "#F0FD73",
    justifyContent: "center",
    alignItems: "center",
  },
  plus: { fontSize: 32, color: "#000", marginTop: -2 },
});