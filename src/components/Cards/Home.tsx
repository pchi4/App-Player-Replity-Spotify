import React from "react";
import { HStack, Box, Divider, Center, Image, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { CardType } from "../../types/Home/propsCardHome";

export const CardHome = ({ navigation, items }: CardType) => {
  return (
    <Box style={{ flex: 1 }} marginRight="2">
      <TouchableOpacity onPress={() => navigation.navigate("albums", items)}>
        <HStack paddingBottom="4" alignItems="center" alignContent="center">
          <Box
            bg="primary.300"
            roundedBottomLeft="md"
            roundedTopLeft="md"
            style={{ flex: 1 }}
          >
            <Image
              source={{ uri: items.album.images[0].url }}
              alt="ArtWork albuns"
              width="full"
              resizeMode="cover"
              size="sm"
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
                isTruncated
                maxW="250"
              >
                {items.album.name}
              </Text>
            </Center>
          </Box>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
};
