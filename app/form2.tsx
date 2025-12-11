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
  cardBg: '#1C1C1E', // Slightly lighter for inputs/cards
  primary: '#E3FF50', // Neon Lime
  textWhite: '#FFFFFF',
  textGrey: '#A0A0A0',
  border: '#2C2C2E',
  danger: '#FF453A',
};

export default function PaymentDetailsScreen() {
  const router = useRouter();

  // --- Form State ---
  const [duringConstruction, setDuringConstruction] = useState('40%');
  const [onHandover, setOnHandover] = useState('60%');
  const [postHandover, setPostHandover] = useState('0');
  
  // Installments Mock Data
  const [installments, setInstallments] = useState([
    { id: 1, month: 'Nov', year: '2025', percent: '5%', label: 'Down Payment', isDropdown: false },
    { id: 2, month: 'Nov', year: '2025', percent: '30%', label: 'During Construction', isDropdown: true },
    { id: 3, month: 'Nov', year: '2025', percent: '5%', label: 'During Construction', isDropdown: true },
    { id: 4, month: 'Nov', year: '2025', percent: '50%', label: 'On Handover', isDropdown: true },
  ]);

  // --- Helper Components ---

  const InputLabel = ({ text, subLabel }: { text: string, subLabel?: string }) => (
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{text}</Text>
      {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
    </View>
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

  const BigStatBox = ({ label, value }: { label: string, value: string }) => (
    <View style={styles.statBox}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
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
          <Text style={styles.headerTitle}>Payment Details</Text>
          {/* Progress Bar (Step 3 active) */}
          <View style={styles.progressBar}>
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressActive]} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
          </View>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Construction & Handover Inputs */}
          <View style={styles.fieldGroup}>
            <InputLabel text="During Construction" />
            <CustomTextInput value={duringConstruction} onChange={setDuringConstruction} />
          </View>

          <View style={styles.fieldGroup}>
            <InputLabel text="On Handover" />
            <CustomTextInput value={onHandover} onChange={setOnHandover} />
          </View>

          <View style={styles.fieldGroup}>
            <InputLabel text="Post Handover" subLabel="Optional" />
            <CustomTextInput value={postHandover} onChange={setPostHandover} />
          </View>

          {/* Flip / Handover Row */}
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
                <BigStatBox label="Flip At" value="35%" />
            </View>
            <View style={{ flex: 1 }}>
                <BigStatBox label="Handover At" value="70%" />
            </View>
          </View>

          {/* Add Installments Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Add Installments</Text>
            <TouchableOpacity style={styles.addButtonSmall}>
                <Ionicons name="add" size={18} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.helperText}>
            Add installments to complete the 100% payment for the project.
          </Text>

          {/* Progress Card */}
          <View style={styles.progressCard}>
            <View style={styles.progressCardRow}>
                <View>
                    <Text style={styles.cardBigText}>100%</Text>
                    <Text style={styles.cardSubText}>Complete</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.cardBigText}>4</Text>
                    <Text style={styles.cardSubText}>Total Installments</Text>
                </View>
            </View>
            
            {/* Visual Dot Line */}
            <View style={styles.dotLineContainer}>
                {[...Array(12)].map((_, i) => (
                    <View key={i} style={[
                        styles.dot, 
                        // Highlight first 4 dots and make them bigger
                        i < 4 ? styles.dotActive : styles.dotInactive
                    ]} />
                ))}
            </View>
          </View>

          {/* Installments List */}
          <View style={styles.listContainer}>
            {installments.map((item, index) => (
                <View key={item.id} style={styles.listRow}>
                    <Text style={styles.colIndex}>{item.id}</Text>
                    <Text style={styles.colDate}>{item.month}   {item.year}</Text>
                    <Text style={styles.colPercent}>{item.percent}</Text>
                    
                    <View style={styles.colLabelContainer}>
                        <Text style={styles.colLabel}>{item.label}</Text>
                        {item.isDropdown && (
                            <Ionicons name="chevron-down" size={14} color={COLORS.textGrey} style={{marginLeft: 4}} />
                        )}
                    </View>

                    {/* Only show delete 'X' if it's not the first item (implied from screenshot logic) */}
                    {index > 0 ? (
                        <TouchableOpacity>
                            <Ionicons name="close" size={18} color={COLORS.textWhite} />
                        </TouchableOpacity>
                    ) : (
                        <View style={{width: 18}} /> 
                    )}
                </View>
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/form3')}>
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
  
  scrollContent: { padding: 20 },
  
  fieldGroup: { marginBottom: 20 },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: { color: COLORS.textGrey, fontSize: 14 },
  subLabel: { color: COLORS.textGrey, fontSize: 12, fontStyle: 'italic' },
  
  inputContainer: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: { color: COLORS.textWhite, fontSize: 16 },

  row: { flexDirection: 'row', marginBottom: 25 },
  statBox: {
    backgroundColor: COLORS.cardBg, // Or transparent if relying on border
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statLabel: { color: COLORS.textGrey, fontSize: 12, marginBottom: 4 },
  statValue: { color: COLORS.textWhite, fontSize: 24, fontWeight: '600' },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: { color: COLORS.textWhite, fontSize: 16, fontWeight: '600' },
  addButtonSmall: {
    backgroundColor: COLORS.primary,
    width: 24,
    height: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperText: { color: '#666', fontSize: 12, marginBottom: 20, lineHeight: 18 },

  // Progress Card Styles
  progressCard: {
    backgroundColor: '#252525', // Slightly lighter grey for the card bg
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 20,
  },
  progressCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardBigText: { color: COLORS.textWhite, fontSize: 24, fontWeight: '700' },
  cardSubText: { color: COLORS.textGrey, fontSize: 10 },
  
  dotLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#444',
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 10,
    height: 10,
    borderRadius: 5,
    top: -2, // Visual lift to center with smaller dots
  },
  dotInactive: {
    backgroundColor: COLORS.primary, // Using yellow for the "track" look if desired, or keep grey
    opacity: 0.3
  },

  // List Styles
  listContainer: { gap: 16 },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  colIndex: { width: 30, color: COLORS.textWhite, fontSize: 14 },
  colDate: { width: 90, color: COLORS.textWhite, fontSize: 14 },
  colPercent: { width: 50, color: COLORS.textWhite, fontSize: 14, fontWeight: '600' },
  colLabelContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 15
  },
  colLabel: { color: COLORS.textGrey, fontSize: 12, textAlign: 'right' },

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
});