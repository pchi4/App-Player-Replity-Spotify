import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  ScrollView,
  View,
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

import { CardPlaylist } from "../../components/Cards/Playlist";
import { useGetPlaytlist } from "./hooks/useGetPlaytlist";
import { Loading } from "../../components/Loading";
import { Feather } from "@expo/vector-icons";

const HeaderList = () => {
  return (
    <Box>
      <HStack justifyContent="space-between" marginRight="4" space="8">
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

export const Playlist = ({ navigation }) => {
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
        >
          <FlatList
            data={data?.items}
            numColumns={2}
            ListHeaderComponent={() => <HeaderList />}
            keyExtractor={(item) => String(item?.id)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CardPlaylist
                width={200}
                height={200}
                items={item}
                navigation={navigation}
                handleClick={() => navigation.navigate("albums", item)}
              />
            )}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};
