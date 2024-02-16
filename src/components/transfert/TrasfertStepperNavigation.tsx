import { Box, Button } from "@mui/material";
import { FC } from "react";

type TransfertStepperNavigationProps = {
  backLabel: string;
  disableBack: boolean;
  handleBack: () => void;
  nextLabel: string;
  disableNext: boolean;
  handleNext: () => void;
};

const TransfertStepperNavigation: FC<TransfertStepperNavigationProps> = ({
  backLabel,
  disableBack,
  handleBack,
  nextLabel,
  disableNext,
  handleNext,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <Button disabled={disableBack} onClick={handleBack} sx={{ mr: 1 }}>
        {backLabel}
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      <Button onClick={handleNext}>{nextLabel}</Button>
    </Box>
  );
};

export default TransfertStepperNavigation;
