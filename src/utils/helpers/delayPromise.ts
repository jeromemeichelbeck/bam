import { sleep } from "./sleep";

/**
 * Wrap any promise with this function to delay it's execution
 * It is primarily used to avoid screen flickering when loading data
 *
 * @param promiseToDelay
 * @param delay
 * @returns
 */
export const delayPromise = async <TData>(
  promiseToDelay: Promise<TData>,
  delay = 300,
) => {
  const [result] = await Promise.all([promiseToDelay, sleep(delay)]);

  return result;
};
