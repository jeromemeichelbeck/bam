import { Owner } from "@/types/owner";
import { z } from "zod";

export const transfertFormSchema = z.object({
  fromAccountId: z.coerce
    .number()
    .int()
    .positive("From account id must be a positive integer"),
  toAccountId: z.coerce
    .number()
    .int()
    .positive("To account id must be a positive integer"),
  amount: z.coerce.number().positive("Amount must be positive"),
  description: z.string(),
});

export type TransfertFormDTO = z.infer<typeof transfertFormSchema> & {
  fromOwnerId: Owner["id"];
  toOwnerId: Owner["id"];
};
