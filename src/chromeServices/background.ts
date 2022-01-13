import {
  CHROME_ALARM_PING,
  CHROME_ALARM_PING_PERIOD_IN_SECONDS,
  CHROME_ALARM_UPDOWN,
  CHROME_ALARM_UPDOWN_PERIOD_IN_SECONDS,
} from "#root/lib/constants";
import { pingAlarm } from "#root/modules/extension/pingAlarm";
import { updownAlarm } from "#root/modules/extension/updownAlarm";

chrome.runtime.onInstalled.addListener(() => {
  console.log("[onInstalled]");

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
