import {
  CHROME_ALARM_PING,
  CHROME_ALARM_PING_PERIOD_IN_SECONDS,
  CHROME_ALARM_UPDOWN,
  CHROME_ALARM_UPDOWN_PERIOD_IN_SECONDS,
  PING_STORAGE_KEY,
  UPDOWN_DOWNLOAD_STORAGE_KEY,
} from "#root/lib/constants";
import { pingWithFetch } from "#root/lib/ping";
import { checkDownloadSpeed } from "#root/lib/updown";

const pingAlarm = async () => {
  const [ms, err] = await pingWithFetch();
  const latency = err || !ms ? 0 : ms;
  const st = await chrome.storage.local.get(null);
  const oldData = st[PING_STORAGE_KEY]; // array or undefined
  await chrome.storage.local.set({
    [PING_STORAGE_KEY]: oldData
      ? [...oldData, { t: Date.now(), v: latency }]
      : [{ t: Date.now(), v: latency }],
  });
};

const updownAlarm = async () => {
  const [data, err] = await checkDownloadSpeed();
  if (err) {
    console.log("err", err);
    return;
  }
  const st = await chrome.storage.local.get(null);
  const oldData = st[UPDOWN_DOWNLOAD_STORAGE_KEY]; // array or undefined
  await chrome.storage.local.set({
    [UPDOWN_DOWNLOAD_STORAGE_KEY]: oldData
      ? [...oldData, { t: Date.now(), v: data?.mbps }]
      : [{ t: Date.now(), v: data?.mbps }],
  });
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
