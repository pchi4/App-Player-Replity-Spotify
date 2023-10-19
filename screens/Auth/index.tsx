import { useColorModeValue, Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { TextEncoder, TextDecoder } from "text-encoding";
import * as Crypto from "expo-crypto";
import * as AppAuth from "expo-app-auth";
import Constants from "expo-constants";

import { Platform } from "react-native";
import * as Linking from "expo-linking";

import { useGetToken } from "../../hooks/useGetToken";

export const Auth = ({ navigation }: object) => {
  const { promptAsync } = useGetToken();

  const requestAuthSpotify = async () => {
    await promptAsync();
  };

  return <Button onPress={requestAuthSpotify}>Conectar com o Spotify</Button>;
};
