import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text } from "native-base";

const Stack = createStackNavigator();

import { Home } from "../../screens/Home";
import { Albums } from "../../screens/Albums";
import { Play } from "../../screens/Play";
import { Playlist } from "../../screens/Playlist";

export default function HomeScreen() {
  const [token, setToken] = useState(null);

  const isToken = async () => {
    const token = await AsyncStorage.getItem("token");
    setToken(token);
  };

  useEffect(() => {
    isToken();
  }, [token]);

  const Title = () => {
    return (
      <Text fontSize="md" fontWeight="bold" color="white" marginLeft="2">
        Seja bem-vindo(a)
      </Text>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName={token ? "home" : "auth"}
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(24, 26, 27)",
        },
      }}
    >
      <Stack.Screen
        name=" "
        component={Home}
        options={{
          headerTitleStyle: {
            color: "white",
          },
          headerLeft: () => <Title />,
        }}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="albums"
        component={Albums}
      />
      <Stack.Screen
        name="playMusic"
        options={{
          headerShown: false,
        }}
        component={Play}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="playlists"
        component={Playlist}
      />
    </Stack.Navigator>
  );
}
