import { AppRegistry } from "react-native";
import { registerRootComponent } from "expo";
import TrackPlayer from "react-native-track-player";
import { PlaybackService } from "./src/services/PlaybackService";

import App from "./App";
// AppRegistry.registerComponent("example", () => App);
registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => PlaybackService);
