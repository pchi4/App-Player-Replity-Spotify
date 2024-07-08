import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
} from "react-native-track-player";

export const DefaultRepeatMode = RepeatMode.Queue;
export const DefaultAudioServiceBehaviour =
  AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification;

export async function setup() {
  TrackPlayer.updateOptions({
    android: {
      // This is the default behavior
      appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
    },
    // Media controls capabilities
    // capabilities: [
    //   Capability.Play,
    //   Capability.Pause,
    //   Capability.SkipToNext,
    //   Capability.SkipToPrevious,
    //   Capability.Stop,
    // ],

    // // Capabilities that will show up when the notification is in the compact form on Android
    // compactCapabilities: [Capability.Play, Capability.Pause],

    // // Icons for the notification on Android (if you don't like the default ones)
    // playIcon: require('./play-icon.png'),
    // pauseIcon: require('./pause-icon.png'),
    // stopIcon: require('./stop-icon.png'),
    // previousIcon: require('./previous-icon.png'),
    // nextIcon: require('./next-icon.png'),
    // icon: require('./notification-icon.png')
  });
}

// const setupPlayer = async (
//   options: Parameters<typeof TrackPlayer.setupPlayer>[0]
// ) => {
//   const setup = async () => {
//     try {
//       await TrackPlayer.setupPlayer(options);
//     } catch (error) {
//       return (error as Error & { code?: string }).code;
//     }
//   };
//   while ((await setup()) === 'android_cannot_setup_player_in_background') {
//     // A timeout will mostly only execute when the app is in the foreground,
//     // and even if we were in the background still, it will reject the promise
//     // and we'll try again:
//     await new Promise<void>((resolve) => setTimeout(resolve, 1));
//   }
// };

// export const SetupService = async () => {
//   await setupPlayer({
//     autoHandleInterruptions: true,
//   });
//   await TrackPlayer.updateOptions({
//     android: {
//       appKilledPlaybackBehavior: DefaultAudioServiceBehaviour,
//     },
//     // This flag is now deprecated. Please use the above to define playback mode.
//     // stoppingAppPausesPlayback: true,
//     capabilities: [
//       Capability.Play,
//       Capability.Pause,
//       Capability.SkipToNext,
//       Capability.SkipToPrevious,
//       Capability.SeekTo,
//     ],
//     compactCapabilities: [
//       Capability.Play,
//       Capability.Pause,
//       Capability.SkipToNext,
//     ],
//     progressUpdateEventInterval: 2,
//   });
//   await TrackPlayer.setRepeatMode(DefaultRepeatMode);
// };
