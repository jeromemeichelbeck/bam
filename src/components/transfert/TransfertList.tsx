import { useSearchTransfertsQuery } from "@/hooks/useSearchTransfertsQuery";
import { Account } from "@/types/account";
import { Transfert } from "@/types/transfert";
import { getFormatedDateTime } from "@/utils/formatting/getFormatedDateTime";
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
  Typography,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import ListPagination from "../UI/list/ListPagination";
import ListRow from "../UI/list/ListRow";
import LoadingTableRows from "../UI/list/LoadingTableRows";

type TransfertListAmountProps = {
  accountId?: Account["id"];
  transfert?: Transfert;
};

const TransfertListAmount: FC<TransfertListAmountProps> = ({
  accountId,
  transfert,
}) => {
  const theme = useTheme();
  if (!accountId || !transfert) return <Skeleton />;

  return transfert.fromAccountId === accountId ? (
    <Typography color={theme.palette.error.main}>
      {`- ${getFormattedAmount(transfert.amount, transfert.currency)}`}
    </Typography>
  ) : (
    <Typography color={theme.palette.success.main}>
      {getFormattedAmount(transfert.toAmount, transfert.toCurrency)}
    </Typography>
  );
};

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

  console.log(transferts?.data || []);

  return (
    <TableContainer component={Paper}>
      {error && <Alert severity="error">{error.message}</Alert>}
      <Table aria-label="Transferts list">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isTransfertsLoading && !error ? (
            <LoadingTableRows cols={3} />
          ) : (
            (transferts?.data || []).map((transfert, index) => (
              <ListRow
                key={transfert.id}
                data={[
                  transfert.date ? (
                    getFormatedDateTime(transfert.date)
                  ) : (
                    <Skeleton />
                  ),
                  transfert.description || <Skeleton />,
                  transfert.amount && transfert.currency ? (
                    <TransfertListAmount
                      accountId={accountId}
                      transfert={transfert}
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
      <ListPagination total={transferts?.count} />
    </TableContainer>
  );
};

export default TransfertList;
