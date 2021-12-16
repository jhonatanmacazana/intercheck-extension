import { QuestionIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Heading, IconButton, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";

import InfoModal from "./InfoModal";
import SettingsModal from "./SettingsModal";

const HomePage = () => {
  const navigate = useNavigate();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isSettingsModalOpen, setisSettingsModalOpen] = useState(false);

  return (
    <Box>
      <HStack align="center" justify="space-around">
        <IconButton
          aria-label="Información"
          icon={<QuestionIcon w={6} h={6} />}
          onClick={() => setIsInfoModalOpen(true)}
        />
        <Heading as="h1">InterCheck</Heading>
        <IconButton
          aria-label="Configuración"
          icon={<SettingsIcon w={6} h={6} />}
          onClick={() => setisSettingsModalOpen(true)}
        />
      </HStack>

      <Stack margin={0} marginTop="2rem" flex={1} paddingY="1rem" align="center">
        <Button colorScheme="blue" onClick={() => navigate("/simple")} w="12rem">
          Test rápido
        </Button>
        <Button colorScheme="blue" onClick={() => navigate("/advanced")} w="12rem">
          Test avanzado
        </Button>
      </Stack>

      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setisSettingsModalOpen(false)} />
      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
    </Box>
  );
};

export default HomePage;
