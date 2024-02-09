import { Account } from "@/types/account";
import { Owner } from "@/types/owner";
import { Transfert } from "@/types/transfert";

export type EntityName = "owners" | "accounts" | "transferts";

export type EntityFromName<T extends EntityName> = T extends "owners"
  ? Owner
  : T extends "accounts"
    ? Account
    : T extends "transferts"
      ? Transfert
      : never;
