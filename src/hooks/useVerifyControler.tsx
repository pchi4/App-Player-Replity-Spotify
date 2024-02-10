import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

export const useVerifyControler = () => {
  const [isNotMusic, setIsNotMusic] = useState<string | null>();

  useEffect(() => {
    const getIsAlbumStorage = async () => {
      try {
        var isNotMusic = await AsyncStorage.getItem("isNotMusic");
        // console.log(album);
        setIsNotMusic(isNotMusic);
      } catch (error) {}
    };
    getIsAlbumStorage();
  }, []);

  return {
    isNotMusic,
  };
};
