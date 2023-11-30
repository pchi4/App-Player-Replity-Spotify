import React from "react";
import {
  SafeAreaView,
  SectionList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
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
  Select,
} from "native-base";
import { format } from "date-fns";
import { eoLocale } from "date-fns/locale/eo";

import { useGetArtist, useGetSeveralArtist } from "./hooks";
import { LinearGradient } from "expo-linear-gradient";
import { Loading } from "../../components/Loading";
import { Feather } from "@expo/vector-icons";
import { CardArtist } from "../../components/Cards/Artist";

type PropsAlbums = {
  route: object;
  navigation: object;
};

const { width, height } = Dimensions.get("screen");

export const Albums = ({ route, navigation }: PropsAlbums) => {
  console.log(route.params);

  const {
    data: artists,
    isFetching,
    isLoading,
  } = useGetArtist({ id: route.params.album?.artists[0].id });

  const {
    data: releatedArtist,
    isLoading: isReleatedArtistLoading,
    isFetching: isReleatedFetching,
  } = useGetSeveralArtist({ id: route.params.album?.artists[0].id });

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

  const randomTrackPlay = () => {
    navigation.navigate("home", {
      screen: "playMusic",
      params: { album },
    });
  };

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
    <SafeAreaView>
      <ScrollView>
        <LinearGradient colors={["#a3a5a8", "#212224", "#212224"]}>
          <Box style={{ paddingTop: StatusBar.currentHeight }}>
            <HStack
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              paddingX="4"
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
            <Center>
              <Image
                alt="art work"
                width={width / 1.5}
                height={width / 1.5}
                rounded="md"
                source={{ uri: route.params.album?.images[0].url }}
              />
            </Center>
          </Box>
          <Box paddingX="4">
            <Text
              fontSize={["xl", "2xl", "3xl"]}
              fontWeight="bold"
              paddingY="2"
              color="white"
            >
              {route.params.album?.name}
            </Text>

            <HStack justifyContent="start" paddingY="4">
              <Avatar
                bg="green.500"
                size="sm"
                source={{
                  uri: route.params.artists?.images[0].url,
                }}
              ></Avatar>
              <Text
                fontSize="lg"
                marginLeft="2"
                fontWeight="bold"
                color="white"
              >
                {route.params.album?.artists[0].name}
              </Text>
            </HStack>
            <Box>
              <Text
                fontSize={["sm", "sm", "md"]}
                fontWeight="bold"
                paddingBottom="2"
                color="coolGray.300"
              >
                {route.params.album?.type[0].toUpperCase() +
                  route.params.album?.type.slice(1) +
                  " ° " +
                  new Date(route.params.album?.release_date).getFullYear()}
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
            </Box>
            <FlatList
              data={route.params.album.tracks.items}
              keyExtractor={(item) => item?.id}
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
                              items: route.params.album.tracks.items.map(
                                (value) => {
                                  return {
                                    preview_url: value.preview_url,
                                    duration_ms: value.duration_ms,
                                    name: value.name,
                                    images: route.params.album.images,
                                    track_number: value.track_number,
                                    album: {
                                      name: route.params.album.name,
                                      type: route.params.album.type,
                                    },
                                    artists: route.params.album.artists,
                                  };
                                }
                              ),
                            },
                          },
                        },
                      })
                    }
                  >
                    <HStack space={[2, 3]} justifyContent="space-between">
                      <VStack>
                        <Text
                          _dark={{
                            color: "warmGray.50",
                          }}
                          color="white"
                          bold
                          isTruncated
                          maxWidth="sm"
                          fontSize="md"
                        >
                          {item.name}
                        </Text>
                        <Text
                          fontSize="xs"
                          color="white"
                          _dark={{
                            color: "warmGray.200",
                          }}
                        >
                          {route.params.album?.artists[0].name}
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
                  </TouchableOpacity>
                </Box>
              )}
            />
          </Box>

          <Box padding="4">
            <Text color="white" fontSize="md" fontWeight="bold">
              {format(
                new Date(route.params.album.release_date),
                "do 'de' MMMM yyyy",
                {
                  locale: eoLocale,
                }
              )}
            </Text>
            <Text color="white" fontSize="md" fontWeight="bold">
              {route.params.album.total_tracks + " músicas"}
            </Text>
          </Box>

          <Box paddingX="4">
            <HStack justifyContent="start" paddingY="4">
              <Avatar
                bg="green.500"
                size="sm"
                source={{
                  uri: route.params.artists?.images[0].url,
                }}
              ></Avatar>
              <Text
                fontSize="lg"
                marginLeft="2"
                fontWeight="bold"
                color="white"
              >
                {route.params.album?.artists[0].name}
              </Text>
            </HStack>
          </Box>

          <Box padding="4">
            <Text fontSize="lg" fontWeight="bold" color="white">
              Mais que talvez você goste
            </Text>

            <FlatList
              style={{ paddingTop: StatusBar.currentHeight }}
              data={releatedArtist?.artists}
              keyExtractor={(item) => String(item?.id)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item }) => (
                <CardArtist
                  width={180}
                  height={180}
                  items={item}
                  navigation={navigation}
                  handleClick={() =>
                    navigation.navigate("playlists", {
                      item,
                    })
                  }
                />
              )}
            />

            <Box paddingTop="4">
              {route.params.album?.copyrights.map((value) => (
                <Text fontSize="md" fontWeight="bold" color="white">
                  {value.text}
                </Text>
              ))}
            </Box>
          </Box>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
