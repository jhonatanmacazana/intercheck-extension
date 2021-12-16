import { Box, Button, CircularProgress, Heading, Stack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";

type State = {
  isLoading: boolean;
  downloadSpeed: number;
  uploadSpeed: number;
  latency: number;
};

const initialState: State = {
  isLoading: true,
  downloadSpeed: 0,
  uploadSpeed: 0,
  latency: 0,
};

const SimplePage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>(initialState);

  if (state.isLoading) {
    return (
      <VStack align="center" justify="space-around">
        <Heading as="h1">InterCheck</Heading>
        <Heading as="h2" size="md">
          Test rápido
        </Heading>
        <CircularProgress isIndeterminate pt="4rem" size="8rem" />
      </VStack>
    );
  }

  return (
    <Box>
      <Heading as="h1">InterCheck App Extension</Heading>
      <Heading as="h2">Medición simple</Heading>

      <Stack
        background="#fff"
        boxShadow="0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)"
        margin={0}
        padding="1rem"
      >
        <Box as="span" fontSize="1rem" color="#1a202c" fontWeight="bold">
          Title
        </Box>
        <Button colorScheme="blue" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button colorScheme="blue" onClick={() => navigate("/simple")}>
          Simple
        </Button>
        <Button colorScheme="blue" onClick={() => navigate("/advanced")}>
          Avanzado
        </Button>
      </Stack>
    </Box>
  );
};

export default SimplePage;
