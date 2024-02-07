import { Currency } from "@/types/currency";

export const getFormattedAmount = (cents: number, currency: Currency) => {
  const formatter = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: currency,
  });

  return formatter.format(cents / 100);
};
