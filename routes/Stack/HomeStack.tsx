import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import { Home } from "../../src/screens/Home";
import { Albums } from "../../src/screens/Albums";

export default function HomeScreen() {
  return (
    <Stack.Navigator
      initialRouteName="auth"
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(145, 174, 198)",
        },
      }}
    >
      <Stack.Screen name="Bom" component={Home} />
      <Stack.Screen name="albums" component={Albums} />
    </Stack.Navigator>
  );
}
