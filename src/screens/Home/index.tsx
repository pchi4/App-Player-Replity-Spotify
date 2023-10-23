import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, ScrollView, View } from "react-native";
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
  FlatList,
} from "native-base";

import { CardHome } from "../../../components/CardHome";
import { CardAlbum } from "../../../components/CardAlbum";
import { CardPlaylist } from "../../../components/CardPlaylist";
import { CardNewsReleases } from "../../../components/CardNewsReleases";
import { useGetProfile, useGetAlbums, useGetNewsReleases } from "./hooks";
import { itemsMusics } from "../../../models/recentsMusics";

export const Home = ({ navigation }: object) => {
  const { data, isError, isLoading, isFetching } = useGetAlbums();
  const {
    data: profile,
    isError: profileIsError,
    isLoading: profileIsLoading,
    isFetching: profileIsFetching,
  } = useGetProfile();

  const {
    data: newsRealeases,
    isLoading: newReleasesIsLoading,
    isFetching: newReleasesIsFetching,
  } = useGetNewsReleases();

  if (
    isLoading ||
    isFetching ||
    profileIsFetching ||
    profileIsLoading ||
    newReleasesIsLoading ||
    newReleasesIsFetching
  ) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <SafeAreaView>
      <Box padding="4">
        <ScrollView>
          <FlatList
            style={{ paddingTop: StatusBar.currentHeight }}
            data={itemsMusics}
            numColumns={2}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CardHome items={item} navigation={navigation} />
            )}
          />

          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="black">
              Feito para {profile?.display_name}
            </Text>
          </Box>

          <FlatList
            style={{ paddingTop: StatusBar.currentHeight }}
            data={data?.items}
            keyExtractor={(item) => String(item?.album.id)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => (
              <CardAlbum
                width={250}
                height={250}
                items={item}
                navigation={navigation}
                handleClick={() => navigation.navigate("albums", item)}
              />
            )}
          />

          <Box paddingTop="4">
            <Text fontSize="2xl" fontWeight="bold" color="black">
              Novidades na áreaa
            </Text>
          </Box>

          <FlatList
            style={{ paddingTop: StatusBar.currentHeight }}
            data={newsRealeases?.albums?.items}
            keyExtractor={(item) => item?.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => (
              <CardNewsReleases
                width={250}
                height={250}
                items={item}
                navigation={navigation}
                handleClick={() => navigation.navigate("albums", item)}
              />
            )}
          />
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};
