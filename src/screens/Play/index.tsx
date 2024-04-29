import {
  Center,
  Text,
  Box,
  Image,
  Heading,
  Button,
  HStack,
  VStack,
  Avatar,
  AspectRatio,
  Stack,
  Flex,
} from "native-base";
import {
  Pressable,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useStateValue } from "./../../context/State";
import { LinearGradient } from "expo-linear-gradient";

import Slider from "@react-native-community/slider";

import { Audio, AVPlaybackTolerance } from "expo-av";
import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Loading } from "../../components/Loading";
import { Feather } from "@expo/vector-icons";
import { Sound } from "expo-av/build/Audio";

import { useGetDetailsArtist } from "./hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLoadSound } from "../../hooks";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import TrackPlayer from "react-native-track-player";

// The player is ready to be used
const { width, height } = Dimensions.get("screen");

export const Play = ({ route, navigation }) => {
  const [currentStatus, setCurrentStatus] = useState(null);
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
  const [context, dispatch] = useStateValue().reducer;
  // const value = useRef(route.params.album.tracks.index);
  const numberTrackPlaylist = useRef(JSON.parse(route.params)?.tracks.index);

  // const handlePlayAudio = async () => {
  //   try {
  //     if (currentSound) {
  //       setCurrentSound(null);
  //       await currentSound.unloadAsync();
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

  //     setCurrentSound(sound);(
  //     setCurrentStatus(status);
  //     setIsPlaying(status.isLoaded);

  //     onPlaybackStatusUpdate(status);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (isRandom) {
      playRandomTrack();
      return;
    }

    setupPlayer();
    // console.log(statusSound);

    // LoadAudio();

    var getTrack = context.album.tracks.items[context.album.tracks.index];

    setCurrentTrack({
      name: getTrack?.name,
      numberTrack: getTrack?.track_number,
      uriTrack: getTrack?.preview_url,
      duration: getTrack?.duration_ms,
      artWork: getTrack?.images[0].url,
      nameArtist: getTrack?.artists[0].name,
    });
  }, [currentTrack.name]);

  const {
    data: detailsArtist,
    isLoading,
    isFetching,
  } = useGetDetailsArtist({
    id: context.album?.track.artists[0].id,
  });

  const { LoadAudio, currentSound, statusSound } = useLoadSound({
    uri: context.currentSound.uriTrack,
  });

  console.log(context.statusSound);

  const formatingFollowers = (follower: any) => {
    var followers = follower?.toFixed(3).split(".");
    followers[0] = followers[0]?.split(/(?=(?:...)*$)/).join(".");
    return followers.join(",");
  };

  // const onPlaybackStatusUpdate = async (status: object) => {
  //   setStatusSound(status);
  //   // console.log({ status });
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

  const playNextTrack = async () => {
    try {
      if (isRandom) {
        await playRandomTrack();
        return;
      }
      numberTrackPlaylist.current += 1;

      var getTrack = context.album.tracks.items[numberTrackPlaylist.current];
      console.log(getTrack);

      dispatch({
        type: "setCurrentSound",
        payload: {
          currentSound: {
            name: getTrack?.name,
            numberTrack: getTrack?.track_number,
            uriTrack: getTrack?.preview_url,
            duration: getTrack?.duration_ms,
            artWork: getTrack?.images[0].url,
            nameArtist: getTrack?.artists[0].name,
          },
        },
      });

      const currentStatus = await currentSound?.getStatusAsync();
      if (currentStatus?.isLoaded) {
        if (currentStatus?.isPlaying) {
          await currentSound?.stopAsync();
          // await currentSound?.unloadAsync();
          // await currentSound?.playAsync();
        }
      }
      LoadAudio();
    } catch (error) {}
  };

  const generationShuffleNumber = (array: Array<any>) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const PlayAudio = async () => {
    try {
      setIsPlaying(true);
      const currentStatus = await currentSound?.getStatusAsync();
      if (currentStatus?.isLoaded) {
        if (currentStatus?.isPlaying === false) {
          currentSound?.playAsync();
        }
      }
    } catch (error) {}
  };

  const PauseAudio = async () => {
    try {
      setIsPlaying(false);
      const currentStatus = await currentSound?.getStatusAsync();
      if (currentStatus?.isLoaded) {
        if (currentStatus?.isPlaying === true) {
          currentSound?.pauseAsync();
        }
      }
    } catch (error) {}
  };

  const playPeviousTrack = async () => {
    try {
      numberTrackPlaylist.current -= 1;

      let nextTrack = context.album.tracks.items[numberTrackPlaylist.current];

      dispatch({
        type: "setCurrentSound",
        payload: {
          currentSound: {
            name: nextTrack?.name,
            numberTrack: nextTrack?.track_number,
            uriTrack: nextTrack?.preview_url,
            duration: nextTrack?.duration_ms,
            artWork: nextTrack?.images[0].url,
            nameArtist: nextTrack?.artists[0].name,
          },
        },
      });

      const currentStatus = await currentSound?.getStatusAsync();
      if (currentStatus?.isLoaded) {
        if (currentStatus?.isPlaying) {
          await currentSound?.stopAsync();
          await currentSound?.unloadAsync();
        }
      }
    } catch (error) {}
  };

  const playRandomTrack = async () => {
    try {
      let max = route.params.album.tracks.items.length;
      setTotalTracks(max);

      let newArray = [];

      for (let i = 0; i <= max; i++) {
        newArray.push(i);
      }

      let total = generationShuffleNumber(newArray);

      console.log(total);

      total.shift();
      console.log(total);

      let nextTrack = route.params.album.tracks.items[total[0]];
      setRandomTrack(Number(total[0]));

      setCurrentTrack({
        name: nextTrack?.name,
        numberTrack: nextTrack?.track_number,
        uriTrack: nextTrack?.preview_url,
        duration: nextTrack?.duration_ms,
        artWork: nextTrack?.images[0].url,
        nameArtist: nextTrack?.artists[0].name,
        nameAlbum: nextTrack?.album.name,
      });
    } catch (error) {}
  };

  const onChangeSlider = async (time: number) => {
    await currentSound?.playFromPositionAsync(time * 1000);
    setIsPlaying(true);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const createRandomTracks = (): number => {
    return Math.floor(
      Math.random() * route.params.album.tracks.items.length + 1
    );
  };

  if (isLoading && isFetching) {
    return <Loading />;
  }

  return (
    <Box style={{ flex: 1 }}>
      <ScrollView>
        <LinearGradient
          style={{ height: "100%" }}
          colors={["#a3a5a8", "#212224", "#212224"]}
        >
          <SafeAreaView>
            <Box style={{ flex: 1 }} padding="4">
              <Center>
                <Flex
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather
                      name={"arrow-left"}
                      size={30 % 100}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>

                  <Box>
                    <Center>
                      <Text color="#FFFFFF" fontSize="xs">
                        TOCANDO DO ALBUM
                      </Text>

                      <Text
                        color="#FFFFFF"
                        fontWeight="bold"
                        fontSize={["xs", "xs", "md"]}
                        marginBottom={["8", "18", "24"]}
                        isTruncated
                        width="auto"
                      >
                        {context.album.tracks.items[0].album.name}
                      </Text>
                    </Center>
                  </Box>

                  <TouchableOpacity>
                    <Feather
                      name={"more-vertical"}
                      size={30 % 100}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </Flex>

                <Image
                  marginTop="10%"
                  borderRadius={10}
                  source={
                    {
                      uri: context.album?.tracks?.items[
                        context.album?.tracks.index
                      ].images[0].url,
                    } ??
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  }
                  alt="ArtWork albuns"
                  width={width / 1.2}
                  height={width / 1.2}
                />
              </Center>
            </Box>

            <Box
              style={{ flex: 1 }}
              marginTop={["0", "10%", "14%"]}
              paddingX="8"
            >
              <HStack
                space={1}
                justifyContent="space-between"
                marginTop={["18%", "20%", "24%"]}
                marginBottom={["4", "6", "8"]}
              >
                <Box>
                  <Text
                    color="#FFFFFF"
                    fontWeight="bold"
                    fontSize="lg"
                    isTruncated
                    maxW={270}
                  >
                    {context.currentSound?.name}
                  </Text>

                  <Text color="#FFFFFF" fontSize="md">
                    {context.currentSound?.nameArtist}
                  </Text>
                </Box>

                <Box alignItems="center" justifyContent="center">
                  {isFavorite ? (
                    <TouchableOpacity
                      onPress={() => setIsFavorite(!isFavorite)}
                    >
                      <Feather name={"heart"} size={35 % 100} color="green" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setIsFavorite(!isFavorite)}
                    >
                      <Feather name={"heart"} size={35 % 100} color="#FFFFFF" />
                    </TouchableOpacity>
                  )}
                </Box>
              </HStack>

              <Slider
                style={{ height: 40, width: "100%" }}
                value={context?.currentSound.duration / 1000}
                minimumValue={0}
                maximumValue={context?.currentSound.totalDuration / 1000}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#FFFFFF"
                onValueChange={(value) => onChangeSlider(value)}
              />

              <HStack
                space="4/6"
                justifyContent="space-between"
                marginBottom="5%"
              >
                <Text
                  color="#FFFFFF"
                  fontWeight="bold"
                  fontSize={["md", "md", "lg"]}
                >
                  {formatTime(context.currentSound.duration)}
                </Text>
                <Text
                  color="#FFFFFF"
                  fontWeight="bold"
                  fontSize={["md", "md", "lg"]}
                >
                  {formatTime(context.currentSound.totalDuration)}
                </Text>
              </HStack>

              <HStack
                space={8}
                justifyContent="space-evenly"
                alignContent="center"
                alignItems="center"
                marginTop={["0", "4", "6"]}
              >
                <Box
                  justifyContent="start"
                  alignItems="start"
                  alignContent="start"
                >
                  {isRandom ? (
                    <TouchableOpacity onPress={() => setIsRandom(!isRandom)}>
                      <Feather name="shuffle" size={20 % 100} color="green" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setIsRandom(!isRandom)}>
                      <Feather name="shuffle" size={20 % 100} color="#FFFFFF" />
                    </TouchableOpacity>
                  )}
                </Box>
                <TouchableOpacity onPress={playPeviousTrack}>
                  <Feather name="skip-back" size={40 % 100} color="#FFFFFF" />
                </TouchableOpacity>

                {context.currentSound.isPlaying ? (
                  <TouchableOpacity onPress={PauseAudio}>
                    <Feather name={"pause"} size={60 % 100} color="#FFFFFF" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={setupPlayer}>
                    <Feather name={"play"} size={60 % 100} color="#FFFFFF" />
                  </TouchableOpacity>
                )}

                <TouchableOpacity>
                  <Feather
                    onPress={playNextTrack}
                    name="skip-forward"
                    size={40 % 100}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
                {isReapeat ? (
                  <TouchableOpacity onPress={() => setIsRepeat(!isReapeat)}>
                    <Feather name="repeat" size={20 % 100} color="green" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setIsRepeat(!isReapeat)}>
                    <Feather name="repeat" size={20 % 100} color="#FFFFFF" />
                  </TouchableOpacity>
                )}
              </HStack>
            </Box>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("home", {
                  screen: "art",

                  params: detailsArtist,
                })
              }
            >
              <Box
                style={{ flex: 1 }}
                marginTop={["10%", "18%", "20%"]}
                paddingX="8"
                paddingBottom="4"
              >
                <Box>
                  <Box
                    rounded="lg"
                    overflow="hidden"
                    _dark={{
                      borderColor: "coolGray.600",
                      backgroundColor: "gray.700",
                    }}
                    _web={{
                      shadow: 2,
                      borderWidth: 0,
                    }}
                    _light={{
                      backgroundColor: "gray.50",
                    }}
                  >
                    <Box>
                      <AspectRatio w="100%" ratio={16 / 12}>
                        <Image
                          source={{
                            uri: detailsArtist?.images[0].url,
                          }}
                          alt="image"
                        />
                      </AspectRatio>
                      <Center
                        _text={{
                          color: "warmGray.50",
                          fontWeight: "700",
                          fontSize: "md",
                        }}
                        position="absolute"
                        top="0"
                        px="3"
                        py="1.5"
                      >
                        Sobre o artista
                      </Center>
                    </Box>
                    <Stack p="4" space={3} maxHeight="40%" bg="gray.600">
                      <Stack space={2}>
                        <Heading size="md" ml="-1" color="white">
                          {detailsArtist?.name}
                        </Heading>
                        <Text
                          fontSize="xs"
                          color="white"
                          fontWeight="200"
                          ml="-0.5"
                          mt="-1"
                        >
                          {formatingFollowers(detailsArtist?.followers.total) ??
                            0 + " seguidores"}
                        </Text>
                      </Stack>
                      <Text fontWeight="200" color="white">
                        Bengaluru (also called Bangalore) is the center of
                        India's high-tech industry. The city is also known for
                        its parks and nightlife.
                      </Text>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </TouchableOpacity>
          </SafeAreaView>
        </LinearGradient>
      </ScrollView>
    </Box>
  );
};
