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
  inputBg: '#1C1C1E',
};

export default function AddProjectScreen() {
  const router = useRouter();

  // --- Form State ---
  const [projectName, setProjectName] = useState('The Weave');
  const [location, setLocation] = useState('AL Jumeriah Village Circle');
  const [type, setType] = useState('Apartment');
  const [bedrooms, setBedrooms] = useState('1');
  const [status, setStatus] = useState('Off-Plan'); // 'Off-Plan' | 'Off-Resale' | 'Secondary'
  const [price, setPrice] = useState('1,225,600.00');
  const [areaFt, setAreaFt] = useState('776.00');
  const [areaM, setAreaM] = useState('72.09');
  const [dld, setDld] = useState('4');
  const [serviceCharge, setServiceCharge] = useState('11');

  // --- Helper Components ---

  const InputLabel = ({ text, helpIcon = false }: { text: string, helpIcon?: boolean }) => (
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{text}</Text>
      {helpIcon && <Ionicons name="help-circle-outline" size={16} color={COLORS.textGrey} style={{marginLeft: 4}} />}
    </View>
  );

  const CustomTextInput = ({ value, onChange, placeholder, keyboardType = 'default' }: any) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textGrey}
        keyboardType={keyboardType}
      />
    </View>
  );

  const DropdownInput = ({ value, label }: any) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputText}>{value}</Text>
      <Ionicons name="chevron-down" size={20} color={COLORS.textWhite} />
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
          <Text style={styles.headerTitle}>Add Project</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressDot, styles.progressActive]} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
          </View>
        </View>
        
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Project Name */}
          <View style={styles.fieldGroup}>
            <InputLabel text="Project Name" />
            <CustomTextInput value={projectName} onChange={setProjectName} />
          </View>

          {/* Developer */}
          <View style={styles.fieldGroup}>
            <InputLabel text="Developer" />
            <DropdownInput value="Al Ghurair" />
          </View>

          {/* Location */}
          <View style={styles.fieldGroup}>
            <InputLabel text="Location" />
            <CustomTextInput value={location} onChange={setLocation} />
          </View>

          {/* Type & Bedrooms Row */}
          <View style={styles.row}>
            <View style={[styles.fieldGroup, { flex: 1.5, marginRight: 10 }]}>
              <InputLabel text="Type" />
              <DropdownInput value={type} />
            </View>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <InputLabel text="Bedrooms" />
              <CustomTextInput value={bedrooms} onChange={setBedrooms} keyboardType="numeric" />
            </View>
          </View>

          {/* Status Selection */}
          <View style={styles.fieldGroup}>
            <InputLabel text="Status" helpIcon />
            <View style={styles.statusContainer}>
              {['Off-Plan', 'Off-Resale', 'Secondary'].map((item) => (
                <TouchableOpacity 
                  key={item} 
                  style={[styles.statusButton, status === item && styles.statusButtonActive]}
                  onPress={() => setStatus(item)}
                >
                  <Text style={[styles.statusText, status === item && styles.statusTextActive]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Currency & Price Row */}
          <View style={styles.row}>
            <View style={[styles.fieldGroup, { flex: 1, marginRight: 10 }]}>
              <InputLabel text="Currency" />
              <DropdownInput value="AED" />
            </View>
            <View style={[styles.fieldGroup, { flex: 2 }]}>
              <InputLabel text="Price" />
              <CustomTextInput value={price} onChange={setPrice} keyboardType="numeric" />
            </View>
          </View>

          {/* Area Row */}
          <View style={styles.row}>
            <View style={[styles.fieldGroup, { flex: 1, marginRight: 10 }]}>
              <InputLabel text="Area (ft²)" />
              <CustomTextInput value={areaFt} onChange={setAreaFt} keyboardType="numeric" />
            </View>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <InputLabel text="Area (m²)" />
              <CustomTextInput value={areaM} onChange={setAreaM} keyboardType="numeric" />
            </View>
          </View>

          {/* DLD */}
          <View style={styles.fieldGroup}>
            <InputLabel text="DLD (%)" />
            <CustomTextInput value={dld} onChange={setDld} keyboardType="numeric" />
          </View>

          {/* Service Charges */}
          <View style={styles.fieldGroup}>
            <InputLabel text="Service Charges/ft²" />
            <CustomTextInput value={serviceCharge} onChange={setServiceCharge} keyboardType="numeric" />
          </View>

          {/* Bottom Padding for scroll */}
          <View style={{ height: 100 }} />

        </ScrollView>

        {/* --- Footer Button --- */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/form2')}>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: COLORS.textGrey,
    fontSize: 14,
  },
  inputContainer: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    color: COLORS.textWhite,
    fontSize: 16,
    flex: 1,
  },
  inputText: {
    color: COLORS.textWhite,
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  statusButtonActive: {
    borderColor: COLORS.textGrey, // Slightly lighter border for active or keep dark
    backgroundColor: '#252525',
  },
  statusText: {
    color: COLORS.textGrey,
    fontSize: 13,
    fontWeight: '500',
  },
  statusTextActive: {
    color: COLORS.textWhite,
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
    borderRadius: 28, // Fully rounded pills
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
});