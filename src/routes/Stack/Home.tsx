import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import { Home } from "../../screens/Home";
import { Albums } from "../../screens/Albums";
import { Play } from "../../screens/Play";
import { Playlist } from "../../screens/Playlist";
import { Artist } from "../../screens/Artist";
import { Controller } from "../../components/Controller";
import { AvatarProfile } from "../../components/AvatartProfile";

export default function HomeScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(24, 26, 27)",
        },
      }}
    >
      <Stack.Screen
        name=" "
        options={{
          headerTitleStyle: {
            color: "white",
          },
          headerLeft: () => <AvatarProfile title={"Bem vindo(a)"} />,
        }}
      >
        {(props) => (
          <>
            <Home {...props} />
            <Controller />
          </>
        )}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="albums"
      >
        {(props) => (
          <>
            <Albums {...props} />
            <Controller />
          </>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="playMusic"
        options={{
          headerShown: false,
        }}
      >
        {(props) => <Play {...props} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="playlists"
      >
        {(props) => (
          <>
            <Playlist {...props} />
            <Controller />
          </>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="art"
        options={{
          headerTitleStyle: {
            color: "white",
          },
          headerTitle: "Sobre o artista",
        }}
      >
        {(props) => (
          <>
            <Artist {...props} />
            <Controller />
          </>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
