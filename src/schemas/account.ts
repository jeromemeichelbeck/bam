import { availableCurrencies } from "@/constants/currencies";
import { z } from "zod";

export const accountFormSchema = z.object({
  ownerId: z.coerce
    .number({ invalid_type_error: "Please select an owner" })
    .int()
    .positive(),
  name: z.string().min(1, "Account name is required"),
  currency: z.enum(availableCurrencies),
  balance: z.coerce
    .number({ invalid_type_error: "Please enter a valid number" })
    .positive("Initial balance must be positive"),
});

export type AccountFormDTO = z.infer<typeof accountFormSchema>;
