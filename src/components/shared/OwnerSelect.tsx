import { useSearchOwnersQuery } from "@/hooks/useSearchOwnersQuery";
import { AccountFormDTO } from "@/schemas/account";
import { Owner } from "@/types/owner";
import { debounce } from "@mui/material";
import { FC, useState } from "react";
import { Control } from "react-hook-form";
import ControlledSelect from "../UI/form/ControlledSelect";

type OwnerSelectorProps = {
  defaultOwner?: Owner;
  control: Control<AccountFormDTO>;
};

const OwnerSelect: FC<OwnerSelectorProps> = ({ defaultOwner, control }) => {
  const [q, setQ] = useState("");

  const { data } = useSearchOwnersQuery(q);

  return (
    <ControlledSelect
      defaultValue={defaultOwner}
      control={control}
      name="ownerId"
      label="Account Owner"
      options={data || []}
      onSearch={debounce(setQ, 300)}
      object={{
        optionKey: "id",
        optionLabel: "name",
      }}
      clearable
    />
  );
};

export default OwnerSelect;
