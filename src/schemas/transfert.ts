import { Owner } from "@/types/owner";
import { z } from "zod";

export const transfertFormSchema = z.object({
  fromOwnerId: z.coerce
    .number({ invalid_type_error: "Please select a source account owner" })
    .int("Please select a source account owner")
    .positive("Please select a source account owner"),
  fromAccountId: z.coerce
    .number({ invalid_type_error: "Please select a source account" })
    .int("Please select a source account")
    .positive("Please select a source account"),
  toOwnerId: z.coerce
    .number({ invalid_type_error: "Please select a destination account owner" })
    .int("Please select a destination account owner")
    .positive("Please select a destination account owner"),
  toAccountId: z.coerce
    .number({ invalid_type_error: "Please select a destination account" })
    .int("Please select a destination account")
    .positive("Please select a destination account"),
  amount: z.coerce
    .number({ invalid_type_error: "Please enter a valid number" })
    .positive("Amount must be positive"),
  description: z
    .string()
    .min(10, "The description should be at least 10 characters long")
    .optional(),
});

export type TransfertFormDTO = z.infer<typeof transfertFormSchema> & {
  fromOwnerId: Owner["id"];
  toOwnerId: Owner["id"];
};
