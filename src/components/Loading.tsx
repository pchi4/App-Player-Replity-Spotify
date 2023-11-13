import { Center, Box, Spinner } from "native-base";

export const Loading = () => {
  return (
    <Center bg="rgb(24, 26, 27)">
      <Box padding="4/5" bg="rgb(24, 26, 27)">
        <Spinner size="xl" />
      </Box>
    </Center>
  );
};
