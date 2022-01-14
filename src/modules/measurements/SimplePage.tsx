import {
  Box,
  Button,
  ButtonGroup,
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
import LoadingPage from "#root/components/LoadingPage";

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
    return <LoadingPage />;
  }

  return (
    <VStack align="center" justify="space-around">
      <Heading as="h1">InterCheck</Heading>
      <Heading as="h2" size="md">
        Test rápido
      </Heading>

      <Flex alignItems="center" justifyContent="space-around" w="100%" fontSize="1.1rem">
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
          <Text>{state.uploadSpeed || "-"}</Text>
        </Box>
      </Flex>

      <VStack fontSize="1.1rem">
        <SimpleGrid columns={2} gap={4}>
          <Text fontWeight="bold">Latencia</Text>
          <Text>{`: ${state.latency} ms`}</Text>
        </SimpleGrid>
        <ButtonGroup>
          <Button onClick={() => navigate("/")}>Ir atrás</Button>
          <Button onClick={handleStartMeas}>Realizar otra medición</Button>
        </ButtonGroup>
      </VStack>
    </VStack>
  );
};

export default SimplePage;
