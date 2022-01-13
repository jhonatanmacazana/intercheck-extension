import { Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

import MyModal from "#root/components/MyModal";
import NumberSliderInput from "#root/components/NumberSliderInput";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SettingsModal = ({ isOpen, onClose }: Props) => {
  const [pingRate, setPingRate] = useState(1);
  const [updownRate, setUpdownRate] = useState(5);

  const onSave = () => {
    onClose();
  };

  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      onPrimaryButtonClick={onSave}
      onSecondaryButtonClick={onClose}
      primaryButtonText="Guardar"
      secondaryButtonText="Cancelar"
      title="Configuración"
    >
      <Heading as="h3" size="sm">
        Medición continua
      </Heading>
      <Text>Periodo entre mediciones</Text>

      <Text mt={4}>Ping (estado de conexión) en minutos</Text>
      <NumberSliderInput
        max={30}
        min={1}
        onChange={value => setPingRate(Number(value))}
        precision={1}
        step={0.2}
        value={pingRate}
      />

      <Text mt={4}>Download y Upload (velocidad de descarga y carga) en minutos</Text>
      <NumberSliderInput
        max={60}
        min={1}
        onChange={value => setUpdownRate(Number(value))}
        value={updownRate}
      />
    </MyModal>
  );
};

export default SettingsModal;
