import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type AddAccountFormProps = {};

const AddAccountForm: FC<AddAccountFormProps> = () => {
  const accountFormSchema = z.object({
    name: z.string().min(1, "Account name is required"),
    currency: z.string().length(3, "Currency must be 3 characters (iso)"),
    balance: z.coerce.number().positive("Initial balance must be positive"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
  });

  const handleAddAccount = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={handleAddAccount}>
      <Stack gap={2}>
        <TextField
          {...register("name")}
          type="text"
          label="Account Name"
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />
        <TextField
          {...register("currency")}
          label="Account Currency"
          error={!!errors.currency}
          helperText={errors.currency?.message}
          fullWidth
        />
        <TextField
          {...register("balance")}
          type="number"
          label="Account Initial Balance"
          error={!!errors.balance}
          helperText={errors.balance?.message}
          fullWidth
        />
        <Button type="submit">Add Account</Button>
      </Stack>
    </form>
  );
};

export default AddAccountForm;
