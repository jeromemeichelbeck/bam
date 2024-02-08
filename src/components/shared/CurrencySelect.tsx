import { availableCurrencies } from "@/constants/currencies";
import { AccountFormDTO } from "@/schemas/account";
import { Currency } from "@/types/currency";
import { Control } from "react-hook-form";
import ControlledSelect from "../UI/form/ControlledSelect";

type CurrencySelectorProps = {
  defaultCurrency?: Currency;
  control: Control<AccountFormDTO>;
};

const CurrencySelect: React.FC<CurrencySelectorProps> = ({
  defaultCurrency,
  control,
}) => {
  return (
    <ControlledSelect
      defaultValue={defaultCurrency || "EUR"}
      control={control}
      name="currency"
      label="Account Currency"
      options={availableCurrencies}
    />
  );
};

export default CurrencySelect;
