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
} from "native-base";
import { Pressable, Dimensions, TouchableOpacity } from "react-native";

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

const { width, height } = Dimensions.get("screen");

export const Play = ({ route, navigation }) => {
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>();
  const [currentStatus, setCurrentStatus] = useState(null);
  const [statusSound, setStatusSound] = useState<Sound | null>();
  // const [currentTrack, setCurrentTrack] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [numberTrack, setNumberTrack] = useState(null);
  const value = useRef(route.params.item.track_number);
  const numberTrackPlaylist = useRef(route.params.album.tracks.index);

  const [currentTrack, setCurrentTrack] = useState({
    name: null,
    duration: null,
    numberTrack: null,
    uriTrack: "",
    artWork: null,
    artists: null,
    album: null,
  });

  // console.log(route.params.album.tracks.items);
  // console.log(route.params.item);

  const { randomTrack } = usePlayRandom({
    item: route.params.item,
    album: route.params.album,
  });

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
      // console.log(error);
    }
  };

  useEffect(() => {
    if (value.current === 1) {
      verifyIsFirstTrack();
      return;
    }

    const nextTrack =
      route.params.album.tracks.items[
        value.current ?? numberTrackPlaylist.current
      ];

    console.log(nextTrack);
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

    console.log(nextTrack);

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
      value.current ||
      numberTrackPlaylist.current > route.params.album.tracks.items.length
    )
      return;
    if (value.current) {
      value.current += 1;
    } else {
      numberTrackPlaylist.current += 1;
    }
    // if (numberTrackPlaylist.current)

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
      setSound(null);
      const timeFinish = formatTime(0);

      setCurrentTime(timeFinish);
      setIsPlaying(false);
      /*       playNextTrack(); */
    }
  };

  const handlePlayPause = async () => {
    if (!currentSound) {
      handlePlayAudio();
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

  const randomTrackPlay = () => {};

  return (
    <Box style={{ flex: 1 }}>
      <LinearGradient
        style={{ height: "100%" }}
        colors={["#4c669f", "#3b5998", "#192f6a"]}
      >
        <Box style={{ flex: 1 }} marginTop="10%" padding="4">
          <Center>
            <HStack
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name={"arrow-left"} size={30 % 100} color="#FFFFFF" />
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
            </HStack>

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

        <Box style={{ flex: 1 }} marginTop={["20%", "24%", "26%"]} paddingX="8">
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

          <HStack space="4/6" justifyContent="space-between" marginBottom="5%">
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
            <Box justifyContent="start" alignItems="start" alignContent="start">
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
      </LinearGradient>
    </Box>
  );
};
