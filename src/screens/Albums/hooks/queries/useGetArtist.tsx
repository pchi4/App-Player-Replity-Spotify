import { useQuery } from "react-query";
import apiInstance from "../../../../services/api";

type Parameter = {
  id: string;
};

const getArtist = async (id: string): Promise<Array<any> | undefined> => {
  try {
    const response = await apiInstance.get(`/artists/${id}`);
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
