import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// --- Carousel Constants & Data ---
const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_PADDING = 16;
const CONTAINER_WIDTH = SCREEN_WIDTH - (CARD_PADDING * 2); 

const COLORS = {
  moderateBg: '#F2FF5B', // Bright Neon Yellow
  conservativeBg: '#FCFCE5', // Light Cream
  optimisticBg: '#A8C600', // Olive Green
  highlight: '#DFFF4F', // Pagination active dot
  inactiveDot: '#3A3A3C',
  textGrey: '#8E8E93',
  textWhite: '#FFFFFF',
  textDark: '#1A1A1A',
};

// --- Mock Data for Payment Timeline (12 Months/Points) ---
const TIMELINE_DATA = [
  { date: 'Jan 26', percent: '5', value: '61,250' },
  { date: 'Feb 26', percent: '5', value: '61,250' },
  { date: 'Mar 26', percent: '10', value: '122,500' }, // Screenshot point
  { date: 'Apr 26', percent: '10', value: '122,500' },
  { date: 'May 26', percent: '15', value: '183,750' },
  { date: 'Jun 26', percent: '20', value: '245,000' },
  { date: 'Jul 26', percent: '25', value: '306,250' },
  { date: 'Aug 26', percent: '30', value: '367,500' },
  { date: 'Sep 26', percent: '35', value: '428,750' },
  { date: 'Oct 26', percent: '40', value: '490,000' },
  { date: 'Nov 26', percent: '45', value: '551,250' },
  { date: 'Jan 27', percent: '50', value: '612,500' },
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

export default function DashboardScreen() {
  // --- Carousel State & Logic ---
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

  // --- Payment Timeline Logic (New) ---
  const [timelineIndex, setTimelineIndex] = useState(2); // Start at index 2 (Mar 26)
  const [sliderWidth, setSliderWidth] = useState(0);
  
  // Logic to calculate index based on touch position
  const updateTimelineIndex = (xPos: number) => {
    if (sliderWidth === 0) return;
    const step = sliderWidth / (TIMELINE_DATA.length - 1);
    const newIndex = Math.round(xPos / step);
    const clampedIndex = Math.max(0, Math.min(newIndex, TIMELINE_DATA.length - 1));
    setTimelineIndex(clampedIndex);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt) => {
        updateTimelineIndex(evt.nativeEvent.locationX);
      },
      onPanResponderMove: (evt) => {
        updateTimelineIndex(evt.nativeEvent.locationX);
      },
    })
  ).current;

  const currentTimelineItem = TIMELINE_DATA[timelineIndex];

  // Calculate dynamic left position for the red triangle
  const getTrianglePosition = () => {
    if (TIMELINE_DATA.length <= 1) return '0%';
    const percent = (timelineIndex / (TIMELINE_DATA.length - 1)) * 100;
    return `${percent}%`;
  };

  // --- Render Item for Carousel ---
  const renderItem = ({ item }: { item: StrategyData }) => {
    return (
      <View style={styles.slideContainer}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.smallLabel}>Exit Strategies</Text>
            <Text style={styles.mainTitle}>{item.title}</Text>
          </View>
          {/* Top Right Controls */}
          <View style={styles.topRightContainer}>
            {item.accessoryType === 'dropdown' ? (
              <>
                <View style={styles.percentBadge}>
                  <Text style={styles.percentSymbol}>%</Text>
                  <Ionicons name="chevron-down" size={12} color="#000" />
                </View>
                <TouchableOpacity style={styles.expandIcon}>
                  <MaterialCommunityIcons name="arrow-expand-all" size={18} color="#AAA" />
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.counterContainer}>
                <TouchableOpacity style={styles.counterBtn}>
                  <Text style={styles.counterBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>5</Text>
                <TouchableOpacity style={styles.counterBtn}>
                  <Text style={styles.counterBtnText}>+</Text>
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
        <Text style={styles.footerText}>
          {item.description}
          <Text style={styles.footerTextBold}>{item.highlightText}</Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Feather name="chevron-left" size={28} color="#fff" />
          </Pressable>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>The Weave, JVC</Text>
            <Text style={styles.headerSubtitle}>by Al Ghurair</Text>
          </View>
          <Pressable>
            <Feather name="more-horizontal" size={24} color="#fff" />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Top Grid Area */}
          <View style={styles.gridContainer}>
            <View style={styles.gridRow}>
              <View style={styles.ratingBox}>
                <View style={styles.ratingCircle}>
                  <Text style={styles.ratingNumber}>7.5</Text>
                </View>
              </View>
              <View style={styles.roomBox}>
                <Text style={styles.roomTextLarge}>1</Text>
                <Text style={styles.roomTextSmall}>BR</Text>
              </View>
              <View style={styles.priceBox}>
                <Text style={styles.labelTiny}>OFF PLAN</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.currencySmall}>AED</Text>
                  <Text style={styles.priceLarge}>1.225</Text>
                  <Text style={styles.priceUnit}>mn</Text>
                </View>
              </View>
            </View>

            <View style={styles.gridRow}>
              <View style={styles.aptBox}>
                <Text style={styles.labelTiny}>APT</Text>
                <View style={styles.aptRow}>
                  <View style={styles.yellowPill}>
                    <Text style={styles.pillText}>ft²</Text>
                    <Feather name="chevron-down" size={10} color="#000" />
                  </View>
                  <Text style={styles.statValueLarge}>776</Text>
                </View>
              </View>
              <View style={styles.smallStatBox}>
                <Text style={styles.statLabelTop}>SC/ft²</Text>
                <Text style={styles.statValueMedium}>11</Text>
              </View>
              <View style={styles.smallStatBox}>
                <Text style={styles.statLabelTop}>Pr/ft²</Text>
                <Text style={styles.statValueMedium}>1,578</Text>
              </View>
              <View style={styles.smallStatBox}>
                <Text style={styles.statLabelTop}>DLD</Text>
                <Text style={styles.statValueMedium}>49</Text>
                <Text style={styles.statUnitTiny}>k</Text>
              </View>
            </View>
          </View>

          {/* 70/30 Payment Plan Card (Modified for Interaction) */}
          <View style={styles.paymentCard}>
            
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>70/30</Text>
              <Pressable onPress={() => router.push("/timeline")}>
                <Feather name="maximize-2" size={14} color="#aaa" />
              </Pressable>
            </View>

            {/* Dynamic Percent Center */}
            <View style={styles.centerPercent}>
              <Text style={styles.bigPercent}>{currentTimelineItem.percent}</Text>
              <Text style={styles.percentSymbol}>%</Text>
            </View>
            
            {/* Dynamic Date & Value */}
            <View style={styles.dateLabelRow}>
               <Text style={styles.dateLabelLeft}>{currentTimelineItem.date}</Text>
               <Text style={styles.aedLabelCenter}>
                 AED <Text style={{color:'#fff', fontWeight:'700'}}>{currentTimelineItem.value}</Text>
               </Text>
            </View>

            {/* Interactive Timeline */}
            <View 
              style={styles.timelineContainer}
              onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
              {...panResponder.panHandlers} // Bind gestures
            >
              {/* Dynamic Red Indicator */}
              {sliderWidth > 0 && (
                <View style={[styles.redTriangleContainer, { left: Number(getTrianglePosition()) }]}>
                  <Text style={styles.redTriangle}>▼</Text>
                </View>
              )}
              
              <View style={styles.timelineLine} />
              <View style={styles.dotsRow}>
                {TIMELINE_DATA.map((_, i) => (
                   <View 
                      key={i} 
                      style={[
                        styles.dot, 
                        i === timelineIndex && styles.dotActive, // Active state
                        i < timelineIndex && styles.dotFilled // Optional: filled previous dots
                      ]} 
                   />
                ))}
              </View>
              <View style={styles.timelineLabels}>
                <Text style={styles.timeLabel}>Jan 26</Text>
                <Text style={styles.timeLabel}>Jun 26</Text>
                <Text style={styles.timeLabel}>Jan 27</Text>
              </View>
            </View>
          </View>

          {/* --- EXIT STRATEGIES CAROUSEL --- */}
          <View style={{ marginTop: 24 }}>
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
             />

             {/* Pagination Dots */}
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

           <View style={{height: 100}} /> 
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
         <Feather name="home" size={24} color="#ccc" />
         <Feather name="file-text" size={24} color="#ccc" />
         <View style={styles.plusButton}>
            <Feather name="plus" size={24} color="#000" />
         </View>
         <Feather name="search" size={24} color="#ccc" />
         <Feather name="user" size={24} color="#ccc" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#0D0F15", // Very dark blue/black
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 50,
  },
  headerTitleContainer: { alignItems: "center" },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  headerSubtitle: { color: "#888", fontSize: 12, marginTop: 2 },

  // Grid
  gridContainer: { gap: 10, marginBottom: 16 },
  gridRow: { flexDirection: "row", gap: 10, height: 80 },

  // Grid Items
  ratingBox: {
    width: 80,
    backgroundColor: "#1A1D24",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingCircle: {
    width: 55,
    height: 55,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: "#C0D926", // Lime border
    borderLeftColor: "#2A3038", // Simulating the gap in gradient
    justifyContent: "center",
    alignItems: "center",
    transform: [{rotate: '45deg'}] // Rotate the gap
  },
  ratingNumber: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    transform: [{rotate: '-45deg'}] // Counter rotate text
  },

  roomBox: {
    width: 80,
    backgroundColor: "#13161C",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#444",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "baseline",
  },
  roomTextLarge: { color: "#fff", fontSize: 32, fontWeight: "400" },
  roomTextSmall: { color: "#ccc", fontSize: 12, marginLeft: 2 },

  priceBox: {
    flex: 1,
    backgroundColor: "#1A1D24",
    borderRadius: 16,
    padding: 12,
    justifyContent: "center",
  },
  priceRow: { flexDirection: "row", alignItems: "baseline", marginTop: 4 },
  priceLarge: { color: "#fff", fontSize: 30, fontWeight: "500", letterSpacing: -1 },
  currencySmall: { color: "#888", fontSize: 12, marginRight: 6 },
  priceUnit: { color: "#888", fontSize: 12 },

  // Row 2 Items
  aptBox: {
    flex: 2,
    backgroundColor: "#1A1D24",
    borderRadius: 16,
    padding: 12,
    justifyContent: "center",
  },
  aptRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 6 },
  yellowPill: {
    backgroundColor: "#DFFF4F",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  pillText: { fontSize: 12, fontWeight: "700", color: "#000" },
  statValueLarge: { color: "#fff", fontSize: 24, fontWeight: "500" },

  smallStatBox: {
    flex: 1,
    backgroundColor: "#13161C",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  statLabelTop: { color: "#888", fontSize: 10, position: 'absolute', top: 10 },
  statValueMedium: { color: "#fff", fontSize: 18, fontWeight: "500", marginTop: 14 },
  statUnitTiny: { color: "#888", fontSize: 10 },
  labelTiny: { color: "#888", fontSize: 10, textTransform: "uppercase" },

  // 70/30 Card
  paymentCard: {
    backgroundColor: "#22252B",
    borderRadius: 20,
    padding: 20,
    height: 240,
    marginTop: 6,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardTitle: { color: "#fff", fontWeight: "700", fontSize: 16 },

  centerPercent: { 
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "row",
    marginTop: 10
  },
  bigPercent: { fontSize: 72, color: "#fff", fontWeight: "600", letterSpacing: -2 },
  percentSymbol: { fontSize: 24, color: "#fff", marginTop: 14, fontWeight: '600' },
  
  dateLabelRow: {flexDirection:'row', justifyContent:'space-between', width:'100%', paddingHorizontal: 10},
  dateLabelLeft: {color:'#bbb', fontSize: 14, fontWeight: '600'},
  aedLabelCenter: {color:'#888', fontSize: 12, position:'absolute', left: 0, right: 0, textAlign:'center', top: -10},

  // Timeline
  timelineContainer: { marginTop: 20, position: 'relative' },
  redTriangleContainer: { 
    position: 'absolute', 
    top: -12, 
    marginLeft: -6, // Half of triangle size to center
    zIndex: 10,
    alignItems: 'center'
  },
  redTriangle: { color: '#FF3B30', fontSize: 16, transform: [{rotate: '180deg'}] }, // Pointing down

  timelineLine: { height: 2, backgroundColor: "#444", width: "100%", position: "absolute", top: 6 },
  dotsRow: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#444", borderWidth: 2, borderColor: '#22252B' },
  dotActive: { backgroundColor: "#DFFF4F", borderColor: '#22252B', width: 14, height: 14, borderRadius: 7 },
  dotFilled: { backgroundColor: "#DFFF4F", borderColor: '#22252B'}, // Optional: previous dots

  timelineLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  timeLabel: { color: "#666", fontSize: 11 },

  // Bottom Nav
  bottomNav: {
     position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, 
     backgroundColor: '#13161C', 
     flexDirection: 'row', justifyContent:'space-around', alignItems:'center',
     paddingBottom: 20,
     borderTopWidth: 1, borderTopColor: '#222'
  },
  plusButton: {
     width: 50, height: 50, borderRadius: 25, backgroundColor: '#DFFF4F',
     justifyContent:'center', alignItems:'center', marginBottom: 10
  },

  // ==========================================
  // CAROUSEL SPECIFIC STYLES
  // ==========================================
  slideContainer: {
    width: CONTAINER_WIDTH, 
    paddingRight: 4, 
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 0, 
  },
  smallLabel: {
    color: COLORS.textGrey,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  mainTitle: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: '700',
  },
  topRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  percentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.moderateBg,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  expandIcon: {
    padding: 2,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111', 
    borderRadius: 8,
    padding: 2,
  },
  counterBtn: {
    backgroundColor: COLORS.moderateBg,
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  counterValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  strategyCardItem: {
    flex: 1, 
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
  },
  cardLabel: {
    color: COLORS.textDark,
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardPercent: {
    color: COLORS.textDark,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardValue: {
    color: COLORS.textDark,
    fontSize: 10,
    opacity: 0.7,
  },
  footerText: {
    color: COLORS.textGrey,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'left',
    marginBottom: 20,
  },
  footerTextBold: {
    fontWeight: '700',
    color: '#AAA',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  paginationDotActive: {
    backgroundColor: COLORS.highlight,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: -1, 
  },
  paginationDotInactive: {
    backgroundColor: COLORS.inactiveDot,
    borderWidth: 1,
    borderColor: '#000',
  },
});