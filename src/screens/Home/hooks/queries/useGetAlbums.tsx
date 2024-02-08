import { useQuery } from "react-query";
import apiInstance from "../../../../services/api";

const getAlbums = async (): Promise<Array<any> | undefined> => {
  try {
    const response = await apiInstance.get("/me/albums");

    return response.data;
  } catch (error) {
    // console.log(er
  }
};

export const useGetAlbums = () => {
  return useQuery({
    queryKey: ["getAlbums"],
    queryFn: async () => await getAlbums(),

    refetchOnWindowFocus: false,
    // onError: (error) => {
    //   // console.log(error);
    // },
  });
};
