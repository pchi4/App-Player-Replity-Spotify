import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Avatar, HStack, Box, Text, Pressable, FlatList } from "native-base";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

import { Library } from "../../screens/Library";
import { Playlist } from "../../screens/Playlist";
import { useEffect, useState } from "react";

const HeaderPlaylistLeft = ({ person }) => {
  const [profileObject, setProfileObject] = useState();

  const verifyObject = () => {
    if (person) {
      const profileFormatter = JSON.parse(person);
      setProfileObject(profileFormatter);
      console.log(profileObject);
    }
  };

  useEffect(() => {
    verifyObject();
  }, []);

  return (
    <HStack justifyContent="space-between" paddingY="4">
      <Avatar
        marginLeft="4"
        bg="green.500"
        size="sm"
        source={{
          uri: profileObject?.images[0].url,
        }}
      ></Avatar>
    </HStack>
  );
};

const Tags = ({ item }) => {
  return (
    <TouchableOpacity>
      <Box rounded="xl">
        <Text color="white">{item.title}</Text>
      </Box>
    </TouchableOpacity>
  );
};

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

const CarouselOptions = () => {
  const a = [
    { title: "Playlist", id: 0 },
    { title: "Albuns", id: 1 },
  ];
  return (
    <FlatList
      data={a}
      keyExtractor={(item) => String(item?.id)}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({ item }) => <Tags item={item} />}
    />
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
          backgroundColor: "rgb(24, 26, 27)",
        },
      }}
    >
      <Stack.Screen
        name="Sua Biblioteca"
        component={Library}
        options={{
          headerTitleStyle: {
            color: "white",
          },
          headerLeft: () => <HeaderPlaylistLeft person={personProfle} />,
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
