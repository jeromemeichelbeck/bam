import { Account } from "./account";

export type Transfert = {
  id: number;
  date: string; // ISO 8601
  fromAccountId: Account["id"];
  toAccountId: Account["id"];
  amount: number; // in cents, fromAccountCurrency
  rate: number; // fromAccountCurrency to toAccountCurrency at the time of the tansfert
  description: string;
};
