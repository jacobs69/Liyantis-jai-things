import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const fadeAnim = new Animated.Value(0);

  const toggleMenu = () => {
    if (!menuVisible) {
      setMenuVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    }
  };

  return (
    <View className="flex-1 bg-[#181A20] pt-16">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between px-5 mb-2.5 items-center">
          <Ionicons name="arrow-back" size={22} color="#fff" />
          <Text className="text-white text-xl font-semibold">Profile</Text>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Dropdown Menu */}
        {menuVisible && (
          <Animated.View
            className="absolute right-6 top-[90px] bg-[#1B1D27] py-1 w-[190px] rounded-xl z-30"
            style={{ opacity: fadeAnim }}
          >
            <TouchableOpacity className="flex-row items-center justify-between px-4 py-3">
              <Text className="text-white text-[15px]">Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={20} color="#F1FE74" />
            </TouchableOpacity>
            <View className="h-px bg-[#333] mx-3" />
            <TouchableOpacity className="flex-row items-center justify-between px-4 py-3">
              <Text className="text-white text-[15px]">Terms of Service</Text>
              <Ionicons name="chevron-forward" size={20} color="#F1FE74" />
            </TouchableOpacity>
            <View className="h-px bg-[#333] mx-3" />
            <TouchableOpacity className="flex-row items-center justify-between px-4 py-3">
              <Text className="text-white text-[15px]">Sign Out</Text>
              <Ionicons name="chevron-forward" size={20} color="#F1FE74" />
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Profile Image + Info */}
        <View className="items-center mb-5">
          <Image
            source={require("../assets/images/profile.png")}
            className="w-[90px] h-[90px] rounded-full mb-3"
          />
          <Text className="text-white text-lg font-semibold">Arpit Aryan Gupta</Text>
          <Text className="text-[#A3A3A3] mb-4">arpit@liyantis.com</Text>
          <TouchableOpacity className="border border-white py-1.5 px-5 rounded-lg mt-1">
            <Text className="text-white">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around px-8 mb-6 mt-2.5">
          <View className="items-center">
            <Text className="text-white text-[22px] font-semibold">42</Text>
            <Text className="text-[#A3A3A3] mt-1">Projects Analyzed</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-[22px] font-semibold">7</Text>
            <Text className="text-[#A3A3A3] mt-1">Pinned Projects</Text>
          </View>
        </View>

        {/* Menu Cards */}
        <View className="flex-row bg-[#1B1D27] p-4 mx-5 rounded-xl items-center mb-4">
          <View className="w-[38px] h-[38px] bg-[#F1FE74] rounded-[10px] justify-center items-center mr-4">
            <Ionicons name="heart" size={22} color="#000" />
          </View>
          <Text className="flex-1 text-white text-base">Saved Projects</Text>
          <Ionicons name="chevron-forward" size={22} color="#F1FE74" />
        </View>

        <View className="flex-row bg-[#1B1D27] p-4 mx-5 rounded-xl items-center mb-4">
          <View className="w-[38px] h-[38px] bg-[#F1FE74] rounded-[10px] justify-center items-center mr-4">
            <Ionicons name="headset-outline" size={22} color="#000" />
          </View>
          <Text className="flex-1 text-white text-base">Contact Support</Text>
          <Ionicons name="chevron-forward" size={22} color="#F1FE74" />
        </View>

        <View className="flex-row bg-[#1B1D27] p-4 mx-5 rounded-xl items-center mb-4">
          <View className="w-[38px] h-[38px] bg-[#F1FE74] rounded-[10px] justify-center items-center mr-4">
            <Ionicons name="settings-outline" size={22} color="#000" />
          </View>
          <Text className="flex-1 text-white text-base">App Settings</Text>
          <Ionicons name="chevron-forward" size={22} color="#F1FE74" />
        </View>

        <View className="h-24" />
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 h-[75px] bg-[#1A1C20] flex-row justify-around items-center rounded-t-[20px]">
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name="file-text" size={23} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity className="w-10 h-10 rounded-full bg-[#F1FE74] justify-center items-center">
          <Text className="text-[22px] text-black -mt-0.5">+</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name="search" size={23} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/Profile")}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}