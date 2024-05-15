import React, { useRef, useState } from "react";
import {
  Audio,
  AVPlaybackStatus,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";
import { useStateValue } from "../context/State";
import { Alert } from "react-native";

interface PropsSetup {
  uri: string;
  isRandom: boolean;
}

export const useSetupPlayer = ({ uri, isRandom }: PropsSetup) => {
  const [context, dispatch] = useStateValue().reducer;
  const [currentSound, setCurrentSound] = useState<
    Audio.Sound | null | undefined
  >();
  const [statusSound, setStatusSound] = useState<boolean>();
  const numberTrack = useRef(context.album.tracks.index);

  const LoadAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        playThroughEarpieceAndroid: false,
      });

      await currentSound?.unloadAsync();

      const { sound, status } = await Audio.Sound.createAsync(
        { uri },

        {
          shouldPlay: true,
          isLooping: false,
        },
        onPlaybackStatusUpdate
      );
      setCurrentSound(sound);
    } catch (error) {
      console.log(error);
    }
  };
  const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    // setStatusSound(playbackStatus);
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      if (playbackStatus.isPlaying) {
        dispatch({
          type: "setCurrentSound",
          payload: {
            currentSound: {
              ...context.currentSound,
              duration: playbackStatus.positionMillis,
              totalDuration: playbackStatus.durationMillis,
              isPlaying: playbackStatus.isPlaying,
            },
          },
        });
        dispatch({
          type: "setStatus",
          payload: {
            statusSound: {
              playbackStatus,
            },
          },
        });
        // Update your UI for the playing state
      } else {
        // Update your UI for the paused state
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        dispatch({
          type: "setCurrentSound",
          payload: {
            currentSound: {
              ...context.currentSound,
              duration: 0,
              totalDuration: playbackStatus.durationMillis,
            },
          },
        });
      }
    }
  };

  async function play() {
    try {
      const currentStatus = await currentSound?.getStatusAsync();
      console.log("passsei aqui");
      if (currentStatus?.isLoaded) {
        if (currentStatus?.isPlaying === false) {
          currentSound?.playAsync();
        }
      }
    } catch (error) {
      Alert.alert("deu ruim", error);
    }
  }

  async function pause() {
    try {
      const currentStatus = await currentSound?.getStatusAsync();
      if (currentStatus?.isLoaded) {
        if (currentStatus?.isPlaying) {
          currentSound?.pauseAsync();
        }
      }
    } catch (error) {
      Alert.alert("deu ruim", error);
    }
  }

  async function next() {
    try {
      // if (isRandom) {
      //   await playRandomTrack();
      //   return;
      // }

      numberTrack.current += 1;

      console.log(numberTrack);

      var getTrack = context.album.tracks.items[numberTrack.current];
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
          await currentSound?.unloadAsync();
          await currentSound?.loadAsync({ uri });
          await currentSound?.playAsync();
          // LoadAudio();
        }
      }
    } catch (error) {
      console.log("deu error ao usar play", error);
    }
  }
  async function previous() {
    try {
      numberTrack.current -= 1;

      let currentTrack = context.album.tracks.items[numberTrack];

      dispatch({
        type: "setCurrentSound",
        payload: {
          currentSound: {
            name: currentTrack?.name,
            numberTrack: currentTrack?.track_number,
            uriTrack: currentTrack?.preview_url,
            duration: currentTrack?.duration_ms,
            artWork: currentTrack?.images[0].url,
            nameArtist: currentTrack?.artists[0].name,
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
    } catch (error) {
      console.log("deu error ao usar o previous", error);
    }
  }

  // const playRandomTrack = async () => {
  //   try {
  //     let max = route.params.album.tracks.items.length;
  //     setTotalTracks(max);

  //     let newArray = [];

  //     for (let i = 0; i <= max; i++) {
  //       newArray.push(i);
  //     }

  //     let total = generationShuffleNumber(newArray);

  //     console.log(total);

  //     total.shift();
  //     console.log(total);

  //     let nextTrack = route.params.album.tracks.items[total[0]];
  //     setRandomTrack(Number(total[0]));

  //     setCurrentTrack({
  //       name: nextTrack?.name,
  //       numberTrack: nextTrack?.track_number,
  //       uriTrack: nextTrack?.preview_url,
  //       duration: nextTrack?.duration_ms,
  //       artWork: nextTrack?.images[0].url,
  //       nameArtist: nextTrack?.artists[0].name,
  //       nameAlbum: nextTrack?.album.name,
  //     });
  //   } catch (error) {}
  // };

  return {
    LoadAudio,
    currentSound,
    statusSound,
    play,
    pause,
    next,
    previous,
  };
};
