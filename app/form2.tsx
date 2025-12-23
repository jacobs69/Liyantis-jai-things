import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
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
  cardBg: '#1C1C1E', // Slightly lighter for inputs/cards
  primary: '#EEFB73', // Updated yellow color
  textWhite: '#FFFFFF',
  textGrey: '#A0A0A0',
  border: '#2C2C2E',
  danger: '#FF453A',
};

// --- Components ---
const InputField = ({ label, value, onChangeText, optional = false, suffix = '%' }: any) => (
  <View style={styles.inputContainer}>
    <View style={styles.labelRow}>
      <Text style={styles.label}>{label}</Text>
      {optional && <Text style={styles.optionalLabel}>Optional</Text>}
    </View>
    <View style={styles.inputWrapper}>
      <TextInput
        value={String(value)}
        onChangeText={onChangeText}
        style={styles.input}
        placeholderTextColor={COLORS.textGrey}
        keyboardType="default"
      />
      {suffix && <Text style={styles.suffix}>{suffix}</Text>}
    </View>
  </View>
);

export default function PaymentDetailsScreen() {
  const router = useRouter();

  // --- State ---
  const [constructionTarget, setConstructionTarget] = useState("40");
  const [handoverTarget, setHandoverTarget] = useState("60");
  const [postHandoverTarget, setPostHandoverTarget] = useState("0");
  const [flipAt, setFlipAt] = useState("35%");
  const [handoverAt, setHandoverAt] = useState("70%");
  
  const [installments, setInstallments] = useState([
    { id: 1, displayId: "1", month: 'Nov', year: '2025', percent: 5, type: 'Down Payment' },
    { id: 2, displayId: "2", month: 'Nov', year: '2025', percent: 30, type: 'During Construction' },
    { id: 3, displayId: "3", month: 'Nov', year: '2025', percent: 5, type: 'During Construction' },
    { id: 4, displayId: "4", month: 'Nov', year: '2025', percent: 50, type: 'On Handover' },
  ]);

  // State for managing the custom dropdown
  const [activeDropdownId, setActiveDropdownId] = useState<number | string | null>(null);

  // --- Computed Values ---
  const totalPercent = useMemo(() => {
    return installments.reduce((acc, curr) => acc + (Number(curr.percent) || 0), 0);
  }, [installments]);

  const totalCount = installments.length;

  // --- Handlers ---
  const addInstallment = () => {
    const newId = installments.length > 0 ? Math.max(...installments.map(i => i.id)) + 1 : 1;
    const nextDisplayId = String(installments.length + 1);
    const newInstallment = {
      id: newId,
      displayId: nextDisplayId,
      month: 'Dec',
      year: '2025',
      percent: 0,
      type: 'During Construction',
    };
    setInstallments([...installments, newInstallment]);
  };

  const removeInstallment = (id: number) => {
    setInstallments(installments.filter((item) => item.id !== id));
  };

  const updateInstallment = (id: number, field: string, value: any) => {
    setInstallments(installments.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
    if (field === 'type' || field === 'month') {
      setActiveDropdownId(null); // Close dropdown after selection
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
          <Text style={styles.headerTitle}>Payment Details</Text>
          {/* Progress Bar (Step 2 active) */}
          <View style={styles.progressBar}>
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressActive]} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
          </View>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* Click overlay to close type dropdowns only */}
      {activeDropdownId !== null && !activeDropdownId.toString().startsWith('month-') && (
        <TouchableWithoutFeedback onPress={() => setActiveDropdownId(null)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          
          {/* Top Configuration Section */}
          <View style={styles.configSection}>
            <InputField 
              label="During Construction" 
              value={constructionTarget} 
              onChangeText={setConstructionTarget} 
              suffix={null}
            />
            <InputField 
              label="On Handover" 
              value={handoverTarget} 
              onChangeText={setHandoverTarget} 
              suffix={null}
            />
            <InputField 
              label="Post Handover" 
              value={postHandoverTarget} 
              onChangeText={setPostHandoverTarget} 
              optional 
              suffix={null}
            />
            
            <View style={styles.flipAtRow}>
              <View style={styles.flipAtContainer}>
                <View style={styles.inputContainer}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Flip At</Text>
                  </View>
                  <View style={styles.flipAtInputWrapper}>
                    <TextInput
                      value={String(flipAt)}
                      onChangeText={setFlipAt}
                      style={styles.flipAtInput}
                      placeholderTextColor={COLORS.textGrey}
                      keyboardType="default"
                    />
                  </View>
                </View>
              </View>
              <View style={styles.flipAtContainer}>
                <View style={styles.inputContainer}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Handover At</Text>
                  </View>
                  <View style={styles.handoverInputWrapper}>
                    <TextInput
                      value={String(handoverAt)}
                      onChangeText={setHandoverAt}
                      style={styles.flipAtInput}
                      placeholderTextColor={COLORS.textGrey}
                      keyboardType="default"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Add Installments Header */}
          <View style={styles.headerRow}>
            <Text style={styles.sectionHeaderTitle}>Add Installments</Text>
            <TouchableOpacity onPress={addInstallment} style={styles.addButton}>
              <Ionicons name="add" size={16} color="#000000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.subText}>
            Add installments to complete the 100% payment for the project.
          </Text>

          {/* Progress Card (The "Graph") */}
          <LinearGradient
            colors={['#D2D2D2', '#676767']}
            style={styles.cardGradientBorder}
          >
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <View style={styles.percentRow}>
                    <Text style={styles.bigPercent}>90%</Text>
                  </View>
                  <Text style={styles.cardLabel}>COMPLETE</Text>
                </View>
                <View style={{ alignItems: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.bigCount}>{totalCount}</Text>
                  <Text style={[styles.cardLabel, { color: '#FFFFFF', marginLeft: 8 }]}>Total Installments</Text>
                </View>
              </View>

              {/* Dynamic Timeline */}
              <View style={styles.timelineContainer}>
                {/* Background Track Line */}
                <View style={styles.trackLine} />
                
                {/* Active Progress Nodes */}
                <View style={styles.nodesContainer}>
                  {installments.map((inst, index) => {
                    const count = installments.length;
                    const positionPercent = count > 1 ? (index / (count - 1)) * 100 : 0;
                    return (
                      <View 
                        key={inst.id} 
                        style={[
                          styles.nodeWrapper,
                          { left: `${positionPercent}%` }
                        ]}
                      >
                        <View style={[
                          styles.node,
                          count > 30 && styles.nodeSmall
                        ]} />
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Installments List */}
          <View style={styles.listContainer}>
            {installments.map((inst) => {
              const isTypeDropdownOpen = activeDropdownId === inst.id;
              const isMonthDropdownOpen = activeDropdownId === `month-${inst.id}`;
              const isAnyDropdownOpen = isTypeDropdownOpen || isMonthDropdownOpen;
              return (
                <View key={inst.id} style={[
                  styles.listItem,
                  { zIndex: isAnyDropdownOpen ? 100 : 0 }
                ]}>
                  {/* Editable Index */}
                  <TextInput
                    style={styles.indexInput}
                    value={inst.displayId}
                    onChangeText={(text) => updateInstallment(inst.id, 'displayId', text)}
                  />

                  {/* Editable Date */}
                  <View style={styles.dateColumn}>
                    <View style={styles.dateRow}>
                      <TouchableOpacity 
                        style={styles.monthDropdown}
                        onPress={() => setActiveDropdownId(`month-${inst.id}`)}
                      >
                        <Text style={styles.monthText}>{inst.month}</Text>
                        <Ionicons name="chevron-down" size={12} color="#64748b" />
                      </TouchableOpacity>
                      <Text style={styles.yearText}>{inst.year}</Text>
                    </View>
                  </View>

                  {/* Percentage Input */}
                  <View style={styles.percentInputWrapper}>
                    <TextInput
                      style={styles.percentInput}
                      value={String(inst.percent)}
                      onChangeText={(text) => updateInstallment(inst.id, 'percent', Number(text))}
                      placeholder="0"
                      placeholderTextColor="#64748b"
                      keyboardType="numeric"
                    />
                    <Text style={styles.percentSuffix}>%</Text>
                  </View>

                  {/* Type Dropdown / Label */}
                  <View style={styles.typeWrapper}>
                    <TouchableOpacity 
                      style={styles.typeRow}
                      onPress={() => {
                        if (inst.type !== 'Down Payment') {
                          setActiveDropdownId(isTypeDropdownOpen ? null : inst.id);
                        }
                      }}
                    >
                      <Text style={styles.typeText} numberOfLines={1}>
                        {inst.type}
                      </Text>
                      {inst.type !== 'Down Payment' && (
                        <Ionicons name="chevron-down" size={14} color="#64748b" style={{ marginLeft: 4 }} />
                      )}
                    </TouchableOpacity>

                    {/* Custom Dropdown Menu */}
                    {isTypeDropdownOpen && (
                      <View style={styles.dropdownMenu}>
                        <TouchableOpacity 
                          style={styles.dropdownItem}
                          onPress={() => updateInstallment(inst.id, 'type', 'During Construction')}
                        >
                          <Text style={styles.dropdownItemText}>During Construction</Text>
                        </TouchableOpacity>
                        <View style={styles.dropdownDivider} />
                        <TouchableOpacity 
                          style={styles.dropdownItem}
                          onPress={() => updateInstallment(inst.id, 'type', 'On Handover')}
                        >
                          <Text style={styles.dropdownItemText}>On Handover</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  {/* Remove Action */}
                  <TouchableOpacity 
                    onPress={() => removeInstallment(inst.id)}
                    style={styles.removeButton}
                  >
                    <Ionicons name="close" size={16} color="#94a3b8" />
                  </TouchableOpacity>
                </View>
              );
            })}
            
            {installments.length === 0 && (
              <Text style={styles.emptyText}>
                No installments added. Tap + to start.
              </Text>
            )}
          </View>

          {/* Footer Info */}
          <View style={styles.footerInfo}>
            <View style={styles.footerContent}>
              <Ionicons name="information-circle-outline" size={12} color={COLORS.textGrey} />
              <Text style={styles.footerText}>Total calculated automatically</Text>
            </View>
          </View>

          {/* Next Button - Now part of scroll content */}
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/form3')}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Month Selection Modal */}
      <Modal
        visible={activeDropdownId !== null && activeDropdownId.toString().startsWith('month-')}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setActiveDropdownId(null)}
      >
        <TouchableOpacity 
          style={styles.modalBackdrop} 
          activeOpacity={1} 
          onPress={() => setActiveDropdownId(null)}
        >
          <View style={styles.monthModalMenu}>
            <FlatList
              data={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
              keyExtractor={(item) => item}
              renderItem={({ item, index }: { item: string; index: number }) => {
                const currentInstallmentId = activeDropdownId ? parseInt(activeDropdownId.toString().replace('month-', '')) : null;
                const currentInstallment = installments.find(inst => inst.id === currentInstallmentId);
                const isSelected = currentInstallment?.month === item;
                
                return (
                  <View>
                    <TouchableOpacity
                      style={[styles.monthModalItem, isSelected && styles.monthModalItemSelected]}
                      onPress={() => {
                        if (currentInstallmentId) {
                          updateInstallment(currentInstallmentId, 'month', item);
                        }
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.monthModalItemText, isSelected && styles.monthModalItemTextSelected]}>
                        {item}
                      </Text>
                      {isSelected && (
                        <View style={styles.checkIcon}>
                          <Ionicons name="checkmark" size={16} color="#60a5fa" />
                        </View>
                      )}
                    </TouchableOpacity>
                    {index < 11 && <View style={styles.monthModalSeparator} />}
                  </View>
                );
              }}
              bounces={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
    color: '#F5F5F5',
    fontSize: 19,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  progressBar: { flexDirection: 'row', gap: 4 },
  progressDot: {
    width: 27,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#D9D9D9',
  },
  progressActive: { backgroundColor: '#EEFB73' },
  
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    backgroundColor: 'transparent',
  },

  scrollContent: { 
    padding: 20,
    paddingBottom: 40,
  },

  // --- Config Section ---
  configSection: {
    marginBottom: 24,
    gap: 16,
  },
  inputContainer: {
    gap: 8,
    marginBottom: 14, // Updated to 14px spacing between fields
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  label: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
  optionalLabel: {
    color: COLORS.textGrey,
    fontSize: 12,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 16,
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },
  suffix: {
    position: 'absolute',
    right: 16,
    color: COLORS.textGrey,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  flipAtRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  flipAtContainer: {
    marginRight: 8,
  },
  flipAtInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#27292D',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 10,
    width: 167,
    height: 48,
    paddingHorizontal: 16,
  },
  handoverInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#27292D',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 10,
    width: 142,
    height: 48,
    paddingHorizontal: 16,
  },
  flipAtInput: {
    width: '100%',
    backgroundColor: 'transparent',
    color: '#F5F5F5',
    fontSize: 28,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    textAlign: 'center',
  },

  // --- Header ---
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionHeaderTitle: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#EEFB73',
    borderRadius: 10,
    width: 22.86,
    height: 21.86,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subText: {
    color: COLORS.textGrey,
    fontSize: 12,
    marginBottom: 24,
  },

  // --- Graph Card ---
  cardGradientBorder: {
    borderRadius: 14,
    padding: 4,
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#27292D',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 95,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  percentRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  bigPercent: {
    fontSize: 24,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: '#F5F5F5',
    lineHeight: 28,
    marginTop: -4,
  },
  bigCount: {
    fontSize: 36,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 40,
  },
  cardLabel: {
    color: 'rgba(245, 245, 245, 0.75)',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    marginTop: -2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Timeline
  timelineContainer: {
    height: 16,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 4,
    position: 'relative',
  },
  trackLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#334155',
    top: '50%',
    marginTop: -1,
  },
  nodesContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: 16,
  },
  nodeWrapper: {
    position: 'absolute',
    top: '50%',
    marginTop: -8,
    transform: [{ translateX: -6 }]
  },
  node: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EEFB73',
    borderWidth: 2,
    borderColor: '#EEFB73',
    shadowColor: '#EEFB73',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  nodeSmall: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 2,
  },

  // --- List ---
  listContainer: {
    gap: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indexInput: {
    width: 32,
    marginRight: 8,
    color: '#F5F5F5',
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  dateColumn: {
    position: 'relative',
    width: 80,
    marginRight: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  monthDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  monthText: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },
  yearText: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },
  // Month Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthModalMenu: {
    width: 180,
    maxHeight: 400,
    backgroundColor: '#1e293b',
    borderRadius: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  monthModalItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  monthModalItemSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  monthModalItemText: {
    fontSize: 16,
    color: '#e2e8f0',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    textAlign: 'center',
  },
  monthModalItemTextSelected: {
    color: '#60a5fa',
    fontWeight: '700',
  },
  checkIcon: {
    position: 'absolute',
    right: 15,
  },
  monthModalSeparator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '70%',
    alignSelf: 'center',
  },
  percentInputWrapper: {
    width: 60,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  percentInput: {
    flex: 1,
    textAlign: 'right',
    color: '#F5F5F5',
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    fontSize: 16,
    padding: 0,
  },
  percentSuffix: {
    color: COLORS.textGrey,
    fontSize: 14,
    marginLeft: 2,
  },
  typeWrapper: {
    flex: 1,
    position: 'relative',
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  typeText: {
    color: '#cbd5e1',
    fontSize: 14,
    flex: 1,
  },

  // Custom Dropdown Styles
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 4,
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownItemText: {
    color: '#e2e8f0',
    fontSize: 14,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#334155',
  },
  removeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textGrey,
    fontStyle: 'italic',
    paddingVertical: 20,
  },

  // --- Footer ---
  footerInfo: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBg,
    alignItems: 'center',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    color: 'rgba(245, 245, 245, 0.75)',
    fontSize: 12,
  },

  nextButtonContainer: {
    marginTop: 30,
    marginBottom: 20,
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
});