import "react-native-gesture-handler";
import * as React from "react";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "native-base";
import Routes from "./src/routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { StateProvider } from "./src/context/State";
import { Controller } from "./src/components/Controller";
import { useStateValue } from "./src/context/State";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVerifyToken, useVerifyAlbum, useRefreshToken } from "./src/hooks/";

export default function App() {
  const queryClient = new QueryClient();
  const { token } = useVerifyToken();
  const { album } = useVerifyAlbum();

  return (
    <StateProvider>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <StatusBar barStyle={"transparent"} />
          <Routes />
          {token && <Controller />}
        </NativeBaseProvider>
      </QueryClientProvider>
    </StateProvider>
  );
}
