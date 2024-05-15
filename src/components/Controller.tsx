import { Text, Box, HStack, Image, VStack, Progress } from "native-base";
import { Dimensions, TouchableOpacity, Platform } from "react-native";
import { useStateValue } from "../context/State";
import { Feather } from "@expo/vector-icons";
import * as Device from "expo-device";
import { useVerifyAlbum, useSetupPlayer } from "../hooks";
import { useNavigation } from "@react-navigation/native";

import * as React from "react";
const { width, height } = Dimensions.get("screen");

export const Controller = () => {
  var deviceModel = Device.deviceName;
  const [context, dispatch] = useStateValue().reducer;
  const [navigator, _] = useStateValue().navigator;
  const { album } = useVerifyAlbum();
  const { LoadAudio, currentSound } = useSetupPlayer({
    uri: context.currentSound.uriTrack,
    numberTrack: 0,
    isRandom: false,
  });
  const PlayAudio = async () => {
    try {
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
      const currentStatus = await currentSound?.getStatusAsync();
      if (currentStatus?.isLoaded) {
        if (currentStatus?.isPlaying) {
          currentSound?.pauseAsync();
        }
      }
    } catch (error) {}
  };

  return (
    <>
      {context.album?.tracks?.items && (
        <TouchableOpacity
          onPress={() =>
            navigator.navigate("home", {
              screen: "playMusic",
              params: album,
            })
          }
        >
          <Box
            width="96%"
            bg="#5C5E60"
            padding="2"
            marginX={2}
            fontSize="md"
            fontWeight="bold"
            rounded="md"
            bottom={Platform.OS === "android" ? height / 50 : height / 46}
            position="absolute"
          >
            <HStack justifyContent="space-between">
              <Box>
                <HStack justifyContent="start">
                  <Image
                    borderRadius={6}
                    width={width / 9}
                    height={width / 9}
                    source={{
                      uri: context.album.tracks?.items
                        ? context.album?.tracks?.items[
                            context.album?.tracks.index
                          ].images[2].url
                        : "https://i.scdn.co/image/ab67616d0000b2731dc7483a9fcfce54822a2f19",
                    }}
                    fallbackSource={{
                      uri: "https://i.scdn.co/image/ab67616d0000b2731dc7483a9fcfce54822a2f19",
                    }}
                    alt="album art work"
                  />
                  <VStack>
                    <Text
                      pl={2}
                      color="white"
                      fontWeight="bold"
                      fontSize="xs"
                      isTruncated
                      maxWidth={200}
                    >
                      {context.album?.track.name +
                        " - " +
                        context.album?.track.artists[0].name}
                    </Text>

                    <HStack pl="2" alignItems="center">
                      <Feather name="speaker" size={20 % 100} color="white" />
                      <Text
                        color="white"
                        pl={1}
                        fontWeight="bold"
                        fontSize="md"
                      >
                        {deviceModel}
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              </Box>
              <Box>
                <HStack
                  alignItems="center"
                  space={2}
                  alignContent="center"
                  pt={3}
                >
                  <Feather name="speaker" size={24 % 100} color="#FFFFFF" />
                  <Feather name="plus-circle" size={24 % 100} color="#FFFFFF" />
                  {context.currentSound.isPlaying ? (
                    <TouchableOpacity onPress={PauseAudio}>
                      <Feather name="pause" size={24 % 100} color="#FFFFFF" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={PlayAudio}>
                      <Feather name="play" size={24 % 100} color="#FFFFFF" />
                    </TouchableOpacity>
                  )}
                </HStack>
              </Box>
            </HStack>
            <Progress
              mt={2}
              width="100%"
              // mx={context.currentSound.totalDuration / 1000}
              value={
                Math.floor(
                  (context?.statusSound?.playbackStatus?.positionMillis /
                    context?.statusSound?.playbackStatus?.durationMillis) *
                    100
                ) ?? 0
              }
              colorScheme="emerald"
              size="xs"
            />
          </Box>
        </TouchableOpacity>
      )}
    </>
  );
};
