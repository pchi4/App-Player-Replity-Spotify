import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  ScrollView,
  View,
  Dimensions,
} from "react-native";
import {
  HStack,
  Box,
  Divider,
  Center,
  Image,
  Text,
  VStack,
  Icon,
  Button,
  Spinner,
  Pressable,
  Heading,
} from "native-base";

const { width, height } = Dimensions.get("screen");

import { CardPlaylist } from "../../components/Cards/index";
import { useGetPlaytlist } from "./hooks/useGetPlaytlist";
import { Loading } from "../../components/Loading";
import { Feather } from "@expo/vector-icons";

const HeaderList = () => {
  return (
    <Box>
      <HStack
        justifyContent="space-between"
        marginRight="4"
        paddingY="2"
        space="8"
      >
        <Text marginLeft="4" fontSize="md" fontWeight="bold" color="white">
          Adicionado recentemente
        </Text>
        <Pressable>
          <Feather name={"align-justify"} size={25 % 100} color="#FFFFFF" />
        </Pressable>
      </HStack>
    </Box>
  );
};

export const Library = ({ navigation }) => {
  const { data, isError, isLoading, isFetching } = useGetPlaytlist();

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <Box bg="rgb(24, 26, 27)">
        <Box
          paddingBottom={StatusBar.currentHeight}
          paddingTop={StatusBar.currentHeight}
          justifyContent="space-between"
        >
          <FlatList
            data={data?.items}
            numColumns={2}
            ListHeaderComponent={() => <HeaderList />}
            keyExtractor={(item) => String(item?.id)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View>
                <CardPlaylist
                  width={150}
                  height={150}
                  items={item}
                  navigation={navigation}
                  handleClick={() => navigation.navigate("playlists", { item })}
                />
              </View>
            )}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};
