import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import HomeScreen from "../Stack/HomeStack";
import PlayScreen from "../Stack/PlayStack";
import PlaylistScreen from "../Stack/PlaylistStack";

const Tab = createBottomTabNavigator();

export default function TabsRoutes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            backgroundColor: "rgb(24, 26, 27)",
          },
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "rgb(111 109 213)",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Music Player"
          component={PlayScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="music" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Library"
          component={PlaylistScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="disc" color={color} size={size} />
            ),
            tabBarBadge: 3,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
