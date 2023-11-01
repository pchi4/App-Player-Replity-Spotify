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
  widthProps,
  heightProps,
}: PropsCardPlaylist) => {
  return (
    <Box
      style={{ flex: 1 }}
      paddingBottom="4"
      justifyContent="center"
      alignItems="center"
      paddingRight="4"
    >
      <Pressable onPress={handleClick}>
        <Box shadow={3}>
          <Image
            alt="Art wor"
            resizeMode="cover"
            width={widthProps ? widthProps : width / 1.5}
            height={heightProps ? heightProps : width / 1.5}
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
      </Pressable>
    </Box>
  );
};
