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
import { Pressable, Dimensions } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Slider from "@react-native-community/slider";

import { Audio, AVPlaybackTolerance } from "expo-av";
import { useState, useEffect, useRef } from "react";
import { Feather } from "@expo/vector-icons";
import { Sound } from "expo-av/build/Audio";

const { width, height } = Dimensions.get("screen");

export const Play = ({ route, navigation }) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [statusSound, setStatusSound] = useState<Sound | null>();
  // const [currentTrack, setCurrentTrack] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [numberTrack, setNumberTrack] = useState();
  const value = useRef(route.params.item.track_number);

  const [currentTrack, setCurrentTrack] = useState({
    name: null,
    duration: null,
    numberTrack: null,
    uriTrack: null,
    artWork: null,
  });

  const handlePlayAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: true,
      });

      const { sound, status } = await Audio.Sound.createAsync(
        { uri: currentTrack.uriTrack },

        {
          shouldPlay: true,
          isLooping: false,
        },
        onPlaybackStatusUpdate
      );

      setIsPlaying(status.isLoaded);
      setSound(sound);
      sound.onPlaybackStatusUpdate(status);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    setCurrentTrack({
      name: route.params.item.name,
      numberTrack: route.params.item.track_number,
      uriTrack: route.params.item.preview_url,
      duration: route.params.item.duration_ms,
      artWork: route.params.album.images[0].url,
    });
  }, []);

  const playNextTrack = async () => {
    if (value.current < route.params.album.tracks.items.length) {
      const nextTrack = route.params.album.tracks.items[value.current];
      value.current += 1;
      setCurrentTrack({
        name: nextTrack.name,
        numberTrack: nextTrack.track_number,
        uriTrack: nextTrack.preview_url,
        duration: nextTrack.duration_ms,
        artWork: route.params.album.images[0].url,
      });

      if (sound) {
        await sound.stopAsync();
        /* await handlePlayPause(); */
        await sound.playAsync();
      }
      console.log(nextTrack);
      // setCurrentTrack(nextTrack);
      console.log(currentTrack);
    }
    // extractColors();
    // await play(nextTrack);
    else {
      console.log("end of playlist");
      return;
    }
    // console.log(route.params.album.tracks);
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
    if (!sound) {
      handlePlayAudio();
    } else if (isPlaying) {
      await sound?.pauseAsync();
    } else {
      await sound?.playFromPositionAsync(currentTime);
    }
    setIsPlaying(!isPlaying);
  };

  const onChangeSlider = async (time: number) => {
    await sound?.playFromPositionAsync(time * 1000);
    setIsPlaying(true);
  };

  // useEffect(()=>{
  //   handlePlayPause()
  // },[])

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Box style={{ flex: 1 }}>
      <LinearGradient
        style={{ height: "100%" }}
        colors={["#4c669f", "#3b5998", "#192f6a"]}
      >
        <Box style={{ flex: 1 }} marginTop="10%" padding="4">
          <Center>
            <HStack
              width="90%"
              justifyContent="space-between"
              alignItems="center"
            >
              <Pressable onPress={() => navigation.goBack()}>
                <Feather name={"arrow-left"} size={25 % 100} color="#FFFFFF" />
              </Pressable>

              <Box>
                <Center>
                  <Text color="#FFFFFF" fontSize="sm">
                    {`TOCANDO DO ${route.params.album.type.toUpperCase()}`}
                  </Text>

                  <Text
                    color="#FFFFFF"
                    fontWeight="bold"
                    fontSize={["sm", "md", "md"]}
                    marginBottom={["8", "18", "24"]}
                  >
                    {route.params.album.name}
                  </Text>
                </Center>
              </Box>

              <Pressable>
                <Feather
                  name={"more-vertical"}
                  size={20 % 100}
                  color="#FFFFFF"
                />
              </Pressable>
            </HStack>

            <Image
              marginTop="10%"
              borderRadius={10}
              source={
                { uri: currentTrack.artWork } ??
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              }
              alt="ArtWork albuns"
              width={width / 1.2}
              height={width / 1.2}
            />
          </Center>
        </Box>

        <Box style={{ flex: 1 }} marginTop={["20%", "26%", "30%"]} paddingX="8">
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
                {route.params.item.artists[0].name}
              </Text>
            </Box>

            <Pressable>
              <Feather name={"heart"} size={35 % 100} color="#FFFFFF" />
            </Pressable>
          </HStack>

          <Slider
            style={{ height: 40 }}
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
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            marginTop={["0", "4", "6"]}
          >
            <Pressable>
              <Feather name="skip-back" size={35 % 100} color="#FFFFFF" />
            </Pressable>

            {isPlaying ? (
              <Pressable onPress={handlePlayPause}>
                <Feather name={"pause"} size={50 % 100} color="#FFFFFF" />
              </Pressable>
            ) : (
              <Pressable onPress={handlePlayPause}>
                <Feather name={"play"} size={50 % 100} color="#FFFFFF" />
              </Pressable>
            )}

            <Pressable>
              <Feather
                onPress={playNextTrack}
                name="skip-forward"
                size={35 % 100}
                color="#FFFFFF"
              />
            </Pressable>
          </HStack>
        </Box>
      </LinearGradient>
    </Box>
  );
};
