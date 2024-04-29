import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useVerifyToken = () => {
  const [token, setToken] = React.useState<string | null>("");

  React.useEffect(() => {
    const getItemToken = async () => {
      try {
        var tokenStorage = await AsyncStorage.getItem("token");
        setToken(tokenStorage);
      } catch (error) {}
    };
    getItemToken();
  }, [token]);

  return {
    token,
  };
};
