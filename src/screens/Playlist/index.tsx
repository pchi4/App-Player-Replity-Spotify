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
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CardHome } from "../../../components/CardHome";
import { CardPlaylist } from "../../../components/CardPlaylist";
import { useGetToken } from "../../../hooks/useGetToken";
import { useGetPlatlist } from "./hooks/useGetPlatlist";

import { itemsAlbums } from "../../../models/albumns";
import { itemsMusics } from "../../../models/recentsMusics";
import api from "../../../api";
import axios from "axios";

export const Playlist = ({ navigation }) => {
  const { data, isError, isLoading, isFetching } = useGetPlatlist();

  if (isLoading || isFetching) {
    return (
      <Center>
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <SafeAreaView>
      <Box padding="4" bg="rgb(24, 26, 27)">
        <FlatList
          style={{ paddingTop: StatusBar.currentHeight }}
          data={data?.items}
          numColumns={2}
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
      <Text fontSize="4xl">Playlist</Text>
    </SafeAreaView>
  );
};
