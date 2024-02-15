import { useAddAccountForm } from "@/hooks/useAddAccountForm";
import { Alert, Button, Grid, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import CurrencySelect from "../shared/CurrencySelect";
import OwnerSelect from "../shared/OwnerSelect";

type AddAccountFormProps = {};

const AddAccountForm: FC<AddAccountFormProps> = () => {
  const { isPending, control, register, handleAddAccount, errors } =
    useAddAccountForm();

  return (
    <Stack component="form" onSubmit={handleAddAccount} gap={2}>
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
      {errors?.root?.message && (
        <Alert severity="error">{errors.root.message}</Alert>
      )}
      <Grid container gap={2} justifyContent="flex-end">
        <Link href="/" passHref>
          <Button variant="outlined" color="primary">
            Cancel
          </Button>
        </Link>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isPending}
        >
          Create Account
        </Button>
      </Grid>
    </Stack>
  );
};

export default AddAccountForm;
