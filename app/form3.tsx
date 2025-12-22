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
  background: '#121214',
  cardBg: '#1C1C1E',
  primary: '#E3FF50', // The neon lime/yellow
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
    <View style={styles.strategyBox}>
      <Text style={styles.strategyLabel}>{label}</Text>
      <TextInput
        style={styles.strategyInput}
        value={value}
        onChangeText={onChange}
      />
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

        </ScrollView>

        {/* --- Footer Button --- */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/form4')}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>

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
    width: 20,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#333',
  },
  progressActive: {
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    padding: 20,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    color: COLORS.textGrey,
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    color: COLORS.textWhite,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },
  sectionHeader: {
    marginBottom: 15,
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
    justifyContent: 'space-between',
  },
  strategyBox: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  strategyLabel: {
    color: COLORS.textGrey,
    fontSize: 12,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  strategyInput: {
    color: COLORS.textWhite,
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
    width: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
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