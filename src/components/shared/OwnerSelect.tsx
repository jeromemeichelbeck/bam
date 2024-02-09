import { useSearchOwnersQuery } from "@/hooks/useSearchOwnersQuery";
import { AccountFormDTO } from "@/schemas/account";
import { Owner } from "@/types/owner";
import { FC } from "react";
import { Control } from "react-hook-form";
import ControlledSelect from "../UI/form/ControlledSelect";

type OwnerSelectorProps = {
  defaultOwner?: Owner;
  control: Control<AccountFormDTO>;
};

const OwnerSelect: FC<OwnerSelectorProps> = ({ defaultOwner, control }) => {
  const { data } = useSearchOwnersQuery();

  return (
    <ControlledSelect
      defaultValue={defaultOwner}
      control={control}
      name="ownerId"
      label="Account Owner"
      options={data || []}
      object={{
        optionKey: "id",
        optionLabel: "name",
      }}
      clearable
    />
  );
};

export default OwnerSelect;
