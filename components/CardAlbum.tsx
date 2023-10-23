import React from "react";
import { View } from "react-native";
import { Box, Image, Text, VStack, Pressable } from "native-base";

type PropsCardAlbum = {
  items: Array<any>;
  navigation: object;
  handleClick: () => void;
  width: number | string;
  height: number | string;
};

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
        <Box shadow={3}>
          <Image
            alt="Art work Album"
            resizeMode="cover"
            width={width}
            height={height}
            rounded="6"
            source={{
              uri: items.album.images[0].url,
            }}
          />
        </Box>
        <Box>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="black"
            isTruncated
            width="200"
          >
            {items.album.name}
          </Text>
          <Text fontSize="md" color="black">
            {items.album.type + "º" + items.album.artists[0].name}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};
