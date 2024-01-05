import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

type Parameter = {
  id: string;
};

const fetchSeveralArtist = async (id: string): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem("token");

    const result = await axios(
      `https://api.spotify.com/v1/artists/${id}/related-artists`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return result.data;
  } catch (error) {
    // console.log(error);
  }
};

export const useGetSeveralArtist = ({ id }: Parameter) => {
  return useQuery({
    queryKey: ["getSeveralArtist", { id }],
    queryFn: async () => await fetchSeveralArtist(id),

    refetchOnWindowFocus: false,
    // onError: (error) => {
    //   // console.log(error);
    // },
  });
};
