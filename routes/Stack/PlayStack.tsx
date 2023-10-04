import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import { Play } from "../../screens/Play";

export default function HomeScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(145, 174, 198)",
        },
      }}
    >
      <Stack.Screen name="Voltar" component={Play} />
    </Stack.Navigator>
  );
}
