import { useAddTransfertForm } from "@/hooks/useAddTransfertForm";
import { Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { z } from "zod";
import TransfertStepper from "./TransfertStepper";

type AddTransfertFormProps = {};

const AddTransfertForm: FC<AddTransfertFormProps> = () => {
  const searchParams = useSearchParams();

  const parsedAccountId = z.coerce
    .number()
    .safeParse(searchParams.get("accountId"));
  const accountId = parsedAccountId.success ? parsedAccountId.data : undefined;

  const { isPending, control, register, handleAddTransfert } =
    useAddTransfertForm(accountId);

  return (
    <Stack component="form" onSubmit={handleAddTransfert} gap={2}>
      <Typography variant="h4">Make a fund transfert transfert</Typography>
      <TransfertStepper />
    </Stack>
  );
};

export default AddTransfertForm;
