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

import { Audio } from "expo-av";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { Sound } from "expo-av/build/Audio";

export const Play = ({ navigation }) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [statusSound, setStatusSound] = useState<Sound | null>();
  const [progress, setProgress] = useState(null);
  const [progressR, setProgressR] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
      }

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
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
      const progress = status.positionMillis / status.durationMillis;
      console.log({ status });
      console.log({ progress });
      setCurrentTime(status.positionMillis);
      setTotalDuration(status.durationMillis);
    }
    if (status.didJustFinish === true) {
      setSound(null);
      playNextTrack();
    }
  };

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // const formatTime = (time: number): string => {
  //   const minutes = Math.floor(time / 60000);
  //   const seconds = Math.floor((time % 60000) / 1000);
  //   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  // };

  function formatTime(duration) {
    const Minutes = (duration / 60000).toFixed(2).replace(".", ":");
    return Minutes;
  }

  const handlePlay = async () => {
    const statusPlay = await sound?.playAsync();
    setStatusSound(statusPlay);
  };

  const handlePause = async () => {
    const statusPause = await sound?.pauseAsync();
    setStatusSound(statusPause);
  };

  // const handlePauseAudio = async () => {
  //   if (sound) {
  //     if (isPlaying) {
  //       const statusPause = await sound.pauseAsync();
  //       setStatusSound(statusPause);
  //     } else {
  //       await sound.playAsync();
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };

  // useEffect(() => {
  //   const progress = statusSound?.positionMillis / statusSound?.durationMillis;
  //   console.log({ progress });
  //   setProgress(progress);
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  // useEffect(() => {
  //   handlePlayAudio();
  //   console.log({ statusSound });
  // }, [sound]);

  return (
    <Center marginTop="1/6">
      <Text color="black" fontWeight="bold" fontSize="xl">
        {statusSound?.isPlaying}
      </Text>

      <Image
        borderRadius={10}
        source={{
          uri: "https://wallpaperaccess.com/full/317501.jpg",
        }}
        alt="ArtWork albuns"
        width="md"
        height="md"
      />

      <VStack space={1} alignItems="center" marginTop="3.5">
        <Text color="black" fontWeight="bold" fontSize="2xl">
          Into the Night
        </Text>

        <Text color="black" fontSize="xl">
          Aokiji Kizaru
        </Text>
      </VStack>

      <Slider
        style={{ width: "90%", height: 40 }}
        value={progress * 100}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
      />

      <HStack space="4/6" justifyContent="space-between" marginBottom="3.5">
        <Text color="black" fontWeight="bold" fontSize="xl">
          {formatTime(currentTime)}
        </Text>
        <Text color="black" fontWeight="bold" fontSize="xl">
          {formatTime(totalDuration)}
        </Text>
      </HStack>

      <HStack space={8} justifyContent="space-between">
        <Pressable>
          <Feather name="skip-back" size={60} color="black" />
        </Pressable>

        {isPlaying ? (
          <Pressable onPress={handlePlayPause}>
            <Feather name={"pause"} size={60} color="black" />
          </Pressable>
        ) : (
          <Pressable onPress={handlePlayAudio}>
            <Feather name={"play"} size={60} color="black" />
          </Pressable>
        )}

        <Pressable>
          <Feather name="skip-forward" size={60} color="black" />
        </Pressable>
      </HStack>
    </Center>
  );
};
