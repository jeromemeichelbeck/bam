import { Typography } from "@mui/material";
import { FC } from "react";
import AmountInput from "../shared/AmountInput";
import { TransfertStepperProps } from "./TransfertStepper";

const AmountStep: FC<TransfertStepperProps> = ({ control }) => {
  return (
    <>
      <Typography variant="h4">Select the amount to transfer</Typography>
      <AmountInput name="amount" label="Amount to transfer" control={control} />
    </>
  );
};

export default AmountStep;
