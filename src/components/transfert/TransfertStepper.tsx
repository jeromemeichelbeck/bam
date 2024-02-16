import { useAccountId } from "@/hooks/useAccountId";
import { useOwnerId } from "@/hooks/useOwnerId";
import { TransfertFormDTO } from "@/schemas/transfert";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Control } from "react-hook-form";
import AmountStep from "./AmountStep";
import FromAccountStep from "./FromAccountStep";
import ToAccountStep from "./ToAccountStep";
import TransfertStepperNavigation from "./TrasfertStepperNavigation";

export type TransfertStepProps = {
  values: TransfertFormDTO;
  resetFromAccountId: () => void;
  resetToAccountId: () => void;
  control: Control<TransfertFormDTO>;
};

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
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const { ownerId } = useOwnerId();
  const { accountId } = useAccountId();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      return setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    if (accountId) {
      return router.push(`/account/${accountId}`);
    }

    if (ownerId) {
      return router.push(`/owner/${ownerId}`);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const stepProps: TransfertStepProps = {
    values,
    resetFromAccountId,
    resetToAccountId,
    control,
  };

  const steps = [
    {
      label: "Select source account",
      component: <FromAccountStep {...stepProps} />,
    },
    {
      label: "Select destination account",
      component: <ToAccountStep {...stepProps} />,
    },
    { label: "Enter amount", component: <AmountStep {...stepProps} /> },
  ];

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
          {steps[activeStep].component}
          <TransfertStepperNavigation
            backLabel={activeStep > 0 ? "Back" : "Cancel"}
            disableBack={activeStep === 0 && !accountId && !ownerId}
            handleBack={handleBack}
            nextLabel={activeStep === steps.length - 1 ? "Finish" : "Next"}
            disableNext={false}
            handleNext={handleNext}
          />
        </>
      )}
    </>
  );
};

export default TransfertStepper;
