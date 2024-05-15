import "react-native-gesture-handler";
import * as React from "react";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "native-base";
import Routes from "./src/routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { StateProvider } from "./src/context/State";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <StateProvider>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <StatusBar barStyle="light-content" />
          <Routes />
        </NativeBaseProvider>
      </QueryClientProvider>
    </StateProvider>
  );
}
