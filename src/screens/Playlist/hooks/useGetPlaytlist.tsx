import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

const getPlaylist = async () => {
  const token = await AsyncStorage.getItem("token");

  const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const useGetPlaytlist = () => {
  return useQuery({
    queryKey: ["getPlaylist"],
    queryFn: async () => await getPlaylist(),

    refetchOnWindowFocus: false,
    onError: (error) => {
      // Object.keys(error).forEach((k) => {
      //   console.log(k, error[k]);
      // });
    },
  });
};
