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
  useTheme,
} from "@mui/material";
import { FC } from "react";
import ListPagination from "../UI/list/ListPagination";
import ListRow from "../UI/list/ListRow";
import LoadingTableRows from "../UI/list/LoadingTableRows";

type AccountListProps = {};

const AccountList: FC<AccountListProps> = () => {
  const theme = useTheme();

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
            (accounts?.data || []).map((account, index) => (
              <ListRow
                key={index}
                data={[
                  account.id,
                  account.name,
                  getFormattedAmount(account.balance, account.currency),
                ]}
                onClick={() => console.log("click")}
                bgcolor={
                  theme.palette.background[index % 2 ? "paper" : "default"]
                }
              />
            ))
          )}
        </TableBody>
      </Table>
      <ListPagination total={accounts?.count} />
    </TableContainer>
  );
};

export default AccountList;
