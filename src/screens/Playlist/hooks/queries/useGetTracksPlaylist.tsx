import { useQuery } from "react-query";
import apiInstance from "../../../../services/api";

type Parameter = {
  id: string;
  totalTracks: number;
};

const getTracks = async (
  id: string,
  totalTracks: number
): Promise<Array<any> | undefined> => {
  try {
    const response = await apiInstance.get(
      `/playlists/${id}/tracks?offset=0&limit=${totalTracks}`
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
