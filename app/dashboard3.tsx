import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// --- Constants ---
const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_PADDING = 16;
const CONTAINER_WIDTH = SCREEN_WIDTH - (CARD_PADDING * 2); 

const COLORS = {
  moderateBg: '#F0FD73',      
  conservativeBg: '#FAFFC9',  
  optimisticBg: '#A3B403',    
  highlight: '#DFFF4F',
  inactiveDot: '#3A3A3C',
  textGrey: '#8E8E93',
  textWhite: '#FFFFFF',
  textDark: '#1A1A1A',
  cardBg: '#27292D',  
  darkBg: '#13161C',  
  strategyContainerBg: '#27292D',  
  primaryDark: '#12141D', 
  cardDark: '#27292D', 
  paymentCardDark: '#22252B', 
  headerGrey: '#888',
  timelineLine: '#555',
  timelineRed: '#FF3B30',
  pillText: '#000',
  pillBg: '#DFFF4F',
};

// --- Data ---
const TIMELINE_DATA = [
  { date: 'Jan 26', percent: '10', value: '122,500' }, // 0
  { date: 'Feb 26', percent: '20', value: '245,000' },
  { date: 'Mar 26', percent: '30', value: '367,500' }, // 2 <- SCREENSHOT POINTER
  { date: 'Apr 26', percent: '40', value: '490,000' },
  { date: 'May 26', percent: '50', value: '612,500' },
  { date: 'Jun 26', percent: '60', value: '735,000' }, // 5 <- MIDDLE LABEL
  { date: 'Jul 26', percent: '70', value: '857,500' },
  { date: 'Aug 26', percent: '80', value: '980,000' },
  { date: 'Sep 26', percent: '90', value: '1,102,500' },
  { date: 'Oct 26', percent: '100', value: '1,225,000' },
  { date: 'Nov 26', percent: '100+', value: 'Final' },
  { date: 'Jan 27', percent: 'Handover', value: 'Done' }, // 11 <- END LABEL
];

type StrategyData = {
  id: string;
  type: 'STP' | 'MTP' | 'LTP';
  title: string;
  accessoryType: 'dropdown' | 'counter';
  moderate: { percent: string; val: string };
  conservative: { percent: string; val: string };
  optimistic: { percent: string; val: string };
  description: string;
  highlightText: string;
};

const STRATEGIES: StrategyData[] = [
  {
    id: '1',
    type: 'STP',
    title: 'STP — Flipping',
    accessoryType: 'dropdown',
    moderate: { percent: '25.46%', val: 'AED 137.24k' },
    conservative: { percent: '7.87%', val: 'AED 42.42k' },
    optimistic: { percent: '34.46%', val: 'AED 185.75k' },
    description: '** The project will generate an estimated ROE of ~25.46% based on ',
    highlightText: 'AED539k capital invested by March 2026.',
  },
  {
    id: '2',
    type: 'MTP',
    title: 'MTP — Holding',
    accessoryType: 'dropdown',
    moderate: { percent: '25.46%', val: 'AED 137.24k' },
    conservative: { percent: '7.87%', val: 'AED 42.42k' },
    optimistic: { percent: '34.46%', val: 'AED 185.75k' },
    description: '** The project will generate an estimated ROE of ~25.46% based on ',
    highlightText: 'AED539k capital invested by March 2026.',
  },
  {
    id: '3',
    type: 'LTP',
    title: 'LTP — Compounding',
    accessoryType: 'counter',
    moderate: { percent: '117.72%', val: 'AED 137.24k' },
    conservative: { percent: '49.18%', val: 'AED 42.42k' },
    optimistic: { percent: '160.32%', val: 'AED 185.75k' },
    description: '** The project will generate an estimated ROE of ~25.46% based on ',
    highlightText: 'AED1.274mn (AED1.225 + 4% DLD) capital invested by Jan 2027.',
  },
];

// --- TOOLTIP CONTENT ---
const TOOLTIP_CONTENT = {
  offPlan: { title: "Off-plan", text: "This project is still under construction." },
  rating: { title: "Project rating", text: "Overall rating of project based on the rated parameters." },
  rooms: { title: "Unit Type", text: "1 Bedroom configuration with standard layout." },
  area: { title: "Apartment", text: "This is an apartment (project category) with an area of 776 ft²." },
  sc: { title: "Service Charges/ft²", text: "This section right here contains service charges per square feet." },
  pr: { title: "Price/ft²", text: "This section right here contains price per square feet." },
  dld: { title: "DLD", text: "This section contains Dubai land department transfer fee." }
};

export default function DashboardScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // --- Carousel State ---
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width; 
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== activeIndex) {
      setActiveIndex(roundIndex);
    }
  };

  // --- Payment Timeline Logic (Fixed to Screenshot values) ---
  const SCREENSHOT_TIMELINE_INDEX = 2; // Index for 'Mar 26'

  const [timelineIndex, setTimelineIndex] = useState(SCREENSHOT_TIMELINE_INDEX);
  const [sliderWidth, setSliderWidth] = useState(0);
  const dragStartX = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        if (sliderWidth > 0) {
          const step = sliderWidth / (TIMELINE_DATA.length - 1);
          dragStartX.current = timelineIndex * step; 
        }
      },

      onPanResponderMove: (evt, gestureState) => {
        if (sliderWidth === 0) return;
        const newX = dragStartX.current + gestureState.dx;
        const step = sliderWidth / (TIMELINE_DATA.length - 1);
        const rawIndex = Math.round(newX / step);
        const clampedIndex = Math.max(0, Math.min(rawIndex, TIMELINE_DATA.length - 1));
        setTimelineIndex(clampedIndex); 
      },
    })
  ).current;

  const displayedTimelineItem = TIMELINE_DATA[timelineIndex];
  
  const getTrianglePosition = () => {
    if (TIMELINE_DATA.length <= 1 || sliderWidth === 0) return 0;
    const position = (timelineIndex / (TIMELINE_DATA.length - 1)) * sliderWidth;
    return position;
  };

  // --- Dot Renderer Function (Crucial for screenshot match) ---
  const TimelineDots = () => {
    const DOT_SIZE_LG = 14; 
    const DOT_SIZE_SM = 4;
    
    const KEY_DOT_INDICES = [0, 5, 11]; 
    
    const step = sliderWidth / (TIMELINE_DATA.length - 1);
    
    return (
      <View style={styles.dotsRowAbsolute}>
        {TIMELINE_DATA.map((_, i) => {
          const isKeyDot = KEY_DOT_INDICES.includes(i);
          const isFilled = i <= timelineIndex; 

          if (isKeyDot) {
            const leftPosition = i * step - (DOT_SIZE_LG / 2);
            return (
              <View
                key={`main-dot-${i}`}
                style={[
                  styles.dotBase,
                  styles.dotLarge,
                  { left: leftPosition },
                  isFilled && i < 5 ? styles.dotFilled : styles.dotBase 
                ]}
              />
            );
          } else {
            const leftPosition = i * step - (DOT_SIZE_SM / 2);
            return (
              <View
                key={`small-dot-${i}`}
                style={[
                  styles.dotBase,
                  styles.dotSmall,
                  { left: leftPosition },
                  isFilled ? styles.dotTransparentSmall : styles.dotSmall
                ]}
              />
            );
          }
        })}

      </View>
    );
  };


  // --- Tooltip Component ---
  const Tooltip = ({ id, width = 200, leftOffset = 0 }: { id: keyof typeof TOOLTIP_CONTENT, width?: number, leftOffset?: number }) => {
    if (activeTooltip !== id) return null;
    const content = TOOLTIP_CONTENT[id];

    return (
      <View style={[styles.tooltipContainer, { width, marginLeft: leftOffset }]}>
        <View style={styles.tooltipBox}>
          <View style={styles.tooltipHeader}>
            <Text style={styles.tooltipTitle}>{content.title}</Text>
            <Pressable onPress={() => setActiveTooltip(null)} hitSlop={10}>
              <Feather name="x" size={18} color="#aaa" />
            </Pressable>
          </View>
          <Text style={styles.tooltipText}>
            {content.text}
          </Text>
        </View>
        <View style={styles.tooltipPointer} />
      </View>
    );
  };

  // --- Render Item for Carousel ---
  const renderItem = ({ item }: { item: StrategyData }) => {
    return (
      <View style={styles.slideContainer}>
        {/* CONTAINER FOR EXIT STRATEGIES (#27292D) */}
        <View style={styles.strategyContentWrapper}>
          
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.smallLabel}>Exit Strategies</Text>
              <Text style={styles.mainTitle}>{item.title}</Text>
            </View>
            <View style={styles.topRightContainer}>
              {item.accessoryType === 'dropdown' ? (
                // Dropdown (for STP)
                <>
                  <View style={styles.percentBadge}>
                    <Text style={styles.percentSymbolBadge}>%</Text>
                    <Ionicons name="chevron-down" size={12} color="#000" />
                  </View>
                  {/* EXPAND ICON FOR EXIT STRATEGIES */}
                  <TouchableOpacity style={styles.expandIcon}>
                    <Feather name="maximize-2" size={18} color="#FFF" /> 
                  </TouchableOpacity>
                </>
              ) : (
                // Counter (for LTP)
                <View style={styles.counterContainer}>
                  <TouchableOpacity style={styles.counterBtn}>
                    <Text style={styles.counterBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>5</Text>
                  <TouchableOpacity style={styles.counterBtn}>
                    <Text style={styles.counterBtnText}>+</Text>
                  </TouchableOpacity>
                  {/* EXPAND ICON FOR EXIT STRATEGIES */}
                  <TouchableOpacity style={styles.expandIcon}>
                    <Feather name="maximize-2" size={18} color="#FFF" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {/* Cards Row */}
          <View style={styles.cardsRow}>
            <View style={[styles.strategyCardItem, { backgroundColor: COLORS.moderateBg, borderColor: '#FFF', borderWidth: 1 }]}>
              <Text style={styles.cardLabel}>Moderate</Text>
              <Text style={styles.cardPercent}>{item.moderate.percent}</Text>
              <Text style={styles.cardValue}>{item.moderate.val}</Text>
            </View>
            <View style={[styles.strategyCardItem, { backgroundColor: COLORS.conservativeBg }]}>
              <Text style={styles.cardLabel}>Conservative</Text>
              <Text style={styles.cardPercent}>{item.conservative.percent}</Text>
              <Text style={styles.cardValue}>{item.conservative.val}</Text>
            </View>
            <View style={[styles.strategyCardItem, { backgroundColor: COLORS.optimisticBg }]}>
              <Text style={styles.cardLabel}>Optimistic</Text>
              <Text style={styles.cardPercent}>{item.optimistic.percent}</Text>
              <Text style={styles.cardValue}>{item.optimistic.val}</Text>
            </View>
          </View>

          {/* Footer Text */}
          <Text style={styles.footerText} numberOfLines={2}>
            {item.description}
            <Text style={styles.footerTextBold}>{item.highlightText}</Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Feather name="chevron-left" size={26} color="#fff" />
          </Pressable>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>The Weave, JVC</Text>
            <Text style={styles.headerSubtitle}>by Al Ghurair</Text>
          </View>
          <Pressable onPress={() => setMenuVisible(!menuVisible)}>
            <Feather name="more-horizontal" size={24} color="#fff" />
          </Pressable>
        </View>

        {/* Side Menu (Kept but not in screenshot) */}
        {menuVisible && (
          <>
            <Pressable style={styles.menuOverlay} onPress={() => setMenuVisible(false)} />
            <View style={styles.sideMenu}>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="heart-outline" size={24} color="#fff" />
                <Text style={styles.menuText}>Add to liked</Text>
              </TouchableOpacity>
              {/* Other menu items... */}
            </View>
          </>
        )}

        {/* MAIN CONTENT NO SCROLL */}
        <View style={styles.contentContainer}>

          {/* Top Grid Area */}
          <View style={styles.gridContainer}>
            <View style={styles.gridRow}>
              {/* 1. Rating */}
              <Pressable style={styles.ratingBox} onPress={() => setActiveTooltip('rating')}>
                <View style={styles.ratingCircle}>
                  <Text style={styles.ratingNumber}>7.5</Text>
                </View>
                <Tooltip id="rating" leftOffset={50} />
              </Pressable>

              {/* 2. Room - FIX APPLIED HERE */}
              <Pressable style={styles.roomBox} onPress={() => setActiveTooltip('rooms')}>
                <View style={styles.roomContentWrapper}>
                    <Text style={styles.roomTextLarge}>1</Text>
                    <Text style={styles.roomTextSmall}>BR</Text>
                </View>
                <Tooltip id="rooms" leftOffset={-40} />
              </Pressable>

              {/* 3. Price */}
              <View style={styles.priceBox}>
                <Pressable onPress={() => setActiveTooltip('offPlan')}>
                  <Text style={styles.labelTiny}>OFF PLAN</Text>
                </Pressable>
                <View style={styles.priceRow}>
                  <Text style={styles.currencySmall}>AED</Text>
                  <Text style={styles.priceLarge}>1.225</Text>
                  <Text style={styles.priceUnit}>mn</Text>
                </View>
                <Tooltip id="offPlan" leftOffset={-100} width={220} />
              </View>
            </View>

            <View style={styles.gridRow}>
              {/* 4. Area */}
              <Pressable style={styles.aptBox} onPress={() => setActiveTooltip('area')}>
                <Text style={styles.labelTiny}>APT</Text>
                <View style={styles.aptRow}>
                  <View style={styles.yellowPill}>
                    <Text style={styles.pillText}>ft²</Text>
                    <Feather name="chevron-down" size={10} color={COLORS.pillText} />
                  </View>
                  <Text style={styles.statValueLarge}>776</Text>
                </View>
                <Tooltip id="area" width={220} />
              </Pressable>

              {/* 5. SC */}
              <Pressable style={styles.smallStatBox} onPress={() => setActiveTooltip('sc')}>
                <Text style={styles.statLabelTop}>SC/ft²</Text>
                <Text style={styles.statValueMedium}>11</Text>
                <Tooltip id="sc" leftOffset={-80} />
              </Pressable>

              {/* 6. Pr */}
              <Pressable style={styles.smallStatBox} onPress={() => setActiveTooltip('pr')}>
                <Text style={styles.statLabelTop}>Pr/ft²</Text>
                <Text style={styles.statValueMedium}>1,578</Text>
                <Tooltip id="pr" leftOffset={-120} />
              </Pressable>

              {/* 7. DLD */}
              <Pressable style={styles.smallStatBox} onPress={() => setActiveTooltip('dld')}>
                <Text style={styles.statLabelTop}>DLD</Text>
                <Text style={styles.statValueMedium}>49</Text>
                <Text style={styles.statUnitTiny}>k</Text>
                <Tooltip id="dld" leftOffset={-150} width={200} />
              </Pressable>
            </View>
          </View>

          {/* 40/60 Payment Plan Card - BORDER ADDED HERE */}
          <View style={[styles.paymentCard, styles.paymentCardBorder]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>40/60</Text>
              <Pressable onPress={() => {}}>
                <Feather name="maximize-2" size={12} color="#aaa" />
              </Pressable>
            </View>
            <View style={styles.centerPercent}>
              <Text style={styles.bigPercent}>{displayedTimelineItem.percent}</Text>
              <Text style={styles.percentSymbol}>%</Text>
            </View>
            <View style={styles.dateLabelRow}>
              <Text style={styles.dateLabelLeft}>{displayedTimelineItem.date}</Text>
              <Text style={styles.aedLabelCenter}>
                AED <Text style={styles.aedValueBold}>{displayedTimelineItem.value}</Text>
              </Text>
            </View>
            <View
              style={styles.timelineContainer}
              onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
              {...panResponder.panHandlers}
            >
              {sliderWidth > 0 && (
                <View style={[styles.redTriangleContainer, { left: getTrianglePosition() }]}>
                  <Text style={styles.redTriangle}>▼</Text>
                </View>
              )}
              {/* Base line */}
              <View style={styles.timelineLine} />
              {/* Highlight line up to the fixed screenshot index (Mar 26 is index 2) */}
              <View style={[styles.timelineLineHighlight, { width: getTrianglePosition() + 6 }]} />
              
              {/* Render dots in absolute position */}
              {sliderWidth > 0 && <TimelineDots />}

              {/* Only 3 labels for the ends and middle */}
              <View style={styles.timelineLabels}>
                <Text style={styles.timeLabel}>Jan 26</Text>
                <Text style={styles.timeLabelCenter}>Jun 26</Text>
                <Text style={styles.timeLabel}>Jan 27</Text>
              </View>
            </View>
          </View>

          {/* Strategies Carousel */}
          <View style={styles.carouselContainer}>
            <FlatList
              ref={flatListRef}
              data={STRATEGIES}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={16}
              contentContainerStyle={{ paddingBottom: 0 }}
            />
            {/* Carousel Dots */}
            <View style={styles.dotsContainer}>
              {STRATEGIES.map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      isActive ? styles.paginationDotActive : styles.paginationDotInactive
                    ]}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* Bottom Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerButton} onPress={() => router.push("/form1")}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="document-text-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Profile")}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 0,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: CARD_PADDING,
    paddingTop: 4,
    paddingBottom: 85, // Fixed padding for tabs
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: CARD_PADDING,
    marginBottom: 6,
    marginTop: 0,
  },
  headerTitleContainer: { alignItems: "center", flex: 1 },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  headerSubtitle: { color: COLORS.headerGrey, fontSize: 12, marginTop: 2 },

  // --- Grid Layout ---
  gridContainer: { gap: 6, marginBottom: 6 },
  gridRow: { flexDirection: "row", gap: 6, height: 60, zIndex: 10 },

  // Tooltip Styles
  tooltipContainer: { position: 'absolute', bottom: '100%', marginBottom: 5, left: 0, zIndex: 999, alignItems: 'center' },
  tooltipPointer: { width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 6, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#32363F', marginTop: -1 },
  tooltipBox: { backgroundColor: '#32363F', borderRadius: 8, padding: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, elevation: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', width: '100%' },
  tooltipHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  tooltipTitle: { color: '#fff', fontSize: 12, fontWeight: '700' },
  tooltipText: { color: '#ccc', fontSize: 10, lineHeight: 14 },

  // Grid Item Styles
  ratingBox: { width: 70, backgroundColor: COLORS.cardDark, borderRadius: 14, justifyContent: "center", alignItems: "center", zIndex: 1, },
  ratingCircle: { width: 45, height: 45, borderRadius: 25, borderWidth: 3, borderColor: "#C0D926", borderLeftColor: "#2A3038", justifyContent: "center", alignItems: "center", transform: [{ rotate: '45deg' }] },
  ratingNumber: { color: "#fff", fontWeight: "700", fontSize: 14, transform: [{ rotate: '-45deg' }] },
  
  // FIX APPLIED HERE: Centering the room text
  roomBox: { 
    width: 70, 
    backgroundColor: COLORS.darkBg, 
    borderRadius: 14, 
    borderWidth: 1, 
    borderColor: "#444", 
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    zIndex: 1, 
  },
  roomContentWrapper: {
    flexDirection: "row", // Keep 1 and BR horizontal
    alignItems: "baseline", // Align 1 and BR vertically on their baseline
    // No other flex properties needed here
  },
  roomTextLarge: { color: "#fff", fontSize: 26, fontWeight: "400" },
  roomTextSmall: { color: "#ccc", fontSize: 11, marginLeft: 2 },
  
  priceBox: { flex: 1, backgroundColor: COLORS.cardDark, borderRadius: 14, padding: 10, justifyContent: "center", zIndex: 1, },
  priceRow: { flexDirection: "row", alignItems: "baseline", marginTop: 2 },
  priceLarge: { color: "#fff", fontSize: 24, fontWeight: "500", letterSpacing: -1 },
  currencySmall: { color: COLORS.headerGrey, fontSize: 11, marginRight: 4 },
  priceUnit: { color: COLORS.headerGrey, fontSize: 11 },
  
  aptBox: { flex: 2, backgroundColor: COLORS.cardDark, borderRadius: 14, padding: 10, justifyContent: "center", zIndex: 1, },
  aptRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  yellowPill: { backgroundColor: COLORS.pillBg, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 3 },
  pillText: { fontSize: 11, fontWeight: "700", color: COLORS.pillText },
  statValueLarge: { color: "#fff", fontSize: 20, fontWeight: "500" },
  
  smallStatBox: { flex: 1, backgroundColor: COLORS.cardDark, borderRadius: 14, borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center", zIndex: 1, },
  statLabelTop: { color: COLORS.headerGrey, fontSize: 9, position: 'absolute', top: 8 },
  statValueMedium: { color: "#fff", fontSize: 16, fontWeight: "500", marginTop: 12 },
  statUnitTiny: { color: COLORS.headerGrey, fontSize: 9 },
  labelTiny: { color: COLORS.headerGrey, fontSize: 9, textTransform: "uppercase" },

  // Payment Card
  paymentCard: {
    backgroundColor: COLORS.paymentCardDark,
    borderRadius: 16,
    padding: 14,
    height: 180, 
    marginBottom: 6,
    zIndex: 0,
  },
  // NEW: White border for payment card
  paymentCardBorder: {
    borderWidth: 1,
    borderColor: 'white',
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardTitle: { color: "#fff", fontWeight: "700", fontSize: 14 },
  centerPercent: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 4
  },
  bigPercent: { fontSize: 50, color: "#fff", fontWeight: "600", letterSpacing: -2 },
  percentSymbol: { fontSize: 18, color: "#fff", marginTop: 10, fontWeight: '600' },
  
  // Date/AED labels
  dateLabelRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 4 },
  dateLabelLeft: { color: '#bbb', fontSize: 12, fontWeight: '600' }, // Mar 26
  aedLabelCenter: { color: COLORS.headerGrey, fontSize: 10, position: 'absolute', left: 0, right: 0, textAlign: 'center', top: -6 },
  aedValueBold: { color: '#fff', fontWeight: '700' }, 
  
  // Timeline Slider
  timelineContainer: { marginTop: 16, position: 'relative', height: 40, justifyContent: 'flex-start' },
  redTriangleContainer: {
    position: 'absolute',
    top: -14,
    marginLeft: -6, 
    zIndex: 10,
    alignItems: 'center'
  },
  redTriangle: { color: COLORS.timelineRed, fontSize: 14, transform: [{ rotate: '180deg' }] },
  
  timelineLine: { height: 2, backgroundColor: COLORS.timelineLine, width: "100%", position: "absolute", top: 10 },
  timelineLineHighlight: { 
    height: 2, 
    backgroundColor: COLORS.highlight, 
    position: "absolute", 
    top: 10, 
    left: 0,
    zIndex: 5
  },
  
  // Dot styles (Absolute Positioned)
  dotsRowAbsolute: { 
    position: 'absolute', 
    top: 3, 
    left: 0, 
    right: 0, 
    height: 16
  },
  dotBase: { 
    position: 'absolute',
    borderRadius: 7, 
    borderWidth: 1.5,
    borderColor: '#fff', 
    backgroundColor: "transparent",
    zIndex: 6,
  },
  dotLarge: { 
    width: 14, 
    height: 14, 
    borderRadius: 7,
  },
  dotSmall: { 
    width: 4, 
    height: 4, 
    borderRadius: 2,
    borderColor: COLORS.timelineLine,
    backgroundColor: COLORS.timelineLine,
    top: 5, 
  },
  dotTransparentSmall: {
    width: 4, 
    height: 4, 
    borderRadius: 2,
    borderColor: 'transparent',
    backgroundColor: 'transparent', 
    top: 5,
  },
  dotFilled: { 
    backgroundColor: COLORS.highlight, 
    borderColor: COLORS.highlight,
  },
  
  // Timeline Labels
  timelineLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 }, 
  timeLabel: { color: COLORS.headerGrey, fontSize: 10 },
  timeLabelCenter: { color: COLORS.headerGrey, fontSize: 10, position: 'absolute', left: 0, right: 0, textAlign: 'center' },


  // Bottom Nav styles
  tabBar: { position: "absolute", bottom: 0, left: 0, right: 0, height: 75, backgroundColor: "#27292D", flexDirection: "row", justifyContent: "space-around", alignItems: "center", borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 10 },
  centerButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.highlight, justifyContent: "center", alignItems: "center", },
  plus: { fontSize: 32, color: "#000", marginTop: -2 },

  // Carousel Styles
  carouselContainer: { flex: 1, justifyContent: 'flex-end', marginBottom: 0 },
  slideContainer: { width: CONTAINER_WIDTH, justifyContent: 'center' }, 
  strategyContentWrapper: { backgroundColor: COLORS.strategyContainerBg, borderRadius: 24, padding: 16, paddingBottom: 20, width: '100%', marginTop: 0, overflow: 'hidden' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  smallLabel: { color: '#666', fontSize: 11, fontWeight: '600', marginBottom: 2 },
  mainTitle: { color: COLORS.textWhite, fontSize: 15, fontWeight: '700' },
  topRightContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  percentBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.moderateBg, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, gap: 4 },
  percentSymbolBadge: { fontSize: 12, fontWeight: '700', color: '#000' },
  expandIcon: { padding: 2 },
  counterContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', borderRadius: 8, padding: 2 },
  counterBtn: { backgroundColor: COLORS.moderateBg, width: 22, height: 22, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  counterBtnText: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  counterValue: { color: '#FFF', fontSize: 15, fontWeight: '600', marginHorizontal: 8 },
  cardsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginBottom: 16 },
  strategyCardItem: { flex: 1, borderRadius: 12, paddingVertical: 16, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center', minHeight: 110 },
  cardLabel: { color: COLORS.textDark, fontSize: 10, fontWeight: '600', marginBottom: 8 },
  cardPercent: { color: COLORS.textDark, fontSize: 22, fontWeight: '700', marginBottom: 4 },
  cardValue: { color: COLORS.textDark, fontSize: 10, opacity: 0.7 },
  footerText: { color: COLORS.textGrey, fontSize: 11, lineHeight: 16, textAlign: 'left', marginBottom: 0 },
  footerTextBold: { fontWeight: '700', color: '#AAA' },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 4, marginBottom: 10 },
  paginationDot: { width: 6, height: 6, borderRadius: 3 },
  paginationDotActive: { backgroundColor: COLORS.highlight, width: 8, height: 8, borderRadius: 4, marginTop: -1 },
  paginationDotInactive: { backgroundColor: COLORS.inactiveDot, borderWidth: 1, borderColor: '#000' },

  // Menu styles
  menuOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 },
  sideMenu: { position: 'absolute', top: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 + 40 : 80, right: 16, backgroundColor: '#32363F', borderRadius: 10, padding: 10, zIndex: 101, shadowColor: "#000", shadowOpacity: 0.5, shadowRadius: 5, elevation: 5 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  menuText: { color: '#fff', marginLeft: 10, fontSize: 16 },
});