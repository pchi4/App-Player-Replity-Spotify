import { useEffect, useState } from "react";
import api from "../api/index";
import qs from "qs";
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
  const [codeHash, setCode] = useState<string | null>("");
  const [codeVerifer, setCodeVerifer] = useState("");

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

  function generateCodeVerifier(length: number) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  const [request, response, promptAsync] = useAuthRequest(config, discovery);

  const accessToken = async (): Promise<void> => {
    try {
      let codeVerifer = generateCodeVerifier(128);
      setCodeVerifer(codeVerifer);
      const data = {
        grant_type: "authorization_code",
        code: codeHash,
        redirect_uri: "exp://10.91.116.3:8082/--/spotify-auth-callback",
        client_id: clientId,
        code_verifier: codeVerifer,
        client_secret: "bef869040446454d9ce21a75fb34c297",
      };

      console.log(data);

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
      console.log(error);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      // console.log({ code });
      //   console.log(response.params);
      setCode(code);
      //   console.log("este e o code" + code);
    }
  }, [response]);

  return {
    accessToken,
    promptAsync,
    token,
  };
};
