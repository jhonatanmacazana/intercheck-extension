import { Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import MyModal from "#root/components/MyModal";
import NumberSliderInput from "#root/components/NumberSliderInput";
import {
  CHROME_ALARM_PING_DEFAULT_RATE_IN_MINUTES,
  CHROME_ALARM_UPDOWN_DEFAULT_RATE_IN_MINUTES,
} from "#root/lib/constants";
import { SettingsStorage } from "#root/modules/extension/settingsStorage";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SettingsModal = ({ isOpen, onClose }: Props) => {
  const [pingRate, setPingRate] = useState(CHROME_ALARM_PING_DEFAULT_RATE_IN_MINUTES);
  const [updownRate, setUpdownRate] = useState(CHROME_ALARM_UPDOWN_DEFAULT_RATE_IN_MINUTES);

  useEffect(() => {
    (async () => {
      const all = await SettingsStorage.getAll();
      if (!all) return;
      setPingRate(all.pingRate || CHROME_ALARM_PING_DEFAULT_RATE_IN_MINUTES);
      setUpdownRate(all.updownRate || CHROME_ALARM_UPDOWN_DEFAULT_RATE_IN_MINUTES);
    })();
  }, []);

  const onSave = async () => {
    await SettingsStorage.setAll({ pingRate, updownRate });
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
