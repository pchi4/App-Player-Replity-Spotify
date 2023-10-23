import React from "react";
import { SafeAreaView, SectionList } from "react-native";
import {
  View,
  Image,
  Center,
  Box,
  Text,
  Avatar,
  HStack,
  Heading,
  VStack,
  Spacer,
  FlatList,
  ScrollView,
  Pressable,
} from "native-base";

type PropsAlbums = {
  route: object;
  navigation: object;
};

export const Albums = ({ route, navigation }: PropsAlbums) => {
  const { album } = route.params;

  console.log(route);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Box paddingY="4">
          <Center>
            <Image
              alt="art work"
              width="250"
              height="250"
              rounded="md"
              source={{ uri: album?.images[0].url }}
            />
          </Center>
        </Box>
        <Box paddingX="4">
          <Text fontSize="3xl" fontWeight="bold" paddingBottom="2">
            {album?.name}
          </Text>

          <HStack justifyContent="start" paddingY="4">
            <Avatar
              bg="green.500"
              size="sm"
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            ></Avatar>
            <Text fontSize="lg" marginLeft="2" fontWeight="bold">
              {album?.artists[0].name}
            </Text>
          </HStack>
          <FlatList
            data={album.tracks.items}
            keyExtractor={({ item, idx }) => String(item.id)}
            renderItem={({ item }) => (
              <Pressable onPress={() => navigation.navigate("play", item)}>
                <Box
                  _dark={{
                    borderColor: "muted.50",
                  }}
                  borderColor="muted.800"
                  py="2"
                >
                  <HStack space={[2, 3]} justifyContent="space-between">
                    <VStack>
                      <Text
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                        fontSize="md"
                      >
                        {item.name}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                      >
                        {album?.artists[0].name}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Text
                      fontSize="xs"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      alignSelf="flex-start"
                    >
                      {formatTime(item.duration_ms)}
                    </Text>
                  </HStack>
                </Box>
              </Pressable>
            )}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
