import { useSearchAccountsQuery } from "@/hooks/useSearchAccountsQuery";
import { getFormattedAmount } from "@/utils/formatting/getFormattedAmount";
import {
  Alert,
  Grid,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, useState } from "react";
import LoadingTableRows from "../shared/LoadingTableRows";

type AccountListProps = {};

const AccountList: FC<AccountListProps> = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  let pages = 1;

  const {
    data: accounts,
    isLoading: isAccountsLoading,
    error,
  } = useSearchAccountsQuery(page, size);

  if (accounts) {
    pages = Math.ceil(accounts.count / size);
  }

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
            <LoadingTableRows rows={size} cols={3} />
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
      <Grid container justifyContent="space-between" alignItems="center">
        <Pagination
          count={pages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          sx={{ py: 2 }}
        />
        <Select
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value.toString()))}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </Grid>
    </TableContainer>
  );
};

export default AccountList;
