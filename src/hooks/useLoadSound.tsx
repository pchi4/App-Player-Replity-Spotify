import React, { useState } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";
import { useStateValue } from "../context/State";

interface StatusI {
  uri: string;
}

export const useLoadSound = ({ uri }: StatusI) => {
  const [context, dispatch] = useStateValue().reducer;
  const [currentSound, setCurrentSound] = useState<
    Audio.Sound | null | undefined
  >();
  const [statusSound, setStatusSound] = useState<boolean>();

  const LoadAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: true,
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

      // console.log(status);

      setCurrentSound(sound);
    } catch (error) {
      console.log(error);
    }
  };
  const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    // setStatusSound(playbackStatus);
    console.log(playbackStatus);
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
  return {
    LoadAudio,
    currentSound,
    statusSound,
  };
};
