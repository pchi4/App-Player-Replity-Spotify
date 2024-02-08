import { useQuery } from "react-query";
import apiInstance from "../../../../services/api";

type Parameter = {
  id: string;
};

const fetchSeveralArtist = async (id: string): Promise<any> => {
  try {
    const result = await apiInstance.get(`/artists/${id}/related-artists`);

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
