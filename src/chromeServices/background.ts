import { pingWithFetch } from "#root/lib/ping";
import { checkDownloadSpeed } from "#root/lib/updown";

const CHROME_ALARM_PING = "ping";
const CHROME_ALARM_PING_PERIOD_IN_SECONDS = 5;

const CHROME_ALARM_UPDOWN = "updown";
const CHROME_ALARM_UPDOWN_PERIOD_IN_SECONDS = 60;

const PING_STORAGE_KEY = "ping";
const UPDOWN_STORAGE_KEY = "updownInMbps";

const pingAlarm = async () => {
  const [ms, err] = await pingWithFetch();
  const latency = err || !ms ? 0 : ms;
  const st = await chrome.storage.local.get(null);
  const oldData = st[PING_STORAGE_KEY]; // array or undefined
  await chrome.storage.local.set({
    [PING_STORAGE_KEY]: oldData
      ? [...oldData, { [Date.now()]: latency }]
      : [{ [Date.now()]: latency }],
  });
};

const updownAlarm = async () => {
  const [data, err] = await checkDownloadSpeed();
  if (err) {
    console.log("err", err);
    return;
  }
  const st = await chrome.storage.local.get(null);
  const oldData = st[UPDOWN_STORAGE_KEY]; // array or undefined
  await chrome.storage.local.set({
    [UPDOWN_STORAGE_KEY]: oldData
      ? [...oldData, { [Date.now()]: data?.mbps }]
      : [{ [Date.now()]: data?.mbps }],
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
