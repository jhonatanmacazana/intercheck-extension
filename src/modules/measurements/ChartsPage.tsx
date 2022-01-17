/* eslint-disable react-hooks/exhaustive-deps */
import { Button, ButtonGroup, Divider, Heading, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CartesianGrid, LineChart, Line, Tooltip, XAxis, YAxis } from "recharts";

import { DataStorage } from "#root/modules/extension/dataStorage";
import { TimeRecord } from "#root/modules/extension/types";
import LoadingPage from "#root/components/LoadingPage";
// import { PING_STORAGE_KEY, UPDOWN_DOWNLOAD_STORAGE_KEY } from "#root/lib/constants";

type Option = "ping" | "download";

const ChartsPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<Option>("ping");
  const [pingData, setPingData] = useState<TimeRecord[]>([]);
  const [downloadData, setDownloadData] = useState<TimeRecord[]>([]);

  const setupData = useCallback(async () => {
    setIsLoading(true);
    const data = await DataStorage.getAll();
    if (!data) {
      setIsLoading(false);
      return;
    }
    setPingData(data.pingInMs!);
    setDownloadData(data.downloadInMbps!);
    setIsLoading(false);
  }, []);

  // Load initial data
  useEffect(() => {
    setupData();
  }, []);

  // // Subscribe to live changes
  // useEffect(() => {
  //   (async () => {
  //     const listener: (
  //       changes: { [key: string]: chrome.storage.StorageChange },
  //       areaName: "sync" | "local" | "managed"
  //     ) => void = (changes, areaName) => {
  //       for (let [key, { newValue }] of Object.entries(changes)) {
  //         if (key === PING_STORAGE_KEY && areaName === "local") {
  //           setPingData(newValue);
  //           // const difference = newValue.filter((x: any) => !oldValue.includes(x)) || [];
  //           // setPingData(old => [...old, ...difference]);
  //         }

  //         if (key === UPDOWN_DOWNLOAD_STORAGE_KEY && areaName === "local") {
  //           setDownloadData(newValue);
  //           // const difference = newValue.filter((x: any) => !oldValue.includes(x)) || [];
  //           // setDownloadData(old => [...old, ...difference]);
  //         }
  //       }
  //     };

  //     chrome.storage.onChanged.addListener(listener);
  //     return () => chrome.storage.onChanged.removeListener(listener);
  //   })();
  // }, []);

  if (isLoading) {
    return <LoadingPage subtitle="Medición avanzada" />;
  }

  return (
    <VStack align="center" justify="space-around">
      <Heading as="h1">InterCheck</Heading>
      <Heading as="h2" size="md">
        Medición avanzada
      </Heading>

      <VStack alignItems="center" justifyContent="space-around" w="100%">
        <LineChart
          width={500}
          height={300}
          data={selectedOption === "ping" ? pingData : downloadData}
        >
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
            label={{
              angle: -90,
              value: selectedOption === "ping" ? "Latencia (ms)" : "Velocidad de Descarga (Mbps)",
              position: "insideLeft",
            }}
            name="Valor"
          />
          {/* <YAxis yAxisId={1} dataKey="v" name="Valor" label="Mbps" /> */}
          <Tooltip labelFormatter={ms => `Hora ${new Date(ms).toLocaleTimeString()}`} />
          <CartesianGrid />
          <Line
            activeDot={true}
            animationDuration={500}
            data={selectedOption === "ping" ? pingData : downloadData}
            dataKey="v"
            dot={false}
            name={selectedOption === "ping" ? "Latencia" : "Velocidad de Descarga"}
            stroke="#8884d8"
            type="linear"
            unit={selectedOption === "ping" ? "ms" : "Mbps"}
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

        <ButtonGroup isAttached paddingBottom="1rem">
          <Button
            colorScheme="blue"
            isDisabled={selectedOption === "ping"}
            onClick={() => setSelectedOption("ping")}
          >
            Latencia
          </Button>
          <Button
            colorScheme="blue"
            isDisabled={selectedOption === "download"}
            onClick={() => setSelectedOption("download")}
          >
            Velocidad de descarga
          </Button>
        </ButtonGroup>

        <ButtonGroup paddingBottom="2rem">
          <Button onClick={() => navigate("/")}>Ir atrás</Button>
          <Divider orientation="vertical" />
          <Button colorScheme="blue" onClick={() => setupData()}>
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

export default ChartsPage;
