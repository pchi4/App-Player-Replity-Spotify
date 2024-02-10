import React from "react";
import { View } from "react-native";
import { Box, Image, Text, VStack, Pressable } from "native-base";
import { PropsCardAlbum } from "../../types/Album/propsCardAlbum";

export const CardAlbum = ({
  items,
  navigation,
  handleClick,
  width,
  height,
}: PropsCardAlbum) => {
  return (
    <Box paddingRight="4" justifyContent="center" alignItems="center">
      <Pressable onPress={handleClick}>
        <Box>
          <Image
            alt="Art work Album"
            resizeMode="cover"
            width={width}
            height={height}
            rounded="6"
            source={{
              uri: items?.album?.images[0].url,
            }}
          />
        </Box>
        <Box>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="white"
            isTruncated
            width="200"
          >
            {items.album?.name}
          </Text>
          <Text fontSize="md" color="white">
            {items.album?.type[0].toUpperCase() +
              items.album?.type.slice(1) +
              " ° " +
              items.album?.artists[0].name}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};
