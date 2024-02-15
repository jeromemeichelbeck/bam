import { useAddTransfertForm } from "@/hooks/useAddTransfertForm";
import { Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { FC, useCallback } from "react";
import { z } from "zod";
import TransfertStepper from "./TransfertStepper";

type AddTransfertFormProps = {};

const AddTransfertForm: FC<AddTransfertFormProps> = () => {
  const searchParams = useSearchParams();

  const parsedAccountId = z.coerce
    .number()
    .safeParse(searchParams.get("accountId"));
  const accountId = parsedAccountId.success ? parsedAccountId.data : undefined;

  const { control, handleAddTransfert, watch, resetField } =
    useAddTransfertForm(accountId);

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
