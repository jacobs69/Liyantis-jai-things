import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        translucent 
        backgroundColor="transparent"
      />
      
      {/* Upper Half - Three Circular Images */}
      <View style={styles.imageContainer}>
        {/* Small Circle - Top Left */}
        <View style={[styles.circleWrapper, styles.circle1Position]}>
          <Image 
            source={require('../assets/images/onboarding-img1.png')}
            style={styles.circle1}
            resizeMode="cover"
          />
          <View style={styles.checkmark}>
            <Ionicons name="checkmark" size={14} color="#000" />
          </View>
        </View>

        {/* Medium Circle - Top Right */}
        <View style={[styles.circleWrapper, styles.circle2Position]}>
          <Image 
            source={require('../assets/images/onboarding-img2.png')}
            style={styles.circle2}
            resizeMode="cover"
          />
          <View style={styles.checkmark}>
            <Ionicons name="checkmark" size={14} color="#000" />
          </View>
        </View>

        {/* Large Circle - Bottom Center */}
        <View style={[styles.circleWrapper, styles.circle3Position]}>
          <Image 
            source={require('../assets/images/onboarding-img3.png')}
            style={styles.circle3}
            resizeMode="cover"
          />
          <View style={styles.checkmark}>
            <Ionicons name="checkmark" size={16} color="#000" />
          </View>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>SUPERPOWERS TO CLOSE DEALS</Text>
        <Text style={styles.title}>Turning</Text>
        <Text style={styles.title}>Agents into</Text>
        <Text style={styles.title}>Closers</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/boardingSlideshow')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Arrow - bottom right */}
      <View style={styles.arrowWrapper}>
        <View style={styles.arrowShape}>
          <Ionicons name="arrow-forward" size={28} color="#181A20" style={{ transform: [{ rotate: '20deg' }] }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15171c',
    position: 'relative',
  },
  imageContainer: {
    height: '45%',
    width: '100%',
    position: 'relative',
    marginTop: 40,
  },
  
  // Circle Wrappers
  circleWrapper: {
    position: 'absolute',
  },
  
  // Circle 1 - Small (Top Left)
  circle1Position: {
    top: 60,
    left: 30, // Moved slightly left
  },
  circle1: {
    width: 90, // Increased size
    height: 90, // Increased size
    borderRadius: 45,
  },
  
  // Circle 2 - Medium (Top Right)
  circle2Position: {
    top: 20,
    right: 20, // Moved slightly right
  },
  circle2: {
    width: 110, // Increased size
    height: 110, // Increased size
    borderRadius: 55,
  },
  
  // Circle 3 - Large (Bottom Center)
  circle3Position: {
    bottom: -30, // Moved slightly down
    left: '50%',
    marginLeft: -80, // Adjusted center
  },
  circle3: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  
  // Checkmark Badge
  checkmark: {
    position: 'absolute',
    top: 0, // Positioned at the very top edge
    right: 0, // Positioned at the very right edge
    width: 30, // Increased size
    height: 30, // Increased size
    borderRadius: 15,
    backgroundColor: '#EEFB73',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
    borderWidth: 3, // Added border for the "cutout" effect
    borderColor: '#15171c', // Border matches background color
  },
  
  content: {
    position: 'absolute',
    bottom: 100, // Moved up slightly
    left: 34,
    right: 24,
  },
  subtitle: {
    color: '#EEFB73',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '300',
    lineHeight: 50,
  },
  button: {
    backgroundColor: '#EEFB73',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginTop: 24,
  },
  buttonText: {
    color: '#181A20',
    fontSize: 15,
    fontWeight: '600',
  },

  /* ---------------- ARROW ---------------- */
  arrowWrapper: {
    position: 'absolute',
    bottom: 140, // Moved up significantly
    right: -20,
  },

  arrowShape: {
    width: 120, // Increased size
    height: 120, // Increased size
    backgroundColor: '#EEFB73',
    borderTopLeftRadius: 130,
    borderBottomLeftRadius: 130,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-11deg' }],
    paddingLeft: 30, // Adjusted padding
  },
});