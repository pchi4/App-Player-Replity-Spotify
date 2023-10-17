import React from "react";
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
} from "native-base";
import { CardHome } from "../../../components/CardHome";
import { CardAlbum } from "../../../components/CardAlbum";

import { itemsAlbums } from "../../../models/albumns";
import { itemsMusics } from "../../../models/recentsMusics";

export const Home = ({ navigation }: object) => {
  const Col = ({ numRows, children }) => {
    return <View style={{ flex: 2 }}>{children}</View>;
  };

  const Row = ({ children }) => (
    <View style={{ flexDirection: "row" }}>{children}</View>
  );

  return (
    <ScrollView>
      <SafeAreaView>
        <Box padding="4">
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
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="black"
              alignItems="start"
            >
              Feito para Usuário
            </Text>
          </Box>

          <FlatList
            style={{ paddingTop: StatusBar.currentHeight }}
            data={itemsAlbums}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => (
              <CardAlbum
                items={item}
                navigation={navigation}
                handleClick={() => navigation.navigate("albums", item)}
              />
            )}
          />
        </Box>
      </SafeAreaView>
    </ScrollView>
  );
};
