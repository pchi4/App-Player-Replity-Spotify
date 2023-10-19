import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

const getNewsReleases = async () => {
  const token = await AsyncStorage.getItem("token");

  const response = await axios.get(
    "https://api.spotify.com/v1/browse/new-releases",
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

export const useGetNewsReleases = () => {
  return useQuery({
    queryKey: ["getNewsReleases"],
    queryFn: async () => await getNewsReleases(),

    refetchOnWindowFocus: false,
    onError: (error) => {
      // Object.keys(error).forEach((k) => {
      //   console.log(k, error[k]);
      // });
    },
  });
};
