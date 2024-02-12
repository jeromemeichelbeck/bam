/**
 * Make the code sleep for a certain amount of time
 *
 * @param time in ms
 * @returns
 */
export const sleep = async (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, time);
  });
};
