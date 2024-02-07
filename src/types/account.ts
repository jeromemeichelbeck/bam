import { Currency } from "./currency";
import { Owner } from "./owner";

export type Account = {
  id: number;
  ownerId: Owner["id"];
  name: string;
  currency: Currency;
  balance: number; // in cents
};
