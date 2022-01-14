import {
  PING_STORAGE_KEY,
  SETTINGS_PING_RATE_STORAGE_KEY,
  SETTINGS_UPDOWN_RATE_STORAGE_KEY,
  UPDOWN_DOWNLOAD_STORAGE_KEY,
} from "#root/lib/constants";

export type TimeRecord = {
  /**
   * time in milliseconds from epoch
   */
  t: number;
  /**
   * value
   */
  v: number;
};

export type PingValue = number | undefined;
export type UpdownValue = number | undefined;

export type Settings = {
  [SETTINGS_PING_RATE_STORAGE_KEY]: PingValue;
  [SETTINGS_UPDOWN_RATE_STORAGE_KEY]: UpdownValue;
};

export type Data = {
  [PING_STORAGE_KEY]: TimeRecord[] | undefined;
  [UPDOWN_DOWNLOAD_STORAGE_KEY]: TimeRecord[] | undefined;
};
