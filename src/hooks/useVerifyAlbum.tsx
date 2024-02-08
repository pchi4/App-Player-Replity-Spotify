import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

export const useVerifyAlbum = () => {
  const [album, setAlbum] = useState<string | null>();

  useEffect(() => {
    const getAlbumFromStorage = async () => {
      try {
        var album = await AsyncStorage.getItem("album");
        // console.log(album);
        setAlbum(album);
      } catch (error) {}
    };
    getAlbumFromStorage();
  }, []);

  return {
    album,
  };
};
