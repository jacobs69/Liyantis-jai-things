import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const COLORS = {
  background: '#0D0D0D',
  primary: '#EBFF3D',
  textWhite: '#FFFFFF',
  textGrey: '#B3B3B3',
  cardBorder: '#1A1A1A',
  tabInactive: '#2A2A2C',
};

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Recent');

  const SegmentedControl = () => (
    <View style={styles.segmentWrapper}>
      <TouchableOpacity
        style={[
          styles.segmentButton,
          activeTab === 'Recent' && styles.segmentActive,
        ]}
        onPress={() => setActiveTab('Recent')}
      >
        <Text
          style={[
            styles.segmentText,
            activeTab === 'Recent' && styles.segmentTextActive,
          ]}
        >
          Recent
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.segmentButton,
          activeTab === 'Projects Sold' && styles.segmentActive,
        ]}
        onPress={() => setActiveTab('Projects Sold')}
      >
        <Text
          style={[
            styles.segmentText,
            activeTab === 'Projects Sold' && styles.segmentTextActive,
          ]}
        >
          Projects Sold
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello Arpit,</Text>
          <Text style={styles.title}>Good Morning</Text>
        </View>

        <TouchableOpacity style={styles.bellWrapper}>
          <Ionicons
            name="notifications-outline"
            size={25}
            color={COLORS.primary}
          />
          <View style={styles.bellDot} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <SegmentedControl />

      {/* Empty State */}
      <View style={styles.centerContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.emptyCard}
          onPress={() => router.push('/form1')}
        >
          <View style={styles.emptyIconWrapper}>
            <MaterialCommunityIcons
              name="office-building"
              size={70}
              color="#1A1A1A"
            />
            <View style={styles.addBadge}>
              <Ionicons name="add" size={16} color="#1A1A1A" />
            </View>
          </View>

          <Text style={styles.emptyTitle}>No projects yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap to add your first project
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="document-text-outline" size={23} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.centerButton}
          onPress={() => router.push('/form1')}
        >
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="search-outline" size={23} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/Profile')}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    paddingTop: 70,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  greeting: {
    color: COLORS.textGrey,
    fontSize: 14,
  },
  title: {
    color: COLORS.textWhite,
    fontSize: 26,
    fontWeight: '700',
    marginTop: 4,
  },

  bellWrapper: {
    position: 'relative',
    padding: 8,
  },
  bellDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  // Segment
  segmentWrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.tabInactive,
    borderRadius: 12,
    padding: 6,
    marginBottom: 20,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: COLORS.primary,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textGrey,
  },
  segmentTextActive: {
    color: '#000',
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -40,
  },

  emptyCard: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyIconWrapper: {
    marginBottom: 15,
    position: 'relative',
  },
  addBadge: {
    position: 'absolute',
    bottom: -8,
    right: -12,
    width: 26,
    height: 26,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#1A1A1A',
    borderWidth: 1,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#1A1A1A',
    opacity: 0.7,
  },

  // Bottom Nav
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: '#1A1C20',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  centerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1FE74',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: { 
    fontSize: 22, 
    color: '#000', 
    marginTop: -1 
  },
});
