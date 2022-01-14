import {
  NUMBER_OF_RECORDS_TO_BE_REMOVED_IF_MEMORY_IS_FULL,
  PING_STORAGE_KEY,
  UPDOWN_DOWNLOAD_STORAGE_KEY,
} from "#root/lib/constants";

import { Data, TimeRecord } from "./types";

export class DataStorage {
  static async getAll() {
    try {
      const st = (await chrome.storage.local.get([
        PING_STORAGE_KEY,
        UPDOWN_DOWNLOAD_STORAGE_KEY,
      ])) as Data;
      return st;
    } catch (err) {
      console.warn("error in DataStorage getAll", err);
      return null;
    }
  }

  static async getPingData() {
    try {
      const st = await chrome.storage.local.get(PING_STORAGE_KEY);
      const data = (st[PING_STORAGE_KEY] || []) as TimeRecord[];
      return data;
    } catch (err) {
      console.warn("error in DataStorage getPingData", err);
      return null;
    }
  }

  static async getDownloadData() {
    try {
      const st = await chrome.storage.local.get(UPDOWN_DOWNLOAD_STORAGE_KEY);
      const data = (st[UPDOWN_DOWNLOAD_STORAGE_KEY] || []) as TimeRecord[];
      return data;
    } catch (err) {
      console.warn("error in DataStorage getDownloadData", err);
      return null;
    }
  }

  static async pushPingRecord(rec: TimeRecord) {
    const oldData = (await this.getDownloadData()) || [];
    try {
      await chrome.storage.local.set({ [PING_STORAGE_KEY]: [...oldData, rec] });
    } catch (err: any) {
      console.warn("error in DataStorage pushPingRecord", err);
      if (err?.message === "QUOTA_BYTES quota exceeded") {
        await chrome.storage.local.set({
          [PING_STORAGE_KEY]: [
            ...oldData.slice(NUMBER_OF_RECORDS_TO_BE_REMOVED_IF_MEMORY_IS_FULL),
            rec,
          ],
        });
      }
    }
  }

  static async pushDownloadRecord(rec: TimeRecord) {
    const oldData = (await this.getDownloadData()) || [];
    try {
      await chrome.storage.local.set({ [UPDOWN_DOWNLOAD_STORAGE_KEY]: [...oldData, rec] });
    } catch (err) {
      console.warn("error in DataStorage pushDownloadRecord", err);
    }
  }

  static async setPingData(recs: TimeRecord[]) {
    try {
      await chrome.storage.local.set({ [PING_STORAGE_KEY]: recs });
    } catch (err: any) {
      console.warn("error in DataStorage setPingData", err);
    }
  }
  static async setDownloadData(recs: TimeRecord[]) {
    try {
      await chrome.storage.local.set({ [UPDOWN_DOWNLOAD_STORAGE_KEY]: recs });
    } catch (err: any) {
      console.warn("error in DataStorage setDownloadData", err);
    }
  }
}
