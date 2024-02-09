import { SEARCH_ACCOUNT_OPTIONS } from "@/db/lib/accounts/getSearchAccountOptions";
import { accountFormSchema } from "@/schemas/account";
import { z } from "zod";
import { Currency } from "./currency";
import { Owner } from "./owner";

export type Account = {
  id: number;
  ownerId: Owner["id"];
  name: string;
  currency: Currency;
  balance: number; // in cents
};

export type AccountFormDTO = z.infer<typeof accountFormSchema>;

export type SearchAccountOptions = {
  [K in (typeof SEARCH_ACCOUNT_OPTIONS)[number]]?: Account[K];
};
