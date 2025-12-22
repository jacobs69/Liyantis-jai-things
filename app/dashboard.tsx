import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// --- Projects Data ---
const PROJECTS_DATA = [
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

// --- Constants ---
const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_PADDING = 16;
const CONTAINER_WIDTH = SCREEN_WIDTH - (CARD_PADDING * 2); 

const COLORS = {
  moderateBg: '#F0FD73',      
  conservativeBg: '#FAFFC9',  
  optimisticBg: '#A3B403',    
  highlight: '#DFFF4F',
  inactiveDot: '#3A3A3C',
  textGrey: '#8E8E93',
  textWhite: '#FFFFFF',
  textDark: '#1A1A1A',
  cardBg: '#27292D',  
  darkBg: '#13161C',  
  strategyContainerBg: '#27292D',  
  primaryDark: '#12141D', 
  cardDark: '#27292D', 
  paymentCardDark: '#22252B', 
  headerGrey: '#888',
  timelineLine: '#555',
  timelineRed: '#FF3B30',
  pillText: '#000',
  pillBg: '#F3FD88',
};

// --- Data ---
const TIMELINE_DATA = [
  { date: 'Jan 26', percent: '10', value: '122,500' }, // 0
  { date: 'Feb 26', percent: '20', value: '245,000' },
  { date: 'Mar 26', percent: '30', value: '367,500' }, // 2 <- SCREENSHOT POINTER
  { date: 'Apr 26', percent: '40', value: '490,000' },
  { date: 'May 26', percent: '50', value: '612,500' },
  { date: 'Jun 26', percent: '60', value: '735,000' }, // 5 <- MIDDLE LABEL
  { date: 'Jul 26', percent: '70', value: '857,500' },
  { date: 'Aug 26', percent: '80', value: '980,000' },
  { date: 'Sep 26', percent: '90', value: '1,102,500' },
  { date: 'Oct 26', percent: '100', value: '1,225,000' },
  { date: 'Nov 26', percent: '100+', value: 'Final' },
  { date: 'Jan 27', percent: 'Handover', value: 'Done' }, // 11 <- END LABEL
];

type StrategyData = {
  id: string;
  type: 'STP' | 'MTP' | 'LTP';
  title: string;
  accessoryType: 'dropdown' | 'counter';
  moderate: { percent: string; val: string };
  conservative: { percent: string; val: string };
  optimistic: { percent: string; val: string };
  description: string;
  highlightText: string;
};

const STRATEGIES: StrategyData[] = [
  {
    id: '1',
    type: 'STP',
    title: 'STP — Flipping',
    accessoryType: 'dropdown',
    moderate: { percent: '25.46%', val: 'AED 137.24k' },
    conservative: { percent: '7.87%', val: 'AED 42.42k' },
    optimistic: { percent: '34.46%', val: 'AED 185.75k' },
    description: '** The project will generate an estimated ROE of ~25.46% based on ',
    highlightText: 'AED539k capital invested by March 2026.',
  },
  {
    id: '2',
    type: 'MTP',
    title: 'MTP — Holding',
    accessoryType: 'dropdown',
    moderate: { percent: '25.46%', val: 'AED 137.24k' },
    conservative: { percent: '7.87%', val: 'AED 42.42k' },
    optimistic: { percent: '34.46%', val: 'AED 185.75k' },
    description: '** The project will generate an estimated ROE of ~25.46% based on ',
    highlightText: 'AED539k capital invested by March 2026.',
  },
  {
    id: '3',
    type: 'LTP',
    title: 'LTP — Compounding',
    accessoryType: 'counter',
    moderate: { percent: '117.72%', val: 'AED 137.24k' },
    conservative: { percent: '49.18%', val: 'AED 42.42k' },
    optimistic: { percent: '160.32%', val: 'AED 185.75k' },
    description: '** The project will generate an estimated ROE of ~25.46% based on ',
    highlightText: 'AED1.274mn (AED1.225 + 4% DLD) capital invested by Jan 2027.',
  },
];

// --- TOOLTIP CONTENT ---
const TOOLTIP_CONTENT = {
  offPlan: { title: "Off-plan", text: "This project is still under construction." },
  rating: { title: "Project rating", text: "Overall rating of project based on the rated parameters." },
  rooms: { title: "Unit Type", text: "1 Bedroom configuration with standard layout." },
  area: { title: "Apartment", text: "This is an apartment (project category) with an area of 776 ft²." },
  sc: { title: "Service Charges/ft²", text: "This section right here contains service charges per square feet." },
  pr: { title: "Price/ft²", text: "This section right here contains price per square feet." },
  dld: { title: "DLD", text: "This section contains Dubai land department transfer fee." }
};

export default function DashboardScreen() {
  const params = useLocalSearchParams();
  const projectName = params.projectName as string || "The Weave";
  
  // Get project data
  const project = PROJECTS_DATA.find(p => p.projectName === projectName) || PROJECTS_DATA[0];
  
  // Map new structure to old structure for compatibility
  const projectDetails = {
    rating: project.ratings ? (
      (project.ratings.capitalAppreciation + project.ratings.paymentPlan + 
       project.ratings.serviceCharges + project.ratings.proximity + 
       project.ratings.connectivity + project.ratings.governmentInfrastructure + 
       project.ratings.record + project.ratings.stability + project.ratings.reputation + 
       project.ratings.quality + project.ratings.amenities + project.ratings.rentalDemand + 
       project.ratings.resale) / 13
    ).toFixed(1) : 7.5,
    bedrooms: project.bedrooms,
    planType: project.status.toUpperCase().replace('-', ' '),
    price: {
      amount: (project.price / 1000000).toFixed(3),
      unit: "mn",
      currency: project.currency
    },
    area: {
      sqft: project.areaSqFt,
      sqm: project.areaSqM
    },
    serviceCharge: project.serviceChargePerSqFt,
    pricePerSqft: Math.round(project.price / project.areaSqFt),
    dld: Math.round((project.price * project.dldPercent) / 100 / 1000),
    paymentPlan: `${project.paymentPlan.duringConstructionPercent}/${project.paymentPlan.onHandoverPercent}`,
    exitStrategies: project.exitStrategies
  };
  
  // Create strategies from project data
  const STRATEGIES_DYNAMIC: StrategyData[] = [
    {
      id: '1',
      type: 'STP',
      title: 'STP — Flipping',
      accessoryType: 'dropdown',
      moderate: projectDetails.exitStrategies.stp.moderate,
      conservative: projectDetails.exitStrategies.stp.conservative,
      optimistic: projectDetails.exitStrategies.stp.optimistic,
      description: '** The project will generate an estimated ROE of ~25.46% based on ',
      highlightText: 'AED539k capital invested by March 2026.',
    },
    {
      id: '2',
      type: 'MTP',
      title: 'MTP — Holding',
      accessoryType: 'dropdown',
      moderate: projectDetails.exitStrategies.mtp.moderate,
      conservative: projectDetails.exitStrategies.mtp.conservative,
      optimistic: projectDetails.exitStrategies.mtp.optimistic,
      description: '** The project will generate an estimated ROE of ~25.46% based on ',
      highlightText: 'AED539k capital invested by March 2026.',
    },
    {
      id: '3',
      type: 'LTP',
      title: 'LTP — Compounding',
      accessoryType: 'counter',
      moderate: projectDetails.exitStrategies.ltp.moderate,
      conservative: projectDetails.exitStrategies.ltp.conservative,
      optimistic: projectDetails.exitStrategies.ltp.optimistic,
      description: '** The project will generate an estimated ROE of ~25.46% based on ',
      highlightText: 'AED1.274mn (AED1.225 + 4% DLD) capital invested by Jan 2027.',
    },
  ];
  
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // --- Carousel State ---
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width; 
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== activeIndex) {
      setActiveIndex(roundIndex);
    }
  };

  // --- Payment Timeline Logic (Pin at 2nd big dot - Jun 26) ---
  const DEFAULT_TIMELINE_INDEX = 6; // Index for Jun 26 (2nd big dot)

  const [timelineIndex, setTimelineIndex] = useState(DEFAULT_TIMELINE_INDEX);
  const [sliderWidth, setSliderWidth] = useState(0);
  const dragStartX = useRef(0);

  const handleTouch = (x: number) => {
    if (sliderWidth === 0) return;
    const constrainedX = Math.max(0, Math.min(x, sliderWidth));
    const percentage = constrainedX / sliderWidth;
    const newValue = Math.round(percentage * (TIMELINE_DATA.length - 1));
    setTimelineIndex(newValue);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt) => {
        handleTouch(evt.nativeEvent.locationX);
      },

      onPanResponderMove: (evt, gestureState) => {
        if (sliderWidth === 0) return;
        const step = sliderWidth / (TIMELINE_DATA.length - 1);
        const newX = timelineIndex * step + gestureState.dx;
        const percentage = newX / sliderWidth;
        const rawIndex = Math.round(percentage * (TIMELINE_DATA.length - 1));
        const clampedIndex = Math.max(0, Math.min(rawIndex, TIMELINE_DATA.length - 1));
        setTimelineIndex(clampedIndex); 
      },
    })
  ).current;

  const displayedTimelineItem = TIMELINE_DATA[timelineIndex];
  
  const getTrianglePosition = () => {
    if (TIMELINE_DATA.length <= 1 || sliderWidth === 0) return 0;
    const position = (timelineIndex / (TIMELINE_DATA.length - 1)) * sliderWidth;
    return position;
  };

  // --- Dot Renderer Function (Updated to show all dots) ---
  const TimelineDots = () => {
    const DOT_SIZE_LG = 16; 
    const DOT_SIZE_SM = 8;
    
    const KEY_DOT_INDICES = [0, 6, 11]; // Jan 26, Jun 26, Jan 27
    
    const step = sliderWidth / (TIMELINE_DATA.length - 1);
    
    return (
      <View style={styles.dotsRowAbsolute}>
        {TIMELINE_DATA.map((_, i) => {
          const isKeyDot = KEY_DOT_INDICES.includes(i);

          if (isKeyDot) {
            const leftPosition = i * step - (DOT_SIZE_LG / 2);
            return (
              <View
                key={`main-dot-${i}`}
                style={[
                  styles.dotBase,
                  styles.dotLarge,
                  { left: leftPosition },
                  styles.dotFilled // Always yellow
                ]}
              />
            );
          } else {
            const leftPosition = i * step - (DOT_SIZE_SM / 2);
            return (
              <View
                key={`small-dot-${i}`}
                style={[
                  styles.dotBase,
                  styles.dotSmall,
                  { left: leftPosition },
                  styles.dotSmallFilled // Always yellow
                ]}
              />
            );
          }
        })}

      </View>
    );
  };


  // --- Tooltip Component ---
  const Tooltip = ({ id, width = 200, leftOffset = 0, position = "above" }: { id: keyof typeof TOOLTIP_CONTENT, width?: number, leftOffset?: number, position?: "above" | "below" }) => {
    if (activeTooltip !== id) return null;
    const content = TOOLTIP_CONTENT[id];

    return (
      <View style={[
        styles.tooltipContainer, 
        { width, marginLeft: leftOffset },
        position === "below" ? styles.tooltipBelow : styles.tooltipAbove
      ]}>
        {position === "above" && <View style={styles.tooltipPointer} />}
        <View style={styles.tooltipBox}>
          <View style={styles.tooltipHeader}>
            <Text style={styles.tooltipTitle}>{content.title}</Text>
            <Pressable onPress={() => setActiveTooltip(null)} hitSlop={10}>
              <Feather name="x" size={18} color="#aaa" />
            </Pressable>
          </View>
          <Text style={styles.tooltipText}>
            {content.text}
          </Text>
        </View>
        {position === "below" && <View style={styles.tooltipPointerBelow} />}
      </View>
    );
  };

  // --- Render Item for Carousel ---
  const renderItem = ({ item }: { item: StrategyData }) => {
    return (
      <View style={styles.slideContainer}>
        {/* CONTAINER FOR EXIT STRATEGIES (#27292D) */}
        <View style={styles.strategyContentWrapper}>
          
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.smallLabel}>Exit Strategies</Text>
              <Text style={styles.mainTitle}>{item.title}</Text>
            </View>
            <View style={styles.topRightContainer}>
              {item.accessoryType === 'dropdown' ? (
                // Dropdown (for STP)
                <>
                  <View style={styles.percentBadge}>
                    <Text style={styles.percentSymbolBadge}>%</Text>
                    <Ionicons name="chevron-down" size={12} color="#000" />
                  </View>
                  {/* EXPAND ICON FOR EXIT STRATEGIES */}
                  <TouchableOpacity style={styles.expandIcon}>
                    <Feather name="maximize-2" size={18} color="#FFF" /> 
                  </TouchableOpacity>
                </>
              ) : (
                // Counter (for LTP)
                <View style={styles.counterContainer}>
                  <TouchableOpacity style={styles.counterBtn}>
                    <Text style={styles.counterBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>5</Text>
                  <TouchableOpacity style={styles.counterBtn}>
                    <Text style={styles.counterBtnText}>+</Text>
                  </TouchableOpacity>
                  {/* EXPAND ICON FOR EXIT STRATEGIES */}
                  <TouchableOpacity style={styles.expandIcon}>
                    <Feather name="maximize-2" size={18} color="#FFF" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {/* Cards Row */}
          <View style={styles.cardsRow}>
            <View style={[styles.strategyCardItem, { backgroundColor: COLORS.moderateBg, borderColor: '#FFF', borderWidth: 1 }]}>
              <Text style={styles.cardLabel}>Moderate</Text>
              <Text style={styles.cardPercent}>{item.moderate.percent}</Text>
              <Text style={styles.cardValue}>{item.moderate.val}</Text>
            </View>
            <View style={[styles.strategyCardItem, { backgroundColor: COLORS.conservativeBg }]}>
              <Text style={styles.cardLabel}>Conservative</Text>
              <Text style={styles.cardPercent}>{item.conservative.percent}</Text>
              <Text style={styles.cardValue}>{item.conservative.val}</Text>
            </View>
            <View style={[styles.strategyCardItem, { backgroundColor: COLORS.optimisticBg }]}>
              <Text style={styles.cardLabel}>Optimistic</Text>
              <Text style={styles.cardPercent}>{item.optimistic.percent}</Text>
              <Text style={styles.cardValue}>{item.optimistic.val}</Text>
            </View>
          </View>

          {/* Footer Text */}
          <Text style={styles.footerText} numberOfLines={2}>
            {item.description}
            <Text style={styles.footerTextBold}>{item.highlightText}</Text>
          </Text>

          {/* Carousel Dots */}
          <View style={styles.dotsContainer}>
            {STRATEGIES_DYNAMIC.map((_, index) => {
              const isActive = index === activeIndex;
              return (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    isActive ? styles.paginationDotActive : styles.paginationDotInactive
                  ]}
                />
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Feather name="chevron-left" size={26} color="#fff" />
          </Pressable>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{project.projectName}{project.location ? `, ${project.location}` : ''}</Text>
            <Text style={styles.headerSubtitle}>by {project.developer}</Text>
          </View>
          <Pressable onPress={() => setMenuVisible(!menuVisible)}>
            <Feather name="more-horizontal" size={24} color="#fff" />
          </Pressable>
        </View>

        {/* Side Menu */}
        {menuVisible && (
          <>
            <Pressable style={styles.menuOverlay} onPress={() => setMenuVisible(false)} />
            <View style={styles.sideMenu}>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="heart-outline" size={22} color="#fff" />
                <Text style={styles.menuText}>Add to liked</Text>
              </TouchableOpacity>
              <View style={styles.menuSeparator} />
              
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="star-outline" size={22} color="#fff" />
                <Text style={styles.menuText}>Edit rating</Text>
              </TouchableOpacity>
              <View style={styles.menuSeparator} />
              
              <TouchableOpacity style={styles.menuItem}>
                <Feather name="edit-2" size={20} color="#fff" />
                <Text style={styles.menuText}>Edit details</Text>
              </TouchableOpacity>
              <View style={styles.menuSeparator} />
              
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="download-outline" size={22} color="#fff" />
                <Text style={styles.menuText}>Get pdf</Text>
              </TouchableOpacity>
              <View style={styles.menuSeparator} />
              
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="share-social-outline" size={22} color="#fff" />
                <Text style={styles.menuText}>Share pdf</Text>
              </TouchableOpacity>
              <View style={styles.menuSeparator} />
              
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
                <Text style={styles.menuText}>Sold</Text>
              </TouchableOpacity>
              <View style={styles.menuSeparator} />
              
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="trash-outline" size={22} color="#F44336" />
                <Text style={styles.menuText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* MAIN CONTENT NO SCROLL */}
        <View style={styles.contentContainer}>

          {/* Top Grid Area */}
          <View style={styles.gridContainer}>
            <View style={[styles.gridRow, { zIndex: 20 }]}>
              {/* 1. Rating */}
              <Pressable style={styles.ratingBox} onPress={() => setActiveTooltip('rating')}>
                <View style={styles.ratingCircle}>
                  <Text style={styles.ratingNumber}>{projectDetails.rating}</Text>
                </View>
                <Tooltip id="rating" leftOffset={50} position="below" />
              </Pressable>

              {/* 2. Room - FIX APPLIED HERE */}
              <Pressable style={styles.roomBox} onPress={() => setActiveTooltip('rooms')}>
                <View style={styles.roomContentWrapper}>
                    <Text style={styles.roomTextLarge}>{projectDetails.bedrooms}</Text>
                    <Text style={styles.roomTextSmall}>BR</Text>
                </View>
                <Tooltip id="rooms" leftOffset={-40} position="below" />
              </Pressable>

              {/* 3. Price */}
              <Pressable style={[styles.priceBox, { zIndex: 100 }]} onPress={() => setActiveTooltip('offPlan')}>
                <Text style={styles.labelTiny}>{projectDetails.planType}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.currencySmall}>{projectDetails.price.currency}</Text>
                  <Text style={styles.priceLarge}>{projectDetails.price.amount}</Text>
                  <Text style={styles.priceUnit}>{projectDetails.price.unit}</Text>
                </View>
                <Tooltip id="offPlan" leftOffset={-100} width={220} position="below" />
              </Pressable>
            </View>

            <View style={[styles.gridRow, { zIndex: 25 }]}>
              {/* 4. Area */}
              <Pressable style={styles.aptBox} onPress={() => setActiveTooltip('area')}>
                <Text style={styles.labelTiny}>APT</Text>
                <View style={styles.aptRow}>
                  <View style={styles.yellowPill}>
                    <Text style={styles.pillText}>ft²</Text>
                    <Feather name="chevron-down" size={10} color={COLORS.pillText} />
                  </View>
                  <Text style={styles.statValueLarge}>{projectDetails.area.sqft}</Text>
                </View>
                <Tooltip id="area" width={220} />
              </Pressable>

              {/* 5. SC */}
              <Pressable style={[styles.smallStatBox, { zIndex: 999, elevation: 999 }]} onPress={() => setActiveTooltip('sc')}>
                <Text style={styles.statLabelTop}>SC/ft²</Text>
                <Text style={styles.statValueMedium}>{projectDetails.serviceCharge}</Text>
                <Tooltip id="sc" leftOffset={-80} />
              </Pressable>

              {/* 6. Pr */}
              <Pressable style={[styles.smallStatBox, { zIndex: 999, elevation: 999 }]} onPress={() => setActiveTooltip('pr')}>
                <Text style={styles.statLabelTop}>Pr/ft²</Text>
                <Text style={styles.statValueMedium}>{projectDetails.pricePerSqft.toLocaleString()}</Text>
                <Tooltip id="pr" leftOffset={-120} />
              </Pressable>

              {/* 7. DLD */}
              <Pressable style={[styles.smallStatBox, { zIndex: 999, elevation: 999 }]} onPress={() => setActiveTooltip('dld')}>
                <Text style={styles.statLabelTop}>DLD</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 12, gap: 2 }}>
                  <Text style={styles.statValueMedium}>{projectDetails.dld}</Text>
                  <Text style={styles.statUnitTiny}>k</Text>
                </View>
                <Tooltip id="dld" leftOffset={-150} width={200} />
              </Pressable>
            </View>
          </View>

          {/* 40/60 Payment Plan Card - BORDER ADDED HERE */}
          <View style={[styles.paymentCard, styles.paymentCardBorder]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{projectDetails.paymentPlan}</Text>
              <Pressable 
                onPress={() => router.push("/timeline")}
                style={{ padding: 8, zIndex: 100 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Feather name="maximize-2" size={12} color="#aaa" />
              </Pressable>
            </View>
            <View style={styles.centerPercent}>
              <Text style={styles.bigPercent}>{displayedTimelineItem.percent}</Text>
              <Text style={styles.percentSymbol}>%</Text>
            </View>
            <View style={styles.dateLabelRow}>
              <Text style={styles.dateLabelLeft}>Mar 26</Text>
              <Text style={styles.aedLabelCenter}>
                AED <Text style={styles.aedValueBold}>{displayedTimelineItem.value}</Text>
              </Text>
            </View>
            <View
              style={styles.timelineContainer}
              onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
              onTouchStart={(evt) => handleTouch(evt.nativeEvent.locationX)}
              onTouchMove={(evt) => handleTouch(evt.nativeEvent.locationX)}
              {...panResponder.panHandlers}
            >
              {sliderWidth > 0 && (
                <View style={[styles.redTriangleContainer, { left: getTrianglePosition() }]}>
                  <Text style={styles.redTriangle}>▼</Text>
                </View>
              )}
              {/* Base line */}
              <View style={styles.timelineLine} />
              {/* Highlight line up to the fixed screenshot index (Mar 26 is index 2) */}
              <View style={[styles.timelineLineHighlight, { width: getTrianglePosition() + 6 }]} />
              
              {/* Render dots in absolute position */}
              {sliderWidth > 0 && <TimelineDots />}

              {/* Only 3 labels for the ends and middle */}
              <View style={styles.timelineLabels}>
                <Text style={styles.timeLabel}>Jan 26</Text>
                <Text style={styles.timeLabelCenter}>Jun 26</Text>
                <Text style={styles.timeLabel}>Jan 27</Text>
              </View>
            </View>
          </View>

          {/* Strategies Carousel */}
          <View style={styles.carouselContainer}>
            <FlatList
              ref={flatListRef}
              data={STRATEGIES_DYNAMIC}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={16}
              contentContainerStyle={{ paddingBottom: 0 }}
            />
          </View>
        </View>
      </SafeAreaView>

      {/* Bottom Navigation */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 0,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: CARD_PADDING,
    paddingTop: 4,
    paddingBottom: 85, // Fixed padding for tabs
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: CARD_PADDING,
    marginBottom: 6,
    marginTop: 0,
  },
  headerTitleContainer: { alignItems: "center", flex: 1 },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  headerSubtitle: { color: COLORS.headerGrey, fontSize: 12, marginTop: 2 },

  // --- Grid Layout ---
  gridContainer: { gap: 6, marginBottom: 6, marginTop: 10, overflow: 'visible' },
  gridRow: { flexDirection: "row", gap: 6, height: 60, zIndex: 10, overflow: 'visible' },

  // Tooltip Styles
  tooltipContainer: { position: 'absolute', left: 0, zIndex: 9999, elevation: 9999, alignItems: 'center', pointerEvents: 'box-none' },
  tooltipAbove: { bottom: '100%', marginBottom: 5 },
  tooltipBelow: { top: '100%', marginTop: 5 },
  tooltipPointer: { width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 6, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#32363F', marginTop: -1 },
  tooltipPointerBelow: { width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderLeftWidth: 6, borderRightWidth: 6, borderBottomWidth: 6, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#32363F', marginBottom: -1 },
  tooltipBox: { backgroundColor: '#32363F', borderRadius: 8, padding: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, elevation: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', width: '100%' },
  tooltipHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  tooltipTitle: { color: '#fff', fontSize: 12, fontWeight: '700' },
  tooltipText: { color: '#ccc', fontSize: 10, lineHeight: 14 },

  // Grid Item Styles
  ratingBox: { width: 70, backgroundColor: COLORS.cardDark, borderRadius: 14, justifyContent: "center", alignItems: "center", zIndex: 100, },
  ratingCircle: { width: 45, height: 45, borderRadius: 25, borderWidth: 3, borderColor: "#C0D926", borderLeftColor: "#2A3038", justifyContent: "center", alignItems: "center", transform: [{ rotate: '45deg' }] },
  ratingNumber: { color: "#fff", fontWeight: "700", fontSize: 14, transform: [{ rotate: '-45deg' }] },
  
  // FIX APPLIED HERE: Centering the room text
  roomBox: { 
    width: 70, 
    backgroundColor: COLORS.darkBg, 
    borderRadius: 14, 
    borderWidth: 1, 
    borderColor: "#444", 
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    zIndex: 100, 
  },
  roomContentWrapper: {
    flexDirection: "row", // Keep 1 and BR horizontal
    alignItems: "baseline", // Align 1 and BR vertically on their baseline
    // No other flex properties needed here
  },
  roomTextLarge: { color: "#fff", fontSize: 26, fontWeight: "400" },
  roomTextSmall: { color: "#ccc", fontSize: 11, marginLeft: 2 },
  
  priceBox: { flex: 1, backgroundColor: COLORS.cardDark, borderRadius: 14, padding: 10, justifyContent: "center", zIndex: 100, elevation: 100 },
  priceRow: { flexDirection: "row", alignItems: "baseline", marginTop: 2 },
  priceLarge: { color: "#fff", fontSize: 24, fontWeight: "500", letterSpacing: -1 },
  currencySmall: { color: COLORS.headerGrey, fontSize: 11, marginRight: 4 },
  priceUnit: { color: COLORS.headerGrey, fontSize: 11 },
  
  aptBox: { flex: 2, backgroundColor: COLORS.cardDark, borderRadius: 14, padding: 10, justifyContent: "center", zIndex: 100, },
  aptRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  yellowPill: { backgroundColor: COLORS.pillBg, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 3 },
  pillText: { fontSize: 11, fontWeight: "700", color: COLORS.pillText },
  statValueLarge: { color: "#fff", fontSize: 20, fontWeight: "500" },
  
  smallStatBox: { flex: 1, backgroundColor: COLORS.cardDark, borderRadius: 14, borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center", zIndex: 100, },
  statLabelTop: { color: COLORS.headerGrey, fontSize: 9, position: 'absolute', top: 8 },
  statValueMedium: { color: "#fff", fontSize: 16, fontWeight: "500", marginTop: 12 },
  statUnitTiny: { color: COLORS.headerGrey, fontSize: 9 },
  labelTiny: { color: COLORS.headerGrey, fontSize: 9, textTransform: "uppercase" },

  // Payment Card
  paymentCard: {
    backgroundColor: COLORS.paymentCardDark,
    borderRadius: 16,
    padding: 16,
    height: 220, 
    marginBottom: 6,
    zIndex: 0,
  },
  // NEW: White border for payment card
  paymentCardBorder: {
    borderWidth: 1,
    borderColor: 'white',
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardTitle: { color: "#fff", fontWeight: "700", fontSize: 14 },
  centerPercent: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10
  },
  bigPercent: { fontSize: 56, color: "#fff", fontWeight: "600", letterSpacing: -2 },
  percentSymbol: { fontSize: 20, color: "#fff", marginTop: 12, fontWeight: '600' },
  
  // Date/AED labels
  dateLabelRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 4, marginTop: 6 },
  dateLabelLeft: { color: '#bbb', fontSize: 12, fontWeight: '600' }, // Mar 26
  aedLabelCenter: { color: COLORS.headerGrey, fontSize: 10, position: 'absolute', left: 0, right: 0, textAlign: 'center', top: -6 },
  aedValueBold: { color: '#fff', fontWeight: '700' }, 
  
  // Timeline Slider
  timelineContainer: { marginTop: 14, position: 'relative', height: 40, justifyContent: 'flex-start' },
  redTriangleContainer: {
    position: 'absolute',
    top: -14,
    marginLeft: -6, 
    zIndex: 10,
    alignItems: 'center'
  },
  redTriangle: { 
    color: COLORS.timelineRed, 
    fontSize: 14, 
    textShadowColor: COLORS.timelineRed,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  
  timelineLine: { height: 2, backgroundColor: COLORS.timelineLine, width: "100%", position: "absolute", top: 8 },
  timelineLineHighlight: { 
    height: 2, 
    backgroundColor: '#F3FD88', 
    position: "absolute", 
    top: 8, 
    left: 0,
    zIndex: 5
  },
  
  // Dot styles (Absolute Positioned)
  dotsRowAbsolute: { 
    position: 'absolute', 
    top: 2, 
    left: 0, 
    right: 0, 
    height: 20
  },
  dotBase: { 
    position: 'absolute',
    borderRadius: 8, 
  },
  dotLarge: { 
    width: 16, 
    height: 16, 
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    zIndex: 6,
  },
  dotSmall: { 
    width: 8, 
    height: 8, 
    borderRadius: 4,
    top: 4,
    zIndex: 6,
  },
  dotSmallFilled: {
    backgroundColor: '#F3FD88',
  },
  dotSmallUnfilled: {
    backgroundColor: '#555',
  },
  dotFilled: { 
    backgroundColor: '#F3FD88', 
    borderColor: '#fff',
  },
  dotUnfilled: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
  },
  dotTransparentSmall: {
    width: 4, 
    height: 4, 
    borderRadius: 2,
    borderColor: 'transparent',
    backgroundColor: 'transparent', 
    top: 5,
  },
  
  // Timeline Labels
  timelineLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 }, 
  timeLabel: { color: COLORS.headerGrey, fontSize: 10 },
  timeLabelCenter: { color: COLORS.headerGrey, fontSize: 10, position: 'absolute', left: 0, right: 0, textAlign: 'center' },


  // Bottom Nav styles
  tabBar: { position: "absolute", bottom: 0, left: 0, right: 0, height: 75, backgroundColor: "#27292D", flexDirection: "row", justifyContent: "space-around", alignItems: "center", borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 10 },
  centerButton: { width: 56, height: 56, justifyContent: "center", alignItems: "center", },
  plus: { fontSize: 32, color: "#000", marginTop: -2 },

  // Carousel Styles
  carouselContainer: { flex: 1, justifyContent: 'flex-end', marginBottom: 0 },
  slideContainer: { width: CONTAINER_WIDTH, justifyContent: 'center' }, 
  strategyContentWrapper: { backgroundColor: COLORS.strategyContainerBg, borderRadius: 24, padding: 16, paddingRight: 12, paddingBottom: 20, width: '100%', marginTop: 0, overflow: 'hidden' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  smallLabel: { color: '#666', fontSize: 11, fontWeight: '600', marginBottom: 2 },
  mainTitle: { color: COLORS.textWhite, fontSize: 15, fontWeight: '700' },
  topRightContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  percentBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.moderateBg, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, gap: 4 },
  percentSymbolBadge: { fontSize: 12, fontWeight: '700', color: '#000' },
  expandIcon: { padding: 2 },
  counterContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', borderRadius: 8, padding: 2 },
  counterBtn: { backgroundColor: COLORS.moderateBg, width: 22, height: 22, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  counterBtnText: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  counterValue: { color: '#FFF', fontSize: 15, fontWeight: '600', marginHorizontal: 8 },
  cardsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginBottom: 16 },
  strategyCardItem: { flex: 1, borderRadius: 12, paddingVertical: 16, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center', minHeight: 110 },
  cardLabel: { color: COLORS.textDark, fontSize: 10, fontWeight: '600', marginBottom: 8 },
  cardPercent: { color: COLORS.textDark, fontSize: 22, fontWeight: '700', marginBottom: 4 },
  cardValue: { color: COLORS.textDark, fontSize: 10, opacity: 0.7 },
  footerText: { color: COLORS.textGrey, fontSize: 11, lineHeight: 16, textAlign: 'left', marginBottom: 0 },
  footerTextBold: { fontWeight: '700', color: '#AAA' },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 12, marginBottom: 0 },
  paginationDot: { width: 10, height: 10, borderRadius: 5 },
  paginationDotActive: { 
    backgroundColor: '#F3FD88',
    shadowColor: '#F3FD88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  paginationDotInactive: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#666' },

  // Menu styles
  menuOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 },
  sideMenu: { 
    position: 'absolute', 
    top: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 + 40 : 80, 
    right: 16, 
    backgroundColor: '#3A3F47', 
    borderRadius: 12, 
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 200,
    zIndex: 101, 
    shadowColor: "#000", 
    shadowOpacity: 0.5, 
    shadowRadius: 5, 
    elevation: 5 
  },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 12,
  },
  menuText: { 
    color: '#fff', 
    marginLeft: 12, 
    fontSize: 16,
    fontWeight: '400',
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#555',
    marginVertical: 4,
  },
});