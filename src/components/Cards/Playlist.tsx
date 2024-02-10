import React from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { Box, Image, Text, VStack, Pressable } from "native-base";
import { PropsCardPlaylist } from "../../types/Playlist/propsCardPlaylist";

export const CardPlaylist = ({
  items,
  navigation,
  handleClick,
  Width,
  Height,
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
        <Box>
          <Image
            alt="Art wor"
            resizeMode="cover"
            width={Width}
            height={Height}
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
