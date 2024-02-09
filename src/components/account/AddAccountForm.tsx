import { useAddAccountForm } from "@/hooks/useAddAccountForm";
import { Button, Stack, TextField } from "@mui/material";
import { FC } from "react";
import CurrencySelect from "../shared/CurrencySelect";
import OwnerSelect from "../shared/OwnerSelect";

type AddAccountFormProps = {};

const AddAccountForm: FC<AddAccountFormProps> = () => {
  const { isPending, control, register, handleAddAccount, errors } =
    useAddAccountForm();

  return (
    <form onSubmit={handleAddAccount}>
      <Stack gap={2}>
        <OwnerSelect control={control} />
        <TextField
          {...register("name")}
          type="text"
          label="Account Name"
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />
        <CurrencySelect control={control} />
        <TextField
          {...register("balance")}
          type="number"
          label="Account Initial Balance"
          error={!!errors.balance}
          helperText={errors.balance?.message}
          fullWidth
        />
        <Button type="submit" disabled={isPending}>
          Add Account
        </Button>
      </Stack>
    </form>
  );
};

export default AddAccountForm;
