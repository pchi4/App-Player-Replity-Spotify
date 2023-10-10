import "react-native-gesture-handler";
import { NativeBaseProvider, StorageManager, ColorMode } from "native-base";
import { StatusBar } from "native-base";
import Routes from "./routes";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar barStyle={"light-content"} />
      <Routes />
    </NativeBaseProvider>
  );
}
