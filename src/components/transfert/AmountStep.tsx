import { Typography } from "@mui/material";
import { FC } from "react";
import { TransfertStepperProps } from "./TransfertStepper";

const AmountStep: FC<TransfertStepperProps> = () => {
  return (
    <>
      <Typography variant="h4">Select the amount to transfert</Typography>
    </>
  );
};

export default AmountStep;
