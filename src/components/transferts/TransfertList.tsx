import { useSearchTransfertsQuery } from "@/hooks/useSearchTransfertsQuery";
import { Account } from "@/types/account";
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

type TransfertListProps = {
  accountId?: Account["id"];
};

const TransfertList: FC<TransfertListProps> = ({ accountId }) => {
  const theme = useTheme();

  const {
    data: transferts,
    isLoading: isTransfertsLoading,
    error,
  } = useSearchTransfertsQuery(accountId);

  return (
    <TableContainer component={Paper}>
      {error && <Alert severity="error">{error.message}</Alert>}
      <Table aria-label="Transferts list">
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isTransfertsLoading && !error ? (
            <LoadingTableRows cols={3} />
          ) : (
            (transferts?.data || []).map((transfert, index) => (
              <ListRow
                key={index}
                data={[
                  transfert.fromAccountId,
                  transfert.toAccountId,
                  transfert.amount,
                ]}
                onClick={() => {
                  console.log("click");
                }}
                bgcolor={
                  theme.palette.background[index % 2 ? "paper" : "default"]
                }
              />
            ))
          )}
        </TableBody>
      </Table>
      <ListPagination total={transferts?.count} />
    </TableContainer>
  );
};

export default TransfertList;
