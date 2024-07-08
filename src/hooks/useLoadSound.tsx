import React, { useCallback, useEffect, useRef, useState } from "react";
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
  let numberTrack = useRef<number | null>(context.album.tracks.index).current;
  const [sound, setSound] = useState<Audio.Sound>();
  const [status, setStatus] = useState<AVPlaybackStatus>();
  const [currentSound, setCurrentSound] = useState<Audio.Sound>();
  let soundRef = useRef().current;

  const DEFAULT_PLAYBACK_STATUS = {
    progressUpdateIntervalMillis: 500,
    positionMillis: 0,
    shouldPlay: true,
    rate: 1.0,
    shouldCorrectPitch: false,
    volume: 1.0,
    isMuted: false,
    isLooping: false,
  };

  async function resquestPermissions() {
    try {
      return await Audio.requestPermissionsAsync();
    } catch (error) {
      console.log(error);
    }
  }

  async function LoadAudio() {
    try {
      if (!uri) return;
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        playThroughEarpieceAndroid: false,
      });

      const { sound: playbackObject, status } = await Audio.Sound.createAsync(
        { uri },
        DEFAULT_PLAYBACK_STATUS
      );

      setCurrentSound(playbackObject);
      soundRef = playbackObject;

      console.log({ currentSound, soundRef });

      // setStatus(status);
      playbackObject.setOnAudioSampleReceived;

      playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    } catch (error) {
      Alert.alert("Error ao roda o load", error);
    }
  }

  useCallback(() => {
    // console.log({ currentSound });
    setSound(currentSound);
  }, [LoadAudio]);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          // setIsPlaying(false);
          sound.unloadAsync();
          // setSound(null);
        }
      : undefined;
  }, [sound, uri]);

  const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    dispatch({
      type: "setStatus",
      payload: {
        statusSound: {
          playbackStatus,
        },
      },
    });
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
        // dispatch({
        //   type: "setCurrentSound",
        //   payload: {
        //     currentSound: {
        //       ...context.currentSound,
        //       duration: playbackStatus.positionMillis,
        //       totalDuration: playbackStatus.durationMillis,
        //       isPlaying: playbackStatus.isPlaying,
        //     },
        //   },
        // });
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
      console.log({ sound, soundRef, currentSound });
      await sound?.playAsync();
      if (context?.statusSound?.playbackStatus.isLoaded) {
        if (context?.statusSound?.playbackStatus.isPlaying === false) {
          // LoadAudio();
          // await sound?.setStatusAsync({ shouldPlay: true });
        }
      }
    } catch (error) {
      Alert.alert("Não é possivel dar play", error);
      console.log(error);
    }
  }

  async function pause() {
    try {
      await sound?.pauseAsync();
      await sound?.setStatusAsync({ shouldPlay: false });

      if (context.statusSound?.playbackStatus.isLoaded) {
        if (context.statusSound?.playbackStatus.isPlaying === true) {
          // await sound.stopAsync();
          // await sound.unloadAsync();
        }
      }
    } catch (error) {
      console.info(error);
      Alert.alert("Não é possivel dar pause", error);
    }
  }

  async function next() {
    try {
      // if (isRandom) {
      //   await playRandomTrack();
      //   return;
      // }

      numberTrack += 1;

      var getTrack = context.album.tracks.items[numberTrack];
      // (getTrack);

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
      "deu error ao usar play", error;
    }
  }
  async function previous() {
    try {
      numberTrack -= 1;

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
      "deu error ao usar o previous", error;
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
    // statusSound,
    play,
    pause,
    next,
    previous,
    resquestPermissions,
  };
};
