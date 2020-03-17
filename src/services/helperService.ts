class HelperService {
  getApiEndpoint(useMock: boolean): string | undefined {
    return useMock
      ? process.env.REACT_APP_MOCK_API_ENDPOINT
      : process.env.REACT_APP_API_ENDPOINT;
  }

  /**
   * limits your function not to be called until after W milliseconds get passed since the last time it was         invoked, where W is delay
   * @param fn
   * @param delay
   * @example let debounceFunc = debounce(myFunc,500);
   */
  static debounce = ((): ((fn: () => void, delay: number) => void) => {
    let timer: NodeJS.Timeout | null = null;
    return (fn, delay): void => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn();
      }, delay);
    };
  })();

  /**
   * limits your function to be called at most once every W milliseconds, where W is delay.
   * Calls over W get dropped.
   * @param fn
   * @param delay
   * @example let throttledFunc = throttle(myFunc,500);
   */
  static throttle = ((): ((fn: () => void, delay: number) => void) => {
    let isCalled = false;
    return (fn, delay): void => {
      if (!isCalled) {
        setTimeout(() => {
          fn();
          isCalled = false;
        }, delay);
        isCalled = true;
      }
    };
  })();
}

export const helperService = new HelperService();
