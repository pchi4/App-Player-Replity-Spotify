import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Avatar, HStack, Box, Text, Pressable, FlatList } from "native-base";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

import { Library } from "../../screens/Library";
import { Playlist } from "../../screens/Playlist";
import { AvatarProfile } from "../../components/AvatartProfile";

const HeaderPLaylistRigth = () => {
  return (
    <HStack justifyContent="space-between" marginRight="4" space="8">
      <Pressable>
        <Feather name={"search"} size={28 % 100} color="#FFFFFF" />
      </Pressable>
      <Pressable>
        <Feather name={"plus"} size={28 % 100} color="#FFFFFF" />
      </Pressable>
    </HStack>
  );
};

export default function PlaylistScreen() {
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
        component={Library}
        options={{
          headerTitleStyle: {
            color: "white",
          },
          headerLeft: () => <AvatarProfile title={"Sua Biblioteca"} />,
          headerRight: () => <HeaderPLaylistRigth />,
        }}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="playlistCard"
        component={Playlist}
      />
    </Stack.Navigator>
  );
}
