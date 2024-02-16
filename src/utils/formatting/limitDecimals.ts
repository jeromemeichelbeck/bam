export const limitDecimals = (value: string | number, limit = 2) => {
  if (typeof value === "number") {
    value = value.toString();
  }

  const [int, dec] = value.split(".");
  if (!dec) {
    return int;
  }
  return `${int}.${dec.slice(0, limit)}`;
};
