import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import TransfertStepper from "./TransfertStepper";

type AddTransfertFormProps = {};

const AddTransfertForm: FC<AddTransfertFormProps> = () => {
  return (
    <Stack component="form" gap={2}>
      <Typography variant="h4">Make a fund transfert transfert</Typography>
      <TransfertStepper />
    </Stack>
  );
};

export default AddTransfertForm;
