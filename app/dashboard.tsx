import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export default function DashboardScreen() {
  const router = useRouter();
  const [sliderValue, setSliderValue] = useState(35);
  const translateX = useRef(new Animated.Value(0)).current;

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false }
  );

  const handleStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      const newValue = Math.max(0, Math.min(100, sliderValue + translationX / 3));
      setSliderValue(Math.round(newValue));
      translateX.setValue(0);
    }
  };

  const percentage = Math.round(sliderValue);
  const aedValue = Math.round((percentage / 100) * 1225600);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#181A20" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Main Stats */}
        <View style={styles.mainStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{percentage}%</Text>
            <Text style={styles.statLabel}>Complete</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>AED {aedValue.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Value</Text>
          </View>
        </View>

        {/* Timeline Slider */}
        <View style={styles.timelineContainer}>
          <Text style={styles.timelineTitle}>Project Timeline</Text>
          
          <View style={styles.sliderContainer}>
            <View style={styles.sliderTrack} />
            <PanGestureHandler
              onGestureEvent={handleGestureEvent}
              onHandlerStateChange={handleStateChange}
            >
              <Animated.View 
                style={[
                  styles.sliderThumb,
                  {
                    left: `${sliderValue}%`,
                    transform: [{ translateX: translateX }]
                  }
                ]}
              />
            </PanGestureHandler>
          </View>

          <View style={styles.timelineLabels}>
            <Text style={styles.timelineLabel}>Start</Text>
            <Text style={styles.timelineLabel}>Flip Ready</Text>
            <Text style={styles.timelineLabel}>Handover</Text>
          </View>
        </View>

        {/* Status Cards */}
        <View style={styles.statusGrid}>
          <View style={styles.statusCard}>
            <View style={styles.statusIcon}>
              <Ionicons name="play" size={16} color="#EEFB73" />
            </View>
            <Text style={styles.statusTitle}>Start</Text>
            <Text style={styles.statusValue}>0%</Text>
          </View>

          <View style={styles.statusCard}>
            <View style={styles.statusIcon}>
              <Ionicons name="trending-up" size={16} color="#EEFB73" />
            </View>
            <Text style={styles.statusTitle}>Flip Ready</Text>
            <Text style={styles.statusValue}>35%</Text>
          </View>

          <View style={styles.statusCard}>
            <View style={styles.statusIcon}>
              <Ionicons name="checkmark" size={16} color="#EEFB73" />
            </View>
            <Text style={styles.statusTitle}>Handover</Text>
            <Text style={styles.statusValue}>70%</Text>
          </View>
        </View>

        {/* Analytics */}
        <View style={styles.analyticsContainer}>
          <Text style={styles.analyticsTitle}>Property Analytics</Text>
          
          <View style={styles.analyticsGrid}>
            <View style={styles.analyticsItem}>
              <Text style={styles.analyticsLabel}>Capital Appreciation</Text>
              <Text style={styles.analyticsValue}>+12.5%</Text>
            </View>
            
            <View style={styles.analyticsItem}>
              <Text style={styles.analyticsLabel}>Rental Yield</Text>
              <Text style={styles.analyticsValue}>8.2%</Text>
            </View>
            
            <View style={styles.analyticsItem}>
              <Text style={styles.analyticsLabel}>ROI</Text>
              <Text style={styles.analyticsValue}>15.7%</Text>
            </View>
            
            <View style={styles.analyticsItem}>
              <Text style={styles.analyticsLabel}>Market Value</Text>
              <Text style={styles.analyticsValue}>AED 1.4M</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name="file-text" size={23} color="#EEFB73" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerButton} onPress={() => router.push("/form1")}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/timeline')}>
          <Feather name="search" size={23} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/Profile")}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  // Main Stats
  mainStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    color: '#A0A0A0',
    fontSize: 14,
  },

  // Timeline
  timelineContainer: {
    backgroundColor: '#27292D',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  timelineTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 15,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#4A5568',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#EEFB73',
    borderRadius: 10,
    marginTop: -8,
    marginLeft: -10,
  },
  timelineLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineLabel: {
    color: '#A0A0A0',
    fontSize: 12,
  },

  // Status Grid
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statusCard: {
    backgroundColor: '#27292D',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statusIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(238, 251, 115, 0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statusTitle: {
    color: '#A0A0A0',
    fontSize: 12,
    marginBottom: 5,
  },
  statusValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Analytics
  analyticsContainer: {
    backgroundColor: '#27292D',
    borderRadius: 16,
    padding: 20,
    marginBottom: 100,
  },
  analyticsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  analyticsGrid: {
    gap: 15,
  },
  analyticsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  analyticsLabel: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  analyticsValue: {
    color: '#EEFB73',
    fontSize: 16,
    fontWeight: '600',
  },

  // Bottom Navigation
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: "#1A1C20",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  centerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1FE74",
    justifyContent: "center",
    alignItems: "center",
  },
  plus: { 
    fontSize: 24, // Increased from 22 to 24
    color: "#000", 
    fontWeight: "900",
    textShadowColor: "#000",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 0.5,
  },
});