import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

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
          tabBarIconStyle: {
            color: "rgb(145, 174, 198)",
          },
          tabBarStyle: {
            backgroundColor: "rgb(145, 174, 198)",
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Play" component={PlayScreen} />
        <Tab.Screen name="Playlist" component={PlaylistScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
