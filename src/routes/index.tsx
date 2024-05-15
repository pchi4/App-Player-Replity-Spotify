import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useVerifyToken } from "../hooks/useVerifyToken";

import HomeScreen from "./Stack/Home";
import Library from "./Stack/Library";
import AuthScreen from "./Stack/Auth";

const Tab = createBottomTabNavigator();

export default function TabsRoutes() {
  const { token } = useVerifyToken();

  console.log(token);

  const liking = {
    prefixes: ["exp://192.168.101.7:8081/--/myapp"],
    config: {
      screens: {
        home: {
          path: "home",
        },
      },
    },
  };

  return (
    <NavigationContainer linking={liking}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            backgroundColor: "rgb(24, 26, 27)",
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "rgb(111 109 213)",
        }}
      >
        {token ? (
          <>
            <Tab.Screen
              name="home"
              component={HomeScreen}
              options={({ route }) => ({
                title: "Inicio",
                tabBarIcon: ({ color, size }) => (
                  <Feather name="home" color={color} size={size} />
                ),
                tabBarVisible: true,

                tabBarStyle: ((route) => {
                  const routeName = getFocusedRouteNameFromRoute(route) ?? null;
                  if (routeName === "playMusic") {
                    return { display: "none" };
                  }
                  return {
                    backgroundColor: "rgb(24, 26, 27)",
                    borderTopWidth: 0,
                    elevation: 0,
                  };
                })(route),
              })}
            />
            <Tab.Screen
              name="library"
              component={Library}
              options={({ route }) => ({
                title: "Biblioteca",
                tabBarIcon: ({ color, size }) => (
                  <Feather name="disc" color={color} size={size} />
                ),
              })}
            />
          </>
        ) : (
          <Tab.Screen
            name="auth"
            component={AuthScreen}
            options={{
              tabBarStyle: { display: "none" },
              tabBarButton: () => null,
            }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
