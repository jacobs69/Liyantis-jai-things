

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
  moderateBg: '#F2FF5B',
  conservativeBg: '#FCFCE5',
  optimisticBg: '#A8C600',
  highlight: '#DFFF4F',
  inactiveDot: '#3A3A3C',
  textGrey: '#8E8E93',
  textWhite: '#FFFFFF',
  textDark: '#1A1A1A',
  cardBg: '#27292D', // Requested Color
  darkBg: '#13161C', // 1BR Box Color
};


// --- Data ---
const TIMELINE_DATA = [
  { date: 'Jan 26', percent: '10', value: '122,500' },
  { date: 'Feb 26', percent: '20', value: '245,000' },
  { date: 'Mar 26', percent: '30', value: '367,500' },
  { date: 'Apr 26', percent: '40', value: '490,000' },
  { date: 'May 26', percent: '50', value: '612,500' },
  { date: 'Jun 26', percent: '60', value: '735,000' },
  { date: 'Jul 26', percent: '70', value: '857,500' },
  { date: 'Aug 26', percent: '80', value: '980,000' },
  { date: 'Sep 26', percent: '90', value: '1,102,500' },
  { date: 'Oct 26', percent: '100', value: '1,225,000' },
  { date: 'Nov 26', percent: '100+', value: 'Final' },
  { date: 'Jan 27', percent: 'Handover', value: 'Done' },
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
  offPlan: {
    title: "Off-plan",
    text: "This project is still under construction."
  },
  rating: {
    title: "Project rating",
    text: "Overall rating of project based on the rated parameters."
  },
  rooms: {
    title: "Unit Type",
    text: "1 Bedroom configuration with standard layout."
  },
  area: {
    title: "Apartment",
    text: "This is an apartment (project category) with an area of 776 ft²."
  },
  sc: {
    title: "Service Charges/ft²",
    text: "This section right here contains service charges per square feet."
  },
  pr: {
    title: "Price/ft²",
    text: "This section right here contains price per square feet."
  },
  dld: {
    title: "DLD",
    text: "This section contains Dubai land department transfer fee."
  }
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


  // --- Payment Timeline Logic ---
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const dragStartX = useRef(0);


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,


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


  const currentTimelineItem = TIMELINE_DATA[timelineIndex];


  const getTrianglePosition = () => {
    if (TIMELINE_DATA.length <= 1 || sliderWidth === 0) return 0;
    const position = (timelineIndex / (TIMELINE_DATA.length - 1)) * sliderWidth;
    return position;
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
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.smallLabel}>Exit Strategies</Text>
            <Text style={styles.mainTitle}>{item.title}</Text>
          </View>
          <View style={styles.topRightContainer}>
            {item.accessoryType === 'dropdown' ? (
              <>
                <View style={styles.percentBadge}>
                  <Text style={styles.percentSymbolBadge}>%</Text>
                  <Ionicons name="chevron-down" size={12} color="#000" />
                </View>
                <TouchableOpacity style={styles.expandIcon}>
                  <MaterialCommunityIcons name="arrow-expand-all" size={16} color="#AAA" />
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


        <Text style={styles.footerText} numberOfLines={2}>
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


        {/* Side Menu */}
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


              {/* 2. Room */}
              <Pressable style={styles.roomBox} onPress={() => setActiveTooltip('rooms')}>
                <Text style={styles.roomTextLarge}>1</Text>
                <Text style={styles.roomTextSmall}>BR</Text>
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
                    <Feather name="chevron-down" size={10} color="#000" />
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


          {/* 40/60 Payment Plan Card */}
          <View style={styles.paymentCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>40/60</Text>
              <Pressable onPress={() => router.push("/timeline")}>
                <Feather name="maximize-2" size={12} color="#aaa" />
              </Pressable>
            </View>
            <View style={styles.centerPercent}>
              <Text style={styles.bigPercent}>{currentTimelineItem.percent}</Text>
              <Text style={styles.percentSymbol}>%</Text>
            </View>
            <View style={styles.dateLabelRow}>
              <Text style={styles.dateLabelLeft}>{currentTimelineItem.date}</Text>
              <Text style={styles.aedLabelCenter}>
                AED <Text style={{ color: '#fff', fontWeight: '700' }}>{currentTimelineItem.value}</Text>
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
              <View style={styles.timelineLine} />
              <View style={styles.dotsRow}>
                {TIMELINE_DATA.map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      i === timelineIndex && styles.dotActive,
                      i < timelineIndex && styles.dotFilled
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
    backgroundColor: "#12141D",
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 0,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 4, // Reduced slightly
    paddingBottom: 85,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 6, // Reduced margin
    marginTop: 0,
  },
  headerTitleContainer: { alignItems: "center", flex: 1 },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  headerSubtitle: { color: "#888", fontSize: 12, marginTop: 2 },


  gridContainer: { gap: 6, marginBottom: 8 }, // Reduced gap
  gridRow: { flexDirection: "row", gap: 6, height: 68, zIndex: 10 }, // Reduced height slightly


  // Tooltip
  tooltipContainer: {
    position: 'absolute',
    bottom: '100%',
    marginBottom: 5,
    left: 0,
    zIndex: 999,
    alignItems: 'center',
  },
  tooltipPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#32363F',
    marginTop: -1,
  },
  tooltipBox: {
    backgroundColor: '#32363F',
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    width: '100%'
  },
  tooltipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  tooltipTitle: { color: '#fff', fontSize: 12, fontWeight: '700' },
  tooltipText: { color: '#ccc', fontSize: 10, lineHeight: 14 },


  // Grid Items
  ratingBox: {
    width: 70,
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  ratingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#C0D926",
    borderLeftColor: "#2A3038",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: '45deg' }]
  },
  ratingNumber: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    transform: [{ rotate: '-45deg' }]
  },
  roomBox: {
    width: 70,
    backgroundColor: COLORS.darkBg, // Darker
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#444",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "baseline",
    zIndex: 1,
  },
  roomTextLarge: { color: "#fff", fontSize: 28, fontWeight: "400" },
  roomTextSmall: { color: "#ccc", fontSize: 11, marginLeft: 2 },
  priceBox: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    padding: 10,
    justifyContent: "center",
    zIndex: 1,
  },
  priceRow: { flexDirection: "row", alignItems: "baseline", marginTop: 4 },
  priceLarge: { color: "#fff", fontSize: 26, fontWeight: "500", letterSpacing: -1 },
  currencySmall: { color: "#888", fontSize: 11, marginRight: 4 },
  priceUnit: { color: "#888", fontSize: 11 },
  aptBox: {
    flex: 2,
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    padding: 10,
    justifyContent: "center",
    zIndex: 1,
  },
  aptRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 6 },
  yellowPill: {
    backgroundColor: "#DFFF4F",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  pillText: { fontSize: 11, fontWeight: "700", color: "#000" },
  statValueLarge: { color: "#fff", fontSize: 22, fontWeight: "500" },
  smallStatBox: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  statLabelTop: { color: "#888", fontSize: 9, position: 'absolute', top: 10 },
  statValueMedium: { color: "#fff", fontSize: 17, fontWeight: "500", marginTop: 14 },
  statUnitTiny: { color: "#888", fontSize: 9 },
  labelTiny: { color: "#888", fontSize: 9, textTransform: "uppercase" },


  // Payment Card
  paymentCard: {
    backgroundColor: "#22252B",
    borderRadius: 16,
    padding: 16,
    height: 215, // INCREASED HEIGHT FOR DATES
    marginBottom: 8,
    zIndex: 0,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardTitle: { color: "#fff", fontWeight: "700", fontSize: 15 },
  centerPercent: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 8
  },
  bigPercent: { fontSize: 56, color: "#fff", fontWeight: "600", letterSpacing: -2 },
  percentSymbol: { fontSize: 20, color: "#fff", marginTop: 12, fontWeight: '600' },
  dateLabelRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 4 },
  dateLabelLeft: { color: '#bbb', fontSize: 13, fontWeight: '600' },
  aedLabelCenter: { color: '#888', fontSize: 11, position: 'absolute', left: 0, right: 0, textAlign: 'center', top: -6 },
  timelineContainer: { marginTop: 12, position: 'relative', height: 60, justifyContent: 'flex-start' }, // Adjusted container
  redTriangleContainer: {
    position: 'absolute',
    top: -14,
    marginLeft: -5,
    zIndex: 10,
    alignItems: 'center'
  },
  redTriangle: { color: '#FF3B30', fontSize: 14, transform: [{ rotate: '180deg' }] },
  timelineLine: { height: 2, backgroundColor: "#555", width: "100%", position: "absolute", top: 10 },
  dotsRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", position: 'absolute', top: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#fff", borderWidth: 0 },
  dotActive: { backgroundColor: "#DFFF4F", width: 12, height: 12, borderRadius: 6, marginTop: -2 },
  dotFilled: { backgroundColor: "#f6e960ff" },
  timelineLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 22 }, // Adjusted margin
  timeLabel: { color: "#888", fontSize: 11 },


  // Bottom Nav
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: "#27292D",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10
  },
  centerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1FE74",
    justifyContent: "center",
    alignItems: "center",
  },
  plus: { fontSize: 32, color: "#000", marginTop: -2 },


  // Carousel Styles
  carouselContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 0
  },
  slideContainer: { width: CONTAINER_WIDTH, paddingRight: 4 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  smallLabel: { color: COLORS.textGrey, fontSize: 11, fontWeight: '600', marginBottom: 4 },
  mainTitle: { color: COLORS.textWhite, fontSize: 15, fontWeight: '700' },
  topRightContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  percentBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.moderateBg, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, gap: 4 },
  percentSymbolBadge: { fontSize: 12, fontWeight: '700', color: '#000' },
  expandIcon: { padding: 2 },
  counterContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', borderRadius: 8, padding: 2 },
  counterBtn: { backgroundColor: COLORS.moderateBg, width: 22, height: 22, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  counterBtnText: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  counterValue: { color: '#FFF', fontSize: 15, fontWeight: '600', marginHorizontal: 8 },
  cardsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginBottom: 12 },
  strategyCardItem: { flex: 1, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center', minHeight: 95 },
  cardLabel: { color: COLORS.textDark, fontSize: 10, fontWeight: '600', marginBottom: 4 },
  cardPercent: { color: COLORS.textDark, fontSize: 20, fontWeight: '700', marginBottom: 2 },
  cardValue: { color: COLORS.textDark, fontSize: 10, opacity: 0.7 },
  footerText: { color: COLORS.textGrey, fontSize: 11, lineHeight: 16, textAlign: 'left', marginBottom: 16 },
  footerTextBold: { fontWeight: '700', color: '#AAA' },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 4, marginBottom: 10 },
  paginationDot: { width: 6, height: 6, borderRadius: 3 },
  paginationDotActive: { backgroundColor: COLORS.highlight, width: 8, height: 8, borderRadius: 4, marginTop: -1 },
  paginationDotInactive: { backgroundColor: COLORS.inactiveDot, borderWidth: 1, borderColor: '#000' },


  // Menu
  menuOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 },
  sideMenu: { position: 'absolute', top: 90, right: 16, backgroundColor: '#2A2D35', borderRadius: 16, padding: 8, zIndex: 101, minWidth: 200 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, gap: 16 },
  menuText: { color: '#fff', fontSize: 14, fontWeight: '400' },
});

