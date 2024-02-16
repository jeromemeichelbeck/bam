import ControlledInput from "@/components/UI/form/ControlledInput";
import { Typography } from "@mui/material";
import { FC } from "react";
import AmountInput from "../shared/AmountInput";
import { TransfertStepProps } from "./TransfertStepper";

const AmountStep: FC<TransfertStepProps> = ({ control }) => {
  return (
    <>
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
    </>
  );
};

export default AmountStep;
