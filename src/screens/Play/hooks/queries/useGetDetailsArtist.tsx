import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

const fetchDetailsArtist = async (
  id: string
): Promise<Array<any> | undefined> => {
  try {
    const token = await AsyncStorage.getItem("token");

    const result = await axios(`https://api.spotify.com/v1/artists/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const useGetDetailsArtist = ({ id }) => {
  return useQuery({
    queryKey: ["getDetailsArtist", { id }],
    queryFn: async () => await fetchDetailsArtist(id),

    refetchOnWindowFocus: false,
    onError: (error) => {
      Object.keys(error instanceof Error).forEach((k) => {
        console.log(k, error[k]);
      });
    },
  });
};
