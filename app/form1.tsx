import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
  inputBg: '#1C1C1E',
};

// --- DATA LISTS ---
const DEVELOPERS = [
  "Al Ghurair",
  "Emaar Properties",
  "DAMAC Properties",
  "Nakheel",
  "Dubai Properties (Meraas)",
  "Sobha Realty",
  "Deyaar",
  "Azizi Developments",
  "Danube Properties",
  "Ellington Properties",
  "Binghatti Developers",
  "Omniyat",
  "Aldar Properties",
  "Nshama",
  "Select Group",
  "Tiger Group",
  "MAG Property Development",
  "Iman Developers",
  "Al Barari",
  "Majid Al Futtaim",
  "Wasl Properties",
  "Bloom Holding"
];

const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Townhouse",
  "Penthouse",
  "Duplex",
  "Loft",
  "Hotel Apartment",
  "Whole Building",
  "Land / Plot",
  "Office",
  "Shop / Retail",
  "Warehouse",
  "Labor Camp"
];

const CURRENCIES = [
  { code: "AED", name: "United Arab Emirates Dirham" },
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "INR", name: "Indian Rupee" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "QAR", name: "Qatari Riyal" },
  { code: "KWD", name: "Kuwaiti Dinar" },
  { code: "OMR", name: "Omani Rial" },
  { code: "BHD", name: "Bahraini Dinar" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "RUB", name: "Russian Ruble" }
];

// --- COMPONENTS ---
const SelectionModal = ({ title, isOpen, onClose, items, onSelect, selectedItem, renderItem }: any) => {
  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{title}</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.modalDoneButton}>Done</Text>
                </TouchableOpacity>
              </View>

              {/* List */}
              <ScrollView style={styles.modalList} contentContainerStyle={{ paddingBottom: 40 }}>
                {items.map((item: any, index: number) => {
                  const itemValue = item.code || item;
                  const isSelected = selectedItem === itemValue;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        onSelect(item);
                        onClose();
                      }}
                      style={[
                        styles.modalItem,
                        isSelected && styles.modalItemSelected
                      ]}
                    >
                      <Text style={[
                        styles.modalItemText,
                        isSelected && styles.modalItemTextSelected
                      ]}>
                        {renderItem ? renderItem(item) : item}
                      </Text>
                      {isSelected && <Ionicons name="checkmark" size={20} color="#60A5FA" />}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default function AddProjectScreen() {
  const router = useRouter();

  // Form State
  const [projectName, setProjectName] = useState("The Weave");
  const [developer, setDeveloper] = useState("Al Ghurair");
  const [location, setLocation] = useState("AL Jumeriah Village Circle");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [bedrooms, setBedrooms] = useState("1");
  const [status, setStatus] = useState("Off-Plan");
  const [currency, setCurrency] = useState("AED");
  const [price, setPrice] = useState("1,225,600.00");
  const [areaFt, setAreaFt] = useState("776.00");
  const [areaM, setAreaM] = useState("72.09");
  const [dld, setDld] = useState("4");
  const [serviceCharge, setServiceCharge] = useState("11");

  // Modal Visibility State
  const [showDevelopers, setShowDevelopers] = useState(false);
  const [showTypes, setShowTypes] = useState(false);
  const [showCurrencies, setShowCurrencies] = useState(false);



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
        
        <View style={{ width: 24 }} /> {/* Spacer for alignment */}
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          
          {/* Project Name */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Project Name</Text>
            <TextInput 
              style={styles.input}
              value={projectName}
              onChangeText={setProjectName}
              placeholderTextColor={COLORS.textGrey}
            />
          </View>

          {/* Developer Dropdown */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Developer</Text>
            <TouchableOpacity 
              style={styles.dropdownButton}
              onPress={() => setShowDevelopers(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.inputText} numberOfLines={1}>
                {developer}
              </Text>
              <Ionicons name="chevron-down" size={20} color={COLORS.textGrey} />
            </TouchableOpacity>
          </View>

          {/* Location */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={[styles.input, { paddingRight: 40 }]}
                value={location}
                onChangeText={setLocation}
                placeholderTextColor={COLORS.textGrey}
              />
              <View style={styles.inputIconContainer}>
                <Ionicons name="search" size={18} color={COLORS.textGrey} />
              </View>
            </View>
          </View>

          {/* Type & Bedrooms Row */}
          <View style={styles.row}>
            <View style={[styles.fieldContainer, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Type</Text>
              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => setShowTypes(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.inputText} numberOfLines={1}>
                  {propertyType}
                </Text>
                <Ionicons name="chevron-down" size={20} color={COLORS.textGrey} />
              </TouchableOpacity>
            </View>
            <View style={[styles.fieldContainer, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Bedrooms</Text>
              <TextInput 
                style={[styles.input, { textAlign:'left'}]}
                value={bedrooms}
                onChangeText={setBedrooms}
                placeholderTextColor={COLORS.textGrey}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Status Buttons */}
          <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Status</Text>
              <Ionicons name="information-circle-outline" size={14} color={COLORS.textGrey} style={styles.statusIcon} />
            </View>
            <View style={styles.statusButtonRow}>
              {['Off-Plan', 'Off-Resale', 'Secondary'].map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setStatus(s)}
                  activeOpacity={0.8}
                  style={[
                    styles.statusButton,
                    status === s ? styles.statusButtonActive : styles.statusButtonInactive
                  ]}
                >
                  <Text style={[
                    styles.statusButtonText,
                    status === s ? styles.statusButtonTextActive : styles.statusButtonTextInactive
                  ]}>
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Currency & Price Row */}
          <View style={styles.row}>
            <View style={[styles.fieldContainer, { width: '30%', marginRight: 8 }]}>
              <Text style={styles.label}>Currency</Text>
              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => setShowCurrencies(true)}
                activeOpacity={0.7}
              >
                <Text style={[styles.inputText, { fontWeight: '600' }]} numberOfLines={1}>
                  {currency}
                </Text>
                <Ionicons name="chevron-down" size={18} color={COLORS.textGrey} />
              </TouchableOpacity>
            </View>
            <View style={[styles.fieldContainer, { flex: 1 }]}>
              <Text style={styles.label}>Price</Text>
              <TextInput 
                style={[styles.input, { 
                  textAlign: 'right', 
                  fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' 
                }]}
                value={price}
                onChangeText={setPrice}
                placeholderTextColor={COLORS.textGrey}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Area Row */}
          <View style={styles.row}>
            <View style={[styles.fieldContainer, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Area (ft²)</Text>
              <TextInput 
                style={styles.input}
                value={areaFt}
                onChangeText={setAreaFt}
                placeholderTextColor={COLORS.textGrey}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.fieldContainer, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Area (m²)</Text>
              <TextInput 
                style={styles.input}
                value={areaM}
                onChangeText={setAreaM}
                placeholderTextColor={COLORS.textGrey}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* DLD */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>DLD (%)</Text>
            <TextInput 
              style={styles.input}
              value={dld}
              onChangeText={setDld}
              placeholderTextColor={COLORS.textGrey}
              keyboardType="numeric"
            />
          </View>

          {/* Service Charges */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Service Charges/ft²</Text>
            <TextInput 
              style={styles.input}
              value={serviceCharge}
              onChangeText={setServiceCharge}
              placeholderTextColor={COLORS.textGrey}
              keyboardType="numeric"
            />
          </View>

          {/* Next Button - Now part of scroll content */}
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/form2')}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

      </KeyboardAvoidingView>

      {/* --- MODALS --- */}
      <SelectionModal 
        title="Select Developer"
        isOpen={showDevelopers}
        onClose={() => setShowDevelopers(false)}
        items={DEVELOPERS}
        selectedItem={developer}
        onSelect={setDeveloper}
      />

      <SelectionModal 
        title="Property Type"
        isOpen={showTypes}
        onClose={() => setShowTypes(false)}
        items={PROPERTY_TYPES}
        selectedItem={propertyType}
        onSelect={setPropertyType}
      />

      <SelectionModal 
        title="Select Currency"
        isOpen={showCurrencies}
        onClose={() => setShowCurrencies(false)}
        items={CURRENCIES}
        selectedItem={currency}
        onSelect={(item: any) => setCurrency(item.code)}
        renderItem={(item: any) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', width: 45 }}>
              {item.code}
            </Text>
            <Text style={{ color: '#9CA3AF', fontSize: 14 }}>
              {item.name}
            </Text>
          </View>
        )}
      />

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
    marginBottom: 12, // 12px spacing between "Add Project" and "Project Name"
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
    padding: 20,
    paddingBottom: 40, // Normal padding since button is now in scroll content
  },
  fieldContainer: {
    marginBottom: 18, // Reduced from 23px to 18px spacing between fields
  },
  row: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  label: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    marginBottom: 12, // 12px spacing between label and input box
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: 12, // 12px spacing between label and input box
  },
  statusIcon: {
    marginTop: 1.5, // Slight downward adjustment
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: 'transparent',
    color: '#F5F5F5',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },
  inputText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    flex: 1,
  },
  dropdownButton: {
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputIconContainer: {
    position: 'absolute',
    right: 12,
  },
  // Status Buttons
  statusButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusButtonActive: {
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
  },
  statusButtonInactive: {
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
  },
  statusButtonText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },
  statusButtonTextActive: {
    color: COLORS.textWhite,
  },
  statusButtonTextInactive: {
    color: COLORS.textGrey,
  },
  nextButtonContainer: {
    marginTop: 30, // 30px spacing after Service Charges
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1e1e24',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    maxHeight: '70%',
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  modalDoneButton: {
    color: COLORS.textGrey,
    fontSize: 14,
    fontWeight: '500',
  },
  modalList: {
    padding: 8,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 4,
  },
  modalItemSelected: {
    backgroundColor: 'rgba(37, 99, 235, 0.2)',
  },
  modalItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#D1D5DB',
  },
  modalItemTextSelected: {
    color: '#60A5FA',
  },
});