import React from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { Box, Image, Text, VStack, Pressable } from "native-base";
import { PropsCardPlaylist } from "../../types/Playlist/propsCardPlaylist";

const { width, height } = Dimensions.get("screen");

export const CardLibrary = ({
  items,
  navigation,
  handleClick,
}: PropsCardPlaylist) => {
  return (
    <Box
      paddingBottom="4"
      justifyContent="center"
      alignItems="center"
      paddingX="2"
    >
      <TouchableOpacity onPress={handleClick}>
        <Box shadow={3}>
          <Image
            alt="Art wor"
            resizeMode="cover"
            width={width / 3.5}
            height={width / 3.5}
            rounded="6"
            source={{
              uri: items?.images[0]?.url,
            }}
          />
        </Box>
        <Box>
          <Text
            fontSize="md"
            fontWeight="bold"
            color="white"
            isTruncated
            width={width / 4}
          >
            {items.name}
          </Text>
          <Text fontSize="sm" color="white" isTruncated width={width / 4}>
            {items.type[0].toUpperCase() +
              items.type.slice(1) +
              " ° " +
              items?.owner?.display_name}
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};
