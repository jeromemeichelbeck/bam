import { useSearchAccountsSelectQuery } from "@/hooks/useSearchAccountsSelectQuery";
import { Account } from "@/types/account";
import { debounce } from "@mui/material";
import { useState } from "react";
import { Control } from "react-hook-form";
import ControlledSelect from "../UI/form/ControlledSelect";

type AccountSelectFields =
  | { accountId: Account["id"] }
  | { toAccountId: Account["id"] }
  | { fromAccountId: Account["id"] };

type AccountSelectProps<TFields extends AccountSelectFields> = {
  ownerId?: Account["ownerId"];
  control: Control<TFields>;
  name?: "accountId" | "toAccountId" | "fromAccountId";
};

const AccountSelect = <TFields extends AccountSelectFields>({
  ownerId,
  control,
  name = "accountId",
}: AccountSelectProps<TFields>) => {
  const [q, setQ] = useState("");

  const { data: accounts } = useSearchAccountsSelectQuery(q, ownerId);

  return (
    <ControlledSelect
      control={control as unknown as Control<AccountSelectFields>}
      name={name}
      label="Account"
      options={accounts?.data || []}
      onSearch={debounce(setQ, 300)}
      object={{
        optionKey: "id",
        optionLabel: "name",
      }}
      clearable
    />
  );
};

export default AccountSelect;
