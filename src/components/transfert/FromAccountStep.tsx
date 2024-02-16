import { Typography } from "@mui/material";
import { FC } from "react";
import { useController } from "react-hook-form";
import AccountSelect from "../shared/AccountSelect";
import OwnerSelect from "../shared/OwnerSelect";
import { TransfertStepProps } from "./TransfertStepper";

const FromAccountStep: FC<TransfertStepProps> = ({ control }) => {
  const {
    field: { value: fromOwnerId },
  } = useController({ name: "fromOwnerId", control });

  return (
    <>
      <Typography variant="h4">Select source account</Typography>
      <Typography variant="h5">Select the Account owner:</Typography>
      <OwnerSelect control={control} name="fromOwnerId" />
      {fromOwnerId && (
        <>
          <Typography variant="h5">Select the Account:</Typography>
          <AccountSelect
            name="fromAccountId"
            control={control}
            ownerId={fromOwnerId}
          />
        </>
      )}
    </>
  );
};

export default FromAccountStep;
