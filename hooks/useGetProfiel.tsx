import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

const fetchProfile = async (): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem("token");

    const result = await axios("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return result.data;
  } catch (error) {
    // console.log(error);
  }
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["getProfile"],
    queryFn: async () => await fetchProfile(),

    refetchOnWindowFocus: false,
    onError: (error) => {
      // Object.keys(error).forEach((k) => {
      //   console.log(k, error[k]);
      // });
    },
  });
};
