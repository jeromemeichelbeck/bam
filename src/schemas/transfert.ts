import { Owner } from "@/types/owner";
import { z } from "zod";

export const transfertFormSchema = z.object({
  fromOwnerId: z.coerce
    .number()
    .int()
    .positive("Please select a source account owner"),
  fromAccountId: z.coerce
    .number()
    .int()
    .positive("Please select a source account")
    .transform((e) => (!e ? null : e)),
  toOwnerId: z.coerce
    .number()
    .int()
    .positive("Please select a destination account owner"),
  toAccountId: z.coerce
    .number()
    .int()
    .positive("Please select a destination account"),
  amount: z.coerce.number().positive("Amount must be positive"),
  description: z
    .string()
    .min(10, "The description should be at least 10 characters long")
    .optional(),
});

export type TransfertFormDTO = z.infer<typeof transfertFormSchema> & {
  fromOwnerId: Owner["id"];
  toOwnerId: Owner["id"];
};
