import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  SectionList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  View,
  LogBox,
} from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import {
  Image,
  Center,
  Box,
  Text,
  Avatar,
  HStack,
  Heading,
  VStack,
  Spacer,
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
import { useStateValue } from "../../context/State";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio, AVPlaybackTolerance } from "expo-av";

type PropsAlbums = {
  route: object;
  navigation: object;
};

const { width, height } = Dimensions.get("screen");

export const Albums = ({ route, navigation }: PropsAlbums) => {
  const [currentSound, setCurrentSound] = useState<
    Audio.Sound | null | undefined
  >();
  const [currentStatus, setCurrentStatus] = useState(null);
  const [statusSound, setStatusSound] = useState<Sound | null>();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReapeat, setIsRepeat] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [randomTrack, setRandomTrack] = useState<number>(0);
  const [totalTracks, setTotalTracks] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState({
    name: null,
    duration: null,
    numberTrack: null,
    uriTrack: null,
    artWork: null,
    nameArtist: null,
  });
  const sound = useRef(new Audio.Sound());

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

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

  const [context, dispatch] = useStateValue().reducer;

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // useEffect(() => {
  //   return currentSound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         currentSound.unloadAsync();
  //       }
  //     : undefined;
  // }, [currentSound]);

  // const handlePlayAudio = async () => {
  //   try {
  //     const currentStatus = await currentSound?.getStatusAsync();

  //     if (currentStatus?.isLoading) {
  //       console.log("passei aqui");
  //       setCurrentSound(null);
  //       await currentSound?.unloadAsync();
  //     }

  //     // await Audio.setAudioModeAsync({
  //     //   playsInSilentModeIOS: true,
  //     //   staysActiveInBackground: true,
  //     // });

  //     const { sound, status } = await Audio.Sound.createAsync(
  //       {
  //         uri: currentTrack?.uriTrack,
  //       },

  //       {
  //         shouldPlay: true,
  //         isLooping: false,
  //       },
  //       onPlaybackStatusUpdate
  //     );

  //     setCurrentSound(sound);
  //     setCurrentStatus(status);
  //     setIsPlaying(status.isLoaded);

  //     onPlaybackStatusUpdate(status);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const onPlaybackStatusUpdate = async (status: object) => {
  //   console.log(status);
  //   if (status.isLoaded && status.isPlaying) {
  //     setCurrentTime(status.positionMillis);
  //     setTotalDuration(status.durationMillis);
  //     dispatch({
  //       type: "setStatus",
  //       payload: {
  //         statusSound: status,
  //       },
  //     });
  //   }
  //   if (isReapeat) {
  //     if (status.didJustFinish) {
  //       setCurrentSound(null);
  //       await handlePlayAudio();
  //     }
  //     return;
  //     // await currentSound?.replayAsync();
  //   }

  //   if (isRandom) {
  //     let randomTracks = createRandomTracks();
  //     // console.log(randomTracks);
  //     return;
  //   }
  //   if (status.didJustFinish) {
  //     setCurrentSound(null);

  //     setCurrentTime(0);
  //     setIsPlaying(false);
  //     /*       playNextTrack(); */
  //   }
  // };

  const handleDispatchs = (index: number, item: object) => {
    dispatch({
      type: "setAlbum",
      payload: {
        album: {
          tracks: {
            index,
            items: route.params.album.tracks.items.map((value) => {
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
            }),
          },
          track: item,
        },
      },
    });
    dispatch({
      type: "isNotMusic",
      payload: {
        isNotMusic: false,
      },
    });

    console.log(item);

    setCurrentTrack({
      name: item?.name,
      numberTrack: item?.track_number,
      uriTrack: item?.preview_url,
      duration: item?.duration_ms,
      artWork: null,
      nameArtist: item?.artists[0].name,
    });

    LoadAudio();
    // await sound.current.playAsync();
  };

  const UpdateStatus = async (data) => {
    try {
      console.log(data);
      if (data.didJustFinish) {
        ResetPlayer();
      } else if (data.positionMillis) {
        if (data.durationMillis) {
          // SetValue((data.positionMillis / data.durationMillis) * 100);
        }
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const ResetPlayer = async () => {
    try {
      const checkLoading = await sound.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        // SetValue(0);
        setIsPlaying(false);
        await sound.current.setPositionAsync(0);
        await sound.current.stopAsync();
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      setIsPlaying(false);
    }
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
          setIsPlaying(false);
        }
      }
    } catch (error) {
      setIsPlaying(true);
    }
  };

  const SeekUpdate = async (data) => {
    try {
      const checkLoading = await sound.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        const result = (data / 100) * Duration;
        await sound.current.setPositionAsync(Math.round(result));
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const LoadAudio = async () => {
    // setLoading(true);
    const checkLoading = await sound.current.getStatusAsync();

    try {
      if (checkLoading.isPlaying) {
        await sound.current.stopAsync();
        await sound.current.unloadAsync();
      }

      await sound.current.unloadAsync();

      const result = await sound.current.loadAsync(
        { uri: currentTrack?.uriTrack },
        { shouldPlay: true, isLooping: false }
      );
      if (result.isLoaded === false) {
        // setLoading(false);
        // setLoaded(false);
        console.log("Error in Loading Audio");
      } else {
        sound.current.setOnPlaybackStatusUpdate(UpdateStatus);
        // setLoading(false);
        // setLoaded(true);
        // SetDuration(result.durationMillis);
      }
    } catch (error) {
      // setLoading(false);
      // setLoaded(false);
    }
  };

  if (
    isFetching ||
    isLoading ||
    isReleatedArtistLoading ||
    isReleatedFetching
  ) {
    return <Loading />;
  }

  return (
    <Box>
      <LinearGradient colors={["#a3a5a8", "#212224", "#212224"]}>
        <ScrollView>
          <SafeAreaView>
            <Box style={{ paddingTop: StatusBar.currentHeight }}>
              <HStack
                width="100%"
                justifyContent="space-between"
                alignItems="center"
                paddingX="4"
              >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Feather
                    name={"arrow-left"}
                    size={30 % 100}
                    color="#FFFFFF"
                  />
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
                    uri: artists?.images[0].url,
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
                keyExtractor={(item) => String(item.id)}
                nestedScrollEnabled={true}
                renderItem={({ item, index }) => (
                  <Box
                    _dark={{
                      borderColor: "muted.50",
                    }}
                    borderColor="muted.800"
                    py="2"
                  >
                    <TouchableOpacity
                      onPress={() => handleDispatchs(index, item)}
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
                            maxWidth={[280, 300]}
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
                    uri: artists?.images[0].url,
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
                keyExtractor={(item) => String(item.id)}
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
                      navigation.navigate("home", {
                        screen: "art",
                        params: item,
                      })
                    }
                  />
                )}
              />

              <Box paddingTop="4">
                {route.params.album?.copyrights.map(
                  (
                    value: {
                      text:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined;
                    },
                    idx: React.Key | null | undefined
                  ) => (
                    <Text
                      fontSize="md"
                      fontWeight="bold"
                      key={idx}
                      color="white"
                    >
                      {value.text}
                    </Text>
                  )
                )}
              </Box>
            </Box>
          </SafeAreaView>
        </ScrollView>
      </LinearGradient>
    </Box>
  );
};
