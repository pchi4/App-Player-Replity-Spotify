import React from "react";
import { View, Dimensions } from "react-native";
import { Box, Image, Text, VStack, Pressable } from "native-base";

type PropsCardPlaylist = {
  items: Array<any>;
  navigation: object;
  handleClick: () => void;
  width: number | string;
  height: number | string;
};

const { width, height } = Dimensions.get("screen");

export const CardPlaylist = ({
  items,
  navigation,
  handleClick,
  width,
  height,
}: PropsCardPlaylist) => {
  return (
    <Box style={{flex: 1}} paddingRight="4"  justifyContent="center" alignItems="center">
      <Pressable onPress={handleClick}>
        <Box shadow={3}>
          <Image
            alt="Art wor"
            resizeMode="cover"
            width={width / 1}
            height={width / 1}
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
            width="200"
          >
            {items.name}
          </Text>
          <Text fontSize="md" color="white" isTruncated width="200">
            {items.type[0].toUpperCase() +
        items.type.slice(1) + " " + items?.owner?.display_name}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};
