import { Typography } from "@mui/material";
import { FC } from "react";
import { TransfertStepperProps } from "./TransfertStepper";

const ToAccountStep: FC<TransfertStepperProps> = () => {
  return (
    <>
      <Typography variant="h4">Select destination account</Typography>
    </>
  );
};

export default ToAccountStep;
