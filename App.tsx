import "react-native-gesture-handler";
import * as React from "react";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "native-base";
import Routes from "./src/routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { StateProvider } from "./src/context/State";
import TrackPlayer, { Capability } from "react-native-track-player";

export default function App() {
  const queryClient = new QueryClient();
  // AppRegistry.registerComponent(...);

  async function setup() {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
  }

  React.useEffect(() => {
    setup();
  }, []);

  return (
    <StateProvider>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <StatusBar />
          <Routes />
        </NativeBaseProvider>
      </QueryClientProvider>
    </StateProvider>
  );
}
