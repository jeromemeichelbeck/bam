import { useAccountId } from "@/hooks/useAccountId";
import { useAddTransferForm } from "@/hooks/useAddTransferForm";
import { useGetOneAccount } from "@/hooks/useGetOneAccount";
import { useOwnerId } from "@/hooks/useOwnerId";
import { TransferFormDTO } from "@/schemas/transfer";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Control } from "react-hook-form";
import AmountStep from "./AmountStep";
import FromAccountStep from "./FromAccountStep";
import SummaryStep from "./SummaryStep";
import ToAccountStep from "./ToAccountStep";
import TransferStepperNavigation from "./TrasferStepperNavigation";

export type TransferStepProps = {
  control: Control<TransferFormDTO>;
  values: TransferFormDTO;
};

const TransferStepper: FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const { ownerId } = useOwnerId();
  const { accountId } = useAccountId();

  const { control, values, handleAddTransfer, trigger, isPending } =
    useAddTransferForm(ownerId, accountId);

  const { fromAccountId, amount } = values;

  const { data: fromAccount } = useGetOneAccount(fromAccountId);

  const handleNext = async () => {
    let checked = true;
    if (activeStep === 0) {
      checked &&= await trigger(["fromOwnerId", "fromAccountId"]);
    }

    if (activeStep === 1) {
      checked &&= await trigger(["toOwnerId", "toAccountId"]);
    }

    if (activeStep === 2) {
      checked &&= await trigger(["amount"]);
      // Check if the amount is not greater than the account balance
      if (fromAccount) {
        const inssuficientFunds = fromAccount.balance < amount;
        if (inssuficientFunds) {
          control.setError("amount", {
            message: "Insufficient funds",
          });
        }
        checked &&= !inssuficientFunds;
      }
    }

    if (activeStep === 3) {
      return handleAddTransfer();
    }

    if (!checked) {
      return;
    }

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

  const steps = [
    {
      label: "Select source account",
      component: <FromAccountStep control={control} values={values} />,
    },
    {
      label: "Select destination account",
      component: <ToAccountStep control={control} values={values} />,
    },
    {
      label: "Enter amount",
      component: <AmountStep control={control} values={values} />,
    },
    {
      label: "Summary",
      component: <SummaryStep control={control} values={values} />,
    },
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
      <>
        {steps[activeStep].component}
        <TransferStepperNavigation
          backLabel={activeStep > 0 ? "Back" : "Cancel"}
          disableBack={activeStep === 0 && !accountId && !ownerId}
          handleBack={handleBack}
          nextLabel={activeStep === steps.length - 1 ? "Validate" : "Next"}
          disableNext={activeStep === 3 && isPending}
          handleNext={handleNext}
        />
      </>
    </>
  );
};

export default TransferStepper;
