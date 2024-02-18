import { useTransferSummary } from "@/hooks/useTransferSummary";
import { getFormattedAmount } from "@/utils/formatting/getFormattedAmount";
import { ArrowCircleRightTwoTone } from "@mui/icons-material";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { TransferStepProps } from "./TransferStepper";

const SummaryStep: FC<TransferStepProps> = ({ control }) => {
  const { fromOwner, fromAccount, toOwner, toAccount, amount, description } =
    useTransferSummary(control);

  return (
    <Stack spacing={4}>
      <Typography variant="h4">Summary of the fund transfer</Typography>
      <Box display="flex" flexDirection="row" justifyContent="space-around">
        <Card>
          <CardContent>
            <Typography variant="h6">From</Typography>
            <Typography variant="body1">Owner: {fromOwner?.name}</Typography>
            <Typography variant="body1">
              Account: {fromAccount?.name || <Skeleton />}
            </Typography>
            <Typography variant="body1">
              Balance:{" "}
              {fromAccount ? (
                getFormattedAmount(fromAccount.balance, fromAccount.currency)
              ) : (
                <Skeleton />
              )}
            </Typography>
          </CardContent>
        </Card>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <ArrowCircleRightTwoTone
            fontSize="large"
            color="primary"
            sx={{ transform: "scale(1.2)" }}
          />
          <Typography variant="h5">
            {amount && fromAccount ? (
              getFormattedAmount(amount, fromAccount?.currency)
            ) : (
              <Skeleton />
            )}
          </Typography>
        </Box>
        <Card>
          <CardContent>
            <Typography variant="h6">To</Typography>
            <Typography variant="body1">
              Owner: {toOwner?.name || <Skeleton />}
            </Typography>
            <Typography variant="body1">
              Account: {toAccount?.name || <Skeleton />}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
};

export default SummaryStep;
