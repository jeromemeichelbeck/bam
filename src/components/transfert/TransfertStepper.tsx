import { TransfertFormDTO } from "@/schemas/transfert";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { Control } from "react-hook-form";
import AmountStep from "./AmountStep";
import FromAccountStep from "./FromAccountStep";
import ToAccountStep from "./ToAccountStep";

const steps = [
  { label: "Select source account", component: FromAccountStep },
  { label: "Select destination account", component: ToAccountStep },
  { label: "Enter amount", component: AmountStep },
];

type TransfertStepperProps = {
  values: TransfertFormDTO;
  resetFromAccountId: () => void;
  resetToAccountId: () => void;
  control: Control<TransfertFormDTO>;
};

const TransfertStepper: FC<TransfertStepperProps> = ({
  values,
  resetFromAccountId,
  resetToAccountId,
  control,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map(({ label }) => {
          const stepProps: { completed?: boolean } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Some kind of recap</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          {steps[activeStep].component({
            control,
            values,
            resetFromAccountId,
            resetToAccountId,
          })}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default TransfertStepper;
