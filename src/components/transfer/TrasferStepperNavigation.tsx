import { Box, Button } from "@mui/material";
import { FC } from "react";

type TransferStepperNavigationProps = {
  backLabel: string;
  disableBack: boolean;
  handleBack: () => void;
  nextLabel: string;
  disableNext: boolean;
  handleNext: () => void;
};

const TransferStepperNavigation: FC<TransferStepperNavigationProps> = ({
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
      <Button disabled={disableNext} onClick={handleNext}>
        {nextLabel}
      </Button>
    </Box>
  );
};

export default TransferStepperNavigation;
