import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

const fetchProfile = async (id: string): Promise<Array<any> | undefined> => {
  try {
    const token = await AsyncStorage.getItem("token");

    const result = await axios(`https://api.spotify.com/v1/users/${id}`, {
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

export const useGetProfile = ({ id }) => {
  return useQuery({
    queryKey: ["getProfile", { id }],
    queryFn: async () => await fetchProfile(id),

    refetchOnWindowFocus: false,
    onError: (error) => {
      Object.keys(error instanceof Error).forEach((k) => {
        console.log(k, error[k]);
      });
    },
  });
};
