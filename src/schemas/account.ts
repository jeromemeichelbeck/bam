import { availableCurrencies } from "@/constants/currencies";
import { Account } from "@/types/account";
import { z } from "zod";

export const addAccountFormSchema = z.object({
  ownerId: z.coerce
    .number({ invalid_type_error: "Please select an owner" })
    .int("Please select an owner")
    .positive("Please select an owner"),
  name: z.string().min(1, "Account name is required"),
  currency: z.enum(availableCurrencies),
  balance: z.coerce
    .number({ invalid_type_error: "Please enter a valid number" })
    .positive("Initial balance must be positive"),
});

export type AddAccountFormDTO = z.infer<typeof addAccountFormSchema>;

export const updateAccountFormSchema = z.object({
  name: z.string().min(1, "Account name is required"),
});

export type UpdateAccountFormDTO = { id: Account["id"] } & z.infer<
  typeof updateAccountFormSchema
>;
