import {
  NUMBER_OF_RECORDS_TO_BE_REMOVED_IF_MEMORY_IS_FULL,
  SETTINGS_PING_RATE_STORAGE_KEY,
  SETTINGS_UPDOWN_RATE_STORAGE_KEY,
} from "#root/lib/constants";
import { PingStorage } from "./pingStorage";

export type PingValue = number | undefined;
export type UpdownValue = number | undefined;

export type Settings = {
  [SETTINGS_PING_RATE_STORAGE_KEY]: PingValue;
  [SETTINGS_UPDOWN_RATE_STORAGE_KEY]: UpdownValue;
};

export class SettingsStorage {
  static async getAll() {
    try {
      const st = (await chrome.storage.local.get([
        SETTINGS_PING_RATE_STORAGE_KEY,
        SETTINGS_UPDOWN_RATE_STORAGE_KEY,
      ])) as Settings;
      return st;
    } catch (err) {
      console.warn("error in SettingsStorage getPingRate", err);
      return null;
    }
  }
  static async getPingRate() {
    try {
      const st = await chrome.storage.local.get(SETTINGS_PING_RATE_STORAGE_KEY);
      const value = st[SETTINGS_PING_RATE_STORAGE_KEY] as PingValue;
      return value;
    } catch (err) {
      console.warn("error in SettingsStorage getPingRate", err);
      return null;
    }
  }

  static async getUpdownRate() {
    try {
      const st = await chrome.storage.local.get(SETTINGS_UPDOWN_RATE_STORAGE_KEY);
      const value = st[SETTINGS_UPDOWN_RATE_STORAGE_KEY] as UpdownValue;
      return value;
    } catch (err) {
      console.warn("error in SettingsStorage getUpdownRate", err);
      return null;
    }
  }

  static async setAll(value: Settings) {
    try {
      await chrome.storage.local.set(value);
    } catch (err: any) {
      console.warn("error in ping saveData", err);
      if (err?.message === "QUOTA_BYTES quota exceeded") {
        const oldPingData = (await PingStorage.getAll()) || [];
        await PingStorage.set(oldPingData.slice(NUMBER_OF_RECORDS_TO_BE_REMOVED_IF_MEMORY_IS_FULL));
        await chrome.storage.local.set(value);
      }
    }
  }

  static async setPingRate(value: number) {
    try {
      await chrome.storage.local.set({ [SETTINGS_PING_RATE_STORAGE_KEY]: value });
    } catch (err) {
      console.warn("error in ping saveData", err);
    }
  }
  static async setUpdownRate(value: number) {
    try {
      await chrome.storage.local.set({ [SETTINGS_UPDOWN_RATE_STORAGE_KEY]: value });
    } catch (err) {
      console.warn("error in ping saveData", err);
    }
  }
}
