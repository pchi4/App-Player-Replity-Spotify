import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  LogBox,
  TouchableOpacity,
  Linking,
} from "react-native";
import { HStack, Box, Text, FlatList } from "native-base";
import { useStateValue } from "../../context/State";
import * as Liking from "expo-linking";

import {
  CardAlbum,
  CardHome,
  CardNewsReleases,
  CardPlaylist,
  CardTopArtist,
} from "../../components/Cards/index";

import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";

import {
  useGetProfile,
  useGetAlbums,
  useGetNewsReleases,
  useGetPlaytlist,
} from "./hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackPlayer from "react-native-track-player";
// import { SetupService } from "../../services/SetupService";

export const Home = ({ navigation }: object) => {
  const [_, setNavigator] = useStateValue().navigator;

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    setNavigator(navigation);
  }, []);

  const { data, isError, isLoading, isFetching } = useGetAlbums();
  const {
    data: profile,
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

  // const setupPlayer = async () => {
  //   try {
  //     await TrackPlayer.setupPlayer();
  //     var track1 = {
  //       url: "http://example.com/avaritia.mp3", // Load media from the network
  //       title: "Avaritia",
  //       artist: "deadmau5",
  //       album: "while(1<2)",
  //       genre: "Progressive House, Electro House",
  //       date: "2014-05-20T07:00:00+00:00", // RFC 3339
  //       artwork: "http://example.com/cover.png", // Load artwork from the network
  //       duration: 402, // Duration in seconds
  //     };

  //     // You can then [add](https://rntp.dev/docs/api/functions/queue#addtracks-insertbeforeindex) the items to the queue
  //     await TrackPlayer.add([track1]);
  //     await TrackPlayer.play();
  //   } catch (error) {
  //     console.log("error ao dar p play", error);
  //   }
  // };

  const setProfileStore = async () => {
    try {
      if (profile) {
        await AsyncStorage.setItem("profile", JSON.stringify(profile));
      }
    } catch (error) {}
  };

  useEffect(() => {
    setProfileStore();
  }, [profile]);

  if (isError) {
    return <Error />;
  }

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
    <Box padding="4" bg="black">
      <ScrollView>
        <Box paddingTop="4">
          <Text fontSize="2xl" fontWeight="bold" color="white">
            Tocados recentes
          </Text>
        </Box>
        {/* 
          <Box>
            <TouchableOpacity onPress={setupPlayer}>
              <Text>Play</Text>
            </TouchableOpacity>
          </Box> */}

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
          data={playlist?.items}
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
  );
};
