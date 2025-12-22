import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import projectsData from "../data/projects.json";

// In-memory storage that starts with JSON data
let USER_PROJECTS: any[] = [...projectsData.projects];

// Helper functions to work with JSON data
export const setUserProjects = (projects: any[]) => {
  USER_PROJECTS = projects;
};

export const getUserProjects = () => {
  return USER_PROJECTS;
};

export const hasUserProjects = () => {
  return USER_PROJECTS.length > 0;
};

export default function HomeRouter() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has projects from JSON
    const userHasProjects = hasUserProjects();

    // Navigate based on projects availability
    if (userHasProjects) {
      router.replace("/home");
    } else {
      router.replace("/home2");
    }
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#DFFF4F" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A20",
    justifyContent: "center",
    alignItems: "center",
  },
});
