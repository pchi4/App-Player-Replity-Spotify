import { useColorModeValue, Button } from "native-base";
import { useGetToken } from "../../../hooks/useGetToken";
import { useEffect } from "react";

export const Auth = ({ navigation }: object) => {
  const { promptAsync, token, accessToken } = useGetToken();

  useEffect(() => {
    if (token) {
      navigation.navigate("home");
    }
  }, [token]);

  // console.log({ token });

  const requestAuthSpotify = async () => {
    await promptAsync();
    await accessToken();
  };

  return <Button onPress={requestAuthSpotify}>Conectar com o Spotify</Button>;
};
