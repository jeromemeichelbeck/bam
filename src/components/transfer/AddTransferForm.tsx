import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import TransferStepper from "./TransferStepper";

type AddTransferFormProps = {};

const AddTransferForm: FC<AddTransferFormProps> = () => {
  return (
    <Stack component="form" gap={2}>
      <Typography variant="h4">Make a fund transfer transfer</Typography>
      <TransferStepper />
    </Stack>
  );
};

export default AddTransferForm;
