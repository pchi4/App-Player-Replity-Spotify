import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import {
  HStack,
  Box,
  Divider,
  Center,
  Image,
  Text,
  VStack,
  Icon,
  Button,
  Spinner,
  Pressable,
  Heading,
  Avatar,
  Flex,
  Spacer,
} from "native-base";

import { useGetTracksPlaylist, useGetProfile } from "./hooks";
import { Loading } from "../../components/Loading";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

export const Playlist = ({ navigation, route }) => {
  const verifyLimitMax100 = (value: number): number => {
    if (value >= 100) {
      return 100;
    }
    return value;
  };

  const {
    data: tracksPlaylist,
    isLoading,
    isFetching,
  } = useGetTracksPlaylist({
    id: route.params.item.id,
    totalTracks: verifyLimitMax100(route.params.limit),
  });

  const {
    data: profile,
    isLoading: profileIsLoading,
    isFetching: profileIsFetching,
  } = useGetProfile({ id: route.params.item.owner.id });

  if (isLoading || isFetching || profileIsLoading || profileIsFetching) {
    return <Loading />;
  }

  const formatedParams = (params: object): object => {
    return {
      preview_url: params.track.preview_url,
      duration_ms: params.track.duration_ms,
      name: params.track.name,
      images: params.track.album.images,
      track_number: params.track.track_number,
      album: {
        name: params.track.album.name,
        type: params.track.album.type,
      },
      artists: params.track.album.artists,
    };
  };

  return (
    <ScrollView>
      <LinearGradient colors={["#a3a5a8", "#212224", "#212224"]}>
        <SafeAreaView>
          <Box style={{ paddingTop: StatusBar.currentHeight }} padding="4">
            <HStack
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name={"arrow-left"} size={30 % 100} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity>
                <Feather
                  name={"more-vertical"}
                  desce
                  lico
                  size={30 % 100}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </HStack>
          </Box>

          <Box paddingY="4">
            <Center>
              <Image
                alt="art work"
                width={width / 1.5}
                height={width / 1.5}
                rounded="md"
                source={{ uri: route.params.item?.images[0].url }}
              />
            </Center>
          </Box>
          <Box paddingX="4">
            <Text
              fontSize={["xl", "3xl", "4xl"]}
              fontWeight="bold"
              paddingBottom="2"
              color="white"
            >
              {route?.params.item.name}
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
                {route.params.item.owner.display_name}
              </Text>
            </HStack>
            <Box>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                paddingY="4"
              >
                <Box flexDirection="row">
                  <TouchableOpacity style={{ marginRight: 10 }}>
                    <Feather name={"heart"} size={26 % 100} color="#FFFFFF" />
                  </TouchableOpacity>

                  <TouchableOpacity style={{ marginRight: 10 }}>
                    <Feather
                      name={"arrow-down-circle"}
                      size={26 % 100}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginRight: 10 }}>
                    <Feather
                      name={"more-vertical"}
                      size={26 % 100}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </Box>

                <Box flexDirection="row">
                  <TouchableOpacity style={{ marginRight: 10 }}>
                    <Feather name="shuffle" size={38 % 100} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Feather name={"play"} size={38 % 100} color="#FFFFFF" />
                  </TouchableOpacity>
                </Box>
              </Flex>

              <FlatList
                data={tracksPlaylist?.items}
                keyExtractor={(item) => item?.track.id}
                renderItem={({ item, index }) => (
                  <Box
                    _dark={{
                      borderColor: "muted.50",
                    }}
                    borderColor="muted.800"
                    py="2"
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("home", {
                          screen: "playMusic",
                          params: {
                            item,
                            album: {
                              tracks: {
                                index,
                                items: tracksPlaylist.items.map((value) => {
                                  return formatedParams(value);
                                }),
                              },
                            },
                          },
                        })
                      }
                    >
                      <HStack space={[2, 3]} justifyContent="space-between">
                        <Image
                          alt="art work"
                          width={width / 9}
                          height={width / 9}
                          rounded="md"
                          source={{
                            uri: item.track.album.images[0].url,
                          }}
                        />
                        <VStack alignContent="start" alignItems="start">
                          <Text
                            _dark={{
                              color: "warmGray.50",
                            }}
                            color="white"
                            bold
                            fontSize="md"
                            isTruncated
                            maxWidth="sm"
                          >
                            {item.track.name}
                          </Text>
                          <Text
                            color="white"
                            _dark={{
                              color: "warmGray.200",
                            }}
                          >
                            {item.track.album.artists[0].name}
                          </Text>
                        </VStack>
                        <Spacer />
                        <TouchableOpacity>
                          <Text
                            fontSize="xs"
                            _dark={{
                              color: "warmGray.50",
                            }}
                            color="white"
                            alignSelf="flex-start"
                            alignItems="center"
                          >
                            <Feather
                              name={"more-vertical"}
                              size={26 % 100}
                              color="#FFFFFF"
                            />
                          </Text>
                        </TouchableOpacity>
                      </HStack>
                    </TouchableOpacity>
                  </Box>
                )}
              />
            </Box>
          </Box>
        </SafeAreaView>
      </LinearGradient>
    </ScrollView>
  );
};
