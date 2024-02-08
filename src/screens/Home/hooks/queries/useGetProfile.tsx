import { useQuery } from "react-query";
import apiInstance from "../../../../services/api";
const fetchProfile = async (): Promise<Array<any> | undefined> => {
  try {
    const result = await apiInstance.get("/me");

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
    // onError: (error) => {
    //   // console.log(error);
    // },
  });
};
