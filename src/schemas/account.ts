import { availableCurrencies } from "@/constants/currencies";
import { z } from "zod";

export const accountFormSchema = z.object({
  ownerId: z.coerce
    .number()
    .int()
    .positive("Owner id must be a positive integer"),
  name: z.string().min(1, "Account name is required"),
  currency: z.enum(availableCurrencies),
  balance: z.coerce.number().positive("Initial balance must be positive"),
});
