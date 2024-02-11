import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponseType,
  useAuthRequest,
  makeRedirectUri,
} from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStateValue } from "../context/State";
import apiInstance from "../services/api";
import { CLIENT_SECRET, CLIENT_ID } from "@env";

export const useGetToken = () => {
  const [context, dispatch] = useStateValue().reducer;

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const config = {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    scopes: [
      "user-read-email",
      "user-library-read",
      "user-read-recently-played",
      "user-read-playback-state",
      "user-top-read",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-public",
    ],
    usePKCE: false,
    redirectUri: "exp://127.0.0.1:8081/--/spotify-auth-callback",
  };

  function generateCodeVerifier(length: number): string {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  const [request, response, promptAsync] = useAuthRequest(config, discovery);

  const accessToken = async () => {
    try {
      const resultPromptAsync = await promptAsync();
      await AsyncStorage.clear();

      let codeVerifer = generateCodeVerifier(128);

      const data = {
        grant_type: "authorization_code",
        code: resultPromptAsync.params.code,
        redirect_uri: "exp://127.0.0.1:8081/--/spotify-auth-callback",
        client_id: CLIENT_ID,
        code_verifier: codeVerifer,
        client_secret: CLIENT_SECRET,
      };

      const result = await apiInstance(
        "https://accounts.spotify.com/api/token",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: new URLSearchParams(data).toString(),
        }
      );

      if (result.data && result.data.access_token) {
        await AsyncStorage.setItem("token", result.data.access_token);
        await AsyncStorage.setItem("refreshToken", result.data.refresh_token);
        dispatch({
          type: "setUser",
          payload: {
            user: {
              ...context.user,
              token: result.data.access_token,
            },
          },
        });
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return {
    accessToken,
  };
};
