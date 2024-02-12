export const getClosest = <T>(
  array: T[],
  target: T,
  compareFn: (a: T, b: T) => number = (a, b) => (a as any) - (b as any),
): T =>
  array.reduce((prev, curr) => {
    const prevDiff = Math.abs(compareFn(prev, target));
    const currDiff = Math.abs(compareFn(curr, target));
    return currDiff < prevDiff ? curr : prev;
  }, array[0]);
