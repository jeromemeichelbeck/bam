import { useSearchTransfersQuery } from "@/hooks/useSearchTransfersQuery";
import { useSort } from "@/hooks/useSort";
import { Account } from "@/types/account";
import { Transfer } from "@/types/transfer";
import { getFormatedDateTime } from "@/utils/formatting/getFormatedDateTime";
import { getFormattedAmount } from "@/utils/formatting/getFormattedAmount";
import {
  Alert,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import ListPagination from "../UI/list/ListPagination";
import ListRow from "../UI/list/ListRow";
import LoadingTableRows from "../UI/list/LoadingTableRows";

type TransferListAmountProps = {
  accountId?: Account["id"];
  transfer?: Transfer;
};

const TransferListAmount: FC<TransferListAmountProps> = ({
  accountId,
  transfer,
}) => {
  const theme = useTheme();
  if (!accountId || !transfer) return <Skeleton />;

  return transfer.fromAccountId === accountId ? (
    <Typography color={theme.palette.error.main}>
      {`- ${getFormattedAmount(transfer.amount, transfer.currency)}`}
    </Typography>
  ) : (
    <Typography color={theme.palette.success.main}>
      {getFormattedAmount(transfer.toAmount, transfer.toCurrency)}
    </Typography>
  );
};

type TransferListProps = {
  accountId?: Account["id"];
};

const TransferList: FC<TransferListProps> = ({ accountId }) => {
  const theme = useTheme();

  const { sortBy, sortOrder, setSortParams } = useSort({
    sortBy: "date",
    sortOrder: "desc",
  });

  const {
    data: transfers,
    isLoading: isTransfersLoading,
    error,
  } = useSearchTransfersQuery(accountId);

  return (
    <TableContainer component={Paper}>
      {error && <Alert severity="error">{error.message}</Alert>}
      <Table aria-label="Transfers list">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isTransfersLoading && !error ? (
            <LoadingTableRows cols={3} />
          ) : (
            (transfers?.data || []).map((transfer, index) => (
              <ListRow
                key={transfer.id}
                data={[
                  transfer.date ? (
                    getFormatedDateTime(transfer.date)
                  ) : (
                    <Skeleton />
                  ),
                  transfer.description || <Skeleton />,
                  transfer.amount && transfer.currency ? (
                    <TransferListAmount
                      accountId={accountId}
                      transfer={transfer}
                    />
                  ) : (
                    <Skeleton />
                  ),
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
      <ListPagination total={transfers?.count} />
    </TableContainer>
  );
};

export default TransferList;
