import { createStackNavigator } from "@react-navigation/stack";
import { Avatar, HStack, Box, Text, Pressable } from "native-base";
import { Feather } from "@expo/vector-icons";
import { useGetProfile } from "../../hooks/useGetProfiel";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

import { Playlist } from "../../src/screens/Playlist";
import { useEffect, useState } from "react";

const HeaderPlaylistLeft = ({ person }) => {
  console.log(person);
  // const a = JSON.parse(person);
  // console.log(a);
  return (
    <HStack justifyContent="space-between" paddingY="4">
      <Avatar
        marginLeft="4"
        bg="green.500"
        size="sm"
        source={{
          uri: person?.images[0].url,
        }}
      ></Avatar>
    </HStack>
  );
};

const HeaderPLaylistRigth = () => {
  return (
    <HStack justifyContent="space-between" marginRight="4" space="8">
      <Pressable>
        <Feather name={"search"} size={25 % 100} color="#FFFFFF" />
      </Pressable>
      <Pressable>
        <Feather name={"plus"} size={25 % 100} color="#FFFFFF" />
      </Pressable>
    </HStack>
  );
};

export default function PlaylistScreen() {
  const [personProfle, setPersonProfile] = useState();

  const getProfile = async () => {
    const profile = await AsyncStorage.getItem("profile");
    setPersonProfile(profile);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(145, 174, 198)",
        },
      }}
    >
      <Stack.Screen
        name="Sua biblioteca"
        component={Playlist}
        options={{
          headerLeft: () => <HeaderPlaylistLeft person={personProfle} />,
          headerRight: () => <HeaderPLaylistRigth />,
        }}
      />
    </Stack.Navigator>
  );
}
