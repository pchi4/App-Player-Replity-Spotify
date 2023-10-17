import React from "react";
import { HStack, Box, Divider, Center, Image, Text } from "native-base";
export const CardHome = ({ navigation, items }) => {
  return (
    <HStack paddingBottom="4" alignItems="center" alignContent="center">
      <Box
        h="100%"
        bg="primary.300"
        roundedBottomLeft="md"
        roundedTopLeft="md"
        shadow={3}
      >
        <Center>
          <Image
            source={{ uri: items.img }}
            alt="ArtWork albuns"
            resizeMode="contain"
            width="90%"
            height="90%"
            size="md"
            rounded="6"
          />
        </Center>
      </Box>
      <Box
        h="100%"
        w="40%"
        bg="dark.300"
        padding="2"
        roundedBottomRight="md"
        roundedTopRight="md"
        shadow={3}
      >
        <Center paddingTop="3" alignItems="start">
          <Text fontSize="sm" fontWeight="bold" color="lightBlue.100">
            {items.title}
          </Text>
        </Center>
      </Box>
    </HStack>
  );
};
