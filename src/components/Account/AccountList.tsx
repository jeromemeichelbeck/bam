import { useAccounts } from "@/hooks/useAccounts";
import { getFormattedAmount } from "@/utils/getformattedAmount";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";

type AccountListProps = {};

const AccountList: FC<AccountListProps> = () => {
  const { data: accounts, isLoading: isAccountsLoading } = useAccounts();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Accounts list">
        <TableHead>
          <TableRow>
            <TableCell>Owner ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isAccountsLoading || !Array.isArray(accounts) ? (
            <TableRow>
              <TableCell colSpan={3}>Loading...</TableCell>
            </TableRow>
          ) : (
            accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.ownerId}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>
                  {getFormattedAmount(account.balance, account.currency)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountList;
