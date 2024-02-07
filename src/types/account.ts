import { Currency } from "./currency";
import { Owner } from "./owner";

export type Account = {
  accountId: number;
  ownerId: Owner["ownerId"];
  currency: Currency;
  balance: number; // in cents
};
