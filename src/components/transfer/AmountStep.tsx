import ControlledInput from "@/components/UI/form/ControlledInput";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import AmountInput from "../shared/AmountInput";
import { TransferStepProps } from "./TransferStepper";

const AmountStep: FC<TransferStepProps> = ({ control }) => {
  return (
    <Stack spacing={4}>
      <Typography variant="h4">Select the amount to transfer</Typography>
      <AmountInput name="amount" label="Amount to transfer" control={control} />
      <ControlledInput
        name="description"
        label="Description"
        control={control}
        multiline
        type="text"
        rows={3}
      />
    </Stack>
  );
};

export default AmountStep;
