import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import { Play } from "../../screens/Play";

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
      <Stack.Screen name="Voltar" component={Play} />
    </Stack.Navigator>
  );
}
