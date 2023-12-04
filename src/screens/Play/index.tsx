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
import { Feather } from "@expo/vector-icons";
import { Sound } from "expo-av/build/Audio";
import { usePlayRandom } from "./hooks/usePlayRandom";
import { useGetDetailsArtist } from "./hooks";

const { width, height } = Dimensions.get("screen");

export const Play = ({ route, navigation }) => {
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>();
  const [currentStatus, setCurrentStatus] = useState(null);
  const [statusSound, setStatusSound] = useState<Sound | null>();
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [numberTrack, setNumberTrack] = useState(null);
  const value = useRef(route.params.album.tracks.index);
  const numberTrackPlaylist = useRef(route.params.album.tracks.index);

  const { data: detailsArtist, isLoading } = useGetDetailsArtist({
    id: route.params.album.tracks.items[0].artists[0].id,
  });

  const [currentTrack, setCurrentTrack] = useState({
    name: null,
    duration: null,
    numberTrack: null,
    uriTrack: "",
    artWork: null,
    artists: null,
    album: null,
  });

  const { randomTrack } = usePlayRandom({
    item: route.params.item,
    album: route.params.album,
  });

  useEffect(() => {
    console.log(detailsArtist);
  }, [detailsArtist]);

  const handlePlayAudio = async () => {
    try {
      if (currentSound) {
        await currentSound.unloadAsync();
      }

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: true,
      });

      const { sound, status } = await Audio.Sound.createAsync(
        { uri: currentTrack?.uriTrack },

        {
          shouldPlay: true,
          isLooping: false,
        },
        onPlaybackStatusUpdate
      );

      setCurrentStatus(status);
      setIsPlaying(status.isLoaded);

      setCurrentSound(sound);
      sound.onPlaybackStatusUpdate(status);
    } catch (error) {
      console.log(error);
    }
  };

  const formatingFollowers = (num) => {
    var units = ["M", "B", "T", "Q"];
    var unit = Math.floor((num / 1.0e1).toFixed(0).toString().length);
    var r = unit % 3;
    var x = Math.abs(Number(num)) / Number("1.0e+" + (unit - r)).toFixed(2);
    return x.toFixed(2) + " " + units[Math.floor(unit / 3) - 2];
  };

  useEffect(() => {
    const nextTrack =
      route.params.album.tracks.items[
        value.current ?? numberTrackPlaylist.current
      ];

    console.log(route.params.album.tracks.items[0].artists);
    setCurrentTrack({
      name: nextTrack.name,
      numberTrack: nextTrack.track_number,
      uriTrack: nextTrack.preview_url,
      duration: nextTrack.duration_ms,
      artWork: nextTrack.images[0].url,
      nameArtist: nextTrack.artists[0].name,
      nameAlbum: nextTrack.album.name,
    });

    handlePlayAudio();
  }, [value.current ?? numberTrackPlaylist.current]);

  const verifyIsFirstTrack = async () => {
    const nextTrack =
      route.params.album.tracks.items[
        value.current - 1 ?? numberTrackPlaylist.current - 1
      ];

    setCurrentTrack({
      name: nextTrack.name,
      numberTrack: nextTrack.track_number,
      uriTrack: nextTrack.preview_url,
      duration: nextTrack.duration_ms,
      artWork: nextTrack.images[0].url,
      nameArtist: nextTrack.artists[0].name,
      nameAlbum: nextTrack.album.name,
    });

    await handlePlayAudio();
  };

  const playNextTrack = async () => {
    if (
      value.current > route.params.album.tracks.items.length ||
      numberTrackPlaylist.current > route.params.album.tracks.items.length
    )
      return;

    if (value.current) {
      value.current += 1;
    } else {
      numberTrackPlaylist.current += 1;
    }

    const nextTrack =
      route.params.album.tracks.items[
        value.current ?? numberTrackPlaylist.current
      ];

    setCurrentTrack({
      name: nextTrack.name,
      numberTrack: nextTrack.track_number,
      uriTrack: nextTrack.preview_url,
      duration: nextTrack.duration_ms,
      artWork: nextTrack.images[0].url,
      nameArtist: nextTrack.artists[0].name,
      nameAlbum: nextTrack.album.name,
    });
  };

  const playPeviousTrack = async () => {
    if (value.current <= 0) return;
    if (value.current) {
      value.current += 1;
    } else {
      numberTrackPlaylist.current += 1;
    }

    const nextTrack =
      route.params.album.tracks.items[
        value.current ?? numberTrackPlaylist.current
      ];

    setCurrentTrack({
      name: nextTrack.name,
      numberTrack: nextTrack.track_number,
      uriTrack: nextTrack.preview_url,
      duration: nextTrack.duration_ms,
      artWork: nextTrack.images[0].url,
      nameArtist: nextTrack.artists[0].name,
      nameAlbum: nextTrack.album.name,
    });
  };

  const onPlaybackStatusUpdate = async (status: object) => {
    setStatusSound(status);
    if (status.isLoaded && status.isPlaying) {
      setCurrentTime(status.positionMillis);
      setTotalDuration(status.durationMillis);
    }
    if (status.didJustFinish === true) {
      setCurrentSound(null);
      const timeFinish = formatTime(0);
      console.log(timeFinish);

      setCurrentTime(0);
      setIsPlaying(false);
      /*       playNextTrack(); */
    }
  };

  const handlePlayPause = async () => {
    if (!currentSound) {
      await handlePlayAudio();
    }

    if (isPlaying) {
      await currentSound?.pauseAsync();
    } else {
      await currentSound?.playFromPositionAsync(currentTime);
    }
    setIsPlaying(!isPlaying);
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

  return (
    <Box style={{ flex: 1 }}>
      <ScrollView>
        <LinearGradient
          style={{ height: "100%" }}
          colors={["#4c669f", "#3b5998", "#192f6a"]}
        >
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
                      {`TOCANDO DO ALBUM`}
                    </Text>

                    <Text
                      color="#FFFFFF"
                      fontWeight="bold"
                      fontSize={["xs", "xs", "md"]}
                      marginBottom={["8", "18", "24"]}
                      isTruncated
                      width="auto"
                    >
                      {currentTrack?.nameAlbum}
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
                  { uri: currentTrack?.artWork } ??
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
            marginTop={["10%", "10%", "14%"]}
            paddingX="8"
          >
            <HStack
              space={1}
              justifyContent="space-between"
              marginTop={["18%", "20%", "24%"]}
              marginBottom={["4", "6", "8"]}
            >
              <Box>
                <Text color="#FFFFFF" fontWeight="bold" fontSize="lg">
                  {currentTrack?.name}
                </Text>

                <Text color="#FFFFFF" fontSize="md">
                  {currentTrack?.nameArtist}
                </Text>
              </Box>

              <Box alignItems="center" justifyContent="center">
                <TouchableOpacity>
                  <Feather name={"heart"} size={35 % 100} color="#FFFFFF" />
                </TouchableOpacity>
              </Box>
            </HStack>

            <Slider
              style={{ height: 40, width: "100%" }}
              value={currentTime / 1000}
              maximumValue={totalDuration / 1000}
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
                {formatTime(currentTime)}
              </Text>
              <Text
                color="#FFFFFF"
                fontWeight="bold"
                fontSize={["md", "md", "lg"]}
              >
                {formatTime(totalDuration)}
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
                <TouchableOpacity>
                  <Feather name="shuffle" size={20 % 100} color="#FFFFFF" />
                </TouchableOpacity>
              </Box>
              <TouchableOpacity>
                <Feather
                  name="skip-back"
                  size={40 % 100}
                  color="#FFFFFF"
                  onPress={playPeviousTrack}
                />
              </TouchableOpacity>

              {isPlaying ? (
                <TouchableOpacity onPress={handlePlayPause}>
                  <Feather name={"pause"} size={60 % 100} color="#FFFFFF" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handlePlayPause}>
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
              <TouchableOpacity>
                <Feather name="repeat" size={20 % 100} color="#FFFFFF" />
              </TouchableOpacity>
            </HStack>
          </Box>

          <Box
            style={{ flex: 1 }}
            marginTop={["14%", "18%", "20%"]}
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
                  <AspectRatio w="100%" ratio={16 / 9}>
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
                <Stack p="4" space={3} bg="gray.600">
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
                      {formatingFollowers(detailsArtist?.followers.total) +
                        " seguidores"}
                    </Text>
                  </Stack>
                  <Text fontWeight="200" color="white">
                    Bengaluru (also called Bangalore) is the center of India's
                    high-tech industry. The city is also known for its parks and
                    nightlife.
                  </Text>
                </Stack>
              </Box>
            </Box>
          </Box>
        </LinearGradient>
      </ScrollView>
    </Box>
  );
};
