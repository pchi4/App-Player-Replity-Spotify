import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

const getTracks = async (id: string, totalTracks: number) => {
  const token = await AsyncStorage.getItem("token");

  const response = await axios.get(
    `https://api.spotify.com/v1/playlists/${id}/tracks?offset=0&limit=${totalTracks}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const useGetTracksPlaylist = ({ id, totalTracks }) => {
  return useQuery({
    queryKey: ["getTracks", { id }],
    queryFn: async () => await getTracks(id, totalTracks),
    enabled: !!id,
    refetchOnWindowFocus: false,
    onError: (error) => {
      // Object.keys(error).forEach((k) => {
      //   console.log(k, error[k]);
      // });
    },
  });
};
