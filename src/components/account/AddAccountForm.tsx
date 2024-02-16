import { useAddAccountForm } from "@/hooks/useAddAccountForm";
import { Alert, Button, Grid, Stack } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import ControlledInput from "../UI/form/ControlledInput";
import CurrencySelect from "../shared/CurrencySelect";
import OwnerSelect from "../shared/OwnerSelect";

type AddAccountFormProps = {};

const AddAccountForm: FC<AddAccountFormProps> = () => {
  const { isPending, control, register, handleAddAccount, errors } =
    useAddAccountForm();

  return (
    <Stack component="form" onSubmit={handleAddAccount} gap={2}>
      <OwnerSelect control={control} />
      <ControlledInput name="name" label="Account name" control={control} />
      <CurrencySelect control={control} />
      <ControlledInput
        type="number"
        label="Account Initial Balance"
        name="balance"
        control={control}
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
