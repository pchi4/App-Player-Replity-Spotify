import * as React from "react";
import * as Linking from "expo-linking";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import HomeScreen from "../Stack/HomeStack";
import PlayScreen from "../Stack/PlayStack";
import PlaylistScreen from "../Stack/PlaylistStack";
import AuthScreen from "../Stack/AuthStack";

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
          name="auth"
          component={AuthScreen}
          options={{
            tabBarStyle: { display: "none" },
          }}
        />

        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="play"
          component={PlayScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="music" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="playlist"
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
