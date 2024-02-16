import { useAccountId } from "@/hooks/useAccountId";
import { useAddTransfertForm } from "@/hooks/useAddTransfertForm";
import { useOwnerId } from "@/hooks/useOwnerId";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import TransfertStepper from "./TransfertStepper";

type AddTransfertFormProps = {};

const AddTransfertForm: FC<AddTransfertFormProps> = () => {
  const { ownerId } = useOwnerId();
  const { accountId } = useAccountId();

  const { control, handleAddTransfert, trigger } = useAddTransfertForm(
    ownerId,
    accountId,
  );

  return (
    <Stack component="form" onSubmit={handleAddTransfert} gap={2}>
      <Typography variant="h4">Make a fund transfert transfert</Typography>
      <TransfertStepper
        control={control}
        validateStep={(fields) => trigger(fields)}
      />
    </Stack>
  );
};

export default AddTransfertForm;
