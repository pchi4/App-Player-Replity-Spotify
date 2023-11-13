import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import HomeScreen from "./Stack/Home";
import PlaylistScreen from "./Stack/Playlist";
import AuthScreen from "./Stack/Auth";

const Tab = createBottomTabNavigator();

export default function TabsRoutes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            backgroundColor: "rgb(24, 26, 27)",
            borderTopWidth: 0,
            elevation: 0,
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
            tabBarButton: () => null,
          }}
        />

        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={({ route }) => ({
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={size} />
            ),
            tabBarStyle: ((route) => {
              console.log(route);
              const routeName = getFocusedRouteNameFromRoute(route) ?? null;
              if (routeName === "playMusic") {
                return { display: "none" };
              }
              return;
            })(route),
          })}
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
