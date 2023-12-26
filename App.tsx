import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "native-base";
import Routes from "./src/routes";
import * as Linking from "expo-linking";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const url = Linking.useURL();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <StatusBar barStyle={"light-content"} />
        <Routes />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
