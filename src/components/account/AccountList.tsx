import { useSearchAccountsQuery } from "@/hooks/useSearchAccountsQuery";
import { PaginationQueryParams } from "@/types/pagintaion";
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
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import LoadingTableRows from "../shared/LoadingTableRows";

type AccountListProps = {};

const AccountList: FC<AccountListProps> = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");

  const setQueryParams = useCallback(
    (accountQueryParams: PaginationQueryParams) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(accountQueryParams)) {
        if (typeof value === "string") {
          params.set(key, value);
        }
      }

      router.push(`${pathname}?${params}`);
    },
    [router, pathname, searchParams],
  );

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
          onChange={(_, value) => setQueryParams({ page: value.toString() })}
          color="primary"
          sx={{ py: 2 }}
        />
        <Select
          value={size}
          onChange={(e) => setQueryParams({ size: e.target.value.toString() })}
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
