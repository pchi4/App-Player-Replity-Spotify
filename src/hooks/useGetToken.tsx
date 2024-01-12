import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponseType,
  useAuthRequest,
  makeRedirectUri,
} from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useGetToken = () => {
  const [clientId] = useState<string>("0e7989953adc4c5cba284909c50fe613");
  const [token, setToken] = useState<string>();

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const config = {
    clientId,
    clientSecret: "312a384f3123441e9fd22c759dda79ef",
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
    redirectUri: "exp://192.168.10.7:8081/--/spotify-auth-callback",
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

  console.log(response);

  const accessToken = async () => {
    try {
      const resultPromptAsync = await promptAsync();
      await AsyncStorage.clear();

      console.log(resultPromptAsync);

      let codeVerifer = generateCodeVerifier(128);

      const data = {
        grant_type: "authorization_code",
        code: resultPromptAsync.params.code,
        redirect_uri: "exp://192.168.10.7:8081/--/spotify-auth-callback",
        client_id: clientId,
        code_verifier: codeVerifer,
        client_secret: "312a384f3123441e9fd22c759dda79ef",
      };

      const result = await axios("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: new URLSearchParams(data).toString(),
      });

      if (result.data && result.data.access_token) {
        await AsyncStorage.setItem("token", result.data.access_token);
        setToken(result.data.access_token);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return {
    accessToken,
    token,
  };
};
