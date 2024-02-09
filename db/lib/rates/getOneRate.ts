import { Currency } from "@/types/currency";
import { getAllRates } from "./getAllRates";

export const getOneRate = async (
  currencyFrom: Currency,
  currencyTo: Currency,
) => {
  const rates = await getAllRates();

  return rates[currencyFrom]?.[currencyTo];
};
