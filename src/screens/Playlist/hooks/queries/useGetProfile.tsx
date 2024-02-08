import { useQuery } from "react-query";
import apiInstance from "../../../../services/api";
type Parameter = {
  id: string;
};

const fetchProfile = async (id: string): Promise<Array<any> | undefined> => {
  try {
    const result = await apiInstance.get(`/users/${id}`);

    return result.data;
  } catch (error) {
    // console.log(error);
  }
};

export const useGetProfile = ({ id }: Parameter) => {
  return useQuery({
    queryKey: ["getProfile", { id }],
    queryFn: async () => await fetchProfile(id),

    refetchOnWindowFocus: false,
    // onError: (error) => {
    //   // console.log(error);
    // },
  });
};
