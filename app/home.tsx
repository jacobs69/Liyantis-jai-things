import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Projects data
const ALL_PROPERTIES = [
  {
    "_id": "693dba0e771d5d3f31d003e7",
    "agentId": "693d7061d1a4eaebe4befd6d",
    "projectName": "The Weave",
    "developer": "Al Ghurair",
    "location": "JVC",
    "type": "Apartment",
    "bedrooms": 1,
    "status": "Off-Plan",
    "currency": "AED",
    "price": 1225000,
    "areaSqFt": 776,
    "areaSqM": 72.09,
    "dldPercent": 4,
    "serviceChargePerSqFt": 11,
    "isLiked": false,
    "isSold": true,
    "isDeleted": false,
    "paymentPlan": {
      "duringConstructionPercent": 40,
      "onHandoverPercent": 60,
      "postHandoverPercent": 0,
      "flipAtPercent": 35,
      "handoverAtPercent": 70,
      "installments": [
        {"date": "2026-01-26", "percent": 10, "stage": "Down Payment"},
        {"date": "2026-02-26", "percent": 20, "stage": "During Construction"},
        {"date": "2026-03-26", "percent": 30, "stage": "During Construction"},
        {"date": "2026-04-26", "percent": 40, "stage": "During Construction"},
        {"date": "2026-05-26", "percent": 50, "stage": "During Construction"},
        {"date": "2026-06-26", "percent": 60, "stage": "During Construction"},
        {"date": "2026-07-26", "percent": 70, "stage": "During Construction"},
        {"date": "2026-08-26", "percent": 80, "stage": "During Construction"},
        {"date": "2026-09-26", "percent": 90, "stage": "During Construction"},
        {"date": "2026-10-26", "percent": 100, "stage": "On Handover"},
        {"date": "2026-11-26", "percent": 100, "stage": "Post Handover"},
        {"date": "2027-01-27", "percent": 100, "stage": "Handover"}
      ]
    },
    "projections": {
      "exitStrategy": {
        "conservativePercent": -50,
        "optimisticPercent": 25
      },
      "yoyGrowthBeforeHandover": 8,
      "yoyGrowthAfterHandover": 7,
      "rentalYieldPercent": 10
    },
    "ratings": {
      "capitalAppreciation": 3,
      "paymentPlan": 2,
      "serviceCharges": 4,
      "proximity": 3,
      "connectivity": 3,
      "governmentInfrastructure": 3,
      "record": 3,
      "stability": 3,
      "reputation": 3,
      "quality": 3,
      "amenities": 3,
      "rentalDemand": 3,
      "resale": 3
    },
    "exitStrategies": {
      "stp": {
        "moderate": {"percent": "25.46%", "val": "AED 137.24k"},
        "conservative": {"percent": "7.87%", "val": "AED 42.42k"},
        "optimistic": {"percent": "34.46%", "val": "AED 185.75k"}
      },
      "mtp": {
        "moderate": {"percent": "25.46%", "val": "AED 137.24k"},
        "conservative": {"percent": "7.87%", "val": "AED 42.42k"},
        "optimistic": {"percent": "34.46%", "val": "AED 185.75k"}
      },
      "ltp": {
        "moderate": {"percent": "117.72%", "val": "AED 137.24k"},
        "conservative": {"percent": "49.18%", "val": "AED 42.42k"},
        "optimistic": {"percent": "160.32%", "val": "AED 185.75k"}
      }
    },
    "createdAt": "2025-12-13T19:10:06.903Z",
    "updatedAt": "2025-12-13T19:10:06.903Z"
  },
  {
    "_id": "693dba0e771d5d3f31d003e8",
    "agentId": "693d7061d1a4eaebe4befd6d",
    "projectName": "Ellington Properties",
    "developer": "The Cove",
    "type": "Apartment",
    "bedrooms": 2,
    "status": "Off-Plan",
    "currency": "AED",
    "price": 1850000,
    "areaSqFt": 1200,
    "areaSqM": 111.48,
    "dldPercent": 4,
    "serviceChargePerSqFt": 13,
    "isLiked": false,
    "isSold": true,
    "isDeleted": false,
    "paymentPlan": {
      "duringConstructionPercent": 50,
      "onHandoverPercent": 50,
      "postHandoverPercent": 0,
      "flipAtPercent": 40,
      "handoverAtPercent": 80,
      "installments": [
        {"date": "2026-01-26", "percent": 10, "stage": "Down Payment"},
        {"date": "2026-06-26", "percent": 50, "stage": "During Construction"},
        {"date": "2027-01-27", "percent": 100, "stage": "On Handover"}
      ]
    },
    "projections": {
      "exitStrategy": {
        "conservativePercent": -50,
        "optimisticPercent": 25
      },
      "yoyGrowthBeforeHandover": 8,
      "yoyGrowthAfterHandover": 7,
      "rentalYieldPercent": 10
    },
    "ratings": {
      "capitalAppreciation": 4,
      "paymentPlan": 3,
      "serviceCharges": 3,
      "proximity": 4,
      "connectivity": 4,
      "governmentInfrastructure": 4,
      "record": 4,
      "stability": 4,
      "reputation": 4,
      "quality": 4,
      "amenities": 4,
      "rentalDemand": 4,
      "resale": 4
    },
    "exitStrategies": {
      "stp": {
        "moderate": {"percent": "28.50%", "val": "AED 185.25k"},
        "conservative": {"percent": "9.20%", "val": "AED 55.50k"},
        "optimistic": {"percent": "38.75%", "val": "AED 245.80k"}
      },
      "mtp": {
        "moderate": {"percent": "28.50%", "val": "AED 185.25k"},
        "conservative": {"percent": "9.20%", "val": "AED 55.50k"},
        "optimistic": {"percent": "38.75%", "val": "AED 245.80k"}
      },
      "ltp": {
        "moderate": {"percent": "125.40%", "val": "AED 185.25k"},
        "conservative": {"percent": "52.30%", "val": "AED 55.50k"},
        "optimistic": {"percent": "168.90%", "val": "AED 245.80k"}
      }
    },
    "createdAt": "2025-12-13T19:10:06.903Z",
    "updatedAt": "2025-12-13T19:10:06.903Z"
  },
  {
    "_id": "693dba0e771d5d3f31d003e9",
    "agentId": "693d7061d1a4eaebe4befd6d",
    "projectName": "Dubai Islands",
    "developer": "Emaar, Ellington Properties",
    "type": "Apartment",
    "bedrooms": 3,
    "status": "Off-Plan",
    "currency": "AED",
    "price": 2950000,
    "areaSqFt": 1850,
    "areaSqM": 171.87,
    "dldPercent": 4,
    "serviceChargePerSqFt": 15,
    "isLiked": true,
    "isSold": false,
    "isDeleted": false,
    "paymentPlan": {
      "duringConstructionPercent": 60,
      "onHandoverPercent": 40,
      "postHandoverPercent": 0,
      "flipAtPercent": 50,
      "handoverAtPercent": 90,
      "installments": [
        {"date": "2026-01-26", "percent": 10, "stage": "Down Payment"},
        {"date": "2026-06-26", "percent": 60, "stage": "During Construction"},
        {"date": "2027-01-27", "percent": 100, "stage": "On Handover"}
      ]
    },
    "projections": {
      "exitStrategy": {
        "conservativePercent": -50,
        "optimisticPercent": 25
      },
      "yoyGrowthBeforeHandover": 8,
      "yoyGrowthAfterHandover": 7,
      "rentalYieldPercent": 10
    },
    "ratings": {
      "capitalAppreciation": 5,
      "paymentPlan": 4,
      "serviceCharges": 3,
      "proximity": 4,
      "connectivity": 5,
      "governmentInfrastructure": 5,
      "record": 4,
      "stability": 5,
      "reputation": 5,
      "quality": 5,
      "amenities": 5,
      "rentalDemand": 4,
      "resale": 4
    },
    "exitStrategies": {
      "stp": {
        "moderate": {"percent": "32.15%", "val": "AED 295.40k"},
        "conservative": {"percent": "11.80%", "val": "AED 88.50k"},
        "optimistic": {"percent": "42.90%", "val": "AED 385.20k"}
      },
      "mtp": {
        "moderate": {"percent": "32.15%", "val": "AED 295.40k"},
        "conservative": {"percent": "11.80%", "val": "AED 88.50k"},
        "optimistic": {"percent": "42.90%", "val": "AED 385.20k"}
      },
      "ltp": {
        "moderate": {"percent": "135.60%", "val": "AED 295.40k"},
        "conservative": {"percent": "58.70%", "val": "AED 88.50k"},
        "optimistic": {"percent": "178.30%", "val": "AED 385.20k"}
      }
    },
    "createdAt": "2025-12-13T19:10:06.903Z",
    "updatedAt": "2025-12-13T19:10:06.903Z"
  },
  {
    "_id": "693dba0e771d5d3f31d003ea",
    "agentId": "693d7061d1a4eaebe4befd6d",
    "projectName": "Dubai Marina",
    "developer": "Nakheel Properties",
    "type": "Apartment",
    "bedrooms": 2,
    "status": "Resale",
    "currency": "AED",
    "price": 2150000,
    "areaSqFt": 1350,
    "areaSqM": 125.42,
    "dldPercent": 4,
    "serviceChargePerSqFt": 14,
    "isLiked": false,
    "isSold": false,
    "isDeleted": false,
    "paymentPlan": {
      "duringConstructionPercent": 0,
      "onHandoverPercent": 100,
      "postHandoverPercent": 0,
      "flipAtPercent": 0,
      "handoverAtPercent": 100,
      "installments": [
        {"date": "2026-01-26", "percent": 100, "stage": "Full Payment"}
      ]
    },
    "projections": {
      "exitStrategy": {
        "conservativePercent": -50,
        "optimisticPercent": 25
      },
      "yoyGrowthBeforeHandover": 8,
      "yoyGrowthAfterHandover": 7,
      "rentalYieldPercent": 10
    },
    "ratings": {
      "capitalAppreciation": 3,
      "paymentPlan": 2,
      "serviceCharges": 4,
      "proximity": 4,
      "connectivity": 5,
      "governmentInfrastructure": 4,
      "record": 4,
      "stability": 4,
      "reputation": 4,
      "quality": 4,
      "amenities": 5,
      "rentalDemand": 5,
      "resale": 4
    },
    "exitStrategies": {
      "stp": {
        "moderate": {"percent": "22.40%", "val": "AED 150.30k"},
        "conservative": {"percent": "8.50%", "val": "AED 45.20k"},
        "optimistic": {"percent": "30.80%", "val": "AED 195.50k"}
      },
      "mtp": {
        "moderate": {"percent": "22.40%", "val": "AED 150.30k"},
        "conservative": {"percent": "8.50%", "val": "AED 45.20k"},
        "optimistic": {"percent": "30.80%", "val": "AED 195.50k"}
      },
      "ltp": {
        "moderate": {"percent": "108.50%", "val": "AED 150.30k"},
        "conservative": {"percent": "45.60%", "val": "AED 45.20k"},
        "optimistic": {"percent": "152.70%", "val": "AED 195.50k"}
      }
    },
    "createdAt": "2025-12-13T19:10:06.903Z",
    "updatedAt": "2025-12-13T19:10:06.903Z"
  },
  {
    "_id": "693dba0e771d5d3f31d003eb",
    "agentId": "693d7061d1a4eaebe4befd6d",
    "projectName": "Palm Jumeirah",
    "developer": "Emaar",
    "type": "Apartment",
    "bedrooms": 4,
    "status": "Off-Plan",
    "currency": "AED",
    "price": 4500000,
    "areaSqFt": 2500,
    "areaSqM": 232.26,
    "dldPercent": 4,
    "serviceChargePerSqFt": 18,
    "isLiked": false,
    "isSold": false,
    "isDeleted": false,
    "paymentPlan": {
      "duringConstructionPercent": 70,
      "onHandoverPercent": 30,
      "postHandoverPercent": 0,
      "flipAtPercent": 60,
      "handoverAtPercent": 95,
      "installments": [
        {"date": "2026-01-26", "percent": 10, "stage": "Down Payment"},
        {"date": "2026-06-26", "percent": 70, "stage": "During Construction"},
        {"date": "2027-01-27", "percent": 100, "stage": "On Handover"}
      ]
    },
    "projections": {
      "exitStrategy": {
        "conservativePercent": -50,
        "optimisticPercent": 25
      },
      "yoyGrowthBeforeHandover": 8,
      "yoyGrowthAfterHandover": 7,
      "rentalYieldPercent": 10
    },
    "ratings": {
      "capitalAppreciation": 5,
      "paymentPlan": 4,
      "serviceCharges": 3,
      "proximity": 5,
      "connectivity": 5,
      "governmentInfrastructure": 5,
      "record": 5,
      "stability": 5,
      "reputation": 5,
      "quality": 5,
      "amenities": 5,
      "rentalDemand": 5,
      "resale": 5
    },
    "exitStrategies": {
      "stp": {
        "moderate": {"percent": "35.80%", "val": "AED 450.50k"},
        "conservative": {"percent": "13.20%", "val": "AED 135.40k"},
        "optimistic": {"percent": "48.60%", "val": "AED 585.70k"}
      },
      "mtp": {
        "moderate": {"percent": "35.80%", "val": "AED 450.50k"},
        "conservative": {"percent": "13.20%", "val": "AED 135.40k"},
        "optimistic": {"percent": "48.60%", "val": "AED 585.70k"}
      },
      "ltp": {
        "moderate": {"percent": "148.90%", "val": "AED 450.50k"},
        "conservative": {"percent": "65.30%", "val": "AED 135.40k"},
        "optimistic": {"percent": "195.40%", "val": "AED 585.70k"}
      }
    },
    "createdAt": "2025-12-13T19:10:06.903Z",
    "updatedAt": "2025-12-13T19:10:06.903Z"
  },
  {
    "_id": "693dba0e771d5d3f31d003ec",
    "agentId": "693d7061d1a4eaebe4befd6d",
    "projectName": "Dubai Hills Estate",
    "developer": "Meraas",
    "type": "Apartment",
    "bedrooms": 3,
    "status": "Off-Plan",
    "currency": "AED",
    "price": 3200000,
    "areaSqFt": 1950,
    "areaSqM": 181.16,
    "dldPercent": 4,
    "serviceChargePerSqFt": 16,
    "isLiked": false,
    "isSold": true,
    "isDeleted": false,
    "paymentPlan": {
      "duringConstructionPercent": 60,
      "onHandoverPercent": 40,
      "postHandoverPercent": 0,
      "flipAtPercent": 50,
      "handoverAtPercent": 90,
      "installments": [
        {"date": "2026-01-26", "percent": 10, "stage": "Down Payment"},
        {"date": "2026-06-26", "percent": 60, "stage": "During Construction"},
        {"date": "2027-01-27", "percent": 100, "stage": "On Handover"}
      ]
    },
    "projections": {
      "exitStrategy": {
        "conservativePercent": -50,
        "optimisticPercent": 25
      },
      "yoyGrowthBeforeHandover": 8,
      "yoyGrowthAfterHandover": 7,
      "rentalYieldPercent": 10
    },
    "ratings": {
      "capitalAppreciation": 4,
      "paymentPlan": 4,
      "serviceCharges": 4,
      "proximity": 4,
      "connectivity": 4,
      "governmentInfrastructure": 4,
      "record": 4,
      "stability": 4,
      "reputation": 4,
      "quality": 4,
      "amenities": 4,
      "rentalDemand": 4,
      "resale": 4
    },
    "exitStrategies": {
      "stp": {
        "moderate": {"percent": "29.70%", "val": "AED 285.60k"},
        "conservative": {"percent": "10.50%", "val": "AED 78.40k"},
        "optimistic": {"percent": "39.80%", "val": "AED 365.90k"}
      },
      "mtp": {
        "moderate": {"percent": "29.70%", "val": "AED 285.60k"},
        "conservative": {"percent": "10.50%", "val": "AED 78.40k"},
        "optimistic": {"percent": "39.80%", "val": "AED 365.90k"}
      },
      "ltp": {
        "moderate": {"percent": "128.40%", "val": "AED 285.60k"},
        "conservative": {"percent": "55.20%", "val": "AED 78.40k"},
        "optimistic": {"percent": "172.50%", "val": "AED 365.90k"}
      }
    },
    "createdAt": "2025-12-13T19:10:06.903Z",
    "updatedAt": "2025-12-13T19:10:06.903Z"
  }
];

const COLORS = {
  bg: "#181A20",        // Deep dark background
  cardBg: "#262A34",    // Search bar/Input background
  primary: "#DFFF4F",   // The Lime Yellow accent
  textWhite: "#FFFFFF",
  textGrey: "#8E8E93",
  border: "#2C2C2E",
};

export default function HomeScreen() {
  const router = useRouter();
  
  // State for filtering and search
  const [activeFilter, setActiveFilter] = useState("All"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortOption, setSortOption] = useState("Most recent");
  const [favStates, setFavStates] = useState(
    ALL_PROPERTIES.map((p) => p.isLiked || false)
  );

  // Function to get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const toggleFav = (index: number) => {
    const updated = [...favStates];
    updated[index] = !updated[index];
    setFavStates(updated);
  };

  // 2. Filter Logic: Changes data based on button click and search
  const getFilteredData = () => {
    let filtered = [...ALL_PROPERTIES];
    
    // Apply filter
    if (activeFilter === "Sold projects") {
      filtered = filtered.filter((item) => item.isSold === true);
    } else if (activeFilter === "Favourites") {
      // Show only favorited projects
      filtered = filtered.filter((item, index) => favStates[index]);
    }
    
    // Apply search
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((item) => 
        item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.developer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortOption === "A to Z") {
      filtered.sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else if (sortOption === "Z to A") {
      filtered.sort((a, b) => b.projectName.localeCompare(a.projectName));
    } else if (sortOption === "Price (Low to high)") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price (High to low)") {
      filtered.sort((a, b) => b.price - a.price);
    }
    // "Most recent" keeps original order
    
    return filtered;
  };

  const displayedData = getFilteredData();

  const renderItem = ({ item }: any) => {
    // Find the original index in ALL_PROPERTIES
    const originalIndex = ALL_PROPERTIES.findIndex(p => p.projectName === item.projectName);
    
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.propertyRow}
        onPress={() => {
          router.push({
            pathname: "/dashboard",
            params: { projectName: item.projectName }
          });
        }}
      >
        {/* Left: Heart Icon */}
        <TouchableOpacity onPress={() => toggleFav(originalIndex)} style={styles.heartContainer}>
          <Ionicons
            name={favStates[originalIndex] ? "heart" : "heart-outline"}
            size={20}
            color={favStates[originalIndex] ? "#E74C3C" : COLORS.textWhite}
          />
        </TouchableOpacity>

      {/* Middle: Text Info */}
      <View style={styles.textContainer}>
        <Text style={styles.propertyName}>{item.projectName}</Text>
        <Text style={styles.propertyBuilder}>{item.developer}</Text>
      </View>

      {/* Right: Arrow */}
      <Image 
        source={require("../assets/svgs/Arrow 1.png")} 
        style={{ width: 20, height: 20 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
    );
  };

  // Helper for Filter Chips
  const FilterChip = ({ label }: { label: string }) => {
    const isActive = activeFilter === label;
    
    const handlePress = () => {
      if (label === "Sort By") {
        setShowSortMenu(!showSortMenu);
      } else {
        setActiveFilter(label);
        setShowSortMenu(false);
      }
    };
    
    return (
      <TouchableOpacity
        style={[
          styles.filterChip,
          isActive ? styles.filterChipActive : styles.filterChipInactive,
        ]}
        onPress={handlePress}
      >
        <Text
          style={[
            styles.filterText,
            isActive ? styles.filterTextActive : styles.filterTextInactive,
          ]}
        >
          {label}
        </Text>
        {label === "Sort By" && (
           <Ionicons 
             name={showSortMenu ? "chevron-up" : "chevron-down"} 
             size={12} 
             color={isActive ? "#000" : "#fff"} 
             style={{marginLeft: 4}}
           />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <View style={styles.contentContainer}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetingSmall}>Hello Arpit,</Text>
            <Text style={styles.greetingLarge}>{getGreeting()}</Text>
          </View>
          <TouchableOpacity style={styles.notificationWrapper}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchBar}>
          <Image 
            source={require("../assets/svgs/search png.png")} 
            style={{ width: 20, height: 20, marginRight: 10 }}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Search projects"
            placeholderTextColor="#666"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        {/* HORIZONTAL FILTERS */}
        <View style={{ height: 50, zIndex: 10 }}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.filterScroll}
          >
            <FilterChip label="All" />
            <FilterChip label="Sold projects" />
            <FilterChip label="Sort By" />
            <FilterChip label="Favourites" />
          </ScrollView>
        </View>

        {/* SORT BY DROPDOWN MENU */}
        {showSortMenu && (
          <View style={styles.sortMenuContainer}>
            <TouchableOpacity 
              style={styles.sortMenuItem}
              onPress={() => {
                setSortOption("Most recent");
                setShowSortMenu(false);
              }}
            >
              <Text style={styles.sortMenuText}>Most recent</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.sortMenuItem}
              onPress={() => {
                setSortOption("A to Z");
                setShowSortMenu(false);
              }}
            >
              <Text style={styles.sortMenuText}>A to Z</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.sortMenuItem}
              onPress={() => {
                setSortOption("Z to A");
                setShowSortMenu(false);
              }}
            >
              <Text style={styles.sortMenuText}>Z to A</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.sortMenuItem}
              onPress={() => {
                setSortOption("Price (Low to high)");
                setShowSortMenu(false);
              }}
            >
              <Text style={styles.sortMenuText}>Price</Text>
              <Text style={styles.sortMenuSubtext}>(Low to high)</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.sortMenuItem}
              onPress={() => {
                setSortOption("Price (High to low)");
                setShowSortMenu(false);
              }}
            >
              <Text style={styles.sortMenuText}>Price</Text>
              <Text style={styles.sortMenuSubtext}>(High to low)</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* SECTION TITLE */}
        <Text style={styles.sectionTitle}>
          {activeFilter === "Sold projects" ? "Sold projects" : 
           activeFilter === "Favourites" ? "Favourites" : "All projects"}
        </Text>

        {/* LIST */}
        {displayedData.length > 0 ? (
          <FlatList
            data={displayedData}
            keyExtractor={(item) => item.projectName}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color="#333" />
            <Text style={styles.emptyTitle}>No projects found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? `No results for "${searchQuery}"` : "Try adjusting your filters"}
            </Text>
          </View>
        )}
      </View>

      {/* BOTTOM TAB BAR */}
      <View style={styles.tabBar}>
        <TouchableOpacity>
          <Image 
            source={require("../assets/images/Home_fill.png")} 
            style={{ width: 26, height: 26 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="heart-outline" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerButton} onPress={() => router.push("/form1")}>
          <Image 
            source={require("../assets/svgs/add proj png.png")} 
            style={{ width: 56, height: 56 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="document-text-outline" size={24} color="#fff" />
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
    backgroundColor: COLORS.bg,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  // Header
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 20,
  },
  greetingSmall: { color: '#D1D1D1', fontSize: 16, fontFamily: 'Poppins-Medium', marginBottom: 4 },
  greetingLarge: { color: "#fff", fontSize: 24, fontFamily: 'Poppins-SemiBold', fontWeight: "700" },
  notificationWrapper: { position: "relative", padding: 4 },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    position: "absolute",
    top: 4,
    right: 4,
  },

  // Search
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 44,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  searchInput: { flex: 1, color: "#F5F5F5", fontSize: 14, fontFamily: 'Nunito-Regular', fontWeight: '500' },

  // Filters
  filterScroll: { alignItems: 'center', paddingRight: 20 },
  filterChip: {
    height: 28,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: "#D9D9D9",
    borderColor: "#F5F5F5",
  },
  filterChipInactive: {
    backgroundColor: "#262A34",
    borderColor: "#F5F5F5",
  },
  filterText: { fontSize: 14, fontFamily: 'Inter-Light', fontWeight: "300", textAlign: 'center' },
  filterTextActive: { color: "#000" },
  filterTextInactive: { color: "#FFF" },

  // Sort Menu
  sortMenuContainer: {
    position: 'absolute',
    top: 240,
    right: 20,
    backgroundColor: '#262A34',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A3F4B',
    paddingVertical: 8,
    minWidth: 160,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sortMenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sortMenuText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  sortMenuSubtext: {
    color: '#999',
    fontSize: 12,
    marginTop: 2,
  },

  // List Headers & Items
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 13,
  },
  propertyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  heartContainer: { marginRight: 15 },
  textContainer: { flex: 1 },
  propertyName: { color: "#fff", fontSize: 16, fontFamily: 'Inter-Light', fontWeight: "300", marginBottom: 4 },
  propertyBuilder: { color: "#666", fontSize: 14, fontFamily: 'Inter-Medium', fontWeight: "500" },
  separator: { height: 1, backgroundColor: "#FFFFFF" },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },

  // Bottom Navigation
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: "#27292D",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  centerButton: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
});