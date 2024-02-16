import { Typography } from "@mui/material";
import { FC, useEffect } from "react";
import AccountSelect from "../shared/AccountSelect";
import OwnerSelect from "../shared/OwnerSelect";
import { TransfertStepProps } from "./TransfertStepper";

const FromAccountStep: FC<TransfertStepProps> = ({
  values,
  resetFromAccountId,
  control,
}) => {
  // Unselect the account when the owner is changed
  useEffect(() => {
    resetFromAccountId();
  }, [resetFromAccountId, values.fromOwnerId]);

  return (
    <>
      <Typography variant="h4">Select source account</Typography>
      <Typography variant="h5">Select the Account owner:</Typography>
      <OwnerSelect control={control} name="fromOwnerId" />
      {values.fromOwnerId && (
        <>
          <Typography variant="h5">Select the Account:</Typography>
          <AccountSelect
            name="fromAccountId"
            control={control}
            ownerId={values.fromOwnerId}
          />
        </>
      )}
    </>
  );
};

export default FromAccountStep;
