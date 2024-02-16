import { useAddAccountForm } from "@/hooks/useAddAccountForm";
import { Alert, Button, Grid, Stack } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import ControlledInput from "../UI/form/ControlledInput";
import AmountInput from "../shared/AmountInput";
import CurrencySelect from "../shared/CurrencySelect";
import OwnerSelect from "../shared/OwnerSelect";

type AddAccountFormProps = {};

const AddAccountForm: FC<AddAccountFormProps> = () => {
  const { isPending, control, handleAddAccount, errors } = useAddAccountForm();

  return (
    <Stack component="form" onSubmit={handleAddAccount} gap={2}>
      <OwnerSelect control={control} />
      <ControlledInput name="name" label="Account name" control={control} />
      <CurrencySelect control={control} />
      <AmountInput
        name="balance"
        label="Account Initial Balance"
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
