import { Account } from "./account";

export type Transfert = {
  id: number;
  date: string; // ISO 8601
  fromAccountId: Account["id"];
  fromAccountName: string;
  amount: number; // in cents, fromAccountCurrency
  currency: Account["currency"];
  toAccountId: Account["id"];
  toAccountName: string;
  toAmount: number; // in cents, toAccountCurrency
  toCurrency: Account["currency"];
  rate: number; // fromAccountCurrency to toAccountCurrency at the time of the tansfert
  description: string;
};
