import { Box, CircularProgress, Heading, Stack } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <Box>
      <Heading as="h1">InterCheck App Extension</Heading>

      <Stack>
        <CircularProgress />
      </Stack>
    </Box>
  );
};

export default LoadingPage;
