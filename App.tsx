import "react-native-gesture-handler";
import { NativeBaseProvider, StorageManager, ColorMode } from "native-base";
import { StatusBar } from "native-base";
import Routes from "./routes";
import * as Linking from "expo-linking";

export default function App() {
  const url = Linking.useURL();

  console.log(url);
  return (
    <NativeBaseProvider>
      <StatusBar barStyle={"light-content"} />
      <Routes />
    </NativeBaseProvider>
  );
}
