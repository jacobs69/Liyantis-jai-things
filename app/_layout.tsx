import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          animation: 'fade',
          animationDuration: 200,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="SplashScreen" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="boarding" options={{ headerShown: false }} />
        <Stack.Screen name="boardingSlideshow" options={{ headerShown: false }} />
        <Stack.Screen name="boarding1" options={{ headerShown: false }} />
        <Stack.Screen name="boarding2" options={{ headerShown: false }} />
        <Stack.Screen name="boarding3" options={{ headerShown: false }} />
        <Stack.Screen name="email" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="home2" options={{ headerShown: false }} />
        <Stack.Screen name="Profile" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="timeline" options={{ headerShown: false }} />
        <Stack.Screen name="form1" options={{ headerShown: false }} />
        <Stack.Screen name="form2" options={{ headerShown: false }} />
        <Stack.Screen name="form3" options={{ headerShown: false }} />
        <Stack.Screen name="form4" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
