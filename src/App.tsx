import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { MAX_NUMBER_OF_MEASUREMENTS, PING_INTERVAL_IN_MS } from "#root/lib/constants";
import ping from "#root/lib/ping";

import AdvancedPage from "./modules/measurements/AdvancedPage";
import HomePage from "./modules/main/HomePage";
import SimplePage from "./modules/measurements/SimplePage";

// type Stat = {
//   timeWithoutConectivity: any;
//   lastInternetCut: number;
//   speedTest: any;
//   latencyStatistics: number;
// };

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
    const timeRef = setInterval(() => getStats(), PING_INTERVAL_IN_MS);
    return () => clearInterval(timeRef);
  }, [getStats]);

  return (
    <Box background="#edf0f6" padding="0.5rem">
      <pre>{JSON.stringify(measurements)}</pre>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loading" element={<HomePage />} />
        <Route path="/simple" element={<SimplePage />} />
        <Route path="/advanced" element={<AdvancedPage />} />
      </Routes>
    </Box>
  );
};

export default App;
