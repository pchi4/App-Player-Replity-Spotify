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
import { Image, Center, Box, Text, Avatar, HStack } from "native-base";
const { width, height } = Dimensions.get("screen");

export const Artist = ({ navigation, route }) => {
  const formatingFollowers = (followers: any) => {
    var followers = followers.toFixed(3).split(".");
    followers[0] = followers[0].split(/(?=(?:...)*$)/).join(".");
    return followers.join(",");
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
