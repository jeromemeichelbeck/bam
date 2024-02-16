import { Typography } from "@mui/material";
import { FC } from "react";
import { TransfertStepProps } from "./TransfertStepper";

type AmountStepProps = {};

const AmountStep: FC<TransfertStepProps> = () => {
  return (
    <>
      <Typography variant="h4">Select the amount to transfert</Typography>
    </>
  );
};

export default AmountStep;
