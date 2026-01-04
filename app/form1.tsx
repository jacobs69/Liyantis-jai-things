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
  const [projectName, setProjectName] = useState("");
  const [developer, setDeveloper] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [bedrooms, setBedrooms] = useState("");
  const [status, setStatus] = useState("");
  const [currency, setCurrency] = useState("AED");
  const [price, setPrice] = useState("");
  const [areaFt, setAreaFt] = useState("");
  const [areaM, setAreaM] = useState("");
  const [dld, setDld] = useState("");
  const [serviceCharge, setServiceCharge] = useState("");

  // Modal Visibility State
  const [showDevelopers, setShowDevelopers] = useState(false);
  const [showTypes, setShowTypes] = useState(false);
  const [showCurrencies, setShowCurrencies] = useState(false);

  // Validation State
  const [errors, setErrors] = useState({
    projectName: false,
    developer: false,
    location: false,
    bedrooms: false,
    status: false,
    price: false,
    areaFt: false,
    areaM: false,
    dld: false,
    serviceCharge: false,
  });
  const [showErrors, setShowErrors] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors = {
      projectName: !projectName.trim(),
      developer: !developer.trim(),
      location: !location.trim(),
      bedrooms: !bedrooms.trim(),
      status: !status.trim(),
      price: !price.trim(),
      areaFt: !areaFt.trim(),
      areaM: !areaM.trim(),
      dld: !dld.trim(),
      serviceCharge: !serviceCharge.trim(),
    };

    setErrors(newErrors);
    setShowErrors(true);

    // Check if any field has errors
    return !Object.values(newErrors).some(error => error);
  };

  // Handle next button press
  const handleNext = () => {
    if (validateForm()) {
      router.push('/form2');
    }
  };

  // Get error message for each field
  const getErrorMessage = (field: string) => {
    if (!showErrors || !errors[field as keyof typeof errors]) return '';
    
    switch (field) {
      case 'projectName':
        return '(Name required)';
      case 'developer':
        return '(Developer required)';
      case 'location':
        return '(Location required)';
      case 'bedrooms':
        return '(Select bedrooms)';
      case 'status':
        return '(Select status)';
      case 'price':
        return '(Price required)';
      case 'areaFt':
      case 'areaM':
        return '(Area required)';
      case 'dld':
      case 'serviceCharge':
        return '(This field is required)';
      default:
        return '';
    }
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
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          
          {/* Project Name */}
          <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Project Name</Text>
              {errors.projectName && showErrors && <Text style={styles.requiredAsterisk}>*</Text>}
            </View>
            <TextInput 
              style={[
                styles.input, 
                styles.inputFullWidth,
                errors.projectName && showErrors && styles.inputError
              ]}
              value={projectName}
              onChangeText={setProjectName}
              placeholderTextColor={COLORS.textGrey}
            />
          </View>

          {/* Developer Dropdown */}
          <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Developer</Text>
              {errors.developer && showErrors && <Text style={styles.requiredAsterisk}>*</Text>}
            </View>
            <TouchableOpacity 
              style={[
                styles.dropdownButton, 
                styles.dropdownFullWidth,
                errors.developer && showErrors && styles.inputError
              ]}
              onPress={() => setShowDevelopers(true)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.inputText,
                !developer && { color: COLORS.textGrey }
              ]} numberOfLines={1}>
                {developer || 'Select Developer'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={COLORS.textGrey} />
            </TouchableOpacity>
          </View>

          {/* Location */}
          <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Location</Text>
              {errors.location && showErrors && <Text style={styles.requiredAsterisk}>*</Text>}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={[
                  styles.input, 
                  styles.inputFullWidth, 
                  { paddingRight: 40 },
                  errors.location && showErrors && styles.inputError
                ]}
                value={location}
                onChangeText={setLocation}
                placeholderTextColor={COLORS.textGrey}
                placeholder="Enter location"
              />
              <View style={styles.inputIconContainer}>
                <Ionicons name="search" size={18} color={COLORS.textGrey} />
              </View>
            </View>
          </View>

          {/* Type & Bedrooms Row */}
          <View style={styles.row}>
            <View style={styles.fieldContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Type</Text>
              </View>
              <TouchableOpacity 
                style={[styles.dropdownButton, styles.dropdownType]}
                onPress={() => setShowTypes(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.inputText} numberOfLines={1}>
                  {propertyType}
                </Text>
                <Ionicons name="chevron-down" size={20} color={COLORS.textGrey} />
              </TouchableOpacity>
            </View>
            <View style={styles.fieldContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Bedrooms</Text>
                {errors.bedrooms && showErrors && <Text style={styles.requiredAsterisk}>*</Text>}
              </View>
              <TextInput 
                style={[
                  styles.input, 
                  styles.inputBedroom,
                  errors.bedrooms && showErrors && styles.inputError
                ]}
                value={bedrooms}
                onChangeText={setBedrooms}
                placeholderTextColor={COLORS.textGrey}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>
          </View>

          {/* Status Buttons */}
          <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Status</Text>
              <Ionicons name="information-circle-outline" size={14} color={COLORS.textGrey} style={styles.statusIcon} />
              {errors.status && showErrors && <Text style={styles.requiredAsterisk}>*</Text>}
            </View>
            <View style={styles.statusButtonRow}>
              {['Off-Plan', 'Off-Resale', 'Secondary'].map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setStatus(s)}
                  activeOpacity={0.8}
                  style={[
                    styles.statusButton,
                    status === s ? styles.statusButtonActive : styles.statusButtonInactive,
                    errors.status && showErrors && !status && styles.inputError
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
            <View style={styles.fieldContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Currency</Text>
              </View>
              <TouchableOpacity 
                style={[styles.dropdownButton, styles.dropdownCurrency]}
                onPress={() => setShowCurrencies(true)}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-down" size={18} color={COLORS.textGrey} />
                <Text style={[styles.inputText, { fontWeight: '600', marginLeft: 4 }]} numberOfLines={1}>
                  {currency}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.fieldContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Price</Text>
                {errors.price && showErrors && <Text style={styles.requiredAsterisk}>*</Text>}
              </View>
              <TextInput 
                style={[
                  styles.input, 
                  styles.inputPrice, 
                  { 
                    textAlign: 'right', 
                    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' 
                  },
                  errors.price && showErrors && styles.inputError
                ]}
                value={price}
                onChangeText={setPrice}
                placeholderTextColor={COLORS.textGrey}
                keyboardType="numeric"
                placeholder="0.00"
              />
            </View>
          </View>

          {/* Area Row */}
          <View style={styles.row}>
            <View style={[styles.fieldContainer, { alignItems: 'flex-start' }]}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Area (ft²)</Text>
                {errors.areaFt && showErrors && <Text style={styles.requiredAsterisk}>*</Text>}
              </View>
              <TextInput 
                style={[
                  styles.input, 
                  styles.inputAreaFt,
                  errors.areaFt && showErrors && styles.inputError
                ]}
                value={areaFt}
                onChangeText={setAreaFt}
                placeholderTextColor={COLORS.textGrey}
                keyboardType="numeric"
                placeholder="0.00"
              />
            </View>
            <View style={[styles.fieldContainer, { alignItems: 'flex-start' }]}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Area (m²)</Text>
              </View>
              <TextInput 
                style={[
                  styles.input, 
                  styles.inputAreaM
                ]}
                value={areaM}
                onChangeText={setAreaM}
                placeholderTextColor={COLORS.textGrey}
                keyboardType="numeric"
                placeholder="0.00"
              />
            </View>
          </View>

          {/* DLD */}
          <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>DLD (%)</Text>
              {errors.dld && showErrors && <Text style={styles.requiredAsterisk}>*</Text>}
            </View>
            <TextInput 
              style={[
                styles.input, 
                styles.inputFullWidth,
                errors.dld && showErrors && styles.inputError
              ]}
              value={dld}
              onChangeText={setDld}
              placeholderTextColor={COLORS.textGrey}
              keyboardType="numeric"
              placeholder="0"
            />
          </View>

          {/* Service Charges */}
          <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Service Charges/ft²</Text>
              {errors.serviceCharge && showErrors && <Text style={styles.requiredAsterisk}>*</Text>}
            </View>
            <TextInput 
              style={[
                styles.input, 
                styles.inputFullWidth,
                errors.serviceCharge && showErrors && styles.inputError
              ]}
              value={serviceCharge}
              onChangeText={setServiceCharge}
              placeholderTextColor={COLORS.textGrey}
              keyboardType="numeric"
              placeholder="0"
            />
          </View>

          {/* Next Button - Now part of scroll content */}
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
    marginBottom: 6, // Reduced from 12 to 6 to bring header closer to content
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
    paddingHorizontal: 16, // 16px left and right margins
    paddingVertical: 25, // Increased from 15 to 25 to move content down
    paddingBottom: 40, // Normal padding since button is now in scroll content
    alignItems: 'center', // Center all content in the scroll view
  },
  fieldContainer: {
    marginBottom: 12, // Reverted back from 6px to 12px
    alignItems: 'center', // Center all fields
  },
  row: {
    flexDirection: 'row',
    marginBottom: 0,
    justifyContent: 'space-between', // Align to edges
    alignItems: 'flex-start',
    width: 320, // Reduced from 330 to ensure content fits
    gap: 10, // Reverted back to original gap
  },
  label: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    marginBottom: 8, // Changed from 4 to 8px gap between project name and box
    alignSelf: 'flex-start', // Align labels to the left of their containers
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
    alignSelf: 'flex-start', // Align label row to the left
    width: '100%', // Ensure full width for proper alignment
  },
  statusIcon: {
    marginTop: 2, // Increased from 1.25 to 2 to move icon down
  },
  input: {
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
  inputFullWidth: {
    width: 320, // Reduced from 330 to match new row width
  },
  inputType: {
    width: 155, // Reverted back to original size
    marginRight: 0, // Remove margin since we're using gap
  },
  inputBedroom: {
    width: 155, // Reverted back to original size
  },
  inputCurrency: {
    width: 100, // Reduced currency box width
    marginRight: 0, // Remove margin since we're using gap
  },
  inputPrice: {
    width: 210, // Increased price box width (320 - 100 - 10 = 210)
  },
  inputAreaFt: {
    width: 155, // Reduced from 160.5 to ensure both boxes fit
    marginRight: 0, // Remove margin since we're using gap
  },
  inputAreaM: {
    width: 155, // Reverted back to original size
  },
  inputText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    flex: 1,
  },
  dropdownButton: {
    height: 48,
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
  dropdownFullWidth: {
    width: 320, // Reduced to match new container width
  },
  dropdownType: {
    width: 160.5, // Adjusted for symmetry with 9px gap: (330-9)/2 = 160.5
    marginRight: 0, // Remove margin since we're using gap
  },
  dropdownCurrency: {
    width: 100, // Updated to match new currency box size
    marginRight: 0, // Remove margin since we're using gap
    justifyContent: 'flex-start', // Align content to the left
    paddingHorizontal: 8, // Reduced padding for smaller box
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
    gap: 8,
    justifyContent: 'flex-start', // Changed from center to flex-start to align left like Type box
    width: 320, // Reduced to match new container width
  },
  statusButton: {
    width: 101, // Adjusted for new total width: (320-16)/3 = 101.33 ≈ 101
    height: 48,
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
    fontSize: 16,
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
  // Error Styles
  inputError: {
    borderColor: '#FF4444',
    borderWidth: 1,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  errorTextInline: {
    color: '#FF4444',
    fontSize: 12, // Reduced from 14 to 12 for smaller text
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    marginLeft: 8,
  },
  errorTextInlineSmall: {
    color: '#FF4444',
    fontSize: 10, // Even smaller for bedrooms and area
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    marginLeft: 8,
  },
  requiredAsterisk: {
    color: '#FF4444',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});