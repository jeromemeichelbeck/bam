import { useGetOneAccount } from "@/hooks/useGetOneAccount";
import { Account } from "@/types/account";
import { getFormattedAmount } from "@/utils/formatting/getFormattedAmount";
import { Paper, Stack, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import TransfertList from "../transferts/TransfertList";

type AccountDetailsProps = {
  accountId: Account["id"];
};

const AccountDetails: FC<AccountDetailsProps> = ({ accountId }) => {
  const { data: account, isLoading, error } = useGetOneAccount(accountId);
  const theme = useTheme();

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h2">
          {isLoading ? <Skeleton /> : account?.name}
        </Typography>
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
      </Stack>
      <TransfertList accountId={accountId} />
    </Paper>
  );
};

export default AccountDetails;