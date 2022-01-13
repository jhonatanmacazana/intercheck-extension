import { UPDOWN_DOWNLOAD_STORAGE_KEY } from "#root/lib/constants";

import { TimeRecord } from "./types";

export class UpdownStorage {
  static async getData() {
    try {
      const st = await chrome.storage.local.get(null);
      const oldData = st[UPDOWN_DOWNLOAD_STORAGE_KEY]; // array or undefined
      return oldData;
    } catch (err) {
      console.warn("error in updown getData", err);
    }
  }

  static async saveData(rec: TimeRecord) {
    const oldData = await this.getData();
    try {
      await chrome.storage.local.set({
        [UPDOWN_DOWNLOAD_STORAGE_KEY]: oldData ? [...oldData, rec] : [rec],
      });
    } catch (err) {
      console.warn("error in updown saveData", err);
    }
  }
}
