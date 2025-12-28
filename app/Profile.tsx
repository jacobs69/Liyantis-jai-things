import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
// Note: If not using Expo Router, remove this import and the 'router' variable
import { useRouter } from "expo-router";

// Helper component for the Menu Cards to keep code clean
interface MenuCardProps {
  icon: React.ReactNode;
  title: string;
}

const MenuCard = ({ icon, title }: MenuCardProps) => (
  <TouchableOpacity style={styles.menuCard} activeOpacity={0.8}>
    <View style={styles.menuIconContainer}>
      {icon}
    </View>
    <Text style={styles.menuCardText}>{title}</Text>
    <Ionicons name="chevron-forward" size={22} color="#F1FE74" />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  // Use a try-catch or mock for router to ensure it doesn't crash if not in a Router context
  let router;
  try {
    router = useRouter();
  } catch (e) {
    router = { push: () => console.log("Navigating..."), back: () => console.log("Back...") };
  }

  const [menuVisible, setMenuVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const toggleMenu = () => {
    if (!menuVisible) {
      setMenuVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => setMenuVisible(false));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- Header --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        
        <TouchableOpacity 
          onPress={toggleMenu}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Dropdown Menu Overlay */}
        {menuVisible && (
          <Animated.View 
            style={[
              styles.dropdownMenu,
              { 
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <TouchableOpacity style={styles.dropdownItem} activeOpacity={0.7}>
              <Text style={styles.dropdownText}>Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={20} color="#F1FE74" />
            </TouchableOpacity>
            <View style={styles.dropdownDivider} />
            <TouchableOpacity style={styles.dropdownItem} activeOpacity={0.7}>
              <Text style={styles.dropdownText}>Terms of Service</Text>
              <Ionicons name="chevron-forward" size={20} color="#F1FE74" />
            </TouchableOpacity>
            <View style={styles.dropdownDivider} />
            <TouchableOpacity style={styles.dropdownItem} activeOpacity={0.7}>
              <Text style={styles.dropdownText}>Sign Out</Text>
              <Ionicons name="chevron-forward" size={20} color="#F1FE74" />
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileIconContainer}>
            <Ionicons name="person-circle" size={75} color="#F1FE74" />
          </View>
          <Text style={styles.profileName}>Arpit Aryan Gupta</Text>
          <Text style={styles.profileEmail}>arpit@liyantis.com</Text>
          <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Projects Created</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Sold Projects</Text>
          </View>
        </View>

        {/* Menu Cards */}
        <View style={styles.menuSection}>
          <MenuCard icon={<Ionicons name="heart" size={22} color="#000" />} title="Saved Projects" />
          <MenuCard icon={<Ionicons name="headset-outline" size={22} color="#000" />} title="Contact Support" />
          <MenuCard icon={<Ionicons name="settings-outline" size={22} color="#000" />} title="App Settings" />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/home")} style={styles.navItem}>
          <Image 
            source={require("../assets/images/Home_fill.png")} 
            style={{ width: 26, height: 26 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.addButton}
          activeOpacity={0.9}
          onPress={() => router.push("/form1")}
        >
          <Ionicons name="add-circle" size={56} color="#F1FE74" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="document-text-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Profile")} style={styles.navItem}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20, // Increased from 18 to 20
    fontWeight: '700',
    marginBottom: 6,
  },
  menuButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 20, // Reduced from 100 to 20
  },
  dropdownMenu: {
    position: 'absolute',
    right: 16,
    top: 10,
    backgroundColor: '#1B1D27',
    paddingVertical: 4,
    width: 190,
    borderRadius: 12,
    zIndex: 50,
    borderWidth: 1,
    borderColor: '#374151',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    color: 'white',
    fontSize: 15,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#333',
    marginHorizontal: 12,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 16, // Reduced from 24 to 16
    marginTop: 20, // Reduced from 47 to 20
  },
  profileIconContainer: {
    marginBottom: 8, // Reduced from 12 to 8
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    color: '#A3A3A3',
    marginBottom: 18, // Increased from 12 to 18 for more spacing before Edit Profile button
    fontSize: 14,
  },
  editButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  editButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 32,
    marginBottom: 20, // Increased from 4 to 20 to add spacing before menu cards
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: 'white',
    fontSize: 23, // Changed from 24 to 23
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#A3A3A3',
    marginTop: 4,
    fontSize: 14, // Reduced from 16 to 14
    letterSpacing: 1,
    // Removed textTransform: 'uppercase' to allow normal case
  },
  menuSection: {
    paddingBottom: 20, // Reduced from 40 to 20
  },
  menuCard: {
    flexDirection: 'row',
    backgroundColor: '#27292D', // Changed from #1B1D27 to #27292D
    padding: 12, // Reduced from 16 to 12
    marginHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 19, // Restored to 19px spacing between boxes
  },
  menuIconContainer: {
    width: 38,
    height: 38,
    backgroundColor: '#F1FE74',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuCardText: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75, // Changed from 85 to 75 to match home page
    backgroundColor: '#27292D', // Changed to match home page
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center', // Changed from flex-start to center to match home page
    borderTopLeftRadius: 20, // Changed from 30 to 20 to match home page
    borderTopRightRadius: 20, // Changed from 30 to 20 to match home page
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    // Removed fixed width to match home page spacing
  },
  addButton: {
    width: 56, // Changed back to 56 to match home page
    height: 56, // Changed back to 56 to match home page
    justifyContent: 'center',
    alignItems: 'center',
  },
});