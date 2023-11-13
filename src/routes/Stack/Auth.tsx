import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import { Auth } from "../../screens/Auth";

export default function NotFoundScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(145, 174, 198)",
        },
      }}
    >
      <Stack.Screen
        name="Biblioteca"
        component={Auth}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
