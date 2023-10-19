import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

const getAlbums = async () => {
  const token = await AsyncStorage.getItem("token");

  const response = await axios.get("https://api.spotify.com/v1/me/albums", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const useGetAlbums = () => {
  return useQuery({
    queryKey: ["getAlbums"],
    queryFn: async () => await getAlbums(),

    refetchOnWindowFocus: false,
    onError: (error) => {
      // Object.keys(error).forEach((k) => {
      //   console.log(k, error[k]);
      // });
    },
  });
};
