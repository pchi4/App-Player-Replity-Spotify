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
import { useSetupPlayer } from "../../hooks";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import TrackPlayer from "react-native-track-player";
import { Artist } from "../../components/Artist";

// The player is ready to be used
const { width, height } = Dimensions.get("screen");

export const Play = ({ route, navigation }) => {
  const [isReapeat, setIsRepeat] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isRandom, setIsRandom] = useState<boolean>(false);
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

  const { LoadAudio, currentSound, statusSound, play, pause, previous, next } =
    useSetupPlayer({
      uri: context.currentSound.uriTrack,
      isRandom,
    });

  const formatingFollowers = (follower: any) => {
    var followers = follower?.toFixed(3).split(".");
    followers[0] = followers[0]?.split(/(?=(?:...)*$)/).join(".");
    return followers.join(",");
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

  const onChangeSlider = async (time: number) => {
    await currentSound?.playFromPositionAsync(time * 1000);
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

  // console.log(context.statusSound);

  // if (isLoading && isFetching) {
  //   return <Loading />;
  // }

  const formatedValueSlider = (value: number): number => {
    if (!value) return 0;
    return value / 1000;
  };

  const verifyNumberMaxSlider = (value: number): number => {
    if (!value) return 0;
    return value / 1000;
  };

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
                value={formatedValueSlider(
                  context?.statusSound?.playbackStatus?.positionMillis
                )}
                maximumValue={verifyNumberMaxSlider(
                  context?.statusSound?.playbackStatus?.durationMillis
                )}
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
                  {formatTime(context.currentSound.duration ?? 0)}
                </Text>
                <Text
                  color="#FFFFFF"
                  fontWeight="bold"
                  fontSize={["md", "md", "lg"]}
                >
                  {formatTime(context.currentSound.totalDuration ?? 0)}
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
                <TouchableOpacity onPress={previous}>
                  <Feather name="skip-back" size={40 % 100} color="#FFFFFF" />
                </TouchableOpacity>

                {context.statusSound?.playbackStatus?.isPlaying ? (
                  <TouchableOpacity onPress={pause}>
                    <Feather name={"pause"} size={60 % 100} color="#FFFFFF" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={play}>
                    <Feather name={"play"} size={60 % 100} color="#FFFFFF" />
                  </TouchableOpacity>
                )}

                <TouchableOpacity>
                  <Feather
                    onPress={next}
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
              <Artist />
            </TouchableOpacity>
          </SafeAreaView>
        </LinearGradient>
      </ScrollView>
    </Box>
  );
};
