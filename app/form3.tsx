import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// --- Constants & Theme ---
const COLORS = {
  background: '#181A20',
  cardBg: '#1C1C1E',
  primary: '#EEFB73', // Updated yellow color
  textWhite: '#FFFFFF',
  textGrey: '#A0A0A0',
  border: '#2C2C2E',
};

export default function ProjectionsScreen() {
  const router = useRouter();

  // --- Form State ---
  const [yoyBefore, setYoyBefore] = useState('8%');
  const [yoyPost, setYoyPost] = useState('7%');
  const [rentalYield, setRentalYield] = useState('10%');
  
  // Exit Strategies State
  const [conservative, setConservative] = useState('-50%');
  const [optimistic, setOptimistic] = useState('+25%');

  // --- Helper Components ---
  const InputLabel = ({ text }: { text: string }) => (
    <Text style={styles.label}>{text}</Text>
  );

  const CustomTextInput = ({ value, onChange, placeholder }: any) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textGrey}
      />
    </View>
  );

  // Large Box for Exit Strategies
  const StrategyBox = ({ label, value, onChange }: any) => (
    <View style={styles.strategyFieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.strategyInputContainer}>
        <TextInput
          value={String(value)}
          onChangeText={onChange}
          style={styles.strategyInput}
          placeholderTextColor={COLORS.textGrey}
          keyboardType="numeric"
          multiline={false}
          scrollEnabled={false}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- Header --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textWhite} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Projections</Text>
          {/* Progress Bar (Step 3 Active) */}
          <View style={styles.progressBar}>
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressActive]} />
            <View style={styles.progressDot} />
          </View>
        </View>
        
        <View style={styles.spacer} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* YoY Growth Before Handover */}
          <View style={styles.fieldGroup}>
            <InputLabel text="YoY Growth Before Handover" />
            <CustomTextInput value={yoyBefore} onChange={setYoyBefore} />
          </View>

          {/* YoY Growth Post Handover */}
          <View style={styles.fieldGroup}>
            <InputLabel text="YoY Growth Post Handover" />
            <CustomTextInput value={yoyPost} onChange={setYoyPost} />
          </View>

          {/* Rental Yield */}
          <View style={styles.fieldGroup}>
            <InputLabel text="Rental Yield" />
            <CustomTextInput value={rentalYield} onChange={setRentalYield} />
          </View>

          {/* Divider Line */}
          <View style={styles.divider} />

          {/* Exit Strategies Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exit Strategies</Text>
            
            {/* Line under Exit Strategies title */}
            <View style={styles.exitStrategiesUnderline} />
            
            <Text style={styles.sectionDesc}>
              Decide how markets can behave in a conservative approach and an optimistic approach.
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.strategyColumn}>
              <StrategyBox 
                label="Conservative" 
                value={conservative} 
                onChange={setConservative} 
              />
            </View>
            <View style={styles.strategyColumnRight}>
              <StrategyBox 
                label="Optimistic" 
                value={optimistic} 
                onChange={setOptimistic} 
              />
            </View>
          </View>

          {/* Next Button - Now part of scroll content */}
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/form4')}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  progressBar: {
    flexDirection: 'row',
    gap: 4,
  },
  progressDot: {
    width: 27,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#D9D9D9',
  },
  progressActive: {
    backgroundColor: '#EEFB73',
  },
  scrollContent: {
    paddingHorizontal: 20, // Changed from 18px to 20px left and right margins
    paddingVertical: 20, // Keep vertical padding
    paddingBottom: 40, // Normal padding since button is now in scroll content
    alignItems: 'center', // Center all content
  },
  fieldGroup: {
    marginBottom: 20,
    alignItems: 'center', // Center the input fields
  },
  label: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    marginBottom: 8,
    alignSelf: 'flex-start', // Align labels to the left of their containers
  },
  inputContainer: {
    width: 330, // Increased from 315 to 330 for slightly wider top three boxes
    height: 48,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  strategyInputContainer: {
    width: 153, // Increased to fit within 315px total width with 9px gap: (315-9)/2 = 153
    height: 60, // Increased from 48 to 60 to accommodate larger text
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8, // Add vertical padding to center the text properly
  },
  strategyFieldGroup: {
    marginBottom: 20,
    alignItems: 'center', // Center the strategy fields
  },
  input: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    textAlign: 'left',
  },
  strategyInput: {
    color: '#F5F5F5',
    fontSize: 26, // Increased from 22 to 26 for larger text
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false, // Remove extra font padding on Android
    padding: 0, // Remove any default padding that might clip the text
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 1, // Reduced from 2 to 1 to move Exit Strategies slightly up
  },
  sectionHeader: {
    marginBottom: 20, // Changed to 20 to match the fieldGroup spacing
  },
  exitStrategiesUnderline: {
    width: 330, // Changed from 343 to 330 to match the input boxes above
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)', // 25% opacity white line
    marginVertical: 8, // Add spacing above and below the line
    alignSelf: 'center', // Center the line
  },
  sectionTitle: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDesc: {
    color: '#666',
    fontSize: 12,
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Changed from center to space-between to align with edges
    alignItems: 'flex-start',
    width: 315, // Increased from 303 to 315 for slightly wider layout
    gap: 9, // Keep 9px gap between conservative and optimistic boxes
  },
  strategyBox: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  strategyLabel: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  nextButtonContainer: {
    marginTop: 60, // Increased from 50 to 60 to move button down a little more
    marginBottom: 20, // Bottom margin for scroll content
    alignItems: 'center', // Center the button horizontally
  },
  nextButton: {
    backgroundColor: '#EEFB73',
    width: 315, // Increased from 303 to 315 for slightly wider button
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
    width: 24,
  },
  strategyColumn: {
    flex: 1,
    marginRight: 10,
  },
  strategyColumnRight: {
    flex: 1,
  },
});