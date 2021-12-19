import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import ping from "#root/lib/ping";
import { checkDownloadSpeed } from "#root/lib/updown";

type State = {
  isLoading: boolean;
  downloadSpeed: number;
  uploadSpeed: number;
  latency: number;
};

const initialState: State = {
  isLoading: false,
  downloadSpeed: 0,
  uploadSpeed: 0,
  latency: 0,
};

const SimplePage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>(initialState);

  const handleStartMeas = async () => {
    setState(old => ({ ...old, isLoading: true }));

    const [ms, err] = await ping();
    const latency = err || !ms ? 0 : ms;

    const [data, err2] = await checkDownloadSpeed();
    if (err2) {
      console.log(err2);
    }

    setState(old => ({ ...old, isLoading: false, latency, downloadSpeed: Number(data?.mbps) }));
  };

  useEffect(() => {
    handleStartMeas();
  }, []);

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
    <VStack align="center" justify="space-around">
      <Heading as="h1">InterCheck</Heading>
      <Heading as="h2" size="md">
        Test rápido
      </Heading>

      <Flex alignItems="center" justifyContent="space-around" w="100%">
        <Box>
          <HStack>
            <Text>Descarga Mbps</Text>
          </HStack>
          <Text>{state.downloadSpeed}</Text>
        </Box>
        <Box>
          <HStack>
            <Text>Subida Mbps</Text>
          </HStack>
          <Text>{state.downloadSpeed}</Text>
        </Box>
      </Flex>

      <VStack>
        <SimpleGrid columns={2} gap={4}>
          <Text fontWeight="bold">Latencia</Text>
          <Text>{`: ${state.latency} ms`}</Text>
        </SimpleGrid>
        <Button onClick={handleStartMeas}>Realizar otra medición</Button>
        <Button onClick={() => navigate("/")}>Ir atrás</Button>
      </VStack>
    </VStack>
  );
};

export default SimplePage;
