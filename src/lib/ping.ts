type ReturnData = number;

export const ping = async (): Promise<
  [data: ReturnData, error: null] | [data: null, error: Error]
> => {
  return new Promise<[data: ReturnData, error: null] | [data: null, error: Error]>((res, _rej) => {
    //var ms = 100 + Math.round(Math.random() * 200)
    //setTimeout(callback, ms, ms); return

    const xhr = new XMLHttpRequest();
    let start: number;

    xhr.open("GET", "/beacon.js?nc=" + Date.now(), true);
    xhr.timeout = 2000;

    xhr.onload = () => {
      let ms;
      const timing = window.performance && window.performance.getEntriesByName(xhr.responseURL)[0];

      if (timing) {
        // @ts-ignore
        ms = Math.round(timing.responseStart - timing.requestStart);
        window.performance.clearResourceTimings();
      } else {
        ms = Date.now() - start;
      }

      return res([ms, null]);
    };

    xhr.onerror = () => {
      return res([null, new Error(":c")]);
    };

    start = Date.now();
    xhr.send();
  });
};

export const pingWithFetch = async (): Promise<
  [data: ReturnData, error: null] | [data: null, error: Error]
> => {
  return new Promise<[data: ReturnData, error: null] | [data: null, error: Error]>(
    async (res, _rej) => {
      const start = Date.now();
      try {
        const response = await fetch("https://browserping.com/beacon.js?nc=" + Date.now(), {
          mode: "no-cors",
        });
        // const response = await fetch("/beacon.js?nc=" + Date.now());

        let ms;
        const timing =
          typeof window !== "undefined" &&
          window.performance &&
          window.performance.getEntriesByName(response.url)[0];

        if (timing) {
          // @ts-ignore
          ms = Math.round(timing.responseStart - timing.requestStart);
          window.performance.clearResourceTimings();
        } else {
          ms = Date.now() - start;
        }

        return res([ms, null]);
      } catch (err) {
        return res([null, new Error(":c")]);
      }
    }
  );
};

export default ping;
