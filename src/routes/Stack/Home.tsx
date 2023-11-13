import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const Stack = createStackNavigator();

import { Home } from "../../screens/Home";
import { Albums } from "../../screens/Albums";
import { Play } from "../../screens/Play";

export default function HomeScreen() {
  const [token, setToken] = useState(null);

  const isToken = async () => {
    const token = await AsyncStorage.getItem("token");
    setToken(token);
  };

  useEffect(() => {
    isToken();
  }, [token]);

  return (
    <Stack.Navigator
      initialRouteName={token ? "home" : "auth"}
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(145, 174, 198)",
        },
      }}
    >
      <Stack.Screen name="Seja bem-vindo(a)" component={Home} />
      <Stack.Screen name="albums" component={Albums} />
      <Stack.Screen
        name="playMusic"
        options={{
          headerShown: false,
        }}
        component={Play}
      />
    </Stack.Navigator>
  );
}
