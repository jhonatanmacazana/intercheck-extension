import {
  Box,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  VStack,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const InfoModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Información adicional</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack>
            <Box>
              <Heading as="h3" size="lg">
                Modo rápido
              </Heading>
              <Text>Descripción del texto</Text>
            </Box>
            <Box>
              <Heading as="h3" size="lg">
                Modo avanzado
              </Heading>
              <Text>Descripción del texto avanzado</Text>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="ghost">oa</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InfoModal;
