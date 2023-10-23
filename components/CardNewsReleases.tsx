import React from "react";
import { View } from "react-native";
import { Box, Image, Text, VStack, Pressable } from "native-base";

type PropsCardNewsReleases = {
  items: Array<any>;
  navigation: object;
  handleClick: () => void;
  width: number | string;
  height: number | string;
};

export const CardNewsReleases = ({
  items,
  navigation,
  handleClick,
  width,
  height,
}: PropsCardNewsReleases) => {
  return (
    <Box paddingRight="4">
      <Pressable onPress={handleClick}>
        <Box shadow={3}>
          <Image
            alt="Art wor"
            resizeMode="cover"
            width={width}
            height={height}
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
            color="black"
            isTruncated
            width="200"
          >
            {items.name}
          </Text>
          <Text fontSize="md" color="black" isTruncated width="200">
            {items.type + " ° " + items.artists[0].name}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};
