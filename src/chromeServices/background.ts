import {
  CHROME_ALARM_PING,
  CHROME_ALARM_PING_PERIOD_IN_SECONDS,
  CHROME_ALARM_UPDOWN,
  CHROME_ALARM_UPDOWN_PERIOD_IN_SECONDS,
} from "#root/lib/constants";
import { pingWithFetch } from "#root/lib/ping";
import { checkDownloadSpeed } from "#root/lib/updown";
import { PingStorage } from "#root/modules/extension/pingStorage";
import { UpdownStorage } from "#root/modules/extension/updownStorage";

const pingAlarm = async () => {
  const [ms, err] = await pingWithFetch();
  const latency = err || !ms ? 0 : ms;
  await PingStorage.saveData({ t: Date.now(), v: latency });
};

const updownAlarm = async () => {
  const [data, err] = await checkDownloadSpeed();
  if (err) {
    console.warn("checkDownloadSpeed err", err);
    return;
  }
  await UpdownStorage.saveData({ t: Date.now(), v: Number(data?.mbps) });
};

chrome.runtime.onInstalled.addListener(() => {
  console.log("[onInstalled]");
  // create alarm after extension is installed / upgraded
  chrome.alarms.create(CHROME_ALARM_PING, {
    periodInMinutes: CHROME_ALARM_PING_PERIOD_IN_SECONDS / 60,
  });
  chrome.alarms.create(CHROME_ALARM_UPDOWN, {
    periodInMinutes: CHROME_ALARM_UPDOWN_PERIOD_IN_SECONDS / 60,
  });
});

chrome.alarms.onAlarm.addListener(async alarm => {
  console.log(`[${alarm.name} Alarm]`);
  if (alarm.name === CHROME_ALARM_PING) {
    await pingAlarm();
  }
  if (alarm.name === CHROME_ALARM_UPDOWN) {
    await updownAlarm();
  }
});
