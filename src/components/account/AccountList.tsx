import { useSearchAccountsQuery } from "@/hooks/useSearchAccountsQuery";
import { getFormattedAmount } from "@/utils/formatting/getFormattedAmount";
import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import ListPagination from "../UI/list/ListPagination";
import LoadingTableRows from "../UI/list/LoadingTableRows";

type AccountListProps = {};

const AccountList: FC<AccountListProps> = () => {
  const {
    data: accounts,
    isLoading: isAccountsLoading,
    error,
  } = useSearchAccountsQuery();

  return (
    <TableContainer component={Paper}>
      {error && <Alert severity="error">{error.message}</Alert>}
      <Table aria-label="Accounts list">
        <TableHead>
          <TableRow>
            <TableCell>Owner ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isAccountsLoading && !error ? (
            <LoadingTableRows cols={3} />
          ) : (
            (accounts?.data || []).map((account) => (
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
      <ListPagination total={accounts?.count} />
    </TableContainer>
  );
};

export default AccountList;
