import React from "react";
import { SafeAreaView, SectionList, Dimensions } from "react-native";
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
  Spinner,
} from "native-base";

import { useGetArtist } from "./hooks";
import { LinearGradient } from "expo-linear-gradient";

type PropsAlbums = {
  route: object;
  navigation: object;
};

const { width, height } = Dimensions.get("screen");

export const Albums = ({ route, navigation }: PropsAlbums) => {
  const { album } = route.params;

  const {
    data: profile,
    isFetching,
    isLoading,
  } = useGetArtist({ id: album?.artists[0].id });

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (isFetching || isLoading) {
    return (
      <Center marginTop="4/5">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <LinearGradient colors={["#304566", "#243653", "#16263e"]}>
          <Box paddingY="4">
            <Center>
              <Image
                alt="art work"
                width={width / 1.5}
                height={width / 1.5}
                rounded="md"
                source={{ uri: album?.images[0].url }}
              />
            </Center>
          </Box>
          <Box paddingX="4">
            <Text
              fontSize={["2xl", "3xl", "4xl"]}
              fontWeight="bold"
              paddingBottom="2"
              color="white"
            >
              {album?.name}
            </Text>

            <HStack justifyContent="start" paddingY="4">
              <Avatar
                bg="green.500"
                size="sm"
                source={{
                  uri: profile?.images[0].url,
                }}
              ></Avatar>
              <Text
                fontSize="lg"
                marginLeft="2"
                fontWeight="bold"
                color="white"
              >
                {album?.artists[0].name}
              </Text>
            </HStack>
            <FlatList
              data={album.tracks.items}
              keyExtractor={({ item, idx }) => String(idx)}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("playMusic", {
                      screen: "player",
                      params: { item, album },
                    })
                  }
                >
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
                          color="white"
                          bold
                          fontSize="md"
                        >
                          {item.name}
                        </Text>
                        <Text
                          color="white"
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
                        color="white"
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
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
