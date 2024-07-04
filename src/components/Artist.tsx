import {
  AspectRatio,
  Box,
  Center,
  Heading,
  Stack,
  Text,
  Image,
} from "native-base";

import { useStateValue } from "../context/State";
export const Artist = () => {
  const [context, dispatch] = useStateValue().reducer;

  //   console.log(context);

  return (
    <Box
      style={{ flex: 1 }}
      marginTop={["10%", "18%", "20%"]}
      paddingX="8"
      paddingBottom="4"
    >
      <Box>
        <Box
          rounded="lg"
          overflow="hidden"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 12}>
              {/* <Image
                source={{
                  uri: detailsArtist?.images[0].url,
                }}
                alt="image"
              /> */}
            </AspectRatio>
            <Center
              _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "md",
              }}
              position="absolute"
              top="0"
              px="3"
              py="1.5"
            >
              Sobre o artista
            </Center>
          </Box>
          <Stack p="4" space={3} maxHeight="40%" bg="gray.600">
            <Stack space={2}>
              <Heading size="md" ml="-1" color="white">
                {/* {detailsArtist?.name} */}
              </Heading>
              <Text
                fontSize="xs"
                color="white"
                fontWeight="200"
                ml="-0.5"
                mt="-1"
              >
                {/* {formatingFollowers(detailsArtist?.followers.total) ??
                  0 + " seguidores"} */}
              </Text>
            </Stack>
            <Text fontWeight="200" color="white">
              Bengaluru (also called Bangalore) is the center of India's
              high-tech industry. The city is also known for its parks and
              nightlife.
            </Text>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
