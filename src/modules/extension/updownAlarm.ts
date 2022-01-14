import { checkDownloadSpeed } from "#root/lib/updown";

import { UpdownStorage } from "./updownStorage";

export const updownAlarm = async () => {
  const [data, err] = await checkDownloadSpeed();
  if (err) {
    console.warn("checkDownloadSpeed err", err);
    return;
  }
  await UpdownStorage.push({ t: Date.now(), v: Number(data?.mbps) });
};
