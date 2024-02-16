import { useGetOneAccount } from "@/hooks/useGetOneAccount";
import { Typography } from "@mui/material";
import { FC } from "react";
import { useController } from "react-hook-form";
import AmountInput from "../shared/AmountInput";
import { TransfertStepperProps } from "./TransfertStepper";

const AmountStep: FC<TransfertStepperProps> = ({ control }) => {
  const {
    field: { value: accountId },
  } = useController({ name: "fromAccountId", control });

  const { data: fromAccount } = useGetOneAccount(accountId);

  return (
    <>
      <Typography variant="h4">Select the amount to transfer</Typography>
      <AmountInput name="amount" label="Amount to transfer" control={control} />
    </>
  );
};

export default AmountStep;
