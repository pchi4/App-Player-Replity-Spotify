import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import { Play } from "../../screens/Play";

export default function PlayScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "rgb(111 109 213)",
        },
      }}
    >
      <Stack.Screen name="player" component={Play} />
    </Stack.Navigator>
  );
}
