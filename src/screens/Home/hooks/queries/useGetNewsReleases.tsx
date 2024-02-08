import { useQuery } from "react-query";
import apiInstance from "../../../../services/api";
const getNewsReleases = async (): Promise<Array<any> | undefined> => {
  try {
    const response = await apiInstance.get("/browse/new-releases");
    return response.data;
  } catch (error) {}
};
export const useGetNewsReleases = () => {
  return useQuery({
    queryKey: ["getNewsReleases"],
    queryFn: async () => await getNewsReleases(),

    refetchOnWindowFocus: false,
    // onError: (error) => {
    //   // console.log(error);
    // },
  });
};
