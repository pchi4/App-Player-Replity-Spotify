import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import { Play } from "../../src/screens/Play";

export default function HomeScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "rgb(111 109 213)",
        },
      }}
    >
      <Stack.Screen name="playMusic" component={Play} />
    </Stack.Navigator>
  );
}
