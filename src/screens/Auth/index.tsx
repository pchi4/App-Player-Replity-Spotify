import { useColorModeValue, Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { TextEncoder, TextDecoder } from "text-encoding";
import * as Crypto from "expo-crypto";
import * as AppAuth from "expo-app-auth";
import Constants from "expo-constants";
import {
  ResponseType,
  useAuthRequest,
  makeRedirectUri,
} from "expo-auth-session";
import { Platform } from "react-native";
import * as Linking from "expo-linking";

export const Auth = ({ navigation }: object) => {
  const [clientId] = useState<string>("0e7989953adc4c5cba284909c50fe613");
  const [code, setCode] = useState<string | null>("");

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const config = {
    clientId,
    clientSecret: "bef869040446454d9ce21a75fb34c297",
    scopes: [
      "user-read-email",
      "user-library-read",
      "user-read-recently-played",
      "user-top-read",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-public",
    ],
    usePKCE: false,
    redirectUri: "exp://10.91.116.3:8082/--/spotify-auth-callback",
  };

  const [request, response, promptAsync] = useAuthRequest(config, discovery);

  console.log({ response });

  const requestAuthSpotify = async () => {
    await promptAsync();
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      navigation.navigate("home");
      console.log({ code });
    }
  }, [response]);

  return <Button onPress={requestAuthSpotify}>Conectar com o Spotify</Button>;
};
