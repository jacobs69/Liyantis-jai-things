import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

const data = [
  { date: "Oct 25", step: 1, percent: "5%", amount: "61,250", type: "circle", color: "#FFFFFF" },
  { date: "Nov 25", step: 2, percent: "10%", amount: "122,500", type: "circle", color: "#8E8E93" },
  { date: "Mar 26", step: 3, percent: "10%", amount: "122,500", type: "circle", color: "#8E8E93" },
  { date: "Jan 26", step: 4, percent: "10%", amount: "122,500", type: "circle", color: "#8BE24A" },
  { date: "Jan 26", step: 5, percent: "10%", amount: "122,500", type: "circle", color: "#8BE24A" },
  { date: "Jan 26", step: 6, percent: "10%", amount: "122,500", type: "circle", color: "#8BE24A" },
  // Changed type to render icons
  { date: "Jan 26", step: 7, percent: "10%", amount: "122,500", type: "key", color: "#FFFFFF" },
  { date: "Jan 26", step: 8, percent: "35%", amount: "122,500", type: "flag", color: "#FFFFFF" },
];

export default function TimelineScreen() {
  const router = useRouter();

  const renderIcon = (item: any) => {
    if (item.type === 'key') {
      return (
         <View style={styles.iconContainer}>
            <Feather name="key" size={14} color="#fff" style={{transform: [{rotate: '-45deg'}]}} />
         </View>
      );
    }
    if (item.type === 'flag') {
        return (
           <View style={styles.iconContainer}>
              <Feather name="flag" size={14} color="#fff" />
           </View>
        );
      }
    // Default Circle
    return (
      <Svg height="20" width="20">
        <Circle cx="10" cy="10" r="5" fill={item.color} />
      </Svg>
    );
  };

  return (
    <View style={styles.container}>
      {/* Modal Grabber */}
      <View style={styles.grabber} />

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment Timeline</Text>
        <Feather name="more-horizontal" size={24} color="white" />
      </View>

      {/* Yellow Toggles */}
      <View style={styles.toggleRow}>
        <View style={styles.yellowPill}>
          <Text style={styles.pillText}>Cumulative</Text>
          <View style={styles.checkboxSquare} />
        </View>

        <View style={styles.yellowPill}>
          <Text style={styles.pillText}>AED</Text>
          <Feather name="chevron-down" size={14} color="#000" />
        </View>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerLabel, { width: 60 }]}>Date</Text>
        {/* Vertical Separator */}
        <View style={styles.vertLine} />
        <Text style={[styles.headerLabel, { width: 100, textAlign: 'center' }]}>Instalment (%)</Text>
        <Text style={[styles.headerLabel, { flex: 1, textAlign: "right" }]}>Amount</Text>
      </View>

      <View style={styles.divider} />

      {/* Timeline List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((item, index) => (
          <View key={index}>
            <View style={styles.row}>
              {/* Date */}
              <Text style={styles.dateText}>{item.date}</Text>

              {/* Timeline Column */}
              <View style={styles.timelineCol}>
                {/* Dashed Line Logic */}
                {index !== data.length - 1 && (
                  <View style={styles.svgLineWrapper}>
                    <Svg height="65" width="2">
                      <Line
                        x1="1" y1="0" x2="1" y2="65"
                        stroke="#444"
                        strokeWidth="1.5"
                        strokeDasharray="4, 4" // <--- MAKES IT DASHED
                      />
                    </Svg>
                  </View>
                )}
                
                {/* The Icon or Dot */}
                <View style={styles.iconWrapper}>
                   {renderIcon(item)}
                </View>
              </View>

              {/* Step Number */}
              <Text style={styles.stepNum}>{item.step}</Text>

              {/* Percent */}
              <Text style={styles.percentText}>{item.percent}</Text>

              {/* Amount */}
              <Text style={styles.amountText}>{item.amount}</Text>
            </View>
            
            {/* Faint Row Divider */}
            {index !== data.length - 1 && <View style={styles.rowDivider} />}
          </View>
        ))}
        
        <View style={{height: 40}} />
      </ScrollView>

      {/* Bottom Legend */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#8BE24A" }]} />
          <Text style={styles.legendText}>Flip Ready</Text>
        </View>
        <View style={styles.legendItem}>
          <Feather name="key" size={12} color="#ccc" style={{marginRight: 6, transform:[{rotate:'-45deg'}]}} />
          <Text style={styles.legendText}>Handover</Text>
        </View>
        <View style={styles.legendItem}>
          <Feather name="flag" size={12} color="#ccc" style={{marginRight: 6}} />
          <Text style={styles.legendText}>Last Instalment</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16181D", // Darker background
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  grabber: {
    width: 40, height: 4, backgroundColor: '#444', borderRadius: 2, alignSelf:'center', marginBottom: 20, marginTop: 10
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  headerText: { color: "white", fontSize: 18, fontWeight: "700" },

  // Yellow Toggles
  toggleRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  yellowPill: {
    backgroundColor: "#EFF998", // Pale Lime/Yellow
    flexDirection: "row", alignItems: "center",
    paddingVertical: 6, paddingHorizontal: 12,
    borderRadius: 8,
    gap: 8
  },
  pillText: { color: "#16181D", fontWeight: "600", fontSize: 13 },
  checkboxSquare: { width: 12, height: 12, borderWidth: 1.5, borderColor: '#16181D', borderRadius: 2 },

  // Header
  tableHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10, marginTop: 10 },
  headerLabel: { color: "#fff", fontSize: 14, fontWeight: '500' },
  vertLine: { width: 1, height: 16, backgroundColor: '#444', marginHorizontal: 10, borderStyle:'dotted', borderWidth:1, borderColor:'#666'}, // Simulating dotted separator
  divider: { height: 1, backgroundColor: "#333", marginBottom: 0 },

  // Rows
  row: { flexDirection: "row", alignItems: "center", height: 50 },
  dateText: { color: "#888", fontSize: 13, width: 60 },
  
  timelineCol: { width: 30, alignItems: "center", justifyContent:'center' },
  svgLineWrapper: { position: 'absolute', top: 20, zIndex: -1 },
  iconWrapper: { width: 20, height: 20, justifyContent:'center', alignItems:'center', backgroundColor:'#16181D' }, // Bg covers the line behind icon
  iconContainer: { width: 20, alignItems:'center'},

  stepNum: { color: "#666", fontSize: 13, width: 24, marginLeft: 4 },
  percentText: { color: "#888", fontSize: 14, width: 80, textAlign:'right' },
  amountText: { color: "#aaa", fontSize: 14, flex: 1, textAlign: "right" },
  
  rowDivider: { height: 1, backgroundColor: "#222", width: '100%', borderStyle: 'dashed', borderWidth: 1, borderColor: '#2A2F38' }, // Dashed row separator

  // Legend
  legendRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30, marginTop: 10 },
  legendItem: { flexDirection: "row", alignItems: "center" },
  legendDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  legendText: { color: "#888", fontSize: 12 },
});