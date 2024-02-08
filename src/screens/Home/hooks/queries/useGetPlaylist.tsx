import { useQuery } from "react-query";
import apiInstance from "../../../../services/api";

const getPlaylist = async (): Promise<Array<any> | undefined> => {
  try {
    const response = await apiInstance.get("/me/playlists");

    return response.data;
  } catch (error) {}
};

export const useGetPlaytlist = () => {
  return useQuery({
    queryKey: ["getPlaylist"],
    queryFn: async () => await getPlaylist(),

    refetchOnWindowFocus: false,
    // onError: (error) => {
    //   // console.log(error);
    // },
  });
};
