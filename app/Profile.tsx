import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const [selectedCurrency, setSelectedCurrency] = useState('AED');
  const [selectedUnit, setSelectedUnit] = useState('ft²');
  const [isExpanded, setIsExpanded] = useState(false);

  const primaryCurrencies = ['AED', 'USD', 'EUR', 'RUB', 'CNY', 'INR'];
  const allCurrencies = [...primaryCurrencies, 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'HKD', 'NZD', 'SGD', 'KRW', 'TRY', 'BRL', 'ZAR'];
  const visibleCurrencies = isExpanded ? allCurrencies : primaryCurrencies;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#181A20" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Header />
          <View style={styles.contentContainer}>
            <ProfileSummary />
            <PersonalInfoSection />
            <PreferencesSection 
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
              selectedUnit={selectedUnit}
              setSelectedUnit={setSelectedUnit}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              visibleCurrencies={visibleCurrencies}
            />
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => router.push("/home")}>
            <Ionicons name="home-outline" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Feather name="file-text" size={23} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.centerButton}>
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
    </>
  );
}

// --- Components ---
const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={['#d1d5db', '#9ca3af']} // gray-300 to gray-400
        style={styles.headerGradient}
      />
    </View>
  );
};

const ProfileSummary = () => {
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: "https://api.dicebear.com/7.x/avataaars/png?seed=Arpit&backgroundColor=b6e3f4" }} 
            style={styles.avatarImage}
          />
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={12} color="#9ca3af" />
        </TouchableOpacity>
      </View>
      <Text style={styles.nameText}>Arpit Aryan Gupta</Text>
      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Projects: <Text style={styles.statHighlight}>12</Text></Text>
        <Text style={styles.statText}>Sold: <Text style={styles.statHighlight}>5</Text></Text>
      </View>
    </View>
  );
};

const PersonalInfoSection = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Personal information</Text>
      <View style={styles.card}>
        <InfoItem icon="mail-outline" label="arpit@liyantis.com" />
        <View style={styles.divider} />
        <InfoItem icon="call-outline" label="1234567890" />
        <View style={styles.divider} />
        <InfoItem icon="location-outline" label="Dubai" />
      </View>
    </View>
  );
};

const InfoItem = ({ icon, label }: { icon: string; label: string }) => {
  return (
    <TouchableOpacity style={styles.infoItem} activeOpacity={0.7}>
      <View style={styles.infoItemLeft}>
        <Ionicons name={icon as any} size={18} color="#9ca3af" />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Ionicons name="pencil" size={14} color="#6b7280" />
    </TouchableOpacity>
  );
};

const PreferencesSection = ({ 
  selectedCurrency, 
  setSelectedCurrency, 
  selectedUnit, 
  setSelectedUnit, 
  isExpanded, 
  setIsExpanded, 
  visibleCurrencies 
}: {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  selectedUnit: string;
  setSelectedUnit: (unit: string) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  visibleCurrencies: string[];
}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.cardPadding}>
        {/* Currency Section */}
        <View style={styles.preferenceGroup}>
          <Text style={styles.preferenceLabel}>Currency</Text>
          <View style={styles.chipContainer}>
            {visibleCurrencies.map((curr: string) => (
              <Chip 
                key={curr} 
                label={curr} 
                isSelected={selectedCurrency === curr} 
                onClick={() => setSelectedCurrency(curr)}
              />
            ))}
          </View>
          {/* Show More Dropdown Trigger */}
          <TouchableOpacity 
            style={styles.showMoreContainer}
            onPress={() => setIsExpanded(!isExpanded)}
            activeOpacity={0.7}
          >
            <View style={styles.lineDivider} />
            <View style={styles.showMoreContent}>
              <Text style={styles.showMoreText}>
                {isExpanded ? 'Show less' : 'Show more currencies'}
              </Text>
              <Ionicons 
                name={isExpanded ? "chevron-up" : "chevron-down"} 
                size={14} 
                color="#9ca3af" 
              />
            </View>
            <View style={styles.lineDivider} />
          </TouchableOpacity>
        </View>

        {/* Measure Units Section */}
        <View>
          <Text style={styles.preferenceLabel}>Measure units</Text>
          <View style={styles.chipContainer}>
            <Chip 
              label="ft²" 
              isSelected={selectedUnit === 'ft²'} 
              onClick={() => setSelectedUnit('ft²')}
            />
            <Chip 
              label="m²" 
              isSelected={selectedUnit === 'm²'} 
              onClick={() => setSelectedUnit('m²')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const Chip = ({ label, isSelected, onClick }: { label: string; isSelected: boolean; onClick: () => void }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.chip,
        isSelected ? styles.chipSelected : styles.chipUnselected
      ]}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.chipText,
        isSelected ? styles.chipTextSelected : styles.chipTextUnselected
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    marginTop: -48, // Negative margin to overlap header
    paddingBottom: 40,
  },
  // Header
  headerContainer: {
    height: 192, // h-48
    width: '100%',
    position: 'relative',
  },
  headerGradient: {
    flex: 1,
  },
  // Profile Summary
  summaryContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#181A20',
    overflow: 'hidden',
    backgroundColor: '#4b5563',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2c2d33',
    padding: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  nameText: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 8,
  },
  statText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  statHighlight: {
    color: 'white',
  },
  // Sections
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
    color: 'white',
  },
  card: {
    backgroundColor: '#232429',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardPadding: {
    backgroundColor: '#232429',
    borderRadius: 12,
    padding: 20,
  },
  // Info Items
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  infoItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#d1d5db', // gray-300
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#374151', // gray-700
    marginHorizontal: 16,
    opacity: 0.5,
  },
  // Preferences
  preferenceGroup: {
    marginBottom: 24,
  },
  preferenceLabel: {
    fontSize: 14,
    color: '#9ca3af', // gray-400
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  // Chips
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: '#F1FE74', // Using existing profile color
    borderColor: '#F1FE74',
  },
  chipUnselected: {
    backgroundColor: 'transparent',
    borderColor: '#4b5563', // gray-600
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#111827', // gray-900
  },
  chipTextUnselected: {
    color: '#d1d5db', // gray-300
  },
  // Show More
  showMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  lineDivider: {
    height: 1,
    flex: 1,
    backgroundColor: '#374151', // gray-700
  },
  showMoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  showMoreText: {
    fontSize: 12,
    color: '#9ca3af', // gray-400
  },

  /* BOTTOM NAV */
  bottomNav: {
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
    backgroundColor: "#DFFF4F",
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    fontSize: 22,
    color: "#000",
    marginTop: -1,
  },
});