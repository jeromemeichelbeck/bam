import { Typography } from "@mui/material";
import { FC } from "react";
import { useController } from "react-hook-form";
import AccountSelect from "../shared/AccountSelect";
import OwnerSelect from "../shared/OwnerSelect";
import { TransfertStepperProps } from "./TransfertStepper";

const ToAccountStep: FC<TransfertStepperProps> = ({ control }) => {
  const {
    field: { value: toOwnerId },
  } = useController({ name: "toOwnerId", control });

  return (
    <>
      <Typography variant="h4">Select destination account</Typography>
      <Typography variant="h5">Select the Account owner:</Typography>
      <OwnerSelect control={control} name="toOwnerId" />
      {toOwnerId && (
        <>
          <Typography variant="h5">Select the Account:</Typography>
          <AccountSelect
            name="toAccountId"
            control={control}
            ownerId={toOwnerId}
          />
        </>
      )}
    </>
  );
};

export default ToAccountStep;
