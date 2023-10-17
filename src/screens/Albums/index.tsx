import React from "react";
import { SafeAreaView, Text } from "react-native";
import { View, Image, Center, Box } from "native-base";
export const Albums = ({ route, navigation }) => {
  const { id, img, title, album } = route.params;

  return (
    <SafeAreaView>
      <Box paddingY="4">
        <Center>
          <Image
            alt="art work"
            width="250"
            height="250"
            rounded="md"
            source={{ uri: img }}
          />
        </Center>
      </Box>
      <Box>
        <Text>{album}</Text>
      </Box>
    </SafeAreaView>
  );
};
