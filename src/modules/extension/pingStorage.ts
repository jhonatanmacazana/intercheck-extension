import {
  NUMBER_OF_RECORDS_TO_BE_REMOVED_IF_MEMORY_IS_FULL,
  PING_STORAGE_KEY,
} from "#root/lib/constants";

import { TimeRecord } from "./types";

export class PingStorage {
  static async getData() {
    try {
      const st = await chrome.storage.local.get(null);
      const oldData = st[PING_STORAGE_KEY]; // array or undefined
      return oldData;
    } catch (err) {
      console.warn("error in ping getData", err);
    }
  }

  static async saveData(rec: TimeRecord) {
    const oldData: TimeRecord[] = (await this.getData()) || [];
    try {
      await chrome.storage.local.set({
        [PING_STORAGE_KEY]: [...oldData, rec],
      });
    } catch (err: any) {
      console.warn("error in ping saveData", err);
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
}
