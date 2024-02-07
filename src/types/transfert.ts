import { Account } from "./account";

export type Transfert = {
  transfertId: number;
  date: string; // ISO 8601
  fromAccountId: Account["accountId"];
  toAccountId: Account["accountId"];
  amount: number; // in cents, fromAccountCurrency
  rate: number; // fromAccountCurrency to toAccountCurrency at the time of the tansfert
};
