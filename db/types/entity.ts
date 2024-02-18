import { Account } from "@/types/account";
import { Owner } from "@/types/owner";
import { Transfer } from "@/types/transfer";

export type EntityName = "owners" | "accounts" | "transfers";

export type EntityFromName<T extends EntityName> = T extends "owners"
  ? Owner
  : T extends "accounts"
    ? Account
    : T extends "transfers"
      ? Transfer
      : never;
