import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import AccountSelect from "../shared/AccountSelect";
import OwnerSelect from "../shared/OwnerSelect";
import { TransferStepProps } from "./TransferStepper";

const FromAccountStep: FC<TransferStepProps> = ({ control, values }) => {
  const { fromOwnerId } = values;

  return (
    <Stack spacing={4}>
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
    </Stack>
  );
};

export default FromAccountStep;
