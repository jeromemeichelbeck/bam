import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import AccountSelect from "../shared/AccountSelect";
import OwnerSelect from "../shared/OwnerSelect";
import { TransferStepProps } from "./TransferStepper";

const ToAccountStep: FC<TransferStepProps> = ({ control, values }) => {
  const { toOwnerId } = values;

  return (
    <Stack spacing={4}>
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
    </Stack>
  );
};

export default ToAccountStep;
