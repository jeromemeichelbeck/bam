import UpdateAccountNameForm from "@/components/account/UpdateAccountNameForm";
import { useGetOneAccount } from "@/hooks/useGetOneAccount";
import { Account } from "@/types/account";
import { getFormattedAmount } from "@/utils/formatting/getFormattedAmount";
import { Edit } from "@mui/icons-material";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import Skeleton from "react-loading-skeleton";
import AddTransferButton from "../transfer/AddTransferButton";
import TransferList from "../transfer/TransferList";

type AccountDetailsProps = {
  accountId: Account["id"];
};

const AccountDetails: FC<AccountDetailsProps> = ({ accountId }) => {
  const { data: account, isLoading, error } = useGetOneAccount(accountId);

  const [showUpdateNameForm, setShowUpdateNameForm] = useState(false);

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack spacing={2}>
        {account?.name && showUpdateNameForm ? (
          <UpdateAccountNameForm
            account={account!}
            closeForm={() => setShowUpdateNameForm(false)}
          />
        ) : (
          <Box display="flex" gap={2}>
            <Typography variant="h2">
              {isLoading ? <Skeleton /> : account?.name}
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
          {isLoading ? (
            <Skeleton />
          ) : (
            `Current balance:
          ${getFormattedAmount(
            account?.balance || 0,
            account?.currency || "EUR",
          )}`
          )}
        </Typography>
        <AddTransferButton ownerId={account?.ownerId} accountId={accountId} />
        <TransferList accountId={accountId} />
      </Stack>
    </Paper>
  );
};

export default AccountDetails;
