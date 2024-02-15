import { useAccountId } from "@/hooks/useAccountId";
import { useAddTransfertForm } from "@/hooks/useAddTransfertForm";
import { useOwnerId } from "@/hooks/useOwnerId";
import { Stack, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import TransfertStepper from "./TransfertStepper";

type AddTransfertFormProps = {};

const AddTransfertForm: FC<AddTransfertFormProps> = () => {
  const { ownerId } = useOwnerId();
  const { accountId } = useAccountId();

  const { control, handleAddTransfert, watch, resetField } =
    useAddTransfertForm(ownerId, accountId);

  const resetFromAccountId = useCallback(() => {
    resetField("fromAccountId");
  }, [resetField]);

  const resetToAccountId = useCallback(() => {
    resetField("toAccountId");
  }, [resetField]);

  return (
    <Stack component="form" onSubmit={handleAddTransfert} gap={2}>
      <Typography variant="h4">Make a fund transfert transfert</Typography>
      <TransfertStepper
        control={control}
        values={watch()}
        resetFromAccountId={resetFromAccountId}
        resetToAccountId={resetToAccountId}
      />
    </Stack>
  );
};

export default AddTransfertForm;
