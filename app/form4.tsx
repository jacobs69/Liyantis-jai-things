import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 0.6,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    pulse.start();
    return () => pulse.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.ring,
        { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
      ]}
    />
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

        <View style={styles.introContainer}>
          <Text style={styles.introText}>
            Add installments to complete the 100% payment for the project.
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
    gap: 18, // Reduced from 24px to 18px spacing between rating items
  },

  // Row Styles
  rowContainer: {
    marginBottom: 18, // Reduced from 24px to 18px spacing
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  label: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  scoreValue: {
    color: COLORS.textWhite,
    fontSize: 30,
    fontWeight: '300',
    lineHeight: 34,
  },

  // Slider Styles
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    position: 'absolute',
    height: 2,
    left: 0,
    right: 0,
    backgroundColor: COLORS.sliderTrack,
  },
  dotsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  touchTarget: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { 
    width: 12, 
    height: 12, 
    borderRadius: 6 
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
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#fef08a',
  },

  // Button Styles
  nextButtonContainer: {
    marginTop: 30, // 30px spacing after last content
    marginBottom: 20, // Bottom margin for scroll content
  },
  nextButton: {
    backgroundColor: '#EEFB73',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
  spacer: { 
    width: 24 
  },
  bottomPadding: { 
    height: 80 
  },
});