import AccountDetails from "@/components/account/AccountDetails";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";
import { useGetOneAccount } from "@/hooks/useGetOneAccount";
import { Account } from "@/types/account";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";

type AccountDetailContainerProps = {
  accountId: Account["id"];
};

const AccountDetailContainer: FC<AccountDetailContainerProps> = ({
  accountId,
}) => {
  const router = useRouter();

  const { data: account, error: fetchingError } = useGetOneAccount(accountId);

  const {
    mutate: deleteAccount,
    isPending,
    error: deletingError,
  } = useDeleteAccount();

  const [showBalanceNotNull, setShowBalanceNotNull] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const checkBalance = () => {
    if (account?.balance === 0) {
      setShowDeleteDialog(true);
      return;
    }
    setShowBalanceNotNull(true);
  };

  const confirmDelete = () => {
    deleteAccount(accountId);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between">
          <Link href="/" passHref>
            <Button variant="text" color="primary">
              Go back to accounts list
            </Button>
          </Link>
          <Button variant="contained" color="error" onClick={checkBalance}>
            Delete the account
          </Button>
        </Box>
        {!!deletingError && (
          <Alert severity="error">{deletingError.message}</Alert>
        )}
        <AccountDetails account={account} hasError={!!fetchingError} />
      </Stack>
      <Dialog open={showBalanceNotNull}>
        <DialogTitle>Delete Account {account?.name}</DialogTitle>
        <DialogContent>
          You cannot delete the account if it has a balance different from 0.
          Please make a transfert to empty the account.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowBalanceNotNull(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() =>
              router.push(
                `/transfer/add?ownerId=${account?.ownerId}&accountId=${account?.id}`,
              )
            }
          >
            Make a transfer
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showDeleteDialog}>
        <DialogTitle>Delete Account {account?.name}</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the account {account?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AccountDetailContainer;
