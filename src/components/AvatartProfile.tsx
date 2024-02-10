import { Text, Avatar, HStack, Box } from "native-base";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AvatarProfile = ({ title }) => {
  const [personProfle, setPersonProfile] = useState();

  const getProfile = async () => {
    const profile = await AsyncStorage.getItem("profile");
    const profileFormatter = JSON.parse(profile);
    setPersonProfile(profileFormatter);
  };

  useEffect(() => {
    getProfile();
  }, [personProfle]);

  return (
    <HStack justifyContent="space-between" paddingY="4">
      <Avatar
        marginLeft="4"
        bg="green.500"
        size="sm"
        source={{
          uri: personProfle?.images[0].url,
        }}
      ></Avatar>

      <Text
        color="white"
        paddingLeft="4"
        textAlign="center"
        fontWeight="bold"
        fontSize="md"
        marginTop={1}
      >
        {title}
      </Text>
    </HStack>
  );
};
