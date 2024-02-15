import { Typography } from "@mui/material";
import { FC } from "react";

type AmountStepProps = {};

const AmountStep: FC<AmountStepProps> = () => {
  return (
    <>
      <Typography variant="h4">Select the amount to transfert</Typography>
    </>
  );
};

export default AmountStep;
