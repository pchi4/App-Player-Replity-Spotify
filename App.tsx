import "react-native-gesture-handler";
import { NativeBaseProvider, StorageManager, ColorMode } from "native-base";
import { extendTheme } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Routes from "./routes";

export default function App() {
  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem("color-mode");
        return val === "dark" ? "dark" : "light";
      } catch (e) {
        return "light";
      }
    },
    set: async (value: ColorMode) => {
      try {
        await AsyncStorage.setItem("color-mode", value);
      } catch (e) {
        console.log(e);
      }
    },
  };

  return (
    <NativeBaseProvider colorModeManager={colorModeManager}>
      <Routes />
    </NativeBaseProvider>
  );
}
