import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

const getArtist = async (id:string) => {
  const token = await AsyncStorage.getItem("token");

  const response = await axios.get(
    `https://api.spotify.com/v1/artists/${id}`,
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

export const useGetArtist = ({id}) => {
  return useQuery({
    queryKey: ["getArtist", {id}],
    queryFn: async () => await getArtist(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    onError: (error) => {
      // Object.keys(error).forEach((k) => {
      //   console.log(k, error[k]);
      // });
    },
  });
};
