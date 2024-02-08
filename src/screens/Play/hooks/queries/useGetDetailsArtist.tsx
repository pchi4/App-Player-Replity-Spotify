import { useQuery } from "react-query";
import apiInstance from "../../../../services/api";

type Parameter = {
  id: string;
};

const fetchDetailsArtist = async (
  id: string
): Promise<Array<any> | undefined> => {
  try {
    const result = await apiInstance.get(`/artists/${id}`);

    return result.data;
  } catch (error) {
    // console.log(error);
  }
};

export const useGetDetailsArtist = ({ id }: Parameter) => {
  return useQuery({
    queryKey: ["getDetailsArtist", { id }],
    queryFn: async () => await fetchDetailsArtist(id),

    refetchOnWindowFocus: false,
    // onError: (error) => {
    //   // console.log(error);
    // },
  });
};
