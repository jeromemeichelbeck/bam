import { Rates } from "@/types/rate";

export const getAllRates = async () => {
  try {
    const rateFile = await import("../../data/rates.json", {
      with: { type: "json" },
    });

    return rateFile.default as Rates;
  } catch (error) {
    return {} as Rates;
  }
};
