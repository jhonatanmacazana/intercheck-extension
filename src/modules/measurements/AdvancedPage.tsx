import { Button, ButtonGroup, Divider, Heading, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CartesianGrid, LineChart, Line, Tooltip, XAxis, YAxis } from "recharts";

import { PING_STORAGE_KEY, UPDOWN_DOWNLOAD_STORAGE_KEY } from "#root/lib/constants";

type PayloadRecord = {
  t: number;
  v: number;
};

const AdvancedPage = () => {
  const navigate = useNavigate();
  const [pingData, setPingData] = useState<PayloadRecord[]>([]);
  const [, setDownloadData] = useState<PayloadRecord[]>([]);
  // const [downloadData, setDownloadData] = useState<PayloadRecord[]>([]);

  const getData = async () => {
    const st = await chrome.storage.local.get(null);
    const pingRawData = st[PING_STORAGE_KEY];
    setPingData(pingRawData);
    const downloadRawData = st[UPDOWN_DOWNLOAD_STORAGE_KEY];
    setDownloadData(downloadRawData);
    return st;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <VStack align="center" justify="space-around">
      <Heading as="h1">InterCheck</Heading>
      <Heading as="h2" size="md">
        Medición avanzada
      </Heading>

      <VStack alignItems="center" justifyContent="space-around" w="100%">
        <LineChart width={500} height={300} data={pingData}>
          <XAxis
            dataKey="t"
            domain={["auto", "auto"]}
            name="Tiempo"
            type="number"
            // tickFormatter={ms => format(new Date(ms), "HH:mm")}
            // tickFormatter={ms => format(new Date(ms), "HH:mm Do")}
            tickFormatter={ms => new Date(ms).toLocaleTimeString()}
          />
          <YAxis
            dataKey="v"
            label={{ value: "Latencia (ms)", angle: -90, position: "insideLeft" }}
            name="Valor"
          />
          {/* <YAxis yAxisId={1} dataKey="v" name="Valor" label="Mbps" /> */}
          <Tooltip labelFormatter={ms => `Hora ${new Date(ms).toLocaleTimeString()}`} />
          <CartesianGrid />
          <Line
            activeDot={true}
            animationDuration={500}
            data={pingData}
            dataKey="v"
            dot={false}
            name="Latencia"
            stroke="#8884d8"
            type="linear"
            unit="ms"
          />
          {/* <Line
            yAxisId={1}
            type="linear"
            name="Descarga"
            dataKey="v"
            data={downloadData}
            stroke="#88f4d8"
          /> */}
        </LineChart>

        <ButtonGroup paddingBottom="2rem">
          <Button onClick={() => navigate("/")}>Ir atrás</Button>
          <Divider orientation="vertical" />
          <Button colorScheme="blue" onClick={() => getData()}>
            Refrescar
          </Button>
          <Button colorScheme="red" onClick={() => chrome.storage.local.clear()}>
            Limpiar memoria
          </Button>
        </ButtonGroup>
      </VStack>
    </VStack>
  );
};

export default AdvancedPage;
