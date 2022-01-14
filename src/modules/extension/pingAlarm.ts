import { pingWithFetch } from "#root/lib/ping";

import { PingStorage } from "./pingStorage";

export const pingAlarm = async () => {
  const [ms, err] = await pingWithFetch();
  const latency = err || !ms ? 0 : ms;
  await PingStorage.push({ t: Date.now(), v: latency });
};
