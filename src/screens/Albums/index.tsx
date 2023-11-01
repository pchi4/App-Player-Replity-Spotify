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
  Flex,
} from "native-base";

import { useGetArtist } from "./hooks";
import { LinearGradient } from "expo-linear-gradient";
import { Loading } from "../../../components/Loading";
import { Feather } from "@expo/vector-icons";

type PropsAlbums = {
  route: object;
  navigation: object;
};

const { width, height } = Dimensions.get("screen");

export const Albums = ({ route, navigation }: PropsAlbums) => {
  const { album } = route.params;

  const {
    data: artists,
    isFetching,
    isLoading,
  } = useGetArtist({ id: album?.artists[0].id });

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (isFetching || isLoading) {
    return <Loading />;
  }

  const IconsPressed = ({ name, color }) => {
    return <Feather name={name} size={35 % 100} color={color} />;
  };

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
                  uri: artists?.images[0].url,
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
            <Box>
              <Text
                fontSize={["sm", "sm", "md"]}
                fontWeight="bold"
                paddingBottom="2"
                color="coolGray.300"
              >
                {album?.type[0].toUpperCase() +
                  album?.type.slice(1) +
                  " ° " +
                  new Date(album.release_date).getFullYear()}
              </Text>
            </Box>
            <Box>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                paddingY="4"
              >
                <Box flexDirection="row">
                  <Pressable marginRight="4">
                    <Feather name={"heart"} size={20 % 100} color="#FFFFFF" />
                  </Pressable>

                  <Pressable marginRight="4">
                    <Feather
                      name={"arrow-down-circle"}
                      size={20 % 100}
                      color="#FFFFFF"
                    />
                  </Pressable>
                  <Pressable marginRight="4">
                    <Feather
                      name={"more-vertical"}
                      size={20 % 100}
                      color="#FFFFFF"
                    />
                  </Pressable>
                </Box>

                <Box flexDirection="row">
                  <Pressable marginRight="4">
                    <Feather name="shuffle" size={35 % 100} color="#FFFFFF" />
                  </Pressable>
                  <Pressable>
                    <Feather name={"play"} size={35 % 100} color="#FFFFFF" />
                  </Pressable>
                </Box>
              </Flex>
            </Box>
            <FlatList
              data={album.tracks.items}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("home", {
                      screen: "playMusic",
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
