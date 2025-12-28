import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          animation: 'none', // Remove animation to eliminate white flash and delay
          contentStyle: { backgroundColor: '#181A20' }, // Set dark background to prevent white flash
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="SplashScreen" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="boarding" />
        <Stack.Screen name="boardingSlideshow" />
        <Stack.Screen name="boarding1" />
        <Stack.Screen name="boarding2" />
        <Stack.Screen name="boarding3" />
        <Stack.Screen name="email" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="home" />
        <Stack.Screen name="home2" />
        <Stack.Screen name="Profile" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="timeline" />
        <Stack.Screen name="form1" />
        <Stack.Screen name="form2" />
        <Stack.Screen name="form3" />
        <Stack.Screen name="form4" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
