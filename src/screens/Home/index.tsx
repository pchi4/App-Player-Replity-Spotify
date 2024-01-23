import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, ScrollView, View } from "react-native";
import { HStack, Box, Text, FlatList } from "native-base";
import { CarouselAutoScroll } from "./Carrousel";

import {
  CardAlbum,
  CardHome,
  CardNewsReleases,
  CardPlaylist,
  CardTopArtist,
} from "../../components/Cards/index";

import { Loading } from "../../components/Loading";

import {
  useGetProfile,
  useGetAlbums,
  useGetNewsReleases,
  useGetPlaytlist,
} from "./hooks";
import { itemsMusics } from "../../../models/recentsMusics";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const {
    data: playlist,
    isLoading: playlistLoading,
    isFetching: playlistFetching,
  } = useGetPlaytlist();

  const setProfileStore = async () => {
    await AsyncStorage.setItem("profile", JSON.stringify(profile));
  };

  useEffect(() => {
    setProfileStore();
  }, [profile]);

  if (
    isLoading ||
    isFetching ||
    profileIsFetching ||
    profileIsLoading ||
    newReleasesIsLoading ||
    newReleasesIsFetching ||
    playlistFetching ||
    playlistLoading
  ) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <Box padding="4" bg="rgb(24, 26, 27)">
        <ScrollView>
          <Box paddingTop="4">
            <Text fontSize="2xl" fontWeight="bold" color="white">
              Tocados recentes
            </Text>
          </Box>

          <FlatList
            style={{ paddingTop: StatusBar.currentHeight }}
            data={data?.items.filter((_, idx) => {
              return idx <= 7;
            })}
            numColumns={2}
            keyExtractor={(item, idx) => String(item.album.id + idx)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CardHome items={item} navigation={navigation} />
            )}
          />

          <Box paddingTop="6">
            <Text fontSize="2xl" fontWeight="bold" color="white">
              Feito para {profile?.display_name}
            </Text>
          </Box>

          <FlatList
            style={{ paddingTop: StatusBar.currentHeight }}
            data={data?.items.filter((_, idx) => {
              return idx > 7;
            })}
            keyExtractor={(item, idx) => String(idx)}
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

          <Box paddingTop="6">
            <Text fontSize="2xl" fontWeight="bold" color="white">
              Suas playlists
            </Text>
          </Box>

          <FlatList
            style={{ paddingTop: StatusBar.currentHeight }}
            data={playlist.items}
            keyExtractor={(item, idx) => String(idx)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => (
              <CardPlaylist
                Width={250}
                Height={250}
                items={item}
                navigation={navigation}
                handleClick={() =>
                  navigation.navigate("playlists", {
                    item,
                    limit: item.tracks.total,
                  })
                }
              />
            )}
          />

          <Box paddingTop="6">
            <Text fontSize="2xl" fontWeight="bold" color="white">
              Novidades na área
            </Text>
          </Box>

          <FlatList
            style={{ paddingTop: StatusBar.currentHeight }}
            data={newsRealeases?.albums?.items}
            keyExtractor={(item, idx) => String(idx)}
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
