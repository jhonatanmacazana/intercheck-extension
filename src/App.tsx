import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import { EXTENSION_HEIGHT, EXTENSION_WIDTH } from "#root/lib/constants";

import AdvancedPage from "./modules/measurements/AdvancedPage";
import HomePage from "./modules/main/HomePage";
import SimplePage from "./modules/measurements/SimplePage";

const App = () => {
  return (
    <Box background="#fff" padding="0.5rem" h={EXTENSION_HEIGHT} w={EXTENSION_WIDTH}>
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
