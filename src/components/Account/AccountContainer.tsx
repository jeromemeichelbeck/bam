import { Stack } from "@mui/material";
import { FC } from "react";
import AccountList from "./AccountList";
import AddAccountButton from "./AddAccountButton";

type AccountContainerProps = {};

const AccountContainer: FC<AccountContainerProps> = () => {
  return (
    <Stack gap={2}>
      <AccountList />
      <AddAccountButton />
    </Stack>
  );
};

export default AccountContainer;
