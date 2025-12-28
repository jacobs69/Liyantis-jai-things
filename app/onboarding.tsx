import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#181A20', '#1f2128', '#121316']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* --- Onboarding Group Image --- */}
      <View style={styles.onboardingImageSection}>
        <Image 
          source={require('../assets/images/onboarding group.png')}
          style={styles.onboardingImage}
          resizeMode="contain"
        />
      </View>

      {/* --- Text Content Section --- */}
      <View style={styles.textSection}>
        <View>
          <Text style={styles.subTitle}>SUPERPOWERS TO CLOSE DEALS</Text>
          <Text style={styles.title}>
            Turning{"\n"}
            <Text style={{ fontWeight: '500' }}>Agents</Text> into{"\n"}
            <Text style={{ fontWeight: '500' }}>Closers</Text>
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/boardingSlideshow')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* --- Slide Arrow --- */}
      <TouchableOpacity 
        style={styles.slideArrowContainer}
        activeOpacity={0.9}
        onPress={() => console.log('Slide to next')}
      >
        <Image 
          source={require('../assets/images/slide arrow cut.png')}
          style={styles.slideArrowImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Gradient Overlay at bottom for text readability */}
      <LinearGradient
        colors={['transparent', '#181A20']}
        style={styles.bottomOverlay}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  // Onboarding Image Area
  onboardingImageSection: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    zIndex: 10,
  },
  onboardingImage: {
    width: '100%',
    height: '100%',
  },
  // Text Area
  textSection: {
    paddingHorizontal: 32,
    paddingBottom: 64,
    paddingTop: 20,
    justifyContent: 'flex-end',
    zIndex: 20,
    gap: 32,
  },
  subTitle: {
    color: '#D4FF4A',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 35,
    fontFamily: 'Kaleko105Book',
    lineHeight: 40,
  },
  button: {
    backgroundColor: '#EEFB73',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    alignSelf: 'flex-start',
    shadowColor: "#EEFB73",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  buttonText: {
    color: '#181A20',
    fontSize: 16,
    fontWeight: '600',
  },
  // Slide Arrow
  slideArrowContainer: {
    position: 'absolute',
    bottom: 80,
    right: -100,
    width: 278.6,
    height: 278.6,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideArrowImage: {
    width: '100%',
    height: '100%',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '25%',
    zIndex: 0,
  },
});