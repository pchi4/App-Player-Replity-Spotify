import React from "react";
import { View } from "react-native";
import { Box, Image, Text, VStack, Pressable } from "native-base";
import { PropsCardAlbum } from "../../types/Artists/propsCardArtists";

export const CardArtist = ({
  items,
  navigation,
  handleClick,
  width,
  height,
}: PropsCardAlbum) => {
  return (
    <Box paddingRight="4" justifyContent="center" alignItems="center">
      <Pressable onPress={handleClick}>
        <Box shadow={3}>
          <Image
            alt="Art work Album"
            resizeMode="cover"
            width={width}
            height={height}
            rounded="6"
            source={{
              uri: items.images[0].url,
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
            {items.name}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};
