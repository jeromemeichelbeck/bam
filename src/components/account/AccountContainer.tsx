import { useQ } from "@/hooks/useQ";
import { Stack, TextField } from "@mui/material";
import { FC } from "react";
import AccountList from "./AccountList";
import AddAccountButton from "./AddAccountButton";

type AccountContainerProps = {};

const AccountContainer: FC<AccountContainerProps> = () => {
  const { q, setQ } = useQ();

  return (
    <Stack gap={2} alignItems="flex-end">
      <TextField
        label="Search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <AccountList q={q} />
      <AddAccountButton />
    </Stack>
  );
};

export default AccountContainer;
