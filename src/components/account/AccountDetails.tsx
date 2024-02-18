import UpdateAccountNameForm from "@/components/account/UpdateAccountNameForm";
import { Account } from "@/types/account";
import { getFormattedAmount } from "@/utils/formatting/getFormattedAmount";
import { Edit } from "@mui/icons-material";
import {
  Alert,
  Box,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import AddTransferButton from "../transfer/AddTransferButton";
import TransferList from "../transfer/TransferList";

type AccountDetailsProps = {
  account?: Account;
  hasError?: boolean;
};

const AccountDetails: FC<AccountDetailsProps> = ({ account, hasError }) => {
  const [showUpdateNameForm, setShowUpdateNameForm] = useState(false);

  if (hasError) {
    return (
      <Alert severity="error">
        An error occurded while loading the account. Please try later.
      </Alert>
    );
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack spacing={2}>
        {account?.name && showUpdateNameForm ? (
          <UpdateAccountNameForm
            account={account}
            closeForm={() => setShowUpdateNameForm(false)}
          />
        ) : (
          <Box display="flex" gap={2}>
            <Typography variant="h2">
              {account?.name || <Skeleton />}
            </Typography>
            {!!account?.name && (
              <IconButton
                onClick={() => {
                  if (account?.name && !showUpdateNameForm) {
                    setShowUpdateNameForm(true);
                  } else {
                    setShowUpdateNameForm(false);
                  }
                }}
              >
                <Edit />
              </IconButton>
            )}
          </Box>
        )}
        <Typography variant="h3">
          {typeof account?.balance === "undefined" ? (
            <Skeleton />
          ) : (
            `Current balance: ${getFormattedAmount(
              account?.balance || 0,
              account?.currency || "EUR",
            )}`
          )}
        </Typography>
        <AddTransferButton ownerId={account?.ownerId} accountId={account?.id} />
        <TransferList accountId={account?.id} />
      </Stack>
    </Paper>
  );
};

export default AccountDetails;
