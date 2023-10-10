import {
  Center,
  Text,
  Box,
  Image,
  Heading,
  Button,
  HStack,
  VStack,
} from "native-base";
import { Pressable } from "react-native";

import Slider from "@react-native-community/slider";

import { Audio, AVPlaybackTolerance } from "expo-av";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Sound } from "expo-av/build/Audio";

export const Play = ({ navigation }) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [statusSound, setStatusSound] = useState<Sound | null>();
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: true,
      });

      const { sound, status } = await Audio.Sound.createAsync(
        require("../../assets/songs/into-the-night-20928.mp3"),

        {
          shouldPlay: true,
        },
        onPlaybackStatusUpdate
      );

      onPlaybackStatusUpdate(status);

      setSound(sound);

      setIsPlaying(status.isLoaded);
    } catch (error) {
      console.log(error);
    }
  };

  const onPlaybackStatusUpdate = async (status) => {
    setStatusSound(status);
    if (status.isLoaded && status.isPlaying) {
      setCurrentTime(status.positionMillis);
      setTotalDuration(status.durationMillis);
    }
    if (status.didJustFinish === true) {
      setSound(null);
      const timeFinish = formatTime(0);
      console.log(timeFinish);
      setCurrentTime(timeFinish);
      setIsPlaying(false);
      /*       playNextTrack(); */
    }
  };

  const handlePlayPause = async () => {
    if (!sound) {
      handlePlayAudio();
    }

    if (isPlaying) {
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

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Box bg="rgb(24, 26, 27)" h="100%">
      <Center marginTop="5%">
        <VStack space={1} alignItems="center" marginY="2%">
          <Text color="#FFFFFF" fontWeight="bold" fontSize="lg">
            Tocando do album
          </Text>

          <Text color="#FFFFFF" fontSize="lg">
            Bloom
          </Text>
        </VStack>

        <Image
          borderRadius={10}
          source={require("../../assets/artsworks/Troye_Sivan_-_Bloom.png")}
          alt="ArtWork albuns"
          width="80%"
          height="50%"
        />

        <VStack space={1} alignItems="center" marginTop="3.5">
          <Text color="#FFFFFF" fontWeight="bold" fontSize="2xl">
            Into the Night
          </Text>

          <Text color="#FFFFFF" fontSize="xl">
            Troye Sivan
          </Text>
        </VStack>

        <Slider
          style={{ width: "90%", height: 40 }}
          value={currentTime / 1000}
          maximumValue={totalDuration / 1000}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#FFFFFF"
          onValueChange={(value) => onChangeSlider(value)}
        />

        <HStack space="4/6" justifyContent="space-between" marginBottom="5%">
          <Text color="#FFFFFF" fontWeight="bold" fontSize="xl">
            {formatTime(currentTime)}
          </Text>
          <Text color="#FFFFFF" fontWeight="bold" fontSize="xl">
            {formatTime(totalDuration)}
          </Text>
        </HStack>

        <HStack space={8} justifyContent="space-between">
          <Pressable>
            <Feather name="skip-back" size={50 % 100} color="#FFFFFF" />
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
            <Feather name="skip-forward" size={50 % 100} color="#FFFFFF" />
          </Pressable>
        </HStack>
      </Center>
    </Box>
  );
};
