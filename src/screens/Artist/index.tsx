import React from "react";
import {
  SafeAreaView,
  SectionList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  View,
} from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import {
  Image,
  Center,
  Box,
  Text,
  Avatar,
  HStack,
  Heading,
  VStack,
  Spacer,
  Pressable,
  Spinner,
  Flex,
  Select,
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("screen");

export const Artist = ({ navigation, route }) => {
  const formatingFollowers = (num: number) => {
    var units = ["M", "B", "T", "Q"];
    var unit = Math.floor((num / 1.0e1).toFixed(0).toString().length);
    var r = unit % 3;
    var x = Math.abs(Number(num)) / Number("1.0e+" + (unit - r)).toFixed(2);
    return x.toFixed(2) + " " + units[Math.floor(unit / 3) - 2];
  };

  return (
    <Box style={{ flex: 1 }}>
      <ScrollView>
        <Box style={{ height: "100%" }} backgroundColor="#212224" paddingX="4">
          <SafeAreaView>
            <Box style={{ flex: 1 }}>
              <Center>
                <Image
                  marginTop="10%"
                  source={{
                    uri: route.params.images[0].url,
                  }}
                  alt="ArtWork albuns"
                  width={width / 1.2}
                  height={width / 1.2}
                />
              </Center>
            </Box>

            <Box style={{ flex: 1 }}>
              <Box paddingY="4">
                <Text color="white" fontSize="3xl" fontWeight="bold">
                  {formatingFollowers(route.params.followers.total)}
                </Text>
                <Text color="white" fontSize="md" fontWeight="bold">
                  OUVINTES MENSAIS
                </Text>
              </Box>

              <Box paddingY="4">
                <Text color="white" fontSize="md" fontWeight="bold">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae consequuntur, quasi repudiandae maiores provident
                  assumenda vel, accusantium minima quod hic voluptates
                  accusamus debitis ipsum eaque tempora recusandae inventore
                  minus fuga.
                </Text>
              </Box>
              <Box paddingY="4">
                <Text color="white" fontSize="md" fontWeight="bold">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae consequuntur, quasi repudiandae maiores provident
                  assumenda vel, accusantium minima quod hic voluptates
                  accusamus debitis ipsum eaque tempora recusandae inventore
                  minus fuga.
                </Text>
              </Box>
              <Box>
                <HStack justifyContent="start" paddingY="4">
                  <Avatar
                    bg="green.500"
                    size="sm"
                    source={{
                      uri: route.params.images[0].url,
                    }}
                  ></Avatar>
                  <Text
                    fontSize="lg"
                    marginLeft="2"
                    fontWeight="bold"
                    color="white"
                  >
                    {`Postado por ${route.params.name}`}
                  </Text>
                </HStack>
              </Box>
            </Box>
          </SafeAreaView>
        </Box>
      </ScrollView>
    </Box>
  );
};
