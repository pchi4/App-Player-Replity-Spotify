import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import { Home } from "../../src/screens/Home";

export default function HomeScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(145, 174, 198)",
        },
      }}
    >
      <Stack.Screen name="Bom" component={Home} />
    </Stack.Navigator>
  );
}
