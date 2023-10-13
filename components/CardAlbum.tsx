import React from "react";
import { Box, Image, Text, VStack } from "native-base";

export const CardAlbum = ({ items, navigation }) => {
  return (
    <VStack paddingRight="4">
      <Box shadow={3}>
        <Image
          alt="Art wor"
          resizeMode="cover"
          width="250"
          height="250"
          rounded="6"
          source={{
            uri: items.img,
          }}
        />
      </Box>
      <Box>
        <Text fontSize="xl" fontWeight="bold" color="black">
          {items.album}
        </Text>
        <Text fontSize="md" color="black">
          {"Álbum" + "º" + items.artista}
        </Text>
      </Box>
    </VStack>
  );
};
