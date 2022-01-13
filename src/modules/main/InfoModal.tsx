import { Text } from "@chakra-ui/react";

import MyModal from "#root/components/MyModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const InfoModal = ({ isOpen, onClose }: Props) => {
  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      onSecondaryButtonClick={onClose}
      secondaryButtonText="Cerrar"
      title="Información adicional"
      withPrimaryButton={false}
    >
      <Text>
        Este proyecto permite monitorear el estado de conexión de internet del usuario de manera
        periódica. Estos datos son almacenados en una memoria persistente interna no muy grande (5
        Mbps) desde la cual se pueden generar gráficas para comparar la velocidad real de tu máquina
        versus lo que tu proveedor de internet asegura proveerte.
      </Text>
    </MyModal>
  );
};

export default InfoModal;
