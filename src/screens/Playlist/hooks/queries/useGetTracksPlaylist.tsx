import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

type Parameter = {
  id: string;
  totalTracks: number;
};

const getTracks = async (
  id: string,
  totalTracks: number
): Promise<Array<any> | undefined> => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios(
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
  } catch (error) {}
};

export const useGetTracksPlaylist = ({ id, totalTracks }: Parameter) => {
  return useQuery({
    queryKey: ["getTracks", { id }],
    queryFn: async () => await getTracks(id, totalTracks),
    enabled: !!id,
    refetchOnWindowFocus: false,
    // onError: (error) => {
    //   // console.log(error);
    // },
  });
};
