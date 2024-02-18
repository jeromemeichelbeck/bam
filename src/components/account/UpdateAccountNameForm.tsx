import ControlledInput from "@/components/UI/form/ControlledInput";
import { useEditAccountForm } from "@/hooks/useEditAccountForm";
import { Account } from "@/types/account";
import { Alert, Box, Button, Stack } from "@mui/material";
import { FC } from "react";

type UpdateAccountNameFormProps = {
  account: Account;
  closeForm: () => void;
};

const UpdateAccountNameForm: FC<UpdateAccountNameFormProps> = ({
  account,
  closeForm,
}) => {
  const { isPending, control, errors, handleEditAccount } = useEditAccountForm(
    {
      id: account.id,
      name: account.name,
    },
    closeForm,
  );

  console.log({ errors });

  return (
    <Stack component="form" onSubmit={handleEditAccount} spacing={2}>
      <Box display="flex" gap={2}>
        <ControlledInput name="name" control={control} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isPending}
          onClick={handleEditAccount}
        >
          Submit
        </Button>
        <Button variant="contained" color="secondary" onClick={closeForm}>
          Cancel
        </Button>
      </Box>
      {errors.root && <Alert severity="error">{errors.root.message}</Alert>}
    </Stack>
  );
};

export default UpdateAccountNameForm;
