import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * MenuItem Component
 */
interface MenuItemProps {
  iconName: string;
  label: string;
  iconLibrary?: any;
}

const MenuItem = ({ iconName, label, iconLibrary = Ionicons }: MenuItemProps) => {
  const Icon = iconLibrary;
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Icon name={iconName} size={22} color="#000" />
        </View>
        <Text style={styles.menuItemLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color="#F1FE74" />
    </TouchableOpacity>
  );
};

/**
 * NavItem Component
 */
interface NavItemProps {
  iconName: string;
  active?: boolean;
  size?: number;
  library?: any;
}

const NavItem = ({ iconName, active = false, size = 24, library = Ionicons }: NavItemProps) => {
  const Icon = library;
  return (
    <TouchableOpacity style={styles.navItem}>
      <Icon name={iconName} size={size} color={active ? "#FFF" : "#9CA3AF"} />
      {active && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );
};

export default function ProfileScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (!menuVisible) {
      setMenuVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={22} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.headerBtn} onPress={toggleMenu}>
            <Ionicons name="menu" size={26} color="#FFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Dropdown Menu */}
      {menuVisible && (
        <>
          <TouchableOpacity style={styles.menuOverlay} activeOpacity={1} onPress={toggleMenu} />
          <Animated.View style={[styles.dropdown, { opacity: fadeAnim }]}>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Privacy Policy</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Terms of Service</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Sign Out</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}

      {/* Main Content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=3' }} 
              style={styles.avatar}
            />
          </View>
          <Text style={styles.userName}>Arpit Aryan Gupta</Text>
          <Text style={styles.userEmail}>arpit@liyantis.com</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Projects Analyzed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Pinned Projects</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuList}>
          <MenuItem iconName="heart" label="Saved Projects" />
          <MenuItem iconName="headset-outline" label="Contact Support" />
          <MenuItem iconName="settings-outline" label="App Settings" />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <NavItem iconName="home-outline" active={false} />
        </TouchableOpacity>
        <NavItem iconName="file-text" library={Feather} size={22} active={false} />
        
        {/* Center Add Button */}
        <TouchableOpacity style={styles.centerButton}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
        
        <NavItem iconName="search" library={Feather} size={22} active={false} />
        <NavItem iconName="person-circle-outline" active={true} size={28} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12141D',
    paddingTop: 50,
  },
  headerSafeArea: {
    backgroundColor: '#12141D',
    zIndex: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerBtn: {
    padding: 5,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },

  // Dropdown
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 90,
  },
  dropdown: {
    position: 'absolute',
    top: 100,
    right: 24,
    width: 190,
    backgroundColor: '#1B1D27',
    borderRadius: 12,
    zIndex: 101,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    color: '#FFF',
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginHorizontal: 12,
  },

  scrollContent: {
    paddingHorizontal: 24,
  },

  // Profile
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatarWrapper: {
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  userName: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  userEmail: {
    color: '#A3A3A3',
    fontSize: 14,
    marginTop: 4,
  },
  editButton: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    marginBottom: 32,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 4,
    textAlign: 'center',
  },

  // Menu Items
  menuList: {
    gap: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1B1D27',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 38,
    height: 38,
    backgroundColor: '#F1FE74',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },

  // Navigation
  bottomNav: {
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
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  activeDot: {
    width: 4,
    height: 4,
    backgroundColor: '#FFF',
    borderRadius: 2,
    marginTop: 4,
  },
  centerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1FE74",
    justifyContent: "center",
    alignItems: "center",
  },
  plus: { 
    fontSize: 22, 
    color: "#000", 
    marginTop: -1 
  },
});