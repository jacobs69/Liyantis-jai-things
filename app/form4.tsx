import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// --- Constants & Theme ---
const COLORS = {
  background: '#181A20',
  cardBg: '#1C1C1E',
  primary: '#EEFB73',
  textWhite: '#FFFFFF',
  textGrey: '#A0A0A0',
  sliderTrack: '#4A5568',
  dotInactive: '#B0C4DE',
};

// --- Types ---
type Category = {
  id: string;
  label: string;
  initial: number;
};

// --- Data ---
const categories: Category[] = [
  { id: 'capital', label: 'Capital appreciation', initial: 3 },
  { id: 'payment', label: 'Payment plan', initial: 2 },
  { id: 'service', label: 'Service charges', initial: 4 },
  { id: 'proximity', label: 'Proximity', initial: 3 },
  { id: 'connectivity', label: 'Connectivity', initial: 3 },
  { id: 'government', label: 'Government infrastructure', initial: 3 },
  { id: 'record', label: 'Record', initial: 3 },
  { id: 'stability', label: 'Stability', initial: 3 },
  { id: 'reputation', label: 'Reputation', initial: 3 },
  { id: 'quality', label: 'Quality', initial: 3 },
  { id: 'amenities', label: 'Amenities', initial: 3 },
  { id: 'rental', label: 'Rental demand', initial: 3 },
  { id: 'resale', label: 'Resale', initial: 3 },
];

// --- Selection Ring ---
const SelectionRing = () => {
  return (
    <View style={styles.ring} />
  );
};

// --- Slider ---
interface CustomSliderProps {
  value: number;
  onChange: (val: number) => void;
}

const CustomSlider = ({ value, onChange }: CustomSliderProps) => (
  <View style={styles.sliderContainer}>
    <View style={styles.track} />
    <View style={styles.dotsRow}>
      {[1, 2, 3, 4, 5].map((step) => {
        const isSelected = value === step;
        return (
          <TouchableOpacity
            key={step}
            onPress={() => onChange(step)}
            style={styles.touchTarget}
          >
            {isSelected && <SelectionRing />}
            <View
              style={[
                styles.dot,
                isSelected ? styles.dotSelected : styles.dotInactive,
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

// --- Row ---
interface ScoreRowProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
}

const ScoreRow = ({ label, value, onChange }: ScoreRowProps) => (
  <View style={styles.rowContainer}>
    <View style={styles.textRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.scoreValue}>{value}</Text>
    </View>
    <CustomSlider value={value} onChange={onChange} />
  </View>
);

// --- Screen ---
export default function RatingCardScreen() {
  const router = useRouter();

  const [scores, setScores] = useState<Record<string, number>>(() =>
    categories.reduce(
      (acc, cat) => ({ ...acc, [cat.id]: cat.initial }),
      {}
    )
  );

  const handleScoreChange = (id: string, value: number) => {
    setScores((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textWhite} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Rating Card</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressActive]} />
          </View>
        </View>

        <View style={styles.spacer} />
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.subHeader}>
          <Text style={styles.subTitle}>Score Project</Text>
          <Text style={styles.optionalText}>Optional</Text>
        </View>

        {/* White line under Score Project */}
        <View style={styles.underline} />

        <View style={styles.introContainer}>
          <Text style={styles.introText}>
            Rate the project based on 13 parameters which will be added in project details.
          </Text>
        </View>

        <View style={styles.listContainer}>
          {categories.map((cat) => (
            <ScoreRow
              key={cat.id}
              label={cat.label}
              value={scores[cat.id]}
              onChange={(val) => handleScoreChange(cat.id, val)}
            />
          ))}
        </View>

        <View style={styles.nextButtonContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => router.push('/home')}
          >
            <Text style={styles.nextButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
  },
  backButton: { 
    padding: 4 
  },
  headerTitleContainer: { 
    alignItems: 'center' 
  },
  headerTitle: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  progressBar: { 
    flexDirection: 'row', 
    gap: 4 
  },
  progressDot: {
    width: 27,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#D9D9D9',
  },
  progressActive: { 
    backgroundColor: '#EEFB73' 
  },

  // Content Styles
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 40,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  underline: {
    width: 330, // Changed from 315 to 330px
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)', // Changed to 25% opacity
    marginBottom: 8, // Reduced from 16 to 8 to move text up
    alignSelf: 'center', // Center the line properly
  },
  subTitle: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: '600',
  },
  optionalText: {
    color: '#444',
    fontSize: 12,
  },
  introContainer: {
    marginBottom: 32,
  },
  introText: {
    color: COLORS.textGrey,
    fontSize: 12,
    lineHeight: 18,
  },
  listContainer: {
    gap: 0, // Reduced from 2 to 0 for no spacing between rating items
  },

  // Row Styles
  rowContainer: {
    marginBottom: 18, // Reduced from 24px to 18px spacing
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between text and number
    alignItems: 'center', // Center align items vertically
    marginBottom: 0, // Reduced from 1 to 0 for no spacing from text to slider line
    paddingHorizontal: 0, // Ensure no extra padding
  },
  label: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    letterSpacing: 0.5,
    textAlign: 'left', // Left align the text labels
    textAlignVertical: 'center', // Vertically center the text (Android)
    flex: 1, // Take up available space to push number to right
    marginLeft: 0, // Ensure text starts at left margin
  },
  scoreValue: {
    color: COLORS.textWhite,
    fontSize: 30,
    fontWeight: '700', // Changed from '300' to '700' to make numbers thick
    lineHeight: 34,
    textAlign: 'right', // Ensure numbers are right-aligned
    marginRight: 0, // Ensure numbers end at right margin
  },

  // Slider Styles
  sliderContainer: {
    height: 32, // Reduced from 40 to 32 to match smaller touch targets
    justifyContent: 'center',
    position: 'relative',
    width: 341, // Set width to 341px for the dotted line
    alignSelf: 'center', // Center the slider container
  },
  track: {
    position: 'absolute',
    height: 2,
    left: 16, // Start the line at the center of the first dot
    right: 16, // End the line at the center of the last dot
    backgroundColor: '#FFFFFF', // Changed from COLORS.sliderTrack to #FFFFFF
  },
  dotsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', // This will now align dots with the adjusted line
    paddingHorizontal: 0, // Remove any padding to ensure dots align with line ends
    marginHorizontal: 0, // Ensure no extra margin
  },
  touchTarget: {
    width: 32, // Reduced from 40 to 32 for smaller touch area
    height: 32, // Reduced from 40 to 32 for smaller touch area
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { 
    width: 8, // Reduced from 12 to 8 for smaller dots
    height: 8, // Reduced from 12 to 8 for smaller dots
    borderRadius: 4 // Reduced from 6 to 4 to match new size
  },
  dotInactive: { 
    backgroundColor: '#cffafe' 
  },
  dotSelected: {
    backgroundColor: '#a5f3fc',
    ...Platform.select({
      ios: { 
        shadowColor: '#a5f3fc', 
        shadowOpacity: 0.8, 
        shadowRadius: 5 
      },
      android: { 
        elevation: 5 
      },
    }),
  },
  ring: {
    position: 'absolute',
    width: 20, // Reduced from 26 to 20 to match smaller dots
    height: 20, // Reduced from 26 to 20 to match smaller dots
    borderRadius: 10, // Reduced from 13 to 10 to match new size
    borderWidth: 1.5,
    borderColor: '#fef08a',
  },

  // Button Styles
  nextButtonContainer: {
    marginTop: 30, // 30px spacing after last content
    marginBottom: 20, // Bottom margin for scroll content
    alignItems: 'center', // Center the button horizontally
  },
  nextButton: {
    backgroundColor: '#EEFB73',
    width: 343,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  spacer: { 
    width: 24 
  },
  bottomPadding: { 
    height: 80 
  },
});