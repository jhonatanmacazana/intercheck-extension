import { checkDownloadSpeed } from "#root/lib/updown";

import { DataStorage } from "./dataStorage";

export const updownAlarm = async () => {
  const [data, err] = await checkDownloadSpeed();
  if (err) {
    console.warn("checkDownloadSpeed err", err);
    return;
  }
  await DataStorage.pushDownloadRecord({ t: Date.now(), v: Number(data?.mbps) });
};
