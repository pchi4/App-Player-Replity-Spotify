import { Box, Center, Text, Heading, Image } from "native-base";
import ImageColors from "react-native-image-colors";
import React, { useState, useEffect } from "react";

export const CardTopArtist = () => {
  //   const [colors, setColors] = useState(null);

  //   const fetchColor = async () => {
  //     try {
  //       const url =
  //         "https://i.scdn.co/image/ab67616100005174ee07b5820dd91d15d397e29c";

  //       const result = await ImageColors.getColors(url, {
  //         fallback: "#228B22",
  //         cache: true,
  //         key: url,
  //       });

  //       console.log(result);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchColor();
  //   }, []);

  return (
    <Box width="250" height="250" bg="red.500" rounded="md">
      <Center height="40%" bg="white">
        <Text fontWeight="bold" color="black" paddingBottom="2">
          THIS IS
        </Text>
        <Heading color="black">Pitbull</Heading>
      </Center>
      <Center>
        <Image
          width="100%"
          height="150"
          alt="artists"
          resizeMode="stretch"
          source={{
            uri: "https://i.scdn.co/image/ab6761610000e5ebee07b5820dd91d15d397e29c",
          }}
        />
      </Center>
    </Box>
  );
};
