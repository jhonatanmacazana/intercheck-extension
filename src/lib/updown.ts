type ReturnData = { bps: string; kbps: string; mbps: string };

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+`-=[]{}|;':,./<>?";

const generateTestData = (sizeInKmb: number) => {
  const iterations = sizeInKmb * 1000; //get byte count
  let result = "";
  for (let index = 0; index < iterations; index++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const fileSizeInBytes = 500000;

export const checkDownloadSpeed = async (): Promise<
  [data: ReturnData, error: null] | [data: null, error: Error]
> => {
  const baseUrl = `https://eu.httpbin.org/stream-bytes/${fileSizeInBytes}`;

  try {
    const startTime = new Date().getTime();
    await fetch(baseUrl);

    const endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000;
    // Convert bytes into bits by multiplying with 8
    const bitsLoaded = fileSizeInBytes * 8;
    const bps = (bitsLoaded / duration).toFixed(2);
    const kbps = (Number(bps) / 1000).toFixed(2);
    const mbps = (Number(kbps) / 1000).toFixed(2);

    return [{ bps, kbps, mbps }, null];
  } catch (err) {
    return [null, err as Error];
  }
};

export const checkUploadSpeed = async (): Promise<
  [data: ReturnData, error: null] | [data: null, error: Error]
> => {
  const baseUrl = `www.google.com/catchers/544b09b4599c1d0200000289`;

  const defaultData = generateTestData(fileSizeInBytes / 1000);
  const data = JSON.stringify({ defaultData });

  try {
    const startTime = new Date().getTime();
    await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000;
    // Convert bytes into bits by multiplying with 8
    const bitsLoaded = fileSizeInBytes * 8;
    const bps = (bitsLoaded / duration).toFixed(2);
    const kbps = (Number(bps) / 1000).toFixed(2);
    const mbps = (Number(kbps) / 1000).toFixed(2);

    return [{ bps, kbps, mbps }, null];
  } catch (err) {
    return [null, err as Error];
  }
};
