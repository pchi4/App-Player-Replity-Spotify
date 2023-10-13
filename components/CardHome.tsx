import React from "react";
import { HStack, Box, Divider, Center, Image, Text } from "native-base";
export const CardHome = ({ navigation, items }) => {
  return (
    <HStack paddingBottom="4">
      <Box
        h="100%"
        w="20%"
        padding="1.5"
        bg="primary.300"
        roundedBottomLeft="md"
        roundedTopLeft="md"
        shadow={3}
      >
        <Image
          source={{ uri: items.img }}
          alt="ArtWork albuns"
          resizeMode="cover"
          size="md"
          rounded="6"
        />
      </Box>
      <Box
        h="100%"
        w="80%"
        bg="dark.300"
        padding="2"
        roundedBottomRight="md"
        roundedTopRight="md"
        shadow={3}
      >
        <Center paddingTop="5" alignItems="start">
          <Text fontSize="lg" fontWeight="bold" color="lightBlue.100">
            {items.title}
          </Text>
        </Center>
      </Box>
    </HStack>
  );
};
