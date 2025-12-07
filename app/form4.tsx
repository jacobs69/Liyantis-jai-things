import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
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
  background: '#121214',
  cardBg: '#1C1C1E',
  primary: '#E3FF50', // The neon lime/yellow
  textWhite: '#FFFFFF',
  textGrey: '#A0A0A0',
  sliderTrack: '#4A5568', // Dark grey-blue for the line
  dotInactive: '#B0C4DE', // Light blue-grey for dots
  activeDotBorder: '#E3FF50',
};

const SCREEN_WIDTH = Dimensions.get('window').width;

// --- Custom Slider Component ---
const CustomRatingSlider = ({ 
  label, 
  value, 
  onValueChange 
}: { 
  label: string; 
  value: number; 
  onValueChange: (val: number) => void 
}) => {
  return (
    <View style={styles.sliderRow}>
      {/* Header: Label and Number */}
      <View style={styles.sliderHeader}>
        <Text style={styles.sliderLabel}>{label}</Text>
        <Text style={styles.sliderValue}>{value}</Text>
      </View>

      {/* The Visual Slider */}
      <View style={styles.sliderContainer}>
        {/* The horizontal line track */}
        <View style={styles.trackLine} />
        
        {/* The 5 Dots */}
        <View style={styles.dotsContainer}>
          {[1, 2, 3, 4, 5].map((item) => {
            const isActive = item === value;
            return (
              <TouchableOpacity
                key={item}
                activeOpacity={0.7}
                onPress={() => onValueChange(item)}
                style={styles.dotTouchArea} // Larger hit slop
              >
                <View style={[
                  styles.dotBase,
                  isActive ? styles.dotActive : styles.dotInactive
                ]}>
                  {/* Optional: Inner center dot for active state if needed, currently transparent */}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default function RatingCardScreen() {
  const router = useRouter();

  // --- State for all categories ---
  // Using a simple object map for cleaner updates
  const [scores, setScores] = useState({
    capitalAppreciation: 3,
    paymentPlan: 2,
    serviceCharges: 4,
    proximity: 3,
    connectivity: 3,
    govInfra: 3,
    record: 3,
    stability: 3,
    reputation: 3,
    quality: 3,
    amenities: 3,
    rentalDemand: 3,
    resale: 3,
  });

  const updateScore = (key: keyof typeof scores, newValue: number) => {
    setScores(prev => ({ ...prev, [key]: newValue }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- Header --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textWhite} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Rating Card</Text>
          {/* Progress Bar (Step 4 Highlighted) */}
          <View style={styles.progressBar}>
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressActive]} />
          </View>
        </View>
        
        <View style={{ width: 24 }} /> {/* Spacer for alignment */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Sub-header */}
        <View style={styles.subHeader}>
          <Text style={styles.subTitle}>Score Project</Text>
          <Text style={styles.optionalText}>Optional</Text>
        </View>
        
        <Text style={styles.description}>
          Add installments to complete the 100% payment for the project.
        </Text>

        {/* --- List of Sliders --- */}
        <View style={styles.slidersList}>
          <CustomRatingSlider 
            label="Capital appreciation" 
            value={scores.capitalAppreciation} 
            onValueChange={(v) => updateScore('capitalAppreciation', v)} 
          />
          <CustomRatingSlider 
            label="Payment plan" 
            value={scores.paymentPlan} 
            onValueChange={(v) => updateScore('paymentPlan', v)} 
          />
          <CustomRatingSlider 
            label="Service charges" 
            value={scores.serviceCharges} 
            onValueChange={(v) => updateScore('serviceCharges', v)} 
          />
          <CustomRatingSlider 
            label="Proximity" 
            value={scores.proximity} 
            onValueChange={(v) => updateScore('proximity', v)} 
          />
          <CustomRatingSlider 
            label="Connectivity" 
            value={scores.connectivity} 
            onValueChange={(v) => updateScore('connectivity', v)} 
          />
          <CustomRatingSlider 
            label="Government infrastructure" 
            value={scores.govInfra} 
            onValueChange={(v) => updateScore('govInfra', v)} 
          />
          <CustomRatingSlider 
            label="Record" 
            value={scores.record} 
            onValueChange={(v) => updateScore('record', v)} 
          />
          <CustomRatingSlider 
            label="Stability" 
            value={scores.stability} 
            onValueChange={(v) => updateScore('stability', v)} 
          />
          <CustomRatingSlider 
            label="Reputation" 
            value={scores.reputation} 
            onValueChange={(v) => updateScore('reputation', v)} 
          />
          <CustomRatingSlider 
            label="Quality" 
            value={scores.quality} 
            onValueChange={(v) => updateScore('quality', v)} 
          />
          <CustomRatingSlider 
            label="Amenities" 
            value={scores.amenities} 
            onValueChange={(v) => updateScore('amenities', v)} 
          />
          <CustomRatingSlider 
            label="Rental demand" 
            value={scores.rentalDemand} 
            onValueChange={(v) => updateScore('rentalDemand', v)} 
          />
          <CustomRatingSlider 
            label="Resale" 
            value={scores.resale} 
            onValueChange={(v) => updateScore('resale', v)} 
          />
        </View>

        {/* Extra padding at bottom so button doesn't cover last item */}
        <View style={{ height: 100 }} />

      </ScrollView>

      {/* --- Footer Button --- */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton} onPress={() => router.push('/home')}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: { padding: 4 },
  headerTitleContainer: { alignItems: 'center' },
  headerTitle: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  progressBar: { flexDirection: 'row', gap: 4 },
  progressDot: {
    width: 20,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#333',
  },
  progressActive: { backgroundColor: COLORS.primary },

  // Content Styles
  scrollContent: { padding: 20 },
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
  description: {
    color: '#666',
    fontSize: 12,
    marginBottom: 25,
    lineHeight: 18,
  },
  slidersList: {
    gap: 20, // Vertical spacing between sliders
  },

  // Slider Component Styles
  sliderRow: {
    marginBottom: 5,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sliderLabel: {
    color: COLORS.textGrey,
    fontSize: 14,
  },
  sliderValue: {
    color: COLORS.textWhite,
    fontSize: 24,
    fontWeight: '500',
  },
  sliderContainer: {
    height: 30,
    justifyContent: 'center',
    position: 'relative',
  },
  trackLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.sliderTrack,
    top: 14, // Roughly vertically centered
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotTouchArea: {
    padding: 5, // Hit slop for easier tapping
  },
  dotBase: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotInactive: {
    backgroundColor: COLORS.dotInactive,
  },
  dotActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.activeDotBorder,
    marginTop: -4, // Visual lift to keep centered on line
  },

  // Footer Styles
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  skipButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
});