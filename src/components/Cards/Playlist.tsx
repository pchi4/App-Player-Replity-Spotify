import React from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { Box, Image, Text, VStack, Pressable } from "native-base";
import { PropsCardPlaylist } from "../../types/Playlist/propsCardPlaylist";

const { width, height } = Dimensions.get("screen");

export const CardPlaylist = ({
  items,
  navigation,
  handleClick,
  width,
  height,
}: PropsCardPlaylist) => {
  return (
    <Box
      style={{ flexBasis: 0 }}
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
            width={width ? width : width / 2.5}
            height={height ? height : width / 2.5}
            rounded="6"
            source={{
              uri: items?.images[0]?.url,
            }}
          />
        </Box>
        <Box>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="white"
            isTruncated
            width={200}
          >
            {items.name}
          </Text>
          <Text fontSize="md" color="white" isTruncated width={250}>
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
