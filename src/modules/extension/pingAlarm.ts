import { pingWithFetch } from "#root/lib/ping";

import { DataStorage } from "./dataStorage";

export const pingAlarm = async () => {
  const [ms, err] = await pingWithFetch();
  const latency = err || !ms ? 0 : ms;
  await DataStorage.pushPingRecord({ t: Date.now(), v: latency });
};
