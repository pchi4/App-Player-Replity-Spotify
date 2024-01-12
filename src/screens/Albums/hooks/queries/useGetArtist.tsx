import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

type Parameter = {
  id: string;
};

const getArtist = async (id: string): Promise<Array<any> | undefined> => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios(`https://api.spotify.com/v1/artists/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {}
};

export const useGetArtist = ({ id }: Parameter) => {
  return useQuery({
    queryKey: ["getArtist", { id }],
    queryFn: async () => await getArtist(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    // onError: (error) => {
    //   // console.log(error);
    // },
  });
};
