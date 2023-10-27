import React from "react";
import { HStack, Box, Divider, Center, Image, Text } from "native-base";
export const CardHome = ({ navigation, items }) => {
  return (
    <Box style={{ flex: 1 }} marginRight="2">
      <HStack paddingBottom="4" alignItems="center" alignContent="center">
        <Box
          bg="primary.300"
          roundedBottomLeft="md"
          roundedTopLeft="md"
          style={{ flex: 1 }}
        >
          <Image
            source={{ uri: items.img }}
            alt="ArtWork albuns"
            width="100%"
            resizeMode="contain"
            size="md"
            roundedTopLeft="md"
            roundedBottomLeft="md"
          />
        </Box>
        <Box
          style={{ flex: 1.5 }}
          h="100%"
          bg="dark.300"
          padding="2"
          roundedBottomRight="md"
          roundedTopRight="md"
        >
          <Center paddingTop="3" alignItems="start">
            <Text
              fontSize="sm"
              alignItems="center"
              fontWeight="bold"
              alignContent="center"
              color="lightBlue.100"
            >
              {items.title}
            </Text>
          </Center>
        </Box>
      </HStack>
    </Box>
  );
};
