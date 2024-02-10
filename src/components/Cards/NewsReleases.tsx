import React from "react";
import { View } from "react-native";
import { Box, Image, Text, VStack, Pressable } from "native-base";
import { PropsCardNewsReleases } from "../../types/NewRealeases/propsNewRealeases";

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
        <Box>
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
            color="white"
            isTruncated
            width="200"
          >
            {items.name}
          </Text>
          <Text fontSize="md" color="white" isTruncated width="200">
            {items.type[0].toUpperCase() +
              items.type.slice(1) +
              " ° " +
              items.artists[0].name}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};
