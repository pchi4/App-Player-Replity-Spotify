import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";

export const useRefreshToken = () => {
  const [clientId] = useState<string>("0e7989953adc4c5cba284909c50fe613");
  const [secret] = useState<string>("312a384f3123441e9fd22c759dda79ef");
  const [experies, setExperies] = useState<number>(0);
  const getRefreshToken = async () => {
    try {
      const refreshToken = AsyncStorage.getItem("refreshToken");

      const response = await axios("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: clientId,
          client_secret: secret,
        }).toString(),
      });

      console.log(response.data.access_token);

      await AsyncStorage.setItem("access_token", response.data.access_token);
      await AsyncStorage.setItem("refresh_token", response.data.refresh_token);
      setExperies(response.data.expires_in);
    } catch (error) {}
  };

  return {
    getRefreshToken,
    experies,
  };
};
