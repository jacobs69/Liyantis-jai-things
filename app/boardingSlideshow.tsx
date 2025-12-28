import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function BoardingSlideshow() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const slides = [
    {
      title: "Investor\nMath\nDone.",
      dotIndex: 0,
      image: require("../assets/images/onboarding-img1.png"),
    },
    {
      title: "Save\nBrand\nShare",
      dotIndex: 1,
      image: require("../assets/images/onboarding-img2.png"),
    },
    {
      title: "We Call on\nYour\nBehalf",
      dotIndex: 2,
      image: require("../assets/images/onboarding-img3.png"),
    },
  ];

  // Auto-scroll removed for direct user interaction
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* FULL SCREEN CAROUSEL */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        decelerationRate="fast"
        style={styles.carousel}
      >
        {slides.map((slide, index) => (
          <View key={index} style={{ width, height: height }}>
            {/* BACKGROUND IMAGE */}
            <Image
              source={slide.image}
              style={styles.backgroundImage}
            />
            {/* GRADIENT OVERLAY FOR TEXT READABILITY */}
            <LinearGradient
              colors={['transparent', '#181A20']}
              style={styles.imageGradient}
              locations={[0.4, 1]}
            />
          </View>
        ))}
      </ScrollView>

      {/* CONTENT LAYER (Text, Dots, Buttons) */}
      <View style={styles.contentOverlay}>
        {/* DYNAMIC TITLE */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{slides[currentIndex].title}</Text>

          {/* DOTS INDICATOR */}
          <View style={styles.dotsContainer}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor: currentIndex === index ? "#fff" : "#4A4B55",
                    opacity: currentIndex === index ? 1 : 1,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* BOTTOM ACTION AREA */}
        <View style={styles.actionContainer}>
          {/* PRIMARY BUTTON */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={() => router.push("/login")} // Adjust route as needed
          >
            <Feather name="mail" size={20} color="#000" style={{marginRight: 10}}/>
            <Text style={styles.primaryButtonText}>Continue with Email</Text>
          </TouchableOpacity>

          {/* SOCIAL BUTTONS */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <AntDesign name="google" size={24} color="#FF968E" /> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="apple" size={26} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* FOOTER TEXT */}
          <Text style={styles.termsText}>
            By continuing you agree Liyantis's Terms of{"\n"}Services & Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A20", // Dark background matching the screenshot
  },
  carousel: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height * 0.65, // Image takes up top ~65%
    resizeMode: "cover",
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.65,
  },
  contentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 2, // Ensures content sits on top of the diagonal overlay
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  textContainer: {
    marginBottom: 40,
  },
  title: {
    color: "#fff",
    fontSize: 42,
    fontFamily: "Kaledo105",
    lineHeight: 48,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  actionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF97C", // The specific neon yellow color
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 15,
    shadowColor: "#EAF97C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  primaryButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginBottom: 30,
  },
  socialButton: {
    width: 130,
    height: 55,
    borderRadius: 35,        // pill shape
    borderWidth: 1,
    borderColor: "#3A3B48",
    backgroundColor: "transparent", // same as screenshot
    justifyContent: "center",
    alignItems: "center",
  },
  termsText: {
    color: "#6B6C78",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
});