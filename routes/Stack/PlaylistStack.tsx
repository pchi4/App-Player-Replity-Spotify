import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import { Playlist } from "../../src/screens/Playlist";

export default function HomeScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(145, 174, 198)",
        },
      }}
    >
      <Stack.Screen name="Escute aqu" component={Playlist} />
    </Stack.Navigator>
  );
}
