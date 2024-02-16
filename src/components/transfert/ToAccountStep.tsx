import { Typography } from "@mui/material";
import { FC } from "react";
import { TransfertStepProps } from "./TransfertStepper";

const ToAccountStep: FC<TransfertStepProps> = () => {
  return (
    <>
      <Typography variant="h4">Select destination account</Typography>
    </>
  );
};

export default ToAccountStep;
