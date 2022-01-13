import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  title?: string;
  withPrimaryButton?: boolean;
  withSecondaryButton?: boolean;
};

const MyModal = ({
  children,
  isOpen,
  onClose,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  primaryButtonText = "Cerrar",
  secondaryButtonText = "Cerrar",
  title,
  withPrimaryButton = true,
  withSecondaryButton = true,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          {withSecondaryButton && (
            <Button colorScheme="blue" mr={3} onClick={onSecondaryButtonClick}>
              {secondaryButtonText}
            </Button>
          )}
          {withPrimaryButton && (
            <Button colorScheme="blue" onClick={onPrimaryButtonClick} variant="outlined">
              {primaryButtonText}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MyModal;
