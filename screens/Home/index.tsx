import { useColorModeValue, Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Home = () => {
  const darkMode = async () => {
    try {
      await AsyncStorage.setItem("color-mode", "dark");
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onPress={darkMode}>Sample</Button>;
};
