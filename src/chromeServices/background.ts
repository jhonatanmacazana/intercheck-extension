import {
  CHROME_ALARM_PING,
  CHROME_ALARM_PING_DEFAULT_RATE_IN_MINUTES,
  CHROME_ALARM_UPDOWN,
  CHROME_ALARM_UPDOWN_DEFAULT_RATE_IN_MINUTES,
  SETTINGS_PING_RATE_STORAGE_KEY,
  SETTINGS_UPDOWN_RATE_STORAGE_KEY,
} from "#root/lib/constants";
import { pingAlarm } from "#root/modules/extension/pingAlarm";
import { updownAlarm } from "#root/modules/extension/updownAlarm";

chrome.runtime.onInstalled.addListener(() => {
  console.log("[onInstalled]");

  chrome.alarms.create(CHROME_ALARM_PING, {
    periodInMinutes: CHROME_ALARM_PING_DEFAULT_RATE_IN_MINUTES,
  });
  chrome.alarms.create(CHROME_ALARM_UPDOWN, {
    periodInMinutes: CHROME_ALARM_UPDOWN_DEFAULT_RATE_IN_MINUTES,
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

chrome.storage.onChanged.addListener(async (changes, areaName) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === SETTINGS_PING_RATE_STORAGE_KEY && areaName === "local") {
      chrome.alarms.create(CHROME_ALARM_PING, {
        periodInMinutes: newValue || oldValue || CHROME_ALARM_PING_DEFAULT_RATE_IN_MINUTES,
      });
    }

    if (key === SETTINGS_UPDOWN_RATE_STORAGE_KEY && areaName === "local") {
      chrome.alarms.create(CHROME_ALARM_UPDOWN, {
        periodInMinutes: newValue || oldValue || CHROME_ALARM_UPDOWN_DEFAULT_RATE_IN_MINUTES,
      });
    }
    // console.log(
    //   `Storage key "${key}" in namespace "${areaName}" changed.`,
    //   `Old value was "${oldValue}", new value is "${newValue}".`
    // );
  }
});
