import { availableCurrencies } from "@/constants/currencies";
import { AddAccountFormDTO } from "@/schemas/account";
import { FC } from "react";
import { Control } from "react-hook-form";
import ControlledSelect from "../UI/form/ControlledSelect";

type CurrencySelectorProps = {
  control: Control<AddAccountFormDTO>;
};

const CurrencySelect: FC<CurrencySelectorProps> = ({ control }) => {
  return (
    <ControlledSelect
      control={control}
      name="currency"
      label="Account Currency"
      options={availableCurrencies}
    />
  );
};

export default CurrencySelect;
