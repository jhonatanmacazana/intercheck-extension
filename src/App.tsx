import { Box, Heading, Stack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

import ping from "#root/lib/ping";

const MAX_NUMBER_OF_MEASUREMENTS = 10;

const App = () => {
  const [measurements, setMeasurements] = useState<number[]>([]);

  const getStats = useCallback(async () => {
    const [ms, err] = await ping();
    if (err || !ms) return;

    setMeasurements(old => {
      const updated = [...old];
      if (old.length >= MAX_NUMBER_OF_MEASUREMENTS) updated.shift();
      return [...updated, ms];
    });
  }, []);

  useEffect(() => {
    getStats();
    const timeRef = setInterval(() => getStats(), 1000);
    return () => clearInterval(timeRef);
  }, [getStats]);

  return (
    <Box background="#edf0f6" padding="0.5rem">
      <Heading as="h1">InterCheck App Extension</Heading>
      <pre>{JSON.stringify(measurements)}</pre>

      <Stack
        background="#fff"
        boxShadow="0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)"
        margin={0}
        padding="1rem"
      >
        <Box as="span" fontSize="1rem" color="#1a202c" fontWeight="bold">
          Title
        </Box>
      </Stack>
    </Box>
  );
};

export default App;
