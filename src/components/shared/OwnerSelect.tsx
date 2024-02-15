import { useSearchOwnersSelectQuery } from "@/hooks/useSearchOwnersQuery";
import { Owner } from "@/types/owner";
import { debounce } from "@mui/material";
import { useState } from "react";
import { Control } from "react-hook-form";
import ControlledSelect from "../UI/form/ControlledSelect";

type OwnerSelectFields =
  | { ownerId: Owner["id"] }
  | { fromOwnerId: Owner["id"] }
  | { toOwnerId: Owner["id"] };

type OwnerSelectProps<TFields extends OwnerSelectFields> = {
  defaultOwner?: Owner;
  control: Control<TFields>;
  name?: "ownerId" | "fromOwnerId" | "toOwnerId";
};

const OwnerSelect = <TFields extends OwnerSelectFields>({
  defaultOwner,
  control,
  name = "ownerId",
}: OwnerSelectProps<TFields>) => {
  const [q, setQ] = useState("");

  const { data: owners } = useSearchOwnersSelectQuery(q);

  return (
    <ControlledSelect
      defaultValue={defaultOwner}
      control={control as unknown as Control<OwnerSelectFields>}
      name={name}
      label="Account Owner"
      options={owners?.data || []}
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
