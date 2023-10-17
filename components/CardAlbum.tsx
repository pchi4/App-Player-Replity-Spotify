import React from "react";
import { View } from "react-native";
import { Box, Image, Text, VStack, Pressable } from "native-base";

export const CardAlbum = ({ items, navigation, handleClick }) => {
  return (
    <VStack paddingRight="4">
      <Box>
        <Pressable onPress={handleClick}>
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
        </Pressable>
      </Box>
    </VStack>
  );
};
