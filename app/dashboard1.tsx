import React, { useRef, useState } from "react";
import {
  Dimensions,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar
} from "react-native";
import { Feather } from "@expo/vector-icons";

// --- Constants ---
const COLORS = {
  bg: "#12141D",
  cardBg: "#22252B",
  highlight: "#DFFF4F", 
  red: '#FF3B30',
  inactiveDot: '#444',
  textWhite: '#FFFFFF',
  textGrey: '#888',
  textLight: '#bbb'
};

// --- Timeline Data with Labels ---
const TIMELINE_DATA = [
  { date: 'Jan 26', percent: '5', value: '61,250', label: 'Start Point' },
  { date: 'Feb 26', percent: '5', value: '61,250', label: '' },
  { date: 'Mar 26', percent: '10', value: '122,500', label: '' },
  { date: 'Apr 26', percent: '10', value: '122,500', label: '' },
  { date: 'May 26', percent: '15', value: '183,750', label: '' },
  { date: 'Jun 26', percent: '20', value: '245,000', label: 'Flip Ready' }, // Big Dot
  { date: 'Jul 26', percent: '22', value: '269,500', label: '' },
  { date: 'Aug 26', percent: '24', value: '294,000', label: '' },
  { date: 'Sep 26', percent: '26', value: '318,500', label: '' },
  { date: 'Oct 26', percent: '28', value: '343,000', label: '' },
  { date: 'Nov 26', percent: '29', value: '355,250', label: '' },
  { date: 'Jan 27', percent: '30', value: '367,500', label: 'Handover' }, // End Dot
];

export default function MobileApp() {
  // --- Payment Timeline Logic ---
  // Start at index 2 (Mar 26) initially
  const [timelineIndex, setTimelineIndex] = useState(2); 
  const [sliderWidth, setSliderWidth] = useState(0);
   
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

  // Get current data based on index
  const currentTimelineItem = TIMELINE_DATA[timelineIndex];

  // Calculate dynamic position (pixels) for yellow line and red triangle
  const getPosition = () => {
    if (TIMELINE_DATA.length <= 1 || sliderWidth === 0) return 0;
    const position = (timelineIndex / (TIMELINE_DATA.length - 1)) * sliderWidth;
    return position;
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* --- 70/30 Payment Plan Card --- */}
        <View style={styles.paymentCard}>
          
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>70/30</Text>
            <TouchableOpacity>
              <Feather name="maximize-2" size={14} color="#aaa" />
            </TouchableOpacity>
          </View>

          {/* Dynamic Percent Center */}
          <View style={styles.centerPercent}>
            <Text style={styles.bigPercent}>{currentTimelineItem.percent}</Text>
            <Text style={styles.percentSymbol}>%</Text>
            
            {/* Dynamic Status Label (Start/Flip/Handover) */}
            {currentTimelineItem.label !== '' && (
                <Text style={styles.statusLabel}>{currentTimelineItem.label}</Text>
            )}
          </View>
          
          {/* Dynamic Date & Value */}
          <View style={styles.dateLabelRow}>
              <Text style={styles.dateLabelLeft}>{currentTimelineItem.date}</Text>
              <Text style={styles.aedLabelCenter}>
                AED <Text style={{color: COLORS.textWhite, fontWeight:'700'}}>{currentTimelineItem.value}</Text>
              </Text>
          </View>

          {/* Interactive Timeline */}
          <View 
            style={styles.timelineContainer}
            onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
            {...panResponder.panHandlers} 
          >
            {/* Background Line */}
            <View style={styles.timelineLine} />

            {/* Moving Yellow Line */}
            {sliderWidth > 0 && (
              <View style={[styles.timelineFilled, { width: getPosition() }]} />
            )}
            
            {/* Moving Red Triangle */}
            {sliderWidth > 0 && (
              <View style={[styles.redTriangleContainer, { left: getPosition() }]}>
                <Text style={styles.redTriangle}>▼</Text>
              </View>
            )}
            
            {/* Dots */}
            <View style={styles.dotsRow}>
              {TIMELINE_DATA.map((item, i) => {
                  const isSpecialDot = item.label !== '';
                  const isActive = i === timelineIndex;
                  const isFilled = i < timelineIndex;

                  return (
                  <View 
                    key={i} 
                    style={[
                      styles.dot, 
                      isSpecialDot && styles.dotSpecial, // Larger for milestones
                      isActive && styles.dotActive, // Active (current) state
                      isFilled && styles.dotFilled // Filled (past) state
                    ]} 
                  />
                  );
              })}
            </View>

            {/* Fixed Start/Mid/End Labels below line */}
            <View style={styles.timelineLabels}>
              <Text style={styles.timeLabel}>Jan 26</Text>
              <Text style={styles.timeLabel}>Jun 26</Text>
              <Text style={styles.timeLabel}>Jan 27</Text>
            </View>
          </View>
        </View>

      </SafeAreaView>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: 'center', // Center card vertically
    paddingHorizontal: 16,
  },
  safeArea: {
    width: '100%',
  },
  
  // Card Styles
  paymentCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    height: 260,
    width: '100%',
  },
  cardHeader: { 
    flexDirection: "row", 
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardTitle: { 
    color: COLORS.textWhite, 
    fontWeight: "700", 
    fontSize: 16 
  },

  centerPercent: { 
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    position: 'relative' 
  },
  bigPercent: { 
    fontSize: 72, 
    color: COLORS.textWhite, 
    fontWeight: "600", 
    letterSpacing: -2 
  },
  percentSymbol: { 
    fontSize: 24, 
    color: COLORS.textWhite, 
    marginTop: 14, 
    fontWeight: '600' 
  },
  
  statusLabel: {
    position: 'absolute',
    right: 0, 
    top: 55, 
    color: COLORS.highlight,
    fontSize: 13,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2
  },
   
  dateLabelRow: {
    flexDirection:'row', 
    justifyContent:'space-between', 
    width:'100%', 
    paddingHorizontal: 10,
    position: 'relative',
    height: 20,
  },
  dateLabelLeft: {
    color: COLORS.textLight, 
    fontSize: 14, 
    fontWeight: '600'
  },
  aedLabelCenter: {
    color: COLORS.textGrey, 
    fontSize: 12, 
    position:'absolute', 
    left: 0, 
    right: 0, 
    textAlign:'center', 
    top: -10
  },

  // Timeline Styles
  timelineContainer: { 
    marginTop: 20, 
    position: 'relative',
    height: 40, // Height to contain touch area
    justifyContent: 'center',
  },
  redTriangleContainer: { 
    position: 'absolute', 
    top: 0, 
    marginLeft: -6, 
    zIndex: 10,
    alignItems: 'center'
  },
  redTriangle: { 
    color: COLORS.red, 
    fontSize: 16, 
    transform: [{rotate: '180deg'}] 
  }, 

  timelineLine: { 
    height: 2, 
    backgroundColor: COLORS.inactiveDot, 
    width: "100%", 
    position: "absolute", 
    top: 18 // Centered vertically in container
  },
  timelineFilled: { 
    height: 2, 
    backgroundColor: COLORS.highlight, 
    position: "absolute", 
    top: 18 
  }, 
  
  dotsRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: "100%",
    position: 'absolute',
    top: 14 // Align dots with line
  },
  dot: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: COLORS.inactiveDot, 
    marginTop: 2 
  },
  
  dotSpecial: { 
    width: 12, 
    height: 12, 
    borderRadius: 6, 
    marginTop: 0 
  }, 
  dotActive: { 
    backgroundColor: COLORS.highlight, 
    width: 14, 
    height: 14, 
    borderRadius: 7, 
    marginTop: -1, 
    borderWidth: 2, 
    borderColor: COLORS.cardBg 
  },
  dotFilled: { 
    backgroundColor: COLORS.highlight 
  }, 

  timelineLabels: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    position: 'absolute',
    bottom: -10,
    width: '100%'
  },
  timeLabel: { 
    color: "#666", 
    fontSize: 11 
  },
});