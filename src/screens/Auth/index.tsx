import { Dimensions } from "react-native";
import {
  useColorModeValue,
  Button,
  Box,
  Center,
  Container,
  Heading,
  Text,
  Image,
} from "native-base";
import { useGetToken } from "../../hooks/useGetToken";
import { useEffect } from "react";

const { width, height } = Dimensions.get("screen");

export const Auth = ({ navigation }: object) => {
  const { token, accessToken } = useGetToken();

  useEffect(() => {
    if (token) {
      navigation.navigate("home");
    }
  }, [token]);

  const requestAuthSpotify = async () => {
    await accessToken();
  };

  return (
    <Box style={{ flex: 1 }}>
      <Box style={{ flex: 1.6 }} padding="4" bg="orange.400">
        {" "}
        <Center marginTop="1/3">
          <Image
            rounded="6"
            width={width / 1}
            height={height / 3}
            alt="person"
            source={require("../../../assets/person.png")}
          />
        </Center>
      </Box>

      <Box style={{ flex: 1 }} bg="green.400">
        <Box padding="4">
          <Heading fontSize={["2xl", "3xl", "4xl"]} marginY="2">
            Bem vindo ao App Player Music
          </Heading>
          <Text
            fontSize={["xl", "2xl", "xl"]}
            marginY="4"
            width="80%"
            color="dark.100"
          >
            Escute milhões de músicas e podcasts de graça! Basta utilizar a sua
            conta do Spotify
          </Text>
        </Box>
        <Center>
          <Button
            width="90%"
            marginTop={["8", "12", "10"]}
            onPress={requestAuthSpotify}
            bg="blue.500"
          >
            Conectar com o Spotify
          </Button>
        </Center>
      </Box>
    </Box>
  );
};
