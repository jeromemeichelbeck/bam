import { Currency } from "./currency";

export type Rate = Record<Currency, number>;

export type Rates = Record<Currency, Rate>;
